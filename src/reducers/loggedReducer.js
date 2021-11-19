
const initialState = {
    JWTToken: undefined,
    Name: undefined
};

const loggedReducer = (state = initialState, action = 'default') =>{
    switch (action.type){
        case 'SIGN_IN':
            return {
                ...state,
                JWTToken: action.JWTToken,
                Name: action.Name
            }
        break;
        case 'SIGN_OUT':
            return {
                ...state,
                JWTToken: undefined,
                Name: undefined
            }
        break
        default:
            return state
    }
}

export default loggedReducer;