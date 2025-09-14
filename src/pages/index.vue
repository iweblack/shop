<template>
  <div class="index">
    <div class="container">
      <!--      第一层 轮播-->
      <div class="intro">
        <div class="nav-menu">
          <ul class="wrap-menu">
            <li class="menu-item" v-for="item1 in category" :key="item1.id">
              <a :href="'/search?categoryId='+item1.id" target="_blank">{{ item1.name }}</a>
              <div class="children">
                <div class="warp-child" v-for="item2 in item1.sub_cat" :key="item2.id">
                  <div class="category-block">
                    <div class="category-flex">
                      <a :href="'/search?categoryId='+item2.id" target="_blank" class="second-menu">
                        {{ item2.name }}</a>
                      <ul>
                        <li v-for="item3 in item2.sub_cat" :key="item3.id">
                          <a :href="'/search?categoryId='+item3.id" target="_blank">{{ item3.name }}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="line"></div>
                </div>

              </div>
            </li>

          </ul>
        </div>
        <div class="swiper-box">
          <Swiper
            :modules="modules"
            :slidesPerView="1"
            :loop="true"
            :pagination="{ clickable: true }"
            :navigation="true"
            :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }"
          >
            <SwiperSlide v-for="(item , idx) in sliderList" :key="idx">
              <a v-bind:href="'/activity/'+item.id" target="_blank">
                <img :src="item.img">
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="intro-right">
          <div class="user">
            <a href="/profile"><img src="~@/static/imgs/avatar.png" alt=""></a>
            <template v-if="this.$store.state.username">
              <p class="username">{{ this.$store.state.username.slice(0, 3) }} ***
                {{ this.$store.state.username.slice(7, 11) }}</p>
              <a href="/orderList" class="login-button">我的订单</a>
              <a href="/collect" class="login-button">搜藏中心</a>

            </template>
            <template v-else>
              <p class="username">Hi！你好</p>
              <a href="/login" class="login-button">登录</a>
              <a href="/register" class="login-button">注册</a>
            </template>

          </div>
          <div class="code">
            <img src="~@/static/imgs/1623246686.png" alt="">
            <p class="app-name">微信小程序</p>
          </div>
        </div>
      </div>
      <!--公告  to-do 上下-->
      <div class="notice">
        <span>公告</span><img src="~@/static/imgs/notice.png" alt="">
        <p>{{ notice }}</p>
      </div>

      <!--            第二层 推荐-->
      <div class="shop-recommend">
        <div class="recom-left">
          <img src="~@/static/imgs/rec.png" alt="人气推荐">
        </div>
        <div class="recom-right">
          <div class="recom-list" v-for="item in hotList.slice(0,4)" :key="item.id">
            <div class="recom-img">
              <a :href="'/product/'+item.id" target="_blank">
                <img v-lazy="item.cover" :alt="item.title">
              </a>
            </div>
          </div>
        </div>
      </div>


      <!--      第三层 新品推荐-->
      <div class="shop-new">
        <h3 class="cate-word">新品推荐</h3>
        <div class="wrap-shop">
          <div class="new-intro">
            <img src="~@/static/imgs/new.png" alt="新品推荐">
            <p>新品推荐</p>
            <p>小编精选</p>
            <p>货优质廉</p>
          </div>
          <div class="new-list">
            <div class="shop-item" v-for="item in newList.slice(0,4)" :key="item.id">
              <span class="flag new-pro">新品</span>
              <div class="item-img">
                <a :href="'/product/'+item.id" target="_blank"><img v-lazy="item.cover" :alt="item.title"></a>
              </div>
              <div class="item-info" @click="goProduct(item.id)">
                <a :href="'/product/'+item.id" target="_blank"><h3 class="title">{{ item.title }}</h3></a>
                <!--                <p class="desc">{{ item.desc.slice(0, 4) }}</p>-->
                <p class="price">{{ item.price }}元</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--      第四层  -->
      <div class="shop-category" v-for="(reccom, idx1) in recommendList" :key="idx1">
        <h3 class="cate-word">{{ reccom.category }}</h3>
        <div class="wrap-category">
          <div class="brandlist">
            <div class="brand" v-for="(brand,idx2) in reccom.brands" :key="idx2">
              <a :href="'/search?brandId='+brand.id" target="_blank"> <img v-lazy="brand.image" :alt="brand.en_name"></a>
            </div>
          </div>
          <div class="category-list">
            <div class="shop-item" v-for="(product,idx3) in reccom.products" :key="idx3">
              <span class="flag new-pro" v-if="product.is_new === 1">新品</span>
              <!--              <span class="flag kill-pro" v-if="product.is_hot ==='1'">热卖</span>-->
              <div class="item-img">
                <a :href="'/product/'+product.id" target="_blank"> <img v-lazy="product.image" :alt="product.title"></a>
              </div>
              <div class="item-info">
                <a :href="'/product/'+product.id" target="_blank">
                  <h3 class="title">{{ product.title.slice(0, 35) }}<span v-if="product.title.length > 38">...</span>
                  </h3>
                </a>
                <p class="desc">{{ product.desc }}</p>
                <p class="price" @click="addCart()">{{ product.price }}元</p>
              </div>
            </div>
          </div>
        </div>
        <!--        <div class="ads">-->
        <!--          <a href="/activity/1/" target="_blank"><img src="~@/static/imgs/banner-1.png" alt=""></a>-->
        <!--        </div>-->
      </div>


      <!--  猜你喜欢-->
      <div class="shop-guess">
        <h3 class="cate-word">热卖爆品</h3>
        <div class="wrap-shop">
          <div class="new-list">
            <div class="shop-item" v-for="(hot, idx) in sortList" :key="idx">
              <span class="flag kill-pro">热卖</span>
              <div class="item-img">
                <a :href="'/product/'+hot.id" target="_blank"> <img v-lazy="hot.cover" :alt="hot.title"></a>
              </div>
              <div class="item-info">
                <a :href="'/product/'+hot.id" target="_blank"><h3 class="title">{{ hot.title }}</h3></a>
                <p class="price">{{ hot.price }}元</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    emit 进行组件之间的传递值-->
    <modal
        title="提示"
        sureText="查看购物车"
        btnType="1"
        modalType="middle"
        v-bind:showModal="showModal"
        v-on:submit="goToCart"
        v-on:cancel="showModal=false">
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper'
import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Modal from "../components/Modal";

export default {
  name: "index",
  components: {
    Swiper,
    SwiperSlide,
    Modal
  },
  props: ['category'],
  data() {
    return {
      showModal: false,
      modules: [Pagination, Navigation, Autoplay],
      //http://mi.futurefe.com/imgs/slider/slide-1.jpg
      sliderList: [],
      newList: [],
      hotList: [],
      recommendList: [],
      sortList: [],
      notice: ""
    }
  },
  mounted() {
    this.getRecommend();
    this.getHotProduct();
    this.getNewProduct();
    this.getGoodSold();
    this.getInfo();
    this.getCarousel();
  },
  // created() {
  //   this.axios.get('/managements/setting/1/').then((res) => {
  //     document.title = res.data.name;
  //   })
  //
  // },
  methods: {
    getCarousel() {
      this.axios.get('/managements/ad/').then((res) => {
        this.sliderList = res.data.list.map(item => {
          return {
            id: item.id,
            img: item.pic
          }
        });
      })
    },
    getInfo() {
      this.axios.get('/managements/setting/1/').then((res) => {
        this.notice = res.data.notice;
        document.title = res.data.name;
      })
    },
    // 取的是设置  brand的
    getRecommend() {
      this.axios.get('/recommends/').then((res) => {
        this.recommendList = res.data.list.map(item => {
          return {
            id: item.id,
            category: item.name,
            products: item.banner_product.map(product_item => {
              // const temp = JSON.parse(item1.goods[0]['params']);
              return {
                id: product_item.id,
                title: product_item.title,
                image: product_item.pic,
                price: product_item.min_price

                // id: item1.id,
                // title: item1.title + temp[Object.keys(temp)[1]],
                // image: JSON.parse(item1.goods[0]['images'])[1],
                // price: JSON.parse(item1.goods[0].sold_price)
                // desc: item1.desc.slice(0, 10),
                // price: JSON.stringify(item1.params) === '[]' ? 0 : item1.params[0]['shop_price']
              }
            }),
            brands: item.brand_info
          }

        });
      })
    },
    goProduct() {
    },
    addCart() {
      this.showModal = true;
    },
    goToCart() {
      // this.$router.push('/cart');
      let routeData = this.$router.resolve({path: '/cart'});
      window.open(routeData.href, '_blank');
    },
    getGoodSold() {
      this.axios.get('/goods/', {
        params: {
          pageSize: 5,
          sold_num: 'sold_num'
        }
      }).then((res) => {
        this.sortList = res.data.list.map(
            item => {
              return {
                id: item.be_product.id,
                title: item.be_product.title,
                cover: item.cover,
                price: item.sold_price
              }
            }
        )
      })
    },
    getHotProduct() {
      this.axios.get('/products/', {
        params: {
          is_recommend: 1
        }
      }).then((res) => {
        this.hotList = res.data.list.map(item => {
          // const temp = JSON.parse(item.params);
          return {
            id: item.id,
            title: item.title,
            cover: item.pic,
            price: item.min_price
            // id: item.be_product.id,
            // title: item.be_product.title + temp[Object.keys(temp)[1]],
            // cover: JSON.parse(item['images'])[1],
            // price: JSON.parse(item.sold_price)
          }
        });
      })
    },
    getNewProduct() {
      this.axios.get('/products/', {
        params: {
          is_new: 1
        }
      }).then((res) => {
        this.newList = res.data.list.map(item => {
          // const temp = JSON.parse(item.params);
          return {
            id: item.id,
            title: item.title,
            cover: item.pic,
            price: item.min_price
            // id: item.be_product.id,
            // title: item.be_product.title + temp[Object.keys(temp)[1]],
            // cover: JSON.parse(item['images'])[1],
            // price: JSON.parse(item.sold_price)
            // cover: JSON.parse(item.images)['images'][0],
            // shop_price: JSON.stringify(item.params) === '[]' ? 0 : item.params[0]['shop_price'],
            // desc: item.desc
          }
        });
      })
    },
    // getSortProduct() {
    //   this.axios.get('/hots/', {
    //     params: {
    //       is_new: 1
    //     }
    //   }).then((res) => {
    //     this.sortList = res.data.list.map(item => {
    //       return {
    //         id: item.id,
    //         title: item.title,
    //         is_new: item.is_new,
    //         is_hot: item.is_hot,
    //         // cover: JSON.parse(item.images)['images'][0],
    //         // price: JSON.stringify(item.params) === '[]' ? 0 : item.params[0]['shop_price'],
    //         // desc: item.desc.slice(0, 10)
    //       }
    //     });
    //   })
    // }
  },

}
</script>

<style lang="scss">
.index {
  margin-top: 3px;
  background-color: #f5f5f5;

  .container {

    margin: 0 auto;
    width: 1190px;


    .intro {
      height: 461px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .nav-menu {
        // 使用该属性 可以不包含 padding
        box-sizing: border-box;
        // 绝对定位 相对于 intro类的
        position: absolute;
        z-index: 9;

        background-color: #99999969;
        width: 200px;
        height: 460px;
        padding: 20px 0;

        .wrap-menu {

          .menu-item {


            height: 35px;
            line-height: 35px;

            &:hover {
              background-color: #FF6600;

              .children {
                display: block;
              }
            }

            .children {
              display: none;
              background-color: #FFFFFF;
              width: 988px;
              min-height: 459px;
              position: absolute;
              left: 200px;
              top: 0;
              border: 1px solid #E5E5E5;

              .warp-child {
                &:first-child {
                  margin-top: 22px;
                }

                //&:last-child {
                //  margin-bottom: 22px;
                //}

                //padding: 22px 0;

                .category-block {
                  .category-flex {
                    display: flex;
                    justify-items: center;

                    .second-menu {
                      color: #000000;
                      font-size: 18px;
                      min-width: 50px;
                    }

                    ul {
                      display: flex;
                      flex-direction: row;
                      flex-wrap: wrap;
                      //justify-content: flex-start;

                      li {


                        a {
                          color: #FF6600;
                        }
                      }
                    }
                  }
                }

                .line {
                  //width: 900px;
                  margin-top: 10px;
                  margin-bottom: 10px;
                  border-bottom: 2px solid #F8F8F8;
                }

              }
            }

            a {
              // 给a一个
              position: relative;
              color: #FFFFFF;
              font-size: 14px;
              display: block;
              padding-left: 25px;

              &:after {
                // 相对于a的绝对定位
                position: absolute;
                content: ' ';
                right: 30px;
                top: 10px;
                width: 10px;
                height: 15px;
                background: url("~@/static/imgs/icon-arrow.png") no-repeat center;
                background-size: contain;
              }


            }
          }
        }
      }

      .swiper-box {
        border-radius: 5px;
        width: 950px;

        .swiper-container {
          height: 460px;

          .swiper-button-prev {
            left: 210px;
          }

          img {
            border-radius: 5px;
            height: 100%;
            width: 100%;
          }
        }
      }

      .intro-right {
        margin-top: 1px;
        margin-left: 5px;
        background: #F5F5F5;
        width: 240px;
        height: 460px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .user {
          border-radius: 5px;
          background-color: #FFFFFF;
          margin-bottom: 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          justify-content: space-around;
          align-items: center;
          height: 262px;
          width: 235px;

          img {
            margin-top: 10px;
            text-align: center;
            width: 47px;
            height: 47px;
            border-radius: 50%;
            border: 4px solid #E5E5E5
          }

          .username {
            padding-top: 10px;
            font-size: 16px;
            text-align: center;
            font-weight: 500;
            white-space: nowrap;
            width: 6em;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 auto;
            padding-bottom: 5px;
            color: #6c757d;
          }

          .login-button {
            height: 40px;
            width: 118px;
            text-align: center;
            margin: 5px auto 15px auto;
            background: #fff;
            border: 1px solid #e5e5e5;
            border-radius: 40px;
            font-size: 14px;
            color: #333;
            transition: background-color 0.5s;
            display: block;
            line-height: 38px;
          }
        }

        .code {
          // 好的办法是加 用padding  box-sizing: border-box;
          border-radius: 5px;
          background-color: #FFFFFF;
          width: 235px;
          height: 194px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          img {
            width: 100px;
            height: 100px;
          }

          .app-name {
            font-size: 16px;
            color: #222222;
            font-weight: 500;
          }
        }
      }


    }

    .shop-recommend {
      display: flex;
      align-items: center;
      margin-top: 5px;

      .recom-left {
        width: 200px;
        height: 180px;
        //border: 1px solid #E5E5E5;
        display: flex;
        margin-right: 10px;
        background-color: #FFFFFF;
        justify-content: center;
        align-items: center;

        img {
          width: 100px;
          height: 100px;
        }
      }

      .recom-right {
        width: 990px;
        height: 180px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .recom-list {
          width: 235px;
          height: 180px;
          background-color: #FFFFFF;

          .recom-img {
            width: 160px;
            height: 160px;
            margin: 0 auto;

            a {
              &:last-child {
                margin-right: 0;
              }

              img {
                margin-top: 5px;
                height: 100%;
                width: 100%;
              }
            }
          }
        }


      }
    }

    .notice {
      display: flex;
      align-items: center;
      margin: 10px 0;
      padding: 5px 0;
      height: 35px;
      line-height: 35px;
      background: #FFFFFF;

      span {
        margin-left: 10px;
        margin-right: 5px;
        color: #FF6600;
        font-size: 16px;
        font-weight: bold;
      }

      p {
        margin: 0 10px;
        font-size: 14px;
      }

      img {
        width: 15px;
        height: 15px;
      }
    }

    .shop-new {
      margin-top: 5px;
      height: 350px;
      display: flex;
      flex-direction: column;

      .cate-word {
        padding: 15px 0;
        font-size: 22px;
        height: 21px;
        line-height: 21px;
        color: #333;
      }

      .wrap-shop {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .new-intro {
          width: 200px;
          height: 280px;
          background: #FFFFFF;
          margin-right: 10px;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;

          img {
            height: 100px;
            width: 100px;
          }

          p {
            font-size: 16px;
            font-weight: bold;
            color: #FF6600;
            padding-top: 20px;
          }
        }

        .new-list {
          // https://www.jianshu.com/p/e8f236fcf515
          // 换行布局 wrap
          display: flex;
          width: 990px;
          justify-content: space-between;
          text-align: center;
          flex-wrap: wrap;

          .shop-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            background-color: #FFFFFF;
            width: 236px;
            height: 280px;

            .flag {
              display: inline-block;
              width: 67px;
              color: #FFFFFF;
              height: 24px;
              font-size: 14px;
              line-height: 24px;
              background-color: aquamarine;

              &.new-pro {
                background-color: #80c58a;
              }

              &.kill-pro {
                background-color: #FF6600;
              }
            }

            .item-img {
              width: 160px;
              height: 160px;
              margin: 0 auto;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .item-info {
              .title {
                //margin-top: 10px;
                font-size: 14px;
                color: #333;
                padding: 0 8px;
                line-height: 20px;
                font-weight: 700;
              }

              .desc {
                color: #999;
                line-height: 13px;
                margin: 10px auto 13px
              }

              .price {
                color: #FF6600;
                font-size: 14px;
                font-weight: 700;
                //cursor: pointer;

                //&:after {
                //  // 垂直居中
                //  vertical-align: middle;
                //  margin-left: 3px;
                //  content: ' ';
                //  display: inline-block;
                //  width: 28px;
                //  height: 28px;
                //  background: url("~@/static/imgs/cart (2).png") no-repeat center;
                //  background-size: 25px;
                //}
              }
            }

            //  https://blog.csdn.net/tenggeer0789/article/details/89478859
            // 阴影实现
            &:hover {
              -webkit-box-shadow: #ccc 0px 10px 10px;
              -moz-box-shadow: #ccc 0px 10px 10px;
              box-shadow: #ccc 0px 10px 10px;
              transition: all .2s;
            }
          }

        }
      }
    }

    .shop-category {
      // 注意需要使用height来撑高度 而不是margin-bottom
      margin-top: 5px;
      // 780px
      height: 680px;
      display: flex;
      flex-direction: column;

      .cate-word {
        padding: 20px 0;
        font-size: 22px;
        height: 21px;
        line-height: 21px;
        color: #333;
      }

      .wrap-category {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 600px;

        .brandlist {
          height: 600px;
          width: 200px;
          background: #FFFFFF;
          margin-right: 10px;
          display: flex;
          align-items: center;
          flex-direction: column;

          .brand {
            margin-top: 10px;
            height: 100px;
            width: 100px;
            margin-bottom: 10px;
            background: #FFFFFF;


            img {
              width: 100%;
              height: 100%;
            }
          }

        }

        .category-list {

          display: flex;
          width: 990px;
          height: 600px;
          justify-content: space-between;
          text-align: center;
          flex-wrap: wrap;
          align-content: space-between;

          .shop-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            background-color: #FFFFFF;
            width: 236px;
            height: 295px;
            //margin-bottom: 10px;

            .flag {
              display: inline-block;
              width: 67px;
              color: #FFFFFF;
              height: 24px;
              font-size: 14px;
              line-height: 24px;
              background-color: aquamarine;

              &.new-pro {
                background-color: #80c58a;
              }

              &.kill-pro {
                background-color: #FF6600;
              }
            }

            .item-img {
              //padding-top: 10px;
              width: 160px;
              height: 160px;
              margin: 0 auto;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .item-info {
              .title {
                margin-top: 10px;
                font-size: 14px;
                color: #333;
                padding: 0 8px;
                line-height: 20px;
                font-weight: 700;
              }

              .desc {
                color: #999;
                line-height: 13px;
                margin: 10px auto 13px
              }

              .price {
                color: #FF6600;
                font-size: 14px;
                font-weight: 700;
                //cursor: pointer;

                //&:after {
                //  // 垂直居中
                //  vertical-align: middle;
                //  margin-left: 3px;
                //  content: ' ';
                //  display: inline-block;
                //  width: 28px;
                //  height: 28px;
                //  background: url("~@/static/imgs/cart (2).png") no-repeat center;
                //  background-size: 25px;
                //}
              }
            }

            //  https://blog.csdn.net/tenggeer0789/article/details/89478859
            // 阴影实现
            &:hover {
              -webkit-box-shadow: #ccc 0px 10px 10px;
              -moz-box-shadow: #ccc 0px 10px 10px;
              box-shadow: #ccc 0px 10px 10px;
              transition: all .2s;
            }
          }
        }
      }

      //.ads {
      //  margin-top: 20px;
      //  height: 100px;
      //
      //  img {
      //    height: 100%;
      //    width: 100%;
      //  }
      //}
    }

    .shop-guess {
      margin-top: 5px;
      height: 380px;
      display: flex;
      flex-direction: column;

      .cate-word {
        padding: 15px 0;
        font-size: 22px;
        height: 21px;
        line-height: 21px;
        color: #333;
      }

      .wrap-shop {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .new-list {
          // https://www.jianshu.com/p/e8f236fcf515
          // 换行布局 wrap
          display: flex;
          width: 1190px;
          justify-content: space-between;
          text-align: center;
          flex-wrap: wrap;

          .shop-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            background-color: #FFFFFF;
            width: 230px;
            height: 280px;

            .flag {
              display: inline-block;
              width: 67px;
              color: #FFFFFF;
              height: 24px;
              font-size: 14px;
              line-height: 24px;
              background-color: aquamarine;

              &.new-pro {
                background-color: #80c58a;
              }

              &.kill-pro {
                background-color: #FF6600;
              }
            }

            .item-img {
              width: 160px;
              height: 160px;
              margin: 0 auto;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .item-info {
              .title {
                font-size: 14px;
                color: #333;
                padding: 0 8px;
                line-height: 20px;
                font-weight: 700;
              }

              .desc {
                color: #999;
                line-height: 13px;
                margin: 10px auto 13px
              }

              .price {
                color: #FF6600;
                font-size: 14px;
                font-weight: 700;
                //cursor: pointer;

                //&:after {
                //  // 垂直居中
                //  vertical-align: middle;
                //  margin-left: 3px;
                //  content: ' ';
                //  display: inline-block;
                //  width: 28px;
                //  height: 28px;
                //  background: url("~@/static/imgs/cart (2).png") no-repeat center;
                //  background-size: 25px;
                //}
              }
            }

            //  https://blog.csdn.net/tenggeer0789/article/details/89478859
            // 阴影实现
            &:hover {
              -webkit-box-shadow: #ccc 0 10px 10px;
              -moz-box-shadow: #ccc 0 10px 10px;
              box-shadow: #ccc 0 10px 10px;
              transition: all .2s;
            }
          }

        }
      }
    }
  }

}
</style>
