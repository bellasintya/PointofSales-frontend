import React, { Component } from 'react';
import { getJwt } from './Jwt';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Authentication extends Component {
    constructor (props) {
        super (props);

        this.state = {
            user: undefined
        } 
    }   
    componentDidMount () {
        const jwt = getJwt();
        if (!jwt){
            this.props.history.push('/SignInPage');
        }
        else if(jwt === undefined || jwt === null || jwt === ''){
            localStorage.removeItem ('x-access-token');
            this.props.history.push('/SignInPage');
        }
        else{
            this.props.history.push('/Home');
            this.setState ({user: this.props.user});
        }
    }

    render () {
        if (this.state.user === undefined) {
            return (
                <div><h1>Loading...</h1></div>
            );
        }
        return (
            <div>
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

export default withRouter (connect (mapStateToProps) (Authentication));