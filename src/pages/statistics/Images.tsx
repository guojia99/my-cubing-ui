import React, {JSX} from "react";
import {SetBackGround} from "../../components/utils/background";
import {API} from "../../components/api/api";
import {LineRace, LineRaceChatValue, Format} from "../../components/echarts/lineRace";
import {GetContestStaticsResponse} from "../../components/api/api_model";
import echarts from "echarts";
import BarChartLoader from "../../components/loading/BarChartLoader";

class Images extends React.Component {

    state = {
        statics: null
    }

    componentDidMount() {
        SetBackGround("")

        API.GetContestStatics().then(value => {
            this.setState({statics: value})
        })
    }


    renderContestStatics(): JSX.Element {
        if (this.state.statics === null) {
            return <BarChartLoader/>
        }
        const data = this.state.statics as GetContestStaticsResponse

        function fm(d: GetContestStaticsResponse): echarts.EChartOption.Tooltip.Formatter {
            return function (params: Format | Format[], ticket: string, callback: (ticket: string, html: string) => void): string {
                const param = params as Format[]
                const p0 = param[0]
                const idx = p0.dataIndex as number
                const contest = d[idx]
                return contest.Name + '<br/>' +
                    param[0].marker + "" + param[0].seriesName + ":" + param[0].value + '<br/>' +
                    param[1].marker + "" + param[1].seriesName + ":" + param[1].value
            }
        }


        const online: LineRaceChatValue = {
            Title: "线上群赛参与情况",
            DataKey: ["参与人数", "参与项目数"],
            Data: [[], []],
            Formatter: undefined,
        }

        const offline: LineRaceChatValue = {
            Title: "线下群赛参与情况",
            DataKey: ["参与人数", "参与项目数"],
            Data: [[], []],
            Formatter: undefined,
        }


        let onlineData: GetContestStaticsResponse = []
        let offlineData: GetContestStaticsResponse = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].Name.indexOf("群赛") === -1) {
                continue
            }

            if (data[i].Type === "offline") {
                offline.Data[0].push(data[i].PlayerNum)
                offline.Data[1].push(data[i].ProjectNum)
                offlineData.push(data[i])
            } else if (data[i].Type === "online") {
                online.Data[0].push(data[i].PlayerNum)
                online.Data[1].push(data[i].ProjectNum)
                onlineData.push(data[i])
            }
        }

        online.Formatter = fm(onlineData)
        offline.Formatter = fm(offlineData)


        return (
            <div>
                {LineRace(online)}
                <br/>
                {LineRace(offline)}
            </div>
        )

    }


    render() {
        return (
            <div>
                {this.renderContestStatics()}
            </div>
        );
    }
}

export default Images;