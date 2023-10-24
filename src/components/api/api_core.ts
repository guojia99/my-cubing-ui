import {
    ContestPodiums,
    ContestRecord,
    GetBestScoreResponse,
    GetContestScoreResponse,
    GetContestSorResponse,
    GetContestsResponse,
    GetPlayerAllScoreResponse,
    GetPlayerRecord,
    Player,
    PlayerBestScoreResponse,
    PlayersResponse,
    Podiums,
    GetRecordsResponse,
    BestSorReportResponse,
    GetBestByAllScoresResponse,
    XLog,
    PlayerSorResponse,
    GetPlayerImageResponse,
    Contest,
    GetRelativeSor,
    GetPlayerRelativeSor,
    GetAvgRelativeSor,
    GetPlayerNemesisResponse, GetContestStaticsResponse,
} from './api_model';
import {Request} from "./api_error";
import {API} from "./api";
import {WaitGroup} from "../utils/async";


// todo 异常判断
export class apiCore {
    uri: string;

    constructor(uri: string) {
        this.uri = uri;
    }

    async GetContest(contestID: number): Promise<Contest> {
        let uri = this.uri + "/contest/" + contestID
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayers(page: number, size: number): Promise<PlayersResponse> {
        let uri = this.uri + "/players?page=" + page + "&size=" + size
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayer(id: number): Promise<Player> {
        let uri = this.uri + "/player/" + id
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerImage(playerId: number): Promise<GetPlayerImageResponse> {
        let uri = this.uri + "/player/" + playerId + "/images"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerBestScore(id: number): Promise<PlayerBestScoreResponse> {
        let uri = this.uri + "/report/player/" + id + "/best"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerAllScore(id: number): Promise<GetPlayerAllScoreResponse> {
        let uri = this.uri + "/report/player/" + id + "/score"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerRecord(id: number): Promise<GetPlayerRecord> {
        let uri = this.uri + "/report/player/" + id + "/record"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerPodium(id: number): Promise<Podiums> {
        let uri = this.uri + "/report/player/" + id + "/podium"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetBestScore(): Promise<GetBestScoreResponse> {
        let uri = this.uri + "/report/best/score"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetBestByAllScores(): Promise<GetBestByAllScoresResponse> {
        let uri = this.uri + "/report/best/all_scores"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetBestSor(): Promise<BestSorReportResponse> {
        let uri = this.uri + "/report/best/sor"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerSor(playerID: number): Promise<PlayerSorResponse> {
        let uri = this.uri + "/report/player/" + playerID + "/sor"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerNemesis(playerID: number): Promise<GetPlayerNemesisResponse> {
        let uri = this.uri + "/report/player/" + playerID + "/nemesis"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetPlayerRelativeSor(playerID: number): Promise<GetPlayerRelativeSor> {
        let uri = this.uri + "/report/player/" + playerID + "/relative_sor"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetBestPodium(): Promise<Podiums[]> {
        let uri = this.uri + "/report/best/podium"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetRecords(page: number, size: number): Promise<GetRecordsResponse> {
        let uri = this.uri + "/report/record?page=" + page + "&size=" + size
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetContests(page: number, size: number, typ: string): Promise<GetContestsResponse> {
        let uri = this.uri + "/contests?page=" + page + "&size=" + size + "&type=" + typ
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetContestSor(contestID: number): Promise<GetContestSorResponse> {
        let uri = this.uri + "/report/contest/" + contestID + "/sor"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetContestScore(contestID: number): Promise<GetContestScoreResponse> {
        let uri = this.uri + "/report/contest/" + contestID + "/score"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetContestRecord(contestID: number): Promise<ContestRecord[]> {
        let uri = this.uri + "/report/contest/" + contestID + "/record"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetContestPodium(contestID: number): Promise<ContestPodiums[]> {
        let uri = this.uri + "/report/contest/" + contestID + "/podium"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetXLog(): Promise<XLog[]> {
        let uri = this.uri + "/x-log/"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetRelativeSor(): Promise<GetRelativeSor> {
        let uri = this.uri + "/report/best/relative_sor"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }

    async GetAvgRelativeSor(): Promise<GetAvgRelativeSor> {
        let uri = this.uri + "/report/best/avg_relative_sor"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }


    async LoadAllContest() {
        let contests: GetContestsResponse = {
            Contests: [],
            Count: 0,
            Size: 0
        }

        await API.GetContests(1, 50, "").then(value => {
            contests = value
            contests.Size = contests.Contests.length
        })

        const wg = new WaitGroup()
        let ps: number[] = []
        for (let i = 1; i <= contests.Count / 50; i++) {
            ps.push(i + 1)
            wg.add(1)
        }

        ps.forEach((value, index, array) => {
            API.GetContests(value, 50, "").then(value => {
                contests.Contests.push(...value.Contests)
                contests.Size = contests.Contests.length
            }).catch().finally(() => {
                wg.done()
            })
        })

        await wg.wait()

        const ContestsMap = new Map<number, Contest>()
        for (let i = 0; i < contests.Size; i++) {
            ContestsMap.set(contests.Contests[i].ID, contests.Contests[i])
        }
        return [ContestsMap, contests]
    }

    async LoadAllPlayer() {
        let players: PlayersResponse = {
            Size: 0,
            Count: 0,
            Players: [],
        }

        await API.GetPlayers(1, 50).then(value => {
            players = value
            players.Size = players.Players.length
        })

        const wg = new WaitGroup()
        let ps: number[] = []
        for (let i = 1; i <= players.Count / 50; i++) {
            ps.push(i + 1)
            wg.add(1)
        }
        ps.forEach((value, index, array) => {
            API.GetPlayers(value, 50).then(value => {
                players.Players.push(...value.Players)
                players.Size = players.Players.length
            }).catch().finally(() => {
                wg.done()
            })
        })

        await wg.wait()

        const playerMap = new Map<number, Player>()
        for (let i = 0; i < players.Size; i++) {
            playerMap.set(players.Players[i].ID, players.Players[i])
        }
        return [playerMap, players]
    }

    async GetContestStatics(): Promise<GetContestStaticsResponse> {
        let uri = this.uri + "/report/contests/statics"
        const result = await Request.get(uri, {headers: {Accept: 'application/json'}})
        return result.data
    }
}


