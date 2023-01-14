export const getRange =(start = 0, end = 0) => {
    return Array.from({length: end - start + 1}, (_,i) => i + start)
}
