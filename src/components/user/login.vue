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
    <van-button size="large" class="btn" @click="loginAction" :loading="loading">登录</van-button>
    <div class="reg">
      <router-link :to="{name: 'Register'}">还没有账号？去注册</router-link>
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
      title: "登录",
      username: "",
      password: "",
      loading: false, //  防止用户重复提交
      passwordError: "",
      usernameError: "",
      fromPath: null
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    next(mv => {
      if (to.fullPath !== to.path) {
        mv.fromPath = to.query.redirect;
      } else if(from.path === "/register") {
        mv.fromPath = "/"
      } else {
        mv.fromPath = from.path;
      }
    });
  },
  methods: {
    //  登陆行为
    loginAction() {
      if (this.check()) {
        this.login();
      }
    },
    //  前端输入校验
    check() {
      this.passwordError = "";
      this.usernameError = "";
      if (this.username.length < 6 || this.password.length < 6) {
        if (this.password.length < 6) {
          this.passwordError = "密码的长度要大于等于6位";
        }
        if (this.username.length < 6) {
          this.usernameError = "用户名的长度要大于等于6位";
        }
        return false;
      } else {
        return true;
      }
    },
    //  登录方法
    login() {
      this.loading = true;
      this.$axios
        .post(url.login, {
          username: this.username,
          password: this.password
        })
        .then(res => {
          this.loading = false;
          if (res.data.code === 200) {
            Toast.success(res.data.message);
            // 保存数据到sessionStorage
            sessionStorage.setItem("access_token", new Date());
            //  保存用户名到vuex的username数据中
            this.$store.commit("setUsername", this.username);
            //  从数据库中获取该用户shopcart的值并保存到vuex的shopcart中
            this.getShopcart(this.username);
            //  导航
            this.$router.push(this.fromPath);
          } else if (res.data.code === 500) {
            Toast.fail(res.data.message);
          } else if (res.data.code === 400) {
            //  两种结果导致400，用户名或密码错误
            Toast.fail("用户名或密码错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  获取shopcart
    getShopcart(username) {
      this.$axios
        .get(url.getShopcart, {
          params: {
            username: username
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            //  在vuex中设置shopcart的值
            this.$store.commit("setShopcart", res.data.message);
            var totalNum = 0;
            res.data.message.forEach(item => {
              if (item.isChecked) {
                totalNum += item.num;
              }
            });
            //  设置vuex中存储的shopcart总量
            this.$store.commit("setGoodsNum", totalNum);
            console.log(shopcart);
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