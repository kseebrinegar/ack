import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Products from './products';
import currentProductsCatagory from '../../actions/currentProductsCatagory';
import productsActions from '../../actions/productsActions';
import addToCartAction from '../../actions/newItemToCart';


class Sneakers extends React.Component {
	constructor(props) {
		super(props)
		this.arrowClicked = this.arrowClicked.bind(this);
		this.slideNavBar = this.slideNavBar.bind(this);
		this.scrollEvents = this.scrollEvents.bind(this);
		this.windowResize = this.windowResize.bind(this);
		this.changeCatagoryShoes = this.changeCatagoryShoes.bind(this);
		this.changeCatagoryClothing = this.changeCatagoryClothing.bind(this);
		this.changeCatagoryAccessories = this.changeCatagoryAccessories.bind(this);
		this.pickShoeSizePopUp = this.pickShoeSizePopUp.bind(this);
		this.toggleShoeSizePopUp = this.toggleShoeSizePopUp.bind(this);
		this.productPopUp = this.productPopUp.bind(this);
		this.addToCart = this.addToCart.bind(this);
		this.collapseNavAfterCatagoryClick = this.collapseNavAfterCatagoryClick.bind(this);
		this.maxCountPerItem = this.maxCountPerItem.bind(this);
		this.notifyContent = this.notifyContent.bind(this);
		this.removePopUpModule = this.removePopUpModule.bind(this);
		this.scrollEventHandler = this.scrollEventHandler.bind(this);
		this.state = {
			shoes: {
				arrow: 'rotate(90deg)',
				height: '200px',
				shoesType: 'View',
				viewall: true,
				skateboarding: false,
				sneakers: false,
				sandals: false,
				boots: false,
				snowboardboots: false
			},
			clothing: {
				arrow: 'rotate(0deg)',
				height: '0px',
				viewall: true,
				jackets: false,
				hoodies: false,
				shirts: false,
				jeans: false,
				shorts: false
			},
			accessories: {
				arrow: 'rotate(0deg)',
				height: '0px',
				viewall: true,
				hats: false,
				beanies: false,
				bags: false,
				watches: false
			},
			navagation: {
				toggleOpen: 'side-nav-content',
				fixedOrAbsolute: 'nav-side-container',
				fixedOrAbsoluteHamburger: 'shoes-fixed-side-nav-hamburger',
				widthOfNavContainer: 0	
			},
			mainContentAdjust: {
				expand: 'all-products-expand'
			},
			productPopUp: {
				toggleOpen: 'display-closed',
				size: 'Please Select a Size',
				toggleProductPopUp: 'display-closed add-product-background',
				checkForSize: 'display-closed product-size-error',
				productData: {
					productId: 0,
					img: '',
					name: '',
					stars: [],
					item: 0,
					color: '',
					price: 0,
					sizes: [],
					defaultSize: '',
					productType: ''
				}
			},
			notifyUserToggle: 'nofity-added-to-cart-before-animation',
			notifyUserContent: true,
		};
	}
	collapseNavAfterCatagoryClick() {
		this.setState((preveState) => {
			return {
				navagation: {
					toggleOpen: preveState.navagation.toggleOpen ,
					fixedOrAbsolute: preveState.navagation.fixedOrAbsolute,
					fixedOrAbsoluteHamburger: preveState.navagation.fixedOrAbsoluteHamburger,
					widthOfNavContainer: 0
				}
			}	

		});
	}
	notifyContent(checkBoolean) {
		if (checkBoolean) {
			return 'Item added to cart.';
		} else {
			return 'Sorry, maximum amount allowed is 10 items.';
		}
	}
	removePopUpModule() {
		this.setState((preveState) => {
			return {
				notifyUserToggle: 'nofity-added-to-cart-before-animation',
				notifyUserContent: preveState.notifyUserContent
			}
		});
	}
	maxCountPerItem(productData, productSize) {
		let findItemInCart = this.props.cart.filter((element) => {
			return element.name === productData.name && element.defaultSize === productSize;
		});
		if (findItemInCart.length !== 0) {
			if (Number(findItemInCart[0].qty) < 10) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	addToCart(productData, productSize) {
		const isMaxQtyEqual10 = this.maxCountPerItem(productData, productSize);
		if (this.state.productPopUp.productData.sizes.length === 0) {
			this.setState((preveState) => {
				return {
					productPopUp: {
						toggleOpen: preveState.productPopUp.toggleOpen,
						size: 'Please Select a Size',
						toggleProductPopUp: 'display-open add-product-background',
						checkForSize: 'display-closed product-size-error',
						productData: {
							productId: preveState.productPopUp.productData.productId,
							img: preveState.productPopUp.productData.img,
							name: preveState.productPopUp.productData.name,
							stars: preveState.productPopUp.productData.stars,
							item: preveState.productPopUp.productData.item,
							color: preveState.productPopUp.productData.color,
							price: preveState.productPopUp.productData.price,
							sizes: preveState.productPopUp.productData.sizes,
							defaultSize: preveState.productPopUp.productData.defaultSize,
							productType: preveState.productPopUp.productData.productType
						}
					},
					notifyUserToggle: 'nofity-added-to-cart-after-animation',
					notifyUserContent:  !isMaxQtyEqual10 ? true : false
				}
			});
			if (isMaxQtyEqual10) {
				return;
			}
			const addQtyToProductData = {
				...productData,
				qty: 1
			};
			this.props.addToCartAction(addQtyToProductData);
			return;
		}
		const checkForSize = this.state.productPopUp.size;
		const arraySizePossiabilties = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10',
										'10.5', '11', '11.5', '12', '12.5', '13', '14', 'S', 
										'M', 'L', 'XL', 'XXL'];
		const check = arraySizePossiabilties.some((element) => {
			return element === checkForSize;
		});
	
		if (check && !isMaxQtyEqual10) {
			const addQtyToProductData = {
				...productData,
				qty: 1
			};
			this.props.addToCartAction(addQtyToProductData);
			this.setState((preveState) => {
				return {
					notifyUserToggle: 'nofity-added-to-cart-after-animation',
					notifyUserContent: !isMaxQtyEqual10 ? true : false
				}
			});
			return;
		}
		this.setState((preveState) => {
			return {
				productPopUp: {
					toggleOpen: preveState.productPopUp.toggleOpen,
					size: 'Please Select a Size',
					toggleProductPopUp: check ? 'display-closed add-product-background' : 'display-open add-product-background',
					checkForSize: check ? 'display-closed product-size-error' : 'display-open product-size-error',
					productData: {
						productId: preveState.productPopUp.productData.productId,
						img: preveState.productPopUp.productData.img,
						name: preveState.productPopUp.productData.name,
						stars: preveState.productPopUp.productData.stars,
						item: preveState.productPopUp.productData.item,
						color: preveState.productPopUp.productData.color,
						price: preveState.productPopUp.productData.price,
						sizes: preveState.productPopUp.productData.sizes,
						defaultSize: preveState.productPopUp.productData.defaultSize,
						productType: preveState.productPopUp.productData.productType
					}
				},
				notifyUserToggle: check ? 'nofity-added-to-cart-after-animation' : 'nofity-added-to-cart-before-animation',
				notifyUserContent: !isMaxQtyEqual10 ? true : false
			}
		});
	}
	productPopUp({productId = '', img = '', name = '', stars = '', rank = '', color = '', price = '', sizes = [], defaultSize = '', productType = ''}) {
		if (window.innerWidth >= 865) {
			this.setState((preveState) => {
				return {
					productPopUp: {
						toggleOpen: preveState.productPopUp.toggleOpen,
						size: 'Please Select a Size',
						toggleProductPopUp: preveState.productPopUp.toggleProductPopUp === 'display-closed add-product-background' ? 'display-open add-product-background' : 'display-closed add-product-background',
						checkForSize: 'display-closed product-size-error',
						productData: {
							productId: productId,
							img: img,
							name: name,
							stars: stars,
							item: rank,
							color: color,
							price: price,
							sizes: sizes,
							defaultSize: defaultSize,
							productType: productType
						}
					}
				}
			});
		}
	}
	toggleShoeSizePopUp() {
		if (this.state.productPopUp.productData.sizes.length !== 0) {
			this.setState((preveState) => {
				return {
					productPopUp: {
						toggleOpen: preveState.productPopUp.toggleOpen === 'display-open' ? 'display-closed' : 'display-open',
						size: 'Please Select a Size',
						toggleProductPopUp: preveState.productPopUp.toggleProductPopUp,
						checkForSize: 'display-closed product-size-error',
						productData: {
							productId: preveState.productPopUp.productData.productId,
							img: preveState.productPopUp.productData.img,
							name: preveState.productPopUp.productData.name,
							stars: preveState.productPopUp.productData.stars,
							item: preveState.productPopUp.productData.item,
							color: preveState.productPopUp.productData.color,
							price: preveState.productPopUp.productData.price,
							sizes: preveState.productPopUp.productData.sizes,
							defaultSize: preveState.productPopUp.productData.defaultSize,
							productType: preveState.productPopUp.productData.productType
						}
					}	
				}
			});
		}
	}
	pickShoeSizePopUp(e) {
		const event = e.target.textContent
		this.setState((preveState) => {
			return {
				productPopUp: {
					toggleOpen: 'display-closed', 
					size: event,
					toggleProductPopUp: preveState.productPopUp.toggleProductPopUp,
					checkForSize: preveState.productPopUp.checkForSize,
						productData: {
						productId: preveState.productPopUp.productData.productId,
						img: preveState.productPopUp.productData.img,
						name: preveState.productPopUp.productData.name,
						stars: preveState.productPopUp.productData.stars,
						item: preveState.productPopUp.productData.item,
						color: preveState.productPopUp.productData.color,
						price: preveState.productPopUp.productData.price,
						sizes: preveState.productPopUp.productData.sizes,
						defaultSize: event,
						productType: preveState.productPopUp.productData.productType
					}
				}
			}
		});

	}
	changeCatagoryAccessories(e, checkForBoolean = false) {
		if (window.innerWidth <= 768 && checkForBoolean !== true) {
			this.collapseNavAfterCatagoryClick();
		}
		const catagory = typeof e === 'string' ? e : e.target.textContent.toLowerCase().trim();
		this.props.currentProductsCatagory(catagory);
		this.props.productsActions('accessories');
		this.setState((preveState) => {
			return {
				accessories: {
					arrow: preveState.accessories.arrow,
					height: preveState.accessories.height,
					viewall: catagory === 'view all' ? true : false,
					hats: catagory === 'hats' ? true : false,
					beanies: catagory === 'beanies' ? true : false,
					bags: catagory === 'bags' ? true : false,
					watches: catagory === 'watches' ? true : false
				}
			}
		});
	}
	changeCatagoryClothing(e, checkForBoolean = false) {
		if (window.innerWidth <= 768 && checkForBoolean !== true) {
			this.collapseNavAfterCatagoryClick()
		}
		const catagory = typeof e === 'string' ? e : e.target.textContent.toLowerCase().trim();
		this.props.currentProductsCatagory(catagory);
		this.props.productsActions('clothing');
		this.setState((preveState) => {
			return {
				clothing: {
					arrow: preveState.clothing.arrow,
					height: preveState.clothing.height,
					viewall: catagory === 'view all' ? true : false,
					jackets: catagory === 'jackets' ? true : false,
					hoodies: catagory === 'hoodies' ? true : false,
					shirts: catagory === 'shirts' ? true : false,
					jeans: catagory === 'jeans' ? true : false,
					shorts: catagory === 'shorts' ? true : false
				}
			}
		});
	}
	changeCatagoryShoes(e, checkForBoolean = false) {
		if (window.innerWidth <= 768 && checkForBoolean !== true) {
			this.collapseNavAfterCatagoryClick()
		}
		const catagory = typeof e === 'string' ? e : e.target.textContent.toLowerCase().trim();
		this.props.currentProductsCatagory(catagory);
		this.props.productsActions('shoes');
		this.setState((preveState) => {
			return {
				shoes: {
					arrow: preveState.shoes.arrow,
					height: preveState.shoes.height,
					shoesType: preveState.shoes.shoesType,
					viewall: catagory === 'view all' ? true : false,
					skateboarding: catagory === 'skateboarding' ? true : false,
					sneakers: catagory === 'sneakers' ? true : false,
					sandals: catagory === 'sandals' ? true : false,
					boots: catagory === 'boots' ? true : false,
					snowboardboots: catagory === 'snowboard boots' ? true : false
				}
			}
		});
	}
	slideNavBar() {
		this.setState((preveState) => {
			if (window.innerWidth >= 768) {
				return {
					navagation: {
						toggleOpen: preveState.navagation.toggleOpen,
						fixedOrAbsolute: preveState.navagation.fixedOrAbsolute,
						fixedOrAbsoluteHamburger: preveState.navagation.fixedOrAbsoluteHamburger,
						widthOfNavContainer: preveState.navagation.widthOfNavContainer === 0 ? 25 : 0
					},
					mainContentAdjust: {
						expand: preveState.mainContentAdjust.expand === 'all-products' ? 'all-products-expand' : 'all-products' 
					}
				}
			} else {
				return {
					navagation: {
						toggleOpen: preveState.navagation.toggleOpen,
						fixedOrAbsolute: preveState.navagation.fixedOrAbsolute,
						fixedOrAbsoluteHamburger: preveState.navagation.fixedOrAbsoluteHamburger,
						widthOfNavContainer: preveState.navagation.widthOfNavContainer === 0 ? 100 : 0
					},
					mainContentAdjust: {
						expand: 'all-products-expand'
					}
				}
			}
		});
	}
	arrowClicked(e) {
		const getClickedId = e.target.getAttribute('id');
		const array = ['shoes', 'clothing', 'accessories'];
		array.map((item) => {
			if(getClickedId === item) {
				this.setState((preveState) => {
					return {
						[getClickedId]: {
							arrow: preveState[getClickedId].arrow === 'rotate(90deg)' ? 'rotate(0deg)' : 'rotate(90deg)',
							height: preveState[getClickedId].height === '200px' ? '0px' : '200px',
						}
					}
				});
			} else {
				this.setState(() => {
					return {
						[item]: {
							arrow: 'rotate(0deg)',
							height: '0px'
						}
					}
				});
			}
		});
		getClickedId === 'shoes' ? this.changeCatagoryShoes('view all', true) : '';	
		getClickedId === 'clothing' ? this.changeCatagoryClothing('view all', true) : '';		
		getClickedId === 'accessories' ? this.changeCatagoryAccessories('view all', true) : '';
	}
	componentWillUnmount() {
    	document.removeEventListener('scroll', this.scrollEventHandler);
	}
	scrollEventHandler() {
		const topOfSideNavBar = document.getElementsByClassName('shoes-content-watch');
		const compareHeight = document.getElementsByClassName('info-on-free-shipping-banner');
		const footer = document.getElementsByTagName('footer');
		const footerPosition = footer[0].offsetTop;
		const checkPosition = topOfSideNavBar[0].offsetTop;
			this.setState((preveState) => {
				return {
					navagation: {
						toggleOpen: preveState.navagation.toggleOpen,
						fixedOrAbsolute: checkPosition >= window.scrollY ? 'nav-side-container' : 'nav-side-container-fixed',
						fixedOrAbsoluteHamburger: checkPosition >= window.scrollY ? 'shoes-fixed-side-nav-hamburger ' : 'shoes-fixed-side-nav-hamburger-fixed',
						widthOfNavContainer: preveState.navagation.widthOfNavContainer
					}
				}
			});
			this.setState((preveState) => {
				return {
					navagation: {
						toggleOpen: preveState.navagation.toggleOpen,
						fixedOrAbsolute: compareHeight[0].offsetTop + 40 <= window.scrollY ? 'nav-side-container-fixed': 'nav-side-container',
						fixedOrAbsoluteHamburger: compareHeight[0].offsetTop + 40 <= window.scrollY ? 'shoes-fixed-side-nav-hamburger-fixed': 'shoes-fixed-side-nav-hamburger',
						widthOfNavContainer: preveState.navagation.widthOfNavContainer
					}
				}
			});
		
		if (window.scrollY >= topOfSideNavBar[0].offsetTop) {
			const navagation = document.getElementsByClassName('shoes-content-watch'); //document.getElementsByClassName('nav-side-container-fixed');
			const navagationHamburger = document.getElementsByClassName('hamburger-watch'); //'//document.getElementsByClassName('shoes-fixed-side-nav-hamburger-fixed');
			const checkToSwitchPostion = window.scrollY + window.innerHeight - footerPosition;

			if (window.scrollY + window.innerHeight >= footerPosition ) {
				navagation[0].style.top = '-' + checkToSwitchPostion + 'px';
				navagationHamburger[0].style.top = '-' + checkToSwitchPostion + 'px';
			} else if (window.scrollY + window.innerHeight <= footerPosition) {
				navagation[0].style.top = '0px';
				navagationHamburger[0].style.top = '0px';
			}
		}
	}
	scrollEvents() {
		window.scrollTo(0, 0);
		document.addEventListener('scroll', this.scrollEventHandler);
	}
	windowResize() {
		window.addEventListener('resize', () => {
			if (window.innerWidth <= 865) {
				this.setState((preveState) => {
					return {
						productPopUp: {
							toggleOpen: preveState.productPopUp.toggleOpen,
							size: preveState.productPopUp.size,
							toggleProductPopUp: 'display-closed add-product-background',
							checkForSize: preveState.productPopUp.checkForSize,
							productData: {
								productId: preveState.productPopUp.productData.productId,
								img: preveState.productPopUp.productData.img,
								name: preveState.productPopUp.productData.name,
								stars: preveState.productPopUp.productData.stars,
								item: preveState.productPopUp.productData.item,
								color: preveState.productPopUp.productData.color,
								price: preveState.productPopUp.productData.price,
								sizes: preveState.productPopUp.productData.sizes,
								defaultSize: preveState.productPopUp.productData.defaultSize
							}
						}
					}
				});
			}
			if (window.innerWidth >= 768) {
				this.setState((preveState) => {
					return {
						navagation: {
							toggleOpen: preveState.navagation.toggleOpen,
							fixedOrAbsolute: preveState.navagation.fixedOrAbsolute,
							fixedOrAbsoluteHamburger: preveState.navagation.fixedOrAbsoluteHamburger,
							widthOfNavContainer: 0 
						},
						mainContentAdjust: {
							expand: 'all-products-expand' 
						}
					}
				});
			} else {
				this.setState((preveState) => {
					return {
						navagation: {
							toggleOpen: preveState.navagation.toggleOpen,
							fixedOrAbsolute: preveState.navagation.fixedOrAbsolute,
							fixedOrAbsoluteHamburger: preveState.navagation.fixedOrAbsoluteHamburger,
							widthOfNavContainer: 0 
						},
						mainContentAdjust: {
							expand: 'all-products-expand'
						}
					}
				});
			}
		});
	}
	componentWillMount() {
		this.scrollEvents();
		this.windowResize();
		this.props.productsActions('shoes');
		this.props.currentProductsCatagory('view all');
		window.scrollTo(0, 0);
	}
	render() {
		return (
			<section className="shoes-page">
				<div className={this.state.notifyUserToggle}>
					<div>
						<p>{this.state.notifyUserContent ? this.notifyContent(true) : this.notifyContent(false)}</p>
						<button onClick={() => {
								this.removePopUpModule()
							}}
						>Okay</button>
					</div>
				</div>
				<div  className={this.state.productPopUp.toggleProductPopUp === 'display-closed add-product-background' 
				? 'display-closed add-product-background' : 'display-open add-product-background'} 
				>
					<div className="add-product-popup">
						<div onClick={this.productPopUp} className="product-popup-close">
							<p className="fa fa-times"></p>
						</div>
						<div className="product-popup-inner-container">
							<div className="product-popup-image">
								<img src={this.state.productPopUp.productData.img}/>
							</div>
							<div className="product-popup-info">
								<p>{this.state.productPopUp.productData.name}</p>
								<p className="product-popup-info-price">${this.state.productPopUp.productData.price}</p>
								<p className="product-popup-info-colors">{this.state.productPopUp.productData.color}</p>
								<div className={"product-popup-info-button-sizes" + ' ' + this.state.productPopUp.toggleOpen}>
									<ul>
									{
										this.state.productPopUp.productData.sizes.map((item) => {
											return <li key={Math.random() + 10} onClick={this.pickShoeSizePopUp}>{item}</li>
										})
									}
									</ul>
								</div>
								<button onClick={this.toggleShoeSizePopUp} className="product-popup-info-button">
									<p>{this.state.productPopUp.productData.defaultSize}<span className="fa fa-chevron-right"></span></p>
								</button>
								<p className={this.state.productPopUp.checkForSize}>Please Select a Size</p>
								<button onClick={() => {
									this.addToCart(this.state.productPopUp.productData, this.state.productPopUp.productData.defaultSize);
								}} className="product-popup-Add-to-cart">
									<p>ADD TO CART</p>
								</button>
								<button onClick={this.productPopUp} className="product-popup-view-details">
									<Link to={{
										pathname: '/product',
										state: {
											id: this.state.productPopUp.productData.productId,
											productType: this.state.productPopUp.productData.productType,
											defaultSize: this.state.productPopUp.productData.defaultSize
										}
									}}><p>VIEW FULL DETAILS</p></Link>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="info-on-free-shipping-banner">
					<p>Free Shipping on Orders over <span>$29</span></p>
				</div>
				<div className="shoes-content">
					<div>
					<div className={this.state.navagation.fixedOrAbsoluteHamburger + ' ' + 'hamburger-watch'} onClick={this.slideNavBar}>
						<div className="side-nav-icon">
							<p></p>
							<p></p>
							<p></p>
						</div>
					</div>
					<div style={{width: this.state.navagation.widthOfNavContainer + '%'}} className={this.state.navagation.fixedOrAbsolute + ' ' + "shoes-content-watch"} >
						<div className={this.state.navagation.toggleOpen + ' ' + "catagories-container"}>
							<h1>CATAGORIES</h1>
							<div className="catagories">
								<h2>SHOES</h2>
								<p style={{transform: this.state.shoes.arrow}} id="shoes" className="fa fa-chevron-right shoes-nav-arrow" onClick={this.arrowClicked}></p>
								<ul style={{maxHeight: this.state.shoes.height, transition: '1s'}}>
									<li className={this.state.shoes.viewall ? 'current-catagory' : '' } onClick={this.changeCatagoryShoes}>View All</li>
									<li className={this.state.shoes.skateboarding ? 'current-catagory' : '' } onClick={this.changeCatagoryShoes}>Skateboarding</li>
									<li className={this.state.shoes.sneakers ? 'current-catagory' : ''} onClick={this.changeCatagoryShoes} >Sneakers</li>
									<li className={this.state.shoes.sandals ? 'current-catagory' : ''} onClick={this.changeCatagoryShoes}>Sandals</li>
									<li className={this.state.shoes.boots ? 'current-catagory' : ''} onClick={this.changeCatagoryShoes}>Boots</li>
									<li className={this.state.shoes.snowboardboots ? 'current-catagory' : ''} onClick={this.changeCatagoryShoes}>Snowboard Boots</li>
								</ul>
							</div>
							<div className="catagories">
								<h2>CLOTHING</h2>
								<p style={{transform: this.state.clothing.arrow}} id="clothing" className="fa fa-chevron-right clothing-nav-arrow" onClick={this.arrowClicked}></p>
								<ul style={{maxHeight: this.state.clothing.height, transition: '1s'}}>
									<li className={this.state.clothing.viewall ? 'current-catagory' : ''} onClick={this.changeCatagoryClothing}>View All</li>
									<li className={this.state.clothing.jackets ? 'current-catagory' : ''} onClick={this.changeCatagoryClothing}>Jackets</li>
									<li className={this.state.clothing.hoodies ? 'current-catagory' : ''} onClick={this.changeCatagoryClothing}>Hoodies</li>
									<li className={this.state.clothing.shirts ? 'current-catagory' : ''} onClick={this.changeCatagoryClothing}>Shirts</li>
									<li className={this.state.clothing.jeans ? 'current-catagory' : ''} onClick={this.changeCatagoryClothing}>Jeans</li>
									<li className={this.state.clothing.shorts ? 'current-catagory' : ''} onClick={this.changeCatagoryClothing}>Shorts</li>
								</ul>
							</div>
							<div className="catagories">
								<h2>ACCESSORIES</h2>
								<p style={{transform: this.state.accessories.arrow}} id="accessories" className="fa fa-chevron-right accessories-nav-arrow" onClick={this.arrowClicked}></p>
								<ul style={{maxHeight: this.state.accessories.height, transition: '1s'}}>
									<li className={this.state.accessories.viewall ? 'current-catagory' : ''} onClick={this.changeCatagoryAccessories}>View All</li>
									<li className={this.state.accessories.hats ? 'current-catagory' : ''} onClick={this.changeCatagoryAccessories}>Hats</li>
									<li className={this.state.accessories.beanies ? 'current-catagory' : ''} onClick={this.changeCatagoryAccessories}>Beanies</li>
									<li className={this.state.accessories.bags ? 'current-catagory' : ''} onClick={this.changeCatagoryAccessories}>Bags</li>
								</ul>
							</div>
						</div>
					</div>
					</div>
					<Products responsiveProducts={this.state.mainContentAdjust.expand} 
						productPopUp={this.productPopUp} 
					/>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cart: state.cart
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		productsActions: productsActions,
		currentProductsCatagory: currentProductsCatagory,
		addToCartAction: addToCartAction
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Sneakers);