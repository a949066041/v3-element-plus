import { defineComponent } from 'vue'
import MsTable from '@/components/Table'
import { getMenus } from '@/api/sys/menu'
import useTable from '@/hooks/useTable'
import { IMenu } from '@/types/model/entity/sys'

export default defineComponent({
  name: 'SysMenu',
  setup () {
    const { state, searchTable, resetSearch, search } = useTable<IMenu>({ api: '/api/menus' })

    const getChildrenMenus = (tree: any, treeNode: any, resolve: any) => {
      getMenus(tree.id).then(res => {
        resolve(res.content)
      })
    }

    return () => {
      return (
        <MsTable
          v-models={[[state.size, 'size'], [state.page, 'page']]}
          { ...state }
          columns={[
            { dataIndex: 'title', label: '菜单标题' },
            { dataIndex: 'icon', label: '图标' },
            { dataIndex: 'menuSort', label: '排序' },
            { dataIndex: 'permission', label: '权限标识' },
            { dataIndex: 'component', label: '组件路径' },
            { dataIndex: 'createTime', label: '创建时间', time: true }
          ]}
          tree-props={{ children: 'children', hasChildren: 'hasChildren' }}
          row-key="id"
          { ... {
            lazy: true,
            load: getChildrenMenus
          }}
        >
          {{
            search: () => (
              <el-form>
                <el-row gutter={20}>
                  <el-col span={4}>
                    <el-form-item prop="a">
                      <el-input v-model={search.searchForm.a} />
                    </el-form-item>
                  </el-col>
                  <el-col span={8}>
                    <el-button type="primary" onClick={searchTable}>搜索</el-button>
                    <el-button type="primary" onClick={resetSearch}>重置</el-button>
                  </el-col>
                </el-row>
              </el-form>
            )
          }}
        </MsTable>
      )
    }
  }
})
