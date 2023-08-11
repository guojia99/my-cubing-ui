import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import {FormatTime} from "./cube_timeformat";
import {Cubes, CubesCn} from "./cube";
import {Contest, Score} from "../../api/api_model";
import {PR_And_GR_Record} from "./cube_record";

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
        avg.push(v.scores[i].Avg)
        single.push(v.scores[i].Best)
    }


    const FormatContest = (f: Format): string => {
        const idx = f.dataIndex as number
        const score = v.scores[idx]
        const contest = v.ContestMap.get(score.ContestID)
        if (contest === undefined){
            return '-'
        }
        return contest.Name
    }

    const FormatValue = (f: Format): string => {
        const idx = f.dataIndex as number
        const value = f.value as number
        const score = v.scores[idx]
        return f.marker + " " + f.seriesName + ":" + FormatTime(value, score.Project)
    }

    const option: EChartsOption = {
        title: {
            text: CubesCn(v.Project)
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params: Format | Format[], ticket: string, callback: (ticket: string, html: string) => void): string {
                const param = params as Format[]
                return FormatContest(param[0]) + '<br/>' + FormatValue(param[0]) + '<br/>' + FormatValue(param[1])
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
        xAxis: {
            type: 'category',
            boundaryGap: false,
        },
        yAxis: {
            type: "value",
            axisLabel: {
                formatter: function (value: number, index: number) {
                    return FormatTime(value, v.Project)
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