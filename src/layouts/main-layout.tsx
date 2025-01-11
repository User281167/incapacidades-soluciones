import { Navbar } from "@/components/menu/navbar";
import Footer from "@/components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="relative flex flex-col min-h-[70vh]">{children}</main>
      <Footer />
    </>
  );
}
