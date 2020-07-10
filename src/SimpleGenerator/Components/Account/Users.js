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

    async componentDidMount(prevProps, prevState){
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

    listQuery = () => {
        // let query=['asdasd','another', 'whatever'];
        // let result = query.map(el => {
        //     return <p>{el.name}</p>
        // });
        const toReturn = this.state.query;
        return toReturn.map((el, index) => {
            return <GenList key={index} data={el}/>
        });
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
                {this.state.query.map((el, ind) => <GenList key={ind} data={el}/>)}
            </div>
        );

    }
}

export default Users;