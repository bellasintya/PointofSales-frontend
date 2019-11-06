import React, {Component} from 'react';
import Axios from 'axios';

class Welcome extends Component {
    state = {
        data: []
    };
    componentDidMount (){
        Axios.get ('http://localhost:8080/user')
            .then (response => this.setState ({data: response.data}))
                // )
            .catch(error => {
                if (!error.response) {
                    // network error
                    this.errorStatus = 'Error: Network Error';
                } else {
                    this.errorStatus = error.response.data.message;
                }
            }
        );     
    }
    render () {
        console.log (this.state);
        return (
            <div style = {{backgroundColor: 'goldenrod'}}>
                <p style= {{fontSize: 50}}>Welcome </p>
                {/* { typeof this.state.data === 'object'
                  ?  */}
                {   this.state.data.map (item => { 
                        return (
                            <p key = {item.id_user} style={{fontSize: 30}}>
                                {item.full_name}
                
                            </p>
                        );
                    })
                    // : <img src = "https://icon-library.net//images/spinner-icon-gif/spinner-icon-gif-14.jpg" width = "350" alt="gambar"/>
                }
            </div>
        );
    }
}

export default Welcome;