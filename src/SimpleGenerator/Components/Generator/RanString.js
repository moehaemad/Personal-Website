import React from 'react';
import './Generator.css';
const RanString = () => {
    const [state, setState] = React.useState({
        open: true,
        capital: false,
        special: false,
        ouput: ''
    });

    const toggleWindow = () => {
        state.open ? setState({open: false}) : setState({open:true});
    }

    const changeValues = (e, type) => {
        const checked = e.target.checked;
        const prevState = state;
        if (type === 'capital') setState({open: prevState.open, capital: checked, special: prevState.special});
        if (type === 'special') setState({open: prevState.open, capital: prevState.capital, special: checked});
    }
    
    const pickAtRandom = (size) => {
        const length = 10;
        let toReturn = [];
        for (let i=0; i<=length; i++){
            toReturn.push(Math.floor(Math.random()*(size-1)));
        }
        return toReturn;
    }

    const createString = () => {
        const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        const special = [`!`, `"`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `]`, `@`, `^`, `_`, `{`, `}`, `~`];
        const ABC = abc.map(el => el.toUpperCase());
        let full = []
        let toReturn = [];
        if (state.capital) full = full.concat(abc, ABC);
        if (state.special) full = full.concat(special);

        let indexes = pickAtRandom(full.length);
        // console.log(indexes);
        indexes.forEach((el) => {
            console.log(full[el])
            // let toPush = full[el];
            toReturn.push(full[el]);
        });
        return (
            <div>
                <p>{toReturn}</p>
            </div>
        );
    }

    const options = () => {

        // const output = createString();

        return (
            <div className="Options">
                {/* <input type="checkbox" id="something"/> */}
                <label><input type="checkbox" onChange={(e) => changeValues(e, 'capital')}/> include capital letters</label>
                <label><input type="checkbox" onChange={(e) => changeValues(e, 'special')}/> special characters</label>
                <label>Length: <input type="number"/></label>
                {/* {output} */}
            </div>
        );
    }

    return (
        <div className="Output">
            <div className="Title">
                <h2>
                    Random String
                </h2>
                <button className="Close" onClick={toggleWindow}>{state.open ? 'X' : 'O'}</button>
            </div>
            {state.open ? options() : null}
            {createString()}
        </div>
    );
}

export default RanString;