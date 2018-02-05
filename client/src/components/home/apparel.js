import React from 'react';

const Apparel = (props) => {
	return (
		<section className="apparel-section">
			<div className="apparel-background-header">
				<h3>APPAREL</h3>
			</div>
			<div className="apparel-photos-container">
				<div className="apparel-photos" onClick={() => {
				props.goToClothesPage.push('/clothes');
			}}>
					<div className="apparel-photo-container-left">
						<div className="apparel-photo-child-container-top">
							<img src="/img/apparel1.jpg" />
						</div>
						<div className="apparel-photo-child-container-bottom">
							<div className="apparel-photo-child-container-bottom-left">
								<img src="/img/apparel3.jpg" />
							</div>
							<div className="apparel-photo-child-container-bottom-right">
								<img src="/img/apparel2.jpg" />
							</div>
						</div>
					</div>
					<div className="apparel-photo-container-right">
						<button className="cicle-plus-border-apparel">
							<div className="circle-plus-apparel">
								<p className="apparel-plus">+</p>
							</div>
						</button>
						<img src="/img/apparel4p.jpg" />
					</div>
				</div>
				<button className="products-button" onClick={() => {
					props.goToClothesPage.push('/clothes');
				}}>SHOP ALL APPAREL</button>
			</div>
		</section>
	);
}

export default Apparel