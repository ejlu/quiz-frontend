export const convertMsToMinSec = (ms = 0) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000);
    return {
        minutes,
        seconds
    }
}