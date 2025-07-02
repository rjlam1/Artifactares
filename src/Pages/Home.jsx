import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import FeaturedArtifacts from './FeaturedArtifacts';
import EvolutionTimeline from './EvolutionTimeline';
import Discoverers from './Discoverers';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden ">
      <Helmet>
        <title>ArtifactEra | Home</title>
        <meta name="description" content="Discover fascinating artifacts, their evolution timeline, and the discoverers who found them." />
        <meta property="og:title" content="Home | ArtifactEra" />
        <meta property="og:description" content="Discover fascinating artifacts, their evolution timeline, and the discoverers who found them." />
      </Helmet>
      
      
      <main className="">
        <Banner />
        
        <div className=" mx-auto ">
          <FeaturedArtifacts />
          <EvolutionTimeline />
          <Discoverers />
          <WhyChooseUs></WhyChooseUs>
        </div>
      </main>
    </div>
  );
};

export default Home;