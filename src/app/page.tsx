import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CombatRecord from "@/components/CombatRecord";
import Vault from "@/components/Vault";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CombatRecord />
        <Vault />
        <Achievements />
      </main>
      <Footer />
    </>
  );
}
