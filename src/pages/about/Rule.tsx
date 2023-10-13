import React, {JSX} from "react";
import {CubesCn} from "../../components/cube/cube";
import {Cubes} from "../../components/cube/cube_map";
import {GetCubeIcon} from "../../components/cube/icon/cube_icon";


type RuleDetail = {
    Cube: Cubes,
    Details: string[],
}

const RuleDetails: RuleDetail[] = [
    {
        Cube: Cubes.XCube345RelayBF,
        Details: [
            "选手需准备三、四、五阶魔方, 眼罩, 魔方罩或可遮挡的物品，盲拧规范详细细则参考WCA",
            "该项目需要执行三四五阶的一次性记忆,记忆时间内不可对魔方进行拧动,否则视为犯规",
            "在拧动开始前,选手应当戴上眼罩,然后开始还原,还原过程中不可摘下眼罩,否则视为犯规",
            "如果存在其中一个魔方为未还原状态,则视为还原失败",
            "存在多个魔方差一步失败的情况下, 按差一步还原魔方数 * 2进行加罚",
            "[温馨提示]该项目还原时间较长,选手在记忆阶段可进行饮水等放松操作,在还原开始后只能进行魔方还原,不可再进行其他动作"
        ]
    },
    {
        Cube: Cubes.Xcube333Clone,
        Details: [
            "选手需准备三阶魔方一个，计时器",
            "该项目需执行三阶克隆",
            "选手在计时开始前不允许观察图纸",
            "选手计时开始后开始观察并进行魔方操作，克隆过程中禁止触碰计时器，否则视为克隆失败",
            "[温馨提示]该项目不存在“差一步判罚”即差一步视为还原失败",
        ]
    },
    {
        Cube: Cubes.XCubePyBF,
        Details: [
            "选手需准备金字塔魔方, 眼罩, 魔方罩或可遮挡的物品，盲拧规范详细细则参考WCA",
            "该项目需要执行金字塔的一次性记忆,记忆时间内不可对魔方进行拧动,否则视为犯规",
            "在拧动开始前,选手应当戴上眼罩,然后开始还原,还原过程中不可摘下眼罩,否则视为犯规",
            "存在差一步失败的情况下, 加罚两秒",
        ]
    },
    {
        Cube: Cubes.XCube222BF,
        Details: [
            "选手需准备二阶魔方, 眼罩",
            "其他细则参考WCA盲拧规范"
        ]
    }
]


class Rule extends React.Component {

    componentDidMount() {
    }

    render() {
        const items: JSX.Element[] = []

        for (let i = 0; i < RuleDetails.length; i++) {
            const r = RuleDetails[i]


            const ps: JSX.Element[] = []
            for (let j = 0; j < r.Details.length; j++) {
                ps.push(
                    <p key={"rule_key_" + i + "_" + j}>{j + 1}、{r.Details[j]}</p>
                )
            }
            items.push(
                <div className="d-flex position-relative" key={"rule_key_" + i} style={{margin: "20px 20px"}}>
                    <div>
                        <h5 className="mt-0">{GetCubeIcon(r.Cube)}{CubesCn(r.Cube)} 规则规范</h5>
                        {ps}
                    </div>
                </div>
            )
        }

        return (<div>
            <h3><center>规则规范</center></h3>
            <br/>
            {items}
        </div>)
    }
}

export default Rule;