import axios from 'axios'
import React, { Component } from 'react'
import { Formik } from 'formik';
import {getProduct,updateProduct,createProduct,getBrands,getCategories,getVendors,deletePicture,uploadProductImage,makePictureDefault} from '../Actions';
import { Redirect } from 'react-router-dom';
    class CreateRefund extends Component {
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
                  <h6 className="m-0 font-weight-bold text-primary">Create Product</h6>
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
            <label htmlFor="refund_amount">Refund Amount</label>
           <input
             type="number"
             step=".01"
             name="refund_amount"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.refund_amount }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.refund_amount && touched.refund_amount && errors.refund_amount}</span>
           </div>
            <div className="form-group">
            <label htmlFor="refund_amount">Reason</label>
           <input
             type="text"
             name="refund_amount"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.reason }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.reason && touched.reason && errors.reason}</span>
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
            <th>Default</th>
            <th>Url </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {this.state.product.pictures.map((pic,index)=>{
          return (<tr><td>{index+1}</td>
         <td> <button onClick={()=>this.makeDefault(pic.id)} class="btn btn-info btn-icon" type="button" title="Make default picture" disabled={pic.PictureUrl==this.state.product.picture_url}>   <i className="fas fa-tick"></i></button></td>
           <td><a href={pic.PictureUrl}>{pic.PictureUrl}</a></td> <td><img src={pic.PictureUrl} height={50}/> 
            <button onClick={()=>this.deletePict(pic.id)} class="btn btn-red btn-icon" type="button"> 
          <i className="fas fa-trash"></i>
          </button>
          </td></tr>)
        })}
        </tbody>
        <tfoot>
        <th>SN </th>
        <th>Default</th>
        <th>Url</th>
        <th>Action</th>
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

    export default CreateRefund