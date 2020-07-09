import React, { Component } from 'react';
import '../Section.css';
import './Users.css';
import Axios from 'axios';

class Users extends Component {
    state = {
        open: false,
        askPg: false,
        query: ['not yet updated'],
        toDelete: {table: null, value: null},
        user: ''
    }

    async componentDidMount(prevProps, prevState){
        if (this.state.user.length === 0){
            // {pass: this.props.pass}
            // Axios.get('/SimpleGenerator/' + this.props.user + '/' + this.props.pass).then(
            //     res => {
            //         this.setState({query: res.data.query});
            //         console.log(res);
            //     }
            // ).catch(err => {
            //     console.log(err);
            // });
            try{
                const res = await Axios.get('/SimpleGenerator/' + this.props.user + '/' + this.props.pass);
                console.log(`res is `);
                console.log(res);
                if (res.data.query.length === 0){
                    this.setState({query: [{username: 'user not found'}]});
                }else{
                    this.setState({query: res.data.query});
                }
            }catch(err){
                window.alert('user does not exit');
            }
        }
    }

    listQuery = () => {
        const query = this.state.query;
        // let query=['asdasd','another', 'whatever'];
        // let result = query.map(el => {
        //     return <p>{el.name}</p>
        // });
        let result = (
            <div>
                <p>User: {this.state.query[0].username}</p>
            </div>
        );
        return result;
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