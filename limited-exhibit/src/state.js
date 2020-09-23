import {createGlobalState} from "react-hooks-global-state";

const initialState = {animalExhibit: [], capacity: -1, logEntries: []};
const {useGlobalState} = createGlobalState(initialState);

export const Actions = {

  fetchAnimal: function (animal) {
    fetch("/api/animal?name=" + animal.name + "&type=" + animal.type)
        .then(() => null)
  },

  requestCacheEntries: function () {
    return fetch("/api/cache/entries")
        .then(data => data.json())
  },

  clearCache: function (setAnimalExhibit) {
    return fetch("/api/cache/entries", {method: "DELETE"})
        .then(() => setAnimalExhibit([]))
  },

  requestNewCapacity: function (newCapacity, setCapacity) {
    return fetch("/api/cache/capacity", {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({limit: newCapacity})})
        .then(data => data.json())
        .then(data => {
          setCapacity(data.limit);
        })
  },
  requestCurrentCapacity() {
    return fetch("/api/cache/capacity")
        .then(data => data.json())
  }
};

export default useGlobalState
