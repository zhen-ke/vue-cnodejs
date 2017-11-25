<template>
  <div id="app">
    <v-header></v-header>
    <router-view name='main'></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vHeader from './components/header'
import vFooter from './components/footer'

export default {
  name: 'app',
  components: {
    vHeader,
    vFooter
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  background: #E2E2E2;
  color: #778087;
}
img {
  height: auto;
  vertical-align: top;
}
</style>
