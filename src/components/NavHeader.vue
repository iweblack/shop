<template>
  <div class="header">
    <div class="topBar">
      <div class="container">
        <div class="shop-user">
          <template v-if="username">
            <a href="/profile">{{ username }}，欢迎您</a>
            <a href="javascript:;" @click="logout()">退出</a>
          </template>
          <template v-else>
            <!--                        <a href="/login">登录</a>-->
            <a href="/register">免费注册</a>
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
    <div class="searchBar">
      <div class="container">
        <div class="header-logo">
          <a href="/index.html"><img :src="logo" :alt="name"></a>
        </div>
        <div class="shop-search">
          <div class="wrapper">
            <!--            刷新一下变一下-->
            <!--            :placeholder="searchKey" -->
            <input type="text" v-model="searchKey" @keyup.enter.prevent="searchEnterFun($event)">
            <button @click="goToSearch(searchKey)" style="cursor: pointer">搜索</button>
          </div>
        </div>
        <div class="my-cart" @click="goToCart()">
          <div class="wrapper">
            <a href=""></a>
            <span>购物车 &nbsp;&nbsp;({{ this.$store.state.cartNums || 0 }})</span>
            <!--            <span-->
            <!--                style="border-radius: 50%;display: inline-block;height: 20px;    width: 20px;background: #FF6600;vertical-align: top;"> </span>-->
            <!--            <span style="display: block; color: #ffffff;height: 20px;line-height: 20px;    text-align: center"> 5</span>-->
          </div>
        </div>
      </div>
    </div>
    <div class="cateBar">
      <div class="container">
        <div class="cate-left">
          <ul>
            <li><a href="/index.html">全部分类</a></li>
            <li><a href="/index.html">首页</a></li>
            <!--            js数组过滤  item必须加-->
            <li v-for="item in category.filter(item => item.is_banner===1)" :key="item.id">
              <a :href="'/search?categoryId='+item.id" target="_blank">{{ item.display_name || item.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {Message} from 'element-ui'
import {mapState} from 'vuex'

export default {
  name: "NavHeader",
  methods: {
    logout() {
      this.$cookie.set('username', '', {expires: '-1'})
      this.$cookie.set('uid', '', {expires: '-1'})
      // this.$cookie.set('cart', 0, {expires: '-1'})
      this.$cookie.set('token', '', {expires: '-1'})
      this.$store.dispatch('saveUserName', '');
      this.$store.dispatch('saveToken', '');
      this.$store.dispatch('saveUid', '');
      this.$store.dispatch('saveCartNums', 0);
      // Message.success('退出成功')
      console.log('退出成功')
      this.$router.push('/index.html')
    },
    goToCart() {
      // this.$router.push('/cart');
      let routeData = this.$router.resolve({path: '/cart'});
      window.open(routeData.href, '_blank');
    },
    getInfo() {
      this.axios.get('/managements/setting/1/').then((res) => {
        this.logo = res.data.logo;
        this.name = res.data.name;
      })
    },
    goToSearch(key) {
      if (key === '') {
        // Message.warning('输入为空，请重新输入');
        console.warn('输入为空，请重新输入');
        return
      }
      // 打开新页面
      // https://www.cnblogs.com/hcxy/p/10283730.html
      // this.$router.push('/search?key=' + key)
      let routeData = this.$router.resolve({path: '/search?key=', query: {key: key}});
      window.open(routeData.href, '_blank');
    }, searchEnterFun(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode === 13) {
        this.goToSearch(this.searchKey)
      }
    }
  },
  mounted() {
    this.getInfo();
  },
  data() {
    return {
      searchKey: '',
      name: '',
      logo: '',
      notice: ''
    }
  },
  props: ['category'],
  computed: {
    // 下面的两个方法都可以用  mapState做了进一步处理
    // username() {
    //   return this.$store.state.username;
    // }
    ...mapState(['username'])
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

  .searchBar {
    background: #fff;


    .container {
      // 注意这个高度  flex 根据这个高度进行垂直居中
      height: 90px;
      width: 1190px;
      margin: 0 auto;
      // flex布局
      display: flex;
      justify-content: space-between;
      align-items: center;


      .header-logo {
        display: inline-block;

        img {
          width: 150px;
          height: 50px;
        }

        // 旧
        //width: 55px;
        //height: 55px;
        //background-color: #FF6600;

        //a {
        //  // 行内块元素
        //  display: inline-block;
        //  width: 110px;
        //  height: 55px;
        //
        //  &:before {
        //    content: ' ';
        //    display: inline-block;
        //    width: 55px;
        //    height: 55px;
        //    background: url("~@/static/imgs/mi-logo.png") no-repeat center;
        //    background-size: 55px;
        //    transition: margin 0.2s;
        //  }
        //
        //  &:after {
        //    content: ' ';
        //    display: inline-block;
        //    width: 55px;
        //    height: 55px;
        //    background: url("~@/static/imgs/mi-home.png") no-repeat center;
        //    background-size: 55px;
        //  }
        //
        //  &:hover {
        //    margin-left: -55px;
        //    transition: margin 0.2s;
        //  }
        //}
      }

      .shop-search {
        width: 476px;

        .wrapper {
          border-radius: 5px;
          border: 2px solid #FF6600;
          border-right: 0;
          padding-left: 10px;
          box-sizing: border-box;
          display: flex;
          height: 40px;
          align-items: center;

          input {
            width: 460px;
            border: none;
          }

          button {
            background-color: #FF6600;
            width: 80px;
            line-height: 40px;
            height: 40px;
            padding: 0;
            font-size: 20px;
            color: #ffffff;
            border: none;
            outline: none;
            border-radius: 0;
          }

        }
      }

      .my-cart {
        cursor: pointer;
        // 调整 flex布局的两边分布
        width: 250px;

        .wrapper {
          border-radius: 5px;
          width: 105px;
          border: 2px solid #999999;
          height: 36px;
          display: flex;
          align-items: center;

          a {
            display: inline-block;
            margin: 0 8px;
            width: 20px;
            height: 20px;
            font-size: 16px;
            background: url("~@/static/imgs/icon-cart.png") no-repeat center;
            background-size: contain;

          }

          //span:nth-child(1){
          //  margin-right: 5px;
          //}

          &:hover {
            border: 2px solid #FF6600;

            span {
              color: #FF6600;
            }

          }

        }
      }
    }
  }

  .cateBar {
    //background: #fff; // 奶白
    //box-shadow: 0 0 5px #FFFFFF; // 阴影
    //height: 40px;
    background-color: #8A2BE2;

    .container {
      width: 1190px;
      margin: 0 auto;
      height: 40px;
      box-sizing: border-box;
      line-height: 40px;

      .cate-left {
        //width: 800px;

        ul {
          height: 40px;

          li {
            // 注意这里使用padding 来扩展 而不是margin 否则会抖动
            padding: 0 15px;
            display: inline-block;
            //margin-right: 30px;

            &:first-child {
              margin-right: 5px;
              width: 200px;
              height: 40px;
              text-align: center;
              padding: 0;
              background-color: #ae5113;

            }

            a {
              font-size: 16px;
              color: #FFFFFF;
            }

            //https://segmentfault.com/a/1190000004231995
            &:hover {
              background-color: #ae5113;
              height: 40px;
              //padding: 0 10px;
            }
          }
        }
      }
    }
  }
}
</style>
