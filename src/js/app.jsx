import React from 'react';
import ReactDOM from 'react-dom';
import logger from './logger.jsx';

import RootComponent from './components/RootComponent.jsx';

require("./globals.jsx");

var log = logger.getLogger("App");

class App {
  constructor() {

  }

}

window.app = new App();

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    (
      <RootComponent />
    ),
    document.getElementById("root")
  );
});
