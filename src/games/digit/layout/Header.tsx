import React from "react";


type HeaderProps = {
    onClick: () => void
}

export const Header = (props: HeaderProps) => {
    return (
        <>
            <header className="header">
                <h1>
                    D
                    <span className="header-one">ig</span>
                    <span className="header-two">it</span>
                </h1>

                <h2 onClick={props.onClick}>新游戏</h2>
            </header>
        </>
    )
}