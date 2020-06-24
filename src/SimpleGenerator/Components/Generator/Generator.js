import React, {Component} from 'react';
import './Generator.css';
import RanNum from './RanNum';
import RanString from './RanString';

class Generator extends Component {

    state = {
        num: 0,
        numStart: 1,
        numEnd: 10,
        numLength: 10,
        string: ''
    }

    render (){
        return (
            <div className="Output">
                <RanString/>
                <RanNum/>
            </div>
        );
    }
}


export default Generator;