import React from 'react';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class ForgotPassword extends React.Component {
	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.callServer = this.callServer.bind(this);
		this.state = {
			email: '',
			emailError: 'visibility-hidden',
			credError: 'visibility-hidden',
			credMessage: ''
		}
	}
	onChange(e) {
		const targetValue = e.target.value;
		const targetName = e.target.name;
		this.setState(() => {
			return {
				emailError: 'visibility-hidden',
				credError: 'visibility-hidden',
				[targetName]: targetValue
			}
		});
	}
	callServer(credentials) {
		axios.post('/api/account/forgotpassword', credentials).then((user) => {
			if (typeof user.data === 'string') {
				this.setState(() => {
					return {
						credError: 'visibility-visible',
						credMessage: user.data
					}
				});
			} else {
				this.setState(() => {
					return {
						credError: 'visibility-hidden',
						credMessage: ''
					}
				});
				this.props.history.push('/myaccount');			
			}
		}, (e) => {
			console.log(e);
			console.log(`error: could not register new user`);
		});
	}
	onSubmit(e) {
		e.preventDefault();
		let emailError = true;
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	if (!re.test(this.state.email.toLowerCase())) {
			emailError = false;
		}
		this.setState(() => {
			return {
				emailError: emailError ? 'visibility-hidden' : 'visibility-visible',
			}
		});
		if (emailError) {
			this.callServer({email: this.state.email});
		}		
	}
	componentWillMount() {
		window.scrollTo(0, 0);
	}
	render() {
		console.log(this.props)
		return (
			<div>
				<div className="info-on-free-shipping-banner">
					<p>Free Shipping on Orders over <span>$29</span></p>
				</div>
				<section className="section-forgotpassword">
					<h2>Reset Pasword</h2>
					<form>
						<p className={"credError " + this.state.credError}><span>X</span>{this.state.credMessage}</p>
						<p className={"emailError " + this.state.emailError}><span>X</span>Invalid Email.</p>
						<label>Email</label>
						<input value={this.state.email} type="text" name="email" onChange={(e) => {
								this.onChange(e);
							}
						}/>
						<p className="nofity-user-for-sending-email">Sending an email to reset your password.</p>
						<button type="submit" onClick={(e) => {
								this.onSubmit(e);
							}
						}>Submit</button>
					</form>
					
				</section>
			</div>
		);
	}
};

export default ForgotPassword;