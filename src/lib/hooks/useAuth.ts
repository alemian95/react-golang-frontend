
import { AxiosError } from "axios"
import { Dispatch, SetStateAction } from "react"
import client from "../axios"
import csrf from "../csrf"

export type LoginErrorsType = {
    email? : string,
    password? : string,
}

export type SetErrorsType = Dispatch<SetStateAction<LoginErrorsType>>

export type LoginErrorResponse = {
    errors? : LoginErrorsType
}

export const useAuth = () => {

    const getAuthenticatedUser = () => {
        return client.get("auth/check")
    }

    const login = async (email : string, password : string, remember : boolean, setErrors : SetErrorsType) => {
        setErrors({})

        await csrf()

        return client.post("auth/login", { email, password, remember })
        .then(() => {})
        .catch((error : AxiosError<LoginErrorResponse>) => {
            if (error.response?.status !== 422) {
                throw error
            }
            else if (error.response.data.errors) {
                setErrors(error.response.data.errors)
            }
            else {
                throw new Error("Server Error")
            }
        })
    }

    const logout = async () => {
        await csrf()
        return client.post("auth/logout")
    }


    return {
        getAuthenticatedUser,
        login,
        logout
    }
}