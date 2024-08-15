import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/guest/Login";
import { Index } from "./pages/Index";
import { Dashboard } from "./pages/app/Dashboard";
import { Register } from "./pages/guest/Register";
import { ForgotPassword } from "./pages/guest/ForgotPassword";
import { ResetPassword } from "./pages/guest/ResetPassword";
import { AdminDashboard } from "./pages/admin/AdminDashboard";

export function Router() {
    return (
        <BrowserRouter>

                <Routes>
                    <Route path='/' element={<Index />} />

                    <Route path="app">
                        <Route index element={<Dashboard />} />
                    </Route>

                    <Route path="admin">
                        <Route index element={<AdminDashboard />} />
                    </Route>

                    <Route>
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                    </Route>
                </Routes>

        </BrowserRouter>
    )
}