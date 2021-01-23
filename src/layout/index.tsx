import { defineComponent } from 'vue'
import './style.scss'

export default defineComponent({
  name: 'Layout',
  setup () {
    return () => {
      return (
        <el-container class="ms__layout">
          <el-aside>
            <el-menu active-text-color="#409eff" default-openeds={['1', '3']}>
              <el-submenu index="1">
                {{
                  title: () => (<><i class="el-icon-message"></i>导航一</>),
                  default: () => (
                    <>
                      <el-menu-item-group>
                        {{
                          title: () => (<>分组一</>),
                          default: () => (
                            <>
                              <el-menu-item index="1-1">选项1</el-menu-item>
                              <el-menu-item index="1-2">选项2</el-menu-item>
                            </>
                          )
                        }}
                      </el-menu-item-group>
                      <el-menu-item-group title="分组2">
                        {{
                          default: () => (<el-menu-item index="1-3">选项3</el-menu-item>)
                        }}
                      </el-menu-item-group>
                    </>
                  )
                }}
              </el-submenu>
              <el-submenu index="2">
                {{
                  title: () => (<><i class="el-icon-menu"></i>导航二</>),
                  default: () => (
                    <>
                      <el-menu-item-group>
                        {{
                          title: () => (<>分组一</>),
                          default: () => (
                            <>
                              <el-menu-item index="2-1">选项1</el-menu-item>
                              <el-menu-item index="2-2">选项2</el-menu-item>
                            </>
                          )
                        }}
                      </el-menu-item-group>
                      <el-menu-item-group title="分组2">
                        <el-menu-item index="2-3">选项3</el-menu-item>
                      </el-menu-item-group>
                    </>
                  )
                }}
              </el-submenu>
            </el-menu>
          </el-aside>

          <el-container>
            <el-header style="text-align: right; font-size: 12px">
              header
            </el-header>

            <el-main>
              <div class="context">
                <div>
                  {
                    [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item) => (
                      <div>{ item }</div>
                    ))
                  }
                </div>
              </div>
            </el-main>
          </el-container>
        </el-container>
      )
    }
  }
})
