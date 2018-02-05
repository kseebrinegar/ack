import React from 'react';

let counter = 0;
export default class SimpleSlider extends React.Component {
    constructor() {
        super()
        const windowWidth = window.innerWidth;
        this.slideLeft = this.slideLeft.bind(this);
        this.slideRight = this.slideRight.bind(this);
        this.checkWindowSize = this.checkWindowSize.bind(this);
        this.state = {
            carosuelDisplay: 'display-open',
            showImage: 'display-closed',
            carouselPics: [
                {
                        img: '/img/carousel1.png',
                        position: windowWidth >= 768 ? -66.6666 : -200,
                        border: '',
                        opacity: .5,
                        scale: 1,
                        display: 'none',
                        displayTrans: 'hidden',
                        info: 'NIKE AIR FORCE',
                        id: 0,
                        count: -3
                },
                {
                        img: '/img/carousel2.png',
                        position: windowWidth >= 768 ? -33.3333 : -100,
                        border: '',
                        opacity: .5,
                        scale: 1,
                        display: 'none',
                        displayTrans: 'visible',
                        info: 'AIR JORDAN ONE',
                        id: 1,
                        count: -2
                },
                {
                        img: '/img/carousel3.png',
                        position: 0,
                        border: '',
                        opacity: .5,
                        scale: 1,
                        display: 'none',
                        displayTrans: 'visible',
                        info: 'NIKE AIR MAX 97',
                        id: 2,
                        count: -1
                },
                {
                        img: '/img/carousel4.png',
                        position: windowWidth >= 768 ? 33.3333 : 100,
                        border: '3px solid red',
                        opacity: 1,
                        scale: 1.4,
                        display: 'block',
                        displayTrans: 'visible',
                        info: 'NIKE ROSHE ONE',
                        id: 3,
                        count: 0
                },
                {
                        img: '/img/carousel5.png',
                        position: windowWidth >= 768 ? 66.6666 : 200,
                        border: '',
                        opacity: .5,
                        scale: 1,
                        display: 'none',
                        displayTrans: 'visible',
                        info: 'NIKE ROSHE ONE',
                        id: 4,
                        count: 1
                },
                {
                        img: '/img/carousel6.png',
                        position: windowWidth >= 768 ? 99.9999 : 300,
                        border: '',
                        opacity: .5,
                        scale: 1,
                        display: 'none',
                        displayTrans: 'visible',
                        info: 'NIKE JUVENATE',
                        id: 5,
                        count: 2
                },
                {
                        img: '/img/carousel7.png',
                        position: windowWidth >= 768 ? 133.3333 : 400,
                        border: '',
                        opacity: .5,
                        scale: 1,
                        display: 'none',
                        displayTrans: 'hidden',
                        info: 'NIKE AIR FORCE',
                        id: 6,
                        count: 3
                }
            ]
        } 
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.checkWindowSize);
    }
    checkWindowSize() {
        let windowWidth = window.innerWidth;
        if (windowWidth <= 768) {
            this.setState(() => {
                return {
                    showImage: 'display-open',
                    carosuelDisplay: 'display-closed'
                }
            });
        } else {
            this.setState(() => {
                return {
                    showImage: 'display-closed',
                    carosuelDisplay: 'display-open'
                }
            });
        }

         counter = 0;
            windowWidth = window.innerWidth;
            this.setState(() => {
                return {
                    carouselPics: [
                        {
                                img: '/img/carousel1.png',
                                position: windowWidth >= 768 ? -66.6666 : -200,
                                border: '',
                                opacity: .5,
                                scale: 1,
                                display: 'none',
                                displayTrans: '',
                                info: 'NIKE AIR FORCE',
                                id: 0,
                                count: -3
                        },
                        {
                                img: '/img/carousel2.png',
                                position: windowWidth >= 768 ? -33.3333 : -100,
                                border: '',
                                opacity: .5,
                                scale: 1,
                                display: 'none',
                                displayTrans: 'all 1s',
                                info: 'AIR JORDAN',
                                id: 1,
                                count: -2
                        },
                        {
                                img: '/img/carousel3.png',
                                position: 0,
                                border: '',
                                opacity: .5,
                                scale: 1,
                                display: 'none',
                                displayTrans: 'all 1s',
                                info: 'NIKE AIR MAX',
                                id: 2,
                                count: -1
                        },
                        {
                                img: '/img/carousel4.png',
                                position: windowWidth >= 768 ? 33.3333 : 100,
                                border: '3px solid red',
                                opacity: 1,
                                scale: 1.4,
                                display: 'block',
                                displayTrans: 'all 1s',
                                info: 'NIKE ROSHE ONE',
                                id: 3,
                                count: 0
                        },
                        {
                                img: '/img/carousel5.png',
                                position: windowWidth >= 768 ? 66.6666 : 200,
                                border: '',
                                opacity: .5,
                                scale: 1,
                                display: 'none',
                                displayTrans: 'all 1s',
                                info: 'NIKE ROSHE ONE',
                                id: 4,
                                count: 1
                        },
                        {
                                img: '/img/carousel6.png',
                                position: windowWidth >= 768 ? 99.9999 : 300,
                                border: '',
                                opacity: .5,
                                scale: 1,
                                display: 'none',
                                displayTrans: 'all 1s',
                                info: 'NIKE JUVENATE',
                                id: 5,
                                count: 2
                        },
                        {
                                img: '/img/carousel7.png',
                                position: windowWidth >= 768 ? 133.3333 : 400,
                                border: '',
                                opacity: .5,
                                scale: 1,
                                display: 'none',
                                displayTrans: '',
                                info: 'NIKE AIR FORCE',
                                id: 6,
                                count: 3
                        }
                    ]
                }
            });
    }
    componentDidMount() {
        counter = 0;
        this.checkWindowSize();
        window.addEventListener('resize', this.checkWindowSize);   
    }
    slideLeft() {
         const windowWidth = window.innerWidth;
        if (counter === 3) {
            counter = -3;
        } else {
            counter++;
        }

        this.setState((prevState) =>  { 
            const newState = prevState.carouselPics.map((item, index) => {
                if (item.count == counter) {
                    return prevState.carouselPics[index] = {
                        img: prevState.carouselPics[index].img,
                        position: prevState.carouselPics[index].position + (windowWidth >= 768 ? -33.3333 : -100),
                        border: '3px solid red',
                        opacity: 1,
                        scale: 1.4,
                        display: 'block',
                        displayTrans: 'all 1s',
                        info: prevState.carouselPics[index].info,
                        id: index,
                        count: prevState.carouselPics[index].count
                    }
                } else if (prevState.carouselPics[index].position <= -66.6666) {
                    return prevState.carouselPics[index] = {
                        img: prevState.carouselPics[index].img,
                        position: prevState.carouselPics[index].position + (windowWidth >= 768 ? 199.9999 : -100),
                        border: '3px solid red',
                        opacity: .5,
                        scale: 1,
                        display: 'none',
                        displayTrans: '',
                        info: prevState.carouselPics[index].info,
                        id: index,
                        count: prevState.carouselPics[index].count
                    }
                } else {
                    return prevState.carouselPics[index] = {
                        img: prevState.carouselPics[index].img,
                        position: prevState.carouselPics[index].position + (windowWidth >= 768 ? -33.3333 : -100),
                        border: '',
                        opacity: .5,
                        scale: 1,
                        display: 'none',
                        displayTrans: 'all 1s',
                        info: prevState.carouselPics[index].info,
                        id: index,
                        count: prevState.carouselPics[index].count
                    }
                }
            });
        });
    }
    slideRight() {
       if (counter === -3) {
            counter = 3;
        } else {
            counter = counter - 1;
        }
        const windowWidth = window.innerWidth;
        this.setState((prevState) =>  { 
            const newState = prevState.carouselPics.map((item, index) => {
                if (item.count == counter) {
                    return prevState.carouselPics[index] = {
                        img: prevState.carouselPics[index].img,
                        position: prevState.carouselPics[index].position + (windowWidth >= 768 ? 33.333 : 100),
                        border: '3px solid red',
                        opacity: 1,
                        scale: 1.4,
                        display: 'block',
                        displayTrans: 'all 1s',
                        info: prevState.carouselPics[index].info,
                        id: index,
                        count: prevState.carouselPics[index].count
                    }
                } else if (prevState.carouselPics[index].position >= 133.3333) {
                    return prevState.carouselPics[index] = {
                        img: prevState.carouselPics[index].img,
                        position: prevState.carouselPics[index].position + (windowWidth >= 768 ? -199.9999 : -100),
                        border: '3px solid red',
                        opacity: .5,
                        scale: 1,
                        display: 'none',
                        displayTrans: '',
                        info: prevState.carouselPics[index].info,
                        id: index,
                        count: prevState.carouselPics[index].count
                    }
                } else {
                    return prevState.carouselPics[index] = {
                        img: prevState.carouselPics[index].img,
                        position: prevState.carouselPics[index].position + (windowWidth >= 768 ? 33.333 : 100),
                        border: '',
                        opacity: .5,
                        scale: 1,
                        display: 'none',
                        displayTrans: 'all 1s',
                        info: prevState.carouselPics[index].info,
                        id: index,
                        count: prevState.carouselPics[index].count
                    }
                }
            });
        });
    }
	render() {
		return (
            <div>
               
    			<div className="carousel-container">
                    <img src="/img/carousel-banner-sm.jpg" className={this.state.showImage + " banner-carousel"} />
                    <div className={this.state.carosuelDisplay}>
                        <div onClick={this.slideLeft} className="fa fa-arrow-circle-left fa-2x"></div>
                        <div onClick={this.slideRight} className="fa fa-arrow-circle-right fa-2x"></div>
              			<h3>ALLCITY</h3>
                        {
                            this.state.carouselPics.map((item) => {
                                return (
                                    <div key={item.id}>
                                        <div style={{left: item.position + '%', transition: item.displayTrans}} key={item.id} className="carousel c2">
                                            <div style={{ border: item.border}} className="carousel-border">
                                                <p style={{display: item.display}} className="carousel-product-info">{item.info}</p>
                                                <button style={{display: item.display}} className="cicle-plus-border-carousel">
                                                    <div className="circle-plus">
                                                        <p>+</p>
                                                    </div>
                                                </button>
                                                <img style={{opacity: item.opacity, transform: 'scale(' + item.scale + ')'}} src={item.img} />
                                            </div>
                                        </div>
                                        <ul className="current-position-carousel">
                                            {  
                                                this.state.carouselPics.map((item) => {
                                                    return ( 
                                                        <li key={item.id + 1000}><span style={{ display: item.display}}></span></li>
                                                    )
                                                })
                                            }
                                        </ul>  
                                    </div>
                                )
                            })
                        }
                    </div>      
          		</div>
            </div>
    	);
	}	
};

