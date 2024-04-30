import axios from 'axios'
import React, { Component } from 'react'
import { Formik } from 'formik';
import {getCategory,updateCategory,createCategory,getCategories,uploadCategoryImage} from '../Actions';
import { Redirect } from 'react-router-dom';
    class CreateCategory extends Component {
      constructor (props) {
        super(props)
        this.state = {
          categories:[],
          formsubmitted:false,
        componentsLoaded:false,
        isLoading:false,
        fileField:React.useRef<HTMLInputElement>(null),
        picture_url:''
        }
      }



      handleFileSelected(e) {
          const file=e.target.files[0];
          this.setState({
            ...this.state,
            isLoading:true
          })
        const id = this.props.match.params.id || 0
          uploadCategoryImage(id, file,res=>{
            if(res.status)
            {
              swal('Success',res.message,'success')
              this.setState({
                ...this.state,
                picture_url:res.url,
                isLoading:false
              })
            }
            else
            {
                let err= '';
                err = err + (res.errors.file ? res.errors.file[0]: '')

              swal('Error',err,'error')
              this.setState({
                ... this.state,
                isLoading:false
              })
            }
          })
        }  

      componentDidMount () {
       const id = this.props.match.params.id
       
       if(id && id!=='create')
       {
        getCategory(id, (response)=>{
          console.log(response)
          this.setState({
            ...this.state,
            category:response.data,
            componentsLoaded:true
          })
        })

       }
       else
       {
        this.setState({
          ... this.state,
            category:{
              CategoryName:'',
              ParentId:'',
              picture_url:'',
              slug:'',
          },
          componentsLoaded:true
        })
       }

       getCategories(response=>{
        this.setState({
          ...this.state,
          categories:response.data.data
        })
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
        return (this.state.formsubmitted ? <Redirect to="/admin/product/categories"/> :
          (this.state.componentsLoaded ?

          (
          <div>
                <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Create New Category</h6>
                </div>
                <div className="card-body">
                     <div>

     <h1 className="h3 mb-12 text-gray-800">Product Category Form</h1>

     <div className="row">

       <div className="col-lg-12">
     <Formik
       initialValues={this.state.category}
       validate={values => {
         const errors = {};
         if (!values.CategoryName) {
           errors.CategoryName = 'Required';
         } 
        
         return errors;
       }}
    
       onSubmit={(values, { setSubmitting,setErrors,resetForm }) => {
        

            const id = this.props.match.params.id
             if(id && id!=='create')
             {

                values= {... values,picture_url:this.state.picture_url || values.picture_url}
              //  console.log(values)
                updateCategory(id,values, (response)=>{
//console.log(response)
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
                  values= {... values,picture_url:this.state.picture_url|| values.picture_url}
                  // console.log("LIST ")
                  // console.log(values)
                  createCategory(values, (response)=> {

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
            <div className="form-group">
            <label htmlFor="CategoryName">Category Name</label>
           <input
             type="text"
             name="CategoryName"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.CategoryName }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.CategoryName && touched.CategoryName && errors.CategoryName}</span>
           </div>
           <div className="form-group">
               <label htmlFor="ParentId">Parent Category</label>
                     <select
                        type=""
                        name="ParentId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.ParentId? values.ParentId: '' }
                        className="form-control"
                        >
                        <option value="0">Select </option>
                        {this.state.categories.map((role,index)=>{
                          if(!role.parent)
                          {

                          return (<option key={index} value={role.id}>{role.CategoryName}/{role.parent? role.parent.CategoryName:''} </option>)
                          }
                        })}>
                        </select>
           <span className='text-danger'>{errors.ParentId && touched.ParentId && errors.ParentId}</span>
           </div>
            <div className="form-group">
            <label htmlFor="slug">Slug</label>
           <input
             type="text"
             name="slug"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.slug }
             className="form-control"
        
           />
           <span className='text-danger'>{errors.CategoryName && touched.CategoryName && errors.CategoryName}</span>
           </div>
           <div className="form-group">
            { this.state.isLoading?  (<div className="spinner-border text-danger" role="status">
                                <span className="sr-only">Loading...</span>
                           </div>) 
                        :

                       <span> Upload Picture <br /> <input type="file" onChange={(e)=>this.handleFileSelected(e)} accept=".png,.jpeg,.jpeg,.gif" dref={this.state.fileField} className="btn btn-primary btn-xs" disabled={this.state.isLoading}/></span> }

           
           </div>
           <img src={this.state.picture_url || values.picture_url}/> <br/>

           
          
            
           <div className="form-group">
           <br />
           <button type="submit" className='btn btn-primary' disabled={isSubmitting}>
             Save
           </button>
           </div>
         </form>
       ) }
     </Formik>
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

    export default CreateCategory