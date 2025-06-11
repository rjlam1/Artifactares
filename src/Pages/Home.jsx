import React from 'react';
import Banner from './Banner';
import FeaturedArtifacts from './FeaturedArtifacts';
import EvolutionTimeline from './EvolutionTimeline';
import Discoverers from './Discoverers';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <FeaturedArtifacts></FeaturedArtifacts>
           <EvolutionTimeline></EvolutionTimeline>
           <Discoverers></Discoverers>
        </div>
    );
};

export default Home;