import { Spinner } from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import client from "@/lib/axios"
import { useAuth } from "@/lib/hooks/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { z } from "zod"

export function ResetPassword() {

    const { token } = useParams()

    const { resetPassword } = useAuth()

    const navigate = useNavigate()

    const [ error, setError ] = useState<string | null>(null)
    const [ pending, setPending ] = useState<boolean>(false)

    const formSchema = z.object({
        token: z.string(),
        email: z.string(),
        password: z.string(),
        password_confirm: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            token: token,
            email: "",
            password: "",
            password_confirm: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setPending(true)
        resetPassword(values.email, values.password, values.password_confirm, values.token, setError)
        .then(() => {
            navigate("/login")
        })
        .finally(() => setPending(false))
    }

    useEffect(() => {
        client.get(`auth/reset-password/${token}`)
        .then((response) => {
            form.setValue("email", response.data.email)
    
        })
    }, [])
    

    return (
        <>
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
            </CardHeader>
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
                                        <Input readOnly placeholder="Email" {...field} />
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
                        <FormField
                            control={form.control}
                            name="password_confirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Confirm Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={pending} variant="positive" type="submit">{ pending ? <Spinner /> : "Confirm Reset" }</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex gap-4 items-center justify-between">
            </CardFooter>
        </>
    )
}