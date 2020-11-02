import React from 'react';

export default class Login extends React.Component {
    handleSubmit = (e) => {
        console.log(this.state)
        e.preventDefault();
        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(this.state)
        }).then(res => console.log(res))
        .catch(function(err){console.log(err)})
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render(){
    return(
        <div className="container">
            <div>
                <h1>Login</h1>
            </div>
            <div className="form"></div>
            <form onSubmit={ this.handleSubmit }>
                <label>Enter email</label><br></br>
                <input type="text" id="email" onChange={this.handleChange} />
                <br></br>
                <label>Enter password</label><br></br>
                <input type="password" id="password" onChange={this.handleChange} />
                <br></br>
                <label>Enter role</label><br></br>
                <input type="radio" id="role" value="student" onChange={this.handleChange} />
                <label htmlFor="role">Student</label>
                <input type="radio" id="role" value="teacher" onChange={this.handleChange} />
                <label htmlFor="role">Teacher</label>
                <br></br>
                <button className='submit-btn'>Submit</button>
            </form>
        </div>
    )
    }
}