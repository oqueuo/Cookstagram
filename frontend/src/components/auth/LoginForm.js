import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login, guestLogin } from '../../actions/auth';

class LoginForm extends Component {
  renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div className={`field ${touched && error ? 'error' : ''}`}>
        <label style={{color: '#52505c', fontSize: '16px'}}>{label}</label>
        <br />
        <input {...input} type={type} />
        {touched && error && (
          <span className='ui pointing red basic label'>{error}</span>
        )}
        <br /><br />
      </div>
    );
  };

  hiddenField = ({ type, meta: { error } }) => {
    return (
      <div className='field'>
        <input type={type} />
        {error && <div className='ui red message'>{error}</div>}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.login(formValues);
  };

  guestLogin() {
    this.props.guestLogin();
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }
    return (
      <div id="loginform" className='ui container'>
        <div className='ui segment' style={{backgroundColor: '#dee7fd'}}>
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className='ui form'
          >
            <Field
              name='username'
              type='text'
              component={this.renderField}
              label='Username'
            />
            <Field
              name='password'
              type='password'
              component={this.renderField}
              label='Password'
            />
            <Field
              name='non_field_errors'
              type='hidden'
              component={this.hiddenField}
            />
            <button className='ui primary button' style={{backgroundColor: '#6893ff', color: 'rgb(253, 244, 222)'}}>Login</button>
            <div className='ui primary button' onClick={() => this.guestLogin()} style={{backgroundColor: '#9d68ff' }}>Try it out!</div>
          </form>
          <p style={{ marginTop: '1rem' }}>
            Don't have an account? <Link to='/register'>Register</Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

LoginForm = connect(
  mapStateToProps,
  { login, guestLogin }
)(LoginForm);

export default reduxForm({
  form: 'loginForm'
})(LoginForm);