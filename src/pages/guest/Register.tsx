import { GuestLayout } from "@/components/layouts/GuestLayout"
import { Spinner } from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/hooks/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"

export function Register() {

    const { register } = useAuth()

    const navigate = useNavigate()

    const [ error, setError ] = useState<string | null>(null)
    const [ pending, setPending ] = useState<boolean>(false)

    const formSchema = z.object({
        name: z.string(),
        email: z.string().email({ message: "Invalid email" }),
        password: z.string(),
        password_confirm: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirm: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setPending(true)
        register(values.name, values.email, values.password, values.password_confirm, setError)
        .then(() => {
            navigate("/login")
        })
        .finally(() => setPending(false))
    }
    

    return (
        <GuestLayout title="Register">
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <Button disabled={pending} variant="positive" type="submit">{ pending ? <Spinner /> : "Register" }</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex gap-4 items-center justify-between">
                <Link to="/login" className="text-sm text-slate-500">Already have an account?</Link>
            </CardFooter>
        </GuestLayout>
    )
}