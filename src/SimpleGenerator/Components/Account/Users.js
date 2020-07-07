import React, { Component } from 'react';
import '../Section.css';
import Axios from 'axios';

class Users extends Component {
    state = {
        open: false,
        askPg: false,
        query: ['not yet updated']
    }

    componentDidMount(prevProps, prevState){
        // Axios.get('/SimpleGenerator/user?').then(
        //     res => {
        //         this.setState({query: res.data.query});
        //         console.log(res);
        //     }
        // ).catch(err => {
        //     console.log(err);
        // });
        Axios.get('/SimpleGenerator/rest/' + this.props.user, {pass: this.props.pass}).then(
            res => {
                // this.setState({query: res.data.query});
                console.log(res);
            }
        ).catch(err => {
            console.log(err);
        });
    }

    listQuery = () => {
        const query = this.state.query;
        // let query=['asdasd','another', 'whatever'];
        // let result = query.map(el => {
        //     return <p>{el.name}</p>
        // });
        let result = (
            <div>
                <p>User: {this.state.query[0].name}</p>
            </div>
        );
        return result;
    }


    render() {

        const something = this.listQuery();
        return (
            <div>
                {/* {this.listQuery} */}
                {something}
                {this.props.user}
                {this.props.pass}
            </div>
        );

    }
}

export default Users;