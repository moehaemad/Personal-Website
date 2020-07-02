import React from 'react';
import '../Section.css';

const RanNum = (props) => {
    const [state, setState] = React.useState({open: false});

    let values = {
        length: 0,
        start: 1,
        end: 10
    }

    try{
        values = {
            length: state.values,
            start: state.start,
            end: state.end
        };
    }catch(err){
        console.log(err)
    }

    const toggleWindow = () => {
        state.open ? setState({open: false}) : setState({open:true});
    }

    const options = () => {
        return (
            <div>
                <p>Enter Start</p>
                <input type="number" onChange={(e) => values.start = e.target.value}/>
                <p>Enter End</p>
                <input type="number" onChange={(e) => values.end = e.target.value} />
                <button onClick={outputNumber}>Submit</button>
                <p>{state.output}</p>
            </div>
        );
    }

    const outputNumber = () => {
        values.output = Math.floor(Math.random()*values.end + values.start);
        //re-render the component
        setState({
            open: true,
            output: values.output,
            length: values.length,
            start: values.start,
            end: values.end
            });
    }

    return (
        <div className='Output'>
            <div className='Title'>
                <h2>
                    Random Number
                </h2>
                <button className='Close' onClick={toggleWindow}>{state.open ? 'X' : 'O'}</button>
            </div>
            {state.open ? options() : null}
        </div>
    );

}
export default RanNum;