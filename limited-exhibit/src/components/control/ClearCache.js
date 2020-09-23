import useGlobalState, {Actions} from "../../state";
import Button from "@material-ui/core/Button";
import React from "react";

const ClearCache = () => {
  const [, setAnimalExhibit] = useGlobalState('animalExhibit');

  return <Button variant="contained" color="secondary" onClick={() => {
    Actions.clearCache(setAnimalExhibit)
  }} href={"#"}>clear cache</Button>
};
export default ClearCache
