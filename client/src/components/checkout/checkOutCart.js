import React from 'react';
import uuid from 'uuid';

const checkOutCart = (props) => {
	return (
		<div>
			<div className="checkout-cart">
			{
				props.cartItems.cart.map((item) => {
					return (
						<div className="animation-container" key={uuid()}>
							<div className="checkout-qty-and-img">
								<img src={item.img} />
								<div>
									<p>{item.qty}</p>
								</div>
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
			<div className="checkout-total-container">
				<div className="checkout-total-left">
					<p>Subtotal: </p>
					<p>Shipping: </p>
				</div>
				<div className="cart-total">
					<div className="cart-total-right">
						<p className="padding-right-total">${props.cartItems.countTotalCost}</p>
						<p className="padding-right-total">{props.shippingPrice}</p>
					</div>
				</div>
				<div className="border-total"></div>
				<div className="checkout-total-left">
					<p className="no-margin">Total: </p>
				</div>
				<div className="cart-total">
					<div className="cart-total-right">
						<p className="padding-right-total">${props.totalCost()}</p>
					</div>
				</div>
			</div>
		</div>
	)
};

export default checkOutCart;