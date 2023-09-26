import axios from 'axios';

import Cookies from 'js-cookie';

import {
    ContestPodiums,
    ContestRecord,
    GetBestScoreResponse,
    GetContestResponse,
    GetContestScoreResponse,
    GetContestSorResponse,
    GetContestsResponse,
    GetPlayerAllScoreResponse,
    GetPlayerRecord,
    GetTokenResponse,
    Player,
    PlayerBestScoreResponse,
    PlayersResponse,
    Podiums,
    Score,
    GetRecordsResponse,
    BestSorReportResponse,
    AddScoreRequest,
    CreateContestRequest,
    GetBestByAllScoresResponse,
    XLog,
    PlayerSorResponse,
    GetPlayerOldEnemyResponse, GetPlayerImageResponse,
} from './api_model';


export class apiCore {
    uri: string;

    constructor(uri: string) {
        this.uri = uri;
    }

    async GetContest(contestID: number): Promise<GetContestResponse> {
        let uri = this.uri + "/contest/" + contestID
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }


    async GetPlayers(): Promise<PlayersResponse> {
        let uri = this.uri + "/player"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayer(id: number): Promise<Player> {
        let uri = this.uri + "/player/" + id
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerImage(playerId: number): Promise<GetPlayerImageResponse>{
        let uri = this.uri + "/player/" + playerId + "/images"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerBestScore(id: number): Promise<PlayerBestScoreResponse> {
        let uri = this.uri + "/report/player/" + id + "/best"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerAllScore(id: number): Promise<GetPlayerAllScoreResponse> {
        let uri = this.uri + "/report/player/" + id + "/score"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerRecord(id: number): Promise<GetPlayerRecord> {
        let uri = this.uri + "/report/player/" + id + "/record"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerPodium(id: number): Promise<Podiums> {
        let uri = this.uri + "/report/player/" + id + "/podium"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetBestScore(): Promise<GetBestScoreResponse> {
        let uri = this.uri + "/report/best/score"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetBestByAllScores(): Promise<GetBestByAllScoresResponse> {
        let uri = this.uri + "/report/best/all_scores"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }


    async GetBestSor(): Promise<BestSorReportResponse> {
        let uri = this.uri + "/report/best/sor"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerSor(playerID: number): Promise<PlayerSorResponse>{
        let uri = this.uri +  "/report/player/" + playerID + "/sor"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerOldEnemy(playerID: number) : Promise<GetPlayerOldEnemyResponse>{
        let uri = this.uri + "/report/player/" + playerID + "/old_enemy"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }


    async GetBestPodium(): Promise<Podiums[]> {
        let uri = this.uri + "/report/best/podium"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetRecords(page: number, size: number): Promise<GetRecordsResponse> {
        let uri = this.uri + "/report/record?page=" + page + "&size=" + size
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }


    async GetContests(page: number, size: number, typ: string): Promise<GetContestsResponse> {
        let uri = this.uri + "/contest?page=" + page + "&size=" + size + "&type=" + typ
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetContestSor(contestID: number): Promise<GetContestSorResponse> {
        let uri = this.uri + "/report/contest/" + contestID + "/sor"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetContestScore(contestID: number): Promise<GetContestScoreResponse> {
        let uri = this.uri + "/report/contest/" + contestID + "/score"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetContestRecord(contestID: number): Promise<ContestRecord[]> {
        let uri = this.uri + "/report/contest/" + contestID + "/record"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetContestPodium(contestID: number): Promise<ContestPodiums[]> {
        let uri = this.uri + "/report/contest/" + contestID + "/podium"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }
    async GetXLog(): Promise<XLog[]> {
        let uri = this.uri + "/x-log/"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }


}


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
            const value = await axios.post(uri, {user_name: user, password: password}, {headers: {Accept: 'application/json'}})
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
        const reload = () => {
            alert("授权过期,需要重新登录")
            this.DeleteToken()
            window.location.href = "/xauth"
            return
        }

        let status = 0
        let output = null
        try {

            switch (method) {
                case "get":
                    await axios.get(uri, this.config()).then((value) => {
                        output = value.data
                    }).catch((error) => {
                        status = error.response.status
                    })
                    break
                case "post":
                    await axios.post(uri, data, this.config()).then((value) => {
                        output = value.data
                    }).catch((error) => {
                        status = error.response.status
                    })
                    break
                case "put":
                    await axios.put(uri, data, this.config()).then((value) => {
                        output = value.data
                    }).catch((error) => {
                        status = error.response.status
                    })
                    break
                case "delete":
                    await axios.delete(uri, this.config()).then((value) => {
                        output = value.data
                    }).catch((error) => {
                        status = error.response.status
                    })
                    break
            }
            if (output === null ) {
                if (status === 401){
                    reload()
                }
                alert("存在未知错误1")
                return {}
            }
            return output
        } catch (e) {
            console.log(e)
            if (status === 0) {
                alert("存在未知错误2")
                return
            }
            if (status === 401) {
                reload()
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
}

