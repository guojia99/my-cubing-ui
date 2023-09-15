import {CreateContestRequest, CreateContestRequestRound, GetContestsResponse} from "../../components/api/api_model";
import React, {JSX} from "react";
import {Link} from "react-router-dom";
import {ContestTypeCn, convertDateString} from "../contests/Contests";
import {CreateModal, EmptyHandle, ModalButton} from "../../components/utils/modal";
import {callback} from "./admin_score";
import {AuthAPI} from "../../components/api/api";
import {AllProjectList, CubesCn, WCAProjectMap} from "../../components/cube/cube";
import {GetCubeIcon} from "../../components/cube/icon/cube_icon";

export type AdminContestDataCtx = {
    Contests: GetContestsResponse | null,
    EndContestID: number,

    UpdateHandle: callback,
}


const createContestTarget = "create_contest"
const endContestTarget = "end_contest"

const renderContestList = (ctx: AdminContestDataCtx) => {
    if (ctx.Contests === null) {
        return <div></div>
    }

    let items: JSX.Element[] = []
    for (let i = 0; i < ctx.Contests.Contests.length; i++) {
        const c = ctx.Contests.Contests[i]

        let bt = <>已结束</>
        if (!c.Contest.IsEnd) {
            bt = ModalButton("结束", endContestTarget, () => {
                ctx.EndContestID = c.Contest.ID
                ctx.UpdateHandle({ContestRenderEndContestID: c.Contest.ID})
            }, "btn-danger btn-sm")
        }

        items.push(
            <tr key={"renderContestList_item_contest" + c.Contest.ID}>
                <td>{convertDateString(c.Contest.StartTime)}</td>
                <td>{convertDateString(c.Contest.EndTime)}</td>
                <td>{ContestTypeCn(c.Contest.Type)}</td>
                <td><Link to={"/contest?id=" + c.Contest.ID}>{c.Contest.Name}</Link></td>
                <td>{bt}</td>
            </tr>
        )
    }

    return (
        <table className="table text-center table-striped table-hover">
            <thead>
            <tr>
                <th scope="col">开始时间</th>
                <th scope="col">结束时间</th>
                <th scope="col">形式</th>
                <th scope="col">比赛名称</th>
                <th scope="col">操作</th>
            </tr>
            </thead>
            <tbody>
            {items}
            </tbody>
        </table>
    )
}


const GetEndModal = (ctx: AdminContestDataCtx) => {
    const bodyHandle = () => {
        return <div>
            <h3>是否结束比赛?</h3>
            <p>结束比赛将无法再记录成绩</p>
        </div>
    }

    const endContestHandle = () => {
        AuthAPI.EndContest(ctx.EndContestID).then(() => {
            alert("结束成功")
        }).catch(() => {
            alert("结束失败")
        }).finally(() => {
            window.location.reload()
        })
    }

    return CreateModal("结束", bodyHandle, endContestTarget, endContestHandle)
}

const GetCreateContestModal = (ctx: AdminContestDataCtx) => {


    const inputNameID = "create_contest_inputNameID"
    const inputDescriptionID = "create_contest_inputDescriptionID"
    const inputTypeID = "create_contest_inputTypeID"

    const roundKeyRoundNumber = "round_number_"
    const roundKeyRoundEnable = "open_pj_"
    const roundKeyRoundAutoUpsets = "auto_upsets_"

    const bodyHandle = () => {


        let items: JSX.Element[] = []

        const allWca = WCAProjectMap()
        const allPj = AllProjectList()
        for (let i = 0; i < allPj.length; i++) {
            const pj = allPj[i]
            items.push(
                <tr key={"create_contest_pj_item_" + pj}>
                    <td>{GetCubeIcon(pj)} {CubesCn(pj)}</td>
                    <td>
                        <div>
                            <select className="form-select" id={roundKeyRoundNumber + pj} defaultValue="1">
                                <option value="1">单轮赛(初赛)</option>
                                <option value="2">双轮赛(初赛、决赛)</option>
                                <option value="3">三轮赛(初赛、复赛、决赛)</option>
                            </select>
                        </div>
                    </td>
                    <td>
                        <input className="form-check-input" type="checkbox" id={roundKeyRoundEnable + pj} defaultChecked={allWca.get(pj) !== undefined}/>
                    </td>
                    <td>
                        <input className="form-check-input" type="checkbox" id={roundKeyRoundAutoUpsets + pj}/>
                    </td>
                </tr>
            )
        }


        return (
            <div key={"create_inputs"}>
                <div className="mb-3">
                    <label htmlFor={inputNameID} className="form-label">比赛名称</label>
                    <input type="text" className="form-control" id={inputNameID}/>
                </div>
                <div className="mb-3">
                    <label htmlFor={inputDescriptionID} className="form-label">备注</label>
                    <input type="text" className="form-control" id={inputDescriptionID}/>
                </div>
                <div className="mb-3">
                    <label htmlFor={inputTypeID} className="form-label">比赛形式</label>
                    <select className="form-select" id={inputTypeID} defaultValue="online">
                        <option value="online">线上</option>
                        <option value="offline">线下</option>
                        <option value="official">线下正式</option>
                    </select>
                </div>


                <div className="mb-3">
                    <table className="table text-center table-striped table-hover">
                        <thead>
                        <tr>
                            <th scope="col">项目</th>
                            <th scope="col">轮次</th>
                            <th scope="col">是否开设</th>
                            <th scope="col">自动打乱(暂不支持)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items}
                        </tbody>
                    </table>
                </div>
            </div>
        )
        // todo 时间选择器

        //              <div className="mb-3">
        //                     <div className="input-daterange input-group" id="datepicker">
        //                         <input type="text" className="input-sm form-control" name="start" />
        //                         <span className="input-group-addon">to</span>
        //                         <input type="text" className="input-sm form-control" name="end" />
        //                     </div>
        //                 </div>
    }

    const createContestHandle = () => {
        const rounds: CreateContestRequestRound[] = []
        const roundKeyMap1: Map<number, string> = new Map([
            [0, "单轮赛"]
        ])
        const roundKeyMap2: Map<number, string> = new Map([
            [0, "初赛"],
            [1, "决赛"],
        ])
        const roundKeyMap3: Map<number, string> = new Map([
            [0, "初赛"],
            [1, "复赛"],
            [2, "决赛"],
        ])
        const allPj = AllProjectList()
        for (let i = 0; i < allPj.length; i++) {
            const pj = allPj[i]
            const enable = document.getElementById(roundKeyRoundEnable + pj) as HTMLInputElement
            if (!enable.checked) {
                continue
            }
            const roundNumbers = document.getElementById(roundKeyRoundNumber + pj) as HTMLSelectElement
            let km = roundKeyMap1
            switch (roundNumbers.selectedIndex) {
                case 1:
                    km = roundKeyMap2
                    break
                case 2:
                    km = roundKeyMap3
                    break
            }

            for (let i = 0; i <= roundNumbers.selectedIndex; i++) {
                rounds.push(
                    {
                        Project: pj,
                        Number: i + 1,
                        Part: 1, // todo 打乱
                        Name: CubesCn(pj) + km.get(i),
                        IsStart: true,
                        Final: i === roundNumbers.selectedIndex,
                        Upsets: [] // todo 打乱
                    }
                )
            }
        }

        if (rounds.length === 0) {
            alert("轮次不能为空")
            return
        }

        const name = document.getElementById(inputNameID) as HTMLInputElement
        const desc = document.getElementById(inputDescriptionID) as HTMLInputElement
        const typ = document.getElementById(inputTypeID) as HTMLSelectElement

        if (!name.value) {
            alert("比赛名称不能为空")
            return;
        }
        if (!desc.value) {
            alert("备注不能为空")
            return;
        }


        const req: CreateContestRequest = {
            Name: name.value,
            Description: desc.value,
            Rounds: rounds,
            Type: typ.value,
            StartTime: 0,
            EndTime: 0
        }
        AuthAPI.AddContest(req).then(() => {
            alert("创建成功")
        }).catch(() => {
            alert("创建失败")
        }).finally(() => {
            window.location.reload()
        })
    }


    return CreateModal("创建", bodyHandle, createContestTarget, createContestHandle)
}

export class AdminContestRender {
    render(ctx: AdminContestDataCtx) {
        return (
            <div>
                {GetEndModal(ctx)}
                {GetCreateContestModal(ctx)}
                <p style={{marginTop: "10px", float: "right"}}>
                    {ModalButton("创建", createContestTarget, EmptyHandle, "btn-primary")}
                </p>

                {renderContestList(ctx)}
            </div>
        )
    }
}