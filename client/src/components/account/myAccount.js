import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logOut from '../../actions/logout';
import clearUser from '../../actions/clearUser';
import ShippingAddress from './shippingAddress';
import axios from 'axios';
import uuid from 'uuid';

class MyAccount extends React.Component {
	constructor(props) {
		super(props)
		this.logout = this.logout.bind(this);
		this.mouseOverPopUpAddress = this.mouseHoverPopUpAddress.bind();
		this.state = {
			noOrders: 'display-closed',
			orders: [],
			popAddress: 'display-closed',
			notifyPurchase: 'display-closed'
		}
	}
	mouseHoverPopUpAddress(e) {
		if (e.type === 'mouseenter') {
			e.target.nextElementSibling.style.display = 'block';
		} else {
			e.target.nextElementSibling.style.display = 'none';
		}
	}
	logout() {
		const authToken = this.props.authToken;
		axios.delete(`/api/account/logout:${authToken}`).then((user) => {
			this.props.logOut();
			this.props.clearUser()
			localStorage.setItem('loggedIn', '');
			localStorage.removeItem('cart');
			localStorage.removeItem('userInfo');
			this.props.history.push('/');
		}, (e) => {
			console.log(e);
			console.log('error: could not logout');
		});
	}
	componentDidMount() {
		const authToken = this.props.authToken;
		window.scrollTo(0, 0);
		let oneInterval = 0;
		if (this.props.location.state !== undefined) {
			this.props.location.state = undefined;
			this.setState(() => {
				return {
					notifyPurchase: 'display-open'
				}
			});
			const animateThankYou = setInterval(() => {
				if (oneInterval === 1) {
					this.setState(() => {
						return {
							notifyPurchase: 'display-closed'
						}
					});
					clearInterval(animateThankYou);
				};
				oneInterval = 1;
			}, 1500)
		}
		axios.post('/api/account/orders', {authToken: authToken}).then((orders) => {
			if (orders.data.length !== 0) {
				this.setState(() => {
					return {
						noOrders: 'display-closed',
						orders: orders.data
					}
				});
			} else {
				this.setState(() => {
					return {
						noOrders: 'display-open'
					}
				});
			}
		}, (e) => {
			console.log(e);
			console.log('error: could not get orders.');
		});
	}
	render() {
		return (
			<div>
				<div className="info-on-free-shipping-banner">
					<p>Free Shipping on Orders over <span>$29</span></p>
				</div>
				<div className={this.state.notifyPurchase + ' add-product-background'}>
					<h2 className="thankyou">Thank you for the Purchase!</h2>
				</div>
				<section className="my-account-section">
					<h2>ACCOUNT DETAILS</h2>
					<p className="logout" onClick={() => {
						this.logout();
					}}>Logout</p>
					<div className="border-under-account"></div>
					<ShippingAddress location={this.props.location}/>
					<div className="right-account-info">
						<div className={this.state.noOrders}>
							<h3 className="order-history">Order History</h3>
							<p className="no-orders-placed">You haven't placed any orders yet.</p>
						</div>
						{
							this.state.orders.map((item) => {
								return (
									<div key={uuid()} className="past-orders-container">
										<div className="past-orders-float-left">
											<div>
												<p>ORDER PLACED</p>
												<p>{item.createdAt}</p>
											</div>
											<div>
												<p>TOTAL</p>
												<p>${item.total}</p>
											</div>
											<div className="position-realitive">
												<p>SHIP TO</p>
												<p onMouseEnter={(e) => {
														this.mouseHoverPopUpAddress(e);
													}} onMouseLeave={(e) => {
														this.mouseHoverPopUpAddress(e);
													}}>
												{this.props.userInfo.storeNameAndEmail.firstName + ' ' + 
												this.props.userInfo.storeNameAndEmail.lastName}</p>
												<div className="popup-address">
													<div className="small-triangle">
														<div>

														</div>
													</div>
													<ul>
														<li>Casey</li>
														<li>Brinegar</li>
														<li>127 j neils rd</li>
														<li>Wa</li>
														<li>59923</li>
													</ul>
												</div>
											</div>
											<div className="delivery-date">
												<p>EXPECTED DELIVERY DATE: <span>{item.arrivalDate}</span></p>
											</div>
										</div>
										<div className="past-orders-float-right">
											<p>ORDER# <span>{item.orderNumber}</span></p>
										</div>
										<div className="order-items">
										{
											item.products.map((item) => {
												return (
													<div className="animation-container" key={uuid()}>
														<div className="checkout-qty-and-img">
															<img src={item.img} />
														</div>
														<div className="checkout-product-info">
															<p><span>Name:</span> {item.name}<span className="divider">|</span></p>
															<p><span>Size:</span> {item.defaultSize}</p>
															<p><span>Prize:</span> ${item.price}</p>
														</div>
														<p className="sa">${item.price}</p>
														<div className="border-under-checkout-product"></div>
													</div>
												)
											})
										}
										</div>
									</div>
									
								);
							})
						}
					</div>
				</section>
			</div>
		);
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		logOut: logOut,
		clearUser: clearUser
	}, dispatch);
};

const mapStateToProps = (state) => {
	return {
		authToken: state.loggedIn,
		userInfo: state.userInfo
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
