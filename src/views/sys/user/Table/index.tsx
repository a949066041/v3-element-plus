import { defineComponent, PropType, watch } from 'vue'
import MsTable from '@/components/Table'
import useTable, { useTableModal, createColumn, FORMAT_TIME } from '@/hooks/useTable'
import { IUser } from '@/types/model/entity/sys'
import SysForm from './Form'

export default defineComponent({
  name: 'SysUserTable',
  props: {
    deptId: {
      type: Number as PropType<number>,
      default: 0
    }
  },
  setup (props) {
    const { state, searchTable, search, resetSearch } = useTable<IUser>({ api: '/api/users' })

    const { state: mState, openDialog } = useTableModal()
    // 部门变化
    watch(() => props.deptId, (val) => {
      if (val) {
        search.initForm.deptIds = val
        searchTable()
      }
    })

    return () => {
      return (
        <>
          <MsTable
            v-models={[[state.size, 'size'], [state.page, 'page']]}
            { ...state }
            columns={[
              createColumn('username', '用户名'),
              createColumn('nickName', '昵称'),
              createColumn('gender', '性别'),
              createColumn('phone', '电话'),
              createColumn('email', '邮箱'),
              createColumn('createTime', '创建时间', FORMAT_TIME),
              createColumn('tools', '操作', true)
            ]}
            loading={state.loading}
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
                      <el-button type="primary" disabled={state.loading} onClick={searchTable}>搜索</el-button>
                      <el-button type="primary" onClick={resetSearch}>重置</el-button>
                      <el-button type="primary" onClick={() => { openDialog() }}>新增</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              ),
              tools: ({ row }: { row: IUser }) => (
                <>
                  <el-button size="small" type="primary" onClick={() => { openDialog(row.id) }} >修改</el-button>
                </>
              )
            }}
          </MsTable>
          <SysForm v-models={[[mState.visible, 'visible'], [mState.formId, 'formId']]} />
        </>
      )
    }
  }
})
