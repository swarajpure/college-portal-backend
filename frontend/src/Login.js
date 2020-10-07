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
        // fetch('http://localhost:3000/users/get')
        // .then(res => res.json())
        // .then(res => console.log(res))
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render(){
    return(
        <div>
            <form onSubmit={ this.showName }>
                <label>Enter email</label>
                <input type="text" id="email" onChange={this.handleChange}></input>
                <label>Enter password</label>
                <input type="text" id="password" onChange={this.handleChange} />
                <button>Submit</button>
            </form>
        </div>
    )
    }
}