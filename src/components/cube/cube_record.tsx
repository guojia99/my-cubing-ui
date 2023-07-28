import './cube_record.css'

export const SelfBestRecord = (isBest: boolean) => {
    if (!isBest) {
        return (<></>)
    }

    return (
        <span className="badge rounded-pill text-bg-success record-badge">
            PR
        </span>
    )
}

export const Record = (isBest: boolean) => {
    if (!isBest) {
        return (<></>)
    }
    return (
        <span className="badge rounded-pill text-bg-danger record-badge">
            GR
        </span>
    )
}