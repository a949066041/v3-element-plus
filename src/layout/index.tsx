import { defineComponent } from 'vue'
import SideBar from './components/SideBar'
import './style.scss'
import { useStore } from 'vuex'
import { useRouter, RouterView } from 'vue-router'

export default defineComponent({
  name: 'Layout',
  setup () {
    const store = useStore()
    const router = useRouter()
    return () => {
      return (
        <el-container class="ms__layout">
          <el-aside width="200px">
            <SideBar />
          </el-aside>

          <el-container>
            <el-header>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
              </el-breadcrumb>
              <el-dropdown>
                {{
                  default: () => (
                    <span class="el-dropdown-link">
                      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </span>
                  ),
                  dropdown: () => (
                    <el-dropdown-menu>
                      <el-dropdown-item divided onClick={() => {
                        store.dispatch('user/logout')
                          .then(() => {
                            router.push({ name: 'Login', replace: true })
                          })
                      }}>退出</el-dropdown-item>
                    </el-dropdown-menu>
                  )
                }}
              </el-dropdown>
            </el-header>

            <el-main>
              <div class="context">
                <RouterView />
              </div>
            </el-main>
          </el-container>
        </el-container>
      )
    }
  }
})
