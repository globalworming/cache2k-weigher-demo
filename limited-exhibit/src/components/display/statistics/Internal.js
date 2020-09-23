import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";

const Internal = () => {

  const [statistics, setStatistics] = useState("");

  function fetchInternalStatistics() {
    fetch("/api/cache/internalStatistics")
        .then(data => data.text())
        .then(data => setStatistics(data))
  }

  useEffect(() => {
    fetchInternalStatistics()
    let timer = setInterval(()=> fetchInternalStatistics(), 5000);
    return () => { clearInterval(timer); timer = null;}
  }, []);


  return <>
    <h3>internal <a href="https://cache2k.org/docs/latest/user-guide.html#internal-statistics">Docs</a></h3>
    <p>polled every 3 seconds</p>

    <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
      {statistics.substring("Cache(".length).slice(0, -1).split(", ").sort().map((entry, i) => <Box flex={"1 1 30%"} key={i}>{entry}</Box>)}
    </Box>
  </>
}

export default Internal