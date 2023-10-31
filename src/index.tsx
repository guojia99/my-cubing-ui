// css
// import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

// index
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import ThreeDotsLoader from "./components/loading/ThreeDotsLoader";


// page
const Home = React.lazy(() => import('./pages/home/Home'))
const Debug = React.lazy(() => import('./pages/debug/debug'))
const Auth = React.lazy(() => import('./pages/admin/auth'))
const Admin = React.lazy(() => import('./pages/admin/admin'))
const About = React.lazy(() => import('./pages/about/About'))
const Players = React.lazy(() => import('./pages/players/Players'))
const Contests = React.lazy(() => import('./pages/contests/Contests'))
const ContestPage = React.lazy(() => import('./pages/contest/Contest'))
const PlayerPage = React.lazy(() => import('./pages/player/Player'))
const Record = React.lazy(() => import('./pages/statistics/record'))
const Best = React.lazy(() => import('./pages/statistics/Best'))
const Sor = React.lazy(() => import('./pages/statistics/Sor'))
const PodiumsPage = React.lazy(() => import('./pages/statistics/podiums'))
const Rule = React.lazy(() => import('./pages/about/Rule'))
const RelativeSorPage = React.lazy(() => import('./pages/statistics/RelativeSor'))
const Projects = React.lazy(() => import('./pages/about/Projects'))
const Sudoku = React.lazy(() => import('./games/sudoku/Sudoku'))
const Images = React.lazy(() => import("./pages/statistics/Images"))
const Digit = React.lazy(() => import("./games/digit/Digit"))


// main
$(() => {
    setInterval(() => {
        $('i').tooltip().show()
    }, 1000)
})


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <div>
        <div>
            <ToastContainer/>
        </div>
        <BrowserRouter>
            <ul className="nav nav-underline" style={{marginBottom: '20px'}}>
                <li className="nav-item"><NavLink className="nav-link" to="/">主页</NavLink></li>
                <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">说明</Link>
                    <ul className="dropdown-menu">
                        <li><NavLink className="dropdown-item" to="/about">关于</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/rule">规则</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/projects">项目列表</NavLink></li>
                    </ul>
                </li>

                <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">列表</Link>
                    <ul className="dropdown-menu">
                        <li><NavLink className="dropdown-item" to="/contests">比赛</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/players">玩家</NavLink></li>
                    </ul>
                </li>

                <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">统计</Link>
                    <ul className="dropdown-menu">
                        <li><NavLink className="dropdown-item" to="/statistics/images">图表</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/statistics/record">纪录</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/statistics/sor">Sor排位</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/statistics/relative_sor">排位分数(兔兔版)</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/statistics/podiums">奖牌榜单</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/statistics/best">最佳成绩</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/statistics/interest">趣味玩法</NavLink></li>
                    </ul>
                </li>

                <li className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">游戏</Link>
                    <ul className="dropdown-menu">
                        <li><NavLink className="dropdown-item" to="/game/sudoku">数独</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/game/digit">记字</NavLink></li>
                    </ul>
                </li>
            </ul>

            <React.Suspense fallback={<ThreeDotsLoader/>}>
                <Routes>
                    <Route path="/" Component={Home}/>
                    <Route path="/about" Component={About}/> {/*关于*/}
                    <Route path="/rule" Component={Rule}/> {/*规则*/}

                    {/*管理员*/}
                    <Route path="/xadmin" Component={Admin}/>
                    <Route path="/xauth" Component={Auth}/>
                    <Route path="/debug" Component={Debug}/>


                    {/*比赛*/}
                    <Route path="/contest" Component={ContestPage}/> {/*比赛*/}
                    <Route path="/contests" Component={Contests}/>{/*比赛列表*/}
                    <Route path="/player" Component={PlayerPage}/>{/*玩家*/}
                    <Route path="/players" Component={Players}/>{/*玩家列表*/}

                    {/*统计*/}
                    <Route path="/statistics/images" Component={Images}/>
                    <Route path="/statistics/best" Component={Best}/> {/*最佳成绩汇总*/}
                    <Route path="/statistics/sor" Component={Sor}/> {/*最佳成绩汇总*/}
                    <Route path="/statistics/relative_sor" Component={RelativeSorPage}/> {/*兔兔版本成绩*/}
                    <Route path="/statistics/record" Component={Record}/> {/*纪录*/}
                    <Route path="/statistics/podiums" Component={PodiumsPage}/> {/*奖牌榜单*/}
                    <Route path="/statistics/interest" Component={() => {
                        return (<div>没开发</div>)
                    }}></Route> {/*趣味玩法*/}
                    <Route path="/projects" Component={Projects}></Route>


                    {/*游戏*/}
                    <Route path="/game/sudoku" Component={Sudoku}/> {/*数独*/}
                    <Route path="/game/digit" Component={Digit}/> {/*记字*/}
                </Routes>
            </React.Suspense>
        </BrowserRouter>
        {/*<ScrollToTopButton/>*/}

    </div>
);
