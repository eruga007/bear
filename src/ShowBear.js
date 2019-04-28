import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
const URL = 'http://localhost:8000/api/bears'

class ShowBear extends Component {

  constructor(props){
      super(props)
      this.state = { data : {}, bearName: ""}
  }

  fetchBear = () => {
    axios.get(URL)
      .then(response => {
        this.setState({data : response.data})
    })
  }

  createBear = () => {
    let new_value =   {
      name: this.state.bearName
    }
    axios.post(URL, new_value).then(response => {
        this.fetchBear()
    })
    this.setState({bearName: ''});
  }

  componentDidMount = () =>{
    this.fetchBear()
  }
    
  onBearNameChanged = (e) => {
    this.setState({bearName: e.target.value});
  }

  deleteBear(id) {
    let url = URL + `/${id}`
    console.log(url)
    axios.delete(URL + `/${id}`).then(response => {
      this.fetchBear()
    })
  }  

  renderBears = () => {
    return _.map(this.state.data, bear => {
        return (
            <li key={bear.id}>
              id : {bear.id} , name : {bear.name}
              <button onClick={() => this.deleteBear(bear.id)}>X</button>
            </li>
        )
    })
  }

  renderCreateBear(){
    return (
        <div>
          <input value={this.state.bearName} onChange={this.onBearNameChanged}></input>
          <button onClick={this.createBear}>create Bear!!!</button>
        </div>
    )
  }
  
  render() {
    return (
      <div>
        { this.renderCreateBear() }
        <h1>BearProfile</h1>
        <ul>
          {this.renderBears()}
        </ul>     
      </div>
      );
    }
}
 
export default ShowBear;
