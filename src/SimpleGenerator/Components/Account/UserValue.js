import React, { useState } from 'react';
// This component is to insert values into the database with the respective user

const UserValue = (props) => {
    const [state, setState] = useState({
        insertValue: '',
        num: -1,
        string: ''
    });
    // the state hook requires a complete re-iteration of the state properties instead of overwriting, hence state.num & state.string.
    const toInsert = (e) => setState({insertValue: e.target.value, num: state.num, string: state.string});

    return (
        <div className="toInsert">
            <p>Insert:</p>
            <input type="text" onChange={toInsert}/>
            <button onClick={() => props.insertHandler(state.insertValue)}>Insert</button>
        </div>
    );
}

export default UserValue;