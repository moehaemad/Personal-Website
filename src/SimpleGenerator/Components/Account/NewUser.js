import React, { Component } from 'react';
import '../Section.css';
import axios from 'axios';

class NewUser extends Component {

    state = {
        success: false,
        temp: false
    }

    async componentDidMount(){
        if (!this.state.success){
            try{
                const res = await axios.post('/SimpleGenerator/createUser', {"something": "AsdasD"})
            }catch(err){
                console.log(err);
            }
        }
    }

    submitHandler = () => {

        this.setState({'success': true});
    }
    render(){
        return (
            <div className="Output">
                <div className="Title">
                    <h2>New User info</h2>
                </div>
                <div>
                    <form action="">
                        <input type="text" placeholder="username" required/>
                        <input type="password" placeholder="password" required/>
                        <button type="submit" onClick = {this.submitHandler}>Create</button>
                    </form>
                    {this.state.success ? <p>Success!</p> : <p>Failed</p>}
                </div>
            </div>
        );
    }
}

export default NewUser;