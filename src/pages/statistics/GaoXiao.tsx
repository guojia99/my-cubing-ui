import {SetBackGround} from "../../components/utils/background";
import React from "react";
import {API} from "../../components/api/api";
import BarChartLoader from "../../components/loading/BarChartLoader";
import {GaoXiaoWCAResult} from "../../components/api/api_model";
import {TabNav, TabNavsPage} from "../../components/utils/tabs";
import {CubeIcon} from "../../components/icon/cube_icon";
import {Cubes} from "../../components/cube/cube_map";
import {Link} from "react-router-dom";
import {CubesCn} from "../../components/cube/cube";

class GaoXiao extends React.Component {
    state = {
        stat: null
    }

    componentDidMount() {
        SetBackGround("")
        API.GetGaoXiaoStatics().then(value => {
            this.setState({stat: value})
        })
    }

    eventList = [
        ["3x3x3Cube", "333"],
        ["2x2x2Cube", "222"],
        ["4x4x4Cube", "444"],
        ["5x5x5Cube", "555"],
        ["6x6x6Cube", "666"],
        ["7x7x7Cube", "777"],
        ["3x3x3Blindfolded", "333bf"],
        ["3x3x3FewestMoves", "333fm"],
        ["3x3x3One-Handed", "333oh"],
        ["Clock", "clock"],
        ["Megaminx", "minx"],
        ["Pyraminx", "pyram"],
        ["Skewb", "skewb"],
        ["Square-1", "sq1"],
        ["4x4x4Blindfolded", "444bf"],
        ["5x5x5Blindfolded", "555bf"],
    ]

    extractContent(input: string): string | null {
        const match = input.match(/\(([^)]+)\)/);
        return match ? match[1] : input;
    }

    getRankStyle(rank: number): React.CSSProperties {
        if (rank <= 3) {
            switch(rank) {
                case 1: return { backgroundColor: 'rgba(237,227,43,0.94)', color: 'black' };    // 冠军
                case 2: return { backgroundColor: 'rgba(232,221,217,0.78)', color: 'black' };  // 亚军
                case 3: return { backgroundColor: 'rgba(248,180,118,0.63)', color: 'black' }; // 季军
            }
        } else if (rank <= 10) {
            return { backgroundColor: 'rgba(131,235,132,0.65)', color: 'black' };  // 前十名
        }
        return {};  // 其他排名不添加任何样式
    }

    resultsTable(Result: GaoXiaoWCAResult[], eid: Cubes): JSX.Element {
        if (Result === undefined || Result.length === 0){
            return <></>
        }
        let bodys: JSX.Element[] = []

        for (let i = 0; i < Result.length; i++){
            const r = Result[i]
            bodys.push(<>
                <tr key={"resultsTableBody_" + i + eid}>
                    <td style={this.getRankStyle(r.BestRank)}>{r.BestRank}</td>
                    <td style={this.getRankStyle(r.BestRank)}>{r.BestStr}</td>
                    <td style={this.getRankStyle(r.BestRank)}><Link to={"https://www.worldcubeassociation.org/persons/" + r.BestPersonWCAID}>{this.extractContent(r.BestPersonName)}</Link></td>
                    <td style={this.getRankStyle(r.AvgRank)}><Link to={"https://www.worldcubeassociation.org/persons/" + r.AvgPersonWCAID}>{this.extractContent(r.AvgPersonName)}</Link></td>
                    <td style={this.getRankStyle(r.AvgRank)}>{r.AvgStr}</td>
                    <td style={this.getRankStyle(r.AvgRank)}>{r.AvgRank > 0? r.AvgRank : ""}</td>
                </tr>
            </>)
        }

        return (
            <>
                <h4 style={{textAlign:"center", marginTop: "10px"}}>{CubesCn(eid)}</h4>
                <table className="table text-center table-striped table-hover" style={{marginTop: "10px"}}>
                    <thead>
                    <tr>
                        <th scope="col">排名</th>
                        <th scope="col" colSpan={2}>单次</th>
                        <th scope="col" colSpan={2}>平均</th>
                        <th scope="col">排名</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bodys}
                    </tbody>
                </table>
            </>
        )
    }

    renderResults(): JSX.Element {
        if (this.state.stat === null) {
            return <BarChartLoader/>
        }

        let tabs: TabNavsPage[] = []
        for (let i = 0; i < this.eventList.length; i++) {
            const eidS = this.eventList[i];
            if (eidS === undefined) {
                continue
            }
            const eid = eidS[0];
            const eName = eidS[1] as Cubes;

            const data = this.state.stat[eid] as GaoXiaoWCAResult[];
            if (data === undefined || data.length === 0) {
                continue
            }

            tabs.push({
                Id: eid,
                Name: (<h6>{CubeIcon(eName)}</h6>),
                Page: this.resultsTable(data, eName),
            })
        }
        return <>
            <TabNav Id={"gx_tabs"} SelectedKey={"gao_tabs_result"} Pages={tabs} Center={true}/>
        </>
    }


    render() {
        return (
            <div>
                <div style={{marginBottom: "40px"}}>
                    <h2 className="text-md-center">
                        广州高校WCA记录排行榜

                        <button className="btn btn-sm btn-light"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#algorithm_analysis"
                                aria-expanded="true"
                                aria-controls="collapseExample">
                            需知
                        </button>
                    </h2>

                    <div className="collapse" id="algorithm_analysis">
                        <div className="card card-body">
                            <ul>
                                <li className="list-item">本排行榜仅记录广州高校群的成员数据</li>
                                <li className="list-item">需要参与排名数据请在高校群里接龙</li>
                                <li className="list-item">本成绩实时更新</li>
                                <li className="list-item">有错误请联系郭嘉</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {this.renderResults()}
            </div>
        )
    }
}

export default GaoXiao;