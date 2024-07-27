import { LoginErrorsType, useAuth } from "@/lib/hooks/useAuth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Login() {

    const navigate = useNavigate()

    const { login } = useAuth()

    const [ errors, setErrors ] = useState<LoginErrorsType>({})

    const [ form, setForm ] = useState({
        email : "",
        password : "",
        remember : false,
    })

    const onSubmit = async (event : any) => {
        event.preventDefault()
        console.log(form)
        login(form.email, form.password, form.remember, setErrors)
        .then(() => navigate("/app"))
    }

    return (
        <div>
            <h1>Login</h1>

            <pre>{JSON.stringify(form, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>

            <form onSubmit={ onSubmit }>
                <input type="email" name="email" id="email" onInput={ event => setForm({ ...form, email : event.currentTarget.value }) } />
                <input type="password" name="password" id="password" onInput={ event => setForm({ ...form, password : event.currentTarget.value }) } />
                <input type="checkbox" name="remember" id="remember" onInput={ event => setForm({ ...form, remember : event.currentTarget.checked }) } />
                <button>Login</button>
            </form>
        </div>
    )
}