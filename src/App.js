import React, { useState } from 'react';
import { isURL, getUSDZ, getGithubRawURL } from './Utils';
import Form from './Form';
import EntityViewer from './EntityViewer';
//import logo from './logo.svg';
import './App.css';

function App() {
  const [model, setModel] = useState("null");
  const [submittedModel, setSubmittedModel] = useState("null");
  const [usdz, setUsdz] = React.useState("null");
  const [submittedUsdz, setSubmittedUsdz] = useState("null");
  const [enableUsdzField, setEnableUsdzField] = useState(false);

  const handleUsdzCheckboxChange = (evt) => {
    setEnableUsdzField(evt.target.checked);
  }
  
  const handleChange = (evt) => {
    setModel(`${evt.target.value}`);
  }
  
  const handleUsdzFieldChange = (evt) => {
    setUsdz(`${evt.target.value}`);
  }
  
  const handleSubmit = (evt) => {
    // handle submit
    const m = getGithubRawURL(model);
    setSubmittedModel(m);
    if (enableUsdzField && isURL(usdz)) {
      // use specified usdz location
      setSubmittedUsdz(`${getUSDZ(getGithubRawURL(usdz))}`);
    } else {
      setSubmittedUsdz(`${getUSDZ(m)}`);
    }
    evt.preventDefault();
  }

  return (
    <div className="App container mt-2">
      <Form onChange={handleChange} url={model} onSubmit={handleSubmit} onUsdzCheckboxChange={handleUsdzCheckboxChange} enableUsdzField={enableUsdzField} onUsdzFieldChange={handleUsdzFieldChange} />
      <EntityViewer url={submittedModel} usdz={submittedUsdz} />
    </div>
  );
}

export default App;
