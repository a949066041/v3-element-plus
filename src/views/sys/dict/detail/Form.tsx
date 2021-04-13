import { defineComponent, PropType } from 'vue'
import MsDialog from '@/components/Dialog'
import useModal from '@/hooks/useModal'
import { IDict, IDictDetail } from '@/types/model/entity/sys'
import { useExpose, useParent } from '@/hooks/useExpose'

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
  name: 'DictDetailForm',
  props: IFormProps,
  setup (props, { emit }) {
    const parent = useParent()
    const { state, form, toggleVisible, saveForm } = useModal<IDictDetail>({
      findApi: '/api/dictDetail/findById',
      saveUrl: '/api/dictDetail/'
    }, props, emit)

    useExpose({
      handleBeforeSubmit: () => {
        return { dict: { id: (parent.dict as IDict).id } }
      }
    })

    const rules = {
      label: [
        { required: true, message: '请输入字典标签', trigger: 'blur' }
      ],
      value: [
        { required: true, message: '请输入字典值', trigger: 'blur' }
      ],
      dictSort: [
        { required: true, message: '请输入排序', trigger: 'blur' }
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
                    <el-form-item label="字典标签" prop="label">
                      <el-input v-model={state.formInfo.label} placeholder="请输入字典标签" />
                    </el-form-item>
                  </el-col>
                  <el-col span={24}>
                    <el-form-item label="字典值" prop="value">
                      <el-input v-model={state.formInfo.value} placeholder="请输入字典值" />
                    </el-form-item>
                  </el-col>
                  <el-col span={24}>
                    <el-form-item label="排序" prop="dictSort">
                      <el-input-number v-model={state.formInfo.dictSort} placeholder="请输入排序" />
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
