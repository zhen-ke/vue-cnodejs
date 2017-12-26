<template>
  <div class="content" v-if="itemdetail">
    <div class="detail-left">
      <div class="detail">
        <div class="detail-wrapper">
          <div class="detail-hd">
            <h2 class="title">{{itemdetail.title}}</h2>
            <span class="time">发布于 {{getTime(itemdetail.create_at)}} •</span>
            <span class="author">作者 {{itemdetail.author.loginname}} •</span>
            <span class="visit">{{itemdetail.visit_count}} 次浏览</span>
          </div>
          <div class="detail-bd">
            <div id="content" v-html="itemdetail.content"></div>
          </div>
        </div>
      </div>
      <v-reply :replydata="itemdetail.replies"></v-reply>
    </div>
    <div class="detail-right">
      <v-user :userdata="itemdetail.author.loginname"></v-user>
    </div>
  </div>
</template>

<script>
import vReply from "./reply";
import vUser from "./user";

export default {
  name: "detail",
  data() {
    return {
      itemdetail: ""
    };
  },
  methods: {
    getData: function(id) {
      this.$http
        .get("https://cnodejs.org/api/v1/topic/" + id, {
          params: {
            accesstoken: true,
            mdrender: true
          }
        })
        .then(it => {
          this.itemdetail = it.data.data;
          // console.log(this.itemdetail);
        })
        .catch(it => {
          //  console.log('detail.vue:',it)
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
    this.getData(this.$route.params.id);
  },
  watch: {
    $route(to, from) {
      this.getData(to.params.id)
      // console.log(to, from)
    }
  },
  components: {
    vReply,
    vUser
  }
};
</script>

<style scoped>
.content {
  overflow: hidden;
}
.detail-left {
  float: left;
  width: 70%;
}
.detail-right {
  float: right;
  width: 28%;
}
.detail .detail-wrapper {
  background: #fff;
  border-radius: 4px;
}
.detail .detail-wrapper .detail-hd,
.detail .detail-wrapper .detail-bd {
  padding: 20px;
}
.detail .detail-wrapper .detail-hd {
  border-bottom: 1px solid #ddd;
}
.detail .detail-wrapper .detail-hd .title {
  font-size: 20px;
  margin-bottom: 15px;
}
</style>