<template>
  <div>
    <h1>DC</h1>
    <div id="test"></div>
  </div>
</template>

<script>
import * as dc from 'dc'
import * as d3 from 'd3'
import crossfilter from 'crossfilter'

var data = crossfilter([
  { expt: 1, run: 1, speed: 850 },
  { expt: 1, run: 2, speed: 740 },
  { expt: 1, run: 3, speed: 900 },
  { expt: 1, run: 4, speed: 1070 },
  { expt: 2, run: 1, speed: 930 },
  { expt: 2, run: 2, speed: 850 },
  { expt: 2, run: 3, speed: 950 },
  { expt: 2, run: 4, speed: 980 },
  { expt: 2, run: 5, speed: 880 },
  { expt: 3, run: 1, speed: 2000 },
  { expt: 3, run: 2, speed: 980 },
  { expt: 3, run: 3, speed: 880 },
  { expt: 3, run: 4, speed: 1000 }
])

var runDimension = data.dimension(function (d) { return +d.run })
var speedSumGroup = runDimension.group().reduceSum(function (d) { return d.speed * d.run / 1000 })

export default {
  name: 'vue-crossfilter-chart',
  mounted () {
    var chart = dc.barChart('#test')
    chart
      .width(768)
      .height(480)
      .x(d3.scaleLinear().domain([0, 6]))
      .brushOn(false)
      .yAxisLabel('This is the Y Axis!')
      .dimension(runDimension)
      .group(speedSumGroup)
      .on('renderlet', function (chart) {
        chart.selectAll('rect').on('click', function (d) {
          console.log('click!', d)
        })
      })
    chart.render()
  }
}
</script>

<style lang="sass">
h1, h2
  color: #2c3e50
svg
  margin: 25px;
path
  fill: none
  stroke: #2c3e50
  stroke-width: 3px
</style>
