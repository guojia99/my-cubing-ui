import {Score} from "./api_model";
import {CubesAttributesMap, CubesRouteType} from "../cube/cube_map";


const DNF = -10000

export function ScoreDBest(score: Score) {
    return score.Best <= DNF
}

export function ScoreDAvg(score: Score) {
    return score.Avg <= DNF
}


export function IsBestScore(s: Score, other: Score) {
    const pj = CubesAttributesMap.get(s.Project)
    if (pj === undefined) {
        return false
    }

    if (ScoreDBest(s) || ScoreDBest(other)) {
        return !ScoreDBest(s)
    }

    switch (pj.RouteType) {
        case  CubesRouteType.RouteTypeRepeatedly:
            if (s.Best === other.Best) {
                return s.R3 < other.R3
            }
            return s.Best > other.Best
        default:
            if (s.Best === other.Best) {
                return s.Avg < other.Avg
            }
            return s.Best < other.Best
    }
}

export function IsAvgScore(s: Score, other: Score) {
    const pj = CubesAttributesMap.get(s.Project)
    if (pj === undefined) {
        return false
    }

    switch (pj.RouteType) {
        case CubesRouteType.RouteTypeRepeatedly:
            return true
        default:
            if (ScoreDAvg(s) || ScoreDAvg(other)) {
                return !ScoreDAvg(s)
            }
            if (ScoreDAvg(s) && ScoreDAvg(other)) {
                return IsBestScore(s, other)
            }
            return s.Avg < other.Avg
    }
}


export function SortScores(data: Score[]) {
    if (data === undefined || data.length === 0) {
        return data
    }
    const pj = CubesAttributesMap.get(data[0].Project)
    if (pj === undefined) {
        return data
    }


    data = data.sort((a: Score, b: Score) => {
        switch (pj.RouteType) {
            case CubesRouteType.RouteType3roundsAvg:
            case CubesRouteType.RouteType5roundsAvg:
            case CubesRouteType.RouteType5RoundsAvgHT:
                return IsAvgScore(a, b) ? -1 : 1
            default:
                return IsBestScore(a, b) ? -1 : 1
        }
    })
    return data
}