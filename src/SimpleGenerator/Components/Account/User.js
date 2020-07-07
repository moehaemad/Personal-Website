import React, { Component } from 'react';
import '../Section.css';
import Output from './Output';
import Axios from 'axios';

class User extends Component {
    state = {
        open: false,
        askPg: false
    }

    toggleWindow = () => {
        return this.state.open ? this.setState({askPg: false, open: false}) : this.setState({askPg: true, open: true});
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.askPg){
            console.log('in the component update ');
            Axios.get('/SimpleGenerator/user?').then(
                res => console.log(res)
            ).catch(err => {
                console.log(err);
            });
        }
    }

    askPg = () => {
        return (
            <div>
                <input type="text" placeholder="username"/>
                <input type="text"/>
                <Output/>
            </div>
        );
    }


    render() {
        return (
            <div className="Output">
                <div className="Title">
                    <h2>
                        Login info
                    </h2>
                    <button className="Close" onClick={this.toggleWindow}>
                    {this.state.open ? 'X' : 'O'}
                    </button>
                </div>
                {this.state.open ? this.askPg() : null}
            </div>
        );

    }
}

export default User;