/*
 *  * Copyright (c) 2023 guojia99 All rights reserved.
 *  * Created: 2023/7/21 下午6:11.
 *  * Author: guojia(https://github.com/guojia99)
 */

import React from 'react';
import '../../css/timeline.css'

const AboutChangeLog = () => {
    type AboutChangeLogElement = {
        Matters: AboutLogElementMatters[];
        Time: string;
        Au: string;
        Title: string,
    }

    type AboutLogElementMatters = {
        Idx: number,
        Value: string,
    }

    function AboutTimeLine(line: AboutChangeLogElement) {
        return (
            <li>
                <p className="float-right">{line.Time} {line.Au}</p>
                {line.Matters.map(item => (<p className="text-secondary">{item.Value}</p>))}
            </li>

        );
    }

    // todo 从后端获取
    const changeLog: AboutChangeLogElement[] = [
        {
            Time: '20241001', Au: '广州', Title: 'V2版本正式上线', Matters: [
                {Idx: 1, Value: "正式上线全新版本"},
            ]
        },
        {
            Time: '20230901', Au: '广州', Title: 'V2版本正式内测', Matters: [
                {Idx: 1, Value: "内部功能测试和交叉测试"},
            ]
        },
        {
            Time: '20230801', Au: '广州', Title: '正式重构赛事系统V2', Matters: [
                {Idx: 1, Value: "采用React + Ts开发前端"},
                {Idx: 2, Value: "后端全部实现重构"},
                {Idx: 3, Value: "完善功能：个人、记录、统计、赛事领奖台等"},
                {Idx: 4, Value: "完善后台成绩记录"}
            ]
        },
        {
            Time: '20230722', Au: '广州', Title: '魔缘时隔4年再次组织线下魔聚', Matters: [
                {Idx: 1, Value: "举办首次魔缘线下赛"},
            ]
        },
        {
            Time: '20230701', Au: '广州', Title: '魔缘赛事系统v0.1.0版本内侧上线', Matters: [
                {Idx: 1, Value: "首次可以使用线上版本的赛事系统完善比赛"},
                {Idx: 2, Value: "同步与表格版本进行赛事统计"}
            ]
        },
        {
            Time: '20230620', Au: '广州', Title: '魔缘赛事系统正式投入开发', Matters: [
                {Idx: 1, Value: "go-gin纯后端开发"},
            ]
        },
        {
            Time: '20230615', Au: '广州', Title: '魔缘赛事小组成立', Matters: [
                {Idx: 1, Value: "组织和统筹赛事举办"},
                {Idx: 2, Value: "组织赛事系统开发"},
            ]
        },
        {
            Time: '20230525', Au: '广州', Title: '第一届魔缘线上赛举办', Matters: [
                {Idx: 1, Value: "使用表格统计赛事结果"},
                {Idx: 2, Value: "首次仅有7位群友参加"},
            ]
        }
    ]
    return (
        <ul className="timeline">
            {changeLog.map(item => (AboutTimeLine(item)))}
        </ul>
    )
}


const About = () => {
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
            <AboutChangeLog/>
        </div>
    );
};
export default About;