import { defineComponent } from 'vue'
import MsTable from '@/components/Table'
import useTable, { useTableModal } from '@/hooks/useTable'
import { IDict } from '@/types/model/entity/sys'
import DictForm from './Form'
import '../index.scss'

export default defineComponent({
  name: 'DictMain',
  setup (props, { emit }) {
    const { state, searchTable, resetSearch, search } = useTable<IDict>({ api: '/api/dict' })

    const { state: mState, openDialog } = useTableModal()
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
                    { dataIndex: 'name', label: '名称' },
                    { dataIndex: 'description', label: '描述' },
                    { dataIndex: 'createTime', label: '创建时间', time: true },
                    { dataIndex: 'tools', label: '操作', slots: true }
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
                    tools: ({ row }: { row: IDict }) => (
                      <>
                        <el-button size="small" onClick={() => { emit('update:dict', { name: row.name, id: row.id }) }}>配置</el-button>
                        <el-button size="small" onClick={() => { openDialog(row.id) }}>修改</el-button>
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
