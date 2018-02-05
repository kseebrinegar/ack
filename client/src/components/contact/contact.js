import React from 'react';


export default class Contact extends React.Component {
	constructor() {
		super()
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.initMap = this.initMap.bind(this);
		this.notifyPurchase = this.notifyPurchase.bind(this);
		this.state = {
			name: '',
			email: '',
			subject: '',
			message: '',
			nameError: 'visibility-hidden',
			emailError: 'visibility-hidden',
			messageError: 'visibility-hidden',
			notifyPurchase: 'display-closed'
		}
	}
	notifyPurchase() {
		let oneInterval = 0;
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
	onChange(e) {
		const targetValue = e.target.value;
		const targetName = e.target.name;
		this.setState(() => {
			return {
				nameError: 'visibility-hidden',
				emailError: 'visibility-hidden',
				messageError: 'visibility-hidden',
				[targetName]: targetValue
			}
		});
	}
	onSubmit(e) {
		e.preventDefault()
		let emailError = true;
		let nameError = true;
		let messageError = true;
		const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const reName = /^[a-zA-Z]+$/;
    	if (!reEmail.test(this.state.email.toLowerCase())) {
			emailError = false;
		}
		if (!reName.test(this.state.name)) {
			nameError = false;
		}
		if (this.state.message.length <= 0 || this.state.subject.length <= 0) {
			messageError = false;
		}
		this.setState(() => {
			return {
				emailError: emailError ? 'visibility-hidden' : 'visibility-visible',
				nameError: nameError ? 'visibility-hidden' : 'visibility-visible',
				messageError: messageError ? 'visibility-hidden' : 'visibility-visible'
			}
		});
		if (nameError && emailError && messageError) {
			this.setState(() => {
				return {
					name: '',
					email: '',
					subject: '',
					message: ''
				};
			});
			this.notifyPurchase();
		}
	}
	componentDidMount() {
    	window.google.maps ? this.initMap() : (window.initMap = this.initMap);
  	}
  	initMap() {
  		const options = {
  			zoom: 8,
  			center: {
  				lat: 42.963795,
  				lng: -85.670006
  			 }
  		};
  		const map = new google.maps.Map(document.getElementById('map'), options);

  		const marker = new google.maps.Marker({
  			position: {
  				lat: 42.963795,
  				lng: -85.670006
  			},
  			map: map
  		});
  	}
	render() {
		return (
			<div>
				<div className="info-on-free-shipping-banner">
					<p>Free Shipping on Orders over <span>$29</span></p>
				</div>
				<div className={this.state.notifyPurchase + ' add-product-background'}>
					<h2 className="thankyou">Thank you for the feedback!</h2>
				</div>
				<div className="contact-banner">
					<img src="/img/contact-banner.jpg" />
				</div>
				<section className="contact-section">
					<div className="send-message">
						<h2>Contact Us</h2>
						<h3>Want to say hello?</h3>
						<p>If you have a comment or question
							or if you just want to say hello, you can contact 
							us by the information below. Also, you can send a message.
						</p>
						<h3>General Contact</h3>
						<p><span>Toll-Free:</span> 888-888-8888</p>
						<p><span>Phone:</span> 777-777-7777</p>
						<p><span>Fax:</span> 666-666-6666</p>
						<p><span>Email:</span> Ack@hotmail.com</p>
						<form>
							<p className={"nameErrorMessage " + this.state.nameError}><span>X</span>First name needs to contain at least one letter and have no numbers.</p>
							<p className={"emailErrorMessage " + this.state.emailError}><span>X</span>Invalid Email.</p>
							<p className={"messageErrorMessage " + this.state.messageError}><span>X</span>Subject and message must contain at least one character.</p>
							<label>NAME</label>
							<input value={this.state.name} type="text" name="name" onChange={(e) => {
									this.onChange(e);
								}
							}/>
							<label>YOUR EMAIL</label>	
							<input value={this.state.email} type="text" name="email" onChange={(e) => {
									this.onChange(e);
								}
							}/>
							<label>SUBJECT</label>	
							<input value={this.state.subject} type="text" name="subject" onChange={(e) => {
									this.onChange(e);
								}
							}/>
							<label>YOUR MESSAGE</label>	
							<textarea rows="6" cols="50" value={this.state.message} type="text" name="message" onChange={(e) => {
									this.onChange(e);
								}
							}>
							</textarea>
							<button type="submit" onClick={(e) => {
									this.onSubmit(e);
								}
							}>Submit</button>
						</form>
					</div>
					<div className="google-map">
						<h2>Our Location</h2>
						<h3>Coporate Headquarters</h3>
						<p>1500 Wealthy St.Se</p>
						<p>Grand Rapids,</p>
						<p>MI 49503</p>
						<div id="map">

						</div>
					</div>

				</section>
			</div>
		);
	}
}