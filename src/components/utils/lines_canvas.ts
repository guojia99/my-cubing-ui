export async function LoopDrawElementById(id: string) {
    const canvas = document.getElementById(id) as HTMLCanvasElement
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    const waveColors =
        [
            "#E3D2F790",
            "#D2F3F760",
            "#D2F7E330",
        ];


    const range = canvas.height / 8;
    let step = 0;

    function drawWave(ctx: CanvasRenderingContext2D, color: string, angle: number, range: number) {
        ctx.fillStyle = color;  //填充颜色
        const radian = angle * Math.PI / 180; //角度转换成弧度
        const deltaHeightLeft = Math.sin(radian) * range;  //矩形高度的变化量（左上顶点）
        const deltaHeightRight = Math.cos(radian) * range;//矩形高度的变化量（右上顶点）
        ctx.beginPath();  //开始绘制路径
        ctx.moveTo(0, canvas.height / 2 + deltaHeightLeft); //左上角
        //画曲线
        ctx.bezierCurveTo(canvas.width / 2, canvas.height / 2 + deltaHeightLeft - range, canvas.width / 2, canvas.height / 2 + deltaHeightRight - range, canvas.width, canvas.height / 2 + deltaHeightRight);
        ctx.lineTo(canvas.width, canvas.height / 2 + deltaHeightRight);  //右上角
        ctx.lineTo(canvas.width, canvas.height); //右下角
        ctx.lineTo(0, canvas.height); //左下角
        ctx.lineTo(0, canvas.height / 2 + deltaHeightLeft);
        ctx.closePath();  //闭合路径
        ctx.fill();  //填充路径
    }

    function loop(ctx: CanvasRenderingContext2D) {
        step++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);  //清空canvas

        //画多个波浪
        for (let i = 0; i < waveColors.length; i++) {
            const angle = step + i * 45;
            const color = waveColors[i];
            drawWave(ctx, color, angle, range);
        }
    }


    window.setInterval(() => {
        loop(ctx)
    }, 1000 / 60)
}
