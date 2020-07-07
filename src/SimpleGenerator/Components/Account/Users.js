import React, { Component } from 'react';
import '../Section.css';
import Axios from 'axios';

class Users extends Component {
    state = {
        open: false,
        askPg: false
    }

    async componentDidMount(prevProps, prevState){
        // const pgQuery = Axios.get('/SimpleGenerator/user?').then(
        //     res => console.log(res)
        // ).catch(err => {
        //     console.log(err);
        // });
        const pgQuery = await Axios.get('/SimpleGenerator/user?');
        this.setState({query: pgQuery.data.query});
        console.log(pgQuery)
    }


    render() {
        return (
            <div>
                listing
            </div>
        );

    }
}

export default Users;