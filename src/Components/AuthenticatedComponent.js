import React, { Component } from 'react';
import { getJwt } from '../Helpers/Jwt';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';

class AuthenticatedComponent extends Component {
    constructor (props) {
        super (props);

        this.state = {
            user: undefined
        } 
    }
    
    componentDidMount () {
        const jwt = getJwt ();
        if (!jwt){
            this.props.history.push('/LoginPage');
        }else{
            this.props.history.push('/Home');
            this.setState ({user: this.props.user})
        }
    }

    render () {
        console.log (this.state.user);
        if (this.state.user === undefined) {
            return (
                <div><h1>Loading...</h1></div>
            );
        }
        return (
            <div>
                {console.log (this.props.children)}
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userList,
    }
}

export default withRouter (connect (mapStateToProps) (AuthenticatedComponent));