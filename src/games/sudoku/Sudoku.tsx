import './sudoku.css'

import {SudokuProvider} from "./context/SudokuContext";
import {Game} from "./sudoku_game";
import React from "react";


class Sudoku extends React.Component {
    render() {
        return (
            <SudokuProvider>
                <Game/>
            </SudokuProvider>
        )
    }
}


export default Sudoku;