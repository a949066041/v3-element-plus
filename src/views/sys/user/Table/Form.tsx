import { defineComponent, onMounted, PropType, reactive } from 'vue'
import MsDialog from '@/components/Dialog'
import useModal from '@/hooks/useModal'
import { getAllJob } from '@/api/sys/job'
import { IPageResponse } from '@/api'
import { IJob, IUser } from '@/types/model/entity/sys'

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
    } = reactive({
      jobList: []
    })
    const { state, form, toggleVisible } = useModal<IUser>({
      findApi: 'api/users/findById'
    }, props, emit)

    onMounted(() => {
      getAllJob().then((data) => { lists.jobList = data.content })
    })

    return () => {
      return (
        <MsDialog
          visible={props.visible}
          onClose={() => { toggleVisible(false) }}
        >
          {
            props.visible &&
            (
              <el-form v-loading={state.loading} ref={form} model={state.formInfo}>
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
                    <el-form-item label="岗位" prop="jobs">
                      <el-select v-model={state.formInfo.jobs} multiple>
                        {
                          lists.jobList.map((item) => (
                            <el-option
                              key={item.name}
                              label={item.name}
                              value={item.id}
                            />
                          ))
                        }
                      </el-select>
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
