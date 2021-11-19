const signIn = (JWTToken, Name) => {
    return {
        type: 'SIGN_IN',
        JWTToken,
        Name
    }
}

const signOut = () =>{
    return {
        type: 'SIGN_OUT'
    }
}

export {
    signIn, 
    signOut
};