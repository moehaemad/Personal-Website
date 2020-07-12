import React, { useState } from 'react';
import '../Section.css';

const GenList = (props) => {
    const [state, setState] = useState({edit: false});

    const inputHandler = (e) => {
        let canEdit = state.edit;
        if (e.target.type === 'textarea'){
            canEdit = false;
        }
        setState({edit: !canEdit});
    }

    const exportUpdate = (e) =>{
        // take change from text field
        let valEntered = e.target.value;
        // determine the input type
        const valType = String(Number(valEntered)) === 'NaN' ? 'String' : 'Num';
        // Export the proper value for updating database
        valType === 'String' ? null : Number(valEntered);
        // Since this is functional component, edit property needs to be written redundantly
        const editState = state.edit;
        setState({edit: editState, type: valType, value: valEntered});

    }

    const showText = (
        <div className="toInsert">
            <textarea cols="30" rows="10" onChange={exportUpdate}>
                {props.data}
            </textarea>
            <button onClick={()=>props.updateHandler(state.type, props.keyProp, state.value)}>Insert</button>
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

export default GenList;