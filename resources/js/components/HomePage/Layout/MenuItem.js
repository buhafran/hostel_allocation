import React from 'react';
import {Link} from 'react-router-dom';

function MenuItem(props)
{
    const {menu}= props;

return (  <li className="nav-item dropdown dropdown-xl no-caret" >
            <a className="nav-link dropdown-toggle" id="navbarDropdownDemos" key={menu.id.toString() +"2"} href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{menu.CategoryName} <i key={menu.id.toString() +"222"} className="fas fa-chevron-right dropdown-arrow"></i></a>
            <div className="dropdown-menu dropdown-menu-right animated--fade-in-up mr-lg-n15" aria-labelledby="navbarDropdownDemos">
                <div className="row no-gutters">
                    <div  className="col-lg-2 p-lg-2 bg-img-cover overlay overlay-DAN overlay-50 d-none d-lg-block" id="divUrl">
                        <div  className="d-flex h-100 w-100 align-items-center justify-content-center">
                            <div className="text-white text-center z-1">
                               
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 p-lg-4" >
                        <div className="row" >
                            <div className="col-lg-6" >
                            </div>
                            <div className="col-lg-6" >
                                <h6 className="dropdown-header text-primary">List</h6>
                                {
                                    props.menu.children.map((m)=>{
                                    return ( <a className="dropdown-item" href={`/shop/category/${menu.slug}/${m.slug}`} key={m.id}>{m.CategoryName} (0)</a>)    
                                    })
                                }
                                
                                <div className="dropdown-divider border-0" ></div>
                              
                            </div>
                   
                          
                        </div>
                    </div>
                </div>
            </div>
        </li>)
}


export default MenuItem