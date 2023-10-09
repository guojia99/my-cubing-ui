import React from "react";
import {SetBackGround} from "../../components/utils/background";
import {API} from "../../components/api/api";
import {GetRelativeSor, RelativeSor} from "../../components/api/api_model";
import {TabNav, TabNavsPage} from "../../components/utils/tabs";
import {RelativeSorTable, SorKeys} from "../../components/cube/components/cube_sor";


class RelativeSorPage extends React.Component {
    state = {
        data: null,
    }

    componentDidMount() {
        SetBackGround("")
        API.GetRelativeSor().then(value => {
            this.setState({data: value})
        })
    }

    render() {
        if (this.state.data === null) {
            return <div></div>
        }
        const data = this.state.data as GetRelativeSor
        let tabs: TabNavsPage[] = []
        SorKeys.forEach((value, key) => {
            const sor = data[key] as RelativeSor[]
            if (sor === undefined) {
                return
            }

            tabs.push({
                Id: key,
                Name: (<h6>{value}</h6>),
                Page: RelativeSorTable(sor, value),
            })
        })
        return (
            <div>
                <div style={{marginBottom: "40px"}}>
                    <h2 className="text-md-center">
                        能力成绩分数排名
                        <button className="btn btn-sm btn-light"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#algorithm_analysis"
                                aria-expanded="true"
                                aria-controls="collapseExample">
                            算法
                        </button>
                    </h2>

                    <div className="collapse" id="algorithm_analysis">
                        <div className="card card-body">
                            <ul>
                                <li className="list-item">算法设计由 兔兔 提供.</li>
                                <li className="list-item">本算法单项目各自算分的方式， 并累加各个项目的项目分实现</li>
                                <li className="list-item">计时项目:  ((gr最佳 + 1 / 个人最佳 + 1)  + (gr平均 + 1  / 个人平均最佳 + 1)) * 10 </li>
                                <li className="list-item">计数项目:  (个人最佳分 + 1 / gr分 + 1 )  * gr个数</li>
                            </ul>
                        </div>
                    </div>
                </div>


                <TabNav Id={"r_sor_tabs"} SelectedKey={"r_sor_tabs"} Pages={tabs} Center={true}/>
            </div>
        )
    }
}




export default RelativeSorPage;