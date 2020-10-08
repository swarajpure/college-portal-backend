import React from 'react';

export default class Login extends React.Component {
    showName = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(this.state)
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
            <div>
                <h1>Login</h1>
            </div>
            <div className="form"></div>
            <form onSubmit={ this.handle }>
                <label>Enter email</label><br></br>
                <input type="text" id="email" onChange={this.handleChange} />
                <br></br>
                <label>Enter password</label><br></br>
                <input type="password" id="password" onChange={this.handleChange} />
                <br></br>
                <button className='submit-btn'>Submit</button>
            </form>
        </div>
    )
    }
}