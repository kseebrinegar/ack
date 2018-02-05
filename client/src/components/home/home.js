import React from 'react';
import Carousel from './carousel';
import AirJordan from './airjordan';
import Products from './products';
import Video from './video';
import Apparel from './apparel';
import Sneakers from './sneakers';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.scrollEvent = this.scrollEvent.bind(this);
		this.state = {
			jordan: {
				opacity: 0,
				right: -100,
				left: -200
			}
		};	
	}
	componentWillUnmount() {
    	document.removeEventListener('scroll', this.scrollEvent);
	}
	componentDidMount() {
		window.scrollTo(0, 0);
		document.addEventListener('scroll', this.scrollEvent);
	}
	scrollEvent() {
		const jordanShoe = document.getElementsByClassName('airjordan');
		if (jordanShoe[0].offsetTop / 1.5 <= window.scrollY) {
			this.setState(() => {
				return {
					jordan: {
						opactiy: 1,
						right: -20,
						left: 0
					}
				}	
			});
		}
	}
	render() {
		return (
			<div>
				<Carousel />
				<AirJordan animationJordan={this.state.jordan} goToClothesPage={this.props.history} />
				<Products goToClothesPage={this.props.history} />
				<Video />
				<Sneakers goToClothesPage={this.props.history}  />
				<Apparel goToClothesPage={this.props.history} />
			</div>
		);
	}
}

