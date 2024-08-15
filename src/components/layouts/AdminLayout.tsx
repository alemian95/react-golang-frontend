import { useAuth } from "@/lib/hooks/useAuth";
import { PropsWithChildren, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardTitle } from "../ui/card";
import { HomeIcon, Settings,  Users } from "lucide-react";
import { Input } from "../ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

export type AdminDashboardProps = {
    title: string,
    current?: string
}

export function AdminLayout({ children, title, current } : PropsWithChildren<AdminDashboardProps>) {

    const navigate = useNavigate()

    const { getAuthenticatedUser, logout } = useAuth()

    useEffect(() => {
        getAuthenticatedUser().catch(() => {
            navigate("/login")
        })
    })

    const onLogout = () => {
        logout().then(() => navigate("/login"))
    }

    return (
        <>
            <div className="overflow-hidden flex">
                <nav className="w-14 hidden md:flex flex-col justify-between items-center h-dvh shadow-md">
                    <div className="flex flex-col gap-4 pt-4">
                        <Link to='/admin' className="rounded-lg w-10 h-10 flex items-center justify-center hover:bg-slate-700 hover:text-white">
                            <HomeIcon />
                        </Link>
                        <Link to='/admin/users' className="rounded-lg w-10 h-10 flex items-center justify-center hover:bg-slate-700 hover:text-white">
                            <Users />
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4 pb-4">
                        <Link to='/admin/settings' className="rounded-lg w-10 h-10 flex items-center justify-center hover:bg-slate-700 hover:text-white">
                            <Settings />
                        </Link>
                    </div>
                </nav>
                <div className="flex-1 flex flex-col h-dvh">
                    <header className="w-full flex justify-between items-center gap-2 p-2 shadow-sm">
                        <div>
                            <Sheet>
                                <SheetTrigger className="md:hidden">Open</SheetTrigger>
                                <SheetContent className="md:hidden" side='left'>
                                    <SheetHeader>
                                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                                    <SheetDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </SheetDescription>
                                    </SheetHeader>
                                    <div>
                                        this is the content
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                        <div className="w-full flex justify-end">
                            <Input className="max-w-xs" />
                        </div>
                    </header>
                    <main className="flex-1 overflow-auto w-full">
                        <div className="p-4">
                            <CardTitle>{ title }</CardTitle>
                            <div className="my-8">
                                { children }
                            </div>
                        </div>
                    </main>
                    {/* <footer className="w-full text-center text-sm text-slate-700">
                        <span>&copy;{ new Date().getFullYear() }</span>
                    </footer> */}
                </div>
            </div>
        </>
    )
}