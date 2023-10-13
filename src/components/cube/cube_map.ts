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
    XCubePyBF = "pyram_bf",
    XCubePyFm = "pyram_fm",
    XcubeSkFm = "skewb_fm",
    XCube333Mini = "333mini",
    XCube222OH = "222oh",
    XCube333MiniOH = "333mini_oh",
    XCube444OH = "444oh",
    XCube555OH = "555oh",
    XCube666OH = "666oh",
    XCube777OH = "777oh",
    XCubeSkOH = "skewb_oh",
    XCubePyOH = "pyram_oh",
    XCubeSq1OH = "sq1_oh",
    XCubeMinxOH = "minx_oh",
    XCubeClockOH = "clock_oh",
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
    Xcube333Clone = "333clone",
    XCubeMapleLeaf = "maple_leaf",
    XCube222Minx = "222minx",

    // 数独系列
    XCubeSuDuKuVeryEasy = "sudoku_very_easy",
    XCubeSuDuKuEasy = "sudoku_easy",
    XCubeSuDuKuModerate = "sudoku_moderate",
    XCubeSuDuKuAdvanced = "sudoku_advanced",
    XCubeSuDuKuHard = "sudoku_hard",
    XCubeSuDuKuMaster = "sudoku_master",

    // 数字华容道系列
    XCube8Puzzle = "8puzzle",
    XCube15Puzzle = "15puzzle",
    XCube24Puzzle = "24puzzle",
    XCube35Puzzle = "35puzzle",
    XCube48Puzzle = "48puzzle",
    XCube63Puzzle = "63puzzle",
    XCube80Puzzle = "80puzzle",
}

export enum SegmentationType {
    WCA = "WCA项目",
    XCube = "趣味项目",
    XCubeBF = "趣味盲拧",
    XCubeOH = "趣味单手",
    XCubeFm = "趣味最少步",
    XCubeRelay = "趣味连拧",
    NotCube = "趣味非魔方"
}
export enum CubesRouteType {
    RouteType1rounds = "1_r",      // 单轮项目
    RouteType3roundsBest = "3_r_b", // 三轮取最佳
    RouteType3roundsAvg = "3_r_a",   // 三轮取平均
    RouteType5roundsBest = "5_r_b",   // 五轮取最佳
    RouteType5roundsAvg = "5_r_a",  // 五轮取平均
    RouteType5RoundsAvgHT = "5_r_a_ht",// 五轮去头尾取平均
    RouteTypeRepeatedly = "ry",    // 单轮多次还原项目, 成绩1:还原数; 成绩2:尝试数; 成绩3:时间;
}
export function CubesRouteTypeCn(typ: CubesRouteType): string {
    switch (typ) {
        case CubesRouteType.RouteType1rounds:
            return "单轮项目"
        case CubesRouteType.RouteType3roundsAvg:
            return "三轮取平均"
        case CubesRouteType.RouteType3roundsBest:
            return "三轮取最佳"
        case CubesRouteType.RouteTypeRepeatedly:
            return "单轮多次还原项目"
        case CubesRouteType.RouteType5roundsAvg:
            return "五轮取平均"
        case CubesRouteType.RouteType5RoundsAvgHT:
            return "五轮去头尾取平均"
        case CubesRouteType.RouteType5roundsBest:
            return "五轮取最佳"
    }
}

export function SegmentationTypeList(): SegmentationType[] {
    return [
        SegmentationType.WCA,
        SegmentationType.XCube,
        SegmentationType.XCubeBF,
        SegmentationType.XCubeOH,
        SegmentationType.XCubeFm,
        SegmentationType.XCubeRelay,
        SegmentationType.NotCube,
    ]
}
export function CubesRouteTypeNumber(typ: CubesRouteType) : number{
    switch (typ){
        case CubesRouteType.RouteType1rounds:
            return 1
        case CubesRouteType.RouteType5roundsBest:
            return 5
        case CubesRouteType.RouteType5RoundsAvgHT:
            return 5
        case CubesRouteType.RouteType5roundsAvg:
            return 5
        case CubesRouteType.RouteType3roundsBest:
            return 3
        case CubesRouteType.RouteType3roundsAvg:
            return 3
        case CubesRouteType.RouteTypeRepeatedly:
            return 3
    }
}




export type CubesAttributes = {
    Cubes: Cubes, // 项目
    Cn: string, // 中文名
    RouteType: CubesRouteType, // 项目轮次形式
    IsWCA: boolean, // 是否WCA项目
    Segmentation: SegmentationType, // 细分类
}

export const CubesAttributesList: CubesAttributes[] = [
    // WCA正阶
    {
        Cubes: Cubes.Cube333,
        Cn: "三阶",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.Cube222,
        Cn: "二阶",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.Cube444,
        Cn: "四阶",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.Cube555,
        Cn: "五阶",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.Cube666,
        Cn: "六阶",
        RouteType: CubesRouteType.RouteType3roundsAvg,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.Cube777,
        Cn: "七阶",
        RouteType: CubesRouteType.RouteType3roundsAvg,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.CubeSk,
        Cn: "斜转",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.CubePy,
        Cn: "金字塔",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.CubeSq1,
        Cn: "SQ1",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.CubeMinx,
        Cn: "五魔方",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.CubeClock,
        Cn: "魔表",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.Cube333OH,
        Cn: "单手",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.Cube333FM,
        Cn: "最少步",
        RouteType: CubesRouteType.RouteType3roundsBest,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.Cube333BF,
        Cn: "三盲",
        RouteType: CubesRouteType.RouteType3roundsBest,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.Cube444BF,
        Cn: "四盲",
        RouteType: CubesRouteType.RouteType3roundsBest,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.Cube555BF,
        Cn: "五盲",
        RouteType: CubesRouteType.RouteType3roundsBest,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.Cube333MBF,
        Cn: "多盲",
        RouteType: CubesRouteType.RouteTypeRepeatedly,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },
    {
        Cubes: Cubes.Cube333Ft,
        Cn: "脚拧",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: true,
        Segmentation: SegmentationType.WCA,
    },


    // --------------------------- XCUbe ---------------------------
    {
        Cubes: Cubes.XCube222BF,
        Cn: "二盲",
        RouteType: CubesRouteType.RouteType5roundsBest,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeBF,
    },
    {
        Cubes: Cubes.XCube666BF,
        Cn: "六盲",
        RouteType: CubesRouteType.RouteType1rounds,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeBF,
    },
    {
        Cubes: Cubes.XCube777BF,
        Cn: "七盲",
        RouteType: CubesRouteType.RouteType1rounds,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeBF,
    },
    {
        Cubes: Cubes.XCubePyBF,
        Cn: "塔盲",
        RouteType: CubesRouteType.RouteType3roundsBest,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeBF,
    },
    {
        Cubes: Cubes.XCubePyFm,
        Cn: "塔少步",
        RouteType: CubesRouteType.RouteType3roundsAvg,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeFm,
    },
    {
        Cubes: Cubes.XcubeSkFm,
        Cn: "斜少步",
        RouteType: CubesRouteType.RouteType3roundsAvg,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeFm,
    },
    {
        Cubes: Cubes.XCube333Mini,
        Cn: "三阶迷你",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.XCube,
    },
    {
        Cubes: Cubes.XCube333MiniOH,
        Cn: "三阶迷你单",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.XCube,
    },
    {
        Cubes: Cubes.XCube222OH,
        Cn: "二单",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeOH,
    },
    {
        Cubes: Cubes.XCube444OH,
        Cn: "四单",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeOH,
    },
    {
        Cubes: Cubes.XCube555OH,
        Cn: "五单",
        RouteType: CubesRouteType.RouteType3roundsAvg,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeOH,
    },
    {
        Cubes: Cubes.XCube666OH,
        Cn: "六单",
        RouteType: CubesRouteType.RouteType1rounds,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeOH,
    },
    {
        Cubes: Cubes.XCube777OH,
        Cn: "七单",
        RouteType: CubesRouteType.RouteType1rounds,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeOH,
    },
    {
        Cubes: Cubes.XCubeSkOH,
        Cn: "斜转单",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeOH,
    },
    {
        Cubes: Cubes.XCubePyOH,
        Cn: "金字塔单",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeOH,
    },
    {
        Cubes: Cubes.XCubeClockOH,
        Cn: "表单",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeOH,
    },
    {
        Cubes: Cubes.XCubeSq1OH,
        Cn: "SQ1单",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeOH,
    },
    {
        Cubes: Cubes.XCubeMinxOH,
        Cn: "五魔单",
        RouteType: CubesRouteType.RouteType3roundsAvg,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeOH,
    },
    {
        Cubes: Cubes.XCube333Mirror,
        Cn: "镜面魔方",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.XCube,
    },
    {
        Cubes: Cubes.XCube333Mirroring,
        Cn: "镜向三阶",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.XCube,
    },
    {
        Cubes: Cubes.XCube333Multiple5,
        Cn: "三阶五连",
        RouteType: CubesRouteType.RouteType5roundsBest,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeRelay,
    },
    {
        Cubes: Cubes.XCube333Multiple10,
        Cn: "三阶十连",
        RouteType: CubesRouteType.RouteType1rounds,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeRelay,
    },
    {
        Cubes: Cubes.XCube333Multiple15,
        Cn: "三阶十五连",
        RouteType: CubesRouteType.RouteType1rounds,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeRelay,
    },
    {
        Cubes: Cubes.XCube333Multiple20,
        Cn: "三阶二十连",
        RouteType: CubesRouteType.RouteType1rounds,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeRelay,
    },
    {
        Cubes: Cubes.XCube27Relay,
        Cn: "正阶连拧",
        RouteType: CubesRouteType.RouteType1rounds,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeRelay,
    },
    {
        Cubes: Cubes.XCube345RelayBF,
        Cn: "盲连拧",
        RouteType: CubesRouteType.RouteType1rounds,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeRelay,
    },
    {
        Cubes: Cubes.XCubeAlienRelay,
        Cn: "异形连拧",
        RouteType: CubesRouteType.RouteType1rounds,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeRelay,
    },
    {
        Cubes: Cubes.XCube27AlienRelayAll,
        Cn: "全项目连拧",
        RouteType: CubesRouteType.RouteType1rounds,
        IsWCA: false,
        Segmentation: SegmentationType.XCubeRelay,
    },
    {
        Cubes: Cubes.XCube333Ghost,
        Cn: "鬼魔",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.XCube,
    },
    {
        Cubes: Cubes.XCube333ZongZi,
        Cn: "粽子",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.XCube,
    },
    {
        Cubes: Cubes.Xcube333Clone,
        Cn: "三阶克隆",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.XCube,
    },
    {
        Cubes: Cubes.XCubeMapleLeaf,
        Cn: "枫叶",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.XCube,
    },
    {
        Cubes: Cubes.XCube222Minx,
        Cn: "二阶五魔",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.XCube,
    },

    // 非魔方
    {
        Cubes: Cubes.XCubeSuDuKuVeryEasy,
        Cn: "数独入门",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.NotCube,
    },
    {
        Cubes: Cubes.XCubeSuDuKuEasy,
        Cn: "数独初级",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.NotCube,
    },
    {
        Cubes: Cubes.XCubeSuDuKuModerate,
        Cn: "数独中级",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.NotCube,
    },
    {
        Cubes: Cubes.XCubeSuDuKuAdvanced,
        Cn: "数独高级",
        RouteType: CubesRouteType.RouteType3roundsBest,
        IsWCA: false,
        Segmentation: SegmentationType.NotCube,
    },
    {
        Cubes: Cubes.XCubeSuDuKuHard,
        Cn: "数独困难",
        RouteType: CubesRouteType.RouteType3roundsBest,
        IsWCA: false,
        Segmentation: SegmentationType.NotCube,
    },
    {
        Cubes: Cubes.XCubeSuDuKuMaster,
        Cn: "数独大师",
        RouteType: CubesRouteType.RouteType3roundsBest,
        IsWCA: false,
        Segmentation: SegmentationType.NotCube,
    },


    // 华容道
    {
        Cubes: Cubes.XCube8Puzzle,
        Cn: "3阶数字华容道",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.NotCube,
    },
    {
        Cubes: Cubes.XCube15Puzzle,
        Cn: "4阶数字华容道",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.NotCube,
    },
    {
        Cubes: Cubes.XCube24Puzzle,
        Cn: "5阶数字华容道",
        RouteType: CubesRouteType.RouteType5RoundsAvgHT,
        IsWCA: false,
        Segmentation: SegmentationType.NotCube,
    },
    {
        Cubes: Cubes.XCube35Puzzle,
        Cn: "6阶数字华容道",
        RouteType: CubesRouteType.RouteType3roundsBest,
        IsWCA: false,
        Segmentation: SegmentationType.NotCube,
    },
    {
        Cubes: Cubes.XCube48Puzzle,
        Cn: "7阶数字华容道",
        RouteType: CubesRouteType.RouteType3roundsBest,
        IsWCA: false,
        Segmentation: SegmentationType.NotCube,
    },
    {
        Cubes: Cubes.XCube63Puzzle,
        Cn: "8阶数字华容道",
        RouteType: CubesRouteType.RouteType3roundsBest,
        IsWCA: false,
        Segmentation: SegmentationType.NotCube,
    },
    {
        Cubes: Cubes.XCube80Puzzle,
        Cn: "9阶数字华容道",
        RouteType: CubesRouteType.RouteType3roundsBest,
        IsWCA: false,
        Segmentation: SegmentationType.NotCube,
    },

    // 其他
    {
        Cubes: Cubes.JuBaoHaoHao,
        Cn: "菊爆浩浩",
        RouteType: CubesRouteType.RouteType1rounds,
        IsWCA: false,
        Segmentation: SegmentationType.NotCube,
    },
    {
        Cubes: Cubes.OtherCola,
        Cn: "速可乐",
        RouteType: CubesRouteType.RouteType1rounds,
        IsWCA: false,
        Segmentation: SegmentationType.NotCube,
    }
]

const cubesAttributesMapFn = (): Map<Cubes, CubesAttributes> => {
    const out = new Map<Cubes, CubesAttributes>()
    CubesAttributesList.forEach((k) => {
        out.set(k.Cubes, k)
    })
    return out
}

export const CubesAttributesMap: Map<Cubes, CubesAttributes> = cubesAttributesMapFn()