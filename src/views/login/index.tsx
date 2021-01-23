import './styles.scss'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { code } from '@/api/sys/auth'
import { ILoginState } from '@/types/views/login'
import { IRCode } from '@/types/model/response/sys'
import { Store, useStore } from 'vuex'
import { ISAuthUser } from '@/types/model/request/sys'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup () {
    const store: Store<any> = useStore()
    const loginForm = ref<any>(null)
    const route = useRoute()
    const router = useRouter()
    const redirect = computed(() => route.query && route.query.redirect)
    const rules: { [key: string]: any[] } = {
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ],
      code: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
      ]
    }
    const state: ILoginState = reactive({
      formInfo: {
        username: 'admin',
        password: '123456'
      },
      loginDisabled: false,
      codeInfo: {} as IRCode
    })

    // 刷新验证码
    const refreshCode = () => { code().then((codeInfo) => { state.codeInfo = codeInfo }) }

    // store login
    const login = (form: ISAuthUser) => store.dispatch('user/login', form)

    const userLogin = () => {
      loginForm.value.validate((valid: boolean) => {
        if (valid) {
          state.loginDisabled = true
          login({ ...state.formInfo, uuid: state.codeInfo.uuid })
            .then((user) => {
              user && router.push({ path: redirect.value as string || '/' })
            }).catch(refreshCode).finally(() => { state.loginDisabled = false })
        }
      })
    }

    onMounted(refreshCode)

    return () => {
      return (
        <div class="login-bg">
          <div class="login-wrapper">
            <div class="login-box animate__animated animate__zoomIn">
              <div class="login-title animate__animated animate__slideInRight">用户登录</div>
              <div class="form">
                <el-form ref={loginForm} rules={rules} model={state.formInfo}>
                  <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user" v-model={[state.formInfo.username]} placeholder="用户名/邮箱/手机号" />
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-lock" type="password" v-model={[state.formInfo.password]} placeholder="密码" />
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-row gutter={10}>
                      <el-col span={14}>
                        <el-input
                          prefix-icon="el-icon-key"
                          v-model={[state.formInfo.code]}
                          placeholder="验证码"
                        />
                      </el-col>
                      <el-col span={10}>
                        <img class="code-img" onClick={refreshCode} src={state.codeInfo.img} />
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-button type="primary" onClick={userLogin} disabled={state.loginDisabled} class="submit-button">
                    { state.loginDisabled ? '登录中。。。' : '登录' }
                  </el-button>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
})
