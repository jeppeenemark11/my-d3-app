import { useEffect, useState } from 'react';
import './App.css';
import * as d3 from 'd3';
import data from "./data.js"

function App() {

 const dataSet = data;


  return (
    <div>

      <h1 id="title">Gross Domestic Product</h1>
      <div className='visHolder'>
      <Chart
            data={dataSet}
            height={500} 
            widthOfBar={5} 
            width={dataSet.length * 5} 
            dataType={"Date"}
            />
      </div>
      
    </div>
);
}

function Chart ({data, height, width, widthOfBar, dataType}){
  useEffect(() => {
createChart();
  }, [data])

const createChart = () => {
  const gpdData = data.map(d => d[1]);
  const dateData = data.map(d => d[0]);
  
  let tooltip = d3.select(".visHolder").append("div").attr("id", "tooltip").style("opacity", 0)

  const DataMax = d3.max(gpdData);
  const Yscale = d3.scaleLinear().domain([0, DataMax]).range([0, height])
  d3.select("svg").attr("id", "toolti").selectAll("rect").data(gpdData).enter().append("rect")
  d3.select("svg").selectAll("rect").data(gpdData).style("fill", (d, i) => (i % 2 == 0 ? "cyan" : "magenta"))
  .attr("x", (d, i) => i * widthOfBar ).attr("y", (d) => height - Yscale(d+DataMax * 0.1)).attr("height", (d, i) => Yscale(d + DataMax * 0.1))
  .attr("width", widthOfBar).on("mouseover", (d, i) => {
    tooltip.style("opacity", 0.9);
    tooltip.html("GDP: " + gpdData[i] + `<br/> ${dataType}: ` + dateData[i])
    .style("left", i * widthOfBar - 80 + "px")
    .style("top", d3.event.pageY - 150 + "px");
  });

};

return (
  <>
  <svg width={width} height={height}> </svg>
  </>
)

}


export default App;

