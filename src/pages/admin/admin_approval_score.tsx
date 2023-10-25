import {GetPreScores} from "../../components/api/api_model";
import {callback} from "./admin_score";
import {GetLocationQueryParams} from "../../components/utils/utils";
import {AuthAPI} from "../../components/api/api";
import {CubesCn} from "../../components/cube/cube";
import React, {JSX} from "react";
import {CubeScoreTds} from "../../components/cube/components/cube_score_tabels";
import {Sleep} from "../../components/utils/async";
import {WaitToast} from "../../components/utils/alert";
import {CreateModal, ModalButton} from "../../components/utils/modal";
import {PageNav, PageNavValue} from "../../components/utils/page";
import {CubeIcon} from "../../components/icon/cube_icon";


type AdminApprovalScoreCtx = {
    UpdateHandle: callback,
    DetailID: number,
    PreScores: GetPreScores | null,
}


export class AdminApprovalScoreRender {
    constructor() {
        this.loadPreScoreData().then()
    }

    ctx: AdminApprovalScoreCtx = {
        PreScores: null,
        DetailID: -1,
        UpdateHandle: () => {
        },
    }

    private approval_score_page = "approval_score_page"

    private async loadPreScoreData() {
        const query = GetLocationQueryParams()
        const page = isNaN(Number(query[this.approval_score_page])) ? 1 : Number(query[this.approval_score_page])
        await WaitToast(AuthAPI.GetPreScores(page, 50, false).then(value => {
            this.ctx.PreScores = value
        }), "加载预录入列表", "加载预录入列表成功", "加载预录入失败")
    }


    private scoresPage = () => {

        if (this.ctx.PreScores === null) {
            return <div></div>
        }
        const query = GetLocationQueryParams()
        const page = isNaN(Number(query[this.approval_score_page])) ? 1 : Number(query[this.approval_score_page])


        const p: PageNavValue = {
            Id: this.approval_score_page,
            Count: this.ctx.PreScores.Count,
            PageKey: this.approval_score_page,
            CurPage: page,
            Size: 50,
            Link: "/xadmin?tabs=approval_score",
        }
        return PageNav(p)
    }

    private neglectModelTarget = "neglect_pre_scores"

    private scoresBody = () => {
        if (this.ctx.PreScores === null) {
            return <div></div>
        }
        const preScores = this.ctx.PreScores as GetPreScores
        let items: JSX.Element[] = []

        for (let i = 0; i < preScores.Scores.length; i++) {
            const p = preScores.Scores[i]
            let buttons = (
                <td className="">
                    {ModalButton("不通过", this.neglectModelTarget, () => {
                        this.ctx.DetailID = p.ID
                    }, "btn-warning btn-sm col-md")}
                    <button style={{marginLeft: "20px"}} type="button" className={"btn btn-success btn-sm col-md"} onClick={async () => {
                        await WaitToast(
                            AuthAPI.RecordPreScores(p.ID),
                            "正在写入预录入成绩",
                            "写入预录入成绩成功",
                            "写入预录入成绩失败",
                        )
                        await Sleep(500).then(() => {
                            window.location.reload()
                        })
                    }}>通过
                    </button>
                </td>
            )

            items.push(
                <tr key={"scoresBody_tr" + p.ID}>
                    <td>{p.ID}</td>
                    <td>{p.Source}</td>
                    <td>{p.ContestName}</td>
                    <td>{p.PlayerName}</td>
                    <td>{CubeIcon(p.Project)} {CubesCn(p.Project)}</td>
                    <td>{p.RoundName}</td>
                    {CubeScoreTds(p)}
                    <td>{buttons}</td>
                </tr>
            )
        }

        return (
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>序号</th>
                    <th>来源</th>
                    <th>比赛</th>
                    <th>选手</th>
                    <th>项目</th>
                    <th>轮次</th>
                    <th colSpan={5}>成绩</th>
                    <th>审核</th>
                </tr>
                </thead>
                <tbody>{items}</tbody>
            </table>
        )
    }


    private neglectModal = () => {
        const bodyHandle = () => {

            if (this.ctx.PreScores === null || this.ctx.PreScores.Scores.length === 0) {
                return <div>是否取消该成绩</div>
            }
            if (this.ctx.DetailID === -1) {
                return <div>是否取消该成绩</div>
            }

            let p = this.ctx.PreScores.Scores[0]
            for (let i = 0; i < this.ctx.PreScores.Scores.length; i++) {
                if (this.ctx.PreScores.Scores[i].ID === this.ctx.DetailID) {
                    p = this.ctx.PreScores.Scores[i]
                    break
                }
            }

            return <div>
                <h3>是否取消成绩?</h3>
                <table className="table table-hover table-sm" style={{width: "90%"}}>
                    <thead>
                    <tr key={"neglectModal_key"}>
                        <th>序号</th>
                        <th>来源</th>
                        <th>比赛</th>
                        <th>选手</th>
                        <th>项目</th>
                        <th>轮次</th>
                        <th colSpan={5}>成绩</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={"neglectModal_key" + p.ID}>
                        <td>{p.ID}</td>
                        <td>{p.Source}</td>
                        <td>{p.ContestName}</td>
                        <td>{p.PlayerName}</td>
                        <td>{CubeIcon(p.Project)} {CubesCn(p.Project)}</td>
                        <td>{p.RoundName}</td>
                        {CubeScoreTds(p)}
                    </tr>
                    </tbody>
                </table>
            </div>
        }

        const neglectHandle = async () => {
            await WaitToast(
                AuthAPI.NeglectPreScores(this.ctx.DetailID),
                "等待取消预录入成绩",
                "取消预录入成绩成功",
                "取消预录入成绩失败",
            )
            await Sleep(1000).then(() => {
                window.location.reload()
            })
        }

        return CreateModal("取消", bodyHandle, this.neglectModelTarget, neglectHandle)
    }


    render() {
        return (
            <div style={{marginTop: "30px"}}>
                {this.neglectModal()}
                {this.scoresBody()}
                {this.scoresPage()}
            </div>
        )
    }
}