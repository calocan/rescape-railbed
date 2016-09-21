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
 * Defines the all actions of the application used manipulate the DOM.
 */

import ActionLoader from '../ActionLoader'
import {Map} from 'immutable'

/*
 * Action types. See action definition for explanation
*/

export const REGISTER_DOCUMENT = 'REGISTER_DOCUMENT'
export const LOAD_DOCUMENT = 'LOAD_DOCUMENT'
export const RECEIVE_DOCUMENT = 'RECEIVE_DOCUMENT'
export const DOCUMENT_ERRED = 'DOCUMENT_ERRED'
export const SHOW_DOCUMENT = 'SHOW_DOCUMENT'

export const REGISTER_ANCHORS = 'REGISTER_ANCHORS'
export const REGISTER_SCROLL_POSITION = 'REGISTER_SCROLL_POSITION'
export const SCROLL_TO_NEXT_MODEL = 'SCROLL_TO_NEXT_MODEL'
export const SCROLL_TO_PREVIOUS_MODEL = 'SCROLL_TO_PREVIOUS_MODEL'
export const SCROLL_TO_MODEL = 'SCROLL_TO_MODEL'

export const TOGGLE_DOCUMENT_TABLE_OF_CONTENTS = 'TOGGLE_DOCUMENT_TABLE_OF_CONTENTS'
/*
 * Action creators. 
 * List in the same order as the action types.
 */

/***
 * Register the given unloaded documents when encountered in the DOM or via the browser URL/parameters
 * This does not load the medium since we might want to skip, queue or otherwise delay loading
 *
 * @param key: The invariable key of the medium (e.g. 'denver_train_station_exterior')
 * @returns {{type: string, key: *}}
 */
export function register(key) {
    return { type: REGISTER_DOCUMENT, key }
}

class DocumentLoader extends ActionLoader {

    constructor() {
        super()
        this.key = 'documents'
    }

    /***
     * The baseUrl for the documents state has a parameter to accept the documents's id
     * @param settings: The global settings
     * @param state: The substate for documents
     * @param entry: The documents to be loaded
     * @returns {*}
     */
    makeLoadUrl(settings, state, entry) {
        // This will normally need overriding
        return state.get('baseUrl')(entry.get('id'))
    }

    /***
     * Indicates that the documents is loading
     * @param url: The url of the documents (e.g. a Google Docs url)
     * @returns {{type: string, url: *}}
     */
    loadIt(key, url) {
        return {
            type: LOAD_DOCUMENT,
            key,
            url
        }
    }

    /***
     * Indicates that the documents is being received. Since we get back a full HTML document,
     * we split it into the head and html portion so we can inject the HTML into the proper
     * components
     * @param key: The key of the document
     * @param html: The json of the documents
     * @returns {{type: string, url: *, content: *, receivedAt: number}}
     */
    receive(key, html) {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(html, "text/html")
        const head = htmlDoc.head.innerHTML
        const body = htmlDoc.body.innerHTML
        return {
            type: RECEIVE_DOCUMENT,
            key,
            content: Map({head, body}),
            receivedAt: Date.now()
        }
    }

    /***
     * Indicates that the loading of the documents erred
     *
     * @param url: The invariable url of the documents
     * @returns {{type: string, key: *}}
     */
    erred(url) {
        return { type: DOCUMENT_ERRED, url }
    }

    /***
     * Shows the given medium of the model
     *
     * @param key: The key of the 3D model (e.g. 'denver_train_station')
     * @returns {{type: string, key: *}}
     */
    showIt(key) {
        return { type: SHOW_DOCUMENT, key }
    }
}

/***
 * Stores the anchor div elements in the state that represent 3D models and their scenes
 * We compare the position of these to figure out which is closest to the current scroll
 * position in order to show that model/scene
 * @param anchors
 * @returns {{type: string, anchors: *}}
 */
export function registerAnchors(anchors) {
    return { type: REGISTER_ANCHORS, anchors }
}
/***
 * Stores the scroll position in the state so the reducers can determine which anchor
 * is closest to the scroll postion, thus determining the current model and scene
 * @param position
 */
export function registerScrollPosition(position) {
    return { type: REGISTER_SCROLL_POSITION, position }
}
/***
 * Sets the scroll position to the next model away from the current scroll position
 */
export function scrollToNextModel() {
    return { type: SCROLL_TO_NEXT_MODEL }
}

/***
 * Sets the scroll position to the next model away from the current scroll position
 */
export function scrollToPreviousModel() {
    return { type: SCROLL_TO_PREVIOUS_MODEL }
}

/***
 * Sets the scroll position to the model given by the key
 * @param modelKey
 */
export function scrollToModel(modelKey) {
    return { type: SCROLL_TO_MODEL, key: modelKey }
}


class CommentsLoader extends ActionLoader {

    constructor(disqusPublicKey, disqusShortname) {
        super()
        this.disqusPublicKey = disqusPublicKey
        this.disqusShortname = disqusShortname
        this.url = 'https://disqus.com/api/3.0/threads/set.jsonp',
        this.threadUrl = 'link:' + $('.show-comments').attr('data-disqus-url');
        this.data = {api_key: this.disqusPublicKey, forum: this.disqusShortname, thread: threadUrl},
        this.key = 'comment'
    }

    /***
     * The baseUrl for the documents state has a parameter to accept the documents's id
     * @param settings: The global settings
     * @param state: The substate for documents
     * @param entry: The documents to be loaded
     * @returns {*}
     */
    makeLoadUrl(settings, state, entry) {
        // This will normally need overriding
        return state.get('baseUrl')(entry.get('id'))
    }

    /***
     * Indicates that the documents is loading
     * @param url: The url of the documents (e.g. a Google Docs url)
     * @returns {{type: string, url: *}}
     */
    loadIt(key, url) {
        return {
            type: LOAD_COMMENT,
            key,
            url
        }
    }

    /***
     * Indicates that the documents is being received. Since we get back a full HTML document,
     * we split it into the head and html portion so we can inject the HTML into the proper
     * components
     * @param key: The key of the document
     * @param html: The json of the documents
     * @returns {{type: string, url: *, content: *, receivedAt: number}}
     */
    receive(key, html) {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(html, "text/html")
        const head = htmlDoc.head.innerHTML
        const body = htmlDoc.body.innerHTML
        return {
            type: RECEIVE_COMMENT,
            key,
            content: Map({head, body}),
            receivedAt: Date.now()
        }
    }

    /***
     * Indicates that the loading of the documents erred
     *
     * @param url: The invariable url of the documents
     * @returns {{type: string, key: *}}
     */
    erred(url) {
        return { type: COMMENT_ERRED, url }
    }

    /***
     * Shows the given medium of the model
     *
     * @param key: The key of the 3D model (e.g. 'denver_train_station')
     * @returns {{type: string, key: *}}
     */
    showIt(key) {
        return { type: SHOW_COMMENT, key }
    }


    /**
    $.ajax({
    cache: false,
    dataType: 'jsonp',
    success: function (result) {
    if (result.response.length === 1) {
    btnText = 'Show Comments (' + result.response[0].posts + ')';
    $('.show-comments').html(btnText);
    **/
}

/***
 * Toggles the Table of Contents on and off
 * @param key: The Document key
 * @param force: Force a certain value, true or false
 */
export function toggleTableOfContents(key, force) {
    return { type: TOGGLE_DOCUMENT_TABLE_OF_CONTENTS, key, force }
}

// Use an ActionLoader to remotely load models
export const documentLoader = new DocumentLoader();
// Export the public methods of the action loader
export const fetchDocumentIfNeeded = documentLoader.fetchIfNeeded.bind(documentLoader)
export const showDocument = documentLoader.show.bind(documentLoader)
