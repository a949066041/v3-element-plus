import { defineComponent } from 'vue'
import MsTable from '@/components/Table'
import useTable from '@/hooks/useTable'
import { IRole } from '@/types/model/entity/sys'

export default defineComponent({
  name: 'SysRole',
  setup () {
    const { state, searchTable, resetSearch } = useTable<IRole>({ api: '/api/roles' })
    return () => {
      return (
        <MsTable
          v-models={[[state.size, 'size'], [state.page, 'page']]}
          { ...state }
          columns={[
            { dataIndex: 'name', label: '名称' },
            { dataIndex: 'dataScope', label: '数据权限' },
            { dataIndex: 'level', label: '角色级别' },
            { dataIndex: 'description', label: '描述', config: { 'show-overflow-tooltip': true } },
            { dataIndex: 'createTime', label: '创建时间', time: true }
          ]}
        >
          {{
            search: () => (
              <el-form>
                <el-row gutter={20}>
                  <el-col span={4}>
                    <el-form-item prop="a">
                      <el-input v-model={state.searchForm.a} />
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
