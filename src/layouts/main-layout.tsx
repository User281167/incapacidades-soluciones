import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="relative flex flex-col min-h-[70vh] bg-main-white dark:bg-neutral-900">
        {children}
      </main>
      <Footer />
    </>
  );
}
