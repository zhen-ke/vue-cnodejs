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
    getTime(time) {
      let date = new Date(time);
      let y = date.getFullYear(); // 获取完整的年份(4位,1970)
      let m = date.getMonth(); // 获取月份(0-11,0代表1月,用的时候记得加上1)
      let d = date.getDate(); // 获取日(1-31)
      return `${y}-${m}-${d}`;
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