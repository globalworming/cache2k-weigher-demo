import React, {useEffect, useState} from 'react';
import './App.css';
import CurrentCacheEntries from "./components/display/currentCacheEntries/CurrentCacheEntries";
import Box from "@material-ui/core/Box";
import ClearCache from "./components/control/ClearCache";
import EvictionLog from "./components/display/evictionLog/EvictionLog";
import RequestAnimal from "./components/control/RequestAnimal";
import Statistics from "./components/display/statistics/Statistics";
import Capacity from "./components/control/Capacity";
import useGlobalState, {Actions} from "./state";
import WebsocketClient from "./WebsocketClient";

const Layout = () => {
  return <div className="App">
    <h1 style={{display: "inline"}}>Cache2k Demo</h1>
    <span>
      with spring boot and kotlin. Source on <a href="https://github.com/globalworming/cache2k-weigher-demo">GitHub</a>.
    </span>

    <CurrentCacheEntries/>
    <h2>controls</h2>
    <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
      <ClearCache/>
      <Capacity/>
    </Box>
    <RequestAnimal/>

    <EvictionLog/>
    <Statistics/>
  </div>
};

const App = () => {

  // init capacity
  const [capacity, setCapacity] = useGlobalState('capacity');
  useEffect(
      () => {
        if (capacity <= 0) Actions.requestCurrentCapacity().then(({limit}) => {
          setCapacity(limit);
        });
      }, [capacity, setCapacity]
  );

  // init exhibit
  const [init, setInit] = useState(false);
  const [, setAnimalExhibit] = useGlobalState('animalExhibit');

  useEffect(() => {
    if (init) return;
    Actions.requestCacheEntries()
        .then(data => setAnimalExhibit(data))
        .then(() => setInit(true));
  }, [init, setInit, setAnimalExhibit]);


  return (<>
        <WebsocketClient/>
        <Layout/>
      </>

  );
};

export default App;
