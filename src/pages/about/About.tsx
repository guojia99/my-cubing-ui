/*
 *  * Copyright (c) 2023 guojia99 All rights reserved.
 *  * Created: 2023/7/21 下午6:11.
 *  * Author: guojia(https://github.com/guojia99)
 */

import React, {JSX} from 'react';
import '../../css/timeline.css'
import {API} from "../../components/api/api";
import {XLog} from "../../components/api/api_model";
import {SetBackGround} from "../../components/utils/background";


class About extends React.Component {

    state = {
        data: null
    }

    componentDidMount() {
        SetBackGround("")
        API.GetXLog().then(value => {
            this.setState({data: value})
        })
    }

    render() {
        if (this.state.data === null) {
            return <div></div>
        }
        const logs = this.state.data as XLog[]

        function AboutTimeLine(line: XLog) {
            return (
                <li key={"AboutTimeLine_" + line.ID}>
                    <p className="float-right">{line.CreatedTime} {line.Area}</p>
                    {line.Messages.split(",").map(item => (<p className="text-secondary" key={""}>{item}</p>))}
                </li>

            );
        }

        const items: JSX.Element[] = []

        for (let i = 0; i < logs.length; i++) {
            items.push(AboutTimeLine(logs[i]))
        }

        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <ul>
                            <li className="list-item">本赛事系统由开发者 <a href="https://github.com/guojia99" target="_black">郭嘉</a> 开发, 欢迎有兴趣参与开发的小伙伴加入</li>
                            <li className="list-item">本赛事系统旨在为魔缘群友提供赛事排名、成绩记录、成绩对比等功能, 提高群赛氛围,
                                方便成绩记录
                            </li>
                            {/*<li className="list-item">前端<a href="https://github.com/guojia99/my-cubing-ui"  target="_black">github.com/guojia99/my-cubing-ui</a> </li>*/}
                            {/*<li className="list-item">后端<a href="https://github.com/guojia99/my-cubing"  target="_black">github.com/guojia99/my-cubing</a></li>*/}
                        </ul>
                    </div>
                </div>
                <ul className="timeline">
                    {items}
                </ul>
            </div>
        );
    }
}


export default About;