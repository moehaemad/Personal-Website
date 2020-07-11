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
        user: ''
    }

    setDelete = (str) => {
        // str: the type of table to delete from
        // ind: the index at which to remove the query
        const tableName = String(Number(str)) === 'NaN' ? 'String' : 'Num';
        let copyQuery = this.state.query.map(el => el);
        // copyQuery.forEach((el, ind, arr) => {
        //     if (arr[ind] === str)
        // })
        copyQuery.splice(copyQuery.indexOf(str), 1);
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
                // const res = await Axios.delete('/SimpleGenerator/deleteValue', {
                //     type: this.state.toDelete.table, 
                //     value: this.state.toDelete.value, 
                //     user: this.props.user
                // });
                const res = await Axios.delete(`/SimpleGenerator/deleteValue/${this.props.user}/${this.state.toDelete.table}/${this.state.toDelete.value}`);
                
                console.log(res);
            }catch (err){
                window.alert('error deleting the value');
            }
            // 1) perform HTTP DELETE to remove from the respective table.
            // 2) update the current output of the tables in the state query
            // 3) update state toDelete to null so that another request isn't sent accidently
        }
    }

    render() {
        // const something = this.listQuery();
        const genList = () => this.state.query.map((el, ind) => <GenList key={ind} data={el}/>);
        console.log(genList());
        return (
            <div>
                <div>
                    <p>User: {this.state.user}</p>
                    {this.state.user !== 'user not found' ? <UserValue user={this.state.user}/> : null}
                </div>
                {/* {this.state.query.map((el, ind) => <GenList key={ind} data={el}/>)} */}
                {this.state.query.map((el, ind) => <GenList key={ind} data={el} deleteHandler={(e) => this.setDelete(el, ind)}/>)}
            </div>
        );

    }
}

export default Users;