import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import login from '../../actions/login';
import axios from 'axios';

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.callServer = this.callServer.bind(this);
		this.singUp = this.signUp.bind(this);
		this.state = {
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
				[targetName]: targetValue
			}
		});
	}
	callServer(credentials) {
		credentials.authToken = localStorage.getItem('loggedIn');
		axios.post('/api/account/login', credentials).then((user) => {
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
				const authToken = localStorage.setItem('loggedIn', isUserLoggedIn);
				localStorage.removeItem('userInfo');
				this.props.login(isUserLoggedIn);
				this.props.location.state === 'checkout' ? this.props.history.push('/checkout') : 
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
		let passwordError = true;
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	if (!re.test(this.state.email.toLowerCase())) {
			emailError = false;
		}		
		if (this.state.password.length <= 5) {
			passwordError = false;
		}
		this.setState(() => {
			return {
				emailError: emailError ? 'visibility-hidden' : 'visibility-visible',
				passwordError: passwordError ? 'visibility-hidden' : 'visibility-visible'
			}
		});
		if (emailError && passwordError) {
			this.callServer({email: this.state.email, password: this.state.password});
		}
	}
	signUp(e) {
		e.preventDefault();
		this.props.location.state === 'checkout' ? this.props.history.push('/register', 'checkout') : 
		this.props.history.push('/register');	
	}
	componentWillMount() {
		window.scrollTo(0, 0);
	}
	render() {
		return (
			<div>
				<div className="info-on-free-shipping-banner">
					<p>Free Shipping on Orders over <span>$29</span></p>
				</div>
				<section className="section-login">
					<h2>CUSTOMER LOGIN</h2>
					<form>
						<p className={"credError " + this.state.credError}><span>X</span>{this.state.credMessage}</p>
						<p className={"emailError " + this.state.emailError}><span>X</span>Invalid Email.</p>
						<p className={"passwordError " + this.state.passwordError}><span>X</span>Password must be at least 6 characters long.</p>
						<label>Email</label>
						<input value={this.state.email} type="text" name="email" onChange={(e) => {
								this.onChange(e);
							}
						}/>
						<label className="password">Password</label>	
						<span className="forgot-password"><NavLink to="/forgotpassword">Forgot Your Password ?</NavLink></span>
						<input value={this.state.password} type="password" name="password" onChange={(e) => {
								this.onChange(e);
							}
						}/>
						<button type="submit" onClick={(e) => {
								this.onSubmit(e);
							}
						}>Submit</button>
						<p>New Customer ?<span><a href="" onClick={(e) => {
							this.signUp(e);
						}}> Sign up...</a></span></p>
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

export default connect(null, mapDispatchToProps)(Login);