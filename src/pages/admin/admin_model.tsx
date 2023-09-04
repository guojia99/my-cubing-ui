import React from "react";

export const renderPenaltyDescription = () => {
    // https://blog.csdn.net/u010992313/article/details/99701862
    const list = [
        {
            name: "起表时魔方在计时器上",
            color: "#007bff",
            explain: "",
            add: 2
        },
        {
            name: "起表不规范",
            color: "#17a2b8",
            explain: "如存在手心向魔方的起表动作",
            add: 2
        },
        {
            name: "起表时触碰魔方",
            color: "#28a745",
            explain: "一切有意或无意在拍表过程中触碰魔方的动作",
            add: 2
        },
        {
            name: "观察超过15秒",
            color: "#6610f2",
            explain: "观察时间大于15秒小于17秒",
            add: 2
        },
        {
            name: "拍表时触碰魔方",
            color: "#fd7e14",
            explain: "",
            add: 2
        },
        {
            name: "拍表不规范",
            color: "#e83e8c",
            explain: "如存在手心向魔方的拍表动作",
            add: 2
        },
        {
            name: "拍表后触碰魔方",
            color: "#dc3545",
            explain: "拍表后存在触碰动作",
            add: 2
        },
        {
            name: "魔方存在一步还原",
            color: "#ffc107",
            explain: "不同魔方有不同的鉴定标准，一般以1/8角度内还原作为界限",
            add: 2
        },
    ]

    let item = []
    for (let i = 0; i < list.length; i++) {
        item.push(
            <li className="list-group-item d-flex justify-content-between align-items-start"
                key={"renderPenaltyDescription_" + i}>
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{list[i].name}</div>
                    {list[i].explain}
                </div>
                <span className="badge" style={{background: list[i].color}}>{i + 1}</span>
            </li>
        )
    }

    return (<ol className="list-group list-group-numbered">{item}</ol>)
}



