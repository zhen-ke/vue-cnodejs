<template>
  <div class="user" v-if="user.length !== 0">
    <div class="user-info">
      <div class="user-info-hd">个人用户信息</div>
      <div class="user-info-bd">
        <ul>
          <li>
            <img :src="user.avatar_url" alt="img">
            <p class="username">{{user.loginname}}</p>
          </li>
          <li>{{user.score}} 积分</li>
          <li>github <a :href="'http://github.com/' + user.githubUsername">{{'http://github.com/' + user.githubUsername}}</a></li>
          <li>注册时间 {{getTime(user.create_at)}}</li>
        </ul>
      </div>
    </div>
    <div class="new-topic" v-if="user.recent_topics.length !== 0">
      <div class="new-topic-hd">最近创建的话题</div>
      <div class="new-topic-bd">
        <ul>
          <li v-for="item in user.recent_topics">
            <img :src="user.avatar_url" alt="img">
            <router-link :to="{ name: 'detail', params: {id: item.id} }" class="title">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="participate" v-if="user.recent_replies.length !== 0">
      <div class="participate-hd">最近参与的话题</div>
      <div class="participate-bd">
        <ul>
          <li v-for="item in user.recent_replies">
            <img :src="user.avatar_url" alt="img">
            <router-link :to="{ name: 'detail', params: {id: item.id} }" class="title">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userdata'],
  data: function() {
    return {
      user: []
    };
  },
  methods: {
    getData: function() {
      this.$http
        .get("https://cnodejs.org/api/v1/user/" + (this.userdata || this.$route.params.id), {
          params: {}
        })
        .then(it => {
          this.user = it.data.data;
          console.log(this.user);
        })
        .catch(it => {
          console.log("user.vue:", it);
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
    this.getData();
  }
};
</script>

<style scoped>
.user {
  border-radius: 4px;
}
.user a {
  color: #778087;
}
.user-info,
.new-topic,
.participate {
  margin-bottom: 20px;
  background: #fff;
  border-radius: 4px;
}
.user .user-info-hd,
.new-topic .new-topic-hd,
.participate .participate-hd {
  padding: 10px 20px;
  background: #F6F6F6;
  border-radius: 4px;
}
.user .user-info-bd img {
  width: 50px;
  height: auto;
  border-radius: 4px;
  margin-bottom: 5px;
}
.new-topic .new-topic-bd img,
.participate .participate-bd img {
  width: 30px;
  height: auto;
  border-radius: 4px;
  margin-bottom: 5px;
  margin-right: 10px;
  vertical-align: middle;
}
.user .user-info-bd {
  padding: 20px;
}
.user .user-info-bd li {
  margin-bottom: 10px;
}
.new-topic .new-topic-bd li,
.participate .participate-bd li {
  border-bottom: 1px solid #ddd;
  padding: 5px 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.new-topic .new-topic-bd li:last-child,
.participate .participate-bd li:last-child {
  border-bottom: 0
}
</style>
