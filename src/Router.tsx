import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/guest/Login";
import { GuestLayout } from "./components/layouts/GuestLayout";
import { AppLayout } from "./components/layouts/AppLayout";
import { Index } from "./pages/Index";
import { Dashboard } from "./pages/app/Dashboard";

export function Router() {
    return (
        <BrowserRouter>

                <Routes>
                    <Route path='/' element={<Index />} />

                    <Route path="app" element={<AppLayout />}>
                        <Route index element={<Dashboard />} />
                    </Route>

                    <Route element={<GuestLayout />}>
                        <Route path='/login' element={<Login />} />
                    </Route>
                </Routes>

        </BrowserRouter>
    )
}