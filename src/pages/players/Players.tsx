import React from 'react';
import {API} from "../../components/api/api";
import { PlayersResponse} from "../../components/api/api_model";
import {Link} from "react-router-dom";
import {SetBackGround} from "../../components/utils/background";
import {GetLocationQueryParams} from "../../components/utils/utils";
import {PageNav, PageNavValue} from "../../components/utils/page";


class Players extends React.Component {
    state = {
        data: null,
    }

    getData() {
        const query = GetLocationQueryParams()
        const page = isNaN(Number(query['page'])) ? 1 : Number(query['page'])
        const size = isNaN(Number(query['size'])) ? 50 : Number(query['size'])
        API.GetPlayers(page, size).then(value => {
            this.setState({data: value})
        })
    }

    componentWillReceiveProps(nextProps: Readonly<{}>, nextContext: any) {
        this.getData()
    }

    componentDidMount() {
        SetBackGround("")
        this.getData()
    }


    render() {
        return <div>
            {this.renderTable()}
            {this.readerPageNav()}
        </div>
    }

    renderTable() {
        if (this.state.data === null) {
            return (<div></div>)
        }

        let data = this.state.data as PlayersResponse
        if (data.Players === undefined) {
            return (<div></div>)
        }
        let body = []


        for (let i = 0; i < data.Players.length; i++) {
            let titles = []

            const p = data.Players[i]
            if (p.TitlesVal !== undefined && p.TitlesVal !== null) {
                for (let j = 0; j < p.TitlesVal.length; j++) {
                    titles.push(
                        <span className="badge bg-secondary" style={{margin: "0 10px"}}>{p.TitlesVal[j]}</span>
                    )
                }
            }

            body.push(
                <tr key={"player_" + p.ID}>
                    <td>{p.ID}</td>
                    <td><Link to={"https://www.worldcubeassociation.org/persons/" + p.WcaID}>{p.WcaID}</Link></td>
                    <td><Link to={"/player?id=" + p.ID}>{p.Name}</Link></td>
                    <td>{titles}</td>
                </tr>
            )
        }
        return (
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th colSpan={1} style={{width: "50px"}}>序号</th>
                    <th colSpan={1} style={{width: "100px"}}>WCA ID</th>
                    <th colSpan={1} style={{minWidth: "150px"}}>选手</th>
                    <th colSpan={1}>头衔</th>
                </tr>
                </thead>
                <tbody>{body}</tbody>
            </table>
        )
    }


    private readerPageNav() {
        if (this.state.data === null) {
            return (<div></div>)
        }
        const query = GetLocationQueryParams()
        const page = isNaN(Number(query['page'])) ? 1 : Number(query['page'])

        const resp = this.state.data as PlayersResponse
        const p: PageNavValue = {
            Id: "player_page",
            Count: resp.Count,
            CurPage: page,
            Size: 50,
            Link: "/players",
        }
        return PageNav(p)
    }
}

export default Players;