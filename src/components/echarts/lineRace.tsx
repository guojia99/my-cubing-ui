import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";

export type Format = echarts.EChartOption.Tooltip.Format;
export type EChartsOption = echarts.EChartOption;
export type LineRaceChatValue = {
    Title: string;
    DataKey: string[];
    Data: number[][];
    Formatter: echarts.EChartOption.Tooltip.Formatter | undefined,
}

export const LineRace = (v : LineRaceChatValue) => {

    let series = []

    for (let i = 0; i < v.DataKey.length; i++){
        series.push(
            {
                name: v.DataKey[i],
                data: v.Data[i],
                type: 'line',
            }
        )
    }


    const option: EChartsOption = {
        animationDuration: 8000,
        title: {
            text: v.Title
        },
        tooltip: {
            trigger: 'axis',
            formatter: v.Formatter,
        },
        legend: {
            data: v.DataKey,
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
        },
        series: series
    }
    return <ReactEcharts option={option}/>
}

//
//
// function run(_rawData) {
//     // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
//     const countries = [
//         'Finland',
//         'France',
//         'Germany',
//         'Iceland',
//         'Norway',
//         'Poland',
//         'Russia',
//         'United Kingdom'
//     ];
//     const datasetWithFilters = [];
//     const seriesList = [];
//     echarts.util.each(countries, function (country) {
//         var datasetId = 'dataset_' + country;
//         datasetWithFilters.push({
//             id: datasetId,
//             fromDatasetId: 'dataset_raw',
//             transform: {
//                 type: 'filter',
//                 config: {
//                     and: [
//                         { dimension: 'Year', gte: 1950 },
//                         { dimension: 'Country', '=': country }
//                     ]
//                 }
//             }
//         });
//         seriesList.push({
//             type: 'line',
//             datasetId: datasetId,
//             showSymbol: false,
//             name: country,
//             endLabel: {
//                 show: true,
//                 formatter: function (params) {
//                     return params.value[3] + ': ' + params.value[0];
//                 }
//             },
//             labelLayout: {
//                 moveOverlap: 'shiftY'
//             },
//             emphasis: {
//                 focus: 'series'
//             },
//             encode: {
//                 x: 'Year',
//                 y: 'Income',
//                 label: ['Country', 'Income'],
//                 itemName: 'Year',
//                 tooltip: ['Income']
//             }
//         });
//     });
// //     option = {
//         animationDuration: 10000,
//         dataset: [
//             {
//                 id: 'dataset_raw',
//                 source: _rawData
//             },
//             ...datasetWithFilters
//         ],
//         title: {
//             text: 'Income of Germany and France since 1950'
//         },
//         tooltip: {
//             order: 'valueDesc',
//             trigger: 'axis'
//         },
//         xAxis: {
//             type: 'category',
//             nameLocation: 'middle'
//         },
//         yAxis: {
//             name: 'Income'
//         },
//         grid: {
//             right: 140
//         },
//         series: seriesList
//     };
//     myChart.setOption(option);
// }