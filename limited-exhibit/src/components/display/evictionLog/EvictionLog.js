import React, {useEffect, useState} from "react";
import {Cat, Elephant} from "../../image/AnimalEmojies";
import Paper from "@material-ui/core/Paper";
import {colorFor} from "../../../model/Animal";
import Card from "@material-ui/core/Card";
import useGlobalState from "../../../state";

const EvictionLog = () => {

  const [entries] = useGlobalState("logEntries");
  const [localEntries, setLocalEntries] = useState(entries);

  useEffect(() => {
    setLocalEntries(entries)
  }, [entries, setLocalEntries]);

  return <section>
    <h2>eviction log</h2>
    <span>an eviction listener pushes a websocket message to update this log</span>
    <Paper style={{padding: "0.5em",  overflowX: "scroll", overflowY: "hidden"}} variant={"outlined"}>


      {localEntries.map((entry) => <span key={entry.name + entry.size + entry.time} style={{padding: "0.5em"}}>
        <span>evicted&nbsp;<Card style={{background: colorFor(entry.name), display: "inline", padding: "0.1em"}}
                            variant={"outlined"}>{entry.size === "1" ? <Cat /> : <Elephant/>}&nbsp;{entry.name}</Card></span>
      </span>)}
    </Paper>
  </section>
}
export default EvictionLog