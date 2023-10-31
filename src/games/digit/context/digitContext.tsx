import React, {createContext, useContext, useState} from "react";

export enum ValueMode {
    Not, // 未准备
    Memory, // 记忆
    MemoryOne, // 专注记忆
    MemoryLine, // 按行记忆
    Answer, // 作答
}

export enum GameMode {
    Number, // 纯数字
    Digit, // 英文
    All, // 混合
}

type DigitContextProps = {
    mode: GameMode,
    setMode: React.Dispatch<React.SetStateAction<GameMode>>,
    valueMode: ValueMode,
    setValueMode: React.Dispatch<React.SetStateAction<ValueMode>>,
    data: string,
    setData: React.Dispatch<React.SetStateAction<string>>,
    dataLength: number,
    setDataLength: React.Dispatch<React.SetStateAction<number>>,
}

const EmptyFn = () => {
}

const DigitContext = createContext<DigitContextProps>({
    mode: GameMode.Digit, setMode: EmptyFn,
    valueMode: ValueMode.Not, setValueMode: EmptyFn,
    data: "", setData: EmptyFn,
    dataLength: 20, setDataLength: EmptyFn,
});


type DigitProviderProps = {
    children: React.ReactElement
};

export const DigitProvider = ({children}: DigitProviderProps) => {
    let [mode, setMode] = useState<GameMode>(GameMode.Digit)
    let [valueMode, setValueMode] = useState<ValueMode>(ValueMode.Not)
    let [data, setData] = useState<string>("")
    let [dataLength, setDataLength] = useState<number>(20)

    return (
        <DigitContext.Provider value={
            {
                mode, setMode,
                valueMode, setValueMode,
                data, setData,
                dataLength, setDataLength,
            }
        }>
            {children}
        </DigitContext.Provider>
    )
}


export const useDigitContext = (): DigitContextProps => useContext(DigitContext)