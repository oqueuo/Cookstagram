import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { userSearch } from '../../actions/search';

class Explore extends Component {
  componentDidMount() {
    this.props.userSearch('')
    this.setHeaderButton()
  }

  render() {
    if (typeof this.props.auth.isAuthenticated != undefined) {
      if (this.props.auth.isAuthenticated === false) {
        return <Redirect to='/login' />;
      }
    }
    this.setGrid()
    return(
      <>
        <div id="search-container">
          <input id="explore-search-bar" className="ReactSearchBox" name="search" placeholder="Search Users.." autoComplete="off" 
                onChange={(e) => this.sendSearch(e)}/>
        </div>

        <div id="results-container">
          {this.showResults()}
        </div>
      </>
    )
  }
  
  // Pass search box value to userSearch action
  sendSearch(e) {
    const query = e.currentTarget.value;
    this.props.userSearch(query)
  }

  // Render the search results
  showResults() {
    let results = this.props.user_search;
    return results.map((user) => {
      return (
        <div className="results-card-container" key={user.id}>
          <Link to={`/profile/${user.id}`}>
            <div className="results-card-username-container">
              {user.username}
            </div>
          </Link>
        </div>
      )
    })
  }

  // Updates Header icons to show which page is currently active
  setHeaderButton() {
    document.getElementById('profile_btn_i').className = "far fa-user-circle"
    document.getElementById('feed_btn_i').className = "far fa-address-book"
    document.getElementById('explore_btn_i').className = "fas fa-compass"
  }

  // Changes parent DIV grid to Explore page layout
  setGrid() {
    try {
      document.getElementById("grid-container-PROFILE").id = "grid-container-EXPLORE"
    } catch(err) {
      try {
        document.getElementById("grid-container-FEED").id = "grid-container-EXPLORE"
      } catch(err) {

      }
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
    user_search: state.user_search,
    auth: state.auth
  }
}

export default connect(mapStateToProps, {userSearch})(Explore);