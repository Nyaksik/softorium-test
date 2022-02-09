import { useState } from "react"

export default function useContolInput(InitialState = '', maxLength = 30) {
    const [value, setValue] = useState(InitialState)
    const isMaxLength = value.length === maxLength

    function onChange(e) {
        if(!isMaxLength) {
            setValue(e.target.value.trim())
        }
    }

    return {
        value, onChange
    }
}