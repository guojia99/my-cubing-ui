import {Cubes} from "../cube/cube_map";


export type Contest = {
    ID: number;
    Name: string;
    IsEnd: boolean;
    Description: string;
    Type: string;
    RoundIdsVal: number[] | null;
    GroupID: string;
    StartTime: string;
    EndTime: string;
    Rounds: Round[],
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
    QQ: string,
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
    score_id: number;
    ScoreValue: Score;
    PlayerID: number;
    PlayerName: string;
    ContestID: number;
    ContestValue: Contest;
}

export type RoutesScores = {
    Round: Round[];
    Scores: Score[];
}

export type SorScore = {
    Player: Player;
    SingleRank: number;
    SingleCount: number;
    SingleProjects: number;
    AvgRank: number;
    AvgCount: number;
    AvgProjects: number;
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

export type PodiumsResult = {
    Contest: Contest;
    Score: Score;
}

export type Podiums = {
    Player: Player;
    Gold: number;
    Silver: number;
    Bronze: number;
    PodiumsResults: PodiumsResult[];
}

export type XLog = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    Title: string;
    CreatedTime: string;
    Area: string;
    Messages: string;
}

// resp
export type GetContestsResponse = {
    Size: number;
    Count: number;
    Contests: Contest[];
}

export type ProjectMap = {
    Projects: Cubes[];
    En: any; // Map<Cubes, string>
    Cn: any; // Map<Cubes, string>
}

export type PlayersResponse = {
    Size: number;
    Count: number;
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
    Single: any; // map[key][]SorScore
    Avg: any; // map[key][]SorScore
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

export type RankScore = {
    Rank: number;
    Score: Score;
}

export type PlayerBestScoreResponse = {
    Best: any; // Map<Cubes, RankScore>
    Avg: any; // Map<Cubes, RankScore>
}

export type PlayerSorResponse = {
    Single: any; // map[key]SorScore
    Avg: any; // map[key]SorScore
}

export type GetPlayerAllScoreResponse = {
    BestSingle: Score[];
    BestAvg: Score[];
    Scores: ScoresByContest[];
}

export type GetPlayerRecord = RecordMessage[];

export type GetRecordsResponse = {
    Count: number;
    Size: number;
    Records: Record[];
}

export type BestSorReportResponse = {
    BestSingle: any; // map[key][]SorScore
    BestAvg: any; // map[key][]SorScore
}

export type ScorePenalty = {
    R1: number[],
    R2: number[],
    R3: number[],
    R4: number[],
    R5: number[],
}

export type AddScoreRequest = {
    PlayerName: string,
    ContestID: number,
    Project: Cubes,
    RouteNum: number,
    Penalty: ScorePenalty,
    Results: number[],
}

export type CreateContestRequestRound = {
    Project: Cubes;
    Number: number;
    Part: number;
    Name: string;
    IsStart: boolean;
    Final: boolean;
    Upsets: string[];
}

export type CreateContestRequest = {
    Name: string,
    Description: string,
    GroupID: string,
    Rounds: CreateContestRequestRound[],
    Type: string,
    StartTime: number,
    EndTime: number,
}

export type GetBestByAllScoresResponse = {
    BestSingle: any, // Map<Cubes, Score[]>
    BestAvg: any, // Map<Cubes, Score[]>
}

export type GetPlayerNemesisDetail = {
    Player: Player,
    Single: any,// Map<Cubes, Score>
    Avg: any,// Map<Cubes, Score>
}

export type GetPlayerNemesisResponse = GetPlayerNemesisDetail[]


export type  GetPlayerImageResponse = {
    Avatar: string,
    Background: string,
}

export type RelativeSor = {
    Player: Player,
    Sor: number,
    Avg: number,
    Top5: number,
    Max: number,
}

export type GetRelativeSor = any // map[key][]RelativeSor
export type GetPlayerRelativeSor = any // map[key]RelativeSor
export type GetAvgRelativeSor = any // map[key]RelativeSor


export type PreScore = Score & {
    Recorder: string, // 记录人
    Processor: string, // 处理人
    Finish: boolean, // 是否已处理
    FinishDetail: string, // 处理结果
    Source: string, // 来源
    RoundName: string, // 轮次名
    ContestName: string, // 比赛名
}
export type GetPreScores = {
    Size: number,
    Count: number,
    Scores: PreScore[],
}

export type NeglectPreScoresRequest = {
    ID: number,
    Processor: string
}

export type RecordPreScoresRequest = {
    ID: number,
    Processor: string
}

export type GetContestStatic = Contest & {
    PlayerNum: number,
    ProjectNum: number,
}

export type GetContestStaticsResponse = GetContestStatic[]


export type GaoXiaoWCAResult = {
    BestRank: number,
    BestStr: string,
    BestPersonName: string,
    BestPersonWCAID: string
    AvgRank: number,
    AvgStr: string,
    AvgPersonName: string,
    AvgPersonWCAID: string,
}

export type GetGaoXiaoStaticsResponse = any; // map[string]GaoXiaoWCAResult[]