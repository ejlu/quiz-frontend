import { useState, useEffect, useCallback } from 'react'
import { convertMsToMinSec } from '../utils'
import { usePrevious } from '../hooks/usePrevious'

export const Timer = ({ initialTimeInMs, pageIndex, setPageIndex, setSubmitted, numQuestions }) => {
    const { minutes: initialMin, seconds: initialSec } = convertMsToMinSec(initialTimeInMs)
    const [minutes, setMinutes] = useState(initialMin)
    const [seconds, setSeconds] = useState(initialSec)

    const reset = useCallback(() => {
        setMinutes(initialMin)
        setSeconds(initialSec)
    }, [initialMin, initialSec])

    const secondDisplay = useCallback((seconds) => {
        return (seconds < 10 ? '0' : '') + seconds
    }, [])

    //manual timer to check if we're on a difference page (i.e. user clicked next)
    const prevIndex = usePrevious(pageIndex)
    useEffect(() => {
        if(prevIndex !== pageIndex) {
            reset()
        }
    }, [prevIndex, pageIndex, reset])

    //auto timer
    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prev => prev - 1)
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer)
                    if (pageIndex < numQuestions) {
                        reset()
                        setPageIndex(prev => prev + 1)
                    } else {
                        setSubmitted(true)
                    }
                } else {
                    setMinutes(prev => prev - 1)
                    setSeconds(59)
                }
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [minutes, seconds, numQuestions, pageIndex, setPageIndex, reset, setSubmitted])

    return (
        <div>
            <h2>
                {`${minutes}:${secondDisplay(seconds)}`}
            </h2>
        </div>
    )
}