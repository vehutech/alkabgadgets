import React from 'react'
import HeroSlider from './components/Hero'
import Shop from './components/Shop'
import MobileShop from './components/MobileNav'

const page = () => {
  return (
    <div>
      <MobileShop />
      <HeroSlider />
      <Shop />
    </div>
  )
}

export default page