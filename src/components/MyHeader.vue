<template>
  <div class="header">
    <div class="topBar">
      <div class="container">
        <div class="shop-user">
          <template v-if="username">
            <a href="/profile">{{ username }}，你好</a>
            <a href="javascript:;" @click="logout()">退出</a>
          </template>
          <template v-else>
            <a href="/login">你好，登录</a>
            <a href="/register">注册</a>
          </template>
        </div>
        <div class="shop-center">
          <a href="/orderList">我的订单</a>
          <!--                    <a href="">账户中心</a>-->
          <a href="/profile">账户中心</a>

          <!--          <div class="list">-->
          <!--            <a href="">账户中心</a>-->
          <!--            <dl>-->
          <!--              <dt>-->
          <!--                <a href="">个人资料</a>-->
          <!--              </dt>-->
          <!--              <dt>-->
          <!--                <a href="">收货地址</a>-->
          <!--              </dt>-->
          <!--            </dl>-->
          <!--          </div>-->
          <!--          <div class="list">-->
          <!--            <a href="">会员中心</a>-->
          <!--            <dl>-->
          <!--              <dt>-->
          <!--                <a href="">我的搜藏</a>-->
          <!--              </dt>-->
          <!--              <dt>-->
          <!--                <a href="">售后管理</a>-->
          <!--              </dt>-->
          <!--            </dl>-->
          <!--          </div>-->
          <!--          hover出一个框 进行列表显示-->
          <a href="/message">消息中心</a>

        </div>
      </div>
    </div>
    <div class="login-header">
      <div class="header-logo">
        <a href="/index.html"><img src="~@/static/imgs/logo.png" alt="JapanHui"></a>
      </div>
      <h2>{{ title }}</h2>
    </div>
  </div>
</template>

<script>
// import {Message} from "element-ui";

export default {
  name: "MyHeader",
  data() {
    return {}
  },
  // 向组件传值使用 props
  props: {
    title: String
  },
  computed: {
    username() {
      return this.$store.state.username;
    }
  },
  methods: {
    logout() {
      this.$cookie.set('username', '', {expires: '-1'})
      this.$cookie.set('uid', '', {expires: '-1'})
      this.$cookie.set('cart', 0, {expires: '-1'})
      this.$cookie.set('token', '', {expires: '-1'})
      this.$store.dispatch('saveUserName', '');
      this.$store.dispatch('saveToken', '');
      this.$store.dispatch('saveUid', '');
      this.$store.dispatch('saveCartNums', 0);
      // Message.success('退出成功')
      console.log('退出成功')
      this.$router.push('/index.html')
    },
  }
}
</script>

<style lang="scss">
.header {
  .topBar {
    // lin-height 垂直居中  对文字 行内元素
    height: 35px;
    line-height: 35px;
    background-color: #F8F8F8;

    .container {
      width: 1190px;
      // 左右居中
      margin: 0 auto;
      // flex布局
      display: flex;
      justify-content: space-between;
      align-items: center;


      a {
        color: #999999;
        margin-right: 15px;
      }
    }
  }

  .login-header {
    // 垂直居中
    display: flex;
    align-items: center;
    width: 1200px;
    margin: 0 auto;
    height: 100px;

    .header-logo {
      display: inline-block;

      img {
        width: 150px;
        height: 50px;
      }
    }

    h2 {
      font-size: 20px;
      margin-left: 15px;
    }
  }
}
</style>
