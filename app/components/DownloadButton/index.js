import React, { Component, PropTypes } from 'react';
import DownloadIcon from './icon';

class DownloadButton extends Component {
    constructor () {
        super();
    }
    render () {
        const icon = this.props.color ? DownloadIcon.replace(/white/g, this.props.color) : 'white'
        return (
            <button
                title="Download"
                className="download-button"
                onClick={this.props.handler}
            >
                <span
                    dangerouslySetInnerHTML={{ __html: icon }}
                />
            </button>
        )
    }
}

DownloadButton.propTypes = {
    color: PropTypes.string
}

export default DownloadButton;
