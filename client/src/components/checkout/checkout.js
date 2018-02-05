import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import StripeCheckout from 'react-stripe-checkout';
import ShippingAddress from '../account/shippingAddress';
import CartItems from '../cart/cartitems';
import countTheCartItems from '../../selectors/countTheCartItems';
import countTotalCost from '../../selectors/countTotalCost';
import CheckOutCart from './checkOutCart';
import shippingChoice from '../../actions/shippingChoice';
import payment from '../../actions/payment';

class CheckOut extends React.Component {
	constructor(props) {
		super(props)
		this.onHoverEventLinks = this.onHoverEventLinks.bind(this);
		this.continueCheckOutButton = this.continueCheckOutButton.bind(this);
		this.continueCheckOutLink = this.continueCheckOutLink.bind(this);
		this.checkWhatIsDone = this.checkWhatIsDone.bind(this);
		this.animateDropDown = this.animateDropDown.bind(this);
		this.shippingChoice = this.shippingChoice.bind(this);
		this.calculateTotal = this.calculateTotal.bind(this);
		this.displayShippingAddress = this.displayShippingAddress.bind(this);
		this.displayShippingChoice = this.displayShippingChoice.bind(this);
		this.finishCheckOut = this.finishCheckOut.bind(this);
		this.calculateDate = this.calculateDate.bind(this);
		this.state = {
			customerInformationContainer: 'display-open',
			shippingMethodContainer: 'display-closed',
			paymentMethodContainer: 'display-closed',
			customerInformationIsDone: false,
			shippingMethodIsDone: false,
			paymentMethodIsDone: false,
			displayShippingAddress: 'display-closed',
			displayShippingChoice: 'display-closed',
			animateDropDownWords: 'Show order summary',
			rotateChev: 'rotateX(0deg)',
			animateDropDownAction: 'checkout-cart-dropdown-container',
			shippingPrice: '-',
			checkShippingChoice1: true,
			checkShippingChoice2: false,
			checkShippingChoice3: false
		}
	}
	continueCheckOutLink(e) {
		const { type, target } = e;
		const { customerInformationIsDone, shippingMethodIsDone, paymentMethodIsDone} = this.state;
		const dataIndex = target.getAttribute('data-index-number');
		if (type === 'click') {
			this.setState(() => {
				if (dataIndex === '1' && customerInformationIsDone) {
					return {
						customerInformationContainer: 'display-open',
						shippingMethodContainer: 'display-closed',
						paymentMethodContainer: 'display-closed',
						displayShippingAddress: 'display-closed',
					}
				} else if (dataIndex === '2' && shippingMethodIsDone) {
					return {
						customerInformationContainer: 'display-closed',
						shippingMethodContainer: 'display-open',
						paymentMethodContainer: 'display-closed',
						displayShippingAddress: 'display-open'
					}
				} else if (dataIndex === '3' && paymentMethodIsDone) {
					return {
						customerInformationContainer: 'display-closed',
						shippingMethodContainer: 'display-closed',
						paymentMethodContainer: 'display-open'
					}
				}
			});
		}
	}
	onHoverEventLinks(e) {
		const { type, target } = e;
		const { customerInformationIsDone, shippingMethodIsDone, paymentMethodIsDone} = this.state;
		const dataIndex = target.getAttribute('data-index-number');
		if (type === 'mouseover' ) {
			if (dataIndex === '1' && customerInformationIsDone) {
				target.className = 'checkout-link-hover';
			} else if (dataIndex === '2' && shippingMethodIsDone) {
				target.className = 'checkout-link-hover';
			} else if (dataIndex === '3' && paymentMethodIsDone) {
				target.className = 'checkout-link-hover';
			}
		} else {
			if (dataIndex === '1' && customerInformationIsDone) {
				target.className = 'checkout-link-non-hover';
			} else if (dataIndex === '2' && shippingMethodIsDone) {
				target.className = 'checkout-link-non-hover';
			} else if (dataIndex === '3' && paymentMethodIsDone) {
				target.className = 'checkout-link-non-hover';
			}
		}
	}
	checkWhatIsDone() {
		const { shippingAddress, shippingChoice, paymentMethod } = this.props.userInfo;
		this.setState((preveState) => {
			return {
				customerInformationIsDone: preveState.customerInformationContainer,
				shippingMethodIsDone: shippingAddress !== undefined ? true : false,
				paymentMethodIsDone: shippingChoice !== undefined ? true : false
			}
		});
	}
	calculateDate() {
		let daysToArrive = 0;
		const month = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		if (this.props.shippingChoice === 4.85) {
			daysToArrive = 86400000 * 1;
		} else if (this.props.shippingChoice === 38.43) {
			daysToArrive = 86400000 * 2;
		} else {
			daysToArrive = 86400000 * 3;
		}

		const today = new Date();
		const arriveDate = new Date(today.getTime() + daysToArrive);
		const fullDate =  month[today.getMonth()] + ' ' + today.getDate() + ' ' + today.getFullYear();
		const arriveDateFullDate = month[arriveDate.getMonth()] + ' ' + arriveDate.getDate() + ' ' + arriveDate.getFullYear();
		return {today: fullDate, arriveDate: arriveDateFullDate};
	}
	finishCheckOut(token) {
		const dates = this.calculateDate();
		let userCheckOut = {
			stripeToken: token,
			authToken: this.props.authToken,
			totalCost: this.calculateTotal(),
			shippingChoice: this.props.userInfo.shippingChoice,
			cart: this.props.cart,
			createdAt: dates.today,
			arrivalDate: dates.arriveDate
		}
		this.props.payment(userCheckOut);
		this.props.history.push('/myaccount', 'notify');
	}
	continueCheckOutButton(whatButtonWasClicked, initShipping = '-') {
		this.checkWhatIsDone();
		this.setState((preveState) => {
			if (whatButtonWasClicked === 'addressFinished') {
				return {
					customerInformationContainer: 'display-closed',
					shippingMethodContainer: 'display-open',
					paymentMethodContainer: 'display-closed',
					shippingPrice: initShipping,
					displayShippingAddress: 'display-open'
				}
			} else if (whatButtonWasClicked === 'shippingFinished') {
				this.props.userInfo.shippingChoice === undefined ? this.shippingChoice() : ''
				return {
					customerInformationContainer: 'display-closed',
					shippingMethodContainer: 'display-closed',
					paymentMethodContainer: 'display-open',
					shippingPrice: this.props.userInfo.shippingChoice
				}
			} else {

			}
		});
	}
	animateDropDown() {
		this.setState((preveState) => {
			return {
				animateDropDownWords: preveState.animateDropDownWords === 'Show order summary' ? 'Hide order summary'  : 'Show order summary',
				rotateChev: preveState.rotateChev === 'rotateX(0deg)' ? 'rotateX(-180deg)' : 'rotateX(0deg)',
				animateDropDownAction: preveState.animateDropDownAction === 'checkout-cart-dropdown-container' ? 'checkout-cart-dropdown-container-show' : 'checkout-cart-dropdown-container'
			};
		});
	}
	calculateTotal() {
		let cost = Number(this.props.countTotalCost);
		let shippingCost = Number(this.props.userInfo.shippingChoice);
		let totalCost = (cost + shippingCost).toFixed(2);
		if (this.props.userInfo.shippingChoice) {
			return totalCost
		} else {
			return cost.toFixed(2);
		}
	}
	shippingChoice(e) {
		if (e !== undefined) {
			let shippingPrice = Number(e.target.getAttribute('data-shipping-price'));
			this.props.shippingPrice(shippingPrice);
			this.setState(() => {
				return {
					shippingPrice: shippingPrice
				}
			});
		} else {
			let shippingPrice = 4.85;
			this.props.shippingPrice(shippingPrice);
			this.setState(() => {
				return {
					shippingPrice: shippingPrice
				}
			});
		}
	}
	displayShippingChoice(shippingChoice) {
		if (shippingChoice !== undefined) {
			if(shippingChoice === 4.85) {
				return `UPS First Class Package $${shippingChoice}`;
			} else if (shippingChoice === 38.43) {
				return `UPS 2nd Day Air® $${shippingChoice}`;
			} else {
				return `UPS Next Day Air® $${shippingChoice}`;
			}
		} 
	}
	displayShippingAddress(shippingAddress) {
		if (shippingAddress !== undefined) {
			return shippingAddress.map((item, index) => {
				let sentence = '';
				if (index !== 0) {
					sentence = sentence + ', ' + item;
					return sentence;
				}
				sentence = item;
				return sentence;
			});
		}

	}
	componentWillReceiveProps() {
		this.checkWhatIsDone();
	}
	componentWillMount() {
		this.checkWhatIsDone();
		const {shippingChoice, storeNameAndEmail } = this.props.userInfo;
		if (shippingChoice) {
			this.setState(() => {
				return {
					shippingPrice: this.props.userInfo.shippingChoice,
					checkShippingChoice1: shippingChoice === 4.85 ? true : false,
					checkShippingChoice2: shippingChoice === 38.43 ? true : false,
					checkShippingChoice3:  shippingChoice === 52.43 ? true : false
				}
			});
		}
	}
	render() {
		const cart = this.props.cart;
		const { shippingAddress, storeNameAndEmail, shippingChoice } = this.props.userInfo;
		return (
			<div>
				<div className="info-on-free-shipping-banner">
					<p>Free Shipping on Orders over <span>$29</span></p>
				</div>
				<section className="my-account-section">
					<h2 className="checkout-title">Checkout</h2>
					<div className="checkout-links">
						<NavLink to="/cart" className="checkout-link-non-hover">Cart<span className="fa fa-chevron-right"></span></NavLink>
						<p data-index-number="1" onClick={(e) => {
							this.continueCheckOutLink(e);
						}}
						onMouseOver={(e) => {
							this.onHoverEventLinks(e);
						}} onMouseLeave={(e) => {
							this.onHoverEventLinks(e);
						}}
						className="checkout-link-non-hover">Customer information<span className="fa fa-chevron-right"></span></p>

						<p data-index-number="2" onClick={(e) => {
							this.continueCheckOutLink(e);
						}}
						onMouseOver={(e) => {
							this.onHoverEventLinks(e)
						}} onMouseLeave={(e) => {
							this.onHoverEventLinks(e);
						}}
						className="checkout-link-non-hover">Shipping method<span className="fa fa-chevron-right"></span></p>

						<p data-index-number="3" onClick={(e) => {
							this.continueCheckOutLink(e);
						}}
						onMouseOver={(e) => {
							this.onHoverEventLinks(e)
						}} onMouseLeave={(e) => {
							this.onHoverEventLinks(e);
						}}
						className="checkout-link-non-hover">Payment method<span className="fa fa-chevron-right"></span></p>

					</div>
					<div className="border-under-account"></div>
					<div className="right-checkout-container">
						<div className={this.state.animateDropDownAction}>
							<div className="checkout-cart-dropdown">
								<p className="fa fa-shopping-cart fa-2x" aria-hidden="true"></p>
								<p onClick={() => {
										this.animateDropDown();
									}}
								>
								{this.state.animateDropDownWords}<span style={{transform: this.state.rotateChev}} className="fa fa-chevron-down"></span></p>
							</div>
							<div className="checkout-cart-dropdown-total-price">
								<p>${this.calculateTotal()}</p>
							</div>
							<CheckOutCart cartItems={this.props} shippingPrice={this.state.shippingPrice} totalCost={this.calculateTotal} />
						</div>
						<div className="checkout-cart-large">
							<CheckOutCart cartItems={this.props} shippingPrice={this.state.shippingPrice} totalCost={this.calculateTotal} />
						</div>
					</div>
					<div className={this.state.displayShippingAddress + " right-checkout-links-container-med"}>
						<div className="shippingAddress-link-left">
							<p>Shipping address</p>
							<p>
								{
									this.displayShippingAddress(shippingAddress)
								}
							</p>
						</div>
						<div className="shippingAddress-link-right">
							<p data-index-number="1" onClick={(e) => {
								this.continueCheckOutLink(e);
							}}>Edit</p>
						</div>
					</div>
					<div className={this.state.paymentMethodContainer + " right-checkout-links-container-med"}>
						<div className="shippingAddress-link-left">
							<p>Shipping method</p>
							<p>
								{
									this.displayShippingChoice(shippingChoice)
								}
							</p>
						</div>
						<div className="shippingAddress-link-right">
							<p data-index-number="2" onClick={(e) => {
								this.continueCheckOutLink(e);
							}}>Edit</p>
						</div>
					</div>
					<div className={this.state.customerInformationContainer + " customerInformationContainer"}>
						<ShippingAddress location={this.props.location} continueCheckOutButton={this.continueCheckOutButton}/>
					</div>
					<div className={this.state.shippingMethodContainer + " shippingMethodContainer"}>
						<h3 className="account-user-name">{storeNameAndEmail !== undefined && storeNameAndEmail.firstName + ' ' + storeNameAndEmail.lastName}</h3>
						<p className="user-email">{storeNameAndEmail !== undefined && storeNameAndEmail.email}</p>
						<h3 className="primary-address">Shipping Method</h3>
						<form className="shipping-method-form">
							<div className="shipping-method">
								<div>
									<input onClick={(e) => {
										this.shippingChoice(e);
									}} defaultChecked={this.state.checkShippingChoice1} data-shipping-price="4.85" 
									type="radio" name="choose-shipping-method" />
									<div>
										<p>USPS First Class Package</p>
										<p>3 buisness days</p>
									</div>
								</div>
								<p>$4.85</p>
							</div>
							<div className="shipping-method">
								<div>
									<input onClick={(e) => {
										this.shippingChoice(e);
									}} defaultChecked={this.state.checkShippingChoice2} data-shipping-price="38.43" type="radio" name="choose-shipping-method" />
									<div>
										<p>UPS 2nd Day Air®</p>
										<p>2 buisness days</p>
									</div>
								</div>
								<p>$38.43</p>
							</div>
							<div className="shipping-method">
								<div>
									<input onClick={(e) => {
										this.shippingChoice(e);
									}} defaultChecked={this.state.checkShippingChoice3} data-shipping-price="52.43" type="radio" name="choose-shipping-method" />
									<div>
										<p>UPS Next Day Air®</p>
										<p>1 buisness days</p>
									</div>
								</div>
								<p>$52.43</p>
							</div>
						</form>
						<button onClick={() => {
							this.continueCheckOutButton('shippingFinished')
						}}
						className="checkout-buttons">Continue to payment method</button>
						<p className="checkout-back-links" data-index-number="1" onClick={(e) => {
							this.continueCheckOutLink(e);
						}}><span className="fa fa-chevron-left" aria-hidden="true"></span>Return to customer information</p>
					</div>
					<div className={this.state.paymentMethodContainer + " paymentMethodContainer"}>
						<h3 className="account-user-name">{storeNameAndEmail !== undefined && storeNameAndEmail.firstName + ' ' + storeNameAndEmail.lastName}</h3>
						<p className="user-email">{storeNameAndEmail !== undefined && storeNameAndEmail.email}</p>
						<h3 className="primary-address">Make Payment</h3>
						<h3 className="warning-message">ATTENTION!</h3>
						<h3 className="warning">****************</h3>
						<h3 className="warning">****************</h3>
						<p></p>
						<p className="warning-description">Please do not enter real card information into this website. This website
						is only for demo purposes. Please use your valid email address, and the predefined card info located below. Thank you.</p>
						<p className="card"><span>Card number:</span> 4242 4242 4242 4242</p>
						<p className="card"><span>Exp:</span> 10/20</p>
						<p className="card"><span>Cvc:</span> 111</p>
						<StripeCheckout 
							name={storeNameAndEmail !== undefined && storeNameAndEmail.firstName + ' ' + storeNameAndEmail.lastName}
							amount={this.calculateTotal() * 100}
							token={token => this.finishCheckOut(token)}
							stripeKey={"pk_test_t07YkNZcT6YayTqcLsCj2fN8"}
							>
							<button  onClick={() => {
								this.continueCheckOutButton('complete order')
							}} className="checkout-buttons">Complete order</button>
						</StripeCheckout>
						<p className="checkout-back-links" data-index-number="2" onClick={(e) => {
							this.continueCheckOutLink(e);
						}}><span className="fa fa-chevron-left" aria-hidden="true"></span>Return to shipping method</p>
					</div>		
				</section>
			</div>
		);
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		shippingPrice: shippingChoice,
		payment: payment
	}, dispatch);
};

const mapStateToProps = (state) => {
	return {
		authToken: state.loggedIn,
		cart: state.cart,
		countItems: countTheCartItems(state.cart),
		countTotalCost: countTotalCost(state.cart),
		userInfo: state.userInfo
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);