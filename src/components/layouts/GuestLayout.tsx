import { Outlet } from "react-router-dom";
import { Card } from "../ui/card";

export function GuestLayout() {
  return (
    <>
        <Card className="w-full max-w-lg mx-auto my-12">
            <Outlet />
        </Card>
    </>
  );
}
