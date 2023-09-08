export enum Cubes {
    JuBaoHaoHao = "jhh",
    OtherCola = "o_cola",
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
    XCube222BF = "222bf",
    XCube666BF = "666bf",
    XCube777BF = "777bf",
    XCube333Mini = "333mini",
    XCube222OH = "222oh",
    XCube333MiniOH = "333mini_oh",
    XCube444OH = "444oh",
    XCube555OH = "555oh",
    XCube666OH = "666oh",
    XCube777OH = "777oh",
    XCubeSkOH = "skewb_oh",
    XCubePyOH = "pyram_oh",
    XCubeSq1OH = "sql_oh",
    XCubeMinxOH = "minx_oh",
    XCube333Mirror = "333mirror",
    XCube333Mirroring = "333mirroring",
    XCube333Multiple5 = "333multiple5",
    XCube333Multiple10 = "333multiple10",
    XCube333Multiple15 = "333multiple15",
    XCube333Multiple20 = "333multiple20",
    XCube27Relay = "2_7relay",
    XCube345RelayBF = "345relay_bf",
    XCubeAlienRelay = "alien_relay",
    XCube27AlienRelayAll = "27alien_relay",
    XCube333Ghost = "333ghost",
    XCube333ZongZi = "333Zongzi",
}

const cubeCnMap: Map<Cubes, string> = new Map([
    [Cubes.JuBaoHaoHao, "菊爆浩浩"],
    [Cubes.OtherCola, "速可乐"],
    [Cubes.Cube222, "二阶"],
    [Cubes.Cube333, "三阶"],
    [Cubes.Cube444, "四阶"],
    [Cubes.Cube555, "五阶"],
    [Cubes.Cube666, "六阶"],
    [Cubes.Cube777, "七阶"],
    [Cubes.CubeSk, "斜转"],
    [Cubes.CubePy, "金字塔"],
    [Cubes.CubeSq1, "SQ1"],
    [Cubes.CubeMinx, "五魔方"],
    [Cubes.CubeClock, "魔表"],
    [Cubes.Cube333OH, "单手"],
    [Cubes.Cube333FM, "最少步"],
    [Cubes.Cube333BF, "三盲"],
    [Cubes.Cube444BF, "四盲"],
    [Cubes.Cube555BF, "五盲"],
    [Cubes.Cube333MBF, "多盲"],
    [Cubes.Cube333Ft, "脚拧"],
    [Cubes.XCube222BF, "二盲"],
    [Cubes.XCube666BF, "六盲"],
    [Cubes.XCube777BF, "七盲"],
    [Cubes.XCube333Mini, "三阶迷你"],
    [Cubes.XCube333MiniOH, "三阶迷你单"],
    [Cubes.XCube222OH, "二单"],
    [Cubes.XCube444OH, "四单"],
    [Cubes.XCube555OH, "五单"],
    [Cubes.XCube666OH, "六单"],
    [Cubes.XCube777OH, "七单"],
    [Cubes.XCubeSkOH, "斜转单"],
    [Cubes.XCubePyOH, "金字塔单"],
    [Cubes.XCubeSq1OH, "SQ1单"],
    [Cubes.XCubeMinxOH, "五魔单"],
    [Cubes.XCube333Mirror, "镜面魔方"],
    [Cubes.XCube333Mirroring, "镜向三阶"],
    [Cubes.XCube333Multiple5, "三阶五连"],
    [Cubes.XCube333Multiple10, "三阶十连"],
    [Cubes.XCube333Multiple15, "三阶十五连"],
    [Cubes.XCube333Multiple20, "三阶二十连"],
    [Cubes.XCube27Relay, "正阶连拧"],
    [Cubes.XCube345RelayBF, "盲连拧"],
    [Cubes.XCubeAlienRelay, "异形连拧"],
    [Cubes.XCube27AlienRelayAll, "全项目连拧"],
    [Cubes.XCube333Ghost, "鬼魔"],
    [Cubes.XCube333ZongZi, "粽子魔方"],
]);


export const CubeRouteNumber: Map<Cubes, number> = new Map([
    [Cubes.JuBaoHaoHao, 1],
    [Cubes.OtherCola, 1],
    [Cubes.Cube222, 5],
    [Cubes.Cube333, 5],
    [Cubes.Cube444, 5],
    [Cubes.Cube555, 5],
    [Cubes.Cube666, 3],
    [Cubes.Cube777, 3],
    [Cubes.CubeSk, 5],
    [Cubes.CubePy, 5],
    [Cubes.CubeSq1, 5],
    [Cubes.CubeMinx, 5],
    [Cubes.CubeClock, 5],
    [Cubes.Cube333OH, 5],
    [Cubes.Cube333FM, 3],
    [Cubes.Cube333BF, 3],
    [Cubes.Cube444BF, 3],
    [Cubes.Cube555BF, 3],
    [Cubes.Cube333MBF, 3],
    [Cubes.Cube333Ft, 5],
    [Cubes.XCube222BF, 5],
    [Cubes.XCube666BF, 1],
    [Cubes.XCube777BF, 1],
    [Cubes.XCube333Mini, 5],
    [Cubes.XCube333MiniOH, 5],
    [Cubes.XCube222OH, 5],
    [Cubes.XCube444OH, 5],
    [Cubes.XCube555OH, 3],
    [Cubes.XCube666OH, 1],
    [Cubes.XCube777OH, 1],
    [Cubes.XCubeSkOH, 5],
    [Cubes.XCubePyOH, 5],
    [Cubes.XCubeSq1OH, 5],
    [Cubes.XCubeMinxOH, 1],
    [Cubes.XCube333Mirror, 5],
    [Cubes.XCube333Mirroring, 5],
    [Cubes.XCube333Multiple5, 5],
    [Cubes.XCube333Multiple10, 1],
    [Cubes.XCube333Multiple15, 1],
    [Cubes.XCube333Multiple20, 1],
    [Cubes.XCube27Relay, 1],
    [Cubes.XCube345RelayBF, 1],
    [Cubes.XCubeAlienRelay, 1],
    [Cubes.XCube27AlienRelayAll, 1],
    [Cubes.XCube333Ghost, 5],
    [Cubes.XCube333ZongZi, 5],
]);


export const CubesCn = (c: Cubes) => {
    const out = cubeCnMap.get(c)
    return out ? out : "其他"
}

export const AllProjectList = () => {
    let all = WCAProjectList()
    all.push(...XCubeProjectList())
    all.push(...XCubeOHProjectList())
    all.push(...XCubeRelaysList())
    return all
}

export const WCAProjectList = () => {
    return [
        Cubes.Cube333,
        Cubes.Cube222,
        Cubes.Cube444,
        Cubes.Cube555,
        Cubes.Cube666,
        Cubes.Cube777,
        Cubes.Cube333BF,
        Cubes.Cube333FM,
        Cubes.Cube333OH,
        Cubes.CubeClock,
        Cubes.CubeMinx,
        Cubes.CubePy,
        Cubes.CubeSk,
        Cubes.CubeSq1,
        Cubes.Cube444BF,
        Cubes.Cube555BF,
        Cubes.Cube333MBF,
        Cubes.Cube333Ft,
    ]
}

export const XCubeProjectList = () => {
    return [
        Cubes.XCube222BF,
        Cubes.XCube666BF,
        Cubes.XCube777BF,
        Cubes.XCube333Mini,
        Cubes.XCube333Mirror,
        Cubes.XCube333Mirroring,
        Cubes.XCube333Ghost,
        Cubes.XCube333ZongZi,
    ]
}

export const XCubeOHProjectList = () => {
    return [
        Cubes.XCube222OH,
        Cubes.XCube333MiniOH,
        Cubes.XCube444OH,
        Cubes.XCube555OH,
        Cubes.XCube666OH,
        Cubes.XCube777OH,
        Cubes.XCubeSkOH,
        Cubes.XCubePyOH,
        Cubes.XCubeSq1OH,
        Cubes.XCubeMinxOH,
    ]
}

// XCubeRelaysList 趣味连拧系列
export const XCubeRelaysList = () => {
    return [
        Cubes.XCube333Multiple5,
        Cubes.XCube333Multiple10,
        Cubes.XCube333Multiple15,
        Cubes.XCube333Multiple20,
        Cubes.XCube27Relay,
        Cubes.XCube345RelayBF,
        Cubes.XCubeAlienRelay,
        Cubes.XCube27AlienRelayAll,
    ]
}

