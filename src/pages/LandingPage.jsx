import { Link } from "react-router-dom";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { NavBar } from "../components/NavBar";
import { HeroSection } from "../components/landingPage/HeroSection";
import { Benefits } from "../components/landingPage/Benefits";
import { Steps } from "../components/landingPage/Steps";
import { Testimonials } from "../components/landingPage/Testimonials";
import { Footer } from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <HeroSection />

      {/* Benefits */}
      <Benefits />

      {/* How It Works */}
      <Steps />

      {/* Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
}
