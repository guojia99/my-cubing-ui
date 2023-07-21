import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Sor from "./pages/Sor";
import Best from "./pages/Best";
import Contest from "./pages/Contest";
import Contests from "./pages/Contests";
import Player from "./pages/Player";
import Players from "./pages/Players";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ul className="nav nav-underline">
            <li className="nav-item active"><a className="nav-link active" href="/">主页</a></li>
            <li className="nav-item"><a className="nav-link" href="/about">关于</a></li>
            <li className="nav-item"><a className="nav-link" href="/score">最佳成绩</a></li>
            <li className="nav-item"><a className="nav-link" href="/sor">成绩计分</a></li>
            <li className="nav-item"><a className="nav-link" href="/contests">比赛列表</a></li>
            <li className="nav-item"><a className="nav-link" href="/players">玩家列表</a></li>
        </ul>


        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/about" Component={About} /> {/*关于*/}

            <Route path="/best" Component={Best} />  {/*最佳成绩汇总*/}
            <Route path="/sor" Component={Sor} />  {/*最佳成绩汇总*/}
            <Route path="/contest" Component={Contest} /> {/*比赛*/}
            <Route path="/contests" Component={Contests} />{/*比赛列表*/}
            <Route path="/player" Component={Player} />{/*玩家*/}
            <Route path="/players" Component={Players} />{/*玩家列表*/}
        </Routes>
    </BrowserRouter>
);