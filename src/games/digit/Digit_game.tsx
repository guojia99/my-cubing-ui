import React from "react";
import {Header} from "./layout/Header";
import "./Digit.css"
import {Value} from "./layout/value";
import {useSudokuContext} from "../sudoku/context/SudokuContext";
import {GameMode, useDigitContext} from "./context/digitContext";



export const Game: React.FC<{}> = () => {

    let {
        mode, valueMode, data, dataLength
    } = useDigitContext();


    function _randomString() {
        let digit = "1234567890"
        switch (mode) {
            case GameMode.Digit:
                digit = "abcdefghijklmnopqrstuvwxyz"
                break
            case GameMode.All:
                digit += "abcdefghijklmnopqrstuvwxyz"
        }
        data = ""
        for (let i = 0; i < dataLength; i++) {
            data += digit.charAt(Math.floor(Math.random() * digit.length))
        }
    }

    function newGame() {
        _randomString()
    }

    return (
        <div className="body">
            <Header onClick={newGame}/>
            <Value/>
        </div>
    )
}