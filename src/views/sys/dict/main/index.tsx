import { defineComponent } from 'vue'
import MsTable from '@/components/Table'
import useTable, { createColumn, FORMAT_TIME, useTableModal } from '@/hooks/useTable'
import useTools from '@/hooks/useTools'
import { IDict } from '@/types/model/entity/sys'
import DictForm from './Form'
import '../index.scss'

export default defineComponent({
  name: 'DictMain',
  props: {
    onChoose: Function
  },
  emits: ['choose'],
  setup (props, { emit }) {
    const { state, searchTable, resetSearch, search } = useTable<IDict>({ api: '/api/dict' })

    const { state: mState, openDialog } = useTableModal()

    const { handleDelByIds } = useTools({ api: '/api/dict' })
    return () => {
      return (
        <>
          <el-card>
            {{
              header: () => (
                <div class="dict-header">
                  <h1>字典主表</h1>
                  <div class="dict-header-tools">
                    <el-button type="primary" onClick={() => openDialog()}>添加</el-button>
                  </div>
                </div>
              ),
              default: () => (
                <MsTable
                  v-models={[[state.size, 'size'], [state.page, 'page']]}
                  { ...state }
                  columns={[
                    createColumn('name', '名称'),
                    createColumn('description', '描述'),
                    createColumn('createTime', '创建时间', FORMAT_TIME),
                    createColumn('tools', '操作', true)
                  ]}
                  loading={state.loading}
                  onRowClick={(row: IDict) => emit('choose', { name: row.name, id: row.id })}
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
                    tools: ({ row }: { row: IDict }) => (
                      <>
                        <el-button type="primary" size="small" icon="el-icon-edit" onClick={() => { openDialog(row.id) }} />
                        <el-popconfirm
                          title="确定删除本条数据吗？"
                          onConfirm={() => { handleDelByIds(row.id) }}
                        >
                          {{
                            reference: () => (
                              <el-button type="danger" size="small" icon="el-icon-delete" />
                            )
                          }}
                        </el-popconfirm>
                      </>
                    )
                  }}
                </MsTable>
              )
            }}
          </el-card>
          <DictForm v-models={[[mState.visible, 'visible'], [mState.formId, 'formId']]} />
        </>
      )
    }
  }
})
