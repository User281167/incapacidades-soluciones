import {
  backgroundGradient,
  container,
  sectionTitle,
  title,
} from "@/components/primitives";
import { policyItems } from "@/app/legal/policy/policy-items";
import MainLayout from "@/layouts/main-layout";

export default function PolicyPage() {
  return (
    <MainLayout>
      <header className={backgroundGradient()}>
        <div className="max-w-2xl space-y-6 block">
          <h1 className={title()}>Política y tratamiento de datos</h1>
        </div>
      </header>

      <article className={container()}>
        {policyItems.map((section, index) => (
          <section
            key={index}
            className="flex flex-col gap-4 md:gap-6 mb-6 md:mb-8"
          >
            <h2 className={sectionTitle()}>
              {index + 1}. {section.title}
            </h2>

            <ul className="list-disc list-inside">
              {section.descriptions.map((description, index) => (
                <li key={index}>{description}</li>
              ))}
            </ul>
          </section>
        ))}
      </article>
    </MainLayout>
  );
}
