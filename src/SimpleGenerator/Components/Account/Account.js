import React, { Component } from 'react';
import '../Section.css'
import User from './Users';


class Account extends Component {
    state = {
        open: false,
        showUser: false
    }

    togglewindow = () => this.state.open ? this.setState({open: false}) : this.setState({open: true});

    getUser = () => {
        let showUser = !this.state.showUser;
        this.setState({showUser: showUser});
    }    
    
    render(){

        let showUser = this.state.showUser;
        return (
            <div className="Output">
                <div className="Title">
                    <h2>
                        Login info
                    </h2>
                </div>
                <div>
                <input type="text" placeholder="username"/>
                <input type="text" placeholder="password"/>
                <button onClick={this.getUser}>Submit</button>
                </div>
                {this.state.showUser ? <User/> : null}
            </div>
        );
    }
}

export default Account;