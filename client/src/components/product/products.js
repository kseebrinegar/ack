import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import productInfo from '../../actions/productInfo';
import addToCartAction from '../../actions/newItemToCart';

class Products extends React.Component {
	constructor(props) {
		super(props)
		this.pickShoeSizePopUp = this.pickShoeSizePopUp.bind(this);
		this.toggleShoeSizePopUp = this.toggleShoeSizePopUp.bind(this);
		this.addToCart = this.addToCart.bind(this);
		this.maxCountPerItem = this.maxCountPerItem.bind(this);
		this.notifyContent = this.notifyContent.bind(this);
		this.removePopUpModule = this.removePopUpModule.bind(this);
		this.state = {
			toggleOpen: 'display-closed',
			productSize: this.props.location.state.defaultSize,
			error: 'display-closed product-size-error',
			notifyUserToggle: 'nofity-added-to-cart-before-animation',
			notifyUserContent: true
		}
	}
	maxCountPerItem(productData, productSize) {
		let findItemInCart = this.props.cart.filter((element) => {
			return element.name === productData.name && element.defaultSize === productSize;
		});
		if (findItemInCart.length !== 0) {
			if (Number(findItemInCart[0].qty) < 10) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	addToCart(productData, productSize) {
		const isMaxQtyEqual10 = this.maxCountPerItem(productData, productSize);
		if (this.props.productInfo.sizes.length === 0) {
				this.setState((preveState) => {
					return {
						toggleOpen: 'display-closed',
						productSize: preveState.productSize,
						error: 'display-closed product-size-error',
						notifyUserToggle: 'nofity-added-to-cart-after-animation',
						notifyUserContent:  !isMaxQtyEqual10 ? true : false
					}
				});
				if (isMaxQtyEqual10) {
					return;
				}
				const addQtyToProductData = {
					...productData,
					defaultSize: productSize,
					qty: 1
				};
				this.props.addToCartAction(addQtyToProductData);
				return;
		} 

		const checkForSize = productSize;
		const arraySizePossiabilties = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10',
										'10.5', '11', '11.5', '12', '12.5', '13', '14', 'S', 
										'M', 'L', 'XL', 'XXL'];

		const check = arraySizePossiabilties.some((element) => {
			return element.toString() === checkForSize;
		});
		if (check && !isMaxQtyEqual10) {
			const addQtyToProductData = {
				...productData,
				defaultSize: productSize,
				qty: 1
			};
			this.props.addToCartAction(addQtyToProductData);
			this.setState((preveState) => {
				return {
					toggleOpen: 'display-closed',
					productSize: preveState.productSize,
					error: 'display-closed product-size-error',
					notifyUserToggle: 'nofity-added-to-cart-after-animation',
					notifyUserContent: !isMaxQtyEqual10 ? true : false
				}
			});
			return;
		}	

		this.setState((preveState) => {
			return {
				toggleOpen: 'display-closed',
				productSize: preveState.productSize,
				error: check ? 'display-closed product-size-error' : 'display-open product-size-error',
				notifyUserToggle: check ? 'nofity-added-to-cart-after-animation' : 'nofity-added-to-cart-before-animation',
				notifyUserContent: !isMaxQtyEqual10 ? true : false
			}
		});
	}
	toggleShoeSizePopUp() {
		if (this.props.productInfo.sizes.length !== 0) {
			this.setState((preveState) => {
				return {
					toggleOpen: preveState.toggleOpen === 'display-open' ? 'display-closed' : 'display-open',
					productSize: preveState.productSize,
					error: preveState.error,
					notifyUserToggle: preveState.notifyUserToggle,
					notifyUserContent: preveState.notifyUserContent
				}
			});
		}
	}
	pickShoeSizePopUp(e) {
		const event = e.target.textContent;
		if (this.props.productInfo.sizes.length !== 0) {
			this.setState((preveState) => {
				return {
					toggleOpen: preveState.toggleOpen === 'display-open' ? 'display-closed' : 'display-open',
					productSize: event,
					error: 'display-closed product-size-error',
					notifyUserToggle: preveState.notifyUserToggle,
					notifyUserContent: preveState.notifyUserContent
				}
			});
		}
	}
	removePopUpModule() {
		this.setState((preveState) => {
			return {
				toggleOpen: preveState.toggleOpen,
				productSize: preveState.productSize,
				error: preveState.error,
				notifyUserToggle: 'nofity-added-to-cart-before-animation',
				notifyUserContent: preveState.notifyUserContent
			}
		});
	}
	componentWillMount() {
		const { id, productType } = this.props.location.state;
		this.props.getProductInfo(id, productType);
		window.scrollTo(0, 0);
	}
	notifyContent(checkBoolean) {
		if (checkBoolean) {
			return 'Item added to cart.';
		} else {
			return 'Sorry, maximum amount allowed is 10 items.';
		}
	}
	render() {
		return (
			<div>
				<div className={this.state.notifyUserToggle}>
					<div>
						<p>{this.state.notifyUserContent ? this.notifyContent(true) : this.notifyContent(false)}</p>
						<button onClick={() => {
								this.removePopUpModule()
							}}
						>Okay</button>
					</div>
				</div>
				<div className="info-on-free-shipping-banner">
					<p>Free Shipping on Orders over <span>$29</span></p>
				</div>
				<div className="individual-product">
					<div className="individual-product-productimg">
						<img src={this.props.productInfo.img} />
					</div>
					<div className="individual-product-info">
						<p>{this.props.productInfo.name}</p>
						<p className="individual-product-info-price">${this.props.productInfo.price}</p>
						<p className="individual-product-info-colors">{this.props.productInfo.color}</p>
						<div className="indivdual-product-rank">
							<div className="indivdual-highest-rated-rank">
								<div className="highest-rated-rank">
									<p>{this.props.productInfo.rank}</p>
								</div>
								<p className="rank-para">Rank</p>
							</div>
							<div className="individual-star-rank">
								<ul className="individual-star-rank-list">
								{
									this.props.productInfo.stars ? this.props.productInfo.stars.map((num) => {
										return <li key={this.props.productInfo.productId + Math.random()} className="fa fa-star" aria-hidden="true"></li>
									}) : ''
		
								}
								</ul>
								<p className="review-para">Review</p>
							</div>
						</div>
						<button onClick={this.toggleShoeSizePopUp} className="product-popup-info-button">
							<p>{this.state.productSize}<span className="fa fa-chevron-right"></span></p>
						</button>
						<p className={this.state.error}>Please Select a Size</p>
						<div className={"indivdual-product-info-button-sizes" + ' ' + this.state.toggleOpen}>
							<ul>
								{
									this.props.productInfo.sizes ? this.props.productInfo.sizes.map((item) => {
										return <li key={Math.random() + 10}   onClick={this.pickShoeSizePopUp}>{item}</li>
									}) : ''
								}
							</ul>
						</div>
						<button onClick={() => {
							this.addToCart(this.props.productInfo, this.state.productSize)
						}} className="product-popup-Add-to-cart responsive-add-to-cart">
							<p>ADD TO CART</p>
						</button>
					</div>
				</div>
				<div className="more-info-on-product">
					<h2>PRODUCT INFO</h2>
					<h3>{this.props.productInfo.name}</h3>
					<p>Tristan, the Trase, and a funk-ton of spray paint. Introducing an abstract edge to a classic slip-on 
					skate shoe. A creative blend of comfortable ergonomics and unique design features, switch up your style 
					in these printed canvas kicks with our signature sticky rubber outsole.</p>
					<h3>Nuts and the Bolts</h3>
					<ul>
						<li className="add-disc">Suede upper for durability</li>
						<li className="add-disc">Reinforced rubber toe Hat</li>
						<li className="add-disc">Elastic gore inserts</li>
						<li className="add-disc">Sketch mesh sock liner with screen printed logo</li>
						<li className="add-disc">Vulcanized construction for great board-feel and flex</li>
					</ul>
					<h4>Shipping</h4>
					<p className="policy-and-shipping"><a href="">Click here</a> for our entire shipping policy and rates</p>
					<h4>Returns</h4>
					<p className="policy-and-shipping"><a href="">Click here</a> for our entire return policy</p>
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		cart: state.cart,
		productInfo: state.productInfo
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getProductInfo: productInfo,
		addToCartAction: addToCartAction
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
