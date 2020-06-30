import React, { Component } from 'react';
import Logo from '../Components/Logo'
import Generator from '../Components/Generator/Generator';
import Axios from 'axios';

class App extends Component{



  state = {
    show: false,
    btn: 'start'
  }

  // askPg = async () => {
  //   await Axios.get('/SimpleGenerator/user?');
  // }


  render(){
    return(
      <div className="App">
        <Logo/>
        <button onClick={() => !this.state.show ? this.setState({show: true, btn: 'End'}) : this.setState({show:false, btn: 'Start'})}>{this.state.btn}</button>
        {this.state.show ? <Generator/> : null}
        <button>
          Account:
        </button>
      </div>
    );
  }
}

export default App;
