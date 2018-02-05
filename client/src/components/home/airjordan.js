import React from 'react';
import { NavLink } from 'react-router-dom';

const AirJordan = (props) => {
	return (
		<section className="airjordan">
			<div className="jordan-image-banner">
				<img src="img/nike.jpg" className="banner-image" /> 
				<img src="img/dk.jpg" className="banner-image" />
				<img src="img/reebok.jpg" className="banner-image" />
				<img src="img/north.jpg" className="banner-image" /> 
				<img src="img/10-deep.jpg"className="banner-image" /> 
				<img src="img/vans.jpg" className="banner-image" />
				<img src="img/clae.jpg" className="banner-image" /> 
				<img src="img/adidas.jpg" className="banner-image" />
				<img src="img/crooks.jpg"className="banner-image" /> 
				<img src="img/quicksilver.jpg" className="banner-image"/>
			</div>
			<div className="airjordan-product-container">
				<div className="jordan-shoes">
					<img style={{right: props.animationJordan.right + '%', opacity: props.animationJordan.opacity}} src="/img/jordan-shoes.png" />
				</div>
				<div  className="jordan-info">
					<div style={{left: props.animationJordan.left + '%', opacity: props.animationJordan.opacity}} className="jordan-info-container">
						<p>LIMITED REALEASE</p>
						<h2>Air Jordan 4 DUNK FROM ABOVE</h2>
						<p className="jordan-price">$275</p>
						<p className="jordan-para">
							The Air Jordan 4 Dunk From Above is set to be a part of the upcoming
							Jordan Brand Dunk From Above collection that also includes the Air Jordan
							5 Low Dunk From Above. This collection is said to be inspired by Michael
							Jordan's relentess ability to take flight, soar in the air and throw it down on
							his opponents.
						</p>
					</div>
					<div className="jordan-button">
						<button onClick={() => {
							props.goToClothesPage.push('/clothes');
						}}>PICK EM UP</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default AirJordan;

















