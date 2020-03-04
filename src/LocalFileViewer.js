import React, { useState, useRef, useEffect } from 'react';
import '@google/model-viewer/dist/model-viewer';
import { ltrim } from './Utils';
import './App.css';

const getEntityFileURL = (fileName) => {
    fileName = (fileName === undefined) ? "sample" : (fileName.length === 0) ? "sample" : fileName;
    const suffixReg = /\.(gltf|glb|usdz)$/gi;
    const gltfFileReg = /\.(gltf)$/gi;
    const fn = fileName.replace(suffixReg, "");
    const isGltfFile = gltfFileReg.test(fileName);
    const prefix = `${process.env.PUBLIC_URL}/assets/entities`;
    return [`${prefix}/${fn}.${isGltfFile ? "gltf" : "glb"}`, `${prefix}/${fn}.usdz`, `${fn}.${isGltfFile ? "gltf" : "glb"}`];
};

const Form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label htmlFor="fileName">Model file name</label>
                <input type="text" onChange={props.handleFileNameFieldChange} className="form-control" id="fileName" name="fileName" autocorrect="off" autocapitalize="none" placeholder="Enter the model file name, eg. sample" aria-describedby="fileNameHint" />
                <small id="fileNameHint" className="form-text text-muted">Add .gltf in suffix to specify a glTF file, eg. sample.gltf</small>
            </div>
            <button type="submit" className="btn btn-warning" disabled={props.fileName === undefined || props.fileName.length < 1}>Load Entity</button>
        </form>
    );
};

const LocalFileViewer = () => {
    const modelViewerRef = useRef();
    const [fileName, setFileName] = useState();
    const [loadError, setLoadError] = useState(false);
    const [submittedFileName, setSubmittedFileName] = useState();

    useEffect(() => {
        modelViewerRef.current.addEventListener('error', (evt) => {
            console.log(`Loading model error: ${evt.detail.type} for ${getEntityFileURL(submittedFileName)[2]}`);
            setLoadError(true);
        });
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setLoadError(false);
        setSubmittedFileName(ltrim(fileName));
    }

    const handleFileNameFieldChange = (evt) => {
        console.log(evt.target.value);
        setFileName(evt.target.value);
    }

    return (
        <div className="App container">
            <div className="row mb-3 mt-2">
                <div className="col-12">
                <Form handleFileNameFieldChange={handleFileNameFieldChange} handleSubmit={handleSubmit} fileName={fileName} />
                </div>
            </div>
            {
                loadError && (
                    <div className="row">
                        <div className="col-12">
                            <div className="alert alert-danger" role="alert">Failed to load the file {getEntityFileURL(submittedFileName)[2]}</div>
                        </div>
                    </div>
                )
            }
            <div className="row">
                <div className="model-viewer-box col-12">
                    <model-viewer class="model-viewer" src={getEntityFileURL(submittedFileName)[0]} ar auto-rotate camera-controls ios-src={getEntityFileURL(submittedFileName)[1]} ref={modelViewerRef} />
                </div>
            </div>
        </div>
    );
};

export default LocalFileViewer;
