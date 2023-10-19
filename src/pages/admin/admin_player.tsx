import {Player, PlayersResponse} from "../../components/api/api_model";
import React, {JSX} from "react";
import {CreateModal, EmptyHandle, ModalButton} from "../../components/utils/modal";
import {API, AuthAPI} from "../../components/api/api";
import {GetLocationQueryParams} from "../../components/utils/utils";
import {PageNav, PageNavValue} from "../../components/utils/page";
import {Sleep} from "../../components/utils/async";
import {callback} from "./admin_score";
import {WaitToast, WarnToast} from "../../components/utils/alert";

export type AdminPlayerDataCtx = {
    Players: PlayersResponse | null,
    UpdateID: number,
    DeleteID: number,
    UpdateHandle: callback,
}


const CreateTarget = "player_create_target"
const DeleteTarget = "player_delete_target"
const UpdateTarget = "player_update_target"


type createAndUpdateHandleFn = (req: Player) => void

export class AdminPlayerRender {
    private ctx: AdminPlayerDataCtx = {
        Players: null,
        DeleteID: -1,
        UpdateID: -1,
        UpdateHandle: () => {
        }
    }

    constructor(callback: callback) {
        this.ctx.UpdateHandle = callback
        this.loadPlayerData().then()
    }

    private renderPlayerTable = () => {
        let items: JSX.Element[] = []

        if (this.ctx.Players !== null) {
            for (let i = 0; i < this.ctx.Players.Players.length; i++) {
                const p = this.ctx.Players.Players[i]
                items.push(
                    <tr key={"renderPlayerTable_item_player_" + p.ID}>
                        <td>{p.ID}</td>
                        <td>{p.Name}</td>
                        <td>{p.WcaID}</td>
                        <td>{p.ActualName}</td>
                        <td>{p.QQ}</td>
                        <td>{ModalButton("删除", DeleteTarget, () => {
                            this.ctx.DeleteID = p.ID
                        }, "btn-danger")}</td>
                        <td>{ModalButton("更新", UpdateTarget, () => {
                            this.ctx.UpdateID = p.ID
                        }, "btn-success")}</td>
                    </tr>
                )
            }
        }

        return (
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th colSpan={1}>ID</th>
                    <th colSpan={1}>选手</th>
                    <th colSpan={1}>WCA ID</th>
                    <th colSpan={1}>真实姓名</th>
                    <th colSpan={1}>QQ</th>
                    <th colSpan={1}>删除</th>
                    <th colSpan={1}>修改</th>
                </tr>
                </thead>
                <tbody>{items}</tbody>
            </table>
        )
    }

    private getDeleteModal = () => {
        const bodyHandle = () => {
            if (this.ctx.Players === null) {
                return <div>是否删除</div>
            }
            let p = this.ctx.Players.Players[0]
            for (let i = 0; i < this.ctx.Players.Players.length; i++) {
                if (this.ctx.Players.Players[i].ID === this.ctx.DeleteID) {
                    p = this.ctx.Players.Players[i]
                }
            }
            return <div>
                <h2>注意：已产生成绩的选手无法删除</h2>
                <h4>是否删除 <p style={{display: "inline", fontSize: "30px"}}>{p.Name}</p> ?</h4>
                <p> - wcaID: {p.WcaID ? p.WcaID : "无"}</p>
                <p> - 真实ID: {p.ActualName ? p.ActualName : "无"}</p>
            </div>
        }

        const deletePlayerHandle = async () => {
            await WaitToast(AuthAPI.DeletePlayer(this.ctx.DeleteID), "删除中", "删除成功", "删除失败")
            await Sleep(500).then(() => {
                window.location.reload()
            })
        }

        return CreateModal("删除", bodyHandle, DeleteTarget, deletePlayerHandle)
    }


    private createAndUpdateHandle = (key: string, handle: createAndUpdateHandleFn) => {
        const inputNameID = key + "Player_name"
        const inputActualNameID = key + "Player_ActualName"
        const inputWcaIDID = key + "Player_WcaID"
        // const inputTitleID = key + "Player_Title"
        const inputQQ = key + "Player_QQ"

        const name = document.getElementById(inputNameID) as HTMLInputElement
        const actualName = document.getElementById(inputActualNameID) as HTMLInputElement
        const wcaId = document.getElementById(inputWcaIDID) as HTMLInputElement
        // const title = document.getElementById(inputTitleID) as HTMLInputElement
        const qq = document.getElementById(inputQQ) as HTMLInputElement

        if (name.value === "") {
            WarnToast("无法输入空名称")
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
            QQ: qq.value,
            ContestNumber: 0,
            RecoveryNumber: 0,
            ValidRecoveryNumber: 0,
        }
        handle(req)
    }

    private getUpdateModal = () => {

        const inputNameID = "updatePlayer_name"
        const inputActualNameID = "updatePlayer_ActualName"
        const inputWcaIDID = "updatePlayer_WcaID"
        // const inputTitleID = "updatePlayer_Title"
        const inputQQ = "updatePlayer_QQ"

        const bodyHandle = () => {
            if (this.ctx.Players === null) {
                return <div></div>
            }
            let p = this.ctx.Players.Players[0]
            for (let i = 0; i < this.ctx.Players.Players.length; i++) {
                if (this.ctx.UpdateID === this.ctx.Players.Players[i].ID) {
                    p = this.ctx.Players.Players[i]
                    break
                }
            }

            return (
                <div key={"update_inputs" + this.ctx.UpdateID}>
                    <div className="mb-3" key={"update_inputs" + inputNameID + "_" + this.ctx.UpdateID}>
                        <label htmlFor={inputNameID} className="form-label">姓名: ({p.Name})</label>
                        <input type="text" className="form-control" id={inputNameID} defaultValue={p.Name} key={"update_inputs" + inputNameID + "_input" + this.ctx.UpdateID}/>
                    </div>
                    <div className="mb-3" key={"update_inputs" + inputActualNameID + "_" + this.ctx.UpdateID}>
                        <label htmlFor={inputActualNameID} className="form-label">真实姓名: ({p.ActualName})</label>
                        <input type="text" className="form-control" id={inputActualNameID} defaultValue={p.ActualName ? p.ActualName : ""}
                               key={"update_inputs" + inputActualNameID + "_input" + this.ctx.UpdateID}/>
                    </div>
                    <div className="mb-3" key={"update_inputs" + inputWcaIDID + "_" + this.ctx.UpdateID}>
                        <label htmlFor={inputWcaIDID} className="form-label">WcaID: ({p.WcaID})</label>
                        <input type="text" className="form-control" id={inputWcaIDID} defaultValue={p.WcaID ? p.WcaID : ""}
                               key={"update_inputs" + inputWcaIDID + "_input" + this.ctx.UpdateID}/>
                    </div>

                    <div className="mb-3" key={"update_inputs" + inputQQ + "_" + this.ctx.UpdateID}>
                        <label htmlFor={inputQQ} className="form-label">QQ: ({p.QQ})</label>
                        <input type="text" className="form-control" id={inputQQ} defaultValue={p.QQ ? p.QQ : ""}
                               key={"update_inputs" + inputQQ + "_input" + this.ctx.UpdateID}/>
                    </div>
                </div>
            )
        }

        const updatePlayerHandle = async () => {
            const f = async (req: Player) => {
                await WaitToast(AuthAPI.UpdatePlayer(this.ctx.UpdateID, req), "更新中", "更新成功", "更新失败")
                await Sleep(500).then(() => {
                    window.location.reload()
                })
            }
            this.createAndUpdateHandle("update", f)
        }

        return CreateModal("更新", bodyHandle, UpdateTarget, updatePlayerHandle)
    }

    private getCreateModal = () => {
        const inputNameID = "createPlayer_name"
        const inputActualNameID = "createPlayer_ActualName"
        const inputWcaIDID = "createPlayer_WcaID"
        // const inputTitleID = "createPlayer_Title"
        const inputQQ = "createPlayer_QQ"

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
                    <div className="mb-3">
                        <label htmlFor={inputQQ} className="form-label">QQ</label>
                        <input type="text" className="form-control" id={inputQQ}/>
                    </div>
                </div>
            )
        }

        const createPlayerHandle = () => {
            const f = async (req: Player) => {
                await WaitToast(AuthAPI.AddPlayer(req), "添加中", "添加成功", "添加失败")
                await Sleep(500).then(() => {
                    window.location.reload()
                })
            }
            this.createAndUpdateHandle("create", f)
        }
        return CreateModal("创建", bodyHandle, CreateTarget, createPlayerHandle)
    }

    private playerPage = (up: string) => {
        if (this.ctx.Players === null) {
            return <div></div>
        }
        const query = GetLocationQueryParams()
        const page = isNaN(Number(query['player_page'])) ? 1 : Number(query['player_page'])

        const p: PageNavValue = {
            Id: up + "player_page",
            Count: this.ctx.Players.Count,
            PageKey: "player_page",
            CurPage: page,
            Size: 50,
            Link: "/xadmin?tabs=player",
        }
        return PageNav(p)
    }

    private loadPlayerData = async () => {
        const query = GetLocationQueryParams()
        const page = isNaN(Number(query['player_page'])) ? 1 : Number(query['player_page'])
        await API.GetPlayers(page, 50).then(value => {
            this.ctx.Players = value
        })
    }

    render() {
        return (
            <div>

                {this.getDeleteModal()}
                {this.getUpdateModal()}
                {this.getCreateModal()}

                <p style={{marginTop: "10px", float: "right"}}>
                    {ModalButton("创建", CreateTarget, EmptyHandle, "btn-primary")}
                </p>

                <p style={{marginTop: "30px"}}></p>

                {this.playerPage("up")}
                {this.renderPlayerTable()}
                {this.playerPage("down")}
            </div>
        )
    }
}