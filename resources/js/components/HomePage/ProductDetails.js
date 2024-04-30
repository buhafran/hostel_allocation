
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Link } from 'react-router-dom'
import Layout from './Layout';
import CategoryItem from './SingleProduct/CategoryItem';
import ProductItem from './SingleProduct/ProductItem';
import {getHomeProducts} from '../Actions';

 export default  class Home extends Component{

constructor(){
	super()
    this.state={
      
        product:{}
    }
}

 addToCart(){

 	}
 	componentDidMount(){
 	  getHomeProducts(res=>{
            console.log(res);
            if(res.data)
            {
                this.setState({
                    ... this.state,
                    'product': res.data
                })
            }
        })
 	}

      render(){
        return (
   <Layout>

          <div class="container">

          <div class="col-md-6 mb-5">
                                    <a class="card card-portfolio h-100" href="#!"
                                        ><img class="card-img-top" src="https://source.unsplash.com/-FVaZbu6ZAE/900x600" alt="..." />
                                        <div class="card-body"><div class="card-title">Book</div></div></a>
                                </div>
    
          <div class="col-sm-6"></div>

          </div>            

   </Layout>


          )
      }

    }



  