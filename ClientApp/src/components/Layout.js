import React from 'react';
import {Container} from 'reactstrap';
import NavMenu from './NavMenu';
import LoginFrom from "./Auth/LoginFrom";
import RegistrationForm from "./Auth/RegistrationForm";
import {matchPath} from 'react-router';
import {connect} from "react-redux";


const Layout = props =>
    <div>
        {matchPath(props.location.pathname, "/login") != null ? <LoginFrom/> : null}
        {matchPath(props.location.pathname, "/register") != null ? <RegistrationForm/> : null}
        {matchPath(props.location.pathname, "/login") === null && matchPath(props.location.pathname, "/register") === null ?
            <div>
                <NavMenu/>
                < Container>
                    {props.children}
                </Container>
            </div>
            : null
        }
    </div>;


export default connect(
    state => state.routing,
    dispatch => ({}),
)(Layout);


