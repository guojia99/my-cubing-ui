import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthAPI} from "../../components/api/api";



class Admin extends React.Component{
    componentDidMount() {
        if (!AuthAPI.IsAuth()){
            window.location.href = "/xauth"
            return
        }
    }
    render() {
        return <div>admin</div>;
    }
}


export default Admin;