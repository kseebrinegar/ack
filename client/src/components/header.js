import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import countTheCartItems from '../selectors/countTheCartItems';

class Header extends React.Component {
	constructor(props) {
		super(props)
		this.openModule = this.openModule.bind(this);
		this.closeModule = this.closeModule.bind(this);
		this.state = {
			cartCount: 0
		}
	}	
	openModule() {
		const responsiveContainer = document.getElementsByClassName('responsive-container');
		const containerModulePopup = document.getElementsByClassName('container-module-popup');
		responsiveContainer[0].style.display = 'none';
		containerModulePopup[0].style.display = 'block';
	}
	closeModule() {
		const responsiveContainer = document.getElementsByClassName('responsive-container');
		const containerModulePopup = document.getElementsByClassName('container-module-popup');
		responsiveContainer[0].style.display = 'block';
		containerModulePopup[0].style.display = 'none';
	}
	componentWillMount() {
		this.setState(() => {
			return {
				cartCount: this.state.cartCount
			}
		});
	}
	render() {
		return (
			<header>
				<div className="hide-container-768">
					<div className="user-icon-container">
						<NavLink className={this.props.isUserLoggedIn.length > 0 ? 'display-closed' : 'display-open'} to="/login" exact={true}>
							<p className="fa fa-user fa-lg" aria-hidden="true"> Login</p>
						</NavLink>
						<NavLink className={this.props.isUserLoggedIn.length > 0 ? 'display-open' : 'display-closed'} to="/myaccount" exact={true}>
							<p className="fa fa-user fa-lg" aria-hidden="true"> My Account</p>
						</NavLink>
					</div>
					<div className="search-bag">
						<div className="bag">
							<div className="circle-bag">
								<p>{this.props.cartCount}</p>
							</div>
							<p><NavLink to="/cart">BAG</NavLink></p>
						</div>
					</div>
					<div className="default-nav">
						<ul>
							<NavLink to="/clothes" exact={true}><li>CLOTHES</li></NavLink>
							<NavLink to="/about" exact={true}><li>ABOUT</li></NavLink>
							<NavLink to="/" exact={true}><li className="logo"><h1>ACK</h1></li></NavLink>
							<NavLink to="/blog" exact={true}><li>BLOG</li></NavLink>
							<NavLink to="/contact" exact={true}><li>CONTACT</li></NavLink>
						</ul>
					</div>
				</div>
				<div className="responsive-container">
					<div className="hamburger" onClick={this.openModule}>
						<i className="fa fa-bars fa-2x" aria-hidden="true"></i>
					</div>
					<div className="search-bag-responsive search-bag">
						<div className="user-icon-container">
							<NavLink className={this.props.isUserLoggedIn.length > 0 ? 'display-closed' : 'display-open'} to="/login" exact={true}>
								<p className="fa fa-user fa-lg" aria-hidden="true"> Login</p>
							</NavLink>
							<NavLink className={this.props.isUserLoggedIn.length > 0 ? 'display-open' : 'display-closed'} to="/myaccount" exact={true}>
								<p className="fa fa-user fa-lg" aria-hidden="true"> My Account</p>
							</NavLink>
						</div>
						<div className="bag">
							<p><NavLink to="/cart">BAG</NavLink></p>
							<div className="circle-bag">
								<p>{this.props.cartCount}</p>
							</div>
						</div>
					</div>		
				</div>
				<div className="container-module-popup">
					<div className="module-pop-up-close" onClick={this.closeModule}>
						<i className="fa fa-times fa-3x" aria-hidden="true"></i>
					</div>
					<nav className="nav-module">
						<ul>
							<NavLink onClick={this.closeModule} to="/" exact={true}><li className="logo"><h1>ACK</h1></li></NavLink>
							<NavLink onClick={this.closeModule} to="/clothes" exact={true}><li>CLOTHES</li></NavLink>
							<NavLink onClick={this.closeModule} to="/about" exact={true}><li>ABOUT</li></NavLink>
							<NavLink onClick={this.closeModule} to="/blog" exact={true}><li>BLOG</li></NavLink>
							<NavLink onClick={this.closeModule} to="/contact" exact={true}><li>CONTACT</li></NavLink>
						</ul>
					</nav>
				</div>
			</header>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cartCount: countTheCartItems(state.cart),
		isUserLoggedIn: state.loggedIn
	}
};

export default connect(mapStateToProps)(Header);






