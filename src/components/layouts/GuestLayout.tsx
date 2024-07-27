import { Outlet } from "react-router-dom";

export type LayoutProps = {};

export function GuestLayout({}: LayoutProps) {
  return (
    <>
        <div>
            <Outlet />
        </div>
    </>
  );
}
