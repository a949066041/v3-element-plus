import { defineComponent, PropType } from 'vue'
import MsDialog from '@/components/Dialog'
import useModal from '@/hooks/useForm'

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
    const { state, form, toggleVisible } = useModal({
      findApi: 'api/users/findById'
    }, props, emit)

    return () => {
      return (
        <MsDialog
          visible={props.visible}
          onClose={() => { toggleVisible(false) }}
        >
          {
            props.visible &&
            (
              <el-form ref={form} model={state.formInfo}>
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
                </el-row>
              </el-form>
            )
          }
        </MsDialog>
      )
    }
  }
})
