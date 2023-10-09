import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import {Cubes, CubesCn} from "../cube";
import {FormatTime} from "../components/cube_timeformat";
import {Contest, Score} from "../../api/api_model";

type Format = echarts.EChartOption.Tooltip.Format;
type EChartsOption = echarts.EChartOption;


export type ScoreChatValue = {
    Project: Cubes;
    ContestMap: Map<number, Contest>
    scores: Score[];
}

export const ScoreChat = (v: ScoreChatValue) => {

    let avg: number[] = []
    let single: number[] = []

    for (let i = 0; i < v.scores.length; i++) {
        let a = v.scores[i].Avg
        if (a <= -10000) {
            a = NaN
        }
        avg.push(a)


        let b = v.scores[i].Best
        if (b < -10000) {
            b = NaN
        }
        single.push(b)
    }


    const FormatContest = (f: Format): string => {
        const idx = f.dataIndex as number
        const score = v.scores[idx]
        const contest = v.ContestMap.get(score.ContestID)
        if (contest === undefined) {
            return '-'
        }
        return contest.Name
    }

    const FormatValue = (f: Format, isBest: boolean): string => {
        const idx = f.dataIndex as number
        const value = f.value as number

        const score = v.scores[idx]
        let baseOut = f.marker + " " + f.seriesName + ":" + FormatTime(value, score.Project, false)

        if (idx === 0) {
            return baseOut
        }

        // 成绩涨幅
        let lastValue = v.scores[idx - 1].Avg
        if (isBest) {
            lastValue = v.scores[idx - 1].Best
        }

        if (lastValue <= -10000 || lastValue === undefined || isNaN(value)){
            return baseOut
        }

        const diff = ((value - lastValue) / value) * -100
        if (diff > 0) {
            return baseOut + "<i style='color:red'>( +" + diff.toFixed(2) + "% )</i>"
        }
        return baseOut + "<i style='color:green'>(" + diff.toFixed(2) + "% )</i>"
    }

    const option: EChartsOption = {
        title: {
            text: CubesCn(v.Project)
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params: Format | Format[], ticket: string, callback: (ticket: string, html: string) => void): string {
                const param = params as Format[]
                return FormatContest(param[0]) + '<br/>' + FormatValue(param[0], false) + '<br/>' + FormatValue(param[1], true)
            }
        },
        legend: {
            data: ['平均', '单次']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        backgroundColor: "#ffffff",
        xAxis: {
            type: 'category',
            boundaryGap: false,
        },
        yAxis: {
            type: "value",
            axisLabel: {
                formatter: function (value: number, index: number) {
                    return FormatTime(value, v.Project, false)
                }
            }
        },
        series: [
            {
                name: '平均',
                data: avg,
                type: 'line',
            },
            {
                name: '单次',
                data: single,
                type: 'line',
            }
        ]
    }
    return <ReactEcharts option={option}/>
}