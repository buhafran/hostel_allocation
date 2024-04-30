
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Link } from 'react-router-dom'
import Layout from './Layout';
import CategoryItem from './SingleProduct/CategoryItem';
import ProductItem from './SingleProduct/ProductItem';
import {getHomeProductMenu,getHomeProducts,getHomeProductsByCategory,getHomeProductsSearch} from '../Actions';
import Cookies from 'js-cookie'
 export default  class Home extends Component{

constructor(){
	super()
    this.state={
        menus:[],
        products:[],
        brands:[],
        cart:[],
        q:''
    }
}

 addToCart(product){
  //alert(product);
     var cook= Cookies.get('cart');
  //console.log(cook)
     if(cook!==undefined)
     {
       var items= JSON.parse(cook)
       items[items.length-1]=product
        console.log(items);
       Cookies.remove('cart');
       // Cookies.set('cart', JSON.stringify(items));
     }  
     else
     {
       var  items= [];
       items[0]= product;
      console.log(product);
       Cookies.set('cart', JSON.stringify(product));
     }
     this.setState({
      ... this.state,
      cart:items
     })


 	}
 	componentDidMount(){
          try{
            var cook= Cookies.get('cart');
           // console.log(cook)
            if(cook)
            {
                this.setState({
                ... this.state,
                    cart:JSON.parse(cook)
                })

            }
        }catch(error)
        {
            console.log(error)
        }

    const child=this.props.match.params.child;
    const parent=this.props.match.params.parent;
    const query=new URLSearchParams(this.props.location.search);
  if(query.get('q'))
  {
      getHomeProductsSearch(query.get('q'), res=>{
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
  else if(child)
    {
      const url= child;
           getHomeProductsByCategory(url, res=>{
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
    else if(parent)
    {
      const url= parent + "/" + child ;
      getHomeProductsByCategory(url, res=>{
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
    else
    {


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
 	}



      render(){
        return (
   <Layout cartCount={this.state.cart.length} q={this.state.q} location={this.props.location}>
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
                            (this.state.products.length>0)?
                            this.state.products.map((p)=>{return <ProductItem product={p} addToCart={this.addToCart} key={p.id}/>})
                            :
                            <h1>Products Not found</h1>
                          }
                            </div>
                        </div>
                    </section>
                    <hr className="my-0" />
                    <section className="bg-white py-10">
                        <div className="container">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h2 className="mb-0">Popular Products</h2>
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


   </Layout>


          )
      }

    }



  