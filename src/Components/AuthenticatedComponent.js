import React, { Component } from 'react';
import { getJwt } from '../Helpers/Jwt';
import { withRouter } from 'react-router-dom';
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
        }
        Axios.get ('/user/', { headers: {'x-access-token': jwt}})
        .then (res => res.setState ({
            user: res.data.result.userList.user, 
        }, console.log ('sudah masuk sini'), console.log (this.user)
        )).catch (err => {
            console.log (err);
            localStorage.removeItem ('cool-jwt');
            this.props.history.push ('/LoginPage');
            console.log ('sudah masuk error')
        });
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
export default withRouter (AuthenticatedComponent);