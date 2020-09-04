import React, { Component } from 'react';
import { addFavorite, removeFavorite } from '../../actions/recipes';
import { loadUser } from '../../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * Components:
 * AllRecipes
 * UserRecipes
 * FriendsRecipes
 * FavoriteRecipes
 */

class RecipeList extends Component {
  render() {
    return (
      <>
        {this.pickRecipecardTemplate()}
      </>
    );
  }

  pickRecipecardTemplate() {
    if (this.props.component === "Profile") {
      return this.renderUserRecipes()
    } else if (this.props.component === "OtherProfile") {
      return this.renderOtherUserRecipes()
    } else if (this.props.component === "Feed") {
      return this.renderFeedRecipes()
    }
  }

  //// RECIPECARD TEMPLATES: Current Profile, Others' Profiles, Feed
  // 1. Current Profile
  renderUserRecipes() {
    if (this.props.recipes) {
      let recipe_list = this.props.recipes
      return recipe_list.map((recipe) => {
        return (
          <div className="recipecard" key={recipe.id}>

            <div className="recipecard-content" style={ this.getRecipePicture(recipe) }>

              <div className="recipe-title-container">
                <Link to={{pathname: `/recipe/${recipe.id}`, component: 'Profile'}}>
                  <div className="recipe-title">
                    <h1>{recipe.title}</h1>
                  </div>
                </Link>
                <Link to={`/edit/${recipe.id}`}>
                  <i className="fas fa-edit edit_btn"></i>
                </Link>
                <Link to={`/delete/${recipe.id}`}>
                  <i className="fas fa-trash delete_btn"></i>
                </Link>
              </div>

              {/* <Link to={{pathname: `/recipe/${recipe.id}`, component: 'Profile'}}> */}
                <p className="recipe-author">
                  <Link style={{textDecoration: 'underline', color: 'rgb(230, 220, 200)'}} to={'/'}>
                    {recipe.username}
                  </Link>
                </p>
              {/* </Link> */}

              <Link to={{pathname: `/recipe/${recipe.id}`, component: 'Profile'}}>
                <h2 className="recipe-cooktime">{recipe.cooktime}</h2>
              </Link>
            </div>

          </div>
        )
      })
    }
  }
  // 2. Others' Profiles
  renderOtherUserRecipes() {
    if (this.props.recipes) {
      let recipe_list = this.props.recipes
      return recipe_list.map((recipe) => {
        return (
          <div className="recipecard" key={recipe.id}>

            <div className="recipecard-content" style={ this.getRecipePicture(recipe) }>

              <div className="recipe-title-container">
                <Link to={{pathname: `/recipe/${recipe.id}`, component: 'OtherProfile'}}>
                  <div className="recipe-title">
                    <h1>{recipe.title}</h1>
                  </div>
                </Link>
                {this.renderAddOrRemoveFavorite(recipe)}
              </div>

              {/* <Link to={{pathname: `/recipe/${recipe.id}`, component: 'OtherProfile'}}> */}
                <p className="recipe-author">
                  <Link style={{textDecoration: 'underline', color: 'rgb(230, 220, 200)'}} to={`/profile/${recipe.author}`}>
                    {recipe.username}
                  </Link>
                </p>
              {/* </Link> */}

              <Link to={{pathname: `/recipe/${recipe.id}`, component: 'OtherProfile'}}>
                <h2 className="recipe-cooktime">{recipe.cooktime}</h2>
              </Link>
            </div>

          </div>
        )
      })
    }
  }
  
  // 3. Feed
  renderFeedRecipes() {
    let recipe_list = this.props.recipes
    return recipe_list.map((recipe) => {
      return (
        <div className="recipecard" key={recipe.id}>

          <div className="recipecard-content" style={ this.getRecipePicture(recipe) }>

            <div className="recipe-title-container">
              <Link to={{pathname: `/recipe/${recipe.id}`, component: 'Feed'}}>
                <div className="recipe-title">
                  <h1>{recipe.title}</h1>
                </div>
              </Link>
              {this.renderAddOrRemoveFavorite(recipe)}
            </div>

            {/* <Link to={{pathname: `/recipe/${recipe.id}`, component: 'Feed'}}> */}
              <p className="recipe-author">
                <Link style={{textDecoration: 'underline', color: 'rgb(230, 220, 200)'}} to={`/profile/${recipe.author}`}>
                  {recipe.username}
                </Link>
              </p>
            {/* </Link> */}

            <Link to={{pathname: `/recipe/${recipe.id}`, component: 'Feed'}}>
              <h2 className="recipe-cooktime">{recipe.cooktime}</h2>
            </Link>
          </div>

        </div>
      )
    })
  }

  // Sets the background of each recipe card
  getRecipePicture(recipe) {
    let image
    if (recipe.picture) {
      image = 'http://127.0.0.1:8000' + recipe.picture
    } else {
      image = 'null'
    }
    return {
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }
  }

  // When user clicks a recipe card, show more info (ingredients, directions)
  show_recipe = (event) => {
    console.log("Recipe switched");
    console.log(event.currentTarget);
    // Clear current recipe
    document.getElementById('recipe-ingredients-text').innerHTML = "";
    document.getElementById('recipe-directions-text').innerHTML = "";
    // Replace it with the ingredients/directions info inside the hidden HTML of the recipe cards
    document.getElementById('recipe-ingredients-text').innerHTML = event.currentTarget.querySelector('#recipe-ingredients').innerHTML;
    document.getElementById('recipe-directions-text').innerHTML  = event.currentTarget.querySelector('#recipe-directions').innerHTML;
    // Remove the opacity from placeholder text
    document.querySelector('#recipe-ingredients-text').style["opacity"] = "1"
    document.querySelector('#recipe-directions-text').style["opacity"] = "1"
  }

  //// Functions to handle adding/removing from favorites 
  //// and also showing whether a recipecard is already favorited or not
  // 1. Show whether a recipe is already favorited or not
  renderAddOrRemoveFavorite(recipe) {
    let favorites_list = []
    if (this.props.auth.user) {
      favorites_list = this.props.auth.user['favorites'];
    }
    let found = false;
    for (let i in favorites_list) {
      if (favorites_list[i].id === recipe.id) {
        found = true;
        break
      }
    }
    if (found) {
      return (
        <div className="favorite_btn" onClick={() => this.removeFavorite(this.props.auth.user.id, recipe.id)}>
          <i className="fas fa-heart"></i>
        </div>
      )
    } else {
      return (
        <div className="favorite_btn" onClick={() => this.addFavorite(this.props.auth.user.id, recipe.id)}>
          <i className="far fa-heart"></i>
        </div>
      )
    }
  }
  // 2. Add Favorite
  addFavorite(user_id, recipe_id) { 
    this.props.addFavorite(user_id, recipe_id);
    console.log("Favorote Added");
    this.setState({auth: this.props.loadUser()});
  }
  // 3. Remove Favorite
  removeFavorite(user_id, recipe_id) {
    this.props.removeFavorite(user_id, recipe_id);
    console.log("Favorite Removed");
    this.setState({auth: this.props.loadUser()});
  }

  // Change Nav icons to show which page is shown. 
  // Why do this here?
  // This is the only component that all the other components communicate with.
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { addFavorite, removeFavorite, loadUser })(RecipeList)