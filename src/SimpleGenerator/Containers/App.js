import React, { Component } from 'react';
import Logo from '../Components/Logo'
import Generator from '../Components/Generator/Generator';
import Account from '../Components/Account/Account';
import NewUser from '../Components/Account/NewUser';

class App extends Component{

  state = {
    show: false,
    generate: false,
    account: false,
    createAccount: false,
    generatorBtn: 'start',
    toShow: ''
  }

  toggleSection = (section, sectionBtn = '', sectionMsg = []) => {
    //ex. section = generate, sectionBtn = generatorBtn
    //sectionMsg can be one of two messages displayed, on open and on close.
    let sectionShow = this.state[section];
    section = {section: !sectionShow}
    sectionBtn = [{sectionBtn: sectionMsg[0]}, {sectionBtn: sectionMsg[1]}];
    !sectionShow ? this.setState(section) : this.setState(section);
    console.log(section);
    // if (sectionBtn != '' && sectionMsg != ''){
    //   !sectionShow ? this.setState({section: true, sectionBtn: sectionMsg[0]}) : this.setState({section: false, sectionBtn: sectionMsg[1]});
    // }else{
    //   !sectionShow ? this.setState({ section: true}) : this.setState({section: false});
    // }
  }


  render(){
    return(
      <div className="App">
        <Logo/>
        <button onClick={() => !this.state.generate ? this.setState({generate: true, generatorBtn: 'End'}) : this.setState({generate:false, generatorBtn: 'Start'})}>
          {this.state.generatorBtn}
        </button>
        {this.state.generate ? <Generator/> : null}
        <button onClick={() => { !this.state.account ? this.setState({account: true}) : this.setState({account: false})}}>
          Account
        </button>
        {this.state.account ? <Account /> : null}
        <button onClick={()=> {!this.state.createAccount ? this.setState({createAccount: true}) : this.setState({createAccount: false})}}>
          Create User
        </button>
        {this.state.createAccount ? <NewUser/> : null}
      </div>
    );
  }
}

export default App;
