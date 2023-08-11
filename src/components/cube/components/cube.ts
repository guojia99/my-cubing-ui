export enum Cubes {
    Cube333 = "333",
    Cube222 = "222",
    Cube444 = "444",
    Cube555 = "555",
    Cube666 = "666",
    Cube777 = "777",
    CubeSk = "skewb",
    CubePy = "pyram",
    CubeSq1 = "sq1",
    CubeMinx = "minx",
    CubeClock = "clock",
    Cube333OH = "333oh",
    Cube333FM = "333fm",
    Cube333BF = "333bf",
    Cube444BF = "444bf",
    Cube555BF = "555bf",
    Cube333MBF = "333mbf",
    Cube333Ft = "333ft",
}

export const CubesCn = (c: Cubes) => {
    switch (c) {
        case Cubes.Cube222:
            return "二阶"
        case Cubes.Cube333:
            return "三阶"
        case Cubes.Cube333BF:
            return "三盲"
        case Cubes.Cube333FM:
            return "最少步"
        case Cubes.Cube333MBF:
            return "多盲"
        case Cubes.Cube333OH:
            return "单手"
        case Cubes.Cube444:
            return "四阶"
        case Cubes.Cube444BF:
            return "四盲"
        case Cubes.Cube555:
            return "五阶"
        case Cubes.Cube555BF:
            return "五盲"
        case Cubes.Cube666:
            return "六阶"
        case Cubes.Cube777:
            return "七阶"
        case Cubes.CubeClock:
            return "魔表"
        case Cubes.CubeMinx:
            return "五魔方"
        case Cubes.CubePy:
            return "金字塔"
        case Cubes.CubeSk:
            return "斜转"
        case Cubes.CubeSq1:
            return "Square-1"
        case Cubes.Cube333Ft:
            return "脚拧"
        default:
            return ""
    }
}
