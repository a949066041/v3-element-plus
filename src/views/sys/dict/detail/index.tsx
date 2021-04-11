import { defineComponent, PropType, watch } from 'vue'
import MsTable from '@/components/Table'
import { IDictDetail } from '@/types/model/entity/sys'
import useTable from '@/hooks/useTable'

export default defineComponent({
  name: 'DictDetail',
  props: {
    dictName: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup (props) {
    const { state, search, searchTable, resetSearch } = useTable<IDictDetail>({ api: '/api/dictDetail' }, false)

    watch(() => props.dictName, () => {
      search.initForm.dictName = props.dictName
      searchTable()
    })
    return () => {
      return (
        <el-card>
          {{
            header: () => (
              <div class="dict-header">
                <h1>字典子表</h1>
                <div class="dict-header-tools">
                  <el-link type="primary">添加</el-link>
                </div>
              </div>
            ),
            default: () => (
              <MsTable
                total={state.total}
                dataSource={state.dataSource}
                columns={[
                  { dataIndex: 'label', label: '字典标签', slots: true },
                  { dataIndex: 'value', label: '字典值', config: { 'show-overflow-tooltip': true } },
                  { dataIndex: 'dictSort', label: '排序', config: { 'show-overflow-tooltip': true } },
                  { dataIndex: 'createTime', label: '创建时间', time: true }
                ]}
              >
                {{
                  search: () => (
                    <el-form>
                      <el-row gutter={20}>
                        <el-col span={6}>
                          <el-form-item prop="label">
                            <el-input v-model={search.searchForm.label} />
                          </el-form-item>
                        </el-col>
                        <el-col span={8}>
                          <el-button type="primary" onClick={searchTable}>搜索</el-button>
                          <el-button onClick={resetSearch}>重置</el-button>
                        </el-col>
                      </el-row>
                    </el-form>
                  ),
                  label: ({ value }: { value: string }) => (<div>{ value }</div>)
                }}
              </MsTable>
            )
          }}
        </el-card>
      )
    }
  }
})
