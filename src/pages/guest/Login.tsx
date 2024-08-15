import { GuestLayout } from "@/components/layouts/GuestLayout"
import { Spinner } from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/hooks/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"

export function Login() {

    const { login } = useAuth()

    const navigate = useNavigate()

    const [ error, setError ] = useState<string | null>(null)
    const [ pending, setPending ] = useState<boolean>(false)

    const formSchema = z.object({
        email: z.string().email({ message: "Invalid email" }),
        password: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setPending(true)
        login(values.email, values.password, setError)
        .then(() => {
            navigate("/app")
        })
        .finally(() => setPending(false))
    }
    

    return (
        <GuestLayout title="Layout">
            <CardContent>
                {
                    error
                    &&
                    <p className="text-red-600">{error}</p>
                }
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={pending} variant="positive" type="submit">{ pending ? <Spinner /> : "Login" }</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex gap-4 items-center justify-between">
                <Link to="/forgot-password" className="text-sm text-slate-500">Forgot your password?</Link>
                <Link to="/register" className="text-sm text-slate-500">Don't have an account?</Link>
            </CardFooter>
        </GuestLayout>
    )
}