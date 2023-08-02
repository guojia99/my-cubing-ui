import {Circle, DrawPolygon, hsq3, Rotate, Transform} from "./utils";
import {useEffect, useRef} from "react";
import {SkCubeDrawerUtils} from "./draw_skewb";


type drawCache = {
    ep: number[][];
    cp: number[][];
    cpR: number[][];
    cpL: number[][];
    eps: number[][];
    cps: number[][];
}

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
            mid  = 1 - mid
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
            [posit, mid] = this.doSlice(posit, mid, [~~ms[1] + 12, ~~ms[2] + 12, 1]);
        }
        [posit, mid] = this.doSlice(posit, mid, [0, 0, 1]);
        return [posit, mid]
    }

    initDrawFaceCache(): drawCache {
        let drawCache: drawCache = {
            ep: [[0, -0.5, 0.5], [0, -hsq3 - 1, -hsq3 - 1]],
            cp: [[0, -0.5, -hsq3 - 1, -hsq3 - 1], [0, -hsq3 - 1, -hsq3 - 1, -0.5]],
            cpR: [[0, -0.5, -hsq3 - 1], [0, -hsq3 - 1, -hsq3 - 1]],
            cpL: [[0, -hsq3 - 1, -hsq3 - 1], [0, -hsq3 - 1, -0.5]],
            eps: [],
            cps: [],
        }
        drawCache.eps = Transform(drawCache.ep, [0.66, 0, 0])
        drawCache.cps = Transform(drawCache.cp, [0.66, 0, 0])
        return drawCache
    }

    drawFace(ctx: CanvasRenderingContext2D, posit: number[], width: number, fNum: number, cache: drawCache): drawCache {
        let cRot = (fNum < 12 ? (fNum - 3) : (-fNum)) * Math.PI / 6
        let eRot = (fNum < 12 ? (fNum - 5) : (-1 - fNum)) * Math.PI / 6
        let trans = fNum < 12 ? [width, 2.7, 2.7] : [width, 2.7 + 5.4, 2.7]
        let j = (fNum + 1) % 12 + (fNum < 12 ? 0 : 12)

        let val = posit[fNum] >> 1
        let udKey = val >= 8 ? 0 : 3  // U -> 0, D -> 3
        let colorUD = this.colors[udKey]

        if (val % 2 === 0) {
            if (val === (posit[j] >> 1)) {
                cache.cpL = Rotate(cache.cpL, cRot)
                DrawPolygon(ctx, this.colors[this.cCol[val]], cache.cpL, trans);
                cache.cpR = Rotate(cache.cpR, cRot)
                DrawPolygon(ctx, this.colors[this.cCol[val + 1]], cache.cpR, trans);
                cache.cps = Rotate(cache.cps, cRot)
                DrawPolygon(ctx, colorUD, cache.cps, trans);
            }
            return cache
        }
        cache.ep = Rotate(cache.ep, eRot)
        DrawPolygon(ctx, this.colors[this.eCol[val]], cache.ep, trans);
        cache.eps = Rotate(cache.eps, eRot)
        DrawPolygon(ctx, colorUD, cache.eps, trans);
        return cache
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
        let drawCache = this.initDrawFaceCache()
        console.log(posit, mid)
        for (let i = 0; i < 24; i++) {
            drawCache = this.drawFace(ctx, posit, width, i, drawCache)
        }
        this.drawMid(ctx, width, mid)
    }
}

export const DrawSQ1Cube = (id: string, imageWidth: number, seq: string) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement
        let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        const sq1CubeDrawerUtils = new SQ1CubeDrawerUtils()
        sq1CubeDrawerUtils.draw(ctx, seq, imageWidth)
    }, [seq, id, imageWidth]);

    const imageSize = (imageWidth / 20)
    const canvasW = 11 * imageWidth
    const canvasH = 6.3 * imageWidth
    return (
        <canvas id={id} key={id} ref={canvasRef} defaultValue={seq}
                width={canvasW} height={canvasH}
                style={{width: 11 * imageSize / 1.3 + 'em', height: 6.3 * imageSize / 1.3 + 'em'}}>
        </canvas>
    )
}