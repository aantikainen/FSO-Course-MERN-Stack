import React from 'react'

const AddForm = (props) => {
    return (
        <div>
            <form>
          <div>
            Name: <input onChange={props.onChange} value={props.newName}/>
          </div>
          <div>             
            Number: <input onChange={props.onChangeNumber} value={props.newNumber}/>
          </div>
          <div>
            <button onClick={props.onClick} type="submit">add</button>
          </div>
        </form>
        </div>
    )
}

export default AddForm