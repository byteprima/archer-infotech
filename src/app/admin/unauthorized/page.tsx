import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminUnauthorizedPage() {
  return (
    <div className="container mx-auto flex min-h-screen max-w-2xl items-center px-4 py-12">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <ShieldAlert className="h-7 w-7 text-red-600" />
          </div>
          <CardTitle className="mt-4 text-2xl">Admin Access Required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Your account is signed in, but it does not have permission to open the admin panel.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/">
              <Button variant="outline">Back to Site</Button>
            </Link>
            <Link href="/admin/login">
              <Button>Switch Account</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
