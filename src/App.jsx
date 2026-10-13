import Header from './sections/Header'
import Hero from './sections/Hero'
import Inquiry from './sections/Inquiry'
import FeaturedCourses from './sections/FeaturedCourses'
import OtherCourses from './sections/OtherCourses'
import About from './sections/About'
import Vehicles from './sections/Vehicles'
import Program from './sections/Program'
import Footer, { Opening } from './sections/Footer'

export default function App() {
  return (
    <div id="top">
      <a href="#plan" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-3">
        본문으로 건너뛰기
      </a>
      <Header />
      <main>
        <Hero />
        <Inquiry />
        <FeaturedCourses />
        <OtherCourses />
        <About />
        <Vehicles />
        <Program />
        <Opening />
      </main>
      <Footer />
    </div>
  )
}
