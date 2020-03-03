import React from 'react';
import { isURL } from './Utils';
import '@google/model-viewer/dist/model-viewer';

const EntityViewer = (props) => {
    const content = (
        <div className="model-viewer-box">
            <model-viewer class="model-viewer" src={`${props.url}`} auto-rotate camera-controls ar ar-scale="auto" alt="model" ios-src={`${props.usdz}`} />
        </div>
    );
    return (
        <div className="row mt-2">
        {
            isURL(props.url) &&
                content
        }
        </div>
    );
};

export default EntityViewer;