import React, { Component } from 'react';
import '../Section.css';
import axios from 'axios';

class NewUser extends Component {

    state = {
        user: '',
        pass: '',
        success: false,
        send: false,
        didUpdate: false
    }

    async componentDidUpdate(){
        console.log(`the send property is ${this.state.send}`);
        if (this.state.send && this.state.didUpdate){
            try{
                const res = await axios.post('/SimpleGenerator/createUser', {user: this.state.user, pass:this.state.pass});
                
                this.setState({didUpdate: false, send: false, success: res.data.didAccept});
                console.log(res);
            }catch(err){
                console.log(err);
            }
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.setState({send: true});
    }
    render(){
        const setUser = (e) => this.setState({user: e.target.value, didUpdate: true});
        const setPass = (e) => this.setState({pass: e.target.value});
        return (
            <div className="Output">
                <div className="Title">
                    <h2>New User info</h2>
                </div>
                <div>
                    <form onSubmit={this.submitHandler}>
                        <input type="text" placeholder="username" required onChange={setUser}/>
                        <input type="password" placeholder="password" required onChange={setPass}/>
                        <button type="submit">Create</button>
                    </form>
                    <div className="Progress">
                        {this.state.success ? <p className="Success">Success!</p> : <p className="Failed">Failed</p>}
                    </div>
                </div>
            </div>
        );
    }
}

export default NewUser;