import { defineComponent, reactive, ref } from 'vue'
import MsTable from '@/components/Table'
import MsDialog from '@/components/Dialog'
import useTable from '@/hooks/useTable'
import { IUser } from '@/types/model/entity/sys'

export default defineComponent({
  name: 'SysUser',
  setup () {
    const { state, searchTable } = useTable<IUser>({ api: '/api/users' })
    const dialog = ref(false)
    const mState = reactive({
      formInfo: {
        username: ''
      }
    })
    return () => {
      return (
        <>
          <MsDialog v-model={[dialog.value, 'visible']} isAdd={true}>
            {{
              default: () => (
                <el-form ref="formRef" model={mState.formInfo} size="small" label-width="66px">
                  <el-row gutter={20}>
                    <el-col span={12}>
                      <el-form-item label="用户名" prop="username">
                        <el-input v-model={mState.formInfo.username} />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              ),
              footer: () => (
                <>
                  <el-button>确定</el-button>
                </>
              )
            }}
          </MsDialog>
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
                <el-form>
                  <el-row gutter={20}>
                    <el-col span={4}>
                      <el-form-item prop="a">
                        <el-input v-model={state.searchForm.blurry} placeholder="输入部门名称搜索" />
                      </el-form-item>
                    </el-col>
                    <el-col span={8}>
                      <el-button type="primary" onClick={searchTable}>搜索</el-button>
                      <el-button type="primary" onClick={() => { dialog.value = true }}>重置</el-button>
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
