import Faker from "faker";

const Animal = (type, name, size) => ({type, name, size});

let fake = Faker.name;
export const animals = [
  Animal("elephant", fake.firstName(undefined)),
  Animal("elephant", fake.firstName(undefined)),
  Animal("elephant", fake.firstName(undefined)),
  Animal("cat", fake.firstName(undefined)),
  Animal("cat", fake.firstName(undefined)),
  Animal("cat", fake.firstName(undefined)),
];

export const colorFor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return "#" + ((hash & 0x00FFFFFF) + 0X0F000000).toString(16).slice(-6)
      // FIXME, opacity performance bottleneck when i want to animate stuff?
      + "7A"
    ;
};

export default Animal