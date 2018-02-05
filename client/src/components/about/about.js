import React from 'react';

class About extends React.Component {
	constructor() {
		super()
	}
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	render() {
		return (
			<div>
				<div className="info-on-free-shipping-banner">
					<p>Free Shipping on Orders over <span>$29</span></p>
				</div>
				<section className="about-section">
					<div className="about-banner">
					
						<img src="/img/about-banner.jpg" />
					</div>
					<div className="about-section-one">
						<div className="story-so-far">
							<div className="story-so-far-para">
								<h2>OUR STORY SO FAR</h2>
								<p>Sometimes the simplest things are the hardest to find.
								We imagined a line of our favorite pieces, the things we
								would live in every day, all year round. So we stopped looking
								and started designing.
								</p>
							</div>
						</div>
						<div className="about-pic-one-container">
							<img className="about-pic-one" src="/img/about-pic1.jpg" />
						</div>
					</div>
					<div className="about-section-two">
						<div className="about-section-two-child">
							<div className="our-approach">
								<div className="our-approach-para">
									<h2>OUR APPROACH</h2>
									<p>We believe in good change, value out of versatility, and thoughtful
									services. Product and process should be easy and effortless. our edited
									essentials and our exclusively digital experience look forward, not back.
									</p>
								</div>
							</div>
							<div className="about-pic-two-container">
								<img className="about-pic-two" src="/img/about-pic3.jpg" />
							</div>
							<div className="our-approach-two">
								<div className="our-approach-para">
									<h2>OUR DENIM</h2>
									<p>It all began the perfect pair of jeans. We work with the world's 
									best mills, the country's best wash master, and L.A's best factories
									to create our denim. There isn't one thing on our jeans that hasn't
									been highly considered. We obsess over fabric, fit, and flattering 
									details.
									</p>
									<button>LEARN MORE</button>
								</div>
							</div>
							<div className="about-pic-two-container-two">
								<img className="about-pic-two" src="/img/about-pic2.jpg" />
							</div>
						</div>
					</div>
					<div className="about-section-one">
						<div className="our-approach">
							<div className="story-so-far-para">
								<h2>ARTIST IN RESIDENCE</h2>
								<p>Each season, we partner with one independent artist create a 
								limited-issue line of a graphic tees. The exclusive artwork is 
								hand-printed in small quantities in Brooklyn, so each piece is 
								truly one-of-a-kind.
								</p>
								<button>LEARN MORE</button>
							</div>
						</div>
						<div className="about-pic-two-container">
							<img className="about-pic-one" src="/img/about-pic4.jpg" />
						</div>
					</div>
					<div className="about-section-three">
						<h2 className="collection-header">2018 Collection Available Now</h2>
						<div>
							<button>SHOP COLLECTION</button>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default About;