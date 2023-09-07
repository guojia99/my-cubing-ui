import {Cubes} from "../cube";


export function FormatTime(result: number, pj: Cubes) {

    if (pj === Cubes.Cube333MBF) {
        return result.toFixed(0)
    }
    if (result === -10001) {
        return "DNS"
    }
    if (result === -10000) {
        return "DNF"
    }
    if (pj === Cubes.Cube333FM) {
        return result.toFixed(0)
    }

    if (result < 60) {
        return result.toFixed(2);
    }
    const minutes = Math.floor(result / 60);
    const seconds = (result % 60).toFixed(2).padStart(5, '0');
    return `${minutes}:${seconds}`;
}

export function FormatRank(result: number) {
    if (result === 0 || result === undefined) {
        return (<i style={{color: "grey"}}>DNF</i>)
    }
    if (result === -1) {
        return (<i style={{color: "grey"}}>DNS</i>)
    }
    return (<i style={{color: result === 1 ? "red" : ""}}>{result}</i>)
}