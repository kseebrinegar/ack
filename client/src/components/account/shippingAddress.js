import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import uuid from 'uuid';
import addAddress from '../../actions/addAddress';
import storeNameAndEmail from '../../actions/storenameandemail';

class ShippingAddress extends React.Component {
	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.callServerAddress = this.callServerAddress.bind(this);
		this.editAddress = this.editAddress.bind(this);
		this.cancelButton = this.cancelButton.bind(this);
		this.state = {
			addressForm: 'display-closed',
			editForm: 'display-open',
			cancelButton: 'display-closed',
			shippingAddress: '',
			orders: '',
			errorLength: 'visibility-hidden',
			firstName: '',
			lastName: '',
			address: '',
			city: '',
			state: '',
			zip: '',
			phone: '',
			displayEmail: '',
			displayFirstName: '',
			displayLastName: '',
			checkoutButtonOnlyForCheckout: 'display-closed'
		}
	}
	onChange(e) {
		const targetValue = e.target.value;
		const targetName = e.target.name;
		this.setState(() => {
			return {
				errorLength: 'visibility-hidden',
				[targetName]: targetValue
			}
		});
	}
	callServerAddress(address) {
		const authToken = this.props.authToken;
		axios.post('/api/account/address', 	{address: address, authToken: authToken}).then((user) => {
			if (typeof user.data === 'string') {
				this.setState(() => {
					return {
						errorLength: 'visibility-visible'
					}
				});
			} else {
				const addressArray = Object.values(user.data.shippingAddress[0]);
				addressArray.pop();
				delete user.data.shippingAddress;
				this.props.addAddress(addressArray);
				this.props.storeNameAndEmail(user.data);
				this.setState(() => {					
					return {
						errorLength: 'visibility-hidden',
						addressForm: 'display-closed',
						editForm: 'display-open',
						shippingAddress: addressArray,
						cancelButton: 'display-closed',
						firstName: '',
						lastName: '',
						address: '',
						city: '',
						state: '',
						zip: '',
						phone: ''
					}
				});
			}
		}, (e) => {
			console.log(e);
			console.log(`error: could not update address`);
		});
	}
	onSubmit(e) {
		e.preventDefault();
		let errorLength = true;
		const stateArrayValues = [this.state.firstName, this.state.lastName, this.state.address,
								  this.state.city, this.state.zip, this.state.phone
		];
		stateArrayValues.map((item, index) => {
			if (item.length === 0) {
				errorLength = false;
			}
		});
		this.setState(() => {
			return {
				errorLength: errorLength ? 'visibility-hidden' : 'visibility-visible',
			}
		});
		if (errorLength) {
			const address = {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				address: this.state.address,
				city: this.state.city,
				state: this.state.state,
				zip: this.state.zip,
				phone: this.state.phone,
			};
			this.callServerAddress(address);
		}
	}
	componentDidMount() {
		const { authToken } = this.props;
		const checkPage = this.props.location.pathname;
		if (checkPage !== '/myaccount') {
			this.setState(() => {
				return {
					checkoutButtonOnlyForCheckout: 'display-open'
				}
			});
		}
		if (true) {
			axios.post('/api/account/myaccount', {authToken: authToken}).then((user) => {
				if (typeof user.data === 'string') {
					this.setState(() => {
						return {
							errorLength: 'visibility-visible'
						}
					});
				} else if (user.data.shippingAddress[0] !== undefined) {
					const addressArray = Object.values(user.data.shippingAddress[0]);
					addressArray.pop();
					delete user.data.shippingAddress;
					this.props.storeNameAndEmail(user.data);
					this.props.addAddress(addressArray);
					this.setState(() => {
						return {
							errorLength: 'visibility-hidden',
							addressForm: 'display-closed',
							editForm: 'display-open',
							shippingAddress: addressArray,
							displayEmail: user.data.email,
							displayFirstName: user.data.firstName,
							displayLastName: user.data.lastName,
							cancelButton: 'display-closed'
						}
					});
				} else {
					this.setState(() => {
						return {
							errorLength: 'visibility-hidden',
							addressForm: 'display-open',
							editForm: 'display-closed',
							displayEmail: user.data.email,
							displayFirstName: user.data.firstName,
							displayLastName: user.data.lastName,
							cancelButton: 'display-closed'
						}
					});
					}
			}, (e) => {
				console.log(e);
			});
		}
		window.scrollTo(0, 0);
	}
	editAddress() {
		this.setState(() => {
			return {
				addressForm: 'display-open',
				editForm: 'display-closed',
				cancelButton: 'display-open',
			}
		});
	}
	cancelButton() {
		this.setState(() => {
			return {
				addressForm: 'display-closed',
				editForm: 'display-open',
				cancelButton: 'display-closed',
				errorLength: 'visibility-hidden'
			}
		})
	}
	render() {
		return (
			<div>
				<div className="left-account-info">
					<h3 className="account-user-name">{this.state.displayFirstName + ' ' + this.state.displayLastName}</h3>
					<p className="user-email">{this.state.displayEmail}</p>
					<h3 className="primary-address">Shipping address</h3>
					<p className={ this.state.addressForm + " no-address"}>No shipping address on file</p>
					<p className={"credError " + this.state.errorLength}><span>X</span>Form field(s) can't be empty. </p>
					<form className={this.state.addressForm}>
						<label>First Name</label>
						<input placeholder={this.state.shippingAddress[0]} type="text" name="firstName" onChange={(e) => {
							this.onChange(e);
							}
						}/>
						<label>Last Name</label>
						<input placeholder={this.state.shippingAddress[1]} type="text" name="lastName" onChange={(e) => {
							this.onChange(e);
							}
						}/>
						<label>Address</label>
						<input placeholder={this.state.shippingAddress[2]} value={this.state.address} type="text" name="address" onChange={(e) => {
							this.onChange(e);
							}
						}/>
						<label>City</label>
						<input placeholder={this.state.shippingAddress[3]} value={this.state.city} type="text" name="city" onChange={(e) => {
							this.onChange(e);
							}
						}/>
						<label>State</label>
						<input placeholder={this.state.shippingAddress[4]} value={this.state.state} type="text" name="state" onChange={(e) => {
							this.onChange(e);
							}
						}/>
						<label>Postal/Zip Code</label>
						<input placeholder={this.state.shippingAddress[5]} value={this.state.zip} type="text" name="zip" onChange={(e) => {
							this.onChange(e);
							}
						}/>
						<label>Phone</label>
						<input placeholder={this.state.shippingAddress[6]} value={this.state.phone} type="text" name="phone" onChange={(e) => {
							this.onChange(e);
							}
						}/>
					</form>
					<div className={'address-details ' + this.state.editForm}>
						<ul>
						{
							this.state.shippingAddress.length > 1 && this.state.shippingAddress.map((item) => {
								return <li key={uuid()}>{item}</li>
							})
						}
						</ul>
						<button onClick={() => {
							this.editAddress();
						}}
						>Edit</button>
					</div>
						<button className={this.state.addressForm} type="submit" onClick={(e) => {
							this.onSubmit(e);
						}
					}>Add Address</button>
					<button className={this.state.cancelButton} onClick={() => {
						this.cancelButton();
					}}>Cancel</button>
					<button onClick={(() => {
						this.props.continueCheckOutButton('addressFinished', this.props.shippingChoice !== undefined ? this.props.shippingChoice : 4.85);
					})}
					className={this.state.checkoutButtonOnlyForCheckout + " checkout-buttons"}>Continue to shipping method</button>
				</div>
			</div>
		);
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		addAddress: addAddress,
		storeNameAndEmail: storeNameAndEmail
	}, dispatch);
};

const mapStateToProps = (state) => {
	return {
		authToken: state.loggedIn,
		shippingChoice: state.userInfo.shippingChoice
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress);

