import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { toggleRecipesOrForm } from '../scripts';

class RecipeForm extends Component {
  renderField = ({ input, label, meta: { touched, error } }) => {
    return (
      <div className={`field ${touched && error ? 'error' : ''}`}>
        <label>{label}</label>
        <br />
        <input {...input} autoComplete='off' />
        {touched && error && (
          <span className='ui pointing red basic label'>{error}</span>
        )}
        <br /><br />
      </div>
    );
  };
  renderTextField = ({ input, label, meta: { touched, error } }) => {
    return (
      <div className={`field ${touched && error ? 'error' : ''}`}>
        <label>{label}</label>
        <br />
        <textarea {...input} autoComplete='off' />
        {touched && error && (
          <span className='ui pointing red basic label'>{error}</span>
        )}
        <br /><br />
      </div>
    );
  };
  renderPictureField = ({ input, label, meta: { touched, error } }) => {
    return (
      <div className={`field ${touched && error ? 'error' : ''}`}>
          <label>{label}<br /></label>
          <br />
          <input type='file' onChange={this.handleImageChange} autoComplete='off' accept="image/*"/>
      </div>
    )
  };
  picture = null
  handleImageChange = (e) => {
    this.picture = e.target.files[0]
  };
  previewPicture() {
    if (this.props.initialValues) {
      let background = `url(${this.props.initialValues.picture})`
      if (this.props.initialValues.picture) {
        return {
          width: '200px',
          height: '200px',
          backgroundImage: background,
          backgroundSize: 'cover',
          marginBottom: '20px',
        }
      } else {
        return {}
      }
    }
  }

  btnAddOrEdit(btnText) {
    if (btnText === 'Update') {
      return(
        <button className='ui primary button' >{btnText}</button>
      )
    } else if (btnText === 'Add') {
      return (
        <button className='ui primary button' onClick={toggleRecipesOrForm}>{btnText}</button>
      )
    }
  }

  onSubmit = formValues => {
    // this.props.onSubmit(formValues);
    let formData = new FormData();


    formData.append('title', formValues.title)
    formData.append('cooktime', formValues.cooktime)
    formData.append('ingredients', formValues.ingredients)
    formData.append('directions', formValues.directions)
    if (this.picture !== null) {
      formData.append('picture', this.picture)
    }
    this.props.onSubmit(formData)
  };
  
  render() {
    const btnText = `${this.props.initialValues ? 'Update' : 'Add'}`;
    return (
        <div className='ui segment' style={{ backgroundColor: '#FFCBB1', borderRadius: '0' }}>
            <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className='ui form error'
            >
            <Field name='title' component={this.renderField} label='Title' />
            <Field name='cooktime' component={this.renderTextField} label='Cooking Time' />
            <Field name='ingredients' component={this.renderTextField} label='Ingredients' />
            <Field name='directions' component={this.renderTextField} label='Directions' />
            <Field name='picture' component={this.renderPictureField} label='Picture' />
            
            
            <div id="recipeform-current-picture" style={this.previewPicture()}></div>
            {this.btnAddOrEdit(btnText)}
            </form>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
RecipeForm = connect(mapStateToProps)(RecipeForm);

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'Please enter at least 1 character';
  }
  return errors;
};

export default reduxForm({
  form: 'recipeForm',
  touchOnBlur: false,
  validate
})(RecipeForm);