import { defineComponent, PropType, watch } from 'vue'
import MsTable from '@/components/Table'
import { IDict, IDictDetail } from '@/types/model/entity/sys'
import useTable, { createColumn, FORMAT_TIME, TOOL_TIP, useTableModal } from '@/hooks/useTable'
import DictDetailForm from './Form'

export default defineComponent({
  name: 'DictDetail',
  props: {
    dict: {
      type: Object as PropType<IDict>,
      default: () => ({})
    }
  },
  setup (props) {
    const { state, search, searchTable, resetSearch } = useTable<IDictDetail>({ api: '/api/dictDetail' }, false)

    const { state: mState, openDialog } = useTableModal()

    watch(() => props.dict, () => {
      search.initForm.dictName = props.dict.name
      searchTable()
    })
    return () => {
      return (
        <>
          <el-card>
            {{
              header: () => (
                <div class="dict-header">
                  <h1>字典子表</h1>
                  {
                    props.dict.id && (
                      <div class="dict-header-tools">
                        <el-button type="primary" onClick={() => openDialog()}>添加</el-button>
                      </div>
                    )
                  }
                </div>
              ),
              default: () => (
                <MsTable
                  total={state.total}
                  dataSource={state.dataSource}
                  columns={[
                    createColumn('label', '字典标签'),
                    createColumn('value', '字典值', TOOL_TIP),
                    createColumn('dictSort', '排序', TOOL_TIP),
                    createColumn('createTime', '创建时间', FORMAT_TIME),
                    createColumn('tools', '操作', true)
                  ]}
                  loading={state.loading}
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
                    tools: ({ row }: { row: IDictDetail }) => (
                      <>
                        <el-button type="primary" size="small" icon="el-icon-edit" onClick={() => { openDialog(row.id) }} />
                        <el-button type="danger" size="small" icon="el-icon-delete" onClick={() => { openDialog(row.id) }} />
                      </>
                    )
                  }}
                </MsTable>
              )
            }}
          </el-card>
          <DictDetailForm v-models={[[mState.visible, 'visible'], [mState.formId, 'formId']]} />
        </>
      )
    }
  }
})
