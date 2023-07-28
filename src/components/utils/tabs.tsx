import React, {JSX} from "react";

import './tabs.css'

export type TabNavsPage = {
    Id: string;
    Name: JSX.Element;
    Page: JSX.Element;
}

export type TabNavsValue = {
    Id: string;
    Pages: TabNavsPage[];
}

export const TabNav = (tb: TabNavsValue) => {
    return (
        <div className="" id={tb.Id}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                {Array.from(Array(tb.Pages.length), (e, i) => {
                    const active = i === 0 ? "active" : ""
                    return (
                        <li className="nav-item" role="presentation">
                            <button className={"nav-link " + active}
                                    id={tb.Id + tb.Pages[i].Id + "-tab"}
                                    data-bs-toggle="tab"
                                    data-bs-target={"#" + tb.Id + tb.Pages[i].Id}
                                    type="button"
                                    role="tab"
                                    aria-controls={tb.Id + tb.Pages[i].Id}
                                    aria-selected={i === 0}>
                                {tb.Pages[i].Name}
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div className="tab-content">
                {Array.from(Array(tb.Pages.length), (e, i) => {
                    const active = i === 0 ? " show active" : ""
                    return (
                        <div className={"tab-pane fade" + active}
                             id={tb.Id + tb.Pages[i].Id}
                             role="tabpanel"
                             aria-labelledby={tb.Id + tb.Pages[i].Id + "-tab"}
                             tabIndex={i}
                        >
                            {tb.Pages[i].Page}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export const TabNavsHorizontal = (tb: TabNavsValue) => {
    return (
        <div className="d-flex">
            <div className="nav nav-tabs flex-column nav-pills col-3 col-lg-1" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                {Array.from(Array(tb.Pages.length), (e, i) => {
                    const active = i === 0 ? "active" : ""
                    return (
                        <button className={"nav-link alert-secondary " + active}
                                id={tb.Pages[i].Id + "-tab"}
                                data-bs-toggle="pill"
                                data-bs-target={"#" + tb.Pages[i].Id}
                                type="button"
                                role="tab"
                                aria-controls={tb.Pages[i].Id}
                                aria-selected={true}>
                            {tb.Pages[i].Name}
                        </button>
                    )
                })}
            </div>
            <div className="tab-content flex-column col-9 col-lg-11" style={{paddingLeft: "10px"}}>
                {Array.from(Array(tb.Pages.length), (e, i) => {
                    const active = i === 0 ? "active" : ""
                    return (
                        <div className={"tab-pane fade show " + active}
                             id={tb.Pages[i].Id}
                             role="tabpanel"
                             aria-labelledby={tb.Pages[i].Id + "-tab"}
                             tabIndex={i}
                        >
                            {tb.Pages[i].Page}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}