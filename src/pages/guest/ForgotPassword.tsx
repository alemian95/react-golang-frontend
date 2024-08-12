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

export function ForgotPassword() {

    const { forgotPassword } = useAuth()

    const navigate = useNavigate()

    const [ error, setError ] = useState<string | null>(null)
    const [ pending, setPending ] = useState<boolean>(false)

    const formSchema = z.object({
        email: z.string().email({ message: "Invalid email" }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setPending(true)
        forgotPassword(values.email, setError)
        .then(() => {
            navigate("/login")
        })
        .finally(() => setPending(false))
    }
    

    return (
        <>
            <CardHeader>
                <CardTitle>Register</CardTitle>
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
                                        <Input placeholder="Email" {...field} />
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
                <Link to="/login" className="text-sm text-slate-500">Remember your password?</Link>
            </CardFooter>
        </>
    )
}