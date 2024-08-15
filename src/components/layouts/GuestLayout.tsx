import { Card, CardHeader, CardTitle } from "../ui/card";
import { PropsWithChildren } from "react";

export type GuestLayoutProps = {
  title: string
};

export function GuestLayout({ children, title } : PropsWithChildren<GuestLayoutProps>) {
  return (
    <>
        <Card className="w-full max-w-lg mx-auto my-12">
          <CardHeader>
              <CardTitle>{ title }</CardTitle>
          </CardHeader>
          { children }
        </Card>
    </>
  );
}
