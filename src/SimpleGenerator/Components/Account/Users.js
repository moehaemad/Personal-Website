import React, { Component } from 'react';
import '../Section.css';
import './Users.css';
import Axios from 'axios';

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
                window.alert('user does not exit');
            }
        }
        if (this.state.query.length === 0){
            try{
                const resString = await Axios.get('/SimpleGenerator/randValues/'+this.props.user +'/string');
                const resNum = await Axios.get('/SimpleGenerator/randValues/'+this.props.user +'/num');
                let queryCopy = [...this.state.query];
                queryCopy.push(...resString.data.value.map(el => el.string), ...resNum.data.value.map(el=> el.num));
                this.setState({query: queryCopy});
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
        let result = (
            <div>
                <p>User: {this.state.user}</p>
                {/* <p>User: asd</p> */}
            </div>
        );
        return result;
    }

    valueList = () => {
        
    }


    render() {

        const something = this.listQuery();
        return (
            <div>
                {something}
                <div className="GenList">
                    <div className="GenItemClose">X</div>
                    <div>Some data output</div>
                </div>
                
            </div>
        );

    }
}

export default Users;