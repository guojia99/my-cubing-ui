import {MapHTMLAttributes} from "react";
import Sor from "../../pages/Sor";

export enum Project {
    Cube222 = 1,
    Cube333,
    Cube444,
    Cube555,
    Cube666,
    Cube777,
    CubeSk,
    CubePy,
    CubeSq1,
    CubeMinx,
    CubeClock,
    Cube333OH,
    Cube333FM,
    Cube333BF,
    Cube444BF,
    Cube555BF,
    Cube333MBF,
    JuBaoHaoHao,
    OtherCola
}


export type Contest = {
    ID: number;
    Name: string;
    IsEnd: boolean;
    Description: string;
    Type: string;
    RoundIdsVal: number[] | null;
    StartTime: string ;
    EndTime: string;
}

export type Round = {
    ID: number;
    ContestID: number;
    Project: Project;
    Number: number;
    Name: string;
    Final: boolean;
    UpsetsVal: string[];
}

export type Player = {
    ID: number;
    Name: string;
    WcaID: string | null;
    ActualName: string | null;
}

export type Score = {
    ID: number;
    PlayerID: number;
    PlayerName: string;
    ContestID: number;
    RouteID: number;
    Project: Project;
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
    Round: Round;
    Scores: Score[];
}

export type SorScore = {
    Player: Player;
    SingleCount: number;
    AvgCount: number;
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
    Projects: Project[];
    En: Map<Project, string>;
    Cn: Map<Project, string>;
}

export type PlayersResponse = {
    Players: Player[];
}

export type GetTokenResponse = {
    Ts: number;
    Token: string;
}

export type GetBestScoreResponse = {
    BestSingle: Map<Project, Score>;
    BestAvg: Map<Project, Score>;
}

export type GetContestSorResponse = {
    Single: SorScore[];
    Avg: SorScore[];
}

export type GetContestScore = {
    Scores: Map<Project, RoutesScores[]>
}