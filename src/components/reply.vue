<template>
  <div class="reply" v-if="replydata && replydata.length !== 0">
    <div class="reply-wrapper">
      <p class="reply-head">{{replydata.length}} 回复</p>
      <ul class="list">
        <li class="item" v-for="(item, index) in replydata" :key="index">
          <div class="item-hd">
            <router-link :to="{ name: 'user', params: {id: item.author.loginname} }" class="user">
              <img :src="item.author.avatar_url">
            </router-link> 
          </div>
          <div class="item-bd">
            <div class="top">
              <span class="user">{{item.author.loginname}}</span>
              <span class="floor">{{index+1}} 楼</span>
              <span class="time">{{getTime(item.create_at)}}</span>
            </div>
            <div class="content" v-html="item.content"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "reply",
  props: ["replydata"],
  methods: {
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
  }
};
</script>

<style scoped>
.reply {
  margin-top: 30px;
  background: #fff;
  border-radius: 4px;
}
.reply .reply-wrapper .reply-head {
  padding: 8px 10px;
  background: #f6f6f6;
  border-radius: 4px;
}
.reply .reply-wrapper .list .item {
  overflow: hidden;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}
.reply .reply-wrapper .list .item:last-child {
  border: 0;
}
.reply .reply-wrapper .list .item .item-hd {
  float: left;
}
.reply .reply-wrapper .list .item .item-hd img {
  border-radius: 4px;
  width: 50px;
}
.reply .reply-wrapper .list .item .item-bd {
  margin-left: 60px;
}
.reply .reply-wrapper .list .item .item-bd .top {
  margin-bottom: 10px;
}
.reply .reply-wrapper .list .item .item-bd .user {
  color: #666;
}
</style>
