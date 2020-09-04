import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, addFriend, removeFriend } from '../../actions/user';
import { loadUser } from '../../actions/auth';
import RecipeList from '../recipe/RecipeList';

class OtherProfile extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
    this.props.loadUser();
    this.setHeaderButton();
  }

  componentWillMount() {
    this.props.loadUser();
  }
  
  render() {
    if (typeof this.props.auth.isAuthenticated != undefined) {
      if (this.props.auth.isAuthenticated === false) {
        return <Redirect to='/login' />;
      }
    }
    this.setGrid()
    let rec_length
    if (this.props.user['user_recipes']) {
      rec_length = this.props.user['user_recipes'].length
    } else {
      rec_length = 0
    }
    return (
    <>
      <div id="profile">
        <div id="username-container">
          <h1>{this.props.user.username}</h1>
          <div id="blank"></div>
          {this.addOrRemoveFriend()}
        </div>
        <hr></hr>
        <div id="count-container">
          <div id="created-container">
            <p id="created-label" style={{ fontWeight:'bold' }}>RECIPES</p>
            <p id="created-count" style={{ borderBottom:'3px solid #FFB4A0' }}>{rec_length}</p>
          </div>
        </div>
      </div>
      
      <div id="recipecard-container-PROFILE">
        <RecipeList recipes={this.props.user['user_recipes']} component="OtherProfile"/>
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
    document.getElementById('profile_btn_i').className = "far fa-user-circle"
    document.getElementById('feed_btn_i').className = "far fa-address-book"
    document.getElementById('explore_btn_i').className = "fas fa-compass"
  }

  addFriend(user_id, other_user_id) {
    this.props.addFriend(user_id, other_user_id);
    this.setState(() => {
      this.setState({auth: this.props.loadUser()})
    })
  }

  removeFriend(user_id, recipe_id) {
    this.props.removeFriend(user_id, recipe_id);
    this.setState(() => {
      this.setState({auth: this.props.loadUser()})
    })  
  }

  // Changes the Add/Remove friend button to the correct one
  addOrRemoveFriend() {
    let friends_list
    if(this.props.auth.user) {
      friends_list = this.props.auth.user['friends']
    }
      let friend_bool = false
    for (let i in friends_list) {
      if (friends_list[i].id === this.props.user.id) {
        friend_bool = true
        break
      }
    }
    if (friend_bool) {
      return (
        <i id="friend_btn" onClick={() => this.removeFriend(this.props.auth.user.id, this.props.user.id)} className="fas fa-user-times"></i>
      )
    } else {
      return (
        <i id="friend_btn" onClick={() => this.addFriend(this.props.auth.user.id, this.props.user.id)} className="fas fa-user-plus"></i>
      )
    }
  }


}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user_profile,
  }
}

const mapDispatchToProps = () => {
  return {
    getUser,
    loadUser,
    addFriend,
    removeFriend
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps())(OtherProfile)