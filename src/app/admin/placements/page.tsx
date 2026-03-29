import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Plus, Building, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { isAuthenticated } from "@/lib/auth";

// Mock data for placements (will be replaced with database query)
const mockPlacements = [
  {
    id: 1,
    studentName: "Amit Sharma",
    company: "Tech Mahindra",
    designation: "Java Developer",
    package: "8 LPA",
    courseTaken: "Java Full Stack",
    batchYear: 2024,
    isHighlighted: true,
    isPublished: true,
  },
  {
    id: 2,
    studentName: "Priya Patel",
    company: "Infosys",
    designation: "Full Stack Developer",
    package: "7.5 LPA",
    courseTaken: "MERN Stack",
    batchYear: 2024,
    isHighlighted: false,
    isPublished: true,
  },
  {
    id: 3,
    studentName: "Rahul Kumar",
    company: "TCS",
    designation: "DevOps Engineer",
    package: "9 LPA",
    courseTaken: "DevOps Engineering",
    batchYear: 2023,
    isHighlighted: true,
    isPublished: true,
  },
];

export default async function AdminPlacementsPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  // TODO: Fetch from database
  const placements = mockPlacements;

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
              <h1 className="text-xl font-bold">Placements Management</h1>
              <p className="text-sm text-muted-foreground">
                {placements.length} placement records
              </p>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Placement
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Placements Table */}
        <Card>
          <CardHeader>
            <CardTitle>Placement Records</CardTitle>
          </CardHeader>
          <CardContent>
            {placements.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No placement records found</p>
                <Button size="sm" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Placement
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Student</th>
                      <th className="pb-3 font-medium">Company</th>
                      <th className="pb-3 font-medium">Designation</th>
                      <th className="pb-3 font-medium">Package</th>
                      <th className="pb-3 font-medium">Course</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {placements.map((placement) => (
                      <tr key={placement.id} className="border-b last:border-0">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {placement.studentName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {placement.studentName}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Batch {placement.batchYear}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span>{placement.company}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span>{placement.designation}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge variant="outline">{placement.package}</Badge>
                        </td>
                        <td className="py-4">
                          <span className="text-sm">{placement.courseTaken}</span>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            {placement.isHighlighted && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                Highlighted
                              </Badge>
                            )}
                            <Badge
                              className={
                                placement.isPublished
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {placement.isPublished ? "Published" : "Draft"}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Delete
                            </Button>
                          </div>
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
            database to manage real placement records.
          </p>
        </div>
      </main>
    </div>
  );
}
