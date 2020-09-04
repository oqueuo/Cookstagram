import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Modal from '../layout/Modal';
import history from '../../history';
import { getRecipe, deleteRecipe } from '../../actions/recipes';
import { loadUser } from '../../actions/auth';

class RecipeDelete extends Component {
  componentDidMount() {
    this.props.getRecipe(this.props.match.params.id);
  }

  render() {
    if (typeof this.props.auth.isAuthenticated != undefined) {
      if (this.props.auth.isAuthenticated === false) {
        return <Redirect to='/login' />;
      }
    }
    if (this.props.auth.user) {
      if (this.props.auth.user.id === this.props.recipe.author) {
        return (
          <Modal
            title='Delete Recipe'
            content={this.renderContent()}
            actions={this.renderActions()}
            onDismiss={() => history.push('/')}
          />
        );
      } else {
        return (<h1 style={{gridArea: 'profile', width: '80%', marginLeft: 'auto', marginRight: 'auto', color: '#6A6876'}}>This is not your recipe!!!!!!!!!!!!!!!!!!!!!!!!!</h1>)
      }
    } else {
      return (<h1 style={{gridArea: 'profile', width: '80%', marginLeft: 'auto', marginRight: 'auto', color: '#6A6876'}}>Loading</h1>)
    }
  }

  renderContent() {
    if (!this.props.recipe) {
      return 'Are you sure you want to delete this recipe?';
    }
    return `Are you sure you want to delete the recipe: ${this.props.recipe.title}?`;
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <button
          onClick={() => this.props.deleteRecipe(id)}
          className='ui negative button'
          style={{color: 'rgb(253, 244, 222)'}}>
          Delete
        </button>
        <Link to='/' className='ui button'>
          Cancel
        </Link>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  { getRecipe, deleteRecipe, loadUser }
)(RecipeDelete);