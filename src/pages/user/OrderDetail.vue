<template>
  <div class="order-detail">
    <div class="container">
      <div class="crumb">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb> -->
      </div>
      <div class="order-detail-body">
        <Side></Side>
        <div class="order-detail-content">
          <div class="wrap">
            <div class="order-detail-title">
              <h1>订单详情</h1>
              <div class="order-status">
                <h2 class="subtitle">订单号：{{ orderDetail.order_sn }}</h2>
                <div class="flex-list">
                  <div class="list" v-if="orderDetail.status ==='PAYING'" @click="cancleOrder(orderDetail.order_sn )">
                    取消订单
                  </div>
                  <div class="list" v-else style="display: none"></div>
                  <div class="list" @click="goPay(orderDetail.order_sn,orderDetail.status)">{{
                      orderDetail.status | judgeStatus
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div class="line"></div>
            <div class="order-detail-body">
              <div class="body-status">
                {{ orderDetail.status | getPayStatus }}
              </div>
              <!--              <div class="body-progress">-->
              <!--                <div class="order-progress">-->
              <!--                  <ol class="progress-list">-->
              <!--                    <li class="step step-active">-->
              <!--                      <div class="progress"><span class="text">下单</span></div>-->
              <!--                      <div class="info">05月01日 11:42</div>-->
              <!--                    </li>-->
              <!--                    <li class="step">-->
              <!--                      <div class="progress"><span class="text">付款</span></div>-->
              <!--                      <div class="info"></div>-->
              <!--                    </li>-->
              <!--                    <li class="step">-->
              <!--                      <div class="progress"><span class="text">配货</span></div>-->
              <!--                      <div class="info"></div>-->
              <!--                    </li>-->
              <!--                    <li class="step">-->
              <!--                      <div class="progress"><span class="text">出库</span></div>-->
              <!--                      <div class="info"></div>-->
              <!--                    </li>-->
              <!--                    <li class="step">-->
              <!--                      <div class="progress"><span class="text">交易成功</span></div>-->
              <!--                      <div class="info"></div>-->
              <!--                    </li>-->
              <!--                  </ol>-->
              <!--                </div>-->
              <!--              </div>-->
              <div class="body-list">
                <ul>
                  <li v-for="(good, idx) in orderDetail.goods" :key="idx">
                    <div class="list-img"><img
                        :src="good.goods.cover" :alt="good.goods.classify">
                    </div>
                    <p class="list-title">{{ getTitle(good.goods.params) }}</p>
                    <p class="list-price">{{ good.goods.sold_price }}元 × {{ good.nums }}</p>
                  </li>
                  <div class="line"></div>
                </ul>
              </div>
              <div class="body-name">
                <div class="title">收货信息</div>
                <div class="list">姓名：{{ orderDetail.signer_name }}</div>
                <div class="list">联系电话：{{ orderDetail.singer_mobile }}</div>
                <div class="list">收货地址：{{ orderDetail.address }}</div>
              </div>
              <div class="line"></div>
              <div class="body-pay">
                <div class="title">支付方式</div>
                <div class="list">
                  支付方式：{{ orderDetail.pay_type | getPayType }}
                </div>
              </div>
              <div class="line"></div>
              <div class="body-total">
                <div class="item">
                  <span class="item-name">商品件数：</span>
                  <span class="item-val">{{ totalNums }}件</span>
                </div>
                <div class="item">
                  <span class="item-name">商品总价：</span>
                  <span class="item-val">{{ totalPrice }}元</span>
                </div>
                <!--              <div class="item">-->
                <!--                <span class="item-name">优惠活动：</span>-->
                <!--                <span class="item-val">0元</span>-->
                <!--              </div>-->
                <div class="item">
                  <span class="item-name">运费：</span>
                  <span class="item-val">{{ totalPostAge }}元</span>
                </div>
                <div class="item-total">
                  <span class="item-name">应付总额：</span>
                  <span class="item-val">{{ totalPrice + totalPostAge }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Side from "../../components/side";
import {formatDate} from "../../utils/date";
// import {Message} from 'element-ui'

export default {
  name: "message",
  components: {
    Side
  },
  data() {
    return {
      orderDetail: {},
      orderSn: '',
      detailList: []
    }
  },
  filters: {
    judgeStatus(type) {
      if (type === 'PAYING') {
        return '立即付款'
      } else if (type === 'DELIVERY') {
        return '催促发货'
      } else if (type === 'GOOD') {
        return '查看物流'
      } else if (type === 'COMMENT') {
        return '马上评价'
      } else if (type === 'SUCCESS') {
        return '申请退货'
      } else {
        return '订单关闭'
      }
    },
    getPayStatus(type) {
      if (type === 'PAYING') {
        return '待付款'
      } else if (type === 'DELIVERY') {
        return '待发货'
      } else if (type === 'GOOD') {
        return '待收货'
      } else if (type === 'COMMENT') {
        return '待评价'
      } else if (type === 'SUCCESS') {
        return '已收货'
      } else {
        return '已关闭'
      }
    },
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }, getPayType(type) {
      if (type === 'alipay') {
        return '支付宝'
      } else {
        return '微信支付'
      }
    },
  },
  mounted() {
    this.getOrderDetail();
  },
  created() {
    document.title = '订单详情 - JapanHui';
  },
  computed: {

    totalPrice() {
      // return item.nums * item.goods.shop_price
      let sum = 0;
      let total = this.detailList.map(filterItem => {
        return filterItem.nums * filterItem.goods.sold_price
      })
      total.forEach(price => {
        sum += price;
      })
      return sum
    },
    totalNums() {
      // return item.nums * item.goods.shop_price
      let sum = 0;
      let total = this.detailList.map(filterItem => {
        return filterItem.nums
      })
      total.forEach(num => {
        sum += num;
      })
      return sum
    },
    totalPostAge() {
      // return item.nums * item.goods.shop_price
      let sum = 0;
      let total = this.detailList.map(filterItem => {
        return filterItem.nums * filterItem.goods.weight;
      })
      total.forEach(weight => {
        sum += weight;
      })
      return sum
    }
  },
  methods: {
    cancleOrder(val) {
      console.log(val)
      this.axios.delete(`/orders/${val}/`).then(res => {
        console.log(res)
        // Message.success('订单取消成功')
        console.log('订单取消成功')
      })
    },
    getTitle(val) {
      return val[0]['value']
      // console.log(val)
      // const key = Object.keys(val)[1]
      // console.log(key)
      // return val[key]

    },
    goPay(orderSn, status) {
      // 根据状态判断一下
      if (status === 'PAYING') {
        let routeData = this.$router.resolve({name: 'pay', query: {orderSn: orderSn}});
        window.open(routeData.href, '_blank');
      } else if (status === 'SUCCESS') {
        // if 大于15天  提示不可申请退款  else 就进入售后弹窗
      } else if (status === 'DELIVERY') {
        // Message.success('催促成功，我们将优先为您发货')
        console.log('催促成功，我们将优先为您发货')
      } else if (status === 'GOOD') {
        // 弹出 modal 窗口
      } else if (status === 'COMMENT') {
        // 进入评价页面
      }
    },
    getOrderDetail() {
      let orderSn = this.$route.query.orderSn;
      this.axios.get('/orders/', {
        params: {
          order_sn: orderSn
        }
      }).then((res) => {
        if (res.data.total === 0) {
          // Message.warning('请核对订单号')
          console.warn('请核对订单号')
        } else {
          this.orderDetail = res.data.list[0];
          this.detailList = res.data.list[0].goods;
          this.orderSn = orderSn;
        }
      })
    }
  }
}
</script>

<style lang="scss">

.order-detail {
  background-color: #F5F5F5;

  .crumb {
    padding: 10px 0;
    display: flex;
    align-items: center;
    height: 30px;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .order-detail-body {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;

      .order-detail-content {
        margin-bottom: 40px;
        background-color: #FFFFFF;
        width: 950px;

        .wrap {
          margin-top: 20px;
          margin-left: 25px;

          .line {
            margin-bottom: 20px;
            border-bottom: 2px solid #F8F8F8;
          }

          .order-detail-title {
            h1 {
              margin: 0;
              font-size: 30px;
              font-weight: 400;
              line-height: 68px;
              color: #757575;
            }

            .order-status {
              margin-bottom: 5px;

              .subtitle {
                font-size: 18px;
                font-weight: 400;
                color: #333;
              }

              display: flex;
              justify-content: space-between;

              .flex-list {
                display: flex;
                justify-content: flex-start;
                margin-right: 20px;


                .list {
                  // 注意顺序  & 是在元素下
                  margin-right: 20px;
                  margin-bottom: 10px;
                  height: 30px;
                  line-height: 30px;
                  text-align: center;
                  color: #FFFFFF;
                  width: 120px;
                  background-color: #ff6600;
                  cursor: pointer;

                  &:first-child {
                    background-color: #999999;
                  }
                }
              }
            }
          }

          .order-detail-body {
            display: flex;
            flex-direction: column;

            .body-status {
              font-size: 18px;
              color: #ff6600;
              margin-bottom: 30px;
              margin-left: 10px;
            }

            .body-progress {
              margin-left: -30px;

              .order-progress {
                height: 65px;


                .progress-list {
                  width: 880px;
                  height: 20px;
                  margin: 0 auto;
                  padding: 0;
                  list-style-type: none;
                  border-radius: 20px;
                  font-size: 12px;
                  line-height: 20px;
                  text-align: center;
                  color: #424242;
                  background-color: #eee;
                  display: flex;
                  justify-content: space-between;


                  li {
                    flex: 1;

                    .info {
                      height: 40px;
                      line-height: 40px;
                    }
                  }


                }
              }
            }

            .body-list {
              margin-left: 5px;
              color: #333333;
              font-size: 15px;

              ul {

                li {
                  display: flex;
                  flex-direction: row;
                  align-items: center;

                  .list-img {
                    width: 100px;
                    height: 100px;
                    margin-right: 50px;

                    img {
                      width: 100%;
                      height: 100%;
                    }
                  }

                  .list-title {
                    margin-right: 50px;
                  }

                  .list-price {
                  }
                }

                .line {
                  margin-top: 20px;
                  margin-bottom: 20px;
                  border-bottom: 2px solid #F8F8F8;
                }
              }
            }

            .body-name, .body-pay {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              margin-left: 5px;

              .title {
                font-size: 1.5rem;
                color: #333333;
                margin-bottom: 15px;
              }

              .list {
                font-size: 15px;
                color: #757575;
                margin: 5px 0;

                &:last-child {
                  margin-bottom: 20px;
                }
              }
            }

            .body-total {

              padding: 30px 44px 10px 10px;
              //border-bottom: 1px solid #f5f5f5;
              text-align: right;
              font-size: 16px;
              color: #666666;

              .item-val {
                color: #FF6700;
              }

              .item {
                line-height: 15px;
                margin-bottom: 12px;
              }

              .item-val {
                display: inline-block;
                width: 100px;
              }

              .item-total {
                .item-val {
                  font-size: 28px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
