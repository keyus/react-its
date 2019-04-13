import history from '@history';
let user = localStorage.getItem('user');
try{
    user = user ? JSON.parse(user) : {}
}catch (e) {
    console.error(e);
    user = {};
}
const initState = {
    ...user,
}
export default (state = initState, action) => {
    const states = {...state};
    switch (action.type){
        case 'AUTH' :
            localStorage.setItem('token',action.data.token);
            localStorage.setItem('user',JSON.stringify(action.data));
            return {
                ...action.data,
                ...states,
            };
        case 'LOGOUT' :
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            history.push('/login')
            return {};
        default:
            return states;
    }
}
