import React, { Component } from 'react';
import { getUserRecipes, getFavoriteRecipes } from '../../actions/recipes';
import { connect } from 'react-redux';
import RecipeList from '../recipe/RecipeList';
import RecipeCreate from '../recipe/RecipeCreate'
import { toggleRecipesOrForm } from '../scripts';

class Profile extends Component {
  componentDidMount() {
    this.props.getUserRecipes();
    this.props.getFavoriteRecipes();
    this.showIcons();
  }

  componentWillMount() {
    this.setState({page: "created"})
  }
  
  render() {
    this.setGrid()
    this.setHeaderButton()
    return (
    <>
      <div id="profile">
        <h1>{this.props.auth.user.username}</h1>
        <hr></hr>
        <div id="count-container">

          <div id="created-container" onClick={() => this.showCreated()}>
            <p id="created-label" className="label-highlighted">RECIPES</p>
            <p id="created-count" className="count-highlighted">{this.props.user_recipes.length}</p>
          </div>

          <div id="blank-count"></div>

          <div id="saved-container" onClick={() => this.showSaved()}>
            <p id="saved-label">SAVED</p>
            <p id="saved-count">{this.props.favorites.length}</p>
          </div>
          
          <div id="add-btn-container" onClick={toggleRecipesOrForm}>
            <span id="add-btn" className="far fa-plus-square" status="Add"></span>
          </div>

        </div>

      </div>
      
      <div id="recipecard-container-PROFILE">
        {this.showCreatedOrSaved()}
      </div>
      <div id="recipeform-container" className="hidden">
        <RecipeCreate />
      </div>
    </>
    );
  }

  // Change parent DIV CSS grid to Profile layout
  setGrid() {
    try {
      document.getElementById("grid-container-FEED").id = "grid-container-PROFILE"
    } catch(err) {
        try {
          document.getElementById("grid-container-EXPLORE").id = "grid-container-PROFILE"
        } catch(err) {

        }
    }
  }

  // Updates Header icons to show which page is currently active
  setHeaderButton() {
    document.getElementById('profile_btn_i').className = "fas fa-user-circle"
    document.getElementById('feed_btn_i').className = "far fa-address-book"
    document.getElementById('explore_btn_i').className = "far fa-compass"
  }

  // Shows the recipes created by user OR saved by user.
  showCreatedOrSaved() {
    if (this.state.page === "created") {
      return <RecipeList recipes={this.props.user_recipes} component="Profile"/>
    } else if (this.state.page === "saved") {
      return <RecipeList recipes={this.props.favorites} component="Feed"/>
    }
  }

  // Indicates with CSS that recipes created by user are shown
  showCreated() {
    this.setState({page: "created"})
    document.getElementById("created-label").className = "label-highlighted"
    document.getElementById("created-count").className = "count-highlighted"

    document.getElementById("saved-label").className = ""
    document.getElementById("saved-count").className = ""
  }

  // Indicates with CSS that recipes saved by user are shown
  showSaved() {
    this.setState({page: "saved"})
    document.getElementById("saved-label").className = "label-highlighted"
    document.getElementById("saved-count").className = "count-highlighted"

    document.getElementById("created-label").className = ""
    document.getElementById("created-count").className = ""
  }

  // Show the Nav buttons if user logs in
  showIcons() {
    document.getElementById("logout_btn").className = '';
    document.getElementById("profile_btn").className = '';
    document.getElementById("feed_btn").className = '';
    document.getElementById("explore_btn").className = '';
}
}

const mapStateToProps = (state) => {
  return {
    user_recipes: state.user_recipes,
    favorites: state.favorites,
    auth: state.auth,
  }
}

const mapDispatchToProps = () => {
  return {
    getUserRecipes,
    getFavoriteRecipes
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Profile)