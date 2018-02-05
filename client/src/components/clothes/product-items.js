import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import chooseCatagoryAndFilters from '../../selectors/chooseCatagoryAndFilter';

class ProductItems extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {	
		return (
			<div className="productItems">
				{
					this.props.products.map((item) => {
						return (
							<div  key={item.productId} className="productItem-thumbnail">
								<div className="eye-view" onClick={() => {
										const productData = {
											productId: item.productId,
											img: item.img,
											name: item.name,
											stars: item.stars,
											rank: item.rank,
											color: item.color,
											price: item.price,
											sizes: item.sizes,
											defaultSize: item.defaultSize,
											productType: item.productType
										}
										this.props.productPopUp(productData);
									}
								}>
									<p>Quick View<span className="fa fa-eye"></span></p>
								</div>
								<Link to={{
									pathname: '/product',
									state: {
										id: item.productId,
										productType: item.productType,
										defaultSize: item.defaultSize
									}
								}}>
									<img src={item.img} />
							        <p className="productItem-thumbnail-total-color">{item.color}</p>
									<div className="productItem-thumbnail-discription">
									 	<p>{item.name}</p>
									 	<p className="productItem-thumbnail-price">{item.price}</p>
									 	<div className="product-ranks">
									 		<ul className="star-rank">
									 			{
									 				item.stars.map((num) => {
										 				return <li key={item.productId + Math.random()} className="fa fa-star" aria-hidden="true"></li>
										 			})
										 		}
									 		</ul>
									 		<div className="highest-rated-rank">
									 			<p>{item.rank}</p>
									 		</div>
									 	</div>
									</div>
								</Link>
							</div>
						)
					})
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	try {
		return {
			products: chooseCatagoryAndFilters(state.listOfproducts[0].productsInfo.products, state.shoesFilteringReducer)
		};
	} catch (e) {
		return {
			products: []
		};
	}
}



export default connect(mapStateToProps)(ProductItems);

