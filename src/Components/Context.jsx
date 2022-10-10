import React,{createContext,useState} from 'react'

export const TotalContext = createContext(); 



export const AuthProvider = ({ children }) => {
    const [subTotal, setSubTotal] = useState(0);
    var subt = 0 ;
    const updateSubTotal = (ta) => {
setSubTotal(subTotal + ta )    } 

    return (
        <TotalContext.Provider
            value={{
                subTotal,
             setSubTotal,
             updateSubTotal, subt
            }}>
            {children}
        </TotalContext.Provider>
    );
};