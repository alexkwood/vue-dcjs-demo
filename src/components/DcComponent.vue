<template>
  <div>
    <h1>DC</h1>
    <div id="pie1" />
    <div id="pie2" />
    <div id="barchart1" />
  </div>
</template>

<script>
import * as dc from 'dc'
import * as d3 from 'd3'
import crossfilter from 'crossfilter'

export default {
  name: 'vue-crossfilter-chart',
  data () {
    return {
      data: crossfilter([
        { name: 'banana', category: 'fruit', country: 'Martinique', outOfDateQuantity: 3, quantity: 12 },
        { name: 'apple', category: 'fruit', country: 'Spain', outOfDateQuantity: 7, quantity: 9 },
        { name: 'tomato', category: 'vegetable', country: 'Spain', outOfDateQuantity: 2, quantity: 25 },
        { name: 'peach', category: 'fruit', country: 'Netherlands', outOfDateQuantity: 1, quantity: 5 }
      ]),
      chart: '',
      dimensionCategory: null,
      quantityByCategory: null,
      dimensionCountryAndCategory: null,
      quantityByCountryAndCategory: null,
      countryCategory: null,
      outOfDateByCountry: null
    }
  },
  methods: {
    calculatePie1 () {
      var pie1 = dc.pieChart('#pie1')
      pie1
        .width(200)
        .height(200)
        .innerRadius(25)
        .label(function (d) {
          return d.key + ': ' + d.value
        })
        .dimension(this.dimensionCategory)
        .group(this.quantityByCategory)
      pie1.render()
    },
    calculatePie2 () {
      var pie2 = dc.pieChart('#pie2')
      pie2
        .width(200)
        .height(200)
        .innerRadius(25)
        .dimension(this.dimensionCountryAndCategory)
        .group(this.quantityByCountryAndCategory)
      pie2.render()
    },
    calculateBarchart1 () {
      var chart = dc.barChart('#barchart1')
      chart
        .width(200)
        .height(200)
        .x(d3.scaleOrdinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('Country')
        .yAxisLabel('Out of date quantity')
        .elasticY(true)
        .dimension(this.countryCategory)
        .group(this.outOfDateByCountry)
      chart.render()
    },
    calculateCharts () {
      // dimensions
      this.dimensionCategory = this.data.dimension(item => item.category)
      this.quantityByCategory = this.dimensionCategory.group().reduceSum(item => item.quantity)

      this.dimensionCountryAndCategory = this.data.dimension(item => item.country + '_' + item.category)
      this.quantityByCountryAndCategory = this.dimensionCountryAndCategory.group().reduceSum(item => item.quantity)

      this.countryCategory = this.data.dimension(item => item.country)
      this.outOfDateByCountry = this.countryCategory.group().reduceSum(item => item.outOfDateQuantity)

      this.calculatePie1()
      this.calculatePie2()
      this.calculateBarchart1()
    }
  },
  mounted () {
    this.calculateCharts()
  }
}
</script>

<style lang="sass">
h1, h2
  color: #2c3e50
</style>
