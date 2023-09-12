import {Player, PlayersResponse} from "../../components/api/api_model";
import React, {JSX} from "react";
import {callback} from "./admin_score";
import {CreateModal, EmptyHandle, ModalButton} from "../../components/utils/modal";
import {AuthAPI} from "../../components/api/api";

export type AdminPlayerDataCtx = {
    Players: PlayersResponse | null,

    UpdateID: number,
    DeleteID: number,

    UpdateHandle: callback,
}


const CreateTarget = "player_create_target"
const DeleteTarget = "player_delete_target"
const UpdateTarget = "player_update_target"


const renderPlayerTable = (ctx: AdminPlayerDataCtx) => {
    let items: JSX.Element[] = []

    if (ctx.Players !== null) {
        for (let i = 0; i < ctx.Players.Players.length; i++) {
            const p = ctx.Players.Players[i]
            items.push(
                <tr key={"renderPlayerTable_item_player_" + p.ID}>
                    <td>{i + 1}</td>
                    <td>{p.WcaID}</td>
                    <td>{p.Name}</td>
                    <td>{p.ActualName}</td>
                    <td>{ModalButton("删除", DeleteTarget, () => {
                        ctx.UpdateHandle({PlayerRenderDeleteID: p.ID})
                        ctx.DeleteID = p.ID
                    }, "btn-danger")}</td>
                    <td>{ModalButton("更新", UpdateTarget, () => {
                        ctx.UpdateHandle({PlayerRenderUpdateID: p.ID})
                        ctx.UpdateID = p.ID
                    }, "btn-success")}</td>
                </tr>
            )
        }
    }

    return (
        <table className="table table-striped table-hover">
            <thead>
            <tr>
                <th colSpan={1}>序号</th>
                <th colSpan={1}>WCA ID</th>
                <th colSpan={1}>选手</th>
                <th colSpan={1}>真实姓名</th>
                <th colSpan={1}>删除</th>
                <th colSpan={1}>修改</th>
            </tr>
            </thead>
            <tbody>{items}</tbody>
        </table>
    )
}

const GetDeleteModal = (ctx: AdminPlayerDataCtx) => {
    const bodyHandle = () => {
        if (ctx.Players === null) {
            return <div>是否删除</div>
        }

        let p = ctx.Players.Players[0]
        for (let i = 0; i < ctx.Players.Players.length; i++) {
            if (ctx.Players.Players[i].ID === ctx.DeleteID) {
                p = ctx.Players.Players[i]
            }
        }
        return <div>
            <h2>注意：已产生成绩的选手无法删除</h2>
            <h4>是否删除 <p style={{display: "inline", fontSize: "30px"}}>{p.Name}</p> ?</h4>
            <p> - wcaID: {p.WcaID ? p.WcaID : "无"}</p>
            <p> - 真实ID: {p.ActualName ? p.ActualName : "无"}</p>
        </div>
    }

    const deletePlayerHandle = () => {
        AuthAPI.DeletePlayer(ctx.DeleteID).then(() => {
            alert("删除成功")
        }).catch(() => {
            alert("删除失败")
        }).finally(() => {
            window.location.reload()
        })
    }

    return CreateModal("删除", bodyHandle, DeleteTarget, deletePlayerHandle)
}


type createAndUpdateHandleFn = (req: Player) => void
const createAndUpdateHandle = (key: string, handle: createAndUpdateHandleFn) => {
    const inputNameID = key + "Player_name"
    const inputActualNameID = key + "Player_ActualName"
    const inputWcaIDID = key + "Player_WcaID"
    // const inputTitleID = key + "Player_Title"


    const name = document.getElementById(inputNameID) as HTMLInputElement
    const actualName = document.getElementById(inputActualNameID) as HTMLInputElement
    const wcaId = document.getElementById(inputWcaIDID) as HTMLInputElement
    // const title = document.getElementById(inputTitleID) as HTMLInputElement

    if (name.value === "") {
        alert("无法输入空名称")
        return
    }
    // todo 校验
    // todo 后端返回的错误结果输出
    const req: Player = {
        ID: 0,
        Name: name.value,
        WcaID: wcaId.value,
        ActualName: actualName.value,
        TitlesVal: [],
        ContestNumber: 0,
        RecoveryNumber: 0,
        ValidRecoveryNumber: 0,
    }
    handle(req)
}


const GetUpdateModal = (ctx: AdminPlayerDataCtx) => {

    const inputNameID = "updatePlayer_name"
    const inputActualNameID = "updatePlayer_ActualName"
    const inputWcaIDID = "updatePlayer_WcaID"
    // const inputTitleID = "updatePlayer_Title"

    const bodyHandle = () => {
        if (ctx.Players === null) {
            return <div></div>
        }
        let p = ctx.Players.Players[0]
        for (let i = 0; i < ctx.Players.Players.length; i++) {
            if (ctx.UpdateID === ctx.Players.Players[i].ID) {
                p = ctx.Players.Players[i]
                break
            }
        }

        return (
            <div key={"update_inputs" + ctx.UpdateID}>
                <div className="mb-3" key={"update_inputs" + inputNameID + "_" + ctx.UpdateID}>
                    <label htmlFor={inputNameID} className="form-label">姓名: ({p.Name})</label>
                    <input type="text" className="form-control" id={inputNameID} defaultValue={p.Name} key={"update_inputs" + inputNameID + "_input" + ctx.UpdateID}/>
                </div>
                <div className="mb-3" key={"update_inputs" + inputActualNameID + "_" + ctx.UpdateID}>
                    <label htmlFor={inputActualNameID} className="form-label">真实姓名: ({p.ActualName})</label>
                    <input type="text" className="form-control" id={inputActualNameID} defaultValue={p.ActualName ? p.ActualName : ""}
                           key={"update_inputs" + inputActualNameID + "_input" + ctx.UpdateID}/>
                </div>
                <div className="mb-3" key={"update_inputs" + inputWcaIDID + "_" + ctx.UpdateID}>
                    <label htmlFor={inputWcaIDID} className="form-label">WcaID: ({p.WcaID})</label>
                    <input type="text" className="form-control" id={inputWcaIDID} defaultValue={p.WcaID ? p.WcaID : ""}
                           key={"update_inputs" + inputWcaIDID + "_input" + ctx.UpdateID}/>
                </div>
            </div>
        )
    }

    const updatePlayerHandle = () => {
        const f = (req: Player) => {
            AuthAPI.UpdatePlayer(ctx.UpdateID, req).then(() => {
                alert("更新成功")
            }).catch(() => {
                alert("更新失败")
            }).finally(() => {
                window.location.reload()
            })
        }
        createAndUpdateHandle("update", f)
    }

    return CreateModal("更新", bodyHandle, UpdateTarget, updatePlayerHandle)
}

const GetCreateModal = (ctx: AdminPlayerDataCtx) => {

    const inputNameID = "createPlayer_name"
    const inputActualNameID = "createPlayer_ActualName"
    const inputWcaIDID = "createPlayer_WcaID"
    // const inputTitleID = "createPlayer_Title"

    const bodyHandle = () => {
        return (
            <div key={"create_inputs"}>
                <div className="mb-3">
                    <label htmlFor={inputNameID} className="form-label">姓名</label>
                    <input type="text" className="form-control" id={inputNameID}/>
                </div>
                <div className="mb-3">
                    <label htmlFor={inputActualNameID} className="form-label">真实姓名</label>
                    <input type="text" className="form-control" id={inputActualNameID}/>
                </div>
                <div className="mb-3">
                    <label htmlFor={inputWcaIDID} className="form-label">WcaID</label>
                    <input type="text" className="form-control" id={inputWcaIDID}/>
                </div>
            </div>
        )
    }

    const createPlayerHandle = () => {
        const f = (req: Player) => {
            AuthAPI.AddPlayer(req).then(() => {
                alert("添加成功")
            }).catch(() => {
                alert("添加失败")
            }).finally(() => {
                window.location.reload()
            })
        }
        createAndUpdateHandle("create", f)
    }
    return CreateModal("创建", bodyHandle, CreateTarget, createPlayerHandle)
}

export class AdminPlayerRender {
    render(ctx: AdminPlayerDataCtx) {
        return (
            <div>
                {GetDeleteModal(ctx)}
                {GetUpdateModal(ctx)}
                {GetCreateModal(ctx)}

                <p style={{marginTop: "10px", float: "right"}}>
                    {ModalButton("创建", CreateTarget, EmptyHandle, "btn-primary")}
                </p>

                {renderPlayerTable(ctx)}
            </div>
        )
    }
}