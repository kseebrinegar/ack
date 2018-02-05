import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import login from '../../actions/login';
import axios from 'axios';

class CreateAccount extends React.Component {
	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.callServer = this.callServer.bind(this);
		this.state = {
			firstName: '',
			lastName: '',
			nameError: 'visibility-hidden',
			email: '',
			emailError: 'visibility-hidden',
			password: '',
			passwordError: 'visibility-hidden',
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
				passwordError: 'visibility-hidden',
				credError: 'visibility-hidden',
				nameError: 'visibility-hidden',
				[targetName]: targetValue
			}
		});
	}
	callServer(credentials) {
		axios.post('/api/account/newuser', credentials).then((user) => {
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
				const isUserLoggedIn = user.headers['x-auth'];
				localStorage.setItem('loggedIn', isUserLoggedIn);
				this.props.login(isUserLoggedIn);
				this.props.location.state === 'checkout' ? this.props.history.push('/checkout') : 
				this.props.history.push('/myaccount');		
			}
		}, (e) => {
			console.log(e);
			console.log(`error: could not retrieve user`);
		});
	}
	onSubmit(e) {
		e.preventDefault();
		let emailError = true;
		let passwordError = true;
		let nameError = true;
		const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const reName = /^[a-zA-Z]+$/;
    	if (!reEmail.test(this.state.email.toLowerCase())) {
			emailError = false;
		}
		if (this.state.password.length < 6) {
			passwordError = false;
		} 
		if (!reName.test(this.state.firstName) || !reName.test(this.state.lastName)) {
			nameError = false;
		}
		this.setState(() => {
			return {
				emailError: emailError ? 'visibility-hidden' : 'visibility-visible',
				passwordError: passwordError ? 'visibility-hidden' : 'visibility-visible',
				nameError: nameError ? 'visibility-hidden' : 'visibility-visible'
			}
		});
		if (emailError && passwordError) {
			this.callServer({firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password});
		}
	}
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	render() {
		return (
			<div>
				<div className="info-on-free-shipping-banner">
					<p>Free Shipping on Orders over <span>$29</span></p>
				</div>
				<section className="register-section">
					<h2>CREATE ACCOUNT</h2>
					<form>
						<p className={"credError " + this.state.credError}><span>X</span>{this.state.credMessage}</p>
						<p className={"nameError " + this.state.nameError}><span>X</span>First and last name needs to contain at least one letter and have no numbers.</p>
						<p className={"emailError " + this.state.emailError}><span>X</span>Invalid Email.</p>
						<p className={"passwordError " + this.state.passwordError}><span>X</span>Password must be at least 6 characters long.</p>
						<label>First Name</label>
						<input value={this.state.firstName} type="text" name="firstName" onChange={(e) => {
								this.onChange(e);
							}
						}/>
						<label>Last Name</label>
						<input value={this.state.lastName} type="text" name="lastName" onChange={(e) => {
								this.onChange(e);
							}
						}/>
						<label>Email</label>
						<input value={this.state.email} type="text" name="email" onChange={(e) => {
								this.onChange(e);
							}
						}/>
						<label className="password">Password</label>	
						<input value={this.state.password} type="password" name="password" onChange={(e) => {
								this.onChange(e);
							}
						}/>
						<button type="submit" onClick={(e) => {
								this.onSubmit(e);
							}
						}>Submit</button>
						<p>Existing Customer ?<span><NavLink to="/login"> Login...</NavLink></span></p>
					</form>
				</section>
			</div>
		);
	}
}


const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		login: login
	}, dispatch);
};

export default connect(null, mapDispatchToProps)(CreateAccount);