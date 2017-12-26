<template>
  <div class="main">
    <div class="main-wrapper">
      <ul class="tab-list">
        <li class="item" @click="tabs('all')">全部</li>
        <li class="item" @click="tabs('good')">精华</li>
        <li class="item" @click="tabs('share')">分享</li>
        <li class="item" @click="tabs('ask')">问答</li>
        <li class="item"  @click="tabs('job')">招聘</li>
        <li class="item"  @click="tabs('dev')">客户端测试</li>
      </ul>
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
    <p class="pagination">
      <!-- <a class="button" @click="prev" >GO PREV</a>
      <a class="button" @click="next" >GO NEXT</a> -->
      <v-tab v-on:changePage="test"></v-tab>
    </p>
  </div>
</template>

<script>
import vTab from "./tab";

export default {
  data: function() {
    return {
      content: [],
      page: 1,
      tab: 'all'
    };
  },
  methods: {
    test(page) {
      // console.log('page:' + page)
      this.page = page
    },
    tabs(data) {
      this.tab = data
      this.$router.push({ path: `/tag/${data}` })
    },
    prev() {
      if(this.page > 1) {
        return this.page--
      }
    },
    next() {
      return this.page++
    },
    getData: function(page,tab) {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: page,
            limit: 0,
            tab: tab,
            mdrender: true
          }
        })
        .then(it => {
          this.content = it.data.data
        })
        .catch(it => {
          console.log("main.vue:", it);
        });
    },
    getDateTimeStamp: function (dateStr){
      return Date.parse(dateStr.replace(/-/gi,"/").replace(/[A-Z]+/gi," "));
    },
    getTime: function(hisTime, nowTime) {
      var now = nowTime ? nowTime : new Date().getTime(),
        diffValue = now - this.getDateTimeStamp(hisTime),
        result = "",
        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        halfamonth = day * 15,
        month = day * 30,
        year = month * 12,
        _year = diffValue / year,
        _month = diffValue / month,
        _week = diffValue / (7 * day),
        _day = diffValue / day,
        _hour = diffValue / hour,
        _min = diffValue / minute;
      if (_year >= 1) result = parseInt(_year) + "年前";
      else if (_month >= 1) result = parseInt(_month) + "个月前";
      else if (_week >= 1) result = parseInt(_week) + "周前";
      else if (_day >= 1) result = parseInt(_day) + "天前";
      else if (_hour >= 1) result = parseInt(_hour) + "个小时前";
      else if (_min >= 1) result = parseInt(_min) + "分钟前";
      else result = "刚刚";
      return result;
    }
  },
  created() {
    this.getData(this.page)
  },
  watch: {
    page(val) {
      this.getData(val)
    },
    tab(newVal, oldVal) {
      this.getData(this.page, newVal)
    }
  },
  components: {
    vTab
  }
};
</script>

<style scoped>
.tab-list {
  overflow: hidden;
  padding: 10px 15px;
  background: #f6f6f6;
  border-radius: 4px 4px 0 0;
}
.tab-list .item {
  float: left;
  margin-right: 15px;
}
.button {
  display: inline-block;
  background: #212121;
  color: #fff;
  font-weight: bold;
  text-align: center;
  padding: 1em;
  cursor: pointer;
  text-decoration: none;
}
.pagination {
  padding: 20px 0 0;
  text-align: center;
}
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
