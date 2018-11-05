<template>
  <h1>DC {{count}}</h1>
</template>

<script>
// import * as dc from 'dc'
import crossfilter from 'crossfilter'

var data = crossfilter([
  { name: 'Apple', type: 'fruit', count: 20 },
  { name: 'Orange', type: 'fruit', count: 10 },
  { name: 'Grapes', type: 'fruit', count: 50 },
  { name: 'Mango', type: 'fruit', count: 40 },
  { name: 'Peer', type: 'fruit', count: 15 }
])
export default {
  name: 'vue-crossfilter-chart',
  data () {
    return {
      data: data,
      count: data.groupAll().reduceCount().value()
    }
  }
}
</script>
