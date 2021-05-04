import { defineComponent } from 'vue'
import MsTable from '@/components/Table'
import useTable, { createColumn, FORMAT_TIME } from '@/hooks/useTable'
import { IDept } from '@/types/model/entity/sys'

export default defineComponent({
  name: 'SysDept',
  setup () {
    const { state, searchTable, resetSearch, search } = useTable<IDept>({ api: '/api/dept' })
    return () => {
      return (
        <MsTable
          v-models={[[state.size, 'size'], [state.page, 'page']]}
          { ...state }
          columns={[
            createColumn('name', '名称'),
            createColumn('deptSort', '排序'),
            createColumn('createTime', '创建时间', FORMAT_TIME)
          ]}
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
