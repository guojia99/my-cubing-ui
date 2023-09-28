import React from "react";
import {SetBackGround} from "../../components/utils/background";
import {API} from "../../components/api/api";
import {GetRelativeSor, RelativeSor} from "../../components/api/api_model";
import {TabNav, TabNavsPage} from "../../components/utils/tabs";
import {RelativeSorTable, SorKeys} from "../../components/cube/components/cube_sor";


class RelativeSorPage extends React.Component {
    state = {
        data: null,
    }

    componentDidMount() {
        SetBackGround("")
        API.GetRelativeSor().then(value => {
            this.setState({data: value})
        })
    }

    render() {
        if (this.state.data === null) {
            return <div></div>
        }
        const data = this.state.data as GetRelativeSor
        console.log(data)
        let tabs: TabNavsPage[] = []
        SorKeys.forEach((value, key) => {
            const sor = data[key] as RelativeSor[]
            if (sor === undefined) {
                return
            }

            tabs.push({
                Id: key,
                Name: (<h6>{value}</h6>),
                Page: RelativeSorTable(sor, value),
            })
        })

        return (<TabNav Id={"r_sor_tabs"} SelectedKey={"r_sor_tabs"} Pages={tabs} Center={true}/>)
    }
}

export default RelativeSorPage;