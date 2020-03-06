import React, { useState, useRef, useEffect } from 'react';
import '@google/model-viewer/dist/model-viewer';
import { ltrim } from './Utils';
import './App.css';

const getEntityFileURL = (fileName, format) => {
    fileName = (fileName === undefined) ? "sample" : (fileName.length === 0) ? "sample" : fileName;
    const suffixReg = /\.(gltf|glb|usdz)$/gi;
    const gltfFileReg = /\.(gltf)$/gi;
    const fn = ltrim(fileName.replace(suffixReg, ""));
    const isGltfFile = gltfFileReg.test(fileName) || format === "gltf";
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
            <div className="form-group">
                <div className="form-check form-check-inline">
                    <input type="radio" value="glb" id="glb" name="fileFormat" className="form-check-input" checked={props.format === "glb"} onChange={props.handleFormatOptionChange} />
                    <label className="form-check-label" htmlFor="glb">glb</label>
                </div>
                <div class="form-check form-check-inline">
                    <input type="radio" id="gltf" value="gltf" name="fileFormat" className="form-check-input" checked={props.format === "gltf"} onChange={props.handleFormatOptionChange} />
                    <label className="form-check-label" htmlFor="gltf">glTF</label>
                </div>
            </div>
            <button type="submit" className="btn btn-warning clearfix" disabled={props.fileName === undefined || props.fileName.length < 1}>Load Entity</button>
        </form>
    );
};

const LocalFileViewer = () => {
    const modelViewerRef = useRef();
    const [fileName, setFileName] = useState();
    const [loadError, setLoadError] = useState(false);
    const [format, setFormat] = useState("glb");
    const [submittedData, setSubmittedData] = useState({
        fileName: "sample",
        format: "glb"
    });

    useEffect(() => {
        modelViewerRef.current.addEventListener('error', (evt) => {
            console.log(`Loading model error: ${evt.detail.type} for ${getEntityFileURL(submittedData.fileName, submittedData.format)[2]}`);
            setLoadError(true);
        });
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setLoadError(false);
        setSubmittedData({
            fileName: fileName,
            format: format
        });
    }

    const handleFormatOptionChange = (evt) => {
        setFormat(evt.target.value);
    }

    const handleFileNameFieldChange = (evt) => {
        console.log(evt.target.value);
        setFileName(evt.target.value);
    }

    return (
        <div className="App container">
            <div className="row mb-3 mt-2">
                <div className="col-12">
                <Form handleFileNameFieldChange={handleFileNameFieldChange} handleSubmit={handleSubmit} fileName={fileName} handleFormatOptionChange={handleFormatOptionChange} format={format} />
                </div>
            </div>
            {
                loadError && (
                    <div className="row">
                        <div className="col-12">
                            <div className="alert alert-danger" role="alert">Failed to load the file {getEntityFileURL(submittedData.fileName, submittedData.format)[2]}</div>
                        </div>
                    </div>
                )
            }
            <div className="row">
                <div className="model-viewer-box col-12">
                    <model-viewer class="model-viewer" src={getEntityFileURL(submittedData.fileName, submittedData.format)[0]} ar auto-rotate camera-controls ios-src={getEntityFileURL(submittedData.fileName, submittedData.format)[1]} ref={modelViewerRef} />
                </div>
            </div>
        </div>
    );
};

export default LocalFileViewer;
