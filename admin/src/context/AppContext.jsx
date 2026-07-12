import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const backendUrl = "http://localhost:4000"  // ADD THIS

    const currency = 'Rs.'

    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    const slotDateFormat = (slotDate) => {
        if (!slotDate) return "";
        const dateArray = slotDate.split('_');
        if (dateArray.length !== 3) return slotDate; 
        return `${dateArray[0]} ${months[Number(dateArray[1])] || ""} ${dateArray[2]}`;
    };

    const value = {
        calculateAge,
        slotDateFormat,
        currency,
        backendUrl   // ADD THIS
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider