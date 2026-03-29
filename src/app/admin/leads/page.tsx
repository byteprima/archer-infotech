import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Download, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isAuthenticated } from "@/lib/auth";

// Mock data for leads (will be replaced with database query)
const mockLeads = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    courseInterest: "Java Full Stack",
    message: "I want to learn Java Full Stack development",
    source: "contact_form",
    status: "new",
    createdAt: new Date("2024-03-15"),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "9876543211",
    courseInterest: "Python",
    message: "Interested in Python course",
    source: "whatsapp",
    status: "contacted",
    createdAt: new Date("2024-03-14"),
  },
];

const statusColors: Record<string, string> = {
  new: "bg-green-100 text-green-800",
  contacted: "bg-blue-100 text-blue-800",
  qualified: "bg-purple-100 text-purple-800",
  converted: "bg-yellow-100 text-yellow-800",
  closed: "bg-gray-100 text-gray-800",
};

export default async function AdminLeadsPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  // TODO: Fetch from database
  const leads = mockLeads;

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
              <h1 className="text-xl font-bold">Leads Management</h1>
              <p className="text-sm text-muted-foreground">
                {leads.length} total leads
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <select className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
              <select className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">All Sources</option>
                <option value="contact_form">Contact Form</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="popup">Popup</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            {leads.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No leads found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Leads will appear here when visitors submit the contact form
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Contact</th>
                      <th className="pb-3 font-medium">Course</th>
                      <th className="pb-3 font-medium">Source</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b last:border-0">
                        <td className="py-4">
                          <div className="font-medium">{lead.name}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-sm">{lead.email}</div>
                          <div className="text-sm text-muted-foreground">
                            {lead.phone}
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="text-sm">{lead.courseInterest || "-"}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-sm capitalize">
                            {lead.source?.replace("_", " ") || "-"}
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge className={statusColors[lead.status] || ""}>
                            {lead.status}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <div className="text-sm text-muted-foreground">
                            {lead.createdAt.toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-4">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Database Status */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> This is showing mock data. Connect a PostgreSQL
            database to see real leads from the contact form.
          </p>
        </div>
      </main>
    </div>
  );
}
