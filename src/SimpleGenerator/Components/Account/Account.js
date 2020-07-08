import React, { Component } from 'react';
import '../Section.css'
import User from './Users';


class Account extends Component {
    state = {
        open: false,
        showUser: false,
        user: null,
        pass: null
    }

    togglewindow = () => this.state.open ? this.setState({open: false}) : this.setState({open: true});

    getUser = () => {
        let showUser = !this.state.showUser;
        this.setState({showUser: showUser});
    }
    passUserInfo = (e) => {
        e.preventDefault();
        // TODO: do not allow for option to close, once opnened, it remains open
        let showUser = !this.state.showUser;
        this.setState({showUser: showUser});
    }
    
    render(){
        const setUser = (e) => this.setState({user: e.target.value});
        const setPass = (e) => this.setState({pass: e.target.value});
        return (
            <div className="Output">
                <div className="Title">
                    <h2>
                        Login info
                    </h2>
                </div>
                <div>
                    <form onSubmit={this.passUserInfo}>
                        <input type="text" placeholder="username" required onChange={setUser}/>
                        <input type="password" placeholder="password" required onChange={setPass}/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                {this.state.showUser ? <User user={this.state.user} pass={this.state.pass}/> : null}
            </div>
        );
    }
}

export default Account;