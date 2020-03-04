import React from 'react';
import '@google/model-viewer/dist/model-viewer';
import './App.css';

const LocalUploader = () => {
  const [file, setFile] = React.useState();
  const [usdz, setUsdz] = React.useState();
  const [enableiOS, setEnableiOS] = React.useState(false);
  const [loadError, setLoadError] = React.useState(false);
  
  const modelViewerRef = React.useRef();
  
  const handleFileChange = (files) => {
    setLoadError(false);
    const f = files[0];
    const url = window.URL.createObjectURL(f);
    const gltfFileReg = /\.(gltf|glb)$/gi;
    const usdzFileReg = /\.(usdz)$/gi;
    if (gltfFileReg.test(f.name)) {
      // gltf file
      setFile(url);
    } else if (usdzFileReg.test(f.name)) {
      // usdz file
      setUsdz(url);
      if (file === undefined) {
        setFile(url)
      }
        
    } else {
      setLoadError(true);
    }
  };

  const handleIOSCheckboxChange = (evt) => {
      setEnableiOS(evt.target.checked);
  };
  
  React.useEffect(() => {
    modelViewerRef.current.addEventListener('error', (evt) => {
      console.log(`Loading model error: ${evt.detail.type}`);
      setLoadError(true);
    });
  });
  
  return (
    <div className="App container mt-3">
        <form className="row">
            <div className="form-group col-12 col-sm-6 mb-4">
                <label htmlFor="modelFileInput">Select a glb/glTF file</label>
                <input type="file" accept=".glb,.gltf" className="form-control-file" id="modelFileInput" name="modelFileInput" onChange={(e) => {
                    handleFileChange(e.target.files);
                }} />
            </div>
            <div className="col-12 col-sm-6 mb-4">
                <div className="form-check mb-2">
                    <input type="checkbox" className="form-check-input" id="enableUsdz" name="enableUsdz" value="enableUsdz" aria-label="Checkbox for enabling iOS AR" onChange={handleIOSCheckboxChange} />
                    <label className="form-check-label" for="enableUsdz">Enable iOS AR feature</label>
                </div>
                {
                    enableiOS && (
                        <div className="form-group">
                            <label for="usdzFileInput">Select a USDZ file</label>
                            <input type="file" accept=".usdz" className="form-control-file" id="usdzFileInput" name="usdzFileInput" onChange={(e) => {
                                handleFileChange(e.target.files);
                            }} />
                        </div>
                    )
                }
            </div>
            
        </form>
        {
            loadError && (
                <div className="row">
                    <div className="col-12">
                        <div className="alert alert-danger" role="alert">Only glb or gltf files are supported.</div>
                    </div>
                </div>
            )
        }
        <div className="row">
            <div className="model-viewer-box col-12">
            <model-viewer class="model-viewer" src={file} ar auto-rotate camera-controls ios-src={usdz} ref={modelViewerRef} />
            </div>
        </div>
    </div>
  )
};

export default LocalUploader;