import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import Home from '../components/home/home';
import Clothes from '../components/clothes/clothes';
import About from '../components/about/about';
import Blog from '../components/blog/blog';
import Contact from '../components/contact/contact';
import Products from '../components/product/products';
import Cart from '../components/cart/shoppingCart';
import Login from '../components/account/login';
import CreateAccount from '../components/account/createAccount';
import MyAccount from '../components/account/MyAccount';
import ForgotPassword from '../components/account/ForgotPassword';
import CheckOut from '../components/checkout/checkout'
import PageNotFound from '../components/404';

const LocalRoute = ({component: Component, sendAuth: auth, ...rest}) => {
	return (
		<Route {...rest} render={(props) => {
			return (
				auth.length !== 0 ? <Redirect to="/myaccount"/> :
				<Component {...props} /> 
			);
		}} />
	);
};

const PrivateRoute = ({component: Component, sendAuth: auth, ...rest}) => {
	return (
		<Route {...rest} render={(props) => {
			return (
				auth.length === 0 ? <Redirect to="/login" /> :
				<Component {...props} /> 
			);
		}} />
	);
};

const CheckOutRoute = ({component: Component, sendAuth: auth, cart: cart, ...rest}) => {
	return (
		<Route {...rest} render={(props) => {
			return (
				auth.length === 0 || cart.length === 0 ? <Redirect to="/cart" /> :
				<Component {...props} /> 
			);
		}} />
	);
};

const ParamRoute = ({component: Component, location: location, ...rest}) => {
	return (
		<Route {...rest} render={(props) => {
			return (
				location.state === undefined ? <Redirect to="/cothes" /> :
				<Component {...props} />
			)
		}} />
	);
};


class AppRouter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			authToken: this.props.loggedIn,
			cart: this.props.cart
		}
	}
	componentWillReceiveProps() {
		this.setState(() => {
			return {
				authToken: this.props.loggedIn,
				cart: this.props.cart
			}
		})
	}
	componentWillMount() {
		this.setState(() => {
			return {
				authToken: this.props.loggedIn,
				cart: this.props.cart
			}
		})
	}
	render() {
		const authToken = this.props.loggedIn;
		const cart = this.props.cart;
		return (
			<BrowserRouter>
				<div>
					<Header />
						<Switch>
							<Route path="/" component={Home} exact={true} />
							<Route path="/clothes" component={Clothes} />
							<Route path="/about" component={About} />
							<Route path="/blog" component={Blog} />
							<Route path="/contact" component={Contact} />
							<ParamRoute path="/product" component={Products} exact={true} />
							<Route path="/cart" component={Cart} exact={true} />
							<LocalRoute path="/login" component={Login} exact={true} sendAuth={authToken} />
							<LocalRoute path="/register" component={CreateAccount} exact={true} sendAuth={authToken} />
							<PrivateRoute path="/myaccount" component={MyAccount} exact={true} sendAuth={authToken} />
							<LocalRoute path="/forgotpassword" component={ForgotPassword} exact={true} sendAuth={authToken} />
							<CheckOutRoute path="/checkout" component={CheckOut} exact={true} sendAuth={authToken} cart={cart} />
							<Route component={PageNotFound}  />
						</Switch>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		loggedIn: state.loggedIn,
		cart: state.cart
	}
};

export default connect(mapStateToProps)(AppRouter);

