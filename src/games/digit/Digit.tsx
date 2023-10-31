import {Game} from "./Digit_game";
import React from "react";
import {DigitProvider} from "./context/digitContext";
class Digit extends React.Component {

    render() {
        return (
            <DigitProvider>
                <Game/>
            </DigitProvider>
        )
    }
}

export default Digit;