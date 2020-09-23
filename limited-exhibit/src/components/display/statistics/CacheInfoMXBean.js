import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";

const CacheInfoMXBean = () => {

  const [statistics, setStatistics] = useState("");

  function fetchStatistics() {
    fetch("/api/cache/statistics")
        .then(data => data.json())
        .then(data => setStatistics(data))
  }

  useEffect(() => {
    fetchStatistics();
    let timer = setInterval(() => fetchStatistics(), 5000);
    return () => {
      clearInterval(timer);
      timer = null;
    }
  }, []);

  return <>
    <h3>CacheInfoMXBean <a href="https://cache2k.org/docs/latest/apidocs/cache2k-api/org/cache2k/jmx/CacheInfoMXBean.html">Docs</a></h3>
    <p>polled every 3 seconds</p>
    <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
      {Object.keys(statistics)
          .sort()
          .filter(it => it !== "evictionStatistics")
          .map((it, i) => <Box flex={"1 1 30%"} key={i}>{`${it}=${statistics[it]}`}</Box>)}
    </Box>
  </>
};

export default CacheInfoMXBean