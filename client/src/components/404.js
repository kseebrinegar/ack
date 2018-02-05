import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

export default class PageNotFound extends React.Component {
	render() {
		return (
			<div>
				<div className="info-on-free-shipping-banner">
					<p>Free Shipping on Orders over <span>$29</span></p>
				</div>
				<div className="page-404">
					<h1>404 error</h1>
					<p>Sorry, but this page doesn't exist!</p>
					<p>Please return to website...<Link to="/">Go Home</Link></p>
					<img src="/img/404-cry-baby.png" />
				</div>
			</div>
		);
	}
}

