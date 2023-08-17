import './auth.css'

import React from 'react';
import {AuthAPI} from "../../components/api/api";


class Auth extends React.Component {
    inputUserId = "input_user"
    inputPassword = "input_password"

    componentDidMount() {
        if (AuthAPI.IsAuth()) {
            window.location.href = "/xadmin"
        }
        this.setState({})
    }
    auth() {
        const user = document.getElementById(this.inputUserId) as HTMLElement
        const password = document.getElementById(this.inputPassword) as HTMLElement
        console.log(user,password)
    }

    render() {
        return <div className="row">
            <div className="col-md-2 col-lg-3"></div>
            <form className="form-horizontal col-md-8 col-sm-12 col-lg-6">
                <span className="heading">登录</span>
                <div className="form-group">
                    <input type="text" className="form-control" id={this.inputUserId}  placeholder="帐号"></input>
                    <i className="bi bi-person-fill"></i>
                </div>
                <div className="form-group help">
                    <input type="password" className="form-control" id={this.inputPassword} placeholder="密码"></input>
                    <i className="bi bi-person-fill-lock"></i>
                    <a href="#" className="fa fa-question-circle"></a>
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-default" onClick={this.auth}>登录</button>
                </div>
            </form>
            <div className="col-md-2 col-lg-3"></div>
        </div>
    }
}


export default Auth;