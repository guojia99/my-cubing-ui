// css
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/best.css'
import './index.css'

// index
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom";


// page
import Auth from "./pages/admin/auth";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Best from "./pages/best/Best";
import Sor from "./pages/best/Sor";
import Players from "./pages/players/Players";
import Admin from "./pages/admin/admin";
import Contests from "./pages/contests/Contests";
import ContestPage from "./pages/contest/Contest";
import Debug from "./pages/debug/debug";
import PlayerPage from "./pages/player/Player";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <ul className="nav nav-underline" style={{marginBottom: '20px'}}>
            <li className="nav-item"><NavLink className="nav-link" to="/">主页</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">关于</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contests">比赛</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/players">玩家</NavLink></li>

            <li className="nav-item dropdown">
                <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">统计</Link>
                {/*<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" href="#" aria-expanded="false">统计</a>*/}
                <ul className="dropdown-menu">
                    <li><NavLink className="dropdown-item" to="/statistics/record">记录</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/statistics/sor">排位分数</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/statistics/best">最佳成绩</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/statistics/interest">趣味玩法</NavLink></li>
                </ul>
            </li>
        </ul>
        <Routes>
            <Route path="/" Component={Home}/>
            <Route path="/about" Component={About}/> {/*关于*/}

            {/*管理员*/}
            <Route path="/xadmin" Component={Admin}/>
            <Route path="/xauth" Component={Auth} />
            <Route path="/debug" Component={Debug}/>

            <Route path="/contest" Component={ContestPage}/> {/*比赛*/}
            <Route path="/contests" Component={Contests}/>{/*比赛列表*/}
            <Route path="/player" Component={PlayerPage}/>{/*玩家*/}
            <Route path="/players" Component={Players}/>{/*玩家列表*/}

            {/*统计*/}
            <Route path="/statistics/best" Component={Best}/> {/*最佳成绩汇总*/}
            <Route path="/statistics/sor" Component={Sor}/> {/*最佳成绩汇总*/}
            <Route path="/statistics/interest" Component={() => {return (<div></div>)}}></Route> {/*趣味玩法*/}
        </Routes>
    </BrowserRouter>
);
