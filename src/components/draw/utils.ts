export const hsq3 = Math.sqrt(3) / 2


// Transform
// 对2D坐标进行线性变换
export function Transform(arr: number[][], trans: number[]): number[][] {
    // if ((trans.length !== 3 && trans.length !== 6)) {
    //     return arr
    // }

    // if (arr.length !== 2){
    //     return arr
    // }

    if (trans.length === 3) {
        trans = [trans[0], 0, trans[1] * trans[0], 0, trans[0], trans[2] * trans[0]]
    }
    let out1: number[] = [], out2: number[] = []
    for (let i = 0; i < arr[0].length; i++) {
        out1[i] = arr[0][i] * trans[0] + arr[1][i] * trans[1] + trans[2]
        out2[i] = arr[0][i] * trans[3] + arr[1][i] * trans[4] + trans[5]
    }
    return [out1, out2]
}


// Rotate
// 旋转坐标
export function Rotate(arr: number[][], theta: number): number[][] {
    return Transform(
        arr, [
            Math.cos(theta), -Math.sin(theta), 0,
            Math.sin(theta), Math.cos(theta), 0
        ]
    )
}

// DrawPolygon
export function DrawPolygon(
    ctx: CanvasRenderingContext2D,
    color: string | CanvasGradient | CanvasPattern,
    arr: number[][], trans: number[]
) {
    trans = trans || [1, 0, 0, 0, 1, 0]
    arr = Transform(arr, trans)

    ctx.beginPath()
    ctx.fillStyle = color
    ctx.moveTo(arr[0][0], arr[1][0])
    for (let i = 1; i < arr[0].length; i++) {
        ctx.lineTo(arr[0][i], arr[1][i])
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
}


export function Circle(arr: number[], ...args: number[]): number[] {
    const length = args.length
    let temp = arr[args[length - 1]]
    for (let i = length - 1; i > 0; i--) {
        arr[args[i]] = arr[args[i - 1]];
    }
    arr[args[0]] = temp;
    return arr;
}


export const scrambleReg = /^([\d]+(?:-\d+)?)?([FRUBLDfrubldzxySME])(?:([w])|&sup([\d]);)?([2'])?$/;
export const turn = 'FRUBLDfrubldzxySME'
export const baseTurn = "FRUBLD"
export function ParseScramble(scramble: string, moveMap: string): number[][] {
    let seq: number[][] = []

    const moves = scramble.split(' ')
    let  w, p;
    for (let s = 0; s < moves.length; s++) {
        const m = scrambleReg.exec(moves[s])
        if (m === null) {
            continue
        }

        let f = turn.indexOf(m[2])
        if (f > 14) {
            const p = "2'".indexOf(m[5] || 'X') + 2
            f = [0, 4, 5][f % 3]
            seq.push([moveMap.indexOf(baseTurn.charAt(f)), 2, p])
            seq.push([moveMap.indexOf(baseTurn.charAt(f)), 1, 4 - p])
            continue
        }

        w = (m[1] || '').split('-');
        let w2 = ~~w[1] || -1;
        w = f < 12 ? (~~w[0] || ~~m[4] || ((m[3] === "w" || f > 5) && 2) || 1) : -1;
        p = (f < 12 ? 1 : -1) * ("2'".indexOf(m[5] || 'X') + 2);
        seq.push([moveMap.indexOf("FRUBLD".charAt(f % 6)), w, p, w2]);
    }
    return seq
}