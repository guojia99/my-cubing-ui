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

type Url = {
    Uri: string,
    Comp: React.ComponentType | null,
}

const url: Url[] = [
    // 基础
    {Uri: "/", Comp: Home},
    {Uri: "/about", Comp: About},
    {Uri: "/rule", Comp: Rule},

    // 管理员
    {Uri: "/xadmin", Comp: Admin},
    {Uri: "/xauth", Comp: Auth},
    {Uri: "/debug", Comp: Debug},

    // 比赛
    {Uri: "/contest", Comp: ContestPage},
    {Uri: "/contests", Comp: Contests},
    {Uri: "/player", Comp: PlayerPage},
    {Uri: "/players", Comp: Players},


    // 统计
    {Uri: "/statistics/images", Comp: Images},
    {Uri: "/statistics/best", Comp: Best},
    {Uri: "/statistics/sor", Comp: Sor},
    {Uri: "/statistics/relative_sor", Comp: RelativeSorPage},
    {Uri: "/statistics/record", Comp: Record},
    {Uri: "/statistics/podiums", Comp: PodiumsPage},
    {
        Uri: "/statistics/interest", Comp: () => {
            return (<div>没开发</div>)
        }
    },
    {Uri: "/projects", Comp: Projects},


    {Uri: "/game/sudoku", Comp: Sudoku},
    {Uri: "/game/digit", Comp: Digit},
]

const urlRoutes: any[] = []

url.forEach((value, index, array) => {
    urlRoutes.push(<><Route path={value.Uri} Component={value.Comp}/></>)
    urlRoutes.push(<><Route path={"/x" + value.Uri} Component={value.Comp}/></>)
})


root.render(
    <div>
        <div>
            <ToastContainer/>
        </div>

        <div className="main">
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
                    <Routes>{urlRoutes}</Routes>
                </React.Suspense>
            </BrowserRouter>
        </div>

        {/*<ScrollToTopButton/>*/}
        <footer>
            <div className="footer_content text-center">
                <p>Copyright © 2023 广州魔缘魔方 </p>
                <p>Powered by <a href="https://github.com/guojia99" target="_black">郭泽嘉</a></p>
                <p><a href="https://beian.miit.gov.cn/" className="text-center">粤ICP备2023083788号</a></p>
            </div>
        </footer>
    </div>
);
