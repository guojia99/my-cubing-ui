import {PlayersResponse} from "../../components/api/api_model";
import React, {JSX} from "react";
import {callback} from "./admin_score";
import {CreateModal, ModalButton} from "../../components/utils/modal";
import Players from "../players/Players";
import player from "../player/Player";
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
                <tr>
                    <td>{i + 1}</td>
                    <td>{p.WcaID}</td>
                    <td>{p.Name}</td>
                    <td>{p.ActualName}</td>
                    <td>{ModalButton("删除", DeleteTarget, () => {
                        ctx.UpdateHandle({PlayerRenderDeleteID: p.ID})
                    }, "btn-danger")}</td>
                    <td>{ModalButton("更新", UpdateTarget, () => {
                        ctx.UpdateHandle({PlayerRenderUpdateID: p.ID})
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
const GetUpdateModal = (ctx: AdminPlayerDataCtx) => {
    const bodyHandle = () => {
        return <div>{ctx.DeleteID}</div>
    }

    const updatePlayerHandle = () => {
        alert("更新")
    }

    return CreateModal("更新", bodyHandle, UpdateTarget, updatePlayerHandle)
}

const GetCreateModal = (ctx: AdminPlayerDataCtx) => {
    const bodyHandle = () => {
        return <div>{ctx.DeleteID}</div>
    }

    const createPlayerHandle = () => {
        alert("创建")
    }
    return CreateModal("创建",bodyHandle, CreateTarget, createPlayerHandle)
}

export class AdminPlayerRender {
    render(ctx: AdminPlayerDataCtx) {
        return (
            <div>
                {GetDeleteModal(ctx)}
                {GetUpdateModal(ctx)}
                {GetCreateModal(ctx)}

                <p style={{marginTop: "10px", float: "right"}}>{ModalButton("创建", CreateTarget, () => {
                }, "btn-primary")}</p>

                {renderPlayerTable(ctx)}
            </div>
        )
    }
}