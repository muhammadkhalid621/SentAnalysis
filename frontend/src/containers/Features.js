import React from 'react';
import { homeObjTwo} from './Data';
import Whyssk from '../components/Whyssk';

function Features() {
  return (
    <>
      <Whyssk {...homeObjTwo} />
    </>
  );
}

export default Features;