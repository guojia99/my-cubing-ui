import axios from 'axios';
import Cookies from 'js-cookie';
import {
    ContestPodiums,
    ContestRecord,
    GetBestScoreResponse, GetContestResponse,
    GetContestScoreResponse,
    GetContestSorResponse,
    GetContestsResponse, GetPlayerAllScoreResponse, GetPlayerRecord,
    GetTokenResponse, Player, PlayerBestScoreResponse,
    PlayersResponse, Podiums,
} from './api_model';


export class apiCore {
    uri: string;

    constructor(uri: string) {
        this.uri = uri;
    }

    async GetContest(contestID: number):Promise<GetContestResponse>{
        let uri = this.uri + "/contest/" + contestID
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }


    async GetPlayers(): Promise<PlayersResponse> {
        let uri = this.uri + "/player"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayer(id: number): Promise<Player>{
        let uri = this.uri + "/player/" + id
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerBestScoreReport(id: number): Promise<PlayerBestScoreResponse>{
        let uri = this.uri + "/report/player/" + id + "/best"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerAllScore(id: number) : Promise<GetPlayerAllScoreResponse>{
        let uri = this.uri + "/report/player/" + id + "/score"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerRecord(id: number) : Promise<GetPlayerRecord> {
        let uri = this.uri + "/report/player/" + id + "/record"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerPodium(id: number): Promise<Podiums> {
        let uri = this.uri + "/report/player/" + id + "/podium"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerScore(playerName: string) {
    }

    async GetBestScore(): Promise<GetBestScoreResponse> {
        let uri = this.uri + "/report/best/score"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetBestByAllScores() {
    }

    async GetBestSor() {
    }

    async GetBestPodium() {
    }


    async GetContests(page: number, size: number): Promise<GetContestsResponse> {
        let uri = this.uri + "/contest?page=" + page + "&size=" + size
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

