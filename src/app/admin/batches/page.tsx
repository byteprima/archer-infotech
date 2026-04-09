import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Plus, Calendar, Users, MapPin, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isAuthenticated } from "@/lib/auth";
import { db } from "@/db";
import { batches as batchesTable } from "@/db/schema";
import { desc } from "drizzle-orm";

const statusColors: Record<string, string> = {
  upcoming: "bg-green-100 text-green-800",
  ongoing: "bg-blue-100 text-blue-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

export default async function AdminBatchesPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const batches = await db.select().from(batchesTable).orderBy(desc(batchesTable.startDate));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-2">
            <Link
              href="/admin"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Batch Management</h1>
              <p className="text-sm text-muted-foreground">
                {batches.length} total batches
              </p>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New Batch
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <select className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">All Modes</option>
                <option value="offline">Offline</option>
                <option value="online">Online</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Batches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {batches.map((batch) => (
            <Card key={batch.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{batch.courseName}</CardTitle>
                  <Badge className={statusColors[batch.status] || ""}>
                    {batch.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Starts: {new Date(batch.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-4 h-4 flex items-center justify-center text-primary">
                    ⏰
                  </span>
                  <span>{batch.timing}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {batch.mode === "offline" ? (
                    <MapPin className="h-4 w-4 text-primary" />
                  ) : (
                    <Monitor className="h-4 w-4 text-primary" />
                  )}
                  <span className="capitalize">{batch.mode}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span>
                    {batch.seatsAvailable} / {batch.totalSeats} seats available
                  </span>
                </div>
                <div className="pt-2">
                  <Badge variant="outline">{batch.duration}</Badge>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {batches.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No batches found</p>
              <Button size="sm" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create First Batch
              </Button>
            </CardContent>
          </Card>
        )}

      </main>
    </div>
  );
}
