import {ParseScramble} from "./scramble";
import {DrawPolygon} from "./utils";
import React, {JSX} from "react";

class NumberCubeDrawerUtils {
    private colors = [
        '#ff0', // 实际是绿色
        '#fa0', // 实际红色
        '#00f', // 实际白色
        '#fff', // 实际蓝色
        '#f00', // 实际橙色
        '#0d0' // 实际是黄色
    ]
    // private colors = [
    //     '#00dd00',
    //     '#ff0000',
    //     '#ffffff',
    //     '#0000ff',
    //     '#ffaa00',
    //     '#ffff00'
    // ]

    /**
     *  f: face, [ D L B U R F ]
     *  d: which slice, in [0, size-1)
     *  q: [  2 ' ]
     *  size: cube size
     */
    private doSlice(posit: number[], f: number, d: number, q: number, size: number): number[] {
        let f1: number = 0, f2: number = 0, f3: number = 0, f4: number = 0
        let s2: number = size * size;
        if (f > 5) {
            f -= 6
        }
        for (let k = 0; k < q; k++) {
            for (let i = 0; i < size; i++) {
                switch (f) {
                    case 0:
                        f1 = 6 * s2 - size * d - size + i;
                        f2 = 2 * s2 - size * d - 1 - i;
                        f3 = 3 * s2 - size * d - 1 - i;
                        f4 = 5 * s2 - size * d - size + i;
                        break
                    case 1:
                        f1 = 3 * s2 + d + size * i;
                        f2 = 3 * s2 + d - size * (i + 1);
                        f3 = s2 + d - size * (i + 1);
                        f4 = 5 * s2 + d + size * i;
                        break
                    case 2:
                        f1 = 3 * s2 + d * size + i;
                        f2 = 4 * s2 + size - 1 - d + size * i;
                        f3 = d * size + size - 1 - i;
                        f4 = 2 * s2 - 1 - d - size * i;
                        break
                    case 3:
                        f1 = 4 * s2 + d * size + size - 1 - i;
                        f2 = 2 * s2 + d * size + i;
                        f3 = s2 + d * size + i;
                        f4 = 5 * s2 + d * size + size - 1 - i;
                        break
                    case 4:
                        f1 = 6 * s2 - 1 - d - size * i;
                        f2 = size - 1 - d + size * i;
                        f3 = 2 * s2 + size - 1 - d + size * i;
                        f4 = 4 * s2 - 1 - d - size * i;
                        break
                    case 5:
                        f1 = 4 * s2 - size - d * size + i;
                        f2 = 2 * s2 - size + d - size * i;
                        f3 = s2 - 1 - d * size - i;
                        f4 = 4 * s2 + d + size * i;
                        break
                }
                const c: number = posit[f1];
                posit[f1] = posit[f2];
                posit[f2] = posit[f3];
                posit[f3] = posit[f4];
                posit[f4] = c;
            }
            if (d === 0) {
                for (let i = 0; i + i < size; i++) {
                    for (let j = 0; j + j < size - 1; j++) {
                        f1 = f * s2 + i + j * size;
                        f3 = f * s2 + (size - 1 - i) + (size - 1 - j) * size;
                        if (f < 3) {
                            f2 = f * s2 + (size - 1 - j) + i * size;
                            f4 = f * s2 + j + (size - 1 - i) * size;
                        } else {
                            f4 = f * s2 + (size - 1 - j) + i * size;
                            f2 = f * s2 + j + (size - 1 - i) * size;
                        }
                        const c: number = posit[f1];
                        posit[f1] = posit[f2];
                        posit[f2] = posit[f3];
                        posit[f3] = posit[f4];
                        posit[f4] = c;
                    }
                }
            }
        }
        return posit
    }

    // genPosit: 将打乱公式解析成每一面的数据
    private genPosit(size: number, scramble: string): number[] {
        let cnt = 0
        let posit: number[] = [];
        for (let i = 0; i < 6; i++) {
            for (let f = 0; f < size * size; f++) {
                posit[cnt++] = i
            }
        }
        const moves = ParseScramble(scramble, "DLBURF")
        for (let s = 0; s < moves.length; s++) {
            for (let d = 0; d < moves[s][1]; d++) {
                posit = this.doSlice(posit, moves[s][0], d, moves[s][2], size)
            }
            if (moves[s][1] === -1) {
                for (let d = 0; d < size - 1; d++) {
                    posit = this.doSlice(posit, moves[s][0], d, -moves[s][2], size)
                }
                posit = this.doSlice(posit, (moves[s][0] + 3) % 6, 0, moves[s][2] + 4, size)
            }
        }
        return posit
    }

    // posit: 每一面颜色集合
    // size: 阶数
    // fNum: 哪一面
    private drawFace(ctx: CanvasRenderingContext2D, width: number, posit: number[], size: number, fNum: number) {
        let offX = 10 / 9, offY = 10 / 9
        switch (fNum) {
            case 0: // D
                offX *= size
                offY *= size * 2
                break
            case 1: // L
                offX *= 0;
                offY *= size;
                break
            case 2: // B
                offX *= size * 3;
                offY *= size;
                break
            case 3: // U
                offX *= size;
                offY *= 0;
                break
            case 4: // R
                offX *= size * 2;
                offY *= size;
                break
            case 5: // F
                offX *= size;
                offY *= size;
                break
        }


        for (let i = 0; i < size; i++) {
            const x = (fNum === 1 || fNum === 2) ? size - 1 - i : i
            for (let j = 0; j < size; j++) {
                const y = (fNum === 0) ? size - 1 - j : j
                DrawPolygon(
                    ctx,
                    this.colors[posit[(fNum * size + y) * size + x]], [
                        [i, i, i + 1, i + 1],
                        [j, j + 1, j + 1, j]
                    ], [width, offX + 0.1, offY + 0.1]
                )
            }
        }
    }


    // ctx: canvas的上下文
    // size: 正阶的阶数
    // seq: 打乱
    // width: 图像宽度
    draw(ctx: CanvasRenderingContext2D, size: number, seq: string, width: number) {
        seq = seq || ''
        // seq = "z2" + ' ' + seq
        const posit = this.genPosit(size, seq)
        ctx.lineWidth = 0.5 + size / 2 // 阶数越大纹路加粗
        for (let i = 0; i < 6; i++) {
            this.drawFace(ctx, width, posit, size, i)
        }
    }
}

export const DrawNumberCubeCanvas = (size: number, imageWidth: number, seq: string) : HTMLCanvasElement => {
    const imgSize = (imageWidth / 100)
    const canvasW = (39 * size / 9 + 0.2) * imageWidth
    const canvasH = (29 * size / 9 + 0.2) * imageWidth

    // 初始化
    const canvas: HTMLCanvasElement = document.createElement("canvas")
    canvas.width = canvasW
    canvas.height = canvasH
    canvas.style.width = 39 * imgSize + "em"
    canvas.style.height = 29 * imgSize + "em"

    // 绘制
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const numberCubeDrawerUtils = new NumberCubeDrawerUtils()
    numberCubeDrawerUtils.draw(ctx, size, seq, imageWidth)

    return canvas
}


export const DrawNumberCubeImage = (id: string, size: number, imageWidth: number, seq: string) : JSX.Element => {
    const canvas = DrawNumberCubeCanvas(size, imageWidth, seq)
    return (
        <img src={canvas.toDataURL()} alt={id + ".jpeg"} id={id} key={id}/>
    )
}