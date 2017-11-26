<template>
  <div id="app">
    <v-header></v-header>
     <div class="main">
       <router-view name='main'></router-view>
     </div>
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
.main {
  width: 1100px;
  margin: 0 auto;
}
</style>
