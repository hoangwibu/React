import React from 'react';

class form extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value:''
        }
    };
    handleChange = (e) =>{
        this.setState({value:e.target.value});

    }
    render(){
        return (
            <label>
                name:
                <input type='text' value={this.state.value} onChange={this.handleChange}/>
            </label>
        )
    }
    
}
// ReactDOM.render()
export default form;
