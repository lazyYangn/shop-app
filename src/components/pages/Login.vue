<template>
  <div>
    <TopBar style="background-color:unset;box-shadow:none">
      <div slot="left" class="iconfont icon-back1 arrow" @click="goBack"></div>
      <div slot="middle"></div>
    </TopBar>
    <MyContent>
      <div style="margin-bottom:39px">
        <div class="title">欢迎来到登录页</div>
        <div class="title-extend">
          请输入你的邮箱和密码登录您的账号,没有账号？
          <div style="color:#B620e0" @click="goRegister">注册</div>
        </div>
      </div>
      <a-form-model ref="registerForm" :rules="rules" layout="vertical" :model="form" style="overflow-y:auto">
        <a-form-model-item prop="email" label="邮箱" style="color:rgb(0 0 0 /0.5)">
          <a-input v-model="form.email" type="email" placeholder="输入您的邮箱" />
        </a-form-model-item>
        <a-form-model-item prop="pwd" label="密码" style="color:rgb(0 0 0 /0.5)">
          <a-input v-model="form.pwd" type="password" placeholder="输入您的密码" />
        </a-form-model-item>
        <a-form-model-item>
          <a-checkbox-group>
            <a-checkbox value="1" name="type">
              记住密码
            </a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item>
          <a-button @click="sub('registerForm')" block style="border:none;box-shadow:0 0 8px #e3e3e3;margin-top:24px">
            登录
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </MyContent>
  </div>
</template>

<script>
import MyContent from '@/components/content/MyContent'
import TopBar from '@/components/topbar/TopBar'
const key = 'updatable'
export default {
  name: 'Login',
  data() {
    let validateMail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        callback()
      }
    }
    let validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (value.trim().length <= 3) {
        callback(new Error('密码长度不能小于3'))
      } else if (value.indexOf(' ') >= 0) {
        callback(new Error('密码格式不正确'))
      } else {
        callback()
      }
    }
    return {
      form: {
        email: '',
        pwd: '',
      },
      rules: {
        email: [
          { validator: validateMail, trigger: 'blur' },
          { type: 'email', message: '请输入合法的邮箱地址', trigger: 'blur' },
        ],
        pwd: [{ validator: validatePwd, trigger: 'blur' }],
      },
    }
  },
  components: {
    MyContent,
    TopBar,
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goRegister() {
      this.$router.replace({ path: '/register' })
    },
    goTo() {
      this.$router.replace({ path: '/main/home' })
    },
    sub(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        this.$message.loading({ content: 'Loading...', key })
        if (valid) {
          setTimeout(() => {
            this.$message.success({ content: '登录成功!', key, duration: 2 })
            this.goTo()
          }, 1000)
        } else {
          setTimeout(() => {
            this.$message.error({ content: '登录失败!', key, duration: 2 })
          }, 1000)
        }
      })
    },
  },
}
</script>

<style scoped>
.arrow {
  font-size: 20px;
}
.title {
  font-size: 20px;
  color: rgb(0 0 0 /0.87);
  font-weight: bold;
}
.title-extend {
  /* display: flex; */
  font-size: 14px;
  font-weight: bold;
  color: #5f5f5f;
  margin-top: 10px;
}
</style>
