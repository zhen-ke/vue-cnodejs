<template>
  <div class="header">
    <div class="header-wrapper">
      <h1 class="title">
        <router-link :to="{name: 'main'}">
          <img src="./../assets/logo.png">
          <span>cNodeJS</span>
        </router-link>
      </h1>
      <p class="about">关于</p>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.header {
  background: #fff;
  margin-bottom: 35px;
}
.header .header-wrapper {
  width: 1100px;
  margin: 0 auto;
  overflow: hidden;
}
.header .header-wrapper .title {
  float: left;
  padding: 10px 0;
}
.header .header-wrapper .title img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  margin-right: 10px;
}
.header .header-wrapper .title span {
  font-size: 18px;
  font-weight: bold;
  color: #778087;
}
.header .header-wrapper .about {
  float: right;
  margin-top: 15px;
}
</style>
