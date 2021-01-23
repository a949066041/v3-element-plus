import { defineComponent } from 'vue'
import MsTable from '@/components/Table'
import useTable from '@/hooks/useTable'
import { IDept } from '@/types/model/entity/sys'

export default defineComponent({
  name: 'SysDept',
  setup () {
    const { state, searchTable, resetSearch } = useTable<IDept>({ api: '/api/dept' })
    return () => {
      return (
        <MsTable
          v-models={[[state.size, 'size'], [state.page, 'page']]}
          { ...state }
          columns={[
            { dataIndex: 'name', label: '名称' },
            { dataIndex: 'deptSort', label: '排序' },
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
