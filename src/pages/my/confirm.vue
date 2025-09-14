<template>
  <div>
    <MyHeader title="订单确认"></MyHeader>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
         style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
      <defs>
        <symbol id="icon-add" viewBox="0 0 31 32">
          <title>add</title>
          <path
              d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z"
              class="path1"></path>
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path
              d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"
              class="path1"></path>
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path
              d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"
              class="path1"></path>
          <path
              d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
              class="path2"></path>
          <path
              d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
              class="path3"></path>
          <path
              d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
              class="path4"></path>
        </symbol>
      </defs>
    </svg>
    <div class="confirm">
      <div class="wrapper">
        <div class="container">
          <div class="order-box">
            <div class="wrap-flex">
              <div class="item-address">
                <h2 class="addr-title">收货地址</h2>
                <div class="addr-list">
                  <div class="addr-info"
                       v-for="(address, idx) in allAddress" :class="{'checked':addressId===address.id}"
                       :key="idx" @click="selectAddress(address.id)">
                    <h2>{{ address.receiverName }}</h2>
                    <div class="phone">{{ address.receiverMobile }}</div>
                    <div class="street">{{ address.receiverProvince }} {{ address.receiverCity }}
                      {{ address.receiverDistrict }} {{ address.receiverAddress }}
                    </div>
                    <div class="action">
                      <a href="javascript:;" @click="delAddress()">
                        <svg class="icon icon-del">
                          <use xlink:href="#icon-del"></use>
                        </svg>
                      </a>
                      <!--                      <a href="javascript:;" @click="editAddress()">-->
                      <!--                        <svg class="icon icon-edit">-->
                      <!--                          <use xlink:href="#icon-edit"></use>-->
                      <!--                        </svg>-->
                      <!--                      </a>-->
                    </div>
                  </div>
                  <div class="addr-add" @click="addAddress()">
                    <div class="icon-add"></div>
                    <div>添加新地址</div>
                  </div>
                </div>
              </div>
              <div class="item-good">
                <h2>商品</h2>
                <ul>
                  <li v-for="(cart, idx) in cartSelect" :key="idx">
                    <div class="good-name">
                      <img :src="cart.goods.cover">
                      <span>{{ getTitle(cart.goods.params) }}</span>
                    </div>
                    <div class="good-price">{{ cart.goods.sold_price }}元 x {{ cart.nums }}</div>
                    <div class="good-total">{{ cart.goods.sold_price * cart.nums }}元</div>
                  </li>
                </ul>
              </div>
              <!--              <div class="item-shipping">-->
              <!--                <h2>配送方式</h2>-->
              <!--                <span>国内快递</span>-->
              <!--              </div>-->
              <div class="item-note">
                <h2>订单留言</h2>
                <!-- <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入订单留言"
                    v-model="note" class="text-note">
                </el-input> -->
                <textarea
                    v-model="note"
                    class="text-note"
                    placeholder="请输入订单留言"
                    rows="2"
                ></textarea>
              </div>
              <!--              <div class="item-invoice">-->
              <!--                <h2>发票</h2>-->
              <!--                <a href="javascript:;">电子发票</a>-->
              <!--                <a href="javascript:;">个人</a>-->
              <!--              </div>-->
            </div>
            <div class="detail">
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
            <div class="btn-group">
              <a href="/cart" class="btn btn-default btn-large">返回购物车</a>
              <a href="javascript:;" class="btn btn-large" style="margin-right: 40px" @click="goSettlement">去结算</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal
        :title="dialogTitle"
        btnType="1"
        :showModal="showEditModal"
        @cancel="showEditModal=false"
        @submit="submitAddress">
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item">
            <input type="text" class="input" placeholder="姓名" v-model="checkedItem.receiverName">
            <input type="text" class="input" placeholder="手机号" v-model="checkedItem.receiverMobile">
          </div>
          <div class="item">
            <select name="province" @change='getValue' v-model="checkedItem.receiverProvince"
                    @click="switchCity('province')">
              <option selected hidden disabled value="">省份</option>
              <option :value="item" v-for="item in provinceList" :key="item.id">{{ item.region_name }}
              </option>
            </select>
            <!--            @click="switchCity('city')"-->
            <select name="city" @change='getCountryValue' v-model="checkedItem.receiverCity">
              <option selected hidden disabled value="">地市</option>
              <option :value="item" v-for="item in cityList" :key="item.id">{{ item.region_name }}
              </option>
            </select>
            <select name="district" @change='getLastValue' v-model="checkedItem.receiverDistrict">
              <option selected hidden disabled value="">县区</option>
              <option :value="item" v-for="item in countryList" :key="item.id">{{ item.region_name }}</option>
            </select>
          </div>
          <div class="item">
            <textarea name="street" v-model="checkedItem.receiverAddress" placeholder="无需重复填写省市区，小于75个字"></textarea>
          </div>
          <!--          <div class="item">-->
          <!--            <input type="text" class="input" placeholder="邮编" v-model="checkedItem.receiverZip">-->
          <!--          </div>-->
        </div>
      </template>
    </modal>
    <modal
        title="删除确认"
        btnType="1"
        :showModal="showDelModal"
        @cancel="showDelModal=false"
        @submit="submitAddress">
      <template v-slot:body>
        <p>您确认要删除此地址吗？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import MyHeader from "../../components/MyHeader";
import Modal from '../../components/Modal'
// import {Message} from "element-ui";
// import axios from "axios";

export default {
  name: "confirm",
  components: {
    MyHeader,
    Modal
  },
  data() {
    return {
      provinceList: [],
      cityList: [],
      countryList: [],
      note: '',
      addressId: '',
      pro: "",
      ci: '',
      dis: '',
      isSelect: '',
      dialogTitle: '',
      cartSelect: [],
      showDelModal: false,
      showEditModal: false,
      allAddress: [],
      checkedItem: {
        receiverName: '',
        receiverProvince: '',
        receiverCity: '',
        receiverDistrict: '',
        receiverMobile: '',
        receiverAddress: '',
        receiverZip: ''
      }
    }
  },
  computed: {

    totalPrice() {
      // return item.nums * item.goods.shop_price
      let sum = 0;
      let total = this.cartSelect.map(filterItem => {
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
      let total = this.cartSelect.map(filterItem => {
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
      let total = this.cartSelect.map(filterItem => {
        return filterItem.nums * filterItem.goods.weight;
      })
      total.forEach(weight => {
        sum += weight;
      })
      return sum
    }
  },
  created() {
    document.title = '订单确认 - JapanHui';
  },
  mounted() {
    var flag = this.$route.query.gid;
    if (flag) {
      this.getAddress();
      this.getGood(flag);
    } else {
      this.getCart();
      this.getAddress();
    }

  },
  methods: {
    getGood(gid) {
      this.axios.get(`/goods/${gid}/`).then((res) => {
        console.log(res)
        this.cartSelect = [
          {
            goods: {
              cover: res.data.cover,
              params: res.data.params,
              sold_price: res.data.sold_price,
              weight: res.data.weight

            },
            nums: Number(this.$route.query.num)
          }
        ]
      })
    },
    getLastValue: function () {
      this.dis = this.checkedItem.receiverDistrict.region_name
    },
    getCountryValue: function () {
      this.ci = this.checkedItem.receiverCity.region_name

      // console.log('您选择了', this.checkedItem.receiverCity, this.checkedItem.receiverCity.id, 22)
      // http://127.0.0.1:8000/region/?region_parent_id=1000000
      this.axios.get('/region/', {
        params: {
          region_parent_id: this.checkedItem.receiverCity.id
        }
      }).then(res => {
        this.countryList = res.data.list.map(item => {
          return {
            id: item.region_id,
            region_name: item.region_name,
            // region_code: item.region_id
          }
        })
      })

    },
    getValue: function () {
      // console.log('您选择了', this.checkedItem.receiverProvince)
      this.pro = this.checkedItem.receiverProvince.region_name
      // http://127.0.0.1:8000/region/?region_parent_id=1000000
      this.axios.get('/region/', {
        params: {
          region_parent_id: this.checkedItem.receiverProvince.id
        }
      }).then(res => {
        this.cityList = res.data.list.map(item => {
          return {
            id: item.region_id,
            region_name: item.region_name,
          }
        })
      })

    },
    switchCity(type) {
      if (type === 'province') {
        // http://127.0.0.1:8000/region/?region_level=1
        this.axios.get('/region/', {
          params: {
            region_level: 1
          }
        }).then(res => {
          this.provinceList = res.data.list.map(item => {
            return {
              id: item.region_id,
              region_name: item.region_name,
            }
          })
        })
      }
    },
    getTitle(val) {
      return val[0]['value']
    },
    goSettlement() {
      if (this.addressId === '') {
        // Message.warning('请选择收货地址或者添加新地址')
        console.warn('请选择收货地址或者添加新地址')
        return;
      }

      var flag = this.$route.query.gid;
      if (flag) {
        this.axios.post('/once/', {
          post_script: this.note || '默认',
          address: this.isSelect.receiverProvince + this.isSelect.receiverCity + this.isSelect.receiverDistrict + this.isSelect.receiverAddress,
          signer_name: this.isSelect.receiverName,
          singer_mobile: this.isSelect.receiverMobile,
          num: this.$route.query.num,
          gid: this.$route.query.gid
        }).then((res) => {
          console.log(res)
          let orderSn = res.data.order_sn;
          // post传输
          this.$router.push({
            path: 'pay',
            query: {
              orderSn: orderSn
            }
          })
        })
      }
          //{{ address.receiverProvince }} {{ address.receiverCity }}
          // {{ address.receiverDistrict }} {{ address.receiverAddress }}
      // let selectAddress = this.allAddress.map(item => item.id === this.addressId);

      else {
        this.axios.post('/orders/', {
          post_script: this.note || '默认',
          address: this.isSelect.receiverProvince + this.isSelect.receiverCity + this.isSelect.receiverDistrict + this.isSelect.receiverAddress,
          signer_name: this.isSelect.receiverName,
          singer_mobile: this.isSelect.receiverMobile,
          flag: 1
        }).then((res) => {
          let orderSn = res.data.order_sn;
          // post传输
          this.$router.push({
            path: 'pay',
            query: {
              orderSn: orderSn
            }
          })
        })
      }
    },
    selectAddress(id) {
      // console.log(id)
      this.addressId = id;
      this.isSelect = this.allAddress.find(item => item.id === id);
      // for
      // for (var i = 0, len = this.allAddress.length; i < len; i++) {
      //   let loop = this.allAddress[i].filter(item => item.id === this.addressId)
      //   if (loop) {
      //     this.isSelect = loop
      //     console.log(loop)
      //     return
      //   }
      // }


    },

    submitAddress() {
      let flag = this.dialogTitle
      if (flag === '编辑地址') {
        this.axios.patch(`/address/${this.addressId}`, {
          "province": this.checkedItem.receiverProvince,
          "city": this.checkedItem.receiverCity,
          "district": this.checkedItem.receiverDistrict,
          "address": this.checkedItem.receiverAddress,
          "signer_name": this.checkedItem.receiverName,
          "signer_mobile": this.checkedItem.receiverMobile,
          "stamp": this.checkedItem.receiverZip,
          "is_select": false
        }).then(() => {
          // Message.success('地址编辑成功')
          console.log('地址编辑成功')
          this.showEditModal = false;
          this.getAddress();

        })

      } else if (flag === '删除地址') {
        this.axios.delete(`/address/${this.addressId}`).then(() => {
          // Message.success('地址删除成功')
          console.log('地址删除成功')
          this.getAddress();
          this.showDelModal = false;


        })
      } else {
        this.axios.post('/address/', {
          "province": this.pro,
          "city": this.ci,
          "district": this.dis,
          "address": this.checkedItem.receiverAddress,
          "signer_name": this.checkedItem.receiverName,
          "signer_mobile": this.checkedItem.receiverMobile,
          "stamp": this.checkedItem.receiverZip,
          "is_select": false
        }).then(() => {
          // Message.success('地址添加成功')
          console.log('地址添加成功')
          this.showEditModal = false;
          this.getAddress();
        })
      }

    },
    delAddress() {
      this.dialogTitle = '删除地址'
      this.showDelModal = true;
    },
    editAddress() {
      console.log('编辑', this.addressId, `/address/${this.addressId}`)
      this.dialogTitle = '编辑地址'
      this.showEditModal = true;
      this.axios.get(`/address/${this.addressId}/`).then((res) => {
        console.log(res)
        this.checkedItem.receiverProvince = res.data.province;
        this.checkedItem.receiverCity = res.data.city;
        this.checkedItem.receiverDistrict = res.data.district;
        this.checkedItem.receiverName = res.data.signer_name;
        this.checkedItem.receiverMobile = res.data.signer_mobile;
        this.checkedItem.receiverAddress = res.data.address;
      })
    },
    addAddress() {
      this.dialogTitle = '添加地址'
      this.showEditModal = true;
    },
    getCart() {
      this.axios.get('/carts/',).then((res) => {
        this.cartSelect = res.data.list.filter(item => item.is_select);
      })
    },
    getAddress() {
      this.axios.get('/address/').then((res) => {
        this.allAddress = res.data.list.map(item => {
          return {
            receiverProvince: item.province,
            receiverCity: item.city,
            receiverDistrict: item.district,
            receiverAddress: item.address,
            receiverName: item.signer_name,
            receiverMobile: item.signer_mobile,
            receiverZip: item.static,
            select: item.is_select,
            id: item.id
          }
        })
        // console.log(this.allAddress)

      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/button';

.confirm {

  background-color: #F5F5F5;

  .wrapper {
    background-color: #F5F5F5;
    padding-top: 30px;
    padding-bottom: 84px;
    margin: 0 auto;
    width: 1200px;

    .order-box {
      background-color: #ffffff;
      padding-left: 40px;
      padding-bottom: 40px;

      .addr-title {
        font-size: 20px;
        color: #333333;
        font-weight: 200;
        margin-bottom: 21px;
      }

      .wrap-flex {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .item-address {
          padding-top: 38px;

          .addr-list {
            .addr-info, .addr-add {
              box-sizing: border-box;
              float: left;
              width: 271px;
              height: 180px;
              border: 1px solid #E5E5E5;
              margin-right: 15px;
              padding: 15px 24px;
              font-size: 14px;
              color: #757575;
            }

            .addr-info {
              cursor: pointer;

              h2 {
                height: 27px;
                font-size: 18px;
                font-weight: 300;
                color: #333;
                margin-bottom: 10px;
              }

              .street {
                height: 50px;
              }

              .action {
                height: 50px;
                line-height: 50px;
                display: flex;
                justify-content: space-between;

                .icon {
                  width: 20px;
                  height: 20px;
                  fill: #666666;
                  vertical-align: middle;

                  &:hover {
                    fill: #FF6700;
                  }
                }
              }

              &.checked {
                border: 1px solid #ff6700;
              }
            }

            .addr-add {
              text-align: center;
              color: #999999;
              cursor: pointer;

              .icon-add {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: url('~@/static/imgs/icon-add.png') #E0E0E0 no-repeat center;
                background-size: 14px;
                margin: 0 auto;
                margin-top: 45px;
                margin-bottom: 10px;
              }
            }
          }
        }

        .item-good {
          margin-top: 34px;
          border-bottom: 1px solid #E5E5E5;
          padding-bottom: 12px;

          h2 {
            border-bottom: 1px solid #E5E5E5;
            padding-bottom: 20px;
          }

          li {
            display: flex;
            align-items: center;
            height: 50px;
            line-height: 40px;
            margin-top: 10px;
            font-size: 16px;
            color: #333333;

            .good-name {
              flex: 5;

              img {
                width: 45px;
                height: 45px;
                vertical-align: middle;
                margin-right: 20px;
              }
            }

            .good-price {
              flex: 2;
            }

            .good-total {
              padding-right: 44px;
              color: #FF6600;
            }
          }
        }

        .item-note {
          margin-top: 31px;
          line-height: 20px;
          display: flex;
          flex-direction: column;

          h2 {
            display: inline-block;
            margin-right: 71px;
            font-size: 20px;
            width: 80px;
          }

          .text-note {
            margin-top: 20px;
            width: 500px;
          }
        }

        .item-shipping, .item-invoice {
          margin-top: 31px;
          line-height: 20px;

          h2 {
            display: inline-block;
            margin-right: 71px;
            font-size: 20px;
            width: 80px;
          }

          span, a {
            font-size: 16px;
            color: #FF6700;
            margin-right: 23px;
          }
        }
      }

      .detail {
        padding: 50px 44px 33px 0;
        border-bottom: 1px solid #f5f5f5;
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

      .btn-group {
        margin-top: 37px;
        text-align: right;
      }
    }
  }


}

// dialog框css
.edit-wrap {
  font-size: 14px;

  .item {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;

    .input {
      display: inline-block;
      width: 283px;
      height: 40px;
      line-height: 40px;
      padding-left: 15px;
      border: 1px solid #E5E5E5;

      & + .input {
        margin-left: 14px;
      }
    }

    select {
      // flex 平分  或者指定数值
      height: 40px;
      flex: 1;
      line-height: 40px;
      border: 1px solid #E5E5E5;
      margin-right: 15px;

      &:last-child {
        margin-right: 0;
      }
    }

    textarea {
      height: 80px;
      width: 100%;
      padding: 13px 15px;
      box-sizing: border-box;
      border: 1px solid #E5E5E5;
    }
  }
}
</style>
