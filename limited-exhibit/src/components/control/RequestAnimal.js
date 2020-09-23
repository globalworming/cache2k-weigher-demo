import Button from "@material-ui/core/Button";
import React from "react";
import useGlobalState, {Actions} from "../../state"
import Animal, {colorFor, animals} from "../../model/Animal";
import {Box} from "@material-ui/core";
import Faker from "faker";

const RequestAnimal = () => {

  const [, setAnimalExhibit] = useGlobalState('animalExhibit');

  let fake = Faker.name;

  return <section>
    <h2>Request animal</h2>
    <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
      {animals.map((animal, i) => <Button key={i}
                                          style={{margin: "0.25em", background: colorFor(animal.name)}}
                                          variant={"outlined"}
                                          onClick={() => Actions.fetchAnimal(animal, setAnimalExhibit)}>
        {animal.type} {animal.name}</Button>)}
      <Button style={{margin: "0.25em"}} variant={"outlined"}
              onClick={() => Actions.fetchAnimal(Animal("elephant", fake.firstName(undefined)), setAnimalExhibit)}>
        random elephant</Button>
        <Button style={{margin: "0.25em"}} variant={"outlined"}
              onClick={() => Actions.fetchAnimal(Animal("cat", fake.firstName(undefined)), setAnimalExhibit)}>
        random cat</Button>

    </Box>
  </section>;
};

export default RequestAnimal