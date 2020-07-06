import React, { Component } from 'react';
import Logo from '../Components/Logo'
import Generator from '../Components/Generator/Generator';
import Account from '../Components/Account/User';
import Axios from 'axios';

class App extends Component{

  state = {
    show: false,
    generate: false,
    account: false,
    generatorBtn: 'start',
    accountBtn: 'Account',
    databaseReq: false,
    toShow: ''
  }

  // componentDidUpdate(prevProps, prevState){

  //   if (this.state.databaseReq){
  //     Axios.get('/SimpleGenerator/user?').then(
  //       res => {console.log(res)}
  //     ).catch(err => console.log(err));
  //   }
  // }

  // toggle(stateItem, message){
  //   const value = this.state[stateItem];
  //   // if (!value){

  //   // }
  //   return !value ? this.setState
  // }


  render(){
    return(
      <div className="App">
        <Logo/>
        <button onClick={() => !this.state.generate ? this.setState({generate: true, generatorBtn: 'End'}) : this.setState({generate:false, generatorBtn: 'Start'})}>
          {this.state.generatorBtn}
        </button>
        {this.state.generate ? <Generator/> : null}
        <button onClick={() => { !this.state.account ? this.setState({databaseReq: true, account: true, accountBtn: 'Account'}) : this.setState({databaseReq: false, account: false, accountBtn: 'Open Account'})}}>
          Account
        </button>
        {this.state.account ? <Account /> : null}
      </div>
    );
  }
}

export default App;
