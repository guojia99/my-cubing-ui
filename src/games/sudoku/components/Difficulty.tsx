import React from 'react';
import {useSudokuContext} from '../context/SudokuContext';

type DifficultyProps = {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
};

/**
 * React component for the Difficulty Selector.
 */
export const Difficulty = (props: DifficultyProps) => {
    let {difficulty} = useSudokuContext();

    return (
        <div className="status__difficulty">
            <span className="status__difficulty-text">难度:&nbsp;&nbsp;</span>
            <select name="status__difficulty-select" className="status__difficulty-select" defaultValue={difficulty} onChange={props.onChange}>
                <option value="very_easy">入门</option>
                <option value="easy">初级</option>
                <option value="moderate">中级</option>
                <option value="advanced">高级</option>
                <option value="hard">困难</option>
                <option value="master">大师</option>
                <option value="number17">十七数</option>
            </select>
        </div>
    )
}
