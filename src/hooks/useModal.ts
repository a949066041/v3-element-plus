import { computed, reactive, ref, watch } from 'vue'
import action, { get } from '@/api'
import { ElMessage } from 'element-plus'
import { IUseModal, IUseModalState } from '@/types/hooks'

const useModal = function<T> (options: any, props: any, emit: any): IUseModal<T> {
  const form = ref<any>(null)
  const state: IUseModalState<T> = reactive({
    isAdd: computed<boolean>(() => !props.formId),
    formInfo: {} as any,
    loading: false
  })

  const toggleVisible = (val: boolean) => { emit('update:visible', val) }

  const findFormById = () => {
    if (!state.isAdd && props.formId) {
      state.loading = true
      get(options.findApi, { formId: props.formId })
        .then((res) => {
          state.formInfo = res
        }).finally(() => {
          state.loading = false
        })
    }
  }

  const resetForm = () => {
    state.formInfo = {} as T
    form.value.resetFields()
  }

  const saveForm = () => {
    form.value.validate((valid: boolean) => {
      if (valid) {
        action[state.isAdd ? 'post' : 'put'](options.saveUrl, state.formInfo)
          .then(() => {
            ElMessage.success(state.isAdd ? '添加成功' : '编辑成功')
            toggleVisible(false)
          })
      }
    })
  }

  watch(() => props.visible, (val: string | number) => { val && findFormById() })

  watch(() => props.visible, (val) => {
    if (!val) {
      resetForm()
      emit('update:formId', '')
    }
  })

  return {
    saveForm,
    toggleVisible,
    form,
    state
  }
}

export default useModal
