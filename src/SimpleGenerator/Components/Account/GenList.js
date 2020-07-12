import React, { useState } from 'react';
import '../Section.css';

export const updateValue = {type: null, index: null, value: null};

const GenList = (props) => {
    const [state, setState] = useState({edit: false});

    const inputHandler = (e) => {
        console.log(e.target.type);
        let canEdit = state.edit;
        if (e.target.type === 'textarea'){
            canEdit = false;
        }
        setState({edit: !canEdit});
    }

    exportUpdate = (e) =>{
        // take change from text field
        // determine the input type
        // take
    }

    const showText = (
        <div className="toInsert">
            <textarea cols="30" rows="10">
                {props.data}
            </textarea>
            <button onClick={inputHandler}>Insert</button>
        </div>
    );
    return (
        <div className="GenList">
            <div className="GenItemClose" onClick={props.deleteHandler}>X</div>
            <div onClick={inputHandler}>
                {state.edit ? showText : props.data}
            </div>
        </div> 
    );
}

// export default GenList;
export default GenList;