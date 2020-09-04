import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getRecipe, editRecipe, getUserRecipes } from '../../actions/recipes';
import { loadUser } from '../../actions/auth';
import RecipeForm from './RecipeForm';

class RecipeEdit extends Component {
  componentDidMount() {
    this.props.getRecipe(this.props.match.params.id);
  }

  render() {
    if (typeof this.props.auth.isAuthenticated != undefined) {
      if (this.props.auth.isAuthenticated === false) {
        return <Redirect to='/login' />;
      }
    }
    let recipe
    let title = ': '
    if (this.props.recipe) {
      title = title + this.props.recipe.title
      recipe = this.props.recipe
    }
    if (this.props.auth.user) {
      if (this.props.auth.user.id === recipe.author) {
        return (
          <div className='ui container' style={{width: '80%'}}>
            <h2 style={{ marginTop: '2rem', color: '#6A6876' }}>Edit Recipe{title}</h2>
            <RecipeForm
              // initialValues={_.pick(this.props.recipe, 'recipe')}
              initialValues={recipe}
              enableReinitialize={true}
              onSubmit={this.onSubmit}
            />
          </div>
        );
      } else {
        return (<h1 style={{gridArea: 'profile', width: '80%', marginLeft: 'auto', marginRight: 'auto', color: '#6A6876'}}>This is not your recipe!!!!!!!!!!!!!!!!!</h1>)
      }
    } else {
      return (<h1 style={{gridArea: 'profile', width: '80%', marginLeft: 'auto', marginRight: 'auto', color: '#6A6876'}}>Loading</h1>)
    }
  }

  onSubmit = formValues => {
    this.props.editRecipe(this.props.match.params.id, formValues);
    this.setState({user_recipes: this.props.getUserRecipes()});
    this.forceUpdate()
  };
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  { getRecipe, editRecipe, getUserRecipes, loadUser }
)(RecipeEdit);