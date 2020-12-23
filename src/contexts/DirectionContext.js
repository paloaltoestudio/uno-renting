import React, { createContext, useState } from 'react';

export const DirectionContext = createContext();

const DirectionContextProvider = props => {

    const [isForward, setIsForward] = useState(true);

    return (
        <DirectionContext.Provider value={{ isForward, setIsForward }}>
            {props.children}
        </DirectionContext.Provider>
    )
}

export default DirectionContextProvider;