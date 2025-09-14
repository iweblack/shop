<template>
  <div class="user-profile">

    <div class="container">
      <div class="crumb">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>账户设置</el-breadcrumb-item>
        </el-breadcrumb> -->
      </div>
      <div class="user-profile-body">
        <Side></Side>
        <div class="user-profile-content">
          <div class="wrap">
            <div class="profile-title">
              <h1>个人信息</h1>
            </div>
            <div class="line"></div>
            <div class="base">基本信息</div>

            <div class="profile-body">
              <div class="wrap-body">
                <div class="profile-username">
                  账号：{{ userInfo.username }}
                </div>

                <div class="profile-nickname">
                  昵称：
                  <!-- <el-input v-model="userInfo.nickname" type="text" placeholder="请输入昵称"></el-input> -->
                  <input type="text" v-model="userInfo.nickname" placeholder="请输入昵称">
                </div>
                <div class="profile-birthday">
                  生日：
                  <!-- <el-date-picker
                      v-model="userInfo.birthday"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd">
                  </el-date-picker> -->
                  <input type="date" v-model="userInfo.birthday" value-format="yyyy-MM-dd">
                </div>

                <div class="profile-nickname">
                  邮箱：
                  <!-- <el-input v-model="userInfo.email" placeholder="请输入邮箱" type="email"></el-input> -->
                  <input type="email" v-model="userInfo.email" placeholder="请输入邮箱">
                </div>
                <!--                <div class="profile-sex">-->
                <!--                  <div>性别：</div>-->
                <!--                  <el-radio-group v-model="radio">-->
                <!--                    <el-radio :label="1">男</el-radio>-->
                <!--                    <el-radio :label="2">女</el-radio>-->
                <!--                    <el-radio :label="3">保密</el-radio>-->
                <!--                  </el-radio-group>-->
                <!--                </div>-->

              </div>
              <div class="wrap-button">
                <!-- <el-button plain @click="submitUser()">提交</el-button> -->
                <button plain @click="submitUser()">提交</button>

              </div>
            </div>
            <!--            <div class="line"></div>-->
            <!--            <div class="base">账号绑定</div>-->
            <!--            <div class="account">-->
            <!--              <div class="list">-->
            <!--                <div class="wrap">-->
            <!--                  <div class="l1"><img src="~@/static/imgs/wx.png" alt="微信登录"></div>-->
            <!--                  <div class="l2">微信</div>-->
            <!--                </div>-->
            <!--                <div class="right">-->
            <!--                  <div class="r1" v-if="true">立即绑定</div>-->
            <!--                  <div class="r2" v-else>解绑账号</div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              &lt;!&ndash;              <div class="list">&ndash;&gt;-->
            <!--              &lt;!&ndash;                <div class="wrap">&ndash;&gt;-->
            <!--              &lt;!&ndash;                  <div class="l1"><img src="~@/static/imgs/wb.png" alt="微博登录"></div>&ndash;&gt;-->
            <!--              &lt;!&ndash;                  <div class="l2">微博</div>&ndash;&gt;-->
            <!--              &lt;!&ndash;                </div>&ndash;&gt;-->
            <!--              &lt;!&ndash;                <div class="right">&ndash;&gt;-->
            <!--              &lt;!&ndash;                  <div class="r1" v-if="true">立即绑定</div>&ndash;&gt;-->
            <!--              &lt;!&ndash;                  <div class="r2" v-else>解绑账号</div>&ndash;&gt;-->
            <!--              &lt;!&ndash;                </div>&ndash;&gt;-->
            <!--              &lt;!&ndash;              </div>&ndash;&gt;-->
            <!--              <div class="list">-->
            <!--                <div class="wrap">-->
            <!--                  <div class="l1"><img src="~@/static/imgs/alipay.png" alt="支付宝登录"></div>-->
            <!--                  <div class="l2">支付宝</div>-->
            <!--                </div>-->
            <!--                <div class="right">-->
            <!--                  <div class="r1" v-if="false">立即绑定</div>-->
            <!--                  <div class="r2" v-else>解绑账号</div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Side from "../../components/side";
// import {Message} from "element-ui";

export default {
  name: "profile",
  components: {
    Side
  },
  mounted() {
    this.getUserInfo();
  },
  created() {
    document.title = '账户设置 - JapanHui';
  },
  methods: {
    getUserInfo() {
      let uid = this.$cookie.get('uid');
      this.axios.get(`/users/${uid}/`).then((res) => {
        this.userInfo = res.data;
        // this.radio = this.userInfo.gender;
        // console.log(this.radio)
      })
    },
    submitUser() {
      console.log(this.userInfo);
      let uid = this.$cookie.get('uid');
      // 在这里进行一下校验
      this.axios.put(`/users/${uid}/`, {
        nickname: this.userInfo.nickname || 'JapanHui新用户',
        birthday: this.userInfo.birthday,
        gender: this.radio,
        email: this.userInfo.email
      }).then(() => {
        // Message.success('修改成功')
        console.log('修改成功')
        this.getUserInfo();
      })
    }
  },
  data() {
    return {
      radio: 2,
      userInfo: {
        gender: 1,
        birthday: '',
        nickname: 'JapanHui新用户',
        email: ''
      }
    }
  }
}
</script>

<style lang="scss">
.user-profile {
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

    .user-profile-body {
      display: flex;
      justify-content: space-between;

      .user-profile-content {
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

          .base {
            font-size: 1.5rem;
            color: #333333;
            margin-bottom: 20px;
          }

          .profile-title {
            h1 {
              margin: 0;
              font-size: 30px;
              font-weight: 400;
              line-height: 68px;
              color: #757575;
            }
          }

          .profile-body {

            .wrap-body {
              color: #757575;
              font-size: 16px;

              .profile-sex {
                display: flex;
                margin-left: 5px;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 25px;
              }

              div {
                margin-bottom: 15px;
              }

              .el-input {

                width: 200px;

                input {
                  height: 40px;
                }
              }
            }

            .wrap-button {
              margin-bottom: 25px;
              margin-left: 50px;

              .el-button {
                width: 100px;
              }
            }
          }

          .account {
            margin-bottom: 30px;

            .list {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .wrap {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .l1 {
                  margin-right: 10px;
                  width: 50px;
                  height: 50px;
                  font-size: 16px;
                  color: #333333;

                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
              }

              .right {
                margin-right: 30px;

                .r1, .r2 {
                  width: 80px;
                  height: 30px;
                  line-height: 30px;
                  background-color: #ff6600;
                  color: #FFFFFF;
                  text-align: center;
                }

                .r2 {
                  background-color: #999999;
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
