
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Link } from 'react-router-dom'
import ProductItem from './HomePage/SingleProduct/ProductItem';
import CategoryItem from './HomePage/SingleProduct/CategoryItem';
import MenuItem from './HomePage/Layout/MenuItem';
import './Styles/Landing.css';
import './Styles/Home.css';


import {getHomeProductMenu,getHomeProducts} from './Actions';
    //import { BrowserRouter, Route, Switch } from 'react-router-dom'

 export default  class HomeBody extends Component{

constructor(){
	super()
	this.state={
		menus:[],
		products:[],
		brands:[]
	}
}

 	addToCart(){

 	}
 	componentDidMount(){
 		getHomeProductMenu(res=>{
 			console.log(res);
 			if(res.data)
 			{
 				this.setState({
 					... this.state,
 					'menus': res.data.data
 				})
 			}
 		})
 		getHomeProducts(res=>{
 			console.log(res);
 			if(res.data)
 			{
 				this.setState({
 					... this.state,
 					'products': res.data.data
 				})
 			}
 		})
 	}

      render(){
        return (
   <div>
 <div id="layoutDefault">
            <div id="layoutDefault_content">
                <main>
                        <h1 className="sr-only" >Welcome to FAABZ Logistics </h1>
                        <p className="sr-only">Fastest and better delivery! We value your time</p>
                    <nav className="navbar navbar-marketing navbar-expand-lg bg-white navbar-light">
                        <div className="container">
                        <div className="col-sm-2">
                        <center>
                          <a className="" href="index.html">
                            <img src="/site/faabzlogo.png" className="img-head hidden-xs-down img_brand" alt="Logo"/>  
                        </a>    
                        </center>
                        </div>

                        <div className="col-sm-7">
                         <label className="sr-only" htmlFor="inputSearch">Search for products </label><input className="form-control form-control-solid rounded-pill" id="inputSearch" type="text" placeholder="Search for products"  />
                        </div>
                        <div className="col-sm-3">
                         <button className="btn btn-sm btn-login" href=""  ><i className="fas fa-user ml-1" ></i> Login</button>
                          <button className="btn btn-sm btn-login" href="#" ><i className="fas fa-shopping-cart ml-1"></i> Cart</button>
                        </div>
                    </div>
                    </nav>

                        <nav className="navbar navbar-marketing navbar-expand-lg bg-white navbar-light" id ="second-nav" style={{fontSize:'12px'}}>
                         <div className="container" >


                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i className="fas fa-bars ml-1"></i></button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div>
                                <ul className="navbar-nav ml-auto mr-lg-5">
                                    <li className="nav-item"><a className="nav-link" href="index.html">Home </a></li>
                                    {
                                    	this.state.menus.map((menu)=>{
                                    		return (<MenuItem menu={menu} key={menu.id}/>)
                                    	})
                                    }
                     				
                     				
                              
                                </ul>
	</div>
	                                
                            </div>
                               ..
                                     
                        </div>
                    </nav>

                         <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                          <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                          </ol>
                          <div className="carousel-inner">
                            <div className="carousel-item active">
                              <img className="d-block w-100" src="/site/images/ba2.jpg" alt="First slide" />
                            </div>
                            <div className="carousel-item">
                              <img className="d-block w-100" src="/site/images/ba2.jpg" alt="Second slide" />
                            </div>
                            <div className="carousel-item">
                              <img className="d-block w-100" src="/site/images/ba1.jpg" alt="Third slide" />
                            </div>
                          </div>
                          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                          </a>
                          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                          </a>
                        </div>
              
                    <section className="bg-white py-10">
                        <div className="container">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h2 className="mb-0">Featured Listings</h2>
                                <a className="btn btn-sm btn-primary d-inline-flex align-items-center" href="#!">See more<i className="ml-1" data-feather="arrow-right"></i></a>
                            </div>
                            <div className="row">
                            {
                            this.state.products.map((p)=>{
                             return <ProductItem product={p}/>

                            })
                            }
                           
                            </div>
                        </div>
                    </section>
                    <hr className="my-0" />
                    <section className="bg-white py-10">
                        <div className="container">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h2 className="mb-0">Newest Listings</h2>
                                <a className="btn btn-sm btn-primary d-inline-flex align-items-center" href="#!">See more<i className="ml-1" data-feather="arrow-right"></i></a>
                            </div>
                            <div className="row">
                       	<CategoryItem />
                            </div>
                        </div>
                        <div className="svg-border-rounded text-light">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none" fill="currentColor"><path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0" /></svg>
                        </div>
                    </section>

                    <hr className="my-0" />
                </main>
            </div>
            <div id="layoutDefault_footer">
                <footer className="footer pt-10 pb-5 mt-auto bg-white footer-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <img src="/site/faabzlogo.png" className="img-head hidden-xs-down" alt="" height="100px"/>  
                                <div className="footer-brand">FAABZ Nigeria</div>
                                <div className="mb-3"></div>
                                <div className="mb-3">Build better websites</div>
                                <div className="icon-list-social mb-5">
                                    <a className="icon-list-social-link" href="javascript:void(0);"><i className="fab fa-instagram"></i></a><a className="icon-list-social-link" href="javascript:void(0);"><i className="fab fa-facebook"></i></a><a className="icon-list-social-link" href="javascript:void(0);"><i className="fab fa-github"></i></a><a className="icon-list-social-link" href="javascript:void(0);"><i className="fab fa-twitter"></i></a>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                                        <div className="text-uppercase-expanded text-xs mb-4">CATEGORIES</div>
                                        <ul className="list-unstyled mb-0">
                                            <li className="mb-2"><a href="javascript:void(0);">Kitchen</a></li>
                                            <li className="mb-2"><a href="javascript:void(0);">Pages</a></li>
                                            <li className="mb-2"><a href="javascript:void(0);">Sections</a></li>
                                            <li className="mb-2"><a href="javascript:void(0);">Documentation</a></li>
                                            <li><a href="javascript:void(0);">Changelog</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                                        <div className="text-uppercase-expanded text-xs mb-4">CATEGORIES</div>
                                        <ul className="list-unstyled mb-0">
                                            
                                        </ul>
                                    </div>
                                    <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
                                        <div className="text-uppercase-expanded text-xs mb-4">PRODUCTS</div>
                                        <ul className="list-unstyled mb-0">
                                           
                                        </ul>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="text-uppercase-expanded text-xs mb-4">Legal</div>
                                        <ul className="list-unstyled mb-0">
                                            <li className="mb-2"><a href="javascript:void(0);">Privacy Policy</a></li>
                                            <li className="mb-2"><a href="javascript:void(0);">Terms and Conditions</a></li>
                                       
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-5" />
                        <div className="row align-items-center">
                            <div className="col-md-6 small">Copyright &#xA9; faabznigeria.com</div>
                            <div className="col-md-6 text-md-right small">
                                <a href="javascript:void(0);">Privacy Policy</a>
                                &#xB7;
                                <a href="javascript:void(0);">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
  </div>

          )
      }

    }



  