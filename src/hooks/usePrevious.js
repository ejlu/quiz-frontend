import { useRef, useEffect } from 'react'

//hook to get previous value
export const usePrevious = (value) => {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    }, [value, ref])
    return ref.current
}