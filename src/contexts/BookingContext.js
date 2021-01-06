import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

const BookingContextProvider = props => {

    const [booking, setBooking] = useState({
        patinetes: 'EU001 , EU100, EU234'
    });

    return (
        <BookingContext.Provider value={{booking}}>
            {props.children}
        </BookingContext.Provider>
    )
}

export default BookingContextProvider;