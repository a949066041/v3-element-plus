import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import SideBar from './components/SideBar'
import './style.scss'

export default defineComponent({
  name: 'Layout',
  setup () {
    return () => {
      return (
        <el-container class="ms__layout">
          <el-aside>
            <SideBar />
          </el-aside>

          <el-container>
            <el-header style="text-align: right; font-size: 12px">
              header
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
