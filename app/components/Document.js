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
import {connect} from 'react-redux';
import {Map, List} from 'immutable'
import * as actions from '../actions/document'
import * as siteActions from '../actions/site'
import ImmutablePropTypes from 'react-immutable-proptypes'

class Document extends Component {

    /***
     * When the Document content is loaded we want to index all of the anhors in the document text
     */
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.indexAnchors()
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    /***
     * Likewkise when the Document content udpates we want to index anchors if we haven't done so.
     * I'm not sure if this is needed if componentDidMount fires at the right time, unless we
     */
    componentDidUpdate() {
        this.indexAnchors()
    }

    /***
     * Finds all the anchors that anchor models and scenes.
     * Sends an update to the state with the info.
     */
    indexAnchors() {

        // Get the anchor elements. The models/scenes have an anchorId that corresponds to one of the anchor ids
        const dom = ReactDOM.findDOMNode(this)
        var anchors = List([...dom.querySelectorAll('a[id]')])
        const models = this.props.models
        
        // If no anchors yet or our anchors are already named return
        if (!anchors.count() || anchors.first().name)
            return
        // If our models aren't set return
        if (!models)
            return

        // Once we certainly have the anchors loaded, put them into the document's state
        this.props.registerAnchors(anchors)
        
        anchors.forEach(function(anchor) {
            // Get the single key/value Map of the matching model
            const matchingModelEntry = models.findEntry((model, key) => model.get('anchorId') == anchor.id)
            // If the anchor doesn't match a model, we need to find the scene that matches the anchor
            const {modelKey, sceneKey} = matchingModelEntry ?
                    // If model matches the anchor return null for the scene
                    {modelKey: matchingModelEntry[0],
                    sceneKey: null} :
                    // Otherwise iterate through the models and return a model and scene where the scene matches the anchor
                    models.mapEntries(function ([modelKey, model]) {
                        const sceneKey = model.get('scenes').findKey(
                            (scene, sceneKey) => scene.get('anchorId') == anchor.id)
                        return sceneKey ? ['FOUND', {
                            modelKey: modelKey,
                            sceneKey: sceneKey
                        }] : null
                    }).get('FOUND') || {}
            // Set the anchor name to the model and scene that we found
            if (sceneKey)
                anchor.setAttribute('name', `${modelKey}_${sceneKey}`)
            else
                anchor.setAttribute('name', modelKey) 
        })
        // Immediately register the scroll position so that the closest 3d model to the current text loads.
        // If we don't do this no model will load until the user scrolls
        this.handleScroll()
    }


    /***
     * Whenever the scrollTop changes send an action so we can recalculate the closest anchor tag to the scroll
     * position. A timer is used to prevent too many events from passing through
     * @param event: The scroll event. If undefined we get the scrollTop from the body element (which we
     * could do in any case)
     */
    handleScroll(event) {

        let scrollTop = event ? event.srcElement.body.scrollTop : window.document.body.scrollTop
        const interval = 50
        const now = new Date()
        if (now - (this.state && this.state.lastScrollTime || 0) > interval) {
            // Tell the reducers the scroll position so that they can determine what model and scene
            // are current
            this.props.registerScrollPosition(scrollTop)
            this.setState({lastScrollTime: now })
        }
    }

    /***
     * Check for a prop change to anchors, and inform the Document if any values changed
     * @param nextProps
     */
    componentWillReceiveProps(nextProps){

        // Not called for the initial render
        // Previous props can be accessed by this.props
        // Calling setState here does not trigger an an additional re-render
        const closestAnchors = nextProps.document.get('closestAnchors')
        const previousClosestAnchors = this.props.document.get('closestsAnchors')
        if ((!previousClosestAnchors && closestAnchors) || (previousClosestAnchors && !previousClosestAnchors.equals(closestAnchors))) {
            this.props.documentTellModelAnchorsChanged(closestAnchors)
        }
    }

    /***
     * Render the document to the right of the model
     * @returns {XML}
     */
    render() {
        // Since the HTML comes from a Google doc or similar we can completely trust it
        const body = this.props.document.getIn(['content', 'body'])
        // The only processing we do to the Google doc HTML is the following:
        // 1) Replace pairs of <hr> elements with <div className='modelSection'>...</div>
        // This allows us to style each portion of the doc to match a corresponding 3D model
        const modifiedBody = this.injectStyledDivWrappers(body)

        return <div className='document'>
            <div dangerouslySetInnerHTML={{__html: modifiedBody }}>
            </div>
            <div className='document-gradiant right' />
        </div>
    }

    /***
     * Wraps each section of text in a <div class="modelSection">...</div> So the user can tell
     * which part of the text corresponds to which 3d model
     */
    injectStyledDivWrappers(body) {
        const regex = /<hr>/g,
            hrLength = '<hr>'.length,
            // The length of the spacer before and after each hr
            hrSpacerLength = '<p class="c1"><span class="c2"></span></p>'.length,
            contentsDiv = '<div id="contents">',
            contentsDivLength = contentsDiv.length
        var index = 0,
            modifiedBody = null,
            startLocation = null,
            result
        while ( (result = regex.exec(body)) ) {
            let bodyContent = null
            if (index == 0) {
                // Grab everything starting with the "content" div and put the just header inside it
                const contentDivIndex = body.indexOf(contentsDiv)
                // <div id="content">
                modifiedBody = body.slice(contentDivIndex, contentDivIndex + contentsDivLength)
                // <div id="header>header</div>...spacer<hr> (not including spacer<hr>)
                bodyContent = body.slice(0, contentDivIndex) +
                    body.slice(contentDivIndex + contentsDivLength, result.index - hrSpacerLength)
            }
            else {
                // Grab everything since last <hr>spacer and before this spacer<hr>
                bodyContent = body.slice(startLocation, result.index - hrSpacerLength)
            }
            // Concat the <div class='modelSection'>
            // ...content since last hr to this hr minus the spacer before hr ...
            // </div>
            modifiedBody = modifiedBody.concat(
                `<div class='modelSection'>${bodyContent}</div>`,
                // Now put that space in after the div ends
                body.slice(result.index - hrSpacerLength, result.index))

            // Store the index after the <hr> and the spacer after the hr
            startLocation = result.index + hrLength + hrSpacerLength
            index++
        }
        return modifiedBody
    }
}

Document.propTypes = {
    document: ImmutablePropTypes.map
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
    const currentDocumentKey = state.getIn(['documents', 'current'])
    const document = state.getIn(['documents', 'entries', currentDocumentKey])
    const modelKeysInDocument = document && document.get('modelKeys')
    return {
        settings,
        document: currentDocumentKey ? state.getIn(['documents', 'entries', currentDocumentKey]) : Map({}),

        models: modelKeysInDocument &&
            state.getIn(['models', 'entries']).filter((value,key) => modelKeysInDocument.includes(key))
    }
}

/***
 * Connect the mapStateToProps to provide the props to the component.
 * Connect the actions so that the component can send the actions based on events.
 */
export default connect(
    mapStateToProps,
    Object.assign(actions, siteActions)
)(Document)