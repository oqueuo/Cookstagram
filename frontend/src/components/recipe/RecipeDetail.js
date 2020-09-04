import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecipe } from '../../actions/recipes';


class RecipeDetail extends Component {
    componentDidMount() {
        this.props.getRecipe(this.props.match.params.id)
        if ((localStorage.getItem('origin') == null |
            localStorage.getItem('origin') === "OtherProfile" |
            localStorage.getItem('origin') === "Profile" |
            localStorage.getItem('origin') === "Feed") &
            this.props.location.component !== undefined) {
            
            localStorage.setItem('origin', this.props.location.component
            )
        }
    }

    render() {
        if (typeof this.props.auth.isAuthenticated != undefined) {
            if (this.props.auth.isAuthenticated === false) {
              return <Redirect to='/login' />;
            }
        }
        this.setGrid()
        console.log(this.props.recipe)
        return (
        <>
            {/* <div id="grid-container-EXPLORE" */}
            <div id="recipe-detail-title">
                <h1 id="recipe-title">{this.props.recipe.title}</h1>
                <hr style={this.borderColor()}/>
            </div>

            <div id="recipe-detail-pic-info">
                <div id="recipe-detail-pic" style={{ backgroundImage: `url(${this.props.recipe.picture})`,
                                                     backgroundSize: 'cover',
                                                     backgroundRepeat: 'no-repeat', }}></div>
                <section id="recipe-detail-info">
                    <div id="recipe-detail-ingredients">
                        <h2>Ingredients</h2>
                        <p id="recipe-ingredients-text" style={{whiteSpace: 'pre-line'}}>{this.props.recipe.ingredients}</p>
                    </div>
                    <div id="recipe-detail-directions">
                        <h2>Directions</h2>
                        <p id="recipe-directions-text" style={{whiteSpace: 'pre-line'}}>{this.props.recipe.directions}</p>
                    </div>
                </section>
            </div>
            {/* </div> */}
        </>
        );
    }

    setGrid() {
        try {
        document.getElementById("grid-container-PROFILE").id = "grid-container-EXPLORE"
        } catch(err) {
            try {
            document.getElementById("grid-container-FEED").id = "grid-container-EXPLORE"
            } catch(err) {
            console.log("Detail Already Loaded")
            }
        }
    }

    borderColor() {
        let origin = localStorage.getItem('origin')
        if (origin === "Feed" | origin === "OtherProfile") {
            return { color: '#FFB4A0', backgroundColor: '#FFB4A0', height: '1.5px', border: 'none', borderRadius: '10px' }
        } else {
            return { color: '#6A6876', backgroundColor: '#6A6876', height: '1.5px', border: 'none', borderRadius: '10px' }
        }
    }


}

const mapStateToProps = (state) => {
  return {
    recipe: state.recipe,
    auth: state.auth
  }
}

export default connect(
    mapStateToProps, 
    { getRecipe }
    )(RecipeDetail);