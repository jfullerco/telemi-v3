import React from 'react'

const TagCloud = ({data, label, handleClick}) => {

  return(
    <div className="field is-grouped is-grouped-multiline">
      <div className="title">{label}</div>
        <div className="control">
          <div className="tags">
            {!data ? null : data.map(tag => <div className="tag" onClick={()=>handleClick(tag.id)}>{tag.label}</div>)}
          </div>
        </div>
    </div>
  )
}
export default TagCloud