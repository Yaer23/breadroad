<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="goBack()"
    />
    <van-cell-group>
      <van-field
        v-model="username"
        clearable
        label="用户名"
        placeholder="请输入用户名"
        left-icon="contact"
        :error-message="usernameError"
        class="input"
      />
      <van-field
        v-model="password"
        clearable
        type="password"
        label="  密码"
        left-icon="password-view"
        placeholder="请输入密码"
        :error-message="passwordError"
        @focus="focus"
        @blur="blur"
        ref="password"
        class="input"
      />
    </van-cell-group>
    <van-button size="large" class="btn" @click="registerAction" :loading="loading">注册</van-button>
    <div class="reg">
      <router-link :to="{name: 'Login'}">已有账号？去登陆</router-link>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import url from "@/urlConfig.js";
export default {
  name: "Register",
  data() {
    return {
      title: "注册",
      username: "",
      password: "",
      loading: false, //  防止用户重复提交
      passwordError: "",
      usernameError: ""
    }
  },
  methods: {
    registerAction(){
      if(this.check()){
        this.register()
      }
    },
    check(){
      this.passwordError = "";
      this.usernameError = "";
      if(this.username.length < 6 || this.password.length < 6){
        if(this.password.length < 6){
          this.passwordError = "密码的长度要大于等于6位"
        } 
        if(this.username.length < 6){
          this.usernameError = "用户名的长度要大于等于6位"
        }
        return false
      } else {
        return true
      }
    },
    //  注册
    register() {
      this.loading = true;
      this.$axios
        .post(url.register, {
          username: this.username,
          password: this.password
        })
        .then(res => {
          this.loading = false;
          console.log(res);
          if (res.data.code === 200) {
            Toast.success(res.data.message);
            this.$router.push("login");
          } else if (res.data.code === 500) {
            Toast.fail(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  返回上一步
    goBack() {
      this.$router.go(-1);
    },
    focus() {
      this.$refs.password.leftIcon = "password-not-view";
    },
    blur() {
      this.$refs.password.leftIcon = "password-view";
    }
  }
};
</script>

<style scoped>
.input {
  line-height: 25px;
  font-size: 16px;
  padding-left: 20px;
}

.btn {
  background-color: #de3030;
  color: #fff;
}
.reg {
  float: right;
  color: #de3030;
  margin: 20px;
}
</style>