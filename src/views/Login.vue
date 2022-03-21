<template>
  <div class="main">
    <h1>嗨租租房网后台管理系统</h1>
    <div class="login">
      <p>登录</p>
      <el-form :model="loginForm" class="login_form">
        <el-form-item>
          <el-select v-model="loginForm.role" placeholder="请选择角色">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="房源审核员" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.name" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            autocomplete="off"
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="login_button">
        <el-button round type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        role: "",
        name: "",
        password: ""
      },
    };
  },
  methods: {
    login() {
      this.$http.post("api/users/login", this.loginForm).then(response => {
        if (response.data.login == "success") {
          window.sessionStorage.setItem('token',response.data.token)
           window.sessionStorage.setItem('role',this.loginForm.role)
          this.$router.push({ name :'Index' });
        }else if(response.data.login=='password'){
            this.$message.error('密码错误')
        }else if(response.data.login=='name'){
            this.$message.error('请输入正确的用户名')
        }else{
            this.$message.error('请选择正确的角色')
        }
      });
    }
  }
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 6.3rem;
  background: #438eb9;
}
</style>

<style>
h1 {  
  font-size: 0.5rem;
  padding: 0.7rem;
 width: 41%;
  margin:0 auto;
}
.login {
  margin: 0 auto;
  width: 30%;
  height: 3.4rem;
  background: #f3f7fd;
  border-radius: 0.08rem;
}
.login p {
  padding: 0.25rem 1.6rem 0.2rem;
  font-weight: bold;
  font-size: 0.3rem;
  font-family: STXingkai;
  color: #438eb9;
}
.login .el-form {
  /* padding-top: 0.3rem; */
}
.login_form .el-form-item__content {
  margin: 0 auto;
  width: 80%;
}
.login_form .el-select {
  width: 100%;
}
.login_button {
  margin-left: 0.4rem;
}
.login .el-button {
  width: 90%;
}
</style>