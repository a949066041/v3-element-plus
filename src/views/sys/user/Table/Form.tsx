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
  components: { MsDialog },
  props: IFormProps,
  setup (props, { emit }) {
    const { formInfo, toggleVisible, form } = useModal({
      findApi: 'api/users/findById'
    }, props, emit)

    return () => {
      return (
        <ms-dialog
          visible={props.visible}
          onClose={() => { toggleVisible(false) }}
        >
          <el-form ref={form} model={formInfo.value}>
            <el-row gutter={20}>
              <el-col span={12}>
                <el-form-item prop="username">
                  <el-input prefix-icon="el-icon-user" v-model={[(formInfo.value as any).avatarName]} placeholder="用户名/邮箱/手机号" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </ms-dialog>
      )
    }
  }
})
