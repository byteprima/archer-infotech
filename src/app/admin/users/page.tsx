import Link from "next/link";
import { ChevronLeft, Shield, UserRound } from "lucide-react";
import { desc, count, eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/db";
import { session, user } from "@/db/schema";
import { requireAdminPage } from "@/lib/admin";
import { UserRoleButton } from "./actions";

export default async function AdminUsersPage() {
  const actor = await requireAdminPage();

  const users = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      createdAt: user.createdAt,
    })
    .from(user)
    .orderBy(desc(user.createdAt));

  const sessionCounts = await db
    .select({
      userId: session.userId,
      count: count(),
    })
    .from(session)
    .groupBy(session.userId);

  const sessionsByUser = new Map(sessionCounts.map((entry) => [entry.userId, entry.count]));
  const adminCountResult = await db
    .select({ count: count() })
    .from(user)
    .where(eq(user.role, "admin"));
  const adminCount = adminCountResult[0]?.count ?? 0;

  return (
    <div className="min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-2 flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold">User Management</h1>
              <p className="text-sm text-muted-foreground">
                {users.length} users, {adminCount} admins
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">User</th>
                      <th className="pb-3 font-medium">Role</th>
                      <th className="pb-3 font-medium">Sessions</th>
                      <th className="pb-3 font-medium">Created</th>
                      <th className="pb-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((entry) => {
                      const initials = entry.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase();

                      return (
                        <tr key={entry.id} className="border-b last:border-0">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={entry.image || undefined} alt={entry.name} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  {initials || <UserRound className="h-4 w-4" />}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{entry.name}</div>
                                <div className="text-sm text-muted-foreground">{entry.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <Badge
                              className={
                                entry.role === "admin"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              <Shield className="mr-1 h-3 w-3" />
                              {entry.role}
                            </Badge>
                          </td>
                          <td className="py-4 text-sm text-muted-foreground">
                            {sessionsByUser.get(entry.id) ?? 0} active
                          </td>
                          <td className="py-4 text-sm text-muted-foreground">
                            {new Date(entry.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 text-right">
                            <UserRoleButton
                              userId={entry.id}
                              userEmail={entry.email}
                              currentRole={entry.role === "admin" ? "admin" : "user"}
                              isCurrentAdmin={actor.actorId === entry.id}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
