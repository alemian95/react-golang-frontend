import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/hooks/useAuth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Login() {

    const { login } = useAuth()

    const navigate = useNavigate()

    const [ error, setError ] = useState<string | null>(null)

    const [ form, setForm ] = useState({
        email : "",
        password : "",
        remember : false,
    })

    const onSubmit = async (event : any) => {
        event.preventDefault()
        login(form.email, form.password, form.remember, setError)
        .then(() => {
            navigate("/app")
        })
    }

    return (
        <>
            <Card className="w-full max-w-screen-sm mx-auto my-12">
                <CardHeader>
                    <CardTitle>LogIn</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={ onSubmit }>
                        <Input type="email" name="email" id="email" onInput={ event => setForm({ ...form, email : event.currentTarget.value }) } />
                        <Input type="password" name="password" id="password" onInput={ event => setForm({ ...form, password : event.currentTarget.value }) } />
                        <Button variant="positive">Login</Button>
                    </form>
                </CardContent>
            </Card>

            <pre>{JSON.stringify(error, null, 2)}</pre>
        </>
    )
}