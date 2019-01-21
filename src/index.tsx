import * as  React from "react";
import * as  ReactDOM from "react-dom";

import "./index.style";

import App from "./components/App/App";

const target = document.createElement("div");
document.body.appendChild(target);

function render() {
	ReactDOM.render(<App />, target);
}

render();
