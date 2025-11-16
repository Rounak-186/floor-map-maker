export function IdGenerator() {
    const id = (Math.floor(Date.now() / Math.pow(10, 10) * Math.random() * 10))
    return (`fn_${id}`)
}