import React from "react";
import Internal from "./Internal";
import CacheInfoMXBean from "./CacheInfoMXBean";

const Statistics = () => {
  return <section>
    <h2>statistics</h2>
    <CacheInfoMXBean/>
    <Internal/>
  </section>
}
export default Statistics