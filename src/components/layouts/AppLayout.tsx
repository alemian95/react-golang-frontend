import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export type LayoutProps = {}

export function AppLayout({}: LayoutProps) {

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

    const [ sidebarOpen, setSidebarOpen ]  = useState(false)

    return (
        <>
            <div className={`transition-all min-h-dvh flex flex-col justify-between bg-yellow-100 ${ sidebarOpen ? "ml-64" : "ml-0"} lg:ml-64`}>
                <header className="py-2 px-4 flex justify-between items-center">
                    <div>
                        <Button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>sidebar</Button>
                    </div>
                    <div>
                        <h1>AppName</h1>
                    </div>
                </header>
                <main className="py-2 px-4 flex-1">
                    <Button onClick={onLogout} type="button" variant="destructive">Logout</Button>
                    <div>
                        <Outlet />
                    </div>
                </main>
                <footer className="py-2 px-4">
                    footer
                </footer>
            </div>
            <aside className={`transition-all fixed top-0 ${ sidebarOpen ? "left-0" : "-left-full"} lg:left-0 w-64 h-screen bg-gray-500`}>
                aside
            </aside>
        </>
    )
}