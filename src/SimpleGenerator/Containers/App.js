import React, { Component } from 'react';
import Logo from '../Components/Logo'
import Generator from '../Components/Generator/Generator';
import Axios from 'axios';

class App extends Component{



  state = {
    show: false,
    btn: 'start',
    databaseReq: false
  }

  async componentDidMount(){

    // Axios.get('/SimpleGenerator/user?').then(res =>{
    //   console.log(res);
    // });
    // if (this.state.databaseReq){
    //   const response = await Axios.get('/SimpleGenerator/user?');
    //   console.log(response);
    // }
    console.log(this.state);
    // await Axios.get('/SimpleGenerator/user?');
  }


  render(){
    return(
      <div className="App">
        <Logo/>
        <button onClick={() => !this.state.show ? this.setState({show: true, btn: 'End'}) : this.setState({show:false, btn: 'Start'})}>{this.state.btn}</button>
        {this.state.show ? <Generator/> : null}
        <button onClick={this.setState({databaseReq: true})}>
          Account:
        </button>
      </div>
    );
  }
}

export default App;
