import Link from "next/link";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SetupRequired() {
  return (
    <div className="min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/admin"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to admin
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto">
          <CardContent className="pt-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-3">SEO API setup required</h1>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  The SEO Dashboard needs Google API credentials to pull live
                  data from Search Console, PageSpeed Insights and Chrome UX
                  Report. Set the following environment variables on the
                  server (Coolify → Application → Environment Variables):
                </p>

                <div className="space-y-4">
                  <Section
                    title="PageSpeed Insights + CrUX"
                    detail="Required for the lab + field performance data on the Overview tab."
                  >
                    <Var name="GOOGLE_API_KEY" desc="API key from Google Cloud (no scopes — public PSI/CrUX endpoints)" />
                  </Section>

                  <Section
                    title="Search Console (OAuth)"
                    detail="Required for the Search Performance tab and indexation data."
                  >
                    <Var name="GSC_OAUTH_CLIENT_ID" desc="oauth_client.json → installed.client_id" />
                    <Var name="GSC_OAUTH_CLIENT_SECRET" desc="oauth_client.json → installed.client_secret" />
                    <Var name="GSC_OAUTH_REFRESH_TOKEN" desc="oauth_token.json → refresh_token (long-lived)" />
                    <Var
                      name="GSC_DEFAULT_PROPERTY"
                      desc='Default: "sc-domain:archerinfotech.in"'
                    />
                  </Section>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm">
                  <p className="font-semibold text-amber-900 mb-1">
                    Heads up: OAuth app status
                  </p>
                  <p className="text-amber-800 leading-relaxed">
                    Per project memory, the OAuth app
                    (project <code className="text-xs">claude-seo-495610</code>) is
                    currently in <strong>Testing</strong> mode in Google
                    Cloud. Refresh tokens issued in Testing mode expire after
                    7 days. For unattended dashboard use, either move the OAuth
                    app to <strong>In Production</strong> status, or wire the
                    pre-provisioned service account
                    (<code className="text-xs">~/.config/claude-seo/service_account.json</code>) and
                    grant it Search Console access on the property.
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <Link href="/admin">
                    <Button variant="outline">Back to admin</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function Section({
  title,
  detail,
  children,
}: {
  title: string;
  detail: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{detail}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Var({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="font-mono text-xs">
      <code className="bg-background px-2 py-1 rounded border">{name}</code>
      <span className="ml-3 text-muted-foreground">— {desc}</span>
    </div>
  );
}
