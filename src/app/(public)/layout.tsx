import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { FirebaseClientProvider } from "@/firebase";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </FirebaseClientProvider>
  );
}
