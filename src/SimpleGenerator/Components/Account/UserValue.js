import React, { Component } from 'react';
import axios from 'axios';
// This component is to insert values into the database with the respective user

class UserValue extends Component{
    state = {
        insertValue: '',
        num: -1,
        string: ''
    }


    render(){
        const toInsert = (e) => this.setState({insertValue: e.target.value});

        return (
            <div className="toInsert">
                <p>Insert:</p>
                <input type="text" onChange={toInsert}/>
                <button onClick={() => this.props.insertHandler(this.state.insertValue)}>Insert</button>
            </div>
        );
    };
}

export default UserValue;