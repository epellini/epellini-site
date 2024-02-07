import React, { useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "./App.css";
import { Fragment } from "react";

function App() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "assets/5.loader.js",
    dataUrl: "assets/5.data",
    frameworkUrl: "assets/5.framework.js",
    codeUrl: "assets/5.wasm",
  });

  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

  useEffect(
    function () {
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
      };
    },
    [devicePixelRatio]
  );

  return (
    <Fragment>
      {!isLoaded && (
        <h1  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading Game... {Math.round(loadingProgression * 100)}%</h1>
      )}
    <div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
      <Unity
        unityProvider={unityProvider}
        style={{ width: 1280, height: 720 }}
        devicePixelRatio={devicePixelRatio}
        />
    </div>
        </div>
        </Fragment>
  );
}

export default App;