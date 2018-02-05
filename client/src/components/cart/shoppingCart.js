import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import chooseCatagoryAndFilters from '../../selectors/chooseCatagoryAndFilter';
import countTheCartItems from '../../selectors/countTheCartItems';
import countTotalCost from '../../selectors/countTotalCost';
import removeCartItem from '../../actions/removeCartItem';
import changeAmountOfItem from '../../actions/changeAmountOfItem';
import addToCartAction from '../../actions/newItemToCart';
import CartItems from './cartitems';

class Cart extends React.Component {
	constructor(props) {
		super(props)
		this.onInputChange = this.onInputChange.bind(this);
		this.cartIsEmpty = this.cartIsEmpty.bind(this);
		this.productPopUp = this.productPopUp.bind(this);
		this.addToCart = this.addToCart.bind(this);
		this.pickShoeSizePopUp = this.pickShoeSizePopUp.bind(this);
		this.toggleShoeSizePopUp = this.toggleShoeSizePopUp.bind(this);
		this.notifyContent = this.notifyContent.bind(this);
		this.removePopUpModule = this.removePopUpModule.bind(this);
		this.CheckIfLoggedIn = this.CheckIfLoggedIn.bind(this);
		this.state = {
			cart: [],
			toggleDisplayMoreThen10: 'display-closed',
			toggleDisplayLessThen1: 'display-closed',
			productPopUp: {
				toggleOpen: 'display-closed',
				checkoutButton: 'display-closed',
				size: 'Please Select a Size',
				toggleProductPopUp: 'display-closed add-product-background',
				checkForSize: 'display-closed product-size-error',
				productData: {
					productId: 0,
					img: '',
					name: '',
					stars: [],
					item: 0,
					color: '',
					price: 0,
					sizes: [],
					defaultSize: '',
					productType: ''
				}
			},
			notifyUserToggle: 'nofity-added-to-cart-before-animation',
			notifyUserContent: true	
		}
	}
	toggleShoeSizePopUp() {
		if (this.state.productPopUp.productData.sizes.length !== 0) {
			this.setState((preveState) => {
				return {
					productPopUp: {
						toggleOpen: preveState.productPopUp.toggleOpen === 'display-open' ? 'display-closed' : 'display-open',
						size: 'Please Select a Size',
						toggleProductPopUp: preveState.productPopUp.toggleProductPopUp,
						checkForSize: 'display-closed product-size-error',
						productData: {
							productId: preveState.productPopUp.productData.productId,
							img: preveState.productPopUp.productData.img,
							name: preveState.productPopUp.productData.name,
							stars: preveState.productPopUp.productData.stars,
							item: preveState.productPopUp.productData.item,
							color: preveState.productPopUp.productData.color,
							price: preveState.productPopUp.productData.price,
							sizes: preveState.productPopUp.productData.sizes,
							defaultSize: preveState.productPopUp.productData.defaultSize,
							productType: preveState.productPopUp.productData.productType
						}
					}	
				}
			});
		}
	}
	pickShoeSizePopUp(e) {
		const event = e.target.textContent
		this.setState((preveState) => {
			return {
				productPopUp: {
					toggleOpen: 'display-closed', 
					size: event,
					toggleProductPopUp: preveState.productPopUp.toggleProductPopUp,
					checkForSize: preveState.productPopUp.checkForSize,
						productData: {
						productId: preveState.productPopUp.productData.productId,
						img: preveState.productPopUp.productData.img,
						name: preveState.productPopUp.productData.name,
						stars: preveState.productPopUp.productData.stars,
						item: preveState.productPopUp.productData.item,
						color: preveState.productPopUp.productData.color,
						price: preveState.productPopUp.productData.price,
						sizes: preveState.productPopUp.productData.sizes,
						defaultSize: event,
						productType: preveState.productPopUp.productData.productType
					}
				}
			}
		});

	}
	notifyContent(checkBoolean) {
		if (checkBoolean) {
			return 'Item added to cart.';
		} else {
			return 'Sorry, maximum amount allowed is 10 items.';
		}
	}
	removePopUpModule() {
		this.setState((preveState) => {
			return {
				notifyUserToggle: 'nofity-added-to-cart-before-animation',
				notifyUserContent: preveState.notifyUserContent
			}
		});
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
		if (this.state.productPopUp.productData.sizes.length === 0) {
			this.setState((preveState) => {
				return {
					productPopUp: {
						toggleOpen: preveState.productPopUp.toggleOpen,
						size: 'Please Select a Size',
						toggleProductPopUp: 'display-closed add-product-background',
						checkForSize: 'display-closed product-size-error',
						productData: {
							productId: preveState.productPopUp.productData.productId,
							img: preveState.productPopUp.productData.img,
							name: preveState.productPopUp.productData.name,
							stars: preveState.productPopUp.productData.stars,
							item: preveState.productPopUp.productData.item,
							color: preveState.productPopUp.productData.color,
							price: preveState.productPopUp.productData.price,
							sizes: preveState.productPopUp.productData.sizes,
							defaultSize: preveState.productPopUp.productData.defaultSize,
							productType: preveState.productPopUp.productData.productType
						}
					},
					notifyUserToggle: 'nofity-added-to-cart-after-animation',
					notifyUserContent:  !isMaxQtyEqual10 ? true : false
				}
			});
			if (isMaxQtyEqual10) {
				return;
			}
			const addQtyToProductData = {
				...productData,
				qty: 1
			};
			this.props.addToCartAction(addQtyToProductData);
			return;
		}
		const checkForSize = this.state.productPopUp.size;
		const arraySizePossiabilties = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10',
										'10.5', '11', '11.5', '12', '12.5', '13', '14', 'S', 
										'M', 'L', 'XL', 'XXL'];
		const check = arraySizePossiabilties.some((element) => {
			return element === checkForSize;
		});
	
		if (check && !isMaxQtyEqual10) {
			const addQtyToProductData = {
				...productData,
				qty: 1
			};
			this.props.addToCartAction(addQtyToProductData);
			this.setState((preveState) => {
				return {
					notifyUserToggle: 'nofity-added-to-cart-after-animation',
					notifyUserContent: !isMaxQtyEqual10 ? true : false
				}
			});
			return;
		}
		this.setState((preveState) => {
			return {
				productPopUp: {
					toggleOpen: preveState.productPopUp.toggleOpen,
					size: 'Please Select a Size',
					toggleProductPopUp: check ? 'display-closed add-product-background' : 'display-open add-product-background',
					checkForSize: check ? 'display-closed product-size-error' : 'display-open product-size-error',
					productData: {
						productId: preveState.productPopUp.productData.productId,
						img: preveState.productPopUp.productData.img,
						name: preveState.productPopUp.productData.name,
						stars: preveState.productPopUp.productData.stars,
						item: preveState.productPopUp.productData.item,
						color: preveState.productPopUp.productData.color,
						price: preveState.productPopUp.productData.price,
						sizes: preveState.productPopUp.productData.sizes,
						defaultSize: preveState.productPopUp.productData.defaultSize,
						productType: preveState.productPopUp.productData.productType
					}
				},
				notifyUserToggle: check ? 'nofity-added-to-cart-after-animation' : 'nofity-added-to-cart-before-animation',
				notifyUserContent: !isMaxQtyEqual10 ? true : false
			}
		});
	}
	productPopUp({productId = '', img = '', name = '', stars = '', rank = '', color = '', price = '', sizes = [], defaultSize = '', productType = ''}) {
		if (window.innerWidth >= 865) {
			this.setState((preveState) => {
				return {
					productPopUp: {
						toggleOpen: preveState.productPopUp.toggleOpen,
						size: 'Please Select a Size',
						toggleProductPopUp: preveState.productPopUp.toggleProductPopUp === 'display-closed add-product-background' ? 'display-open add-product-background' : 'display-closed add-product-background',
						checkForSize: 'display-closed product-size-error',
						productData: {
							productId: productId,
							img: img,
							name: name,
							stars: stars,
							item: rank,
							color: color,
							price: price,
							sizes: sizes,
							defaultSize: defaultSize,
							productType: productType
						}
					}
				}
			});
		}
	}
	onInputChange(event, id, size, index) {
		const valueChange = Number(event.target.value);
    	if (isNaN(valueChange)) {
       		return false;
    	}
		if (valueChange.length > 2) {
			this.setState((prevState) => {
				return {
					cart: prevState.cart.map((element) => {
						if (element.productId === id && element.defaultSize === size) {
							element.qty = prevState.cart[index].qty;
							return element;
						} else {
							return element;
						}
					}),
					
				}
			});
		} else if (valueChange > 10) {
			this.setState((prevState) => {
				return {
					cart: prevState.cart.map((element) => {
						if (element.productId === id && element.defaultSize === size) {
							element.qty = valueChange;
							return element;
						} else {
							return element;
						}
					}),
					toggleDisplayMoreThen10: 'display-open',
					toggleDisplayLessThen1: 'display-closed'
				}
			});
		} else if (valueChange < 1) {
			this.setState((prevState) => {
				return {
					cart: prevState.cart.map((element) => {
						if (element.productId === id && element.defaultSize === size) {
							element.qty = valueChange;
							return element;
						} else {
							return element;
						}
					}),
					toggleDisplaMoreThen10: 'display-closed',
					toggleDisplayLessThen1: 'display-open'
				}
			});
		} else {
			this.setState((prevState) => {
				this.props.changeAmountOfItem({valueChange: valueChange, id: id, size: size})
				return {
					cart: prevState.cart.map((element) => {
						if (element.productId === id && element.defaultSize === size) {
							element.qty = valueChange;
							return element;
						} else {
							return element;
						}
					}),
					toggleDisplayMoreThen10: 'display-closed',
					toggleDisplayLessThen1: 'display-closed'
				}
			});
		}
	}
	CheckIfLoggedIn() {
		this.props.isLoggedIn ? this.props.history.push('/checkout') : this.props.history.push('/login', 'checkout');
	}
	cartIsEmpty() {
		return (
			<h2 className="cart-empty-notify">YOUR SHOPPING CART IS CURRENTLY EMPTY</h2>
		);
	}
	componentWillReceiveProps(nextProps) {
		this.setState(() => {
			return {
				cart: nextProps.cart,
				checkoutButton: nextProps.cart.length !==  0 ? 'display-open' : 'display-closed'
			}
		});
	}
	componentWillMount() {
		window.scrollTo(0, 0);
		this.setState(() => {
			return {
				cart: this.props.cart,
				checkoutButton: this.props.cart.length !==  0 ? 'display-open' : 'display-closed'
			}
		});
	}
	render() {
		return (
			<div className="cart-section">
				<div className={this.state.notifyUserToggle}>
					<div>
						<p>{this.state.notifyUserContent ? this.notifyContent(true) : this.notifyContent(false)}</p>
						<button onClick={() => {
								this.removePopUpModule()
							}}
						>Okay</button>
					</div>
				</div>
				<div  className={this.state.productPopUp.toggleProductPopUp === 'display-closed add-product-background' 
				? 'display-closed add-product-background' : 'display-open add-product-background'} 
				>
					<div className="add-product-popup">
						<div onClick={this.productPopUp} className="product-popup-close">
							<p className="fa fa-times"></p>
						</div>
						<div className="product-popup-inner-container">
							<div className="product-popup-image">
								<img src={this.state.productPopUp.productData.img}/>
							</div>
							<div className="product-popup-info">
								<p>{this.state.productPopUp.productData.name}</p>
								<p className="product-popup-info-price">${this.state.productPopUp.productData.price}</p>
								<p className="product-popup-info-colors">{this.state.productPopUp.productData.color}</p>
								<div className={"product-popup-info-button-sizes" + ' ' + this.state.productPopUp.toggleOpen}>
									<ul>
									{
										this.state.productPopUp.productData.sizes.map((item) => {
											return <li key={100 + item} onClick={this.pickShoeSizePopUp}>{item}</li>
										})
									}
									</ul>
								</div>
								<button onClick={this.toggleShoeSizePopUp} className="product-popup-info-button">
									<p>{this.state.productPopUp.productData.defaultSize}<span className="fa fa-chevron-right"></span></p>
								</button>
								<p className={this.state.productPopUp.checkForSize}>Please Select a Size</p>
								<button onClick={() => {
									this.addToCart(this.state.productPopUp.productData, this.state.productPopUp.productData.defaultSize);
								}} className="product-popup-Add-to-cart">
									<p>ADD TO CART</p>
								</button>
								<button onClick={this.productPopUp} className="product-popup-view-details">
									<Link to={{
										pathname: '/product',
										state: {
											id: this.state.productPopUp.productData.productId,
											productType: this.state.productPopUp.productData.productType,
											defaultSize: this.state.productPopUp.productData.defaultSize
										}
									}}><p>VIEW FULL DETAILS</p></Link>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="info-on-free-shipping-banner">
					<p>Free Shipping on Orders over <span>$29</span></p>
				</div>
				<div className="cart">
					<section className="cart-large">
						<h2>Shopping Cart</h2>
						<p className="articles-header">Articles(s) {this.props.countItems} - Total: ${this.props.countTotalCost}</p>
						<div className="product-header">
							<ul>
								<li>PRODUCT IMAGE</li>
								<li className="product-information">PRODUCT INFORMATION(S)</li>
								<li className="text-align-center">UNIT PRICE</li>
								<li className="text-align-center">QUANTITY</li>
								<li className="text-align-right">LINE TOTAL</li>
							</ul>
						</div>
							{this.state.cart.length === 0 && this.cartIsEmpty()}
							{
								this.state.cart.map((element, index) => {									
									return (
										<div key={element + index } className="product-cart-info">
											<div className="product-cart-info-containers">
												<Link to={{
													pathname: '/product',
													state: {
														id: element.productId,
														productType: element.productType,
														defaultSize: element.defaultSize
													}
												}}>
												<img src={element.img} />
												</Link>
											</div>
											<div className="product-cart-info-containers product-information">
												<h3>{element.name}</h3>
												<p>Colors : <span>7</span></p>
												<p>Size : <span>{element.defaultSize}</span></p>
												<p className="remove-cart-item" onClick={() => {
													this.props.removeCartItem({id: element.productId, size: element.defaultSize})
												}}>Remove</p>
											</div>
											<div className="product-cart-info-containers text-align-center">
												<div className="unit-price">
													<p>Unit Price :</p>
													<p>{element.price}</p>
												</div>
											</div>
											<div className="product-cart-info-containers text-align-center">
												<div className="qty-item">
													<p>Qty: </p>
													<input type="text" value={element.qty} onChange={(event) => {
														this.onInputChange(event, element.productId, element.defaultSize, index);							
													}} type="text" />
												</div>
												<p className="update-cart-button">UPDATE</p>
												<p className={"error-on-amount-in-cart-more-then10 " + this.state.toggleDisplayMoreThen10}>Please enter a value less then or equal to 10.</p>
												<p className={"error-on-amount-in-cart-less-then1 " + this.state.toggleDisplayLessThen1}>Please enter a value more then or equal to 1.</p>
											</div>
											<div className="product-cart-info-containers text-align-right">
												<p className="line-total-price">${element.qty <= 10 ? (element.price * element.qty).toFixed(2) : '0.00'}</p>
											</div>
										</div>
									);
								})
							}
						<div className="cart-total-container">
							<div className="coupon-code">
								<div className="coupon-container">
									<input placeholder="Enter Coupon Code?" type="text" />
								</div>
								<div className="apply-button">
									<button>APPLY</button>
								</div>
							</div>
							<div className="cart-total">
								<div className="cart-total-left">
									<p>Article(s) Count: </p>
									<p>Total: </p>
								</div>
								<div className="cart-total-right">
									<p>{this.props.countItems}</p>
									<p>${this.props.countTotalCost}</p>
								</div>
							</div>
						</div>
					</section>
    
      				<CartItems />

					<div className="checkout-button-container">
						<button className={this.state.checkoutButton + " checkout-button"} onClick={() => {
								this.CheckIfLoggedIn();
							}}
						>
						Checkout</button>
					</div>
					<h2 className="we-recommend">WE RECCOMMEND</h2>
					<p className="angled-red-line"></p>
					<div className="productItems">
						{
							this.props.products.map((item) => {
								return (
									<div  key={item.productId} className="productItem-thumbnail">
										<div className="eye-view" onClick={() => {
												const productData = {
													productId: item.productId,
													img: item.img,
													name: item.name,
													stars: item.stars,
													rank: item.rank,
													color: item.color,
													price: item.price,
													sizes: item.sizes,
													defaultSize: item.defaultSize,
													productType: item.productType
												}
												this.productPopUp(productData);
											}
										}>
											<p>Quick View<span className="fa fa-eye"></span></p>
										</div>
										<Link to={{
											pathname: '/product',
											state: {
												id: item.productId,
												productType: item.productType,
												defaultSize: item.defaultSize
											}
										}}>
											<img src={item.img} />
									        <p className="productItem-thumbnail-total-color">{item.color}</p>
											<div className="productItem-thumbnail-discription">
											 	<p>{item.name}</p>
											 	<p className="productItem-thumbnail-price">{item.price}</p>
											 	<div className="product-ranks">
											 		<ul className="star-rank">
											 			{
											 				item.stars.map((num) => {
												 				return <li key={item.productId + Math.random()} className="fa fa-star" aria-hidden="true"></li>
												 			})
												 		}
											 		</ul>
											 		<div className="highest-rated-rank">
											 			<p>{item.rank}</p>
											 		</div>
											 	</div>
											</div>
										</Link>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	try {
		return {
			cart: state.cart,
			countItems: countTheCartItems(state.cart),
			countTotalCost: countTotalCost(state.cart),
			isLoggedIn: state.loggedIn,
			products: chooseCatagoryAndFilters(state.listOfproducts[0].productsInfo.products, state.shoesFilteringReducer, true)
		};
	} catch (e) {
		return {
			cart: state.cart,
			countItems: countTheCartItems(state.cart),
			countTotalCost: countTotalCost(state.cart),
			isLoggedIn: state.loggedIn,
			products: []
		};
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		removeCartItem: removeCartItem,
		changeAmountOfItem: changeAmountOfItem,
		addToCartAction: addToCartAction
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);




































