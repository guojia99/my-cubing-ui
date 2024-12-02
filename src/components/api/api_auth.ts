import {
    AddScoreRequest,
    CreateContestRequest, GetPreScores,
    GetTokenResponse, NeglectPreScoresRequest,
    Player,
    Score,
    XLog
} from "./api_model";
import {Request} from "./api_error";
import Cookies from "js-cookie";
import {apiCore} from "./api_core";
import {WaitToast} from "../utils/alert";
import {Sleep} from "../utils/async";

function getCurrentTimestampInSeconds(): number {
    const currentTimeInMilliseconds = Date.now();
    return Math.floor(currentTimeInMilliseconds / 1000);
}


export class authApiCore {
    key = "Token"

    apiCore: apiCore;
    token: GetTokenResponse = {
        Ts: 0,
        Token: ""
    };

    constructor(core: apiCore) {
        this.apiCore = core
    }

    async GetToken(user: string, password: string): Promise<GetTokenResponse> {
        try {
            let uri = this.apiCore.uri + "/auth/token"
            const value = await Request.post(uri, {
                user_name: user,
                password: password
            }, {headers: {Accept: 'application/json'}})
            this.token = value.data as GetTokenResponse
            if (this.token.Token !== "") {
                Cookies.set(this.key, JSON.stringify(this.token), {expires: 2})
            }
            return this.token
        } catch (error) {
            return this.token
        }
    }

    private updateByCache() {
        const cache = Cookies.get(this.key)
        if (cache !== null && typeof cache === "string" && cache !== "") {
            this.token = JSON.parse(cache)
        }
    }

    IsAuth(): boolean {
        this.updateByCache()
        const timestamp: number = getCurrentTimestampInSeconds()
        const tk = this.token as GetTokenResponse
        return tk.Token !== "" && tk.Ts > timestamp
    }

    DeleteToken() {
        this.token.Token = ""
        this.token.Ts = 0
        Cookies.remove(this.key)
    }

    config() {
        return {
            method: "GET",
            headers: {
                Accept: 'application/json',
                Authorization: this.token.Token,
            },
        }
    }

    async checkResp(method: string, uri: string, data?: any): Promise<any> {
        const reload = async () => {
            await WaitToast(Sleep(3000).then(() => {
                this.DeleteToken()
                window.location.href = "/xauth"
            }), "授权过期, 准备重新登录", "", "")
        }

        let status = 0
        let output = null
        try {
            switch (method) {
                case "get":
                    await Request.get(uri, this.config()).then((value) => {
                        output = value.data
                    }).catch((error) => {
                        status = error.response.status
                    })
                    break
                case "post":
                    await Request.post(uri, data, this.config()).then((value) => {
                        output = value.data
                    }).catch((error) => {
                        status = error.response.status
                    })
                    break
                case "put":
                    await Request.put(uri, data, this.config()).then((value) => {
                        output = value.data
                    }).catch((error) => {
                        status = error.response.status
                    })
                    break
                case "delete":
                    await Request.delete(uri, this.config()).then((value) => {
                        output = value.data
                    }).catch((error) => {
                        status = error.response.status
                    })
                    break
            }
            if (output === null) {
                if (status === 401) {
                    reload().then()
                }
                return {}
            }
            return output
        } catch (e) {
            if (status === 401) {
                reload().then()
            }
        }
    }

    async GetPlayerScoreByContest(playerID: number, contestID: number): Promise<Score[]> {
        let uri = this.apiCore.uri + "/score/player/" + playerID + "/contest/" + contestID
        return await this.checkResp("get", uri)
    }

    async AddContest(req: CreateContestRequest) {
        let uri = this.apiCore.uri + "/contest"
        return await this.checkResp("post", uri, req)
    }

    async DeleteContest() {
    }

    async EndContest(id: number) {
        let uri = this.apiCore.uri + "/score/end_contest"
        return await this.checkResp("put", uri, {ContestID: id})
    }

    async UpdateContestGroup(id: number, groups: string) {
        let uri = this.apiCore.uri + "/contest/update_group"
        return await this.checkResp("put", uri, {ContestID: id, groups: groups})
    }

    async AddPlayer(req: Player): Promise<void> {
        let uri = this.apiCore.uri + "/player"
        return await this.checkResp("post", uri, req)
    }

    async UpdatePlayer(playerID: number, req: Player): Promise<void> {
        req.ID = playerID
        let uri = this.apiCore.uri + "/player"
        return await this.checkResp("put", uri, req)
    }

    async DeletePlayer(playerID: number): Promise<void> {
        let uri = this.apiCore.uri + "/player/" + playerID
        return await this.checkResp("delete", uri)
    }

    async AddScore(req: AddScoreRequest): Promise<void> {
        let uri = this.apiCore.uri + "/score"
        return await this.checkResp("post", uri, req)
    }

    async DeleteScore(scoreID: number) {
        let uri = this.apiCore.uri + "/score/" + scoreID
        return await this.checkResp("delete", uri)
    }

    async AddXLog(log: XLog) {
        let uri = this.apiCore.uri + "/x-log"
        return await this.checkResp("put", uri, log)
    }

    async DeleteXLog(id: number) {
        let uri = this.apiCore.uri + "/x-log/" + id
        return await this.checkResp("delete", uri)
    }

    async GetPreScores(page: number, size: number, final: boolean): Promise<GetPreScores> {
        let f = final ? 2 : 1
        let uri = this.apiCore.uri + "/pre_scores?page=" + page + "&size=" + size + "&final=" + f
        return await this.checkResp("get", uri)
    }

    async NeglectPreScores(id: number): Promise<any> {
        let uri = this.apiCore.uri + "/pre_scores/" + id + "/neglect"
        const req: NeglectPreScoresRequest = {
            ID: id,
            Processor: "web",
        }
        return await this.checkResp("put", uri, req)
    }

    async RecordPreScores(id: number): Promise<any> {
        let uri = this.apiCore.uri + "/pre_scores/" + id + "/record"
        const req: NeglectPreScoresRequest = {
            ID: id,
            Processor: "web",
        }
        return await this.checkResp("put", uri, req)
    }

    async ResetRecords(): Promise<any> {
        let uri = this.apiCore.uri + "/score/reset_records"
        const req = {}
        return await this.checkResp("post", uri, req)
    }
}

