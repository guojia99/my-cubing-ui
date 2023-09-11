import {JSX} from "react";

export type ModalBodyHandle = () => JSX.Element
export type ButtonHandle = () => void

export const ModalButton = (name: string, dataBsTarget: string, buttonHandle: ButtonHandle, buttonStyle: string) => {
    return (<button type="button" className={"btn " + buttonStyle} data-bs-toggle="modal" data-bs-target={"#" + dataBsTarget} onClick={buttonHandle}>{name}</button>)
}

export const CreateModal = (title: string, bodyHandle: ModalBodyHandle, dataBsTarget: string, primaryButtonHandle: ButtonHandle) => {
    const label = dataBsTarget + "Label"
    return (
        // Cannot read properties of undefined (reading 'backdrop')
        <div className="modal fade" id={dataBsTarget} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby={label} aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id={label}>{title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">{bodyHandle()}</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                        <button type="button" className="btn btn-danger" onClick={primaryButtonHandle}>确认</button>
                    </div>
                </div>
            </div>
        </div>
    )
}