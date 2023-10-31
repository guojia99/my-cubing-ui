import {Circle, DrawPolygon, hsq3, ParseScramble} from "./utils";
import React, {JSX} from "react";


class PyCubeDrawerUtils {

    private colors = [
        '#00ff00',
        '#ff0000',
        '#0000ff',
        '#ffff00'
    ]
    private arrX = [-0.5, 0.5, 0]
    private arrY1 = [hsq3, hsq3, 0]
    private arrY2 = [-hsq3, -hsq3, 0]
    private faceOffX = [3.5, 1.5, 5.5, 3.5];
    private faceOffY = [0, 3 * hsq3, 3 * hsq3, 6.5 * hsq3];

    private doSlice(posit: number[], axis: number, power: number): number[] {
        const g1: number[] = [0, 6, 5, 4];
        const g2: number[] = [1, 7, 3, 5];
        const g3: number[] = [2, 8, 4, 3];
        const fList: number[][] = [
            [0, 1, 2],
            [2, 3, 0],
            [1, 0, 3],
            [3, 2, 1]
        ];

        const len = axis >= 4 ? 1 : 4;
        const f = fList[axis % 4];
        for (let i = 0; i < len; i++) {
            for (let p = 0; p < power; p++) {
                posit = Circle(posit, f[0] * 9 + g1[i], f[1] * 9 + g2[i], f[2] * 9 + g3[i]);
            }
        }
        return posit
    }


    private genPosit(scramble: string) {
        let cnt: number = 0;
        let posit: number[] = [];
        for (let i = 0; i < 4; i++) {
            for (let f = 0; f < 9; f++) {
                posit[cnt++] = i;
            }
        }

        const moves = ParseScramble(scramble, "URLB")
        for (let i = 0; i < moves.length; i++) {
            posit = this.doSlice(posit, moves[i][0] + (moves[i][1] === 2 ? 4 : 0), moves[i][2] === 1 ? 1 : 2)
        }
        return posit
    }

    private drawFace(ctx: CanvasRenderingContext2D, width: number, posit: number[], fNum: number) {
        const inv = fNum !== 0;
        let offX = [0, -1, 1, 0, 0.5, -0.5, 0, -0.5, 0.5]
        let offY = [0, 2, 2, 2, 1, 1, 2, 3, 3]
        for (let i = 0; i < offY.length; i++) {
            offY[i] *= inv ? -hsq3 : hsq3
            offX[i] *= inv ? -1 : 1
        }

        for (let idx = 0; idx < 9; idx++) {
            DrawPolygon(ctx,
                this.colors[posit[fNum * 9 + idx]],
                [this.arrX, ((idx >= 6) !== inv) ? this.arrY2 : this.arrY1],
                [width, this.faceOffX[fNum] + offX[idx], this.faceOffY[fNum] + offY[idx]]
            )
        }
    }


    draw(ctx: CanvasRenderingContext2D, seq: string, width: number) {
        const posit = this.genPosit(seq)
        for (let i = 0; i < 4; i++) {
            this.drawFace(ctx, width, posit, i)
        }
    }
}


export const DrawPyCubeCanvas = (imageWidth: number, seq: string): HTMLCanvasElement => {
    const imageSize = (imageWidth / 20)
    const canvasW = 7 * imageWidth
    const canvasH = 6.5 * hsq3 * imageWidth

    const canvas: HTMLCanvasElement = document.createElement("canvas")
    canvas.width = canvasW
    canvas.height = canvasH
    canvas.style.width = 7 * imageSize + 'em'
    canvas.style.height = 6.5 * hsq3 * imageSize + 'em'

    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const pyCubeDrawerUtils = new PyCubeDrawerUtils()
    pyCubeDrawerUtils.draw(ctx, seq, imageWidth)

    return canvas
}

export const DrawPyCubeImage = (id: string, imageWidth: number, seq: string) => {
    const canvas = DrawPyCubeCanvas(imageWidth, seq)
    return (
        <img src={canvas.toDataURL()} alt={id + ".jpeg"} id={id} key={id}/>
    )
}

export const DrawPyCubeImages = (id: string, size: number, imageWidth: number, seq: string[]): JSX.Element[] => {
    let items: JSX.Element[] = []
    if (!seq) {
        return items
    }

    for (let i = 0; i < seq.length; i++) {
        items.push(DrawPyCubeImage(id + i, imageWidth, seq[i]))
    }
    return items
}