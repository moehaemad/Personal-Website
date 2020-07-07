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
        Axios.get('/SimpleGenerator/user?').then(
            res => {
                this.setState({query: res.data.query});
            }
        ).catch(err => {
            console.log(err);
        });
    }

    listQuery = () => {
        const query = this.state.query;
        // let query=['asdasd','another', 'whatever'];
        let result = query.map(el => {
            return <p>{el.name}</p>
        })
        return result;
    }


    render() {

        const something = this.listQuery();
        return (
            <div>
                {/* {this.listQuery} */}
                {something}
            </div>
        );

    }
}

export default Users;