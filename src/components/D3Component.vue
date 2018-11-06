<template>
  <div>
    <h1>a random walk</h1>
    <h2>{{this.data.slice(-1)[0]}}</h2>
    <svg width="500" height="270">
      <g>
        <path :d="line" />
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'vue-line-chart',
  data () {
    return {
      data: [0],
      line: ''
    }
  },
  methods: {
    addNumber () {
      this.data.push(this.data.slice(-1)[0] + Math.floor(Math.random() * 201) - 100)
      this.calculatePath()
    },
    getScales () {
      const x = d3.scaleTime().range([0, 430])
      const y = d3.scaleLinear().range([210, 0])
      d3.axisLeft().scale(x)
      d3.axisBottom().scale(y)
      x.domain(d3.extent(this.data, (d, i) => i))
      y.domain([d3.min(this.data, d => d), d3.max(this.data, d => d)])
      return { x, y }
    },
    calculatePath () {
      const scale = this.getScales()
      const path = d3.line()
        .x((d, i) => scale.x(i))
        .y(d => scale.y(d))
      this.line = path(this.data)
    }
  },
  created: function () {
    this.timer = setInterval(this.addNumber, 5)
  }
}
</script>

<style lang="sass" scoped>
h1, h2
  color: #2c3e50
svg
  margin: 25px;
path
  fill: none
  stroke: #2c3e50
  stroke-width: 3px
</style>
