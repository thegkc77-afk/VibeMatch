import CTABanner from "../Marketing/CTABannar"
import Features from "../Marketing/Fetures"
import Footer from "../Component/Footer"
import Hero from "../Marketing/Hero"
import Howitwork from "../Marketing/Howitwork"

function Home() {
  return (
    <>
    {/* HeroSection */}
    <Hero/>

    {/* Features */}
    <Features/>

    {/* How it work */}

    <Howitwork/>

    {/* CTABanner */}
    <CTABanner/>

    {/* Footer */}
    <Footer/>

    

    </>
  )
}

export default Home