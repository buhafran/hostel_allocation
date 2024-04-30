import React from 'react'; 


function CategoryItem(props){

return (         <div className="col-lg-4">
                <a className="card lift h-100" href="#!"
                    ><div className="card-flag card-flag-dark card-flag-top-right">Listed 1 week</div>
                    <img className="card-img-top" src="https://source.unsplash.com/XbwHrt87mQ0/800x500" alt="..."/>
                    <div className="card-body">
                        <h3 className="text-primary mb-0">NGN 10000</h3>
                        <div className="small text-gray-800 font-weight-500">Product Name</div>
                        <div className="small text-gray-500">jdjdjd</div>
                    </div>
                    <div className="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
                        <div className="small text-gray-500">View listing</div>
                        <div className="small text-gray-500"><i data-feather="arrow-right"></i></div></div>
                    </a>
            </div>)


}
 
 export default CategoryItem;