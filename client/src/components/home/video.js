import React from 'react';

export default class Video extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	render() {
		return (
			<section className="video">
				<div className="video-container">
					<img src="/img/movie-first-background.jpg" />
					<h3 className="video-header1">GRAND</h3>
					<h3 className="video-header2">RAPIDS</h3>
					<div className="video-para">
						<p>42.9612 N, 85.6557 W</p>
						<p>1500 WEALTHY ST SE GRAND RAPIDS, MI 49503</p>
					</div>
					<div className="top-picture">
						<img src="/img/movie-second-background.jpg" />
					</div>
					<div className="position-realitive-play-button">
						<div className="line"></div>
						<button className="circle-play">
							<div className="inner-circle-play">
								<p className="fa fa-play" aria-hidden="true"></p>
							</div>
						</button>
					</div>
				</div>
			</section>

		);
	}
}
