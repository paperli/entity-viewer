import React from 'react';
import { isURL } from './Utils';
import '@google/model-viewer/dist/model-viewer';

const EntityViewer = (props) => {
    const content = (
        <div>
            <h2>Entity</h2>
            <model-viewer src={`${props.url}`} auto-rotate camera-controls ar ar-scale="auto" alt="model" ios-src={`${props.usdz}`} />
        </div>
    );
    return (
        <div>
        {
            isURL(props.url) &&
                content
        }
        </div>
    );
};

export default EntityViewer;