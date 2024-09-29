// "use client"
import AboutCoalManagementIndia from "@/components/Home";
import AboutSection from "../_components/AboutSection";
import FooterSection from "../_components/FooterSection";
import HeroSection from "../_components/HeroSection";
import HowItWorksSection from "../_components/HowItWorksSection";
import ImpactSection from "../_components/ImpactSection";
import IntroductionSection from "../_components/IntroductionSection";
import KeyFeaturesSection from "../_components/KeyFeaturesSection";
import Navbar from "../_components/Navbar";
import AnimatedDiv from "@/components/animated_div";
import CalculateYourEmissions from "../_components/CalculateYourEmissions";
import Rahul from "../rahul/page";
import Image from "next/image";
import down from "../../public/down.svg"
import earth from "../../public/earth.jpg"
import { MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";



export default function Home() {

  return (
    // <AnimatedDiv>
    <div className="flex flex-col justify-between h-screen ">
      <div className="flex flex-col">

        <HeroSection />
        <div className="flex gap-3 mb8">
          <div className="text-3xl m-4  rounded-xl p-5">
            <div>

              The Earth is in dire straits, and it is up to us to ensure the planet remains the way we’d like it to be. Welcome to NeutralMINE, a platform dedicated to helping you track emissions and reduce pollution. Together, we can take the necessary steps toward a cleaner, more sustainable future for generations to come.
            </div>
            <div>
              <Button className="mt-8 text-2xl p-6  bg-red-500 rounded-xl"><a href="https://earth.jpl.nasa.gov/emit-mmgis-lb/?mission=EMIT&site=ert&mapLon=-104.0122836828232&mapLat=32.333375375801985&mapZoom=11&globeLon=17.000000000000043&globeLat=21.000000000000004&globeZoom=4&globeCamera=8.999950965298202,-2500000,8.999955825565864,0,1,0&panePercents=0,100,0&on=aca23417-23e8-4f6f-8a33-dead55306689$1.00,3e6ae49d-8273-4b4a-80e7-158ad6efa95e$1.00,9dd99035-8bc0-41d2-a341-e87939aeb96d$1.00&viewerImg=0">Live Emission Tracker</a></Button>
            </div>
            <div className="text-red-500 mt-11">
              LET'S GO NET ZERO AND SAVE EARTH
            </div>
            <div className="mt-20">
              OUR REPORTS <MoveDown className="inline" />
            </div>
            {/* <Image src={down} width={100} /> */}
          </div>
          <div className="rounded-xl overflow-clip m-5">

            <Image src={earth} />
          </div>
        </div>
        <Rahul />
        <FooterSection />
        {/* <CalculateYourEmissions direction="end" />
        <CalculateYourEmissions /> */}
      </div>
      {/* 
      <KeyFeaturesSection />
      <ImpactSection />
      <HowItWorksSection />   
      <AboutSection />*/}
    </div>
    // </AnimatedDiv>
  );
}
