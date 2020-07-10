import React, { Component } from 'react';
import axios from 'axios';
// This component is to insert values into the database with the respective user

class UserValue extends Component{
    state = {
        shouldInsert: false,
        insertValue: '',
        num: -1,
        string: '',
        type: ''
    }

    async componentDidUpdate(){
        if (this.state.shouldInsert){
            try{
                const toSend = {type: this.state.type, user: this.props.user, value: this.state.string}
                const res = await axios.post('/SimpleGenerator/insertValue', toSend);
                console.log(res);
                this.setState({shouldInsert: false});
            }catch(err){
                window.alert('Cannot insert values')
            }
        }
    }

    insertHandler = (e) => {
        const insertVal = this.state.insertValue;
        // Use Number() instead of parseInt because parseInt will return any number in the string if there is one
        // if the value to be inserted is not a number store in string property of state, otherwise in num.

        // Use String of Number of insertVal because NaN === NaN returns false
        String(Number(insertVal)) === 'NaN' ? this.setState({shouldInsert: true, string: insertVal, type: 'String'}) : this.setState({shouldInsert: true, num: Number(insertVal), type: 'Num'});
    }

    render(){
        const toInsert = (e) => this.setState({insertValue: e.target.value});

        return (
            <div className="toInsert">
                <p>Insert:</p>
                <input type="text" onChange={toInsert}/>
                <button onClick={this.insertHandler}>Insert</button>
            </div>
        );
    };
}

export default UserValue;