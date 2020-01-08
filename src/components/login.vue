<template>
  <div class="main">
    <div class="container">
      <div class="tupian">
        <img src="../assets/logo.png" />
      </div>
      <div class="input">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleFormRef"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input placeholder="请输入内容" v-model="ruleForm.username">
              <i slot="prefix" class="el-input__icon iconfont icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入内容" v-model="ruleForm.password">
              <i
                slot="prefix"
                class="el-input__icon iconfont icon-3702mima"
              ></i>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn">
        <el-button @click="loginbtn" type="primary">登录</el-button>
        <el-button @click="resetBtn" type="info">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginbtn() {
      this.$refs.ruleFormRef.validate(async vaild => {
        if (!vaild) return
        const { data: res } = await this.$http.post('login', this.ruleForm)
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('登录失败')
        }
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },
    resetBtn() {
      this.$refs.ruleFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  background-color: pink;
  height: 100%;
}
.container {
  position: absolute;
  width: 450px;
  height: 304px;
  background-color: #c8b5e1c2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.tupian {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 0 10px #eee;
  padding: 8px;
  border: 1px solid #eee;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 100%;
    height: 100%;
    background-color: #b0d0df;
    border-radius: 50%;
  }
}
.input {
  margin-top: 100px;
  padding: 15px;
}
.btn {
  position: absolute;
  bottom: 25px;
  margin-left: 280px;
}
.iconfont {
  font-size: 18px;
}
</style>
