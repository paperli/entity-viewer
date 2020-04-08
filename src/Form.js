import React from 'react';
import { isURL } from './Utils';

const Form = (props) => {
  
    const usdzField = (
        <div className="form-group mt-2">
            <input type="url" className="form-control" id="usdzURL" placeholder="Enter the link to the usdz file" onChange={props.onUsdzFieldChange} />
        </div>
    );
    return (
        <form onSubmit={props.onSubmit}>
        <div className="form-group">
            <label for="modelURL">Model URL</label>
            <input type="url" value={props.url} className="form-control" id="modelURL" aria-describedby="modelURLHint" placeholder="Enter the link to the glb or glTF file" onChange={props.onChange} />
            <small id="modelURLHint" className="form-text text-muted">Upload your model file to github project and copy the link to the file.</small>
        </div>
        <div className="form-check">
            <input className="form-check-input" type="checkbox" id="usdzCheckbox" value="usdzCheckbox" onChange={props.onUsdzCheckboxChange} />
            <label className="form-check-label" for="usdzCheckbox">Specify a USDZ location</label>
        </div>
        {
            props.enableUsdzField &&
            usdzField
        }
        <button type="submit" className="btn btn-warning mt-3" disabled={!isURL(props.url)}>Submit</button>
        </form>
    )
};

export default Form;