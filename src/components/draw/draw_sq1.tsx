import {Circle, DrawPolygon, hsq3, Rotate, Transform} from "./utils";
import React, {JSX} from "react";


// type drawCache = {
//     ep: number[][];
//     cp: number[][];
//     cpR: number[][];
//     cpL: number[][];
//     eps: number[][];
//     cps: number[][];
// }

function RegExpExecArrayToNumberArray(regexExecArray: RegExpExecArray | null): number[] {
    if (!regexExecArray) {
        return [];
    }

    const result: number[] = [];
    for (let i = 1; i < regexExecArray.length; i++) {
        const num = parseFloat(regexExecArray[i]);
        result.push(isNaN(num) ? 0 : num);
    }

    return result;
}

export class SQ1CubeDrawerUtils {
    private colors = [
        '#f3df00', // U 0
        '#ff8800', // R 1
        '#00ff00', // F 2
        '#ffffff', // D 3
        '#ff0000', // L 4
        '#0000ff', // B 5
        '', // None 6
    ]
    private csp_color = [
        '#f6f6e4', // U 0
        '#f6f6e4', // R 1
        '#f6f6e4', // F 2
        '#f6f6e4', // D 3
        '#f6f6e4', // L 4
        '#f6f6e4', // B 5
        '#f6f6e4', // None 6
    ]

    // var ecol = '-B-R-F-L-B-R-F-L';
    // var ccol = 'LBBRRFFLBLRBFRLF';

    private eCol: number[] = [
        6, 5, 6, 1, 6, 2, 6, 4, // -B-R -F-L
        6, 5, 6, 1, 6, 2, 6, 4, // -B-R -F-L
    ]
    private cCol: number[] = [
        4, 5, 5, 1, 1, 2, 2, 4, // L B B R R F F L
        5, 4, 1, 5, 2, 1, 4, 2, // B L R B F R L F
    ]

    private movesRe = /^\s*\(\s*(-?\d+),\s*(-?\d+)\s*\)\s*$/;
    private seqRe = /^\s*$/

    private doSlice(posit: number[], mid: number, move: number[]): [number[], number] {
        let newPosit: number[] = []

        // top
        for (let i = 0; i < 12; i++) {
            newPosit[(i + move[0]) % 12] = posit[i]
        }
        // bottom
        for (let i = 0; i < 12; i++) {
            newPosit[i + 12] = posit[(i + move[1]) % 12 + 12];
        }

        if (move[2]) {
            mid = 1 - mid
            for (let i = 0; i < 6; i++) {
                newPosit = Circle(newPosit, i + 6, 23 - i)
            }
        }
        return [newPosit, mid]
    }

    genPositAndMid(seq: string): [number[], number] {
        let posit = [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 17, 16, 18, 21, 20, 22, 25, 24, 26, 29, 28, 30]
        let mid = 0
        let moves = seq.split('/')
        for (let i = 0; i < moves.length; i++) {
            if (this.seqRe.exec(moves[i])) { // 空白字符
                [posit, mid] = this.doSlice(posit, mid, [0, 0, 1]);
                continue
            }
            const ms = RegExpExecArrayToNumberArray(this.movesRe.exec(moves[i]));
            [posit, mid] = this.doSlice(posit, mid, [~~ms[0] + 12, ~~ms[1] + 12, 1]);

        }
        [posit, mid] = this.doSlice(posit, mid, [0, 0, 1]);
        // (-5,-3)/ (-4,-4)/ (0,-3)/ (0,-3)/ (1,-5)/ (-3,0)/ (-4,0)/ (-3,-3)/ (3,0)/ (-1,-1)/ (0,-4)/ (2,-4)/
        // [0, 1, 8, 9, 16, 17, 14, 10, 26, 6, 12, 13, 25, 24, 5, 4, 21, 20, 29, 28, 18, 22, 2, 30]
        return [posit, mid]
    }


    private ep = [
        [0, -0.5, 0.5],
        [0, -hsq3 - 1, -hsq3 - 1]
    ];
    private cp = [
        [0, -0.5, -hsq3 - 1, -hsq3 - 1],
        [0, -hsq3 - 1, -hsq3 - 1, -0.5]
    ];
    private cpr = [
        [0, -0.5, -hsq3 - 1],
        [0, -hsq3 - 1, -hsq3 - 1]
    ];
    private cpl = [
        [0, -hsq3 - 1, -hsq3 - 1],
        [0, -hsq3 - 1, -0.5]
    ];

    private eps = Transform(this.ep, [0.66, 0, 0]);
    private cps = Transform(this.cp, [0.66, 0, 0]);

    drawFace(ctx: CanvasRenderingContext2D, posit: number[], fNum: number, trans: number[]) {
        let cRot = (fNum < 12 ? (fNum - 3) : (-fNum)) * Math.PI / 6
        let eRot = (fNum < 12 ? (fNum - 5) : (-1 - fNum)) * Math.PI / 6
        let j = (fNum + 1) % 12 + (fNum < 12 ? 0 : 12)

        let val = posit[fNum] >> 1
        let udKey = val >= 8 ? 0 : 3  // U -> 0, D -> 3
        let colorUD = this.colors[udKey]

        if (val % 2 === 0) {
            if (val === (posit[j] >> 1)) {
                DrawPolygon(ctx, this.colors[this.cCol[val]], Rotate(this.cpl, cRot), trans);
                DrawPolygon(ctx, this.colors[this.cCol[val + 1]], Rotate(this.cpr, cRot), trans);
                DrawPolygon(ctx, colorUD, Rotate(this.cps, cRot), trans);
            }
            return
        }
        DrawPolygon(ctx, this.colors[this.eCol[val]], Rotate(this.ep, eRot), trans);
        DrawPolygon(ctx, colorUD, Rotate(this.eps, eRot), trans);
        return
    }

    drawMid(ctx: CanvasRenderingContext2D, width: number, mid: number) {
        let trans = [width, 2.7 + 2.7, 2.7 + 3.0]
        DrawPolygon(ctx, this.colors[4], [[-hsq3 - 1, -hsq3 - 1, -0.5, -0.5], [0.5, -0.5, -0.5, 0.5]], trans); // L
        if (mid === 0) {
            DrawPolygon(ctx, this.colors[4], [[hsq3 + 1, hsq3 + 1, -0.5, -0.5], [0.5, -0.5, -0.5, 0.5]], trans); // L
            return
        }
        DrawPolygon(ctx, this.colors[1], [[hsq3, hsq3, -0.5, -0.5], [0.5, -0.5, -0.5, 0.5]], trans); // R
    }

    draw(ctx: CanvasRenderingContext2D, seq: string, width: number) {
        const [posit, mid] = this.genPositAndMid(seq)
        for (let i = 0; i < 24; i++) {
            let trans = i < 12 ? [width, 2.7, 2.7] : [width, 2.7 + 5.4, 2.7]
            this.drawFace(ctx, posit, i, trans)
        }
        this.drawMid(ctx, width, mid)
    }

    drawWithCSP(ctx: CanvasRenderingContext2D, seq: string, width: number){
        this.colors = this.csp_color
        const [posit] = this.genPositAndMid(seq)
        for (let i = 0; i < 24; i++) {
            let trans = i < 12 ? [width, 2.7, 2.7] : [width, 2.7, 2.7 + 5.4]
            this.drawFace(ctx, posit, i, trans)
        }
    }
}

const baseSQ1Ctx = (imageWidth: number, imageHeight: number) => {
    const imageSize = (imageWidth / 20)
    const canvasW = imageWidth
    const canvasH = imageHeight

    const canvas: HTMLCanvasElement = document.createElement("canvas")

    canvas.width = canvasW
    canvas.height = canvasH
    canvas.style.width = 11 * imageSize / 1.3 + 'em'
    canvas.style.height = 6.3 * imageSize / 1.3 + 'em'

    return canvas
}

export const DrawSQ1CubeCanvas = (imageWidth: number, seq: string) => {
    let canvas = baseSQ1Ctx(11 * imageWidth, 6.3 * imageWidth)
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const sq1CubeDrawerUtils = new SQ1CubeDrawerUtils()
    sq1CubeDrawerUtils.draw(ctx, seq, imageWidth)

    return canvas
}

export const DrawSQ1WithCSPCanvas = (imageWidth: number, seq: string) => {
    let canvas = baseSQ1Ctx(6.3 * imageWidth, 11 * imageWidth)
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const sq1CubeDrawerUtils = new SQ1CubeDrawerUtils()
    sq1CubeDrawerUtils.drawWithCSP(ctx, seq, imageWidth)
    return canvas
}

export const DrawSQ1CSPCubeImage = (id: string, imageWidth: number, seq: string) => {
    const canvas: HTMLCanvasElement = DrawSQ1WithCSPCanvas(imageWidth, seq)

    return (
        // <div>{canvas}</div>
        <img src={canvas.toDataURL()} alt={id + ".svg"} id={id} key={id}/>
    )
}

export const DrawSQ1CubeImage = (id: string, imageWidth: number, seq: string) => {
    const canvas = DrawSQ1CubeCanvas(imageWidth, seq)
    return (
        <img src={canvas.toDataURL()} alt={id + ".jpeg"} id={id} key={id}/>
    )
}


export const DrawSQ1CubeImages = (id: string, size: number, imageWidth: number, seq: string[]): JSX.Element[] => {
    let items: JSX.Element[] = []
    if (!seq) {
        return items
    }

    for (let i = 0; i < seq.length; i++) {
        items.push(DrawSQ1CubeImage(id + i, imageWidth, seq[i]))
    }
    return items
}