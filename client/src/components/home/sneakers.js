import React from 'react';

export default class Sneakers extends React.Component {
		constructor() {
		super()
		this.openSlide = this.openSlide.bind(this);
		this.closeSlide = this.closeSlide.bind(this);
		this.scrollEvent = this.scrollEvent.bind(this);
		this.resizeEvent = this.resizeEvent.bind(this);
		this.state = {
			slideRight: -100,
			displayOpen: true,
			displayClose: false,
			sliderDisplay: 'block',
			triggerSlide: true
		}
	}
	openSlide() {
		this.setState(() => {
			return {
				slideRight: -40,
				displayOpen: false,
				displayClose: true
			};
		});
	}
	closeSlide() {
		this.setState(() => {
			return {
				slideRight: -100,
				displayOpen: true,
				displayClose: false
			}
		});
	}
	componentWillUnmount() {
    	document.removeEventListener('scroll', this.scrollEvent);
    	document.removeEventListener('scroll', this.resizeEvent);
	}
	resizeEvent() {
		const windowWidth = window.innerWidth;
			if (windowWidth <= 965) {
				this.setState(() => {
					return {
						sliderDisplay: 'none',
						displayOpen: false,
						displayClose: false,
						triggerSlide: false
					}
				});
			} else {
				this.setState(() => {
					return {
						sliderDisplay: 'block',
						displayOpen: true,
						displayClose: false,
						slideRight: -100,
						triggerSlide: true
					}
				});
			}
	}
	scrollEvent() {
		const windowWidth = window.innerWidth;
		const sneakerSection = document.getElementsByClassName('sneakers-section');
		if (sneakerSection[0].offsetTop / 1.1 <= window.scrollY && this.state.triggerSlide === true && windowWidth >= 965) {
			this.setState(() => {
				return {
					slideRight: -40,
					displayOpen: false,
					displayClose: true,
					triggerSlide: false
				};
			});
		}
	}
	componentWillMount() {
		const windowWidth = window.innerWidth;
		document.addEventListener('scroll', this.scrollEvent);
		this.resizeEvent();
		document.addEventListener('resize', this.resizeEvent);
	}
	render() {
		return (
			<section className="sneakers-section">
				<div className="sneakers-background-header">
					<h3>SNEAKERS</h3>
				</div>
				<div className="sneakers-photos-container">
					<div style={{display: this.state.displayOpen ? 'block' : 'none'}} className="sneakers-arrow-open" onClick={this.openSlide}>
						<p className="fa fa-arrow-left" aria-hidden="true"></p>
					</div>
					<div style={{display: this.state.displayClose ? 'block' : 'none'}} className="sneakers-arrow-close" onClick={this.closeSlide}>
						<p className="fa fa-arrow-right" aria-hidden="true"></p>
					</div>
					<div className="sneakers-background">
						<img src="/img/sneakers-background.jpg" />
						<button onClick={() => {
							this.props.goToClothesPage.push('/clothes');
					}}>SHOP ALL SNEAKERS</button>
					</div>
					<div style={{right: this.state.slideRight + '%', display: this.state.sliderDisplay }} className="sneakers-image-slider" onClick={() => {
						this.props.goToClothesPage.push('/clothes');
					}}>
						<div className="sneakers-slider-top">
							<div className="slide-image">
								<img src="/img/sneaker-slider1.jpg" />
								<div className="sneaker-image-info">
									<p>NIKE COLLECTION</p>
									<p className="fa fa-arrow-right" aria-hidden="true"></p>
								</div>
							</div>
							<div className="slide-image">
								<img src="/img/sneaker-slider2.jpg" />
								<div className="sneaker-image-info">
									<p>ADIDAS COLLECTION</p>
									<p className="fa fa-arrow-right" aria-hidden="true"></p>
								</div>
							</div>
							<div className="slide-image transparent-image">
								<img src="/img/sneaker-slider1.jpg" />
							</div>
						</div>
						<div className="sneakers-slider-bottom">
							<div className="slide-image">
								<img src="/img/sneakers-slider3.jpg" />
								<div className="sneaker-image-info">
									<p>NEW BALANCE COLLECTION</p>
									<p className="fa fa-arrow-right" aria-hidden="true"></p>
								</div>
							</div>
							<div className="slide-image">
								<img src="/img/sneaker-slider4.jpg" />
								<div className="sneaker-image-info">
									<p>PUMA COLLECTION</p>
									<p className="fa fa-arrow-right" aria-hidden="true"></p>
								</div>
							</div>
							<div className="slide-image transparent-image">
								<img src="/img/sneaker-slider1.jpg" />
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

