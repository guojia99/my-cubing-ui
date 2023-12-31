import React from 'react';
import {API} from "../../components/api/api";
import {BestSorReportResponse, SorScore} from "../../components/api/api_model";
import {TabNav, TabNavsPage} from "../../components/utils/tabs";
import {SorKeys, SorTable} from "../../components/cube/components/cube_sor";
import {SetBackGround} from "../../components/utils/background";
import TableLoader from "../../components/loading/DashboardLoader";

class Sor extends React.Component {
    state = {
        data: null,
    }

    componentDidMount() {
        SetBackGround("")
        API.GetBestSor().then(value => {
            this.setState({data: value})
        })
    }

    render() {
        if (this.state.data === null) {
            return <TableLoader/>
        }
        const data = this.state.data as BestSorReportResponse
        if (data.BestSingle === undefined && data.BestAvg === undefined) {
            return <TableLoader/>
        }
        let tabs: TabNavsPage[] = []
        SorKeys.forEach((value, key) => {
            const single = data.BestSingle[key] as SorScore[]
            const avg = data.BestAvg[key] as SorScore[]
            if (single === undefined || avg === undefined){
                return
            }
            tabs.push({
                Id: key,
                Name: (<h6>{value}</h6>),
                Page: SorTable(single, avg),
            })
        })
        return ( <TabNav Id={"sor_tabs"} SelectedKey={"sor_tabs"} Pages={tabs} Center={true}/>)
    }
}

export default Sor;