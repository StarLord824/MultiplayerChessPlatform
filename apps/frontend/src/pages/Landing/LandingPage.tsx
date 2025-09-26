import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";

export default function LandingPage() {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <HeroSection navigate={navigate} />
    </div>
  );
}