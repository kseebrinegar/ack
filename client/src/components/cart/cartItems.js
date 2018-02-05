import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import countTheCartItems from '../../selectors/countTheCartItems';
import countTotalCost from '../../selectors/countTotalCost';
import removeCartItem from '../../actions/removeCartItem';
import changeAmountOfItem from '../../actions/changeAmountOfItem';

class CartItems extends React.Component {
	constructor(props) {
		super(props)
		this.onInputChange = this.onInputChange.bind(this);
		this.state = {
			cart: [],
			toggleDisplayMoreThen10: 'display-closed',
			toggleDisplayLessThen1: 'display-closed',
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
		} else if (valueChange < 0) {
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
	cartIsEmpty() {
		return (
			<h2 className="cart-empty-notify">YOUR SHOPPING CART IS CURRENTLY EMPTY</h2>
		);
	}
	componentWillReceiveProps(nextProps) {
		this.setState(() => {
			return {
				cart: nextProps.cart
			}
		});
	}
	componentWillMount() {
		this.setState(() => {
			return {
				cart: this.props.cart
			}
		});
	}
	render() {
		return (
			<section className="cart-small">
				<h2>Shopping Cart</h2>
				<p className="articles-header">Articles(s) {this.props.countItems} - Total: ${this.props.countTotalCost}</p>
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
									<div className="product-cart-info-containers-float-right">
										<div className="product-cart-info-containers product-information">
											<h3>{element.name}</h3>
											<p>Colors : <span>7</span></p>
											<p>Size : <span>{element.defaultSize}</span></p>
											<div className="unit-price">
												<p>{element.price}</p>
												<p>Unit Price :</p>
											</div>
											<div className="qty-item">
												<p>Qty: </p>
												<input type="text" value={element.qty} onChange={(event) => {
													this.onInputChange(event, element.productId, element.defaultSize, index);							
												}} />
											</div>
											<p className={"error-on-amount-in-cart-more-then10 " + this.state.toggleDisplayMoreThen10}>Please enter a value less then or equal to 10.</p>
											<p className={"error-on-amount-in-cart-less-then1 " + this.state.toggleDisplayLessThen1}>Please enter a value more then or equal to 1.</p>
										</div>
										<div className="product-cart-info-containers text-align-right">
											<p className="line-total-price">${element.qty <= 10 ? (element.price * element.qty).toFixed(2) : '0.00'}</p>
										</div>
										<p className="remove-cart-item" onClick={() => {

											this.props.removeCartItem({id: element.productId, size: element.defaultSize})
										}}>Remove</p>
									</div>
								</div>
							);
						})
					}
				<div className="cart-total-container">
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
					<div className="coupon-code">
						<div className="coupon-container">
							<input placeholder="Enter Coupon Code?" type="text" />
						</div>
						<div className="apply-button">
							<button>APPLY</button>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cart: state.cart,
		countItems: countTheCartItems(state.cart),
		countTotalCost: countTotalCost(state.cart),
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		removeCartItem: removeCartItem,
		changeAmountOfItem: changeAmountOfItem
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);