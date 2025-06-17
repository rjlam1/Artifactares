// import React from 'react';
// import Banner from './Banner';
// import FeaturedArtifacts from './FeaturedArtifacts';
// import EvolutionTimeline from './EvolutionTimeline';
// import Discoverers from './Discoverers';
// import { Helmet } from 'react-helmet';

// const Home = () => {
//     return (
//          <div>
//             <Helmet>
//                 <title>ArtifactEra | Home</title>
//                 <meta name="description" content="Discover fascinating artifacts, their evolution timeline, and the discoverers who found them." />
//                 <meta property="og:title" content="Home | Your Site Name" />
//                 <meta property="og:description" content="Discover fascinating artifacts, their evolution timeline, and the discoverers who found them." />
//                 {/* Add any other meta tags you need */}
//             </Helmet>
            
//             <Banner></Banner>
//             <FeaturedArtifacts></FeaturedArtifacts>
//             <EvolutionTimeline></EvolutionTimeline>
//             <Discoverers></Discoverers>
//         </div>
//     );
// };

// export default Home;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import FeaturedArtifacts from './FeaturedArtifacts';
import EvolutionTimeline from './EvolutionTimeline';
import Discoverers from './Discoverers';

const Home = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">
      <Helmet>
        <title>ArtifactEra | Home</title>
        <meta name="description" content="Discover fascinating artifacts, their evolution timeline, and the discoverers who found them." />
        <meta property="og:title" content="Home | ArtifactEra" />
        <meta property="og:description" content="Discover fascinating artifacts, their evolution timeline, and the discoverers who found them." />
      </Helmet>
      
      {/* Main Content */}
      <main className="w-full">
        <Banner />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
          <FeaturedArtifacts />
          <EvolutionTimeline />
          <Discoverers />
        </div>
      </main>
    </div>
  );
};

export default Home;