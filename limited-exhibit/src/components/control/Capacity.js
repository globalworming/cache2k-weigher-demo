import Button from "@material-ui/core/Button";
import React, {useState, useEffect, useRef} from "react";
import debounce from 'lodash.debounce';
import useGlobalState, {Actions} from "../../state"

const Capacity = () => {

  const [capacity, setCapacity] = useGlobalState('capacity');
  let [localCapacity, setLocalCapacity] = useState(capacity);

  useEffect(() => {
    setLocalCapacity(capacity)
  }, [capacity, setLocalCapacity]);

  let [working, setWorking] = useState(false);

  const debouncedRequestNewCapacity = useRef(debounce(requestNewCapacity, 300)).current;

  useEffect(
      () => {
        if (capacity <= 0 || localCapacity <= 0) return

        if (capacity !== localCapacity) {
          debouncedRequestNewCapacity(localCapacity, setCapacity, setWorking);
        }
        return () => debouncedRequestNewCapacity.cancel()

      }, [capacity, localCapacity, setCapacity, setWorking, debouncedRequestNewCapacity]
  );

  return <div>
    <Button variant="contained" color="primary" onClick={() => setLocalCapacity(Math.max(1, localCapacity - 10))}>-10</Button>
    <Button variant="contained" color="primary" onClick={() => setLocalCapacity(Math.max(1, localCapacity - 1))}>-</Button>
    <span>Capacity {working ? ".." : Math.max(localCapacity, 1)}</span>
    <Button variant="contained" color="primary" onClick={() => setLocalCapacity(Math.max(1, localCapacity + 1))}>+</Button>
    <Button variant="contained" color="primary" onClick={() => setLocalCapacity(Math.max(1, localCapacity + 10))}>+10</Button>

  </div>
};

const requestNewCapacity = (localCapacity, setCapacity, setWorking) => {
  setWorking(true);
  Actions.requestNewCapacity(localCapacity, setCapacity).then(() => setWorking(false))
};

export default Capacity

