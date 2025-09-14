<template>
  <div>
    <MyHeader title="订单支付"></MyHeader>
    <div class="pay">
      <div class="wrapper">
        <div class="container">
          <div class="order-wrap">
            <div class="item-order">
              <div class="icon-succ"></div>
              <div class="order-info">
                <h2>订单提交成功！</h2>
                <p>请在<span>120分钟</span>内完成支付, 超时后将取消订单</p>
                <p>收货信息：{{ orderDetail.address }}</p>
              </div>
              <div class="order-total">
                <p>应付总额：<span>{{ orderDetail.order_mount }}</span>元</p>
                <p>订单详情<em class="icon-down" :class="{'up':showDetail}" @click="showDetail=!showDetail"></em></p>
              </div>
            </div>
            <div class="item-detail" v-if="showDetail">
              <div class="item">
                <div class="detail-title">订单号：</div>
                <div class="detail-info theme-color">{{ orderDetail.order_sn }}</div>
              </div>
              <div class="item">
                <div class="detail-title">收货信息：</div>
                <div class="detail-info">{{ orderDetail.address }}</div>
              </div>
              <div class="item good">
                <div class="detail-title">商品名称：</div>
                <div class="detail-info">
                  <ul>
                    <li v-for="(good,index) in orderDetail.goods" :key="index">
                      <img v-lazy="good.goods.cover"/>&nbsp;&nbsp;&nbsp;{{ good.goods.params[0]["value"] }}
                    </li>
                  </ul>
                </div>
              </div>
              <!--              <div class="item">-->
              <!--                <div class="detail-title">发票信息：</div>-->
              <!--                <div class="detail-info">电子发票 个人</div>-->
              <!--              </div>-->
            </div>
          </div>
          <div class="item-pay">
            <h3>选择以下支付方式付款</h3>
            <div class="pay-way">
              <p>支付平台</p>
              <div class="pay pay-ali" :class="{'checked':payType===1}" @click="paySubmit(1)"></div>
              <div class="pay pay-wechat" :class="{'checked':payType===2}" @click="paySubmit(2)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/MyHeader";
// import {Message} from "element-ui";

export default {
  name: "order",
  components: {
    MyHeader
  },
  data() {
    return {
      up: '',
      payType: '',
      showDetail: false,
      orderDetail: {},
      orderSn: '',
      payUrl: ''
    }
  },
  methods: {
    paySubmit(payType) {
      if (payType === 1) {
        this.payType = 1;
        // console.log('支付宝')
        this.axios.patch(`/orders/${this.orderSn}/`, {
          orderSn: this.orderSn
        }).then((res) => {
          let payUrl = res.data.pay_url;
          window.open(payUrl)
        })
      } else {
        this.payType = 2;
        console.log("微信")
      }
    }

  },
  created() {
    document.title = '订单支付 - JapanHui';
  },
  mounted() {
    let orderSn = this.$route.query.orderSn;
    // console.log(orderSn)
    this.axios.get('/orders/', {
      params: {
        order_sn: orderSn
      }
    }).then((res) => {
      // console.log(res)
      if (res.data.total === 0) {
        // Message.warning('请核对订单号')
        console.warn('请核对订单号')
      } else {
        this.orderDetail = res.data.list[0];
        this.orderSn = orderSn;
      }

    })
  }
}
</script>

<style lang="scss">
.pay {
  background-color: #F5F5F5;

  .wrapper {
    background-color: #F5F5F5;
    padding-top: 30px;
    padding-bottom: 61px;
    margin: 0 auto;
    width: 1200px;

    .order-wrap {
      padding: 62px 50px;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 30px;

      .item-order {
        display: flex;
        align-items: center;

        .icon-succ {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: url('~@/static/imgs/icon-gou.png') #80c58a no-repeat center;
          background-size: 60px;
          margin-right: 40px;
        }

        .order-info {
          margin-right: 248px;

          h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
          }

          p {
            color: #666666;

            span {
              color: #FF6700;
            }
          }
        }

        .order-total {
          & > p:first-child {
            margin-bottom: 30px;
          }

          span {
            font-size: 28px;
            color: #FF6700;
          }

          .icon-down {
            display: inline-block;
            width: 14px;
            height: 10px;
            background: url('~@/static/imgs/icon-down.png') no-repeat center;
            background-size: contain;
            margin-left: 9px;
            transition: all .5s;
            cursor: pointer;

            &.up {
              transform: rotate(180deg);
            }
          }

          .icon-up {
            transform: rotate(180deg);
          }
        }
      }

      .item-detail {
        border-top: 1px solid #D7D7D7;
        padding-top: 47px;
        padding-left: 130px;
        font-size: 14px;
        margin-top: 45px;

        .item {
          margin-bottom: 19px;

          .detail-title {
            float: left;
            width: 100px;
          }

          .detail-info {
            display: inline-block;

            img {
              width: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }

    .item-pay {
      padding: 26px 50px 72px;
      background-color: #ffffff;
      color: #333333;

      h3 {
        font-size: 20px;
        font-weight: 200;
        color: #333333;
        padding-bottom: 24px;
        border-bottom: 1px solid #D7D7D7;
        margin-bottom: 26px;
      }

      .pay-way {
        font-size: 18px;

        .pay {
          display: inline-block;
          width: 188px;
          height: 64px;
          border: 1px solid #D7D7D7;
          cursor: pointer;

          &:last-child {
            margin-left: 20px;
          }

          &.checked {
            border: 1px solid #FF6700 !important;
          }
        }

        .pay-ali {
          background: url('~@/static/imgs/icon-ali.png') no-repeat center;
          background-size: 103px 38px;
          margin-top: 19px;
        }

        .pay-wechat {
          background: url('~@/static/imgs/icon-wechat.png') no-repeat center;
          background-size: 103px 38px;
        }
      }
    }
  }
}
</style>
