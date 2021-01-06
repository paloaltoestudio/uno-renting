import React, { createContext, useState } from 'react';

export const SignUpContext = createContext();

const SignUpContextProvider = props => {

    const [signup, setSignup] = useState();

    return (
        <SignUpContext.Provider value={{signup, setSignup}}>
            {props.children}
        </SignUpContext.Provider>
    )
}

export default SignUpContextProvider;