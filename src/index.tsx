// css
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/best.css'

// index
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
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
            <li className="nav-item"><NavLink className="nav-link" to="/best">最佳排行</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/sor">排名分数汇总</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contests">比赛列表</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/players">玩家列表</NavLink></li>
        </ul>
        <Routes>
            <Route path="/" Component={Home}/>
            <Route path="/about" Component={About}/> {/*关于*/}
            <Route path="/best" Component={Best}/> {/*最佳成绩汇总*/}
            <Route path="/sor" Component={Sor}/> {/*最佳成绩汇总*/}
            <Route path="/contest" Component={ContestPage}/> {/*比赛*/}
            <Route path="/contests" Component={Contests}/>{/*比赛列表*/}
            <Route path="/player" Component={PlayerPage}/>{/*玩家*/}
            <Route path="/players" Component={Players}/>{/*玩家列表*/}
            <Route path="/xadmin" Component={Admin}/>
            <Route path="/debug" Component={Debug}/>
        </Routes>
    </BrowserRouter>
);
