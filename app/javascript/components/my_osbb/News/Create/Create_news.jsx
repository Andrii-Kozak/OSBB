import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import CKEditor from "react-ckeditor-component";
import NewsForm from '../NewsForm';


class CreateNews extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values, long_description, image) {
    const formData = new FormData();
    for ( var key in values ) {
      formData.append(key, values[key]);
    }
    formData.append('long_description',long_description)
    if (image) formData.append('image',image) ;
    const url = "/api/v1/news";

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token
      },
      body: formData
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => window.location.href = `../news/${response.id}`)
      .catch(error => console.log(error.message))
  }

   render() {
   return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-lg-12 text-center">
          <h1 className="mt-5">Add Post</h1>
        </div>
        </div>
      <NewsForm onSubmit = {this.onSubmit} post = {{title: "", short_description: "", long_description: "", is_visible: ""}}/>
    </div>
    )
  }
}

export default CreateNews
