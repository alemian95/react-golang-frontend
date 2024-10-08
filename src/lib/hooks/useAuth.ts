
import { AxiosError } from "axios"
import { Dispatch, SetStateAction } from "react"
import client from "../axios"
import csrf from "../csrf"

// export type LoginErrorsType = {
//     email? : string,
//     password? : string,
// }

export type SetErrorsType = Dispatch<SetStateAction<string | null>>

export type AuthErrorResponse = {
    error? : string
}

export const useAuth = () => {

    const getAuthenticatedUser = () => {
        return client.get("auth/check")
    }

    const login = async (email : string, password : string, setError : SetErrorsType) => {
        setError(null)

        await csrf()

        return client.post("auth/login", { email, password })
        .then(() => {})
        .catch((error : AxiosError<AuthErrorResponse>) => {
            if (error.response?.status == 422 && error.response.data.error) {
                setError(error.response.data.error)
            }
            throw error
        })
    }

    const register = async (name : string, email : string, password : string, password_confirm: string, setError : SetErrorsType) => {
        setError(null)

        await csrf()

        return client.post("auth/register", { name, email, password, password_confirm})
        .then(() => {})
        .catch((error : AxiosError<AuthErrorResponse>) => {
            if (error.response?.data.error) {
                setError(error.response.data.error)
            }
            throw error
        })
    }

    const logout = async () => {
        await csrf()
        return client.post("auth/logout")
    }

    const forgotPassword = async (email : string, setError : SetErrorsType) => {
        setError(null)

        await csrf()

        return client.post("auth/forgot-password", { email })
        .then(() => {})
        .catch((error : AxiosError<AuthErrorResponse>) => {
            if (error.response?.data.error) {
                setError(error.response.data.error)
            }
            throw error
        })
    }

    const resetPassword = async (email : string, password : string, password_confirm: string, token : string, setError : SetErrorsType) => {
        setError(null)

        await csrf()

        return client.post("auth/reset-password", { email, token, password, password_confirm })
        .then(() => {})
        .catch((error : AxiosError<AuthErrorResponse>) => {
            if (error.response?.data.error) {
                setError(error.response.data.error)
            }
            throw error
        })
    }


    return {
        getAuthenticatedUser,
        login,
        logout,
        register,
        forgotPassword,
        resetPassword
    }
}