
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Link } from 'react-router-dom'
import ProductItem from './SingleProduct/ProductItem';
import MenuItem from './Layout/MenuItem';
import '../Styles/Landing.css';
import '../Styles/Home.css';
import Cookies from 'js-cookie'

import {getHomeProductMenu,getHomeProducts} from '../Actions';
    //import { BrowserRouter, Route, Switch } from 'react-router-dom'

 export default  class Layout extends Component{

constructor(props){
	super()
	this.state={
		menus:[],
		products:[],
		brands:[],
        cart:[],
        q:''
	}
     this.handleChange = this.handleChange.bind(this);
}
 handleChange(event) {
/// alert(this.state.q)
   this.setState({
    ...this.state,
    q:event.target.value
   })
    //this.props.q="5544"
    this.props.handleSearch(event.target.value);
  }
 	addToCart(){

 	}
 	componentDidMount(){


            const query=new URLSearchParams(this.props.location.search);
            if(query.get('q'))
            {
                this.setState({
                    ...this.state,
                    q:query.get('q')
                })
            }
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
                         <label className="sr-only" htmlFor="inputSearch">Search for products </label><form><input name="q" value={this.state.q} className="form-control form-control-solid rounded-pill" id="inputSearch" type="text" placeholder="Search for products" onChange={this.handleChange} /></form>
                        </div>
                        <div className="col-sm-3">
                         <button className="btn btn-sm btn-login" href=""  ><i className="fas fa-user ml-1" ></i> Login</button>
                          <button className="btn btn-sm btn-login" href="#" ><i className="fas fa-shopping-cart ml-1 fa-2x"></i> <span className="badge badge-pill badge-danger  my-cart-badge">{this.props.cartCount}</span></button>
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

                           {this.props.children}
                      
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



  