import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import './App.css';

export default function App() {
  return (
    <div className="App">
      <h1>Lewy vs Müller</h1>
      <Circles />
    </div>
  );
}

const lewygoalsJSON = require('./lewygoals.json');
const mullergoalsJSON = require('./mullergoals.json');
const values = [{name: "Lewy 20/21", values: lewygoalsJSON},{name: "Muller 71/72", values: mullergoalsJSON}]
const allGroup = ["Lewy 20/21", "Muller 71/72"];

const dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
  return {
    name: grpName,
    values: values.find(vl => vl.name === grpName).values.map(function(d) {
      return {round: d.round, goals: d.goals};
    })
  };
});

const myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

const margin = {top: 20, right: 120, bottom: 30, left: 60},
  width = (window.screen.width - margin.left - margin.right) * 0.85,
  height = (window.screen.height - margin.top - margin.bottom) * 0.85;

const Circles = () => {

  const ref = useRef();

  useEffect(() => {
    const svgElement = d3.select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = d3.scaleLinear()
        .domain([0,mullergoalsJSON[mullergoalsJSON.length-1].round])
        .range([ 0, width ]);

      svgElement.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
      // Add Y axis
      var y = d3.scaleLinear()
        .domain( [0, mullergoalsJSON[mullergoalsJSON.length-1].goals])
        .range([ height, 0 ]);
      svgElement.append("g")
        .call(d3.axisLeft(y));
      // Add the line
      const line = d3.line()
        .x(function(d) { return x(+d.round) })
        .y(function(d) { return y(+d.goals) })


      svgElement.selectAll("myLines")
        .data(dataReady)
        .enter()
        .append("path")
          .attr("d", function(d){ return line(d.values) } )
          .attr("stroke", function(d){ return myColor(d.name) })
          .style("stroke-width", 4)
          .style("fill", "none");

      // First we need to enter in a group
      svgElement.selectAll("myDots")
            .data(dataReady)
            .enter()
              .append('g')
              .style("fill", function(d){ return myColor(d.name) })
            // Second we need to enter in the 'values' part of this group
            .selectAll("myPoints")
            .data(function(d){ return d.values })
            .enter()
            .append("circle")
              .attr("cx", function(d) { return x(d.round) } )
              .attr("cy", function(d) { return y(d.goals) } )
              .attr("r", 5)
              .attr("stroke", "white")
            // .on("mouseover", function(d) {
            //     tooltip.transition()
            //          .duration(200)
            //          .style("opacity", .9);
            //     tooltip.html(d.x + "-" + d.y )
            //          .style("left", d3.select(this).attr("cx") + "px")
            //          .style("top", d3.select(this).attr("cy") + "px");
            // })
            // .on("mouseout", function(d) {
            //     tooltip.transition()
            //          .duration(500)
            //          .style("opacity", 0)      
            //   }
            // )
              

      svgElement
        .selectAll("myLabels")
        .data(dataReady)
        .enter()
          .append('g')
          .append("text")
            .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
            .attr("transform", function(d) { return "translate(" + x(d.value.round) + "," + y(d.value.goals) + ")"; }) // Put the text at the position of the last point
            .attr("x", 12) // shift the text a bit more right
            .text(function(d) { return d.name; })
            .style("fill", function(d){ return myColor(d.name) })
            .style("font-size", 15)
  }, []);

  return <svg ref={ref} />;
};
