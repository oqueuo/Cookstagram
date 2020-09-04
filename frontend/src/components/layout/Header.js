import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { NavLink } from 'react-router-dom'

class Header extends Component {
    componentDidUpdate() {
        if (typeof this.props.auth.isAuthenticated != undefined) {
            if (this.props.auth.isAuthenticated === false) {
                this.hideNavIcons();
            }
        }
    }

    render() {
        return (
            <>
                <header id="header">
                    <h1><NavLink to="/" style={{textDecoration: 'none'}}>Cookstagram</NavLink></h1>

                    <p id="username-goes-here">{this.renderUsername()}</p>

                    <div onClick={this.props.logout} id="logout_btn">
                        <i className="fa fa-lock"></i></div>
                    <NavLink id="profile_btn" to="/">
                        <i id="profile_btn_i" className="far fa-user-circle"></i></NavLink>
                    <NavLink id="feed_btn" to="/feed">
                        <i id="feed_btn_i" className="far fa-address-book"></i></NavLink>
                    <NavLink id="explore_btn" to="/explore">
                        <i id="explore_btn_i" className="far fa-compass"></i></NavLink>
                </header>
            </>
        );
    }

    // Shows logged-in user's name under Cookstagram
    renderUsername() {
        const { isAuthenticated } = this.props.auth;
        if (isAuthenticated) {
            return 'Hello ' + this.props.auth.user.username
        } else {
            return 'Welcome'
        };
    }

    hideNavIcons() {
        document.getElementById("logout_btn").className = 'hidden';
        document.getElementById("profile_btn_i").className = 'hidden';
        document.getElementById("feed_btn_i").className = 'hidden';
        document.getElementById("explore_btn_i").className = 'hidden';
    }
    
    logout() {
        this.props.logout()
        return <Redirect to='/login' />;
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);