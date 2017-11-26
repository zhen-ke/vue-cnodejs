<template>
  <div class="main">
    <div class="main-wrapper">
      <ul class="list">
        <li v-for="(item,index) in content" :key="index" class="item">
          <div class="item-hd">
            <router-link :to="{ name: 'user', params: {id: item.author.loginname} }" class="user">
              <img :src="item.author.avatar_url">
            </router-link> 
          </div>
          <div class="item-bd">
            <router-link :to="{ name: 'detail', params: {id: item.id} }" class="title">{{item.title}}</router-link>
            <p class="footer">
              <span class="reply" v-show="item.reply_count !== 0">{{item.reply_count}}</span>
              <span class="authour">{{item.author.loginname}} • </span>
              <span class="time">创建于: {{getTime(item.create_at)}}</span>
            </p>
            <p :class="{top: item.top}" v-if="item.top">置顶</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      content: []
    };
  },
  methods: {
    getData: function() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: 1,
            limit: 0,
            mdrender: true
          }
        })
        .then(it => {
          this.content = it.data.data;
          // console.log(this.content);
        })
        .catch(it => {
           console.log('main.vue:',it)
        });
    },
    getTime(time) {
      let date = new Date(time);
      let y = date.getFullYear(); // 获取完整的年份(4位,1970)
      let m = date.getMonth(); // 获取月份(0-11,0代表1月,用的时候记得加上1)
      let d = date.getDate(); // 获取日(1-31)
      return `${y}-${m}-${d}`;
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.main .main-wrapper {
  background: #fff;
  border-radius: 4px;
}
.main .main-wrapper .list .item {
  overflow: hidden;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.main .main-wrapper .list .item:last-child {
  border: 0;
}
.main .main-wrapper .list .item .item-hd {
  float: left;
}
.main .main-wrapper .list .item .item-hd .user {
  display: inline-block;
}
.main .main-wrapper .list .item .item-hd img {
  width: 50px;
  height: 50px;
  display: inline-block;
  border-radius: 4px;
}
.main .main-wrapper .list .item .item-bd {
  margin-left: 70px;
}
.main .main-wrapper .list .item .item-bd .title {
  font-size: 16px;
  margin-bottom: 5px;
  color: #778087;
}
.main .main-wrapper .list .item .item-bd .footer {
  color: #8492a6;
}
.main .main-wrapper .list .item .item-bd .footer .authour {
}
.main .main-wrapper .list .item .item-bd .footer .reply {
  display: inline-block;
  position: absolute;
  right: 10px;
  top: 15px;
  background: #aab0c5;
  border-radius: 10px;
  width: 30px;
  text-align: center;
  color: #fff;
  font-size: 12px;
}
.main .main-wrapper .list .item .item-bd {
  position: relative;
}
.main .main-wrapper .list .item .item-bd .top {
  position: absolute;
  right: -20px;
  top: -20px;
  background: #81bb24;
  color: #fff;
  padding: 3px 3px;
  border-radius: 2px;
  font-size: 12px;
  text-indent: -9999px;
  transform: rotate(-45deg);
}
</style>
