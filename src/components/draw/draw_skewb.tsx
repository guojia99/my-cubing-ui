
import {Circle, DrawPolygon, hsq3, ParseScramble} from "./utils";
import React, {JSX} from "react";

// import {Circle}  from  './utils_js'

export class SkCubeDrawerUtils {

    private colors = [
        '#ffffff',
        '#0000ff',
        '#ff0000',
        '#ffff00',
        '#00ff00',
        '#ff8800'
    ];

    private doSlice(posit: number[], axis: number, power: number) {
        for (let p = 0; p < power; p++) {
            switch (axis) {
                case 0: //R
                    posit = Circle(posit, 2 * 5 + 0, 1 * 5 + 0, 3 * 5 + 0);
                    posit = Circle(posit, 2 * 5 + 4, 1 * 5 + 3, 3 * 5 + 2);
                    posit = Circle(posit, 2 * 5 + 2, 1 * 5 + 4, 3 * 5 + 1);
                    posit = Circle(posit, 2 * 5 + 3, 1 * 5 + 1, 3 * 5 + 4);
                    posit = Circle(posit, 4 * 5 + 4, 0 * 5 + 4, 5 * 5 + 3);
                    break;
                case 1: //U
                    posit = Circle(posit, 0 * 5 + 0, 5 * 5 + 0, 1 * 5 + 0);
                    posit = Circle(posit, 0 * 5 + 2, 5 * 5 + 1, 1 * 5 + 2);
                    posit = Circle(posit, 0 * 5 + 4, 5 * 5 + 2, 1 * 5 + 4);
                    posit = Circle(posit, 0 * 5 + 1, 5 * 5 + 3, 1 * 5 + 1);
                    posit = Circle(posit, 4 * 5 + 1, 3 * 5 + 4, 2 * 5 + 2);
                    break;
                case 2: //L
                    posit = Circle(posit, 4 * 5 + 0, 3 * 5 + 0, 5 * 5 + 0);
                    posit = Circle(posit, 4 * 5 + 3, 3 * 5 + 3, 5 * 5 + 4);
                    posit = Circle(posit, 4 * 5 + 1, 3 * 5 + 1, 5 * 5 + 3);
                    posit = Circle(posit, 4 * 5 + 4, 3 * 5 + 4, 5 * 5 + 2);
                    posit = Circle(posit, 2 * 5 + 3, 1 * 5 + 4, 0 * 5 + 1);
                    break;
                case 3: //B
                    posit = Circle(posit, 1 * 5 + 0, 5 * 5 + 0, 3 * 5 + 0);
                    posit = Circle(posit, 1 * 5 + 4, 5 * 5 + 3, 3 * 5 + 4);
                    posit = Circle(posit, 1 * 5 + 3, 5 * 5 + 1, 3 * 5 + 3);
                    posit = Circle(posit, 1 * 5 + 2, 5 * 5 + 4, 3 * 5 + 2);
                    posit = Circle(posit, 0 * 5 + 2, 4 * 5 + 3, 2 * 5 + 4);
                    break;
            }
        }
    }

    private drawFace(ctx: CanvasRenderingContext2D, width: number, posit: number[], fNum: number) {
        const gap = width / 10;
        let fTrans = [
            [width * hsq3, width * hsq3, (width * 4 + gap * 1.5) * hsq3, -width / 2, width / 2, width],
            [width * hsq3, 0, (width * 7 + gap * 3) * hsq3, -width / 2, width, width * 1.5],
            [width * hsq3, 0, (width * 5 + gap * 2) * hsq3, -width / 2, width, width * 2.5 + 0.5 * gap],
            [0, -width * hsq3, (width * 3 + gap) * hsq3, width, -width / 2, width * 4.5 + 1.5 * gap],
            [width * hsq3, 0, (width * 3 + gap) * hsq3, width / 2, width, width * 2.5 + 0.5 * gap],
            [width * hsq3, 0, width * hsq3, width / 2, width, width * 1.5]
        ];


        const transform = fTrans[fNum]
        DrawPolygon(ctx, this.colors[posit[fNum * 5]], [[-1, 0, 1, 0], [0, 1, 0, -1]], transform);
        DrawPolygon(ctx, this.colors[posit[fNum * 5 + 1]], [[-1, -1, 0], [0, -1, -1]], transform);
        DrawPolygon(ctx, this.colors[posit[fNum * 5 + 2]], [[0, 1, 1], [-1, -1, 0]], transform);
        DrawPolygon(ctx, this.colors[posit[fNum * 5 + 3]], [[-1, -1, 0], [0, 1, 1]], transform);
        DrawPolygon(ctx, this.colors[posit[fNum * 5 + 4]], [[0, 1, 1], [1, 1, 0]], transform);
    }

    private genPosit(scramble: string) {
        let cnt: number = 0;
        let posit: number[] = [];
        for (let i = 0; i < 6; i++) {
            for (let f = 0; f < 5; f++) {
                posit[cnt++] = i;
            }
        }
        const moves = ParseScramble(scramble, "RULB")
        for (let i = 0; i < moves.length; i++) {
            this.doSlice(posit, moves[i][0], moves[i][2] === 1 ? 1 : 2)
        }
        return posit
    }


    draw(ctx: CanvasRenderingContext2D, seq: string, width: number) {
        const posit = this.genPosit(seq)
        for (let i = 0; i < 6; i++) {
            this.drawFace(ctx, width, posit, i)
        }
    }
}

export const DrawSkCubeCanvas = (imageWidth: number, seq: string): HTMLCanvasElement => {
    const imageSize = (imageWidth / 20)
    const canvasW = (8 * hsq3 + 0.3) * imageWidth + 1
    const canvasH = 6.2 * imageWidth + 1
    const canvas: HTMLCanvasElement = document.createElement("canvas")

    canvas.width = canvasW
    canvas.height = canvasH
    canvas.style.width = (8 * hsq3 + 0.3) * imageSize + 'em'
    canvas.style.height = 6.2 * imageSize + 'em'

    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const pyCubeDrawerUtils = new SkCubeDrawerUtils()
    pyCubeDrawerUtils.draw(ctx, seq, imageWidth)

    return canvas
}

export const DrawSkCubeImage = (id: string, imageWidth: number, seq: string) => {
    const canvas = DrawSkCubeCanvas(imageWidth, seq)
    return ( <img src={canvas.toDataURL()} alt={id + ".jpeg"} id={id} key={id}/>)
}

export const DrawSkCubeImages = (id: string, size: number, imageWidth: number, seq: string[]): JSX.Element[] => {
    let items: JSX.Element[] = []
    if (!seq) {
        return items
    }

    for (let i = 0; i < seq.length; i++) {
        items.push(DrawSkCubeImage(id + i, imageWidth, seq[i]))
    }
    return items
}