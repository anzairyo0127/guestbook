<template>
  <div id="app">
    <Test msg="test"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Test from './components/Test.vue';

@Component({
  components: {
    Test,
  },
})
export default class App extends Vue {}
</script>

<style>

</style>
