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
    PlayersResponse, Podiums, Score, GetRecordsResponse, BestSorReportResponse, AddScoreRequest,
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

    async GetPlayerBestScoreReport(id: number): Promise<PlayerBestScoreResponse> {
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

    async GetPlayerScore(playerName: string) {
    }

    async GetBestScore(): Promise<GetBestScoreResponse> {
        let uri = this.uri + "/report/best/score"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetBestByAllScores() {
    }

    async GetBestSor(): Promise<BestSorReportResponse> {
        let uri = this.uri + "/report/best/sor"
        const result = await axios.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetBestPodium() {
    }

    async GetRecords(page: number, size: number): Promise<GetRecordsResponse> {
        let uri = this.uri + "/record?page=" + page + "&size=" + size
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


    async GetPlayerScoreByContest(playerID: number, contestID: number): Promise<Score[]> {
        let uri = this.apiCore.uri + "/score/player/" + playerID + "/contest/" + contestID
        const result = await axios.get(uri, this.config())
        return result.data
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

    async AddScore(req: AddScoreRequest) :Promise<void> {
        let uri = this.apiCore.uri + "/score"
        const result = await axios.post(uri, req, this.config())
        return result.data
    }

    async DeleteScore(scoreID: number) {
        let uri = this.apiCore.uri + "/score/" + scoreID
        const result = await axios.delete(uri, this.config())
        return result.data
    }
}

