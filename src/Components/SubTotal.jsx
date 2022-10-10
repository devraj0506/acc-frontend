import React, {useContext} from 'react'
import { AuthProvider } from './Context'
import { TotalContext } from './Context'

function SubTotal() {

    const { subTotal, setSubTotal, updateSubTotal } = useContext(TotalContext);
    console.log(subTotal);

    return (
        <AuthProvider>
            <h1>{subTotal}</h1>
        </AuthProvider>
    )
}

export default SubTotal