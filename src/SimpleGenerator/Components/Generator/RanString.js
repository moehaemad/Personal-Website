import React, { Component } from 'react';
import '../Section.css';


class RanString extends Component {

    state = {
        open: true,
        capital: false,
        special: false,
        number: false,
        output: '',
        length: 5
    }

    toggleWindow = () => {
        this.state.open ? this.setState({open: false}) : this.setState({open: true});
    }

    changeValues = (e, type) => {
        const checked = e.target.checked;
        if (type === 'capital') this.setState({capital: checked});
        if (type === 'special') this.setState({special: checked});
    }
    
    pickAtRandom = (size) => {
        let toReturn = [];
        for (let i=0; i<this.state.length; i++){
            toReturn.push(Math.floor(Math.random()*(size-1)));
        }
        return toReturn;
    }

    createString = () => {
        const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        const special = [`!`, `"`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `@`, `^`, `_`, `{`, `}`, `~`];
        const ABC = abc.map(el => el.toUpperCase());
        const num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let full = abc;
        let toReturn = [];

        const concat = (toConcat) => full = full.concat(toConcat);

        if (this.state.capital) concat(ABC);
        if (this.state.special) concat(special);
        if (this.state.number) concat(num);

        let indexes = this.pickAtRandom(full.length);
        indexes.forEach((el) => {
            toReturn.push(full[el]);
        });

        this.setState({output: toReturn.join('')});
    }

    options = () => {

        return (
            <div className='Options'>
                <label><input type="checkbox" onChange={(e) => this.setState({capital: e.target.checked})}/> include capital letters</label>
                <label><input type="checkbox" onChange={(e) => this.setState({special: e.target.checked})}/> special characters</label>
                <label><input type="checkbox" onChange={(e) => this.setState({number: e.target.checked})}/> Numbers</label>
                <label>Length: <input type="number" onChange={(e)=> {
                    this.setState ({length: e.target.value});
                }} placeholder="Default: 5"/></label>
            </div>
        );
    }

    render() {
        const output = this.state.output;

        return (
            <div className='Output'>
                <div className='Title'>
                    <h2>
                        Random String
                    </h2>
                    <button className='Close' onClick={this.toggleWindow}>{this.state.open ? 'X' : 'O'}</button>
                </div>
                {this.state.open ? this.options() : null}
                <div className='Submit'>
                    <button onClick={(e) => this.createString()}>Submit</button>
                    <button className='Clipboard' onClick={() => navigator.clipboard.writeText(this.state.output)}>
                        Copy
                    </button>
                </div>
                <p>
                    {output}
                </p>
            </div>
        );
    }
}

export default RanString;