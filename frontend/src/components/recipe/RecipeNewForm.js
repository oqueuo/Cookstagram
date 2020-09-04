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

  state = {
    picture: null,
  }
  renderImageField = ({ input, label, meta: { touched, error } }) => {
    return (
      <div className={`field ${touched && error ? 'error' : ''}`}>
          <label>{label}<br /></label>
          <br />
          <input type='file' onChange={this.handleImageChange} autoComplete='off' accept="image/*"/>
          <br /><br />
      </div>
    )
  };

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
  picture = null
  handleImageChange = (e) => {
    this.picture = e.target.files[0]
  };
  
  onSubmit = formValues => {
    // this.props.onSubmit(formValues);
    let formData = new FormData();
    console.log(this.picture)
    formData.append('title', formValues.title)
    formData.append('cooktime', formValues.cooktime)
    formData.append('ingredients', formValues.ingredients)
    formData.append('directions', formValues.directions)
    formData.append('picture', this.picture)
    this.props.onSubmit(formData)
  };
  
  render() {
    const btnText = `${this.props.initialValues ? 'Update' : 'Add'}`;
    return (
        <div className='ui segment' style={{ backgroundColor: 'rgb(230, 220, 200)', borderRadius: '0' }}>
            <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className='ui form error'
            >
            <Field name='title' component={this.renderField} label='Title' />
            <Field name='cooktime' component={this.renderTextField} label='Cooking Time' />
            <Field name='ingredients' component={this.renderTextField} label='Ingredients' />
            <Field name='directions' component={this.renderTextField} label='Directions' />
            <Field name='picture' component={this.renderImageField} label='Picture' />
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