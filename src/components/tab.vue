<template>
  <ul class="pagination">
    <li class="disabled">
      <a>«</a>
    </li>
    <li v-show="more"><a>...</a></li>
    <li v-for="(items, index) in list" :key="index">
      <a href="#" @click.prevent="changePaginationNum(index)" :class="{active:isActive === index}">{{items}}</a>
    </li>
    <li><a>...</a></li>
    <li>
      <a>»</a>
    </li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        list: [1,2,3,4,5],
        isActive: 0,
        more: false
      }
    },
    methods: {
      page(data) {
        // console.log('tab:'+ data)
        this.$emit('changePage', data)
      },
      changePaginationNum(index) {
        this.page(this.list[index])
        this.isActive = index
        if(index === this.list.length - 1) {
          this.list = this.list.map(it => it + 2)
          this.more = true
        }
        if(index === this.list.length - 2) {
          this.list = this.list.map(it => it + 1)
          this.more = true
        }
        if(index === this.list.length - 4) {
          if(this.list[this.list.length - 4] > 2) {
            this.list = this.list.map(it => it - 1)
          }else {
            this.more = false
          }
        }
        if(index === this.list.length - 5) {
          if(this.list[this.list.length - 5] > 2) {
            this.list = this.list.map(it => it - 2)
          }else {
            this.more = false
          }
        }
      }
    },
    computed: {

    },
    watch: {
      list(newVal, oldVal) {
        // console.log(newVal, oldVal)
      },
    }
  }
</script>

<style>
.pagination {
  overflow: hidden;
}
.pagination li {
  float: left;
  line-height: 20px;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
  border-left-width: 0;
}
.pagination li:first-child {
  border-radius: 4px 0 0 4px;
}
.pagination li:last-child {
  border-radius: 0 4px 4px 0;
}
.pagination li:first-child {
  border-left-width: 1px;
}
.pagination li a {
  padding: 4px 12px;
  display: block;
}
.pagination li a.active {
  color: #80bd01;
}
.pagination li a {
  color: #999;
}
</style>