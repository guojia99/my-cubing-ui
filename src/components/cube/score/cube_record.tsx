import './cube_record.css'



export const PR_And_GR_Record = (pr: boolean, gr: boolean) => {
    if (gr) {
        return (<span className="badge text-bg-danger record-badge">GR</span>)
    }
    if (pr){
        return  <span className="badge text-bg-success record-badge">PR</span>
    }
    return (<span className="badge record-badge empty-badge">EE</span>)
}