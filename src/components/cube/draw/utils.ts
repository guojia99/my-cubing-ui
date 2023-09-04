export const hsq3 = Math.sqrt(3) / 2


// Transform
// 对2D坐标进行线性变换
export function Transform(arr: number[][], trans: number[]): number[][] {
    if ((trans.length !== 3 && trans.length !== 6) || (arr.length !== 2)) {
        console.log("the transform error")
        return arr
    }

    let out1: number[] = [], out2: number[] = []
    if (trans.length === 3) {
        trans = [trans[0], 0, trans[1] * trans[0], 0, trans[0], trans[2] * trans[0]]
    }
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