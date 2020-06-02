import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {  logout, loadUser} from "../actions/auth";

export class Header extends Component {
         static propTypes = {
           auth: PropTypes.object.isRequired,
           logout: PropTypes.func.isRequired,
           loadUser: PropTypes.func.isRequired,
         };
         state = {
           navigate: false,
         };

         logout = () => {
           this.props.logout();
           this.setState({ navigate: true });
         };

         changeToFalse = () => {
           this.setState({ navigate: false });
         };

         componentDidMount() {
         }

         render() {
           const navigate = this.state.navigate;
           if (navigate) {
             this.changeToFalse();
             return <Redirect to="/" />;
           }
           const { isAuthenticated, user } = this.props.auth;
           const authLinks = (
             <div className={"collapse navbar-collapse"} id="navbarColor01">
               <ul className="nav navbar-nav mr-auto ">
                 <li className="nav-item active">
                   <Link to={"/news"} className={"nav-link"}>
                     News
                   </Link>
                 </li>
               </ul>

               <ul className="nav navbar-nav pull-right">
                 <span className="navbar-text ">
                   <strong>{user ? `Welcome ${user.username}` : ""}</strong>
                 </span>
                 <li className="nav-item active">
                   <button
                     onClick={this.logout}
                     type="button"
                     className="btn btn-primary"
                   >
                     Logout
                   </button>
                 </li>
               </ul>
             </div>
           );
           const guestLinks = (
             <ul className="navbar-nav ml-auto">
               <li className="nav-item active">
                 <Link to={"/signup"} className={"nav-link"}>
                   Register
                 </Link>
               </li>
               <li className="nav-item active">
                 <Link to={"/signin"} className={"nav-link"}>
                   Login
                 </Link>
               </li>
             </ul>
           );
           return (
             <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
               <div className="container">
                 <a className="navbar-brand" href="/">
                   Epidemic news
                 </a>
                 <button
                   className="navbar-toggler"
                   type="button"
                   data-toggle="collapse"
                   data-target="#navbarColor01"
                   aria-controls="navbarColor01"
                   aria-expanded="false"
                   aria-label="Toggle navigation"
                 ></button>

                 <div className="collapse navbar-collapse  " id="navbarColor01">
                   {isAuthenticated ? authLinks : guestLinks}
                 </div>
               </div>
             </nav>
           );
         }
       }

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, loadUser})(Header);
