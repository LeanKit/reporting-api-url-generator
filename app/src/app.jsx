import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from "react-router";
import React from "react";
import ReactDOM from "react-dom";
import Home from "./src/components/Home";
import Help from "./src/components/Help";

const $ = jQuery = global.$ = global.jQuery = require( "jquery" );
require( "bootstrap" );

document.addEventListener( "DOMContentLoaded", () => {
	ReactDOM.render( (
		<Router>
			<Route path="/" component={ Home } />
			<Route path="/help" component={ Help } />
		</Router>
	), document.getElementById( "app" ) );

	// ReactDOM.render( <Home />, document.getElementById( "app" ) );
} );
