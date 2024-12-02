import './cube_record.css'


// 月成绩
export const RecordSpan = (pr: boolean, gr: boolean) => {
    if (gr) {
        return (<span className="badge bg-danger record-badge">GR</span>)
    }
    if (pr) {
        return <span className="badge bg-success record-badge">PB</span>
    }
    return (<span className="badge record-badge empty-badge">EE</span>)
    // return <span></span>
}

export const RecordSpanValue = (pr: boolean, gr: boolean, value: string) => {
    let style = { margin: "0", color: "",   verticalAlign: "text-center"}
    if (gr) {
        style["color"] = "red"
    } else if (pr) {
        style["color"] = "green"
    }

    return <p style={style}>{RecordSpan(pr, gr)} {value}</p>
}