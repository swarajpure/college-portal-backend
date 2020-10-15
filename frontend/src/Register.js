import React from 'react';
import './common.css';

export default class Register extends React.Component {
    showName = (e) => {
        console.log(JSON.stringify(this.state))
        e.preventDefault();
        fetch('http://localhost:3000/users/register', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => console.log(res))
        .catch(function(err){
            console.log(err);
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render(){
    return(
        <div className="container">
            <div className="title">
                <h1>Register</h1>
            </div>
            <div className="form">
                <form onSubmit={ this.showName }>
                    <label>Enter name</label><br></br>
                    <input type="text" id="name" required minLength="6" onChange={this.handleChange} />
                    <br></br>
                    <label>Enter email</label><br></br>
                    <input type="email" id="email" required onChange={this.handleChange} />
                    <br></br>
                    <label>Enter password</label><br></br>
                    <input type="password" id="password" required minLength="6" onChange={this.handleChange} />
                    <br></br>
                    <label>Enter role</label><br></br>
                    <input type="radio" id="role" value="student" onChange={this.handleChange} />
                    <label htmlFor="role">Student</label>
                    <input type="radio" id="role" value="teacher" onChange={this.handleChange} />
                    <label htmlFor="role">Teacher</label>
                    <br></br>
                    <button className='submit-btn'>Submit</button>
                    <div className="displayResponse"></div>
                </form>
            </div>
        </div>
    )
    }
}