/**
 * Created by Andy Likuski on 2016.05.23
 * Copyright (c) 2016 Andy Likuski
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/***
 * Document is the component container responsible for loading
 * and displaying a documents from an external source (e.g. Google Docs)
 */

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import moment from 'moment';
import {connect} from 'react-redux';
import {Map, OrderedMap, List} from 'immutable'
import * as actions from '../actions/document'
import * as siteActions from '../actions/site'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Scroll from 'react-scroll';
import {getAnchorToModels, getSceneAnchors} from '../utils/documentHelpers'
const scroll = Scroll.animateScroll;
import config from '../config'
import {currentSceneKeyOfModel} from '../utils/modelHelpers'
import SceneCircles from './SceneCircles'
import CommentsButton from './CommentsButton'
import {normalizeModelName} from '../utils/modelHelpers'

class Document extends Component {


    /***
     * When the Document content is loaded we want to index all of the anhors in the document text
     */

    componentDidMount() {
        this.handleScrollBound = this.handleScroll.bind(this)
        const document = ReactDOM.findDOMNode(this.documentDiv)
        document.addEventListener('scroll', this.handleScrollBound);

        if (this.props.scrollPosition)
            this.scrollTo(this.props.scrollPosition || 0)
        else
            this.handleScroll()

        /*
        function fixSafariScrolling(event) {
            event.target.style.overflowY = 'hidden';
            setTimeout(function () { event.target.style.overflowY = 'auto'; });
        }

        this.documentDiv.addEventListener('webkitAnimationEnd', fixSafariScrolling);
        */
    }

    componentWillUnmount() {
        const document = ReactDOM.findDOMNode(this.documentDiv)
        document.removeEventListener('scroll', this.handleScrollBound);
        this.handleScrollBound = null;
    }

    /***
     * Likewise when the Document content updates we want to index anchors if we haven't done so.
     * We also put in the scene anchors, which are just little hash marks indicating to the reader
     * where the scene changes are.
     */
    componentDidUpdate() {
        this.indexAnchors()
        // Add targets to external anchors since Google Docs won't do it
        const anchors = this.documentDiv.getElementsByTagName('a')
        var i;
        var self = this
        for (i = 0; i < anchors.length; i++) {
            // Localize the URL if it's a reference to our domain but the text doesn't match the domain
            // We do this since we can make a local link in Google Docs
            if ((anchors[i].search || '').indexOf(config.PRODUCTION_DOMAIN) >= 0 &&
                anchors[i].text.indexOf(config.PRODUCTION_DOMAIN) < 0) {
                anchors[i].removeAttribute('href')
                anchors[i].className = 'header-link inline'
                const text = anchors[i].text.toLowerCase()
                anchors[i].onclick = () => self.onClickHeaderLink(text)
            }
            // Make external links open in another tab
            else if (anchors[i].href && anchors[i].hostname != window.location.hostname) {
                anchors[i].target = 'rescape_link'
            }
        }
        // Once we've finished adding classes make the document visible
        this.documentDiv.removeAttribute('style')
    }

    /***
     * Get the ModelAndVideos anchor elements. The models have an anchorId that corresponds to one of the anchor ids
     * in the document HTML. Related models share the same anchor. We create pseudo-anchors for each scene
     * of the models, giving the pseudo-anchors an offset that evenly spaces them. If models share the same anchor,
     * we spread the pseudo-anchors for all the scenes of the shared models evenly.
     *
     * When all anchors are processed an action is sent to store the anchors in the state.
     */
    indexAnchors() {

        const domElement = ReactDOM.findDOMNode(this)
        const models = this.props.models
        const anchors = List([...domElement.querySelectorAll('a[id]')])
        // If no models or anchors yet or our anchors are already named return
        if (!models || !anchors.count() || !this.state || this.state.scrollHeight == domElement.scrollHeight)
            return
        this.setState({scrollHeight: domElement.scrollHeight})


        // Map anchors to models. One anchor can represent to one or more models
        // As a side-effect we give the anchor the generic model name the first time we encounter a new anchor
        const anchorToModels = getAnchorToModels(anchors, models)
        // Create pseudo anchors for each scenes. These are used to change the scene of the current
        // model as the user scrolls
        const sceneAnchors = getSceneAnchors(anchorToModels, domElement.scrollHeight)

        // Once we have the anchors loaded, put them into the document's state
        this.props.registerAnchors(anchorToModels, sceneAnchors)

        // Immediately register the scroll position so that the closest 3d model to the current text loads.
        // If we don't do this no model will load until the user scrolls
        this.handleScroll()
    }



    /***
     * Whenever the scrollTop changes send an action so we can recalculate the closest anchor tag to the scroll
     * position. We consider the scroll position the vertical center of the document div.
     * A timer is used to prevent too many events from passing through
     * @param event: The scroll event. If undefined we get the scrollTop from the body element (which we
     * could do in any case)
     */
    handleScroll(event) {

        const scrollTop = this.documentDiv && this.documentDiv.scrollTop
        if (!scrollTop && scrollTop != 0)
            return
        const interval = 300
        const now = new Date()
        if (now - (this.state && this.state.lastScrollTime || 0) > interval) {
            // Tell the reducers the scroll position so that they can determine what model and scene
            // are current. The second argument is the half the height of the div; we change the current
            // scene when we the scene marker is in the vertical center of the div
            this.props.registerScrollPosition(scrollTop, this.props.sceneChangePosition)
            this.setState({lastScrollTime: now })
        }
    }

    /***
     * Scroll immediately or smoothly
     * http://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation
     * @param to: To this position
     * @param duration: if null immediately, otherwise in this duration
     */
    scrollTo(to, duration) {
        this.props.documentIsScrolling(true)
        duration = duration || 0
        const element = this.documentDiv,
            start = element.scrollTop,
            change = to - start,
            increment = 20;

        var animateScroll = function(elapsedTime) {
            elapsedTime += increment;
            if (duration==0) {
                // Indicate we are no longer scrolling so the scrollTop set is noticed
                this.props.documentIsScrolling(false)
                element.scrollTop = to
                return
            }
            var position = this.easeInOut(elapsedTime, start, change, duration);
            if (elapsedTime >= duration) {
                // Indicate we are no longer scrolling so the scrollTop set is noticed
                this.props.documentIsScrolling(false)
            }
            element.scrollTop = position;
            const self = this
            if (elapsedTime < duration) {
                setTimeout(function() {
                    animateScroll.apply(self, [elapsedTime]);
                }, increment);
            }
        };

        animateScroll.apply(this, [0]);
    }

    easeInOut(currentTime, start, change, duration) {
        currentTime /= duration / 2;
        if (currentTime < 1) {
            return change / 2 * currentTime * currentTime + start;
        }
        currentTime -= 1;
        return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    }

    /***
     * Check for a prop change to anchors, and inform the Document if any values changed
     * @param nextProps
     */
    componentWillReceiveProps(nextProps){

        const closestAnchors = nextProps.document.get('closestAnchors')
        const previousClosestAnchors = this.props.document && this.props.document.get('closestAnchors')
        // If the anchors changed that means the document is newly loaded
        if ((!previousClosestAnchors && closestAnchors) || (previousClosestAnchors && !previousClosestAnchors.equals(closestAnchors))) {
            // Have the Model3ds react to the new closest anchors
            this.props.documentTellModelAnchorsChanged(closestAnchors)

        }
        // If a hash is in the Router location scroll to it if we aren't already there or open the overlay
        // doc if it represents a document key like contact, about, cv
        // This is only needed on initial load when the document isn't ready yet
        if (nextProps.anchorToModels != this.props.anchorToModels || (nextProps.location && this.props.location && nextProps.location.hash != this.props.location.hash)) {
            // If we have a Router location hash, scroll to it now
            // The Router can't do this for us because the Document isn't loaded
            const hash = nextProps.location.hash
            if (hash) {
                const anchor = nextProps.anchorToModels.keySeq().find(
                    anchor => anchor.get('name') == hash.replace('#','')
                )
                if (anchor) {
                    // Update the Document scroll state to the first model of the matching anchor
                    this.props.scrollToModel(anchor.get('name'))
                }
                else {
                    // See if the hash matches a document key
                    const documentKey = this.props.overlayDocumentKeys.find(
                        overlayDocumentKey => overlayDocumentKey == hash.replace('#','')
                    )
                    // If so, open the document as an overlay
                    if (documentKey) {
                        this.props.overlayDocument(documentKey)
                    }
                }
            }
        }
        // If the desired document scrollPosition has been changed by clicking a table of contents button or similar
        else if (
            nextProps.document.get('scrollPosition') != this.props.scrollPosition &&
            nextProps.document.get('scrollPosition') != this.documentDiv.scrollTop) {
            // Scroll to the position
            this.scrollTo(nextProps.document.get('scrollPosition'))
        }
    }

    /***
     * The Document needs to add the Date and author credit
     * @param date
     * @param renderToStaticMarkup
     */
    getExtraHeaderHtml() {
        const document = this.props.document
        const date = document.get('date')
        // Add in the document credit and date
        return renderToStaticMarkup(<div className="document-header">
            {document.get('author') ?
                <div className="document-credit">by <span className="author">{document.get('author')}</span></div> :
                <span/>}
            {document.get('date') ?
                <div className="document-date">
                    <span
                        className="date">{moment(document.get('date')).format('MMMM Do, YYYY')}
                    </span>
                </div> :
                <span/>}
            </div>
        )
    }

    /***
     * Overlay the header document when the link is clicked
     * @param documentKey
     */
    onClickHeaderLink(documentKey) {
        this.props.overlayDocument(documentKey)
    }

    /***
     * Render the document to the right of the model
     * @returns {XML}
     */
    render() {
        const document = this.props.document
        if (!document)
            return <div ref={(c) => this.documentDiv = c} />
        const body = document.getIn(['content', 'body'])
        if (!body)
            return <div ref={(c) => this.documentDiv = c} />
        // The only processing we do to the Google doc HTML is the following:
        // 1) Replace pairs of <hr> elements with <div className='modelSection'>...</div>
        // This allows us to style each portion of the doc to match a corresponding 3D model
        const modifiedBody = this.injectStyledDivWrappers(body, this.getExtraHeaderHtml())

        // Set style to keep the contents invisible until componentDidUpdate
        return <div
            ref={(c) => this.documentDiv = c}
            className={`${this.props.className || 'document'} ${this.props.overlayDocumentIsShowing ? 'overlay-document-showing' : ''}`}
            style={{visibility: 'hidden'}}
        >
            <SceneCircles
                models={this.props.models}
                modelKey={this.props.modelKey}
                sceneKey={this.props.sceneKey}
                sceneAnchors={this.props.sceneAnchors}
            />
            {modifiedBody}
        </div>
    }

    /***
     * Wraps each section of text in a <div class="modelSection">...</div> So the user can tell
     * which part of the text corresponds to which 3d model
     */
    injectStyledDivWrappers(body, extraHeaderHtml) {

        const regex = /<hr>/g,
            hrLength = '<hr>'.length,
            // The length of the spacer before and after each hr
            hrSpacerRegexStart = /^((?:<p class="c\d+(?: c\d+)*"><span class="c\d+(?: c\d+)*"><\/span><\/p>)+)/,
            hrSpacerRegexEnd = /((?:<p class="c\d+(?: c\d+)*"><span class="c\d+(?: c\d+)*"><\/span><\/p>)+)$/,
            contentsDiv = '<div id="contents">',
            contentsDivLength = contentsDiv.length,
            // For the top of the document
            // Grab everything starting with the "content" div and put the just header inside it
            contentDivIndex = body.indexOf(contentsDiv)


        var index = 0,
            outerElement = null,
            elements = [],
            startLocation = null,
            // Look for <hr> tags separating the document. If there are none make a pseudo
            // one representing the whole document except for the div footer
            result = regex.exec(body) || {index: body.indexOf('<div id="footer">')},
            modelEntries = this.props.models.entrySeq()
        // For each <hr> or for the single pseudo one
        do {
            let bodyContent = null
            if (index == 0) {
                // For the first segment we have to handle the content div, putting the header div
                // inside of it
                // <div id="content">
                outerElement = body.slice(contentDivIndex, contentDivIndex + contentsDivLength)
                // <div id="header>header</div>...spacer<hr> (not including spacer<hr>)
                // the extra header html is stuff like the author and date
                bodyContent = body.slice(0, contentDivIndex) +
                    extraHeaderHtml +
                    body.slice(contentDivIndex + contentsDivLength, result.index)
            }
            else {
                // Grab everything since last <hr>spacer and before this spacer<hr>
                bodyContent = body.slice(startLocation, result.index)
            }
            // Concat the <div class='modelSection'>
            // ...content since last hr to this hr minus the spacer before hr ...
            // </div>
            // We remove the spacers in favor of padding/margin styling
            // We also move the section anchor to the top of the section and give it an image wrapper. If
            // this is a document without sections like (Contact, About, etc) then add an anchor at the
            // top that refers to this document
            const startSpacerMatch = hrSpacerRegexStart.exec(bodyContent)
            const startSpacerIndex = startSpacerMatch ? startSpacerMatch[0].length : undefined
            const endSpacerMatch = hrSpacerRegexEnd.exec(bodyContent)
            const endSpacerIndex = endSpacerMatch ? endSpacerMatch.index : undefined
            const bodySlice = bodyContent.slice(startSpacerIndex, endSpacerIndex)
            const regex = /(<a.*?>)(<\/a>)/
            const match = regex.exec(bodySlice)
            // Grab the starting and ending <a> or create one for pages like Contact
            const anchorParts = match ? match.slice(1) : [`<a href='#${this.props.documentKey}'>`, '</a>']
            // A couple models have no subheading displayed, so add a class to indicate it
            // Start at index==1 since index 0 is not a model but the document title
            const noSubheading = index > 0 && this.props.models.toIndexedSeq().get(index - 1).get('noSubheading')
            // Inject the space before the hr
            if (startSpacerMatch)
                elements.push(<span key={`${index}-spacer`} dangerouslySetInnerHTML={{__html:startSpacerMatch[0]}} />)

            const anchorRegex = /id=(?:'|")(.+?)(?:'|")/
            const anchorIdMatch = anchorRegex.exec(anchorParts[0])
            const anchorId = anchorIdMatch && anchorIdMatch[1]
            let modelKey = null, model = null, modelTitle = null
            if (anchorId) {
                [modelKey, model] = modelEntries.find(([modelKey, model]) => model.get('anchorId') == anchorId)
                modelTitle = normalizeModelName(modelKey, model)
            }
            const modelCommentsButton = model && !model.get('noComments') ?
                <CommentsButton
                    key={modelTitle}
                    modelTitle={modelTitle}
                    documentTitle={this.props.documentTitle}
                    documentKey={this.props.documentKey}
                    document={this.props.document}
                /> :
                (!model ? <CommentsButton
                    key={this.props.documentKey}
                    document={this.props.document}
                    documentKey={this.props.documentKey}
                    documentTitle={this.props.documentTitle}
                /> :
                <span key={modelTitle}/>)
            // Put in the anchor as a # mark
            elements.push(
                <div key={`${index}-model-section`} className={`model-section${noSubheading ? ' no-subheading':''}`}>
                    {modelCommentsButton}
                    <span
                        dangerouslySetInnerHTML={{__html:
                            `${anchorParts[0]}#${anchorParts[1]}${bodySlice.replace(regex, '')}`
                        }}
                    />
                </div>
            )

            // Store the index after the <hr>
            startLocation = result.index + hrLength
            index++
        } while (result = regex.exec(body))
        return <div id="content">{elements}</div>
    }

}

Document.propTypes = {
    settings: ImmutablePropTypes.map,
    document: ImmutablePropTypes.map,
    documentKey: PropTypes.string,
    overlayDocumentKeys: ImmutablePropTypes.list,
    model: ImmutablePropTypes.map,
    models: ImmutablePropTypes.map,
    scrollPosition: PropTypes.number,
    // Tell the document if an overlay document is covering it
    overlayDocumentIsShowing: PropTypes.bool,
    // These are listed for ride in OverlayDocument
    className: PropTypes.string,
    // Once the Document is loaded we'll have a mapping of it's anchors to its Model3ds
    anchorToModels: ImmutablePropTypes.map,
    // Once the Document is loaded we'll have sceneAnchors representing the document position
    // of each scene
    sceneAnchors: PropTypes.array,
    // The router's location so we can scroll to the correct bookmark.
    // The router doesn't do this for us because we set the name of the bookmarks when the Document loads
    location:PropTypes.object
}

/***
 * Map the state, which is our list of documents, to the current document
 * We also pass the model states of the models that belong to the current document,
 * so that we can initially update anchor tags in the document body to be named based on the model/scene keys
 * @param state
 * @returns {{documents: *}}
 */
function mapStateToProps(state) {
    const settings = state.get('settings')
    const documentKey = state.getIn(['documents', 'current'])
    // We use the overlayDocumentKeys to resolve a url hash
    const overlayDocumentKeys = state.getIn(['documents', 'entries']).filter(document =>
        document.get('isHeaderDocument')
    ).keySeq().toList()
    const document = state.getIn(['documents', 'entries', documentKey])
    const documentTitle = document && document.get('title')
    const scrollPosition = document && document.get('scrollPosition')
    const modelKeysInDocument = document && document.get('modelKeys')
    const anchorToModels = document.get('anchorToModels')
    const sceneAnchors = document.get('sceneAnchors')
    const modelKey = state.getIn(['models', 'current'])
    const model = state.getIn(['models', 'entries', modelKey])
    const sceneKey = currentSceneKeyOfModel(model)
    const location = state.getIn(['documents', 'location'])
    const sceneChangePosition = state.getIn(['documents', 'sceneChangePosition'])
    return {
        settings,
        document: document,
        documentTitle,
        documentKey,
        model,
        modelKey,
        sceneKey,
        overlayDocumentKeys,
        models: modelKeysInDocument &&
            state.getIn(['models', 'entries']).filter((value,key) => modelKeysInDocument.includes(key)),
        scrollPosition,
        anchorToModels,
        sceneAnchors,
        location,
        sceneChangePosition
    }
}

class RawDocument extends Document {}
export {RawDocument}

/***
 * Connect the mapStateToProps to provide the props to the component.
 * Connect the actions so that the component can send the actions based on events.
 */
export default connect(
    mapStateToProps,
    Object.assign(actions, siteActions)
)(Document)