import { getHiringPartners } from "@/data/companies";

export function CompaniesSection() {
  const companies = getHiringPartners();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Students Work At <span className="text-primary">Top Companies</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our alumni are working at leading IT companies across India and abroad.
            Join us to be part of this success story.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {companies.slice(0, 12).map((company) => (
            <div
              key={company.id}
              className="bg-white border border-border rounded-lg p-4 flex items-center justify-center h-20 hover:shadow-md hover:border-primary/30 transition-all"
            >
              <span className="font-semibold text-sm text-center text-foreground/80 hover:text-primary transition-colors">
                {company.name}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            And many more companies...{" "}
            <span className="font-semibold text-primary">100+ Corporate Partners</span>
          </p>
        </div>
      </div>
    </section>
  );
}
