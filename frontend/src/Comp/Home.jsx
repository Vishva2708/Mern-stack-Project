import React from 'react'
import Products from './Products';
import Poster from './Poster';
import Slider from './Slider';
import Collection from './Collection';
import Beauty from './Beauty'
const Home = () => {
  return (
    <div>
    <Slider/>
    <Products/>
    <Poster/>
    <Collection/>
    <Beauty/>

    </div>
  )
}

export default Home
