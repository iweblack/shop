<template>
  <div>
    <MyHeader title="我的购物车"></MyHeader>
    <div class="cart">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <!--            <li class="col-1"><span class="checkbox checked"></span>全选</li>-->
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(cart, idx) in carts" :key="idx">
              <div class="item-check">
                <span class="checkbox" :class="{'checked':cart.is_select}"
                      @click="updateSelect(cart.goods.id,cart.is_select)"></span>
              </div>
              <div class="item-name" style="cursor: pointer">
                <a :href='"/product/"+cart.goods.be_product'>
                  <img :src="cart.goods.cover"
                       alt="">
                  <span style="color: black">{{ getTitle(cart.goods.params) }}</span>
                </a>
              </div>
              <div class="item-price">{{ cart.goods.sold_price }}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(cart.goods.id, cart.nums, '-')">-</a>
                  <span>{{ cart.nums }}</span>
                  <a href="javascript:;" @click="updateCart(cart.goods.id, cart.nums, '+')">+</a>
                </div>
              </div>
              <div class="item-total">{{ cart.goods.sold_price * cart.nums }}</div>
              <div class="item-del" @click="deleteCart(cart.goods.id)"></div>
            </li>

          </ul>
        </div>

        <div class="order-wrap">
          <div class="cart-tip">
            <a href="/index.html">继续购物</a>
            共<span>{{ cartsNums }}</span>件商品，已选择<span>{{ selectNum }}</span>件
          </div>
          <div class="total">
            合计：<span>{{ totalPrice }}</span>元
            <a href="javascript:;" class="btn" @click="goOrder()">去结算</a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import MyHeader from "../../components/MyHeader";
// import {Message} from "element-ui";
// import JWT from "../storage/index"

export default {
  name: "cart",
  components: {
    MyHeader
  },
  data() {
    return {
      carts: [],
      cartsNums: 0
    }
  },
  computed: {
    selectNum() {
      return this.carts.filter(item => item.is_select).length;
    },
    totalPrice() {
      // return item.nums * item.goods.shop_price
      let sum = 0;
      let total = this.carts.filter(item => item.is_select).map(filterItem => {
        return filterItem.nums * filterItem.goods.sold_price
      })
      total.forEach(price => {
        sum += price;
      })
      return sum
    }
  },
  created() {
    document.title = '购物车 - JapanHui';
  },
  methods: {
    getTitle(val) {
      return val[0]['value']
      // console.log(val)
      // const key = Object.keys(val)[1]
      // console.log(key)
      // return val[key]

    },
    // this.$cookie.get('token')
    //  headers: {'Authorization': "JWT " + this.$store.state.token}
    // 由main.js 统一控制 header jwt

    getCart() {
      this.axios.get('/carts/',).then((res) => {
        console.log(res)
        this.carts = res.data.list;
        this.cartsNums = res.data.total;
      })

    },
    updateCart(goods, nums, type) {
      if (type === '-') {
        nums = --nums
        if (nums === 0) {
          // Message.warning('商品至少保留一件')
          console.warn('商品至少保留一件')
          return
        }
        this.axios.patch(`/carts/${goods}/`, {
          // goods: goods,
          nums: nums
        }).then(() => {
          this.getCart();
        })
      } else {
        nums = ++nums
        this.axios.patch(`/carts/${goods}/`, {
          // goods: goods,
          nums: nums
        }).then(() => {
          this.getCart();
        })
      }
    },
    deleteCart(goods_id) {
      this.axios.delete(`/carts/${goods_id}/`).then(() => {
        // Message.success('删除成功')
        console.log('删除成功')
        this.getCart();
      })

    },
    updateSelect(goods_id, isSelect) {
      console.log(isSelect, 1)
      let flag = !isSelect;
      this.axios.patch(`/carts/${goods_id}/`, {
        is_select: flag
      }).then((res) => {
        let is_select = res.data.is_select
        console.log(is_select)
        this.getCart();
      })
    },
    goOrder() {
      if (this.cartsNums === 0) {
        // Message.warning('购物车为空，请添加商品')
        console.warn('购物车为空，请添加商品')
        return;
      }

      // 全false 为true    有一个就是false
      let isCheck = this.carts.every(item => !item.is_select);
      if (isCheck) {
        // Message.warning('请至少选择一件商品')
        console.warn('请至少选择一件商品')
        return;
      }
      this.$router.push('/confirm')
    }
  },
  mounted() {
    this.getCart();
  }
}
</script>

<style lang="scss">
.cart {
  padding: 20px 0 50px 0;
  background-color: #F5F5F5;

  .container {
    width: 1200px;
    margin: 0 auto;

    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999;
      text-align: center;

      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #E5E5E5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;

        &.checked {
          background: url('~@/static/imgs/icon-gou.png') #FF6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }

      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;

        // flex 布局  flex按照数字加起来百分比占位
        .col-1 {
          flex: 1;
        }

        .col-2 {
          flex: 2;
        }

        .col-3 {
          flex: 3;
        }


      }

      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #E5E5E5;
          font-size: 16px;

          .item-check {
            flex: 1;
          }

          .item-name {
            flex: 3;
            font-size: 18px;
            color: #333333;
            display: flex;
            align-items: center;

            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }

            span {
              margin-left: 30px;
            }
          }

          .item-price {
            flex: 1;
            color: #333333;
          }

          .item-num {
            flex: 2;

            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #E5E5E5;
              font-size: 14px;

              a {
                display: inline-block;
                width: 50px;
                color: #333333;
              }

              span {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
            }
          }

          .item-total {
            flex: 1;
            color: #FF6600;
          }

          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url('~@/static/imgs/icon-close.png') no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }


    }

    .order-wrap {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .cart-tip {
        margin-left: 29px;

        a {
          color: #666666;
          margin-right: 37px;
        }

        span {
          color: #FF6600;
          margin: 0 5px;
        }
      }

      .total {
        font-size: 14px;
        color: #FF6600;

        span {
          font-size: 24px;
        }

        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }

        .btn {
          display: inline-block;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background-color: #f60;
          color: #fff;
          border: none;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
