import './admin.css'

import React from 'react';
import {AuthAPI} from "../../components/api/api";


class Admin extends React.Component {
    componentDidMount() {
        if (!AuthAPI.IsAuth()) {
            window.location.href = "/xauth"
            return
        }
    }

    loginOut() {
        AuthAPI.DeleteToken()
        window.location.href = "/xauth"
        return
    }


    demoSelect() {
        return (
            <select className="form-select" aria-label="Default select example">
                <option selected>测试选择框</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        )
    }

    renderPenaltyDescription() {
        return (
            <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">浩浩没有女装</div>浩浩需要女装才可以比赛,不然+2
                    </div>
                    <span className="badge text-bg-info">4</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">浩浩没有女装</div>浩浩需要女装才可以比赛,不然+2
                    </div>
                    <span className="badge text-bg-warning">6</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">浩浩没有女装</div>浩浩需要女装才可以比赛,不然+2
                    </div>
                    <span className="badge text-bg-danger">8</span>
                </li>
            </ol>
        )
    }

    renderScoreTable() {
        return (
            <table className="table table-bordered text-center table-hover table-responsive" style={{verticalAlign: "text-top"}}>
                <thead>
                <tr>
                    <th colSpan={20}>成绩录入</th>

                </tr>
                </thead>

                <tfoot>
                   <tr>
                       <td colSpan={10} style={{textAlign: "right"}}>
                           <button type="button" className="btn btn-sm btn-danger">删除</button>
                           <button type="button" className="btn btn-sm btn-success" style={{marginLeft: "10px"}}>提交</button>
                       </td>
                   </tr>
                </tfoot>
                <tbody>
                <tr>
                    <td>选手</td>
                    <td colSpan={2}>{this.demoSelect()}</td>
                    <td>比赛</td>
                    <td colSpan={2}>{this.demoSelect()}</td>

                </tr>
                <tr>
                    <td>项目</td>
                    <td colSpan={2}>{this.demoSelect()}</td>
                    <td>轮次</td>
                    <td colSpan={2}>{this.demoSelect()}</td>
                    <td>打乱序</td>
                    <td colSpan={2}>{this.demoSelect()}</td>
                </tr>
                <tr>
                    <td colSpan={10}>成绩单</td>

                </tr>
                <tr>
                    <td>序号</td>
                    <td>录入成绩</td>
                    <td colSpan={6}>判罚</td>
                    <td>最终成绩</td>
                </tr>

                {/*下列内容动态生成*/}

                <tr>
                    <td>1</td>
                    <td><input type="text" className="input-group-text" defaultValue={1.1}/></td>
                    <td colSpan={6}>
                        {<span className="badge text-bg-danger">8</span>}
                    </td>
                    <td>{1.3}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td><input type="text" className="input-group-text" defaultValue={1.1}/></td>
                    <td colSpan={6}>
                        {<span className="badge text-bg-danger">8</span>}
                    </td>
                    <td>{1.3}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td><input type="text" className="input-group-text" defaultValue={1.1}/></td>
                    <td colSpan={6}>
                        {<span className="badge text-bg-danger">8</span>}
                    </td>
                    <td>{1.3}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td><input type="text" className="input-group-text" defaultValue={1.1}/></td>
                    <td colSpan={6}>
                        {<span className="badge text-bg-warning">6</span>}
                        {<span className="badge text-bg-danger">8</span>}
                    </td>
                    <td>{1.3}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td><input type="text" className="input-group-text" defaultValue={1.1}/></td>
                    <td colSpan={6}>
                        {<span className="badge text-bg-danger">8</span>}
                    </td>
                    <td>{1.3}</td>
                </tr>

                {/*固定内容*/}
                </tbody>
            </table>
        )
    }

    render() {
        return (<div>
            <button type="button" className="btn btn-sm btn-danger login-out-btn" onClick={this.loginOut}>
                退出登录
            </button>

            {this.renderScoreTable()}
            {this.renderPenaltyDescription()}
        </div>)

    }
}


export default Admin;