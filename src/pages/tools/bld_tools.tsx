import React from "react";
import {bld_rule_json_file} from "./bld_json_file";




class BLDTools extends React.Component {

    // json_rule_id = "bld_tools_json_rule"

    // json_rule() {
    //     return (
    //         <div className="json_rule">
    //             <label htmlFor={this.json_rule_id} className="form-label">联想词配置</label>
    //             <textarea className="form-control" id={this.json_rule_id} rows={3}>
    //                 {bld_rule_json_file}
    //             </textarea>
    //         </div>
    //     )
    // }
    random_text_id = ""
    random_text() {
        // let randomEntries = Object.keys(entries)[Math.floor(Math.random() * entries.length)];

        return (
            <div></div>
        )
    }


    render() {
        return (
            <div>
                {this.random_text()}
            </div>
        )
    }
}

export default BLDTools;