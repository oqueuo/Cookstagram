import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getFriendsRecipes } from '../../actions/recipes';
import RecipeList from '../recipe/RecipeList';

class Feed extends Component {
  componentDidMount() {
    this.props.getFriendsRecipes();
    this.setHeaderButton();
  }
  componentDidUpdate() {
    
  }
  
  render() {
    if (typeof this.props.auth.isAuthenticated != undefined) {
      if (this.props.auth.isAuthenticated === false) {
        return <Redirect to='/login' />;
      }
    }
    this.setGrid()
    return (
    <>
      <div id="feed-title-container">
        <h1 id="feed-title">Feed</h1>
        <hr />
      </div>

      <div id="recipecard-container-FEED">
        <RecipeList recipes={this.props.friends_recipes} component="Feed"/>
      </div>
    </>
    );
  }

  // Changes parent DIV grid to Feed page layout
  setGrid() {
    try {
      document.getElementById("grid-container-PROFILE").id = "grid-container-FEED"
    } catch(err) {
        try {
          document.getElementById("grid-container-EXPLORE").id = "grid-container-FEED"
        } catch(err) {
          console.log("Feed Already Loaded")
        }
    }
  }

  // Updates Header icons to show which page is currently active
  setHeaderButton() {
    document.getElementById('profile_btn_i').className = "far fa-user-circle"
    document.getElementById('feed_btn_i').className = "fas fa-address-book"
    document.getElementById('explore_btn_i').className = "far fa-compass"
  }
}

const mapStateToProps = (state) => {
  return {
    friends_recipes: state.friends_recipes,
    auth: state.auth
  }
}

export default connect(mapStateToProps, {getFriendsRecipes})(Feed);