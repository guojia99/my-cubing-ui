import "./random.css"
import React, {JSX} from "react";


type  CheckBoxs = {
    Values: string[],
    Name: string,
    ID: string,
    SelectID: string,
}

function get_alphabet() {
    return Array.from({length: 26}, (_, i) =>
        String.fromCharCode(65 + i)
    )
}

function get_sheng_mu() {
    return ["b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "h", "j", "q", "x", "zh", "ch", "sh", "r", "z", "c", "s", "y", "w"]
}

// 【a】ā á ǎ à 【o】ō ó ǒ ò【e】ē é ě è【i】ī í ǐ ì【u】ū ú ǔ ù【ü】ǖ ǘ ǚ ǜ.


const yun_mu_sheng_diao: Map<number, string[]> = new Map([
    [0, ["a", "o", "e", "i", "u", "ü"]],
    [1, ["ā", "ō", "ē", "ī", "ū", "ǖ"]],
    [2, ["á", "ó", "é", "í", "ú", "ǘ"]],
    [3, ["ǎ", "ǒ", "ě", "ǐ", "ǔ", "ǚ"]],
    [4, ["à", "ò", "è", "ì", "ù", "ǜ"]],
])
const base_yun_mu = ["a", "o", "e", "i", "u", "ü", "ai", "ei", "ui", "ao", "ou", "iu", "ie", "üe", "er", "an", "en", "in", "un", "ün", "ang", "eng", "ing", "ong"]

function get_yun_mu(idx: number) {
    if (idx === 0) {
        return base_yun_mu
    }
    let new_list: string[] = []
    let keys = yun_mu_sheng_diao.get(idx) as string[]
    const zero = yun_mu_sheng_diao.get(0) as string[]
    base_yun_mu.forEach((value) => {
        for (let i = 0; i < zero.length; i++) {
            const has = value.indexOf(zero[i])
            if (has !== -1) {
                value = value.replace(value[has], keys[i])
                break
            }
        }
        new_list.push(value)
    })
    return new_list
}

class Random extends React.Component {


    check_all(id: string) {
        return () => {
            let check = document.getElementById(id) as HTMLInputElement
            const checkboxes = document.querySelectorAll('input[type="checkbox"][id*="' + id + '"]');
            checkboxes.forEach((value, key, parent) => {
                let input = document.getElementById(value.id) as HTMLInputElement
                input.checked = check.checked
            })
        }
    }

    get_checkbox(checks: CheckBoxs []) {
        let bodys: JSX.Element[] = []
        for (let i = 0; i < checks.length; i++) {
            const check = checks[i]

            let values: JSX.Element[] = []

            check.Values.forEach((v) => {
                values.push(
                    <div className="form-check form-switch form-check-inline" key={"baseDiv" + check.ID + check.SelectID + v}>
                        <input className="form-check-input" type="checkbox" role={"switch"} id={check.ID + check.SelectID + v} key={check.ID + check.SelectID + v} value={v}
                               defaultChecked={true}/>
                        <label className="form-check-label" htmlFor={check.ID + check.SelectID + v}>{v}</label>
                    </div>
                )
            })
            bodys.push(
                <div key={"checkBody_" + check.ID} className="col-6">
                    <h4>{check.Name}</h4>
                    {values}
                    <div className="form-check form-switch form-check-inline">
                        <input className="form-check-input" type="checkbox" role={"switch"}
                               id={check.ID + check.SelectID}
                               key={check.ID + check.SelectID}
                               defaultChecked={true} onChange={this.check_all(check.ID + check.SelectID)}/>
                        <label className="form-check-label" htmlFor={check.ID + check.SelectID}>全选</label>
                    </div>
                </div>
            )
        }


        return (
            <div className="container text-center">
                <div className="row">
                    {bodys}
                </div>
            </div>
        );
    }


    get_select_mode() {
        return (
            <div className="container text-center">
                <div className="row">
                    <div className="col-1">
                        <select className="form-select"
                                defaultValue={"1"}
                                id={"select_mode"}
                                aria-label="选择模式"
                                onChange={() => {
                                    this.setState({})
                                }}>
                            <option value="1">字母</option>
                            <option value="2">拼音</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }

    mode1 = "字母"
    mode2 = "拼音"

    get_mode() {
        let select = document.getElementById("select_mode")
        if (select === null) {
            return this.mode1
        }

        let se = select as HTMLSelectElement
        switch (se.selectedIndex) {
            case 0:
                return this.mode1
            case 1:
                return this.mode2
        }
        return this.mode1
    }

    get_random() {
        let f_list: string[] = []
        let l_list: string[] = []

        const randomCheckboxes = document.querySelectorAll('input[type="checkbox"][id*="random"][checked]');

        randomCheckboxes.forEach((value: Element) => {
            let inp = document.getElementById(value.id) as HTMLInputElement
            if (!inp.checked) {
                return
            }

            let id = value.id.replace("random_", "")
            if (id[0] === "l") {
                l_list.push(inp.value)
            } else {
                f_list.push(inp.value)
            }
        })

        if (f_list.length === 0 || l_list.length === 0) {
            alert("请选择至少一个选项")
            return;
        }
        // 获取随机字母
        const ff = f_list[Math.floor(Math.random() * f_list.length)];
        const ll = l_list[Math.floor(Math.random() * l_list.length)];

        const input = document.getElementById("random_input") as HTMLDivElement
        input.setAttribute("data-text1", ff)
        input.setAttribute("data-text2", ll)
        return
    }


    get_input() {
        return (
            <div style={{marginBottom: "50px"}} className="text-center">
                <div
                    id={"random_input"}
                    className={"btn form-control random_value"}
                    style={{fontSize: "150px"}}
                    defaultValue={"点击随机"}
                    onClick={this.get_random}
                    aria-describedby="random_help"
                    data-text1={"点击"}
                    data-text2={"随机"}
                ></div>
                <div id="random_help" className="form-text">点击字母执行随机</div>
            </div>
        )
    }


    render() {
        let mode = this.get_mode()

        let checks: CheckBoxs[] = []
        switch (mode) {
            case this.mode1:
                checks = [
                    {
                        Name: "首字母",
                        ID: "random_f",
                        SelectID: "f",
                        Values: get_alphabet(),
                    },
                    {
                        Name: "次字母",
                        ID: "random_l",
                        SelectID: "l",
                        Values: get_alphabet(),
                    }
                ]
                break
            case this.mode2:
                checks = [
                    {
                        Name: "声母",
                        ID: "random_f",
                        SelectID: "f",
                        Values: get_sheng_mu(),
                    },
                    {
                        Name: "韵母1",
                        ID: "random_l_1",
                        SelectID: "s1",
                        Values: get_yun_mu(1),
                    },
                    {
                        Name: "韵母2",
                        ID: "random_l_2",
                        SelectID: "s2",
                        Values: get_yun_mu(2),
                    },
                    {
                        Name: "韵母3",
                        ID: "random_l_3",
                        SelectID: "s3",
                        Values: get_yun_mu(3),
                    },
                    {
                        Name: "韵母4",
                        ID: "random_l_4",
                        SelectID: "s4",
                        Values: get_yun_mu(4),
                    },
                ]
                break
        }

        return (<div>
            <h1 className="text-center" style={{marginBottom: "50px"}}>随机字母生成器</h1>
            {this.get_select_mode()}
            {this.get_input()}

            {this.get_checkbox(checks)}
        </div>)
    }

}


export default Random;