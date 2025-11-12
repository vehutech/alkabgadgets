import React from 'react'
// import HeroSlider from './components/Hero'
import Shop from './components/Shop'
import MobileShop from './components/MobileNav'
import { ThreeDMarqueeDemo } from './components/Marquee'

const page = () => {
  return (
    <div>
      <MobileShop />
      <ThreeDMarqueeDemo />
      {/* <HeroSlider /> */}
      <Shop />
    </div>
  )
}

export default page