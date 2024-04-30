import React from 'react'; 


function ProductItem(props){
const {product}= props
return (<div className="col-lg-3 mb-5 mb-lg-0" style={{margin:'5px'}}>
                                    <a className="card lift h-100" href="#!"
                                        ><div className="card-flag card-flag-red card-flag-top-right">Listed 1 month</div>
                                        <img className="card-img-top" src={`${product.picture_url}`} alt="..."/>
                                        <div className="card-body">
                                            <div className="small text-gray-800 font-weight-400">{product.ShortName}</div>
                                            <h3 className="text-primary mb-0">NGN{product.UnitPrice}</h3>
                                            <div className="small text-gray-500">Picsard, GA</div>
                                        </div>
                                        <div className="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
                                            <center> <button className="btn btn-info" onClick={()=>props.addToCart(product)}>ADD TO CART</button></center>
                                         </div>
                                    </a>
                                </div>)


}
 
 export default ProductItem;