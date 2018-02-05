import React from 'react';

export default class Blog extends React.Component {
	constructor() {
		super()
		this.state = {

		}
	}
	render() {
		return (
			<div>
				<div className="info-on-free-shipping-banner">
					<p>Free Shipping on Orders over <span>$29</span></p>
				</div>
				<section className="blog">
					<div className="blog-banner">
						<img src="/img/blog-banner.jpg" />
					</div>
					<blockquote>
					"Don't be into trends. Don't make fashion own you, but you decide what you are, 
					what you want to express by the way you dress and the way to live."
					<span> -Gianni Versace</span>
					</blockquote>
					<h2 className="we-recommend">FEATURED POSTS</h2>
					<p className="angled-red-line margin-bottom"></p>
					<div className="blog-posts-container">
						<div className="blog-posts">
							<div className="single-blog-post">
								<div className="blog-post-img-container">
									<img src="/img/blog1.png" />
									<div className="read-post">
										<p>READ POST</p>
									</div>
								</div>
								<div className="blog-post-description">
									<h3>DATE OUTFIT FOR VALENTINES DAY!</h3>
									<p>celebrating Valentine's...</p>
								</div>
							</div>
							<div className="single-blog-post">
								<div className="blog-post-img-container">
									<img src="/img/blog2.png" />
									<div className="read-post">
										<p>READ POST</p>
									</div>
								</div>
								<div className="blog-post-description">
									<h3>HOW TO WEAR EMBROIDERY AND JEANS</h3>
									<p>Embroidery is springing up everywhere. Channel...</p>
								</div>
							</div>
							<div className="single-blog-post">
								<div className="blog-post-img-container">
									<img src="/img/blog3.png" />
									<div className="read-post">
										<p>READ POST</p>
									</div>
								</div>
								<div className="blog-post-description">
									<h3>HOW TO WEAR JEANS WITH BOOTS</h3>
									<p>Not too high, not to low, the versatile boots can...</p>
								</div>
							</div>
							<div className="single-blog-post">
								<div className="blog-post-img-container">
									<img src="/img/blog4.png" />
									<div className="read-post">
										<p>READ POST</p>
									</div>
								</div>
								<div className="blog-post-description">
									<h3>THREE DENIM TRENDS TO TRY THIS YEAR</h3>
									<p>A-hem! As your've probably noticed, hem detailing...</p>
								</div>
							</div>
							<div className="single-blog-post">
								<div className="blog-post-img-container">
									<img src="/img/blog5.png" />
									<div className="read-post">
										<p>READ POST</p>
									</div>
								</div>
								<div className="blog-post-description">
									<h3>BEST 80'S STYLE DENIM JACKETS ON MEN</h3>
									<p>Jackets that were popular in the 80's...</p>
								</div>
							</div>
							<div className="single-blog-post">
								<div className="blog-post-img-container">
									<img src="/img/blog8.png" />
									<div className="read-post">
										<p>READ POST</p>
									</div>
								</div>
								<div className="blog-post-description">
									<h3>HOW TO STYLE LEGGINGS & JEGGINGS THIS SEASON</h3>
									<p>Hitting the road this spring...</p>
								</div>
							</div>
							<div className="single-blog-post">
								<div className="blog-post-img-container">
									<img src="/img/blog7.png" />
									<div className="read-post">
										<p>READ POST</p>
									</div>
								</div>
								<div className="blog-post-description">
									<h3>UNIQUE SWEATERS THAT PEOPLE ARE WEARING</h3>
									<p>Why are people wearing...</p>
								</div>
							</div>
							<div className="single-blog-post">
								<div className="blog-post-img-container">
									<img src="/img/blog6.png" />
									<div className="read-post">
										<p>READ POST</p>
									</div>
								</div>
								<div className="blog-post-description">
									<h3>HOW TO WEAR A CHUNKY CARDIGAN</h3>
									<p>What's cozy, has been compared to a jacket...</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}