import React from 'react';
import HeroSection from '../../components/HeroSection';
import Whyssk from '../../components/Whyssk';
import { homeObjOne, homeObjTwo} from './Data';
import AllServices from '../../components/AllServices';

function Home() {
  return (
    <>
      <HeroSection {...homeObjOne} />
      <Whyssk {...homeObjTwo} />
      <AllServices />
    </>
  );
}

export default Home;