import { defineComponent, onMounted, PropType, reactive } from 'vue'
import MsDialog from '@/components/Dialog'
import useModal from '@/hooks/useModal'
import { getAllJob } from '@/api/sys/job'
import { getCacheDept } from '@/api/sys/dept'
import { getCacheRoles } from '@/api/sys/role'
import { IDept, IJob, IRole, IUser } from '@/types/model/entity/sys'
import MsSelect from '@/components/Select'

const IFormProps = {
  formId: {
    type: [String, Number] as PropType<string | number>,
    default: 0
  },
  visible: {
    type: Boolean as PropType<boolean>,
    default: false
  }
} as const

export default defineComponent({
  name: 'SysForm',
  props: IFormProps,
  setup (props, { emit }) {
    const lists: {
      jobList: IJob[];
      deptList: IDept[];
      roleList: IRole[];
    } = reactive({
      jobList: [],
      deptList: [],
      roleList: []
    })
    const { state, form, toggleVisible, saveForm } = useModal<IUser>({
      findApi: '/api/users/findById',
      saveUrl: '/api/users/'
    }, props, emit)

    onMounted(() => {
      getAllJob().then((data) => { lists.jobList = data.content })
      getCacheDept().then((data) => { lists.deptList = data.content })
      getCacheRoles().then((data) => { lists.roleList = data.content })
    })

    return () => {
      return (
        <MsDialog
          visible={props.visible}
          onClose={() => { toggleVisible(false) }}
          onOk={saveForm}
          isAdd={!props.formId}
        >
          {
            props.visible &&
            (
              <el-form v-loading={state.loading} label-position="left" label-width="100px" ref={form} model={state.formInfo}>
                <el-row gutter={20}>
                  <el-col span={12}>
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model={state.formInfo.username} />
                    </el-form-item>
                  </el-col>
                  <el-col span={12}>
                    <el-form-item label="电话" prop="phone">
                      <el-input v-model={state.formInfo.phone} maxlength={11} />
                    </el-form-item>
                  </el-col>
                  <el-col span={12}>
                    <el-form-item label="昵称" prop="nickName">
                      <el-input v-model={state.formInfo.nickName} />
                    </el-form-item>
                  </el-col>
                  <el-col span={12}>
                    <el-form-item label="邮箱" prop="email">
                      <el-input v-model={state.formInfo.email} />
                    </el-form-item>
                  </el-col>
                  <el-col span={12}>
                    <el-form-item label="部门" prop="deptId">
                      <MsSelect v-model={state.formInfo.deptId} dataSource={lists.deptList} />
                    </el-form-item>
                  </el-col>
                  <el-col span={12}>
                    <el-form-item label="岗位" prop="jobs">
                      <MsSelect v-model={state.formInfo.jobs} dataSource={lists.jobList} { ...{ multiple: true }} />
                    </el-form-item>
                  </el-col>
                  <el-col span={12}>
                    <el-form-item label="性别" prop="gender">
                      <el-radio-group v-model={state.formInfo.gender}>
                        <el-radio label="男" />
                        <el-radio label="女" />
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col span={12}>
                    <el-form-item label="状态" prop="enabled">
                      <el-radio-group v-model={state.formInfo.enabled}>
                        <el-radio label={true}>激活</el-radio>
                        <el-radio label={false}>禁用</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col span={24}>
                    <el-form-item label="角色" prop="roles">
                      <MsSelect v-model={state.formInfo.roles} dataSource={lists.roleList} { ...{ multiple: true }} />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            )
          }
        </MsDialog>
      )
    }
  }
})
