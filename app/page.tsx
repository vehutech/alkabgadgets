import React from 'react'
import HeroSlider from './components/Hero'
import Shop from './components/Shop'
import MobileShop from './components/MobileNav'
// import { ThreeDMarqueeDemo } from './components/Marquee'
import { Testimonials } from './components/Testimonial'
import { ContactUs } from './components/ContactUs'
import { GoogleMap } from './components/FindUs'
// import { PhoneSlider } from './components/Slider'

const page = () => {
  return (
    <div>
      <MobileShop />
      {/* <PhoneSlider /> */}
      {/* <ThreeDMarqueeDemo /> */}
      <HeroSlider />
      <Shop />
      <Testimonials />
      <ContactUs />
      <GoogleMap embedUrl='https://maps.app.goo.gl/8zTYi4Mu1hzeW7c36?g_st=iwb'/>
    </div>
  )
}

export default page