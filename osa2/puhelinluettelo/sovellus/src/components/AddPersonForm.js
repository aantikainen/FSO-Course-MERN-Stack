import React from 'react'

const AddPersonForm = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div> name:
            <input
                        value={props.nameValue}
                        onChange={props.personChange}
                    />
                </div>
                <div> number:
            <input
                        value={props.numberValue}
                        onChange={props.numberChange}
                    />
                </div>

                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default AddPersonForm