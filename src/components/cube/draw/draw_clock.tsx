import { Rotate, Transform} from "./utils";
import React from "react";
export class ClockCubeDrawerUtils {

    private colors = [
        '#f00',
        '#37b',
        '#5cf',
        '#ff0',
        '#850'
    ]
    private moveReg = /([UD][RL]|ALL|[UDRLy])(\d[+-]?)?/
    private moveStr = ['UR', 'DR', 'DL', 'UL', 'U', 'R', 'D', 'L', 'ALL']

    genPosit(seq: string): [number[], number[]] {
        if (seq === undefined){
            seq = ""
        }
        const moves = seq.split(/\s+/)
        const moveArr: number[][] = [
            [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], //UR
            [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0], //DR
            [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0], //DL
            [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], //UL
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], //U
            [0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0], //R
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], //D
            [1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0], //L
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], //ALL
            [11, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0], //UR
            [0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 1, 1, 1], //DR
            [0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 1, 1, 0, 1], //DL
            [0, 0, 11, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0], //UL
            [11, 0, 11, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0], //U
            [11, 0, 0, 0, 0, 0, 11, 0, 0, 1, 0, 1, 1, 1], //R
            [0, 0, 0, 0, 0, 0, 11, 0, 11, 0, 1, 1, 1, 1], //D
            [0, 0, 11, 0, 0, 0, 0, 0, 11, 1, 1, 1, 0, 1], //L
            [11, 0, 11, 0, 0, 0, 11, 0, 11, 1, 1, 1, 1, 1] //ALL
        ];
        let flip = 9
        let buttons = [0, 0, 0, 0]
        let posit = [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ]


        for (let i = 0; i < moves.length; i++) {
            const m = this.moveReg.exec(moves[i])
            if (!m) {
                continue
            }
            if (m[0] === 'y2') {
                flip = 0
                continue
            }
            const axis = this.moveStr.indexOf(m[1]) + flip
            if (m[2] === undefined) {
                buttons[axis % 9] = 1
                continue
            }

            let power = ~~m[2][0]
            power = m[2][1] === "+" ? power : 12 - power
            for (let j = 0; j < 14; j++) {
                posit[j] = (posit[j] + moveArr[axis][j] * power) % 12;
            }
        }
        posit = [
            posit[0], posit[3], posit[6], posit[1],
            posit[4], posit[7], posit[2], posit[5],
            posit[8], 12 - posit[2], posit[10], 12 - posit[8],
            posit[9], posit[11], posit[13], 12 - posit[0],
            posit[12], 12 - posit[6]
        ];
        buttons = [buttons[3], buttons[2], buttons[0], buttons[1], 1 - buttons[0], 1 - buttons[1], 1 - buttons[3], 1 - buttons[2]];
        return [posit, buttons]
    }

    drawClockFace(ctx: CanvasRenderingContext2D, color: string, trans: number[], time: number) {
        const points = Transform(Rotate([
                [1, 1, 0, -1, -1, -1, 1, 0],
                [0, -1, -8, -1, 0, 1, 1, 0]],
            time / 6 * Math.PI), trans
        )

        const x = points[0]
        const y = points[1]

        ctx.beginPath()
        ctx.filter = color
        ctx.arc(x[7], y[7], trans[0] * 9, 0, 2 * Math.PI)
        ctx.fill()


        ctx.beginPath();
        ctx.fillStyle = this.colors[3];
        ctx.strokeStyle = this.colors[0];
        ctx.moveTo(x[0], y[0]);
        ctx.bezierCurveTo(x[1], y[1], x[1], y[1], x[2], y[2]);
        ctx.bezierCurveTo(x[3], y[3], x[3], y[3], x[4], y[4]);
        ctx.bezierCurveTo(x[5], y[5], x[6], y[6], x[0], y[0]);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }


    drawButton(ctx: CanvasRenderingContext2D, color: string, trans: number[]) {
        const points = Transform([[0], [0]], trans)
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = '#000';
        ctx.arc(points[0][0], points[1][0], trans[0] * 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }


    draw(ctx: CanvasRenderingContext2D, seq: string, width: number) {
        const [posit, buttons] = this.genPosit(seq)

        const routeY = [10, 30, 50]
        const routeX = [10, 30, 50, 75, 95, 115]
        for (let i = 0; i < 18; i++) {
            this.drawClockFace(
                ctx,
                [this.colors[1], this.colors[2]][~~(i / 9)],
                [width, routeX[~~(i / 3)], routeY[i % 3]],
                posit[i]
            )
        }

        const buttonX = [20, 40]
        const buttonY = [20, 40, 85, 105]
        for (let i = 0; i < 8; i++) {
            this.drawButton(ctx,
                [this.colors[4], this.colors[3]][buttons[i]],
                [width, buttonX[~~(i / 2)], buttonY[i % 2]]
            )
        }
    }
}

export const DrawClockCubeCanvas = (imageWidth: number, seq: string): HTMLCanvasElement => {
    imageWidth /= 10

    const imageSize = (imageWidth / 15)
    const canvasW = 6.25 * 20 * imageWidth
    const canvasH = 3 * 20 * imageWidth

    const canvas: HTMLCanvasElement = document.createElement("canvas")
    canvas.width = canvasW
    canvas.height = canvasH
    canvas.style.width = 6.25 * imageSize + 'em'
    canvas.style.height = 3 * imageSize + 'em'

    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const drawerUtils = new ClockCubeDrawerUtils()
    drawerUtils.draw(ctx, seq, imageWidth)

    return canvas
}

export const DrawClockCubeImage = (id: string, imageWidth: number, seq: string) => {
    const canvas = DrawClockCubeCanvas(imageWidth, seq)
    return (
        <img src={canvas.toDataURL()} alt={id + ".jpeg"} id={id} key={id}/>
    )
}