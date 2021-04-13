import { defineComponent, PropType } from 'vue'
import MsDialog from '@/components/Dialog'
import useModal from '@/hooks/useModal'
import { IDict } from '@/types/model/entity/sys'

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
  name: 'DictForm',
  props: IFormProps,
  setup (props, { emit }) {
    const { state, form, toggleVisible, saveForm } = useModal<IDict>({
      findApi: 'api/dict/findById',
      saveUrl: 'api/dict/'
    }, props, emit)

    const rules = {
      name: [
        { required: true, message: '请输入字典名称', trigger: 'blur' }
      ]
    }

    return () => {
      return (
        <MsDialog
          visible={props.visible}
          onClose={() => { toggleVisible(false) }}
          onOk={saveForm}
          isAdd={!props.formId}
          width="600px"
        >
          {
            props.visible &&
            (
              <el-form v-loading={state.loading} rules={rules} label-position="left" label-width="100px" ref={form} model={state.formInfo}>
                <el-row gutter={20}>
                  <el-col span={24}>
                    <el-form-item label="字典名称" prop="name">
                      <el-input v-model={state.formInfo.name} />
                    </el-form-item>
                  </el-col>
                  <el-col span={24}>
                    <el-form-item label="描述" prop="description">
                      <el-input v-model={state.formInfo.description} maxlength={11} />
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
