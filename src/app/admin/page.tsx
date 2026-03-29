import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Calendar,
  Award,
  FileText,
  MessageSquare,
  TrendingUp,
  LogOut,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/lib/auth";

async function getStats() {
  // For now, return mock stats
  // TODO: Fetch from database when connected
  return {
    leads: { total: 0, new: 0 },
    batches: { total: 0, upcoming: 0 },
    placements: { total: 0 },
    testimonials: { total: 0 },
  };
}

export default async function AdminDashboard() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const stats = await getStats();

  const menuItems = [
    {
      title: "Leads",
      description: "Manage enquiries and leads",
      href: "/admin/leads",
      icon: Users,
      stats: `${stats.leads.total} total, ${stats.leads.new} new`,
    },
    {
      title: "Batches",
      description: "Manage course batches",
      href: "/admin/batches",
      icon: Calendar,
      stats: `${stats.batches.total} total, ${stats.batches.upcoming} upcoming`,
    },
    {
      title: "Placements",
      description: "Manage placement records",
      href: "/admin/placements",
      icon: Award,
      stats: `${stats.placements.total} records`,
    },
    {
      title: "Testimonials",
      description: "Manage student testimonials",
      href: "/admin/testimonials",
      icon: MessageSquare,
      stats: `${stats.testimonials.total} reviews`,
    },
    {
      title: "Blog Posts",
      description: "Manage blog content",
      href: "/admin/blog",
      icon: FileText,
      stats: "Coming soon",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Archer Infotech Admin</h1>
            <p className="text-sm text-muted-foreground">Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              View Site
            </Link>
            <form action="/api/admin/logout" method="POST">
              <Button variant="outline" size="sm" type="submit">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.leads.total}</p>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.leads.new}</p>
                  <p className="text-sm text-muted-foreground">New Leads</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.batches.upcoming}</p>
                  <p className="text-sm text-muted-foreground">Upcoming Batches</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.placements.total}</p>
                  <p className="text-sm text-muted-foreground">Placements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <h2 className="text-lg font-semibold mb-4">Management</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <Link key={item.title} href={item.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.stats}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Database Status */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-yellow-600" />
            <p className="font-medium text-yellow-800">Database Not Connected</p>
          </div>
          <p className="text-sm text-yellow-700 mt-1">
            To enable full functionality, set up a PostgreSQL database and add the
            DATABASE_URL environment variable. Run <code className="bg-yellow-100 px-1 rounded">npm run db:push</code> to
            create the tables.
          </p>
        </div>
      </main>
    </div>
  );
}
