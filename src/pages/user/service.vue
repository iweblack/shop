<template>
  <div class="user-order">

    <div class="container">
      <div class="crumb">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>售后列表</el-breadcrumb-item>
        </el-breadcrumb> -->
      </div>
      <div class="user-order-body">
        <Side></Side>
        <div class="user-order-content">
          <div class="wrap">
            <div class="order-title">
              <h1>我的售后</h1>
            </div>
            <div class="order-category">
              <h3 :class="{'checked':orderSelect===''}" @click="filterOrder('')">所有售后</h3>
              <h3 :class="{'checked':orderSelect==='SUCCESS'}" @click="filterOrder('SUCCESS')">售后完成</h3>
              <!--              <h3 :class="{'checked':orderSelect==='PAYING'}" @click="filterOrder('PAYING')">买家退货</h3>-->
              <!--              <h3 :class="{'checked':orderSelect==='DELIVERY'}" @click="filterOrder('DELIVERY')">卖家收货</h3>-->
              <h3 :class="{'checked':orderSelect==='GOOD'}" @click="filterOrder('GOOD')">售后拒绝</h3>
              <!--              <h3 :class="{'checked':orderSelect==='COMMENT'}" @click="filterOrder('COMMENT')">卖家返货</h3>-->
            </div>
            <div class="line"></div>
            <div class="order-list">
              <ul>
                <li v-for="(order,idx) in orderList" :key="idx">
                  <div class="list-header">
                    <p class="pay-status">{{ order.status | getPayStatus }}</p>
                    <div class="pay-info">
                      <p>{{ order.add_time | formatCreateTime }} <span class="sep">|</span> {{ order.signer_name }}
                        <span
                            class="sep">|</span> 订单号：{{ order.order_sn }} <span class="sep">|</span>
                        支付方式：{{ order.pay_type | getPayType }}
                      </p>
                      <p>应付金额： {{ order.order_mount }}元</p>
                    </div>
                  </div>
                  <div class="list-body">
                    <div class="body-left">
                      <ul>
                        <li v-for="(good,idx) in order.goods" :key="idx">

                          <div class="left-img">
                            <a href=""><img
                                :src="good.goods.cover"
                                alt=""></a>
                          </div>

                          <a href="">{{ good.goods.classify }}</a>
                          <span>{{ good.goods.shop_price }}元 × {{ good.nums }}</span>

                        </li>
                      </ul>

                    </div>
                    <div class="body-right">
                      <!--                      <div v-if="order.status==='SUCCESS'">-->
                      <!--                        <div class="list" @click="orderDetail(order.order_sn)">订单详情</div>-->
                      <!--                      </div>-->

                      <div class="list" @click="goPay(order.order_sn, order.status)" v-if="closeStatus">{{
                          order.status | judgeStatus
                        }}
                      </div>
                      <div class="list" @click="orderDetail(order.order_sn)">订单详情</div>


                    </div>
                  </div>

                </li>


              </ul>
            </div>

            <div class="order-page">
              <div class="page">
                <!-- <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="pageSize"
                    :pager-count="5"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination> -->
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
import {formatDate} from '../../utils/date';
// import {Message} from "element-ui";

export default {
  name: "order",
  components: {
    Side
  },
  data() {
    return {
      closeStatus: true,
      orderList: [],
      orderSelect: '',
      // 总条数
      total: 10,
      // 默认为5请求
      pageSize: 5,
      // 分页按钮的数量
      pageCount: 10

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
        return '超时关闭'
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
    },
    getPayType(type) {
      if (type === 'alipay') {
        return '支付宝'
      } else {
        return '微信支付'
      }
    },
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    handleCurrentChange(page) {
      this.axios.get('/orders/', {
        params: {
          pageSize: this.pageSize,
          pageNum: page
        }
      }).then((res) => {
        this.orderList = res.data.list;
        this.total = res.data.total;
      })
    },
    created() {
      document.title = '售后列表 - JapanHui';
    },
    filterOrder(status) {
      this.orderSelect = status;
      this.axios.get('/orders/', {
        params: {
          pageSize: this.pageSize,
          status: status
        }
      }).then(() => {
        // this.orderList = res.data.list;
        // this.total = res.data.total;
        this.orderList = [];
        this.total = 0;
      })
    },
    getOrderList() {
      this.axios.get('/orders/', {
        params: {
          pageSize: this.pageSize
        }
      }).then(() => {
        // this.orderList = res.data.list;
        // this.total = res.data.total;
        this.orderList = [];
        this.total = 0;
      })
    },
    orderDetail(orderSn) {
      let routeData = this.$router.resolve({name: 'orderDetail', query: {orderSn: orderSn}});
      window.open(routeData.href, '_blank');
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
    }
  },

}
</script>

<style lang="scss">
.user-order {
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

    .user-order-body {
      display: flex;
      justify-content: space-between;

      .user-order-content {
        margin-bottom: 40px;
        background-color: #FFFFFF;
        width: 950px;

        .wrap {
          margin-top: 20px;
          margin-left: 25px;

          .order-title {
            h1 {
              margin: 0;
              font-size: 30px;
              font-weight: 400;
              line-height: 68px;
              color: #757575;
            }
          }

          .line {
            margin-top: 10px;
            border-bottom: 2px solid #F8F8F8;
          }

          .order-category {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .checked {
              color: #ff6600;
            }

            h3 {
              margin-left: 30px;
              font-weight: normal;
              cursor: pointer;
              // 注意层级
              &:first-child {
                margin-left: 0;
              }
            }
          }

          .order-list {
            margin-right: 25px;

            ul {
              margin-top: 20px;

              li {
                margin-bottom: 30px;
                display: flex;
                //width: 800px;
                flex-direction: column;
                border: 1px solid #ff6600;

                //&:last-child {
                //  margin-bottom: 50px;
                //}

                .list-header {
                  display: flex;
                  flex-direction: column;
                  padding: 30px;
                  background-color: #FFFAF7;

                  .pay-status {
                    font-size: 18px;
                    color: #ff6600;
                  }

                  .pay-info {
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-between;

                    .sep {
                      color: #E5E5E5;
                    }

                    p {
                      font-size: 15px;
                      color: #757575;
                      font-weight: 500;
                    }
                  }
                }

                .list-body {
                  //margin: 10px 0;
                  display: flex;
                  justify-content: space-between;

                  .body-left {
                    ul {

                      li {
                        border: none;
                        display: flex;
                        flex-direction: row;

                        justify-content: flex-start;
                        align-items: center;

                        .left-img {
                          margin: 0 10px;
                          width: 100px;
                          height: 100px;

                          img {
                            width: 100%;
                            height: 100%;
                          }
                        }

                        a {
                          color: #333;
                          font-size: 15px;
                        }


                        span {
                          margin-left: 20px;
                          font-size: 16px;
                          color: #ff6600;
                        }
                      }
                    }
                  }

                  .body-right {
                    margin-top: 15px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;

                    .list {
                      margin-right: 20px;
                      margin-bottom: 10px;
                      height: 30px;
                      line-height: 30px;
                      text-align: center;
                      color: #FFFFFF;
                      width: 120px;
                      background-color: #ff6600;
                      cursor: pointer;
                    }
                  }
                }
              }
            }
          }

          .order-page {
            display: flex;
            justify-content: center;
            margin: 15px 0 30px 0;
          }
        }

      }
    }
  }
}
</style>
