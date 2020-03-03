import React, { useEffect, useRef, useState } from 'react';
import { isURL } from './Utils';
import '@google/model-viewer/dist/model-viewer';

const EntityViewer = (props) => {
    const modelViewerRef = useRef();
    const [loadError, setLoadError] = useState(false);
    useEffect(() => {
        if (modelViewerRef.current !== undefined) {
            modelViewerRef.current.addEventListener('error', (evt) => {
                setLoadError(true);
            });
        }
    });
    const content = (
        <div className="col-12">
            {
                loadError &&
                    <div class="alert alert-danger" role="alert">Only support glb/glTF files</div>
            }
            <div className="model-viewer-box">
                <model-viewer ref={modelViewerRef} class="model-viewer" src={`${props.url}`} auto-rotate camera-controls ar ar-scale="auto" alt="model" ios-src={`${props.usdz}`} />
            </div>
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