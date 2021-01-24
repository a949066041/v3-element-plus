import { computed, reactive, ref, toRefs, watch } from 'vue'
import action, { get } from '@/api'
import { ElMessage } from 'element-plus'

const useModal = function<T> (options: any, props: any, emit: any) {
  const form = ref<any>(null)
  const states = reactive({
    isAdd: computed<boolean>(() => !props.formId),
    formInfo: {
      username: '123'
    },
    loading: false
  })

  const toggleVisible = (val: boolean) => { emit('update:visible', val) }

  const findFormById = () => {
    if (!states.isAdd && props.formId) {
      states.loading = true
      get(options.findApi, { formId: props.formId })
        .then((res) => {
          states.formInfo = res
        }).finally(() => {
          states.loading = false
        })
    }
  }

  const resetForm = () => {
    states.formInfo = {
      username: '1233'
    }
    form.value.resetFields()
  }

  const saveForm = () => {
    form.value.validate((valid: boolean) => {
      if (valid) {
        action[states.isAdd ? 'post' : 'put'](options.saveUrl, states.formInfo)
          .then(() => {
            ElMessage.success(states.isAdd ? '添加成功' : '编辑成功')
            toggleVisible(false)
          })
      }
    })
  }

  watch(() => props.formId, (val: string | number) => { val && findFormById() })

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
    ...toRefs(states)
  }
}

export default useModal
