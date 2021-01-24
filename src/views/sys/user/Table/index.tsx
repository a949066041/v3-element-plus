import { defineComponent } from 'vue'
import MsTable from '@/components/Table'
import useTable from '@/hooks/useTable'
import { IUser } from '@/types/model/entity/sys'

export default defineComponent({
  name: 'SysUserTable',
  setup () {
    const { state, searchTable, search, resetSearch } = useTable<IUser>({ api: '/api/users' })
    return () => {
      return (
        <>
          <MsTable
            v-models={[[state.size, 'size'], [state.page, 'page']]}
            { ...state }
            columns={[
              { dataIndex: 'username', label: '用户名' },
              { dataIndex: 'nickName', label: '昵称' },
              { dataIndex: 'gender', label: '性别' },
              { dataIndex: 'phone', label: '电话' },
              { dataIndex: 'email', label: '邮箱' },
              { dataIndex: 'createTime', label: '创建时间', time: true }
            ]}
          >
            {{
              search: () => (
                <el-form model={search.searchForm}>
                  <el-row gutter={20}>
                    <el-col span={4}>
                      <el-form-item prop="blurry">
                        <el-input v-model={search.searchForm.blurry} placeholder="输入部门名称搜索" />
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
        </>
      )
    }
  }
})
