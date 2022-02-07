import { useState } from "react"

export default function useContolInput(InitialState = '') {
    const [value, setValue] = useState(InitialState)

    function onChange(e) {
        setValue(e.target.value.trim())
    }

    return {
        value, onChange
    }
}