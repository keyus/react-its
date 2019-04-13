export const auth = (data = {})=>{
    return {
        type: 'AUTH',
        data
    }
}
export const logout = (history)=>{
    return {
        type: 'LOGOUT',
        history,
    }
}
