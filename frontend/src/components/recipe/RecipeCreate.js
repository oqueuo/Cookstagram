import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createRecipe, getUserRecipes } from '../../actions/recipes';
import RecipeForm from './RecipeForm';

class RecipeCreate extends Component {
  onSubmit = formValues => {
    this.props.createRecipe(formValues);
    this.setState({user_recipes: this.props.getUserRecipes()});
  };

  render() {
    return (
      <div>
        <RecipeForm destroyOnUnmount={false} onSubmit={this.onSubmit} />
      </div>
    );
  }
}


export default connect(
  null,
  { createRecipe, getUserRecipes }
)(RecipeCreate);