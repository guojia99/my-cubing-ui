
import "./tags_input.css"

import "./tags_input-js"

export const NewTagsInput = (id: string, defaultValue: string) => {
    return (
        <input type="text"  className="form-control" defaultValue={defaultValue} data-role="tagsinput" placeholder="输入标签" />
    )
}