import { useAuth } from "@/lib/hooks/useAuth";
import { PropsWithChildren, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon, Settings, Sidebar, Users } from "lucide-react";
import { Input } from "../ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

export type AdminDashboardProps = {
    title: string,
    current?: string,
    breadcrumbs?: { label: string; to?: string }[],
}

export function AdminLayout({ children, title, current, breadcrumbs }: PropsWithChildren<AdminDashboardProps>) {

    const navigate = useNavigate()

    const [user, setUser] = useState<any | null>(null)

    const { getAuthenticatedUser, logout } = useAuth()

    useEffect(() => {
        getAuthenticatedUser()
            .then((response) => setUser(response.data))
            .catch(() => {
                navigate("/login")
            })
    }, [])

    const onLogout = () => {
        logout().then(() => navigate("/login"))
    }

    return (
        <>
            <div className="overflow-hidden flex">
                <nav className="w-14 hidden md:flex flex-col justify-between items-center h-dvh shadow-md">
                    <div className="flex flex-col gap-4 pt-4">
                        <Link to='/admin' className={`rounded-lg w-10 h-10 flex items-center justify-center ${current == 'dashboard' && 'bg-slate-300'} hover:bg-slate-700 hover:text-white`}>
                            <HomeIcon />
                        </Link>
                        <Link to='/admin/users' className={`rounded-lg w-10 h-10 flex items-center justify-center ${current == 'users' && 'bg-slate-300'} hover:bg-slate-700 hover:text-white`}>
                            <Users />
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4 pb-4">
                        <Link to='/admin/settings' className={`rounded-lg w-10 h-10 flex items-center justify-center ${current == 'settings' && 'bg-slate-300'} hover:bg-slate-700 hover:text-white`}>
                            <Settings />
                        </Link>
                    </div>
                </nav>
                <div className="flex-1 flex flex-col h-dvh">
                    <header className="w-full flex justify-between items-center gap-2 py-2 px-4 shadow-sm">
                        <div className="w-full">
                            <Sheet>
                                <SheetTrigger className="md:hidden"><Sidebar /></SheetTrigger>
                                <SheetContent className="md:hidden py-12" side='left'>
                                    <Link to='/admin' className={`rounded-lg flex items-center p-2 ${current == 'dashboard' && 'bg-slate-300'} hover:bg-slate-700 hover:text-white`}>
                                        <HomeIcon />
                                        <Label>Dashboard</Label>
                                    </Link>
                                    <Link to='/admin/users' className={`rounded-lg flex items-center p-2 ${current == 'users' && 'bg-slate-300'} hover:bg-slate-700 hover:text-white`}>
                                        <Users />
                                        <Label>Users</Label>
                                    </Link>
                                    <Link to='/admin/settings' className={`rounded-lg flex items-center p-2 ${current == 'settings' && 'bg-slate-300'} hover:bg-slate-700 hover:text-white`}>
                                        <Settings />
                                        <Label>Settings</Label>
                                    </Link>
                                </SheetContent>
                            </Sheet>
                            <div className="text-2xl font-semibold">{import.meta.env.VITE_APP_NAME} - {title}</div>
                        </div>
                        <div className="w-full flex justify-end items-center gap-4">
                            <Input placeholder="Search" className="max-w-xs" />
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <div className="rounded-full w-10 h-10 flex items-center justify-center bg-primary text-white text-2xl">{(user?.name as string)?.charAt(0)}</div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>My Profile</DropdownMenuItem>
                                        <DropdownMenuItem>My Settings</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 overflow-auto w-full">
                        <div className="p-4">
                            <div>
                                <Breadcrumb>
                                    <BreadcrumbList>
                                    {
                                        breadcrumbs?.map((item, index) => {
                                            return (
                                                <>
                                                    <BreadcrumbItem key={index}>
                                                        {
                                                            item?.to
                                                            ?
                                                            <BreadcrumbLink href={item.to}>{item.label}</BreadcrumbLink>
                                                            : 
                                                            <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                                        }
                                                    </BreadcrumbItem>
                                                    {
                                                        index < breadcrumbs?.length -1 && <BreadcrumbSeparator />
                                                    }
                                                </>
                                        )})
                                    }
                                        {/* <BreadcrumbItem>
                                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                                        </BreadcrumbItem> */}
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <div className="my-8">
                                {children}
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