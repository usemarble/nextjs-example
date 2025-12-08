import Footer from "@/components/footer";
import Header from "@/components/header";

function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default SiteLayout;
