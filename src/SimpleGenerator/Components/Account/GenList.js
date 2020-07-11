import React from 'react';
import '../Section.css';

const GenList = (props) => {
    return(
        <div className="GenList">
            <div className="GenItemClose" onClick={props.deleteHandler}>X</div>
            <div>{props.data}</div>
        </div>
    );
}

export default GenList;