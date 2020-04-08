import React, { useState } from 'react';
import { isURL, getUSDZ, getGithubRawURL, getParameterByName } from './Utils';
import Form from './Form';
import EntityViewer from './EntityViewer';
//import logo from './logo.svg';
import './App.css';

function App() {
  var para = getParameterByName("model");
  if (para !== null) {
    para = getGithubRawURL(para);
  }
  const [model, setModel] = useState(`${para}`);
  const [submittedModel, setSubmittedModel] = useState(`${para}`);
  const [usdz, setUsdz] = React.useState(`${(para === null) ? "null" : getUSDZ(para)}`);
  const [submittedUsdz, setSubmittedUsdz] = useState(`${(para === null) ? "null" : getUSDZ(para)}`);
  const [enableUsdzField, setEnableUsdzField] = useState(false);
  //console.log(`url: ${getParameterByName("model")}`);

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
    window.location.href = `${window.location.origin}${window.location.pathname}?model=${m}`;
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
