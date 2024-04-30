import axios from 'axios'
import React, { Component } from 'react'
import { Formik } from 'formik';
import {getProduct,updateProduct,createProduct,getBrands,getCategories,getVendors,deletePicture,uploadProductImage,makePictureDefault} from '../Actions';
import { Redirect } from 'react-router-dom';
    class CreateProduct extends Component {
      constructor (props) {
        super(props);
        this.state = {
          brands:[],
          categories:[],
          vendors:[],
          formsubmitted:false,
        componentsLoaded:false
        }
      }

      makeDefault(id){
        let data= {picture_id:id};
        makePictureDefault(data, (res)=>{
          if(res.status)
          {
            swal('Success', res.message, 'info');
          }
        })
      }
loadProduct(){
    const id = this.props.match.params.id
   getProduct(id, (response)=>{
          console.log(response)
          this.setState({
            ...this.state,
            product:response.data,
            componentsLoaded:true,
            isLoading:false
          })
        })

}
      componentDidMount () {
       const id = this.props.match.params.id
       
       if(id && id!=='create')
       {
          this.loadProduct();
       }
       else
       {
        this.setState({
          ... this.state,
            product:{
              Name:'',
              ShortName:'',
              Description:'',
              BrandId :'',
              CategoryId :'',
              VendorId :'',
              LandingPrice :'',
              BulkPrice :'',
              UnitPrice :'',
              ShowItem :false,
              picture_url:'',

              pictures:[]
          },
          fileField:React.useRef<HTMLInputElement>(null),
          makeDefaultPicture:0,
          componentsLoaded:true,
          isLoading:false,
        });
       }


   
       getCategories(response=>{
        this.setState({
          ...this.state,
          categories:response.data.data
        })
       })
         getBrands(response=>{
        this.setState({
          ...this.state,
          brands:response.data.data
        })
       })

       getVendors(response=>{
        this.setState({
          ...this.state,
          vendors:response.data.data
        })
       })

      }
      deletePictureTrue(id){
        deletePicture(id, res=>{
           if(res)
           {
              swal("Success!", "Deleted Successfully", "success");
                this.setState({
          ...this.state,
          product:{...this.state.product,
                  pictures:this.state.product.pictures.filter(function(item){ return item.id!==id})
                  }
        })
   
          } 
 
        })
      }
      deletePict(id){
            swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this item",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
      .then((willDelete) => {
        if (willDelete) {
         this.deletePictureTrue(id)
        } else {
         // swal("Canceled Successfully");
        }
          });  
      }

      handleFileSelected(e) {
          const file=e.target.files[0];
          this.setState({
            ...this.state,
            isLoading:true
          })
          const id = this.props.match.params.id
          uploadProductImage(file,id, res=>{
            if(res.status)
            {
              swal('Success',res.message,'success')
              this.loadProduct()
            }
            else
            {
                let err= '';
                err = err + (res.errors.file ? res.errors.file[0]: '')
                err = err + (res.errors.product_id ? res.errors.product_id[0]: '')
              swal('Error',err,'error')
            }
          })
        }  
submitForm(values){

  var self= this;
  console.log(values);




  //return true;
}
      render () {
        const {formsubmitted } = this.state
       const parkId = this.props.match.params.id
        return (this.state.formsubmitted ? <Redirect to="/admin/products"/> :
          (this.state.componentsLoaded ?

          (
          <div>
                <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Create/Edit Product</h6>
                </div>
                <div className="card-body">
                     <div>

     <h1 className="h3 mb-12 text-gray-800">Product  Form</h1>

     <div className="row">

       <div className="col-lg-12">
     <Formik
       initialValues={this.state.product}
       validate={values => {
         const errors = {};
          if (!values.Name) {
           errors.Name = 'Required';
         } 
         if (!values.LandingPrice) {
           errors.LandingPrice = 'Required';
         } 
          if (!values.UnitPrice  ) {
           errors.UnitPrice  = 'Required';
         } 
         //    if (!values.ShowItem) {
         //   errors.ShowItem = 'Required';
         // } 
           if (!values.VendorId) {
           errors.VendorId = 'Required';
         } 
        
         return errors;
       }}
    
       onSubmit={(values, { setSubmitting,setErrors,resetForm }) => {
        

            const id = this.props.match.params.id
             if(id && id!=='create')
             {
                updateProduct(id,values, (response)=>{
                 if(response)
                      { 
                        if(response.errors)
                        {
                            setErrors(response.errors)
                        }
                        else
                        {     
                           swal("Success!", "Updated Successfully", "success");
                            this.setState({
                              ...this.state,
                              formsubmitted: true
                            })
                          }
                        }
                })
             }
              else
              {

                  createProduct(values, (response)=> {

                      if(response)
                      { 
                        if(response.errors)
                        {
                            setErrors(response.errors)
                        }
                        else
                        {     
                           swal("Success!", "Created Successfully", "success");
                            this.setState({
                              ...this.state,
                              formsubmitted: true
                            })
                          }
                        }
                  //  console.log(response)
                  })
             }


       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
         <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
              <label htmlFor="Name">Product Title</label>
             <input
               type="text"
               name="Name"
               onChange={handleChange}
               onBlur={handleBlur}
               value={values.Name }
               className="form-control"
          
             />
             <span className='text-danger'>{errors.Name && touched.Name && errors.Name}</span>
             </div>
             <div className="form-group">
              <label htmlFor="Name">Short Name</label>
             <input
               type="text"
               name="ShortName"
               onChange={handleChange}
               onBlur={handleBlur}
               value={values.ShortName }
               className="form-control"
          
             />
             <span className='text-danger'>{errors.ShortName && touched.ShortName && errors.ShortName}</span>
             </div>
              <div className="form-group">
              <label htmlFor="Description">Description</label>
             <input
               type="text"
               name="Description"
               onChange={handleChange}
               onBlur={handleBlur}
               value={values.Description }
               className="form-control"
          
             />
             <span className='text-danger'>{errors.Description && touched.Description && errors.Description}</span>
             </div>
            <div className="form-group">
              <label htmlFor="LandingPrice">Landing Price</label>
             <input
              type="number"
             step=".01"
               name="LandingPrice"
               onChange={handleChange}
               onBlur={handleBlur}
               value={values.LandingPrice }
               className="form-control"
          
             />
             <span className='text-danger'>{errors.LandingPrice && touched.LandingPrice && errors.LandingPrice}</span>
             </div>
          <div className="form-group">
            <label htmlFor="UnitPrice">Sale Unit Price</label>
           <input
             type="number"
             step=".01"
             name="UnitPrice"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.UnitPrice }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.UnitPrice && touched.UnitPrice && errors.UnitPrice}</span>
           </div>
               <div className="form-group">
            <label htmlFor="BulkPrice">Sale Bulk Price</label>
           <input
            type="number"
             step=".01"
             name="BulkPrice"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.BulkPrice }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.BulkPrice && touched.BulkPrice && errors.BulkPrice}</span>
           </div>
           </div>
         
           <div className="col-sm-6">
               <div className="form-group">
               <label htmlFor="ShowItem">ShowItem</label>
                     <select
                        type=""
                        name="ShowItem"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.ShowItem ||'' }
                        className="form-control"
                        >
                        <option value="">Select </option>
                        <option value="1">Yes </option>
                        <option value="0">No </option>
                     
                        </select>
           <span className='text-danger'>{errors.ShowItem && touched.ShowItem && errors.ShowItem}</span>
           </div>
           <div className="form-group">
               <label htmlFor="DriverId">Brand</label>
                     <select
                        type=""
                        name="BrandId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.BrandId ||'' }
                        className="form-control"
                        >
                        <option value="">Select </option>
                        {this.state.brands.map((role,index)=>{
                        return (<option key={index} value={role.id}>{role.BrandName} </option>)
                        })}>
                        </select>
           <span className='text-danger'>{errors.BrandId && touched.BrandId && errors.BrandId}</span>
           </div>
            <div className="form-group">
               <label htmlFor="CategoryId">Product Category</label>
                     <select
                        type=""
                        name="CategoryId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.CategoryId ||'' }
                        className="form-control"
                        >
                        <option value="">Select </option>
                        {this.state.categories.map((role,index)=>{
                          if(role.parent)
                          {
                            
                        return  (<option key={index} value={role.id}>{role.CategoryName} / {role.parent.CategoryName}</option>)
                          }
                        })}>
                        </select>
           <span className='text-danger'>{errors.CategoryId && touched.CategoryId && errors.CategoryId}</span>
           </div>
            <div className="form-group">
               <label htmlFor="VendorId ">Product Vendor</label>
                     <select
                        type=""
                        name="VendorId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.VendorId   ||'' }
                        className="form-control"
                        >
                        <option value="">Select </option>
                        {this.state.vendors.map((role,index)=>{
                        return (<option key={index} value={role.id}>{role.Name}</option>)
                        })}>
                        </select>
           <span className='text-danger'>{errors.VendorId  && touched.VendorId  && errors.VendorId  }</span>
           </div>
                <div className="form-group">
               <label htmlFor="is_promo">Promo</label>
                     <select
                        type=""
                        name="is_promo"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.is_promo ||'' }
                        className="form-control"
                        >
                        <option value="">Select </option>
                        <option value="1">Yes </option>
                        <option value="0">No </option>
                     
                        </select>
           <span className='text-danger'>{errors.is_promo && touched.is_promo && errors.is_promo}</span>
           </div>
                <div className="form-group">
               <label htmlFor="is_hotsale">Hot Sale</label>
                     <select
                        type=""
                        name="is_hotsale"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.is_hotsale ||'' }
                        className="form-control"
                        >
                        <option value="">Select </option>
                        <option value="1">Yes </option>
                        <option value="0">No </option>
                     
                        </select>
           <span className='text-danger'>{errors.is_hotsale && touched.is_hotsale && errors.is_hotsale}</span>
           </div>
   
          <div className="col-sm-6">
           <button type="submit" className='btn btn-primary' disabled={isSubmitting}>
             Save
           </button>
          </div>
          </div>
           </div>
         </form>
       ) }
     </Formik>

<div>
<ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item">
    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Pictures</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"></a>
  </li>
  <li className="nav-item">
    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false"></a>
  </li>
</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

   <h1 className="h3 mb-12 text-gray-800">Product  Pictures</h1>

    
    
   { this.state.isLoading? <div className="spinner-border text-danger" role="status">
                                <span className="sr-only">Loading...</span>
                           </div>
                        :

                       <span> Upload Picture <br /><input type="file" onChange={(e)=>this.handleFileSelected(e)} accept=".png,.jpeg,.jpeg,.gif" ref={this.state.fileField} className="btn btn-xs btn-primary" disabled={this.state.isLoading}/></span> }
      <table className="table">
        <thead>
          <tr>
            <th>SN </th>
            <th>Url </th>
            <th></th>
            <th>Make Default</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {this.state.product.pictures.map((pic,index)=>{
          return (<tr><td>{index+1}</td>
           <td><a href={pic.PictureUrl}>View</a></td> <td><img src={pic.PictureUrl} height={50}/> 
           </td>
         <td> <button onClick={()=>this.makeDefault(pic.id)} class="btn btn-green btn-icon" type="button" title="Make Product default picture" disabled={pic.PictureUrl==this.state.product.picture_url}> <i class="far fa-check-circle"></i></button></td>
           <td>
            <button onClick={()=>this.deletePict(pic.id)} class="btn btn-danger btn-icon" type="button"> 
          <i className="fas fa-trash"></i>
          </button>
          </td></tr>)
        })}
        </tbody>
        <tfoot>
                <th>SN </th>
            <th>Url </th>
            <th></th>
            <th>Make Default</th>
            <th>Delete</th>
        </tfoot>
      </table>
  </div>
  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
  <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
</div>
          
      </div>



   </div>
   </div>
   </div>
                </div>
              </div>

          
         </div>
        ): '')
)
      }
    }

    export default CreateProduct