import React, { Component } from 'react';
import '../Section.css';
import './Users.css';
import Axios from 'axios';
import GenList from './GenList';
import UserValue from './UserValue';

class Users extends Component {
    state = {
        open: false,
        askPg: false,
        query: [],
        toDelete: {table: null, value: null},
        user: '',
        updateValue: {type: null, index: null, value: null, sendToDb: false}
    }

    setDelete = (str) => {
        // str: the type of table to delete from
        // ind: the index at which to remove the query
        const tableName = String(Number(str)) === 'NaN' ? 'String' : 'Num';
        // Make copy of state query in order to prevent changing state inadvertently
        let copyQuery = this.state.query.map(el => el);
        // Delete the value from the copy of state query
        copyQuery.splice(copyQuery.indexOf(str), 1);
        // change state deleteVal to give to HTTP DELETE
        const deleteVal = {table: tableName, value: str}
        this.setState({toDelete: deleteVal, query: copyQuery});
    }

    async componentDidMount(){
        if (this.state.user === ""){
            try{
                const res = await Axios.get('/SimpleGenerator/' + this.props.user + '/' + this.props.pass);
                if (res.data.user.length === 0){
                    this.setState({user: "user not found"});
                }else{
                    this.setState({user: res.data.user[0].username});
                }
            }catch(err){
                window.alert('Cannot create user');
            }
        }
        if (this.state.query.length === 0){
            try{
                const resString = await Axios.get('/SimpleGenerator/randValues/'+this.props.user +'/string');
                const resNum = await Axios.get('/SimpleGenerator/randValues/'+this.props.user +'/num');
                let queryCopy = [...this.state.query];
                queryCopy.push(...resString.data.value.map(el => el.string), ...resNum.data.value.map(el=> el.num));
                queryCopy.forEach((el, ind, arr) => {
                    if (typeof(el) === 'string') arr[ind] = el.trim('')
                this.setState({query: queryCopy});
            });
            }catch(err){
                console.log(err);
            }
        }
    }

    async componentDidUpdate(prevProps, prevState){
        // declaring these variables for shorter lines to put in if statement.
        const canDelete = (this.state.toDelete.table !== null && this.state.toDelete.value !== null);
        const diffLength = this.state.query.length !== prevState.query.length;
        if (diffLength && canDelete){
            // if there was a delete in the state query and have values to pass to HTTP DELETE
            try{
                // 1) perform HTTP DELETE to remove from the respective table.
                const res = await Axios.delete(`/SimpleGenerator/deleteValue/${this.props.user}/${this.state.toDelete.table}/${this.state.toDelete.value}`);
                // 2) update state toDelete to null so that another request isn't sent accidently
                this.setState({toDelete: {table: null, value: null}});
                if (!res.data.didAccept){
                    window.alert(`error deleting ${this.state.toDelete.value}`);
                }
            }catch (err){
                window.alert('error deleting the value');
            }
        }
        if (this.state.updateValue.sendToDb){
            try{
                console.log(`in the sendToDb val`);
                // PUT request needs 
                const res = await Axios.put('/SimpleGenerator/updateValue', {type: 'String', ind: 1, value: 'asdasd'});
                console.log(res);
                // update state query property to indicate successful update to user
                this.setState({updateValue: {type: null, index: null, value: null, sendToDb: false}});
            }catch (err){
                window.alert(`error updating value to database`);
            }
        }
    }

    render() {
        const changeUpdateValues = (fnType, ind, val) => {
            console.log('in changeUpdateValues');
            console.log(`the values are type: ${fnType}, ind: ${ind}, val: ${val}`);
            // Update state property updateValue
            this.setState({updateValue: {type: fnType, index: ind, value: val, sendToDb: true}})
        }
        return (
            <div>
                <div>
                    <p>User: {this.state.user}</p>
                    {this.state.user !== 'user not found' ? <UserValue user={this.state.user}/> : null}
                </div>
                {this.state.query.map((el, ind) => <GenList key={ind} data={el} deleteHandler={() => this.setDelete(el, ind)} updateHandler={changeUpdateValues} keyProp={ind}/>)}
            </div>
        );

    }
}

export default Users;