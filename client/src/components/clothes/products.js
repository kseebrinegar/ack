import React from 'react';
import { connect } from 'react-redux';
import ProductItems from './product-items';
import setShoesFilter from '../../actions/productFilters';
import countProductCatagory from '../../selectors/countProductCatagory';

class Products extends React.Component {
	constructor(props) {
		super(props)
		this.arrowClick = this.arrowClick.bind(this);
		this.changeFilter = this.changeFilter.bind(this);
		this.state = {
			sortBy: {
				arrow: 'rotate(0deg)',
				visibilityFilters: 'hidden'
			},
			filterBy: {
				pricesL2H: true,
				pricesH2L: false,
				productAZ: false,
				productZA: false,
				highestRated: false,
				bestSellers: false,
			}
		}
	}
	changeFilter(e) {
		const clickedFilter = e.target.textContent.toLowerCase();
		this.props.dispatch(setShoesFilter(clickedFilter));

		this.setState((preveState) => {
			return {
				filterBy: {
					pricesL2H: clickedFilter === 'prices low to high' ? true : false,
					pricesH2L: clickedFilter === 'prices high to low' ? true : false,
					productAZ: clickedFilter === 'product name a - z' ? true : false,
					productZA: clickedFilter === 'product name z - a' ? true : false,
					highestRated: clickedFilter === 'highest rated' ? true : false,
					bestSellers: clickedFilter === 'best sellers' ? true : false
				}
			}
		});

	}
	arrowClick() {
		this.setState((prevState) => {
			return {
				sortBy: {
					arrow: prevState.sortBy.arrow === 'rotate(0deg)' ? 'rotate(90deg)' : 'rotate(0deg)',
					visibilityFilters: prevState.sortBy.visibilityFilters === 'hidden' ? 'visible' : 'hidden'
				}
			}
		});
	}
	render() {
		return (
			<div className={this.props.responsiveProducts}>
				<div className="products-banner-img">
					<img src={this.props.productImg} />
				</div>
				<div className="products-header">
					<h2>{this.props.productCatagory} ({this.props.productCount})</h2>
				</div>
				<div className="sortBy">
					<h3>SORT BY</h3>
					<p style={{transform: this.state.sortBy.arrow}} className="fa fa-chevron-right sortby-arrow" onClick={this.arrowClick}></p>
				</div>
				<ul style={{visibility: this.state.sortBy.visibilityFilters}} className="filters-for-product">
					<li className={this.state.filterBy.pricesL2H ? 'current-catagory' : '' }  onClick={this.changeFilter}>Prices Low To High</li>
					<li className={this.state.filterBy.pricesH2L ? 'current-catagory' : '' }  onClick={this.changeFilter}>Prices High To Low</li>
					<li className={this.state.filterBy.productAZ ? 'current-catagory' : '' }  onClick={this.changeFilter}>Product Name A - Z</li>
					<li className={this.state.filterBy.productZA ? 'current-catagory' : '' }  onClick={this.changeFilter}>Product Name Z - A</li>
					<li className={this.state.filterBy.highestRated ? 'current-catagory' : '' }  onClick={this.changeFilter}>Highest Rated</li>
					<li className={this.state.filterBy.bestSellers ? 'current-catagory' : '' }  onClick={this.changeFilter}>Best Sellers</li>
				</ul>
				<ProductItems productPopUp={this.props.productPopUp} />
			</div>
		);
	}
}
const mapStateToProps = ((state) => {
	if (state.listOfproducts.length > 0) {
		return {
			productCatagory: state.shoesFilteringReducer.currentCatagory,
			productCount: countProductCatagory(state.listOfproducts[0], state.shoesFilteringReducer.currentCatagory),
			productImg: state.listOfproducts[0].productsInfo.bannerImg
		};
	} else {
		return {
			
		}
	}
});

export default connect(mapStateToProps)(Products);


