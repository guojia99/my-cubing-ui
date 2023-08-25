import './auth.css'

import React from 'react';
import {AuthAPI} from "../../components/api/api";



async function auth() {
    const user = document.getElementById("input_user") as HTMLInputElement
    const password = document.getElementById("input_password") as HTMLInputElement
    await AuthAPI.GetToken(user.value, password.value).then(value => {
        if (AuthAPI.IsAuth()) {
            window.location.href = "/xadmin"
            return
        }
        alert("帐号密码错误")
        password.value = ""
    })
}

class Auth extends React.Component {
    componentDidMount() {
        if (AuthAPI.IsAuth()) {
            window.location.href = "/xadmin"
            return
        }
        this.setState({})
    }

    async checkKeyUpEvent(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.code === "Enter") {
            await auth()
        }
    }

    render() {
        return (
            <div className="row" onKeyDown={this.checkKeyUpEvent}>
                <div className="col-md-2 col-lg-3"></div>
                <form className="form-horizontal col-md-8 col-sm-12 col-lg-6">
                    <span className="heading">登录</span>
                    <div className="form-group">
                        <input type="text" className="form-control" id="input_user" placeholder="帐号"></input>
                        <i className="bi bi-person-fill"></i>
                    </div>
                    <div className="form-group help">
                        <input type="password" className="form-control" id="input_password" placeholder="密码"></input>
                        <i className="bi bi-person-fill-lock"></i>
                    </div>
                    <div className="form-group">
                        <input type="button" className="btn btn-default" onClick={auth} value="登录"></input>
                    </div>
                </form>
                <div className="col-md-2 col-lg-3"></div>
            </div>
        )
    }
}


export default Auth;