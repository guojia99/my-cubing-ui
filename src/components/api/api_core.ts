import axios from 'axios';
import Cookies from 'js-cookie';
import {
    ContestPodiums,
    ContestRecord,
    GetBestScoreResponse, GetContestResponse,
    GetContestScoreResponse,
    GetContestSorResponse,
    GetContestsResponse,
    GetTokenResponse,
    PlayersResponse,
    ProjectMap
} from './api_model';


export class apiCore {
    uri: string;

    constructor(uri: string) {
        this.uri = uri;
    }

    async GetProjectMap(): Promise<ProjectMap> {
        try {
            let uri = this.uri + "/project_map"
            return await axios.get(uri, {headers: {Accept: 'application/json'}})
        } catch (error) {
            console.log('GetContest error' + error)
            return {} as ProjectMap
        }
    }

    async GetContest(contestID: number):Promise<GetContestResponse>{
        let uri = this.uri + "/contest/" + contestID
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetContests(page: number, size: number): Promise<GetContestsResponse> {
        let uri = this.uri + "/contest?page=" + page + "&size=" + size
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayers(): Promise<PlayersResponse> {
        try {
            let uri = this.uri + "/player"
            return await axios.get(uri, {headers: {Accept: 'application/json'}})
        } catch (error) {
            console.log('GetPlayers error' + error)
            return {} as PlayersResponse
        }
    }

    async GetBestScore(): Promise<GetBestScoreResponse> {
        try {
            let uri = this.uri + "/report/best/score"
            return await axios.get(uri, {headers: {Accept: 'application/json'}})
        } catch (error) {
            console.log('GetBestScore error' + error)
            return {} as GetBestScoreResponse
        }
    }

    async GetBestByAllScores() {
    }

    async GetBestSor() {
    }

    async GetBestPodium() {
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

    async GetContestRecord(contestID: number): Promise<ContestRecord[]>{
        let uri = this.uri + "/report/contest/" + contestID + "/record"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetContestPodium(contestID: number): Promise<ContestPodiums[]> {
        let uri = this.uri + "/report/contest/" + contestID + "/podium"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerPodium(playerName: string) {
    }

    async GetPlayerScore(playerName: string) {
    }
}


function getCurrentTimestampInSeconds(): number {
    const currentTimeInMilliseconds = Date.now();
    return Math.floor(currentTimeInMilliseconds / 1000);
}

export class authApiCore {
    apiCore: apiCore;
    token: GetTokenResponse = {
        Ts: 0,
        Token: ""
    };

    constructor(core: apiCore) {
        this.apiCore = core
    }

    async GetToken(user: string, password: string): Promise<GetTokenResponse> {
        const timestamp: number = getCurrentTimestampInSeconds()
        try {
            if (this.token !== null && this.token.Ts <= timestamp - 10 && this.token.Token !== "") {
                return this.token
            }

            const key = 'Token'

            const cache = Cookies.get(key)
            if (cache !== null && typeof cache === "string" && cache !== "") {
                this.token = JSON.parse(cache)
                return this.token
            }

            let uri = this.apiCore.uri + "/auth/token"
            this.token = await axios.get(uri, {
                headers: {
                    user_name: user,
                    password: password,
                }
            })

            Cookies.set(key, JSON.stringify(this.token), {expires: 2})
            return this.token
        } catch (error) {
            console.log('GetToken error' + error)
            return this.token
        }
    }

    DeleteToken() {
        this.token.Token = ""
        this.token.Ts = 0
        const key = 'Token'
        Cookies.remove(key)
    }

    async AddContest() {
    }

    async DeleteContest() {
    }

    async EndContest() {
    }

    async AddPlayer() {
    }

    async DeletePlayer() {
    }

    async AddScore() {
    }

    async DeleteScore() {
    }
}

