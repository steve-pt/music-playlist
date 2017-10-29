import React from 'react';
import { Redirect } from 'react-router-dom'
import Box from '../boxComponent/box';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            redirectToReferrer: false
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    login() {
        if (this.state.username) {
            let usersURL = 'http://localhost:8080/api/users';

            fetch(usersURL)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Server response wasn't OK");
                    }
                })
                .then((responseData) => {
                    responseData.map((user) => {
                        if (user.email === this.state.username) {
                            sessionStorage.setItem("isUserLogged", true);
                            sessionStorage.setItem('userData',JSON.stringify(user));
                            this.setState({redirectToReferrer: true});
                        }
                        return this.state.redirectToReferrer;
                    });

                    if(!sessionStorage.getItem('isUserLogged'))
                        alert("Email não encontrado!");
                    
                })
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
            return (<Redirect to={'/favorites'} />)
        }
        return (
            <div className="login">
                <Box title="Login" closeBtn={true} content={this.renderForm()} />
            </div>
        );
    }
    renderForm() {
        return (
            <div className="form">
                <label>Email</label>
                <input type="text" className="input" name="username" placeholder="Email" onChange={this.onChange} />
                <input type="submit" className="button" value="Login" onClick={this.login} />


            </div>
        )
    }
}
