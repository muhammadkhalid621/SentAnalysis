import React from 'react';
import { homeObjTwo } from '../../containers/Home/Data';
import Whyssk from '../../components/Whyssk';

function Features() {
  return (
    <>
      <Whyssk {...homeObjTwo} />
    </>
  );
}

export default Features;