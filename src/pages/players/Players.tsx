import React from 'react';
import {API} from "../../components/api/api";
import {PlayersResponse} from "../../components/api/api_model";
import {Link} from "react-router-dom";


class Players extends React.Component{
    state = {
        data: null,
    }

    componentDidMount() {
        API.GetPlayers().then(value => {
            this.setState({data: value})
            console.log(value)
        })
    }

    render() {
        if (this.state.data === null){
            return (<div></div>)
        }

        let data = this.state.data as PlayersResponse
        if (data.Players === undefined){
            return (<div></div>)
        }
        let body = []


        for (let i = 0; i < data.Players.length; i++){
            let titles = []

            if (data.Players[i].TitlesVal !== undefined && data.Players[i].TitlesVal !== null){
                for (let j = 0; j < data.Players[i].TitlesVal.length; j++){
                    titles.push(
                        <span className="badge bg-secondary" style={{margin:"0 10px"}}>{data.Players[i].TitlesVal[j]}</span>
                    )
                }
            }

            body.push(
                <tr key={"player_" + data.Players[i].ID}>
                    <td>{i + 1}</td>
                    <td><Link to={"https://www.worldcubeassociation.org/persons/" + data.Players[i].WcaID}>{data.Players[i].WcaID}</Link></td>
                    <td><Link to={"/player?id=" + data.Players[i].ID}>{data.Players[i].Name}</Link></td>
                    <td>{titles}</td>
                </tr>
            )
        }
        return (
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th colSpan={1} style={{width:"50px"}}>序号</th>
                    <th colSpan={1} style={{width:"100px"}}>WCA ID</th>
                    <th colSpan={1} style={{minWidth: "150px"}}>选手</th>
                    <th colSpan={1}>头衔</th>
                </tr>
                </thead>
                <tbody>{body}</tbody>
            </table>
        )
    }
}
export default Players;