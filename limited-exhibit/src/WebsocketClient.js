import useGlobalState, {Actions} from "./state";
import React, {useEffect, useRef} from "react";
import throttle from "lodash.throttle";
import SockJsClient from "react-stomp";

const WebsocketClient = () => {
  let ws = useRef(null).current;

  useEffect(() => {
    return () => {
      ws.close();
    };
  }, [ws]);

  const [, setAnimalExhibit] = useGlobalState('animalExhibit');

  const throttledUpdateExhibit = useRef(throttle(() => {
    Actions.requestCacheEntries().then(data => setAnimalExhibit(data));
  }, 1000)).current;

  useEffect(() => {
    return () => throttledUpdateExhibit.cancel();
  }, [throttledUpdateExhibit]);

  const [entries, setEntries] = useGlobalState("logEntries");

  const updateLog = (msg) => {
    let [name, size] = msg.split(" ");
    setEntries([{name, size, time: new Date().getTime()}].concat(entries))
  };

  const onMessage = (msg) => {
    if (msg.startsWith("new")) {
      throttledUpdateExhibit();
    } else {
      updateLog(msg)
    }
  };

  return <SockJsClient url='/ws' topics={['/topic/update', '/topic/evicted']}
                       onMessage={onMessage}
                       ref={(client) => {
                         ws = client
                       }}/>

};

export default WebsocketClient
