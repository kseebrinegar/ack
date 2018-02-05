import React from 'react';

export default class Products extends React.Component {
	constructor(props) {
		super(props)
		this.checkListForButton = this.checkListForButton.bind(this);
		this.scrollEvent = this.scrollEvent.bind(this);
		this.state = {
			products: [
				{
					image: '/img/product1.jpg',
					info: 'ALL PRO FIT NIKE HAT',
					animation: ''
				},
				{
					image: '/img/product6.jpg',
					info: 'OAKLEY CUSTOM JUNIOR',
					classCircle: 'position-realtive-cicle',
					animation: ''
				},
				{
					image: '/img/product3.jpg',
					info: 'LRG BIG TREES SNAPBACK',
					animation: ''
				},
				{
					image: '/img/product5.jpg',
					info: 'NIKE AIR PRECISION NBK',
					animation: ''
				},
				{
					image: '/img/product2.jpg',
					info: 'LRG 4 ICONS 9FIFTY',
					animation: ''
				},
				{
					image: '/img/product4.jpg',
					info: 'NIKE TANJUN WOMENS RUNNING SHOESS WOLF GREY',
					animation: ''
				},
			]		
		}
	}
	checkListForButton(item) {
		if (item.className) {
			return (<button className="cicle-plus-border">
					<div className="circle-plus">
						<p className="plus">+</p>
					</div>
					</button>
				);
		} 
	}
	componentWillUnmount() {
    	document.removeEventListener('scroll', this.scrollEvent);
	}
	scrollEvent() {
		const products = document.getElementsByClassName('products');
		if (products[0].offsetTop / 1.25 <= window.scrollY) {
				this.setState(() => {
					return {
						products: [
							{
								image: '/img/product1.jpg',
								info: 'ALL PRO FIT NIKE HAT',
								animation: 'flip 0.5s ease-in-out 0s 1 normal forwards'
							},
							{
								image: '/img/product2.jpg',
								info: 'DC CUSTOM JUNIOR',
								className: 'position-realtive-cicle',
								animation: 'flip 0.5s ease-in-out .25s 1 normal forwards'
							},
							{
								image: '/img/product3.jpg',
								info: 'LRG BIG TREES SNAPBACK',
								animation: 'flip 0.5s ease-in-out .5s 1 normal forwards'
							},
							{
								image: '/img/product5.jpg',
								info: 'NIKE AIR PRECISION NBK',
								animation: 'flip 0.5s ease-in-out 0.75s 1 normal forwards'
							},
							{
								image: '/img/product6.jpg',
								info: 'LRG 4 ICONS 9FIFTY',
								animation: 'flip 0.5s ease-in-out 1s 1 normal forwards'
							},
							{
								image: '/img/product4.jpg',
								info: 'NIKE TANJUN WOMENS',
								animation: 'flip 0.5s ease-in-out 1.25s 1 normal forwards'
							},
						]	
					}
				});
			}
	}
	componentDidMount() {
		document.addEventListener('scroll', this.scrollEvent);
	}
	render() {
		return (
			<div className="products">
				<ul>
				{
					this.state.products.map((item) => {
						return (
							<li style={{animation: item.animation}} key={item.info} onClick={() => {
								this.props.goToClothesPage.push('/clothes');
							}}>
								<img src={item.image} />
								<p>{item.info}</p>
								{
									this.checkListForButton(item)
								}
							</li>
						);
					})
				}
				</ul>
				<button className="products-button" onClick={() => {
					this.props.goToClothesPage.push('/clothes');
				}}>SEE ALL TYPE BUYS</button>
			</div>
		);
	}
}
