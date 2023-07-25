import React from 'react';
import {API} from "../../components/api/api";
import * as ReactDom from "react-dom";
import {GetContestsResponse} from "../../components/api/api_model";


class Contests extends React.Component {
    state = {
        data: null,
    }

    componentDidMount() {
        API.GetContest().then(value => {
            this.setState({data: value})
        })
    }

    render() {
        if (this.state.data === null){
            return (<div></div>)
        }

        let data = this.state.data as GetContestsResponse
        console.log(data)


        return (
            <div>
                {data.Contests.map(item => (
                    <p id={item.Contest.ID.toString()}>{item.Contest.Name}</p>
                ))}
            </div>
        )
    }
}

export default Contests;