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
  CheckCircle,
  Shield,
  ClipboardList,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireAdminPage } from "@/lib/admin";

async function getStats() {
  try {
    const { db } = await import("@/db");
    const { leads, batches, placements, testimonials, blogPosts, user, auditLogs } =
      await import("@/db/schema");
    const { count, eq } = await import("drizzle-orm");

    const [
      totalLeads,
      newLeads,
      totalBatches,
      upcomingBatches,
      totalPlacements,
      totalTestimonials,
      totalBlogPosts,
      publishedBlogPosts,
      totalUsers,
      totalAdmins,
      totalAuditLogs,
    ] = await Promise.all([
      db.select({ count: count() }).from(leads),
      db.select({ count: count() }).from(leads).where(eq(leads.status, "new")),
      db.select({ count: count() }).from(batches),
      db.select({ count: count() }).from(batches).where(eq(batches.status, "upcoming")),
      db.select({ count: count() }).from(placements),
      db.select({ count: count() }).from(testimonials),
      db.select({ count: count() }).from(blogPosts),
      db.select({ count: count() }).from(blogPosts).where(eq(blogPosts.isPublished, true)),
      db.select({ count: count() }).from(user),
      db.select({ count: count() }).from(user).where(eq(user.role, "admin")),
      db.select({ count: count() }).from(auditLogs),
    ]);

    return {
      connected: true,
      leads: { total: totalLeads[0].count, new: newLeads[0].count },
      batches: { total: totalBatches[0].count, upcoming: upcomingBatches[0].count },
      placements: { total: totalPlacements[0].count },
      testimonials: { total: totalTestimonials[0].count },
      blogPosts: { total: totalBlogPosts[0].count, published: publishedBlogPosts[0].count },
      users: { total: totalUsers[0].count, admins: totalAdmins[0].count },
      auditLogs: { total: totalAuditLogs[0].count },
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      connected: false,
      leads: { total: 0, new: 0 },
      batches: { total: 0, upcoming: 0 },
      placements: { total: 0 },
      testimonials: { total: 0 },
      blogPosts: { total: 0, published: 0 },
      users: { total: 0, admins: 0 },
      auditLogs: { total: 0 },
    };
  }
}

export default async function AdminDashboard() {
  await requireAdminPage();

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
      stats: `${stats.blogPosts.total} posts, ${stats.blogPosts.published} published`,
    },
    {
      title: "Users",
      description: "Manage admin access and roles",
      href: "/admin/users",
      icon: Shield,
      stats: `${stats.users.total} users, ${stats.users.admins} admins`,
    },
    {
      title: "Audit Logs",
      description: "Review recent admin activity",
      href: "/admin/audit-logs",
      icon: ClipboardList,
      stats: `${stats.auditLogs.total} entries`,
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
        {stats.connected ? (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="font-medium text-green-800">Database Connected (SQLite)</p>
            </div>
            <p className="text-sm text-green-700 mt-1">
              All systems operational. Database is ready for use.
            </p>
          </div>
        ) : (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-yellow-600" />
              <p className="font-medium text-yellow-800">Database Not Connected</p>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              Set the DATABASE_URL environment variable (e.g., <code className="bg-yellow-100 px-1 rounded">./sqlite.db</code>).
              Run <code className="bg-yellow-100 px-1 rounded">npm run db:push</code> to create the tables.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
