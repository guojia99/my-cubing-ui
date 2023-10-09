import ReactEcharts from "echarts-for-react";


export type SorChatValueKeyMap = {
    Name: string,
    Max: number,
}

export type SorChatItem = {
    Name: string,
    Data: number[],
}

export type SorChatValue = {
    Title: string,
    KeyMap: SorChatValueKeyMap[],
    Items: SorChatItem[],
}

export const SorChat = (v: SorChatValue) => {

    const legendName: string[] = []
    const data: { value: number[], name: string }[] = []
    v.Items.forEach((value) => {
        legendName.push(value.Name)
        data.push({value: value.Data, name: value.Name})
    })


    const indicator: { name: string, max: number }[] = []
    v.KeyMap.forEach((value) => {
        indicator.push({name: value.Name, max: value.Max})
    })


    const option = {
        title: {
            // text: v.Title,
        },
        legend: {
            data: legendName,
            left: "auto",
        },
        radar: {
            indicator: indicator,
        },
        series: [
            {
                tooltip: {
                    formatter: (params: any) => {
                        let {name, value} = params.data
                        return `${name} <br/> ${value[params.dataIndex]}`
                    }
                },
                // name: v.Title,
                type: 'radar',
                data: data,
                padding: [10, 5, 30, 5],
            }
        ]
    };

    return <ReactEcharts option={option}/>
}
