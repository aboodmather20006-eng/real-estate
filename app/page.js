import Amenities from "./components/Amenities";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import PropertyOverview from "./components/PropertyOverview";
import ScrollVideo from "./components/ScrollVideo";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <ScrollVideo />
        <PropertyOverview />
        <Gallery />
        <Amenities />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
