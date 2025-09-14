<template>
  <div class="detail">
    <div class="container" v-if="errorFlag">
      <div class="product">
        <div class="crumb">
          <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ good.cateName }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ good.title }}</el-breadcrumb-item>
          </el-breadcrumb> -->
        </div>
        <div class="content">
          <div class="left">
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
                <a href="javascript:;">
                  <img :src="item">
                </a>
              </SwiperSlide>
            </Swiper>
          </div>
          <div class="right">
            <h2 class="item-title" v-html="good.title"></h2>
            <p class="item-info">
              {{ good.desc }}
            </p>
            <div class="item-price">{{ soldPrice }}元
              <!--              <span class="del">{{ marketPrice }}元</span>-->
            </div>
            <div class="line"></div>

            <!--            <div class="item-version" v-for="(item, idx) in t2" :key="idx">-->
            <!--              <h2>{{ item }}</h2>-->
            <!--              <div class="info-list">-->
            <!--                <div class="phone"-->
            <!--                     v-for="(param,idx1) in t1" :key="idx1" :data-id="param['skuId']" @click="swapGood(param)">-->
            <!--                  {{ param[item] }}-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->

            <!--            <div class="item-version" v-for="(item, idx) in getDict(good.param)" :key="idx">-->
            <!--              <h2>{{ idx }}</h2>-->
            <!--              <div class="info-list">-->
            <!--                <div class="phone"-->
            <!--                     v-for="(param,idx1) in item" :key="idx1">-->
            <!--                  {{ param }}-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->


            <!--            <div class="item-version">-->
            <!--              <h2>产品</h2>-->
            <!--              <div class="info-list">-->
            <!--                <div class="phone" :class="{'checked':version===item.id}" @click="getVersion(item.id)"-->
            <!--                     v-for="item in good.params" :key="item.id">-->
            <!--                  {{ getTitle(item.params) }}-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->

            <!--            2021/08/02 对新的api进行适配-->
            <div class="item-version">
              <h2>产品</h2>
              <div class="info-list">
                <div class="phone" :class="{'checked':version===item.id}" @click="getVersion(item.id)"
                     v-for="item in good.params" :key="item.id">
                  <template v-for="k in item.params">
                    {{ k["value"] }}
                  </template>
                </div>
              </div>
            </div>

            <!--            <template>-->
            <!--              <div class="item-version">-->
            <!--                <h2>规格</h2>-->
            <!--                <div class="info-list">-->
            <!--                  <div class="phone">6GB+64GB 全网通</div>-->
            <!--                  <div class="phone">4GB+64GB 移动4G</div>-->
            <!--                  <div class="phone">6GB+64GB 全网通</div>-->
            <!--                  <div class="phone">4GB+64GB 移动4G</div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </template>-->

            <div class="item-nums">
              <h2>数量</h2>
              <!-- <el-input-number v-model="num" @change="handleChange" :min="1" :max="10"
                               class="num-right"></el-input-number> -->
              <input type="number" v-model="num" @change="handleChange" :min="1" :max="10" class="num-right">

            </div>
            <template v-if="productName">
              <div class="total">
                <div class="phone-info">

                  <div class="fl" v-html="productName"></div>
                  <div class="fr">价格：{{ productPrice * num }}元</div>

                </div>
              </div>
            </template>
            <div class="btn-submit">
              <template v-if="stockStatus === 0 ">
                <div class="btn-1" @click="goToOrder(version)"><a href="javascript:;" class="btn">立即购买</a></div>
                <div class="btn-2" @click="addCart(version)"><a href="javascript:;" class="btn">加入购物车</a></div>
              </template>
              <template v-else>
                <div class="btn-1" style="background-color: #999999"><a
                    href="javascript:;" class="btn" @click="outStcok(good.id)">库存不足</a></div>
                <div class="btn-2" @click="notifyGood(good.id)"><a href="javascript:;" class="btn">到货通知</a></div>
              </template>

              <template v-if="this.$store.state.token">
                <template v-if="good.is_col">
                  <div class="btn-3"><a href="javascript:;" @click="collected" class="btn">已搜藏</a></div>
                </template>
                <template v-else>
                  <div class="btn-3" @click="collectProduct(good.id)"><a href="javascript:;" class="btn">搜藏</a></div>
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="desc">
        <div class="left">
          <!--         to-do: 待添加功能-->
          <!--          <div class="brand">-->
          <!--            <div class="brand-title">{{ good.brandName }}</div>-->
          <!--            <a :href="'/brand/'+good.brandId" target="_blank"> <img v-lazy="good.brandLogo" alt=""></a>-->
          <!--          </div>-->
          <div class="hot">
            <div class="hot-title">热卖推荐</div>
            <div class="new-list">
              <div class="shop-item" v-for="(hot, idx) in sortList" :key="idx">
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
        <div class="right">
          <div class="right-title">商品详情</div>
          <div class="right-content" v-html="good.detail"></div>
        </div>
      </div>

    </div>


    <div class="error" v-else>
      <div class="message">
        <div class="l1">商品已失效，请看看其他商品吧~</div>
        <div class="l2">
          <p>建议您：</p>
          <p> 1、适当减少筛选条件，可以获得更多结果</p>
          <p> 2、尝试其他产品ID</p>
        </div>
      </div>


    </div>
    <!--modal弹窗-->
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
import Modal from "../../components/Modal";
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper'
import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/navigation'
// import {Message} from "element-ui";

export default {
  name: "product",
  components: {
    Swiper,
    SwiperSlide,
    Modal
  },
  data() {
    return {
      t1: [
        {"版本类型": "中国大陆", "存储容量": "16GB", "套餐类型": "套餐一", "机身颜色": "黑色", 'skuId': 111},
        {"版本类型": "中国大陆", "存储容量": "32GB", "套餐类型": "套餐二", "机身颜色": "红色", 'skuId': 222}
      ],
      t2: ['版本类型', '存储容量', '套餐类型', '机身颜色'],
      showModal: false,
      num: 1,
      version: '',
      modules: [Pagination, Navigation, Autoplay],
      sliderList: [],
      good: {
        // 计算属性  先读取  避免报错
        marketPrice: [''],
        soldPrice: [''],
        params: []
      },
      errorFlag: true,
      sortList: []
    }
  },
  computed: {

    marketPrice() {
      let marketPrice = this.good.marketPrice;
      if (marketPrice.length === 1) {
        return marketPrice[0][0];
      } else {
        return marketPrice[0].toString() + '~' + marketPrice.pop().toString()
      }
    },
    soldPrice() {
      let soldPrice = this.good.soldPrice;
      if (soldPrice.length === 1) {
        return soldPrice[0][0];
      } else {
        return soldPrice[0].toString() + '~' + soldPrice.pop().toString()
      }
    },
    productName() {
      // console.log(this.good.params.filter(item => item.id === this.version), 11111111)
      try {
        return this.getTitle(this.good.params.filter(item => item.id === this.version)[0]['params'])
      } catch (err) {
        return ''
      }

    },
    productPrice() {
      // console.log(this.version)
      // console.log(this.good.params.filter(item => item.id === this.version))
      try {
        return this.good.params.filter(item => item.id === this.version)[0]['sold_price'];
      } catch (err) {
        return ''
      }

    },
    stockStatus() {
      // console.log(this.good.params.filter(item => item.id === this.version), 2222)
      // console.log(this.good.params.filter(item => item.id === this.version)[0])
      try {
        return this.good.params.filter(item => item.id === this.version)[0]['status'];
      } catch (err) {
        return 0
      }

    },
  },

  methods: {
    getVersion(val) {
      this.version = val;
      this.axios.get(`/goods/${val}/`).then(res => {
        this.sliderList = [res.data.cover];
      })
    },
    getTitle(val) {
      console.log(val)
      return val['value']

      // const key = Object.keys(val)[1];
      // return val[key]

    },
    swapGood(val) {
      console.log(val)
    },
    getDict(data1) {
      // 提取key  使用key
      let data = [
        {"版本类型": "中国大陆", "存储容量": "16GB", "套餐类型": "套餐一", "机身颜色": "黑色"},
        {"版本类型": "中国大陆", "存储容量": "32GB", "套餐类型": "套餐二", "机身颜色": "红色"},

      ]
      let a = {
        '存储类型': ['16GB', '32GB'],
        '套餐类型': ['套餐一', '套餐二'],
        '机身颜色': ['红色', '黑色'],
        'skuId': []
        // 'su'
      }


      // {
      // "skuId": 69880001836,
      // "产品": "LL再生洗面奶抗皱保湿150ML"
      // }
      console.log(data1)
      const keys = Object.keys(data[0]);
      console.log(keys)
      const temp = {}
      const t1 = []
      for (var i = 0; i < data.length; i++) {
        console.log(data[i])
        for (var j = 0; j < keys.length; j++) {
          if (Object.prototype.hasOwnProperty.call(temp, keys[j])) {
            t1.push(data[i][keys[j]])
            temp[keys[j]] = t1
          } else {
            temp[keys[j]] = t1
          }

        }
      }

      console.log(temp)
      return a;
    },
    getSortProduct() {
      this.axios.get('/products/', {
        params: {
          is_new: 1
        }
      }).then((res) => {
        this.sortList = res.data.list.map(item => {
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
    goToOrder(version) {
      // version 是商品id
      if (version === '') {
        // Message.warning('请选择产品或规格')
        console.warn('请选择产品或规格')
        return
      }
      console.log(version, this.num)
      //  直接
      let routeData = this.$router.resolve({name: 'confirm', query: {'gid': version, 'num': this.num}});
      window.open(routeData.href);
      // this.$router.push({path: "confirm", params: {'gid': version, 'num': this.num}})
    },
    outStcok(id) {
      console.log(id);
      // Message.warning('该商品已售罄，正在补货');
      console.warn('该商品已售罄，正在补货');
    },
    notifyGood(id) {
      console.log(id);
      // Message.success('商品到货后我们将以短信的形式通知您');
      console.log('商品到货后我们将以短信的形式通知您');
    },
    // 收藏的是产品 不是商品
    collectProduct(id) {
      console.log(id)
      // if (!this.$store.state.token){
      //   Message.warning('该商品已收藏')
      //   return
      // }
      this.axios.post('/collect/', {
        product: id
      }).then(() => {
        // Message.success('搜藏成功')
        console.log('搜藏成功')
        this.getProduct(id);
      })
    },
    collected() {
      // Message.warning('该商品已收藏')
      console.warn('该商品已收藏')
    },
    getCartNum() {
      this.axios.get('/carts/',).then((res) => {
        this.$store.dispatch('saveCartNums', res.data.total)
      })
    },
    addCart(gid) {
      if (gid === '') {
        // Message.warning('请选择产品或规格')
        console.warn('请选择产品或规格')
        return
      }
      // let good_id = this.good.id;
      this.axios.post('/carts/', {
        csrftoken: this.$cookie.get('csrftoken'),
        goods: gid,
        nums: this.num,
        is_select: true

      }).then((res) => {
        console.log(res);
        this.showModal = true;
        this.getCartNum();
      })

    },
    goToCart() {
      // this.$router.push('/cart');
      let routeData = this.$router.resolve({path: '/cart'});
      window.open(routeData.href, '_blank');
    },
    handleChange(value) {
      if (value === 10) {
        // Message.warning('最大购买数量为10')
        console.warn('最大购买数量为10')
      }
      // console.log(this.productPrice, typeof this.productPrice, value, this.productPrice * value)
      this.num = value;
      // this.productPrice = this.productPrice * value;
    },

    getProduct(id) {
      this.axios.get('/products/' + id + '/').then((res) => {

        this.good = [res.data].map(item => {
          // const paramArr = [];
          return {
            // param: paramArr,
            id: item.id,
            cateName: item.category.name,
            // params:item.goods.filter(item => JSON.parse(item.params)),
            params: item.goods.map(gitem => {
              // var temp = JSON.parse(gitem.params)
              // paramArr.push(temp)
              return {
                'id': gitem.id,
                'params': gitem.params,
                'status': gitem.is_sold,
                'sold_price': gitem.sold_price
              }
            }),
            brandId: item.brand.id,
            brandLogo: item.brand.image,
            brandName: item.brand.en_name,
            title: item.title,
            sn: item.sn,
            desc: '',
            is_col: item.is_col,
            detail: item.detail,
            // marketPrice: `${item.min_price} ~ ${item.max_price}`,
            marketPrice: item.goods.map(item1 => {
              return [item1.market_price].sort()
            }),
            soldPrice: item.goods.map(item1 => {
              return [item1.sold_price].sort()
            })

          }
        })[0];
        // console.log(this.good)
        // this.sliderList = JSON.parse(res.data.images)['images'];
        // this.sliderList = res.data.images.split(',');
        this.sliderList = [res.data.pic];
        document.title = res.data.title + ' - JapanHui'
      })

    },
    init() {
      let flag = this.$route.params
      if (Object.prototype.hasOwnProperty.call(flag, 'id') && flag.id !== "") {
        this.getProduct(flag.id)
      } else {
        this.errorFlag = false;
      }
    }
  },
  mounted() {
    this.init();
    this.getSortProduct()
  }
}


</script>

<style lang="scss">
.detail {
  margin-top: 3px;
  background-color: #FFFFFF;

  .error {
    margin: 0 auto;
    width: 1190px;
    padding: 20px 0;

    .message {

      height: 300px;
      background-color: #FFFFFF;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .l1 {
        font-size: 18px;
        font-weight: bold;
      }

      .l2 {
        margin-top: 20px;
        margin-left: -25px;
      }
    }

    .shop-guess {
      margin-top: 20px;
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
                background-color: aquamarine;
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
                line-height: 14px;
                font-weight: 700;
              }

              .desc {
                color: #999;
                line-height: 13px;
                margin: 6px auto 13px;
              }

              .price {
                color: #FF6600;
                font-size: 14px;
                font-weight: 700;
                cursor: pointer;

                &:after {
                  // 垂直居中
                  vertical-align: middle;
                  margin-left: 3px;
                  content: ' ';
                  display: inline-block;
                  width: 28px;
                  height: 28px;
                  background: url("~@/static/imgs/cart (2).png") no-repeat center;
                  background-size: 25px;
                }
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

  .container {

    width: 1200px;
    margin: 0 auto;


    .product {
      .crumb {
        padding: 10px 0;
        display: flex;
        align-items: center;
        height: 30px;
      }

      .content {
        display: flex;
        justify-content: center;

        .left {
          width: 600px;

          .swiper-container {
            width: 500px;
            height: 500px;

            img {
              width: 100%;
              height: 100%;
            }
          }


        }

        .right {
          width: 600px;

          .item-title {
            font-size: 28px;
            padding-top: 30px;
            padding-bottom: 16px;
            //height: 26px;
          }

          .item-info {
            font-size: 14px;
            //height: 36px;
          }

          .item-price {
            margin-top: 15px;
            font-size: 20px;
            color: #ff6700;
            height: 19px;

            .del {
              font-size: 16px;
              color: #999;
              margin-left: 10px;
              text-decoration: line-through;
            }
          }

          .line {
            margin-top: 20px;
            border-top: 2px solid #F8F8F8;
          }

          .item-nums {
            h2 {
              font-size: 20px;
              margin: 15px 0;
            }

            display: flex;
            justify-content: space-between;
            align-items: center;

            .num-right {
              margin-top: 10px;
              margin-right: 10px;
            }
          }

          .item-version {
            h2 {
              font-size: 20px;
              margin: 15px 0;
            }

            .info-list {
              width: 600px;
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;

              .checked {
                border: 1px solid #ff6600 !important;
              }

              .phone {
                margin: 10px;
                width: 600px;
                min-height: 50px;
                line-height: 50px;
                font-size: 16px;
                color: #333;
                border: 1px solid #e5e5e5;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                text-align: center;
                cursor: pointer;
              }
            }
          }

          .total {
            height: 60px;
            background: #fafafa;
            padding: 20px 33px 24px 30px;
            font-size: 14px;
            margin: 20px 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;

            .phone-info {
              min-height: 30px !important;

              .fl {
                float: left;
              }

              .fr {
                color: #ff6600;
                font-weight: bold;
                float: right;
                font-size: 18px;
              }
            }
          }

          .btn-submit {
            margin-top: 30px;
            width: 600px;
            height: 54px;
            line-height: 54px;
            font-size: 16px;
            //background-color: #ff6600;
            //text-align: center;
            display: flex;
            justify-content: flex-start;

            .btn-1 {
              width: 150px;
              height: 50px;
              line-height: 50px;
              background-color: #ff6600;
              text-align: center;
              cursor: pointer;

              a {
                color: #FFFFFF;
              }
            }

            .btn-2 {
              width: 150px;
              height: 50px;
              line-height: 50px;
              background-color: #ff6600;
              text-align: center;
              margin-left: 30px;
              cursor: pointer;

              a {
                color: #FFFFFF;
              }
            }

            .btn-3 {
              width: 100px;
              height: 50px;
              line-height: 50px;
              background-color: #999999;
              text-align: center;
              margin-left: 30px;
              cursor: pointer;

              a {
                color: #FFFFFF;
              }
            }

            .btn-4 {
              width: 150px;
              height: 50px;
              line-height: 50px;
              background-color: #ff6600;
              text-align: center;
              //margin-left: 30px;
              cursor: pointer;

              a {
                color: #FFFFFF;
              }
            }

          }
        }
      }
    }

    .line {
      margin-top: 40px;
      border-top: 2px solid #F8F8F8;
    }


    .desc {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .left {
        width: 200px;
        min-height: 500px;
        border: 2px solid #F5F5F5;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        .brand {
          .brand-title {
            margin-top: 10px;
            font-size: 1.2rem;
            font-weight: bold;
            padding-bottom: 5px;
            text-align: center;
            border-bottom: 2px solid #F5F5F5;
          }

          width: 180px;
          height: 180px;
          border-bottom: 2px solid #F5F5F5;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .hot {

          .hot-title {
            margin-top: 10px;
            font-size: 1.2rem;
            text-align: center;
            font-weight: bold;
            padding-bottom: 5px;
            border-bottom: 3px solid #F5F5F5;
          }

          .new-list {
            // https://www.jianshu.com/p/e8f236fcf515
            // 换行布局 wrap
            display: flex;
            width: 180px;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;


            .shop-item {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              margin: 5px 0;
              background-color: #FFFFFF;
              width: 170px;
              min-height: 250px;
              text-align: center;
              border-bottom: 2px solid #F5F5F5;

              &:last-child {
                border-bottom: none;
              }

              .flag {
                display: inline-block;
                width: 67px;
                color: #FFFFFF;
                height: 24px;
                font-size: 14px;
                line-height: 24px;
                background-color: aquamarine;

                &.new-pro {
                  background-color: aquamarine;
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
                display: flex;
                flex-direction: column;
                align-items: center;

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
                  margin-top: 10px;

                }

                .price {
                  margin-top: 10px;
                  color: #FF6600;
                  font-size: 14px;
                  font-weight: 700;
                }
              }


            }

          }
        }
      }

      .right {
        width: 980px;
        border: 2px solid #F5F5F5;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .right-title {
          height: 50px;
          padding-left: 30px;
          line-height: 50px;
          background-color: #F5F5F5;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .right-content {
          font-size: 16px;
          padding: 25px;
        }
      }
    }
  }
}
</style>
