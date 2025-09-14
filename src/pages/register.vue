<template>
  <div class="register">
    <div class="login-header">
      <div class="header-logo">
        <a href="/index.html"><img src="~@/static/imgs/logo.png" alt=""></a>
      </div>
      <h2>会员注册</h2>
    </div>
    <div class="register-body">
      <div class="container">
        <div class="register-form">
          <h3>会员注册</h3>
          <div class="step" v-if="one">
            <div class="xs_title_box">

            </div>
            <div class="username">
              <input type="text" placeholder="请输入手机号" v-model="phone">
            </div>
            <div class="btn-box" @click="step1()">
              <a href="javascript:;" class="btn">立即注册</a>
            </div>
            <div class="forget-user">
              <a href="/forget">找回密码</a>
              <a href="/login">马上登录</a>
            </div>
          </div>
          <div class="step" v-if="two">
            <div class="xs_title_box">
              <p>请输入短信验证码</p>
            </div>
            <div class="username">
              <input type="text" placeholder="请输入验证码" v-model="code">
            </div>
            <div class="btn-box split-button" @click="step2()">
              <div class="s1" @click="back"><a href="javascript:;" class="btn">上一步</a></div>
              <div class="s2"><a href="javascript:;" class="btn">下一步</a></div>
            </div>

          </div>
          <div class="step" v-if="three">
            <div class="xs_title_box">
              <p>请设置密码</p>
            </div>
            <div class="username">
              <input type="password" placeholder="请输入密码" v-model="password">
            </div>
            <div class="password">
              <input type="password" placeholder="请输入确认密码" v-model="repeat">
            </div>
            <div class="btn-box" @click="step3()">
              <a href="javascript:;" class="btn">提交</a>
            </div>

          </div>
          <div class="step" v-if="four">
            <div class="xs_title_box">
              <p>注册成功</p>
            </div>
            <div class="tips">
              <p>您的登录账号是： <span>{{ phone }}</span></p>
            </div>

            <div class="btn-box">
              <a href="/login" class="btn">登录</a>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/footer";
// import {Message} from "element-ui";

export default {
  name: "register",
  components: {
    Footer,
  },
  data() {

    return {
      one: true,
      two: false,
      three: false,
      four: false,
      phone: '',
      code: '',
      password: '',
      repeat: ''
    }
  },
  methods: {
    verifyPhone(poneInput) {
      var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!myreg.test(poneInput)) {
        return false;
      } else {
        return true;
      }
    },
    back() {
      this.one = true;
      this.two = false;
      this.three = false;
      this.four = false
    },
    step1() {
      if (!this.phone) {
        // Message.warning('请输入手机号')
        console.warn('请输入手机号')
        return
      }
      if (!this.verifyPhone(this.phone)) {
        // Message.warning('手机号输入错误，请核对')
        console.warn('手机号输入错误，请核对')
        return
      }
      this.axios.post('/queryUser/', {
        mobile: this.phone
      }).then((res) => {
        let flag = res.data
        if (flag) {
          // Message.warning('该手机号已注册')
          console.warn('该手机号已注册')
        } else {
          this.axios.post('/code/', {
            mobile: this.phone
          }).then(() => {
            // Message.success('发送成功')
            console.log('发送成功')
            this.one = false;
            this.two = true;
            this.three = false;
            this.four = false
          })
        }

      })

    },
    step2() {
      this.axios.get(`/code/${this.phone}/`).then((res) => {
        if (this.code.length !== 6) {
          // Message.warning('请输入正确的验证码')
          console.warn('请输入正确的验证码')
          return
        }
        let code = res.data;
        if (code === this.code) {
          // Message.success('验证码校验成功')
          console.log('验证码校验成功')
          this.one = false;
          this.two = false;
          this.three = true;
          this.four = false
        } else {
          // Message.warning('验证码错误，请核对')
          console.warn('验证码错误，请核对')
        }
      })

    },
    step3() {
      if (this.password !== this.repeat) {
        // Message.warning('两次输入的密码不一致，请重新输入');
        console.warn('两次输入的密码不一致，请重新输入');
        return
      }
      if (this.password.length < 6 || this.repeat.length < 6) {
        // Message.warning('密码必须大于6位数，请重新输入');
        console.warn('密码必须大于6位数，请重新输入');
        return
      }
      this.axios.post('/users/', {
        username: this.phone,
        code: this.code,
        mobile: this.phone,
        password: this.repeat
      }).then(() => {
        // Message.success('注册成功')
        console.log('注册成功')
        this.one = false;
        this.two = false;
        this.three = false;
        this.four = true;
      })
    },
  }
}
</script>

<style lang="scss">
.register {

  .login-header {
    background-color: #FFFFFF;
    // 垂直居中
    display: flex;
    align-items: center;
    width: 1200px;
    margin: 0 auto;
    height: 85px;

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

  .register-body {
    //margin-top: 50px;
    padding-top: 20px;
    background-color: #F5F5F5;

    .container {
      margin: 0 auto;
      width: 840px;
      height: 500px;
      background-color: #FFFFFF;

      .register-form {
        display: flex;
        flex-direction: column;
        align-items: center;

        h3 {
          padding-top: 50px;
          line-height: 23px;
          font-size: 24px;
          color: #FF6600;
          text-align: center;
          margin: 0 auto;

          .checked {
            color: #FF6600;
          }

          .sep-line {
            margin: 0 32px;
          }
        }

        .split-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #FFFFFF !important;

          .s1 {
            width: 150px;
            background-color: #ff6600;
          }

          .s2 {
            width: 150px;
            background-color: #ff6600;
          }
        }

        .xs_title_box {
          margin-top: 70px;
          margin-bottom: 20px;

          p {
            font-size: 16px;
            font-weight: bold;
          }
        }

        .username, .password {

          //display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #E5E5E5;
          margin-bottom: 20px;

          input {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border: none;
            padding-left: 18px;
          }
        }

        .forget-user {
          // flex 必须有高度和宽度
          //height: 20px;
          margin-top: 20px;
          width: 348px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          a {
            color: #FF6600;
            font-size: 16px;
          }
        }

        .tips {
          margin-top: 50px;
          text-align: center;
          margin-bottom: 70px;
          font-size: 16px;

          span {
            color: #FF6600;
            font-weight: bold;
          }
        }

        .btn-box {
          width: 348px;
          background-color: #FF6600;
          text-align: center;

          .btn {
            width: 100%;
            color: #FFFFFF;
            font-weight: 700px;
            line-height: 50px;
            margin-top: 10px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
