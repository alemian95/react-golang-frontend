import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect } from "react";
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

    return (
        <>
            <Button onClick={onLogout} type="button" variant="destructive">Logout</Button>
            <div>
                <Outlet />
            </div>
        </>
    )
}