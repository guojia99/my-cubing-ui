import React, {JSX} from "react";

export const DrawEmptyImage = (id: string, size: number, imageWidth: number, seq: string) => {
    return (<div id={id} key={id}> not cube</div>)
}

export const DrawEmptyImages = (id: string, size: number, imageWidth: number, seq: string[]): JSX.Element[] => {
    let items: JSX.Element[] = []
    if (!seq) {
        return items
    }

    for (let i = 0; i < seq.length; i++) {
        items.push(DrawEmptyImage(id + i, size, imageWidth, seq[i]))
    }
    return items
}