import React, { Component } from 'react';
import logo from './logo.svg';
import Dropzone from 'react-dropzone'
import axios from 'axios'
import './App.css';
import AssignmentCard from './components/AssignmentCard'

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      files:[],
      allData:[],
      assignments:[],
      arrivalsNumbers: [],
      arrivalsEmails:[],
      departuresNumbers: [],
      departuresEmails:[],      
    }

  }
  onDrop(accepted, rejected){
    this.setState({files: accepted}, () =>{
        let data = new FormData()
          data.append('files', this.state.files[0])
          data.append('files', this.state.files[1])
          data.append('files', this.state.files[2])
        axios.post('http://localhost:3001/housekeeping', data)
      .then((response) =>{
        console.log(response)        
        const data = response.data
        const arrivals = data.filter((d)=>{
          return d.status === 'Arr' && d.turnover === false
        }).map((d2) =>{
          return {cabin:d2.cabin, status:d2.status, linens: d2.linensNumber}
        })
        const strictDeparts = data.filter((d)=>{
          return d.status === 'Dep' && d.turnover === false
        }).map((d2) =>{
          return {cabin:d2.cabin, status:d2.status, linens: d2.linensNumber}
        })
        const tos = data.filter((d)=>{
          return d.status === 'Arr' && d.turnover === true
        }).map((d2) =>{
          return {cabin:d2.cabin, status:'T.O.', linens: d2.linensNumber}
        })
        const arrivalsNumbers = data.filter((d)=>{
          return d.status === 'Arr'
        }).map((d2) =>{
          return {number: d2.number}
        })
        const arrivalsEmails= data.filter((d)=>{
          return d.status === 'Arr'
        }).map((d2) =>{
          return {email: d2.email}
        })
        const departuresNumbers= data.filter((d)=>{
          return d.status === 'Dep'
        }).map((d2) =>{
          return {number: d2.number}
        })
        const departuresEmails= data.filter((d)=>{
          return d.status === 'Dep'
        }).map((d2) =>{
          return {email: d2.email}
        })
       // console.log(arrivals, strictDeparts, tos)
        this.setState({
          allData: data,
          assignments: [...arrivals, ...strictDeparts, ...tos],
          arrivalsNumbers,
          arrivalsEmails,
          departuresNumbers,
          departuresEmails,         
        }, ()=>{
          console.log(this.state)
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    })
  }
  
  render() {
    return (
      <div>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>New Housekeeping App</h2>
        </div>
      </div>
      
      <div className="center">
        <Dropzone onDrop={this.onDrop} className="dropzone-box">
          <div className="dropzone-text">Dropzone</div>
        </Dropzone>
      </div>
        {this.state.assignments.map((assignment, index)=>{
         return  <AssignmentCard assignment={assignment} key={index}/>
        })}
      </div>
    );
  }
}

export default App;
