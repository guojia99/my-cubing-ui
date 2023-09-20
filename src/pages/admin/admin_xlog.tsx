import {API} from "../../components/api/api";
import {XLog} from "../../components/api/api_model";

export class AdminXLogRender {
    data: XLog[]= []


    constructor() {
        API.GetXLog().then(value => {
            this.data = value
        })
    }

    render() {
        return <div></div>
    }
}