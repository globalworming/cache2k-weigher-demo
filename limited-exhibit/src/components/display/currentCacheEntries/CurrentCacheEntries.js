import Box from "@material-ui/core/Box";
import React from "react";
import PlaceForAnimals from "./PlaceThatCanHoldAnimals";
import useGlobalState from "../../../state"


const CurrentCacheEntries = () => {

  const [animalExhibit] = useGlobalState('animalExhibit');
  const [capacity] = useGlobalState('capacity');

  if (capacity < 1) return null;

  const sum = animalExhibit.length === 0 ? 0 : animalExhibit.map(animal => animal.size).reduce((k, l) => k + l);
  return <section>
    <h2>exhibition</h2>
    <div>shows a cache limited by maximum weight instead of number of entries. CacheEntryOperationListeners send websocket messages notify on changes</div>
    <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} justifyContent="flex-start">
      {animalExhibit.map(animal =>
          <React.Fragment key={animal.name}>
            <PlaceForAnimals key={animal.name + animal.size} animal={animal} showsName/>
            {Array.apply(null, {length: animal.size - 1}).map((_, i) => (
                <PlaceForAnimals key={`${animal.name}${animal.size}${i}`} animal={animal}/>
            ))}
          </React.Fragment>)}
      {Array.apply(null, {length: capacity - sum}).map((_, i) => (
          <PlaceForAnimals key={i}/>
      ))}
      {Array.apply(null, {length: sum > capacity ? 10 - Math.abs(capacity - sum) : 10}).map((_, i) => (
          <PlaceForAnimals key={i} overflow/>
      ))}
    </Box>
    {sum > capacity ? <div>overflow is ok, can't be more than the biggest entry</div> : <span><span role="img" aria-label={"overflow"}>❌</span> marks the spot where overflow can happen</span>}
  </section>
};
export default CurrentCacheEntries