import {
  Users,
  Briefcase,
  FolderOpen,
  Clock,
  BookOpen,
  Infinity,
} from "lucide-react";
import { siteConfig } from "@/data/site-config";

const iconMap: Record<string, React.ElementType> = {
  Users,
  Briefcase,
  FolderOpen,
  Clock,
  BookOpen,
  Infinity,
};

export function USPSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">Archer Infotech?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We are committed to providing the best IT training with a focus on
            practical learning and career success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.usps.map((usp) => {
            const Icon = iconMap[usp.icon] || Users;
            return (
              <div
                key={usp.title}
                className="group bg-card border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/20"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{usp.title}</h3>
                    <p className="text-muted-foreground text-sm">{usp.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
