import Link from "next/link";
import { ChevronLeft, Plus, Award, CheckCircle2, CircleOff, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlacementAdminActions } from "@/components/admin/placement-admin-actions";
import { getAllPlacements } from "@/lib/actions/placements";
import { requireAdminPage } from "@/lib/admin";

export default async function AdminPlacementsPage() {
  await requireAdminPage();

  const { placements, totalCount, publishedCount, draftCount, highlightedCount } =
    await getAllPlacements();

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
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
              <h1 className="text-xl font-bold">Placements Management</h1>
              <p className="text-sm text-muted-foreground">
                Manage student placement records, highlight featured wins, and control visibility.
              </p>
            </div>
            <Link href="/admin/placements/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Placement
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{totalCount}</div>
              <p className="text-sm text-muted-foreground">Total placements</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{publishedCount}</div>
              <p className="text-sm text-muted-foreground">Published</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">{draftCount}</div>
              <p className="text-sm text-muted-foreground">Drafts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{highlightedCount}</div>
              <p className="text-sm text-muted-foreground">Highlighted</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Placement Records</CardTitle>
          </CardHeader>
          <CardContent>
            {placements.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Award className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No placement records found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add the first placement record to start showcasing student outcomes.
                </p>
                <Link href="/admin/placements/new" className="mt-4 inline-block">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Placement
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Student</th>
                      <th className="pb-3 font-medium">Role</th>
                      <th className="pb-3 font-medium">Package</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {placements.map((placement) => (
                      <tr key={placement.id} className="border-b last:border-0">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={placement.photoUrl || undefined}
                                alt={placement.studentName}
                              />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {placement.studentName
                                  .split(" ")
                                  .filter(Boolean)
                                  .map((part) => part[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{placement.studentName}</div>
                              <div className="text-sm text-muted-foreground">
                                {placement.company}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div>
                            <div className="font-medium">{placement.designation}</div>
                            <div className="text-sm text-muted-foreground">
                              {placement.courseTaken || "Course not set"}
                              {placement.batchYear ? ` • ${placement.batchYear}` : ""}
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge variant="outline">{placement.package || "N/A"}</Badge>
                        </td>
                        <td className="py-4">
                          <div className="flex flex-wrap gap-2">
                            {placement.isHighlighted ? (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Sparkles className="mr-1 h-3 w-3" />
                                Highlighted
                              </Badge>
                            ) : (
                              <Badge variant="outline">Standard</Badge>
                            )}
                            {placement.isPublished ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Published
                              </Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-800">
                                <CircleOff className="mr-1 h-3 w-3" />
                                Draft
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <PlacementAdminActions
                            id={placement.id}
                            studentName={placement.studentName}
                            isPublished={placement.isPublished ?? true}
                            isHighlighted={placement.isHighlighted ?? false}
                          />
                        </td>
                      </tr>
                    ))}
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
