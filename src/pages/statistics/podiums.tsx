import React, {JSX} from "react";
import {API} from "../../components/api/api";
import {Podiums} from "../../components/api/api_model";
import {Link} from "react-router-dom";
import {SetBackGround} from "../../components/utils/background";
import TableLoader from "../../components/loading/DashboardLoader";

class PodiumsPage extends React.Component {

    state = {
        data: null,
    }

    componentDidMount() {
        SetBackGround("")
        API.GetBestPodium().then(value => {
            this.setState({data: value})
        })
    }

    render() {
        if (this.state.data === null) {
            return <TableLoader/>
        }

        const pds: Podiums[] = this.state.data as Podiums[]
        if (pds === undefined) {
            return <TableLoader/>
        }

        let items: JSX.Element[] = []
        // todo 可以显示详细的内容
        for (let i = 0; i < pds.length; i++) {
            items.push(
                <tr key={"podiums_" + i}>
                    <td>{i + 1}</td>
                    <td><Link to={"/player?id=" + pds[i].Player.ID}>{pds[i].Player.Name}</Link></td>
                    <td>{pds[i].Gold}</td>
                    <td>{pds[i].Silver}</td>
                    <td>{pds[i].Bronze}</td>
                </tr>
            )
        }

        return (
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>序号</th>
                    <th>选手</th>
                    <th>金</th>
                    <th>银</th>
                    <th>铜</th>
                </tr>
                </thead>
                <tbody>{items}</tbody>
            </table>
        )
    }
}

export default PodiumsPage;