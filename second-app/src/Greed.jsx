import React, { Component } from 'react';

class Greed extends Component {
  
    constructor(props) {
        super(props);

        this.state={
            name: "John"
        };  
    }

    changename=()=>
    {
        this.setState({name:"pawan"});
    }
  

    render() {
        return (
            <div>
<h1>hello  {this.state.name}</h1>    
<button onClick={this.changename}>change</button> 
            </div>
        );
    }
}


export default Greed;

