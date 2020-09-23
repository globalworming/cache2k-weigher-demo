import React, {useEffect, useState} from "react";
import {colorFor} from "../../../model/Animal";
import {Cat, Elephant} from "../../image/AnimalEmojies";
import {makeStyles} from "@material-ui/core/styles"; // ES6

const useStyles = makeStyles({
  place: {
    transition: `border-radius 1.5s cubic-bezier(0, 2, 1, -1)`,
    position: "relative", textAlign: "center", flex: "0 0 70px",
    minHeight: "3em", overflow: "visible",
    borderLeft: props => props.showsName ? "1px solid white" : "none",
    background: props => props.color,
    borderRadius: "0"
  },
  "place--animating": {
    borderRadius: "100%"
  },
  "place--done": {
    borderRadius: "0",
  }
});

const Place = ({children, color, showsName}) => {
  const [inProp, setInProp] = useState(true);
  const classes = useStyles({color, showsName});

  useEffect(() => {
    const timer = setTimeout(() => {
      setInProp(false)
    }, 50);
    return () => clearTimeout(timer);
  }, [setInProp]);

  return <span className={`${classes.place} ${inProp? classes["place--animating"] : classes["place--done"]}` }>{children}</span>
};



const PlaceForAnimals = ({animal, showsName, overflow}) => {
  if (overflow) {
    return <Place>
      <span role="img" aria-label={"overflow"}>❌</span>
    </Place>
  }

  if (!animal) {
    return <Place>
      <span role="img" aria-label={"empty"}>🗌</span>
    </Place>
  }

  return <Place color={colorFor(animal.name)} showsName={showsName}>
    {showsName && <>{animal.size === 1 ? <Cat /> : <Elephant/>}<br/><span>{animal.name}</span></>}
  </Place>
};

export default PlaceForAnimals