import {Cubes} from "../cube/components/cube";


export type Contest = {
    ID: number;
    Name: string;
    IsEnd: boolean;
    Description: string;
    Type: string;
    RoundIdsVal: number[] | null;
    StartTime: string;
    EndTime: string;
}

export type Round = {
    ID: number;
    ContestID: number;
    Project: Cubes;
    Number: number;
    Part: number;
    Name: string;
    Final: boolean;
    UpsetsVal: string[];
}

export type Player = {
    ID: number;
    Name: string;
    WcaID: string | null;
    ActualName: string | null;
    TitlesVal: string[];
    ContestNumber: number; // 比赛次数
    RecoveryNumber: number; // 还原次数
    ValidRecoveryNumber: number; // 还原失败数
}

export type Score = {
    ID: number;
    PlayerID: number;
    PlayerName: string;
    ContestID: number;
    RouteID: number;
    Project: Cubes;
    R1: number;
    R2: number;
    R3: number;
    R4: number;
    R5: number;
    Best: number;
    Avg: number;
    IsBestSingle: boolean;
    IsBestAvg: boolean;
    RouteValue: Round;
    Rank: number;
}


enum RecordType {
    RecordByAvg = 1,
    RecordBySingle
}

export type Record = {
    ID: number;
    RType: RecordType;
    ScoreId: number;
    PlayerID: number;
    PlayerName: string;
    ContestID: number;
}


export type RoutesScores = {
    Round: Round[];
    Scores: Score[];
}

export type SorScore = {
    Player: Player;
    SingleCount: number;
    AvgCount: number;
}

export type ScoresByContest = {
    Contest: Contest;
    Scores: Score[];
    Rounds: Round[];
}


export type RecordMessage = {
    Record: Record;
    Player: Player;
    Score: Score;
    Contest: Contest;
}

export type Podiums = {
    Player: Player;
    Gold: number;
    Silver: number;
    Bronze: number;
}

// resp
export type GetContestsResponseContest = {
    Contest: Contest;
}

export type GetContestsResponse = {
    Size: number;
    Count: number;
    Contests: GetContestsResponseContest[];
}

export type ProjectMap = {
    Projects: Cubes[];
    En: any; // Map<Cubes, string>
    Cn: any; // Map<Cubes, string>
}

export type PlayersResponse = {
    Players: Player[];
}

export type GetTokenResponse = {
    Ts: number;
    Token: string;
}

export type GetBestScoreResponse = {
    BestSingle: any; // Map<Cubes, Score>
    BestAvg: any; // Map<Cubes, Score>
}

export type GetContestSorResponse = {
    Single: SorScore[];
    Avg: SorScore[];
}

export type GetContestScoreResponse = {
    Scores: any; //  Map<Project, RoutesScores[]>
}

export type ContestRecord = {
    Record: Record;
    Player: Player;
    Score: Score;
    Contest: Contest;
}

export type ContestPodiums = {
    Player: Player;
    Gold: number;
    Silver: number;
    Bronze: number;
}

export type GetContestResponse = {
    Contest: Contest;
    Rounds: Round[];
}

export type RankScore = {
    Rank: number;
    Score: Score;
}

export type PlayerBestScoreResponse = {
    Best: any; // Map<Cubes, RankScore>
    Avg: any; // Map<Cubes, RankScore>
}

export type GetPlayerAllScoreResponse = {
    BestSingle: Score[];
    BestAvg: Score[];
    Scores: ScoresByContest[];
}

export type GetPlayerRecord = RecordMessage[];