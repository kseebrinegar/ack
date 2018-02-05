import React from 'react';

const Footer = () => {
	return (
		<footer>
			<h3>ALLCITYKICKS</h3>
			<div className="footer-container">
				<div className="footer-left-list">
					<ul>
						<li>1500 WEALTHY ST. SE</li>
						<li>|</li>
						<li>GRAND RAPIDS, MI 49503</li>
						<li>|</li>
						<li>616.252.6790</li>
					</ul>
					<div className="footer-icons">
						<p className="fa fa-twitter fa-lg footer-icon" ></p>
						<p className="fa fa-facebook-square fa-lg footer-icon" aria-hidden="true"></p>
						<p className="fa fa-instagram fa-lg footer-icon" aria-hidden="true"></p>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;