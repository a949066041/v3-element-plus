import { computed, PropType, ref } from 'vue'

export const modalProps = {
  onClose: {
    type: Function as PropType<Function>
  },
  onOk: {
    type: Function as PropType<Function>
  },
  title: {
    type: String as PropType<string>,
    default: ''
  },
  visible: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  width: {
    type: String as PropType<string>,
    default: ''
  },
  okBtn: {
    type: String as PropType<string>,
    default: '保存'
  },
  isAdd: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  footer: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  height: {
    type: String as PropType<string>,
    default: ''
  }
}

export const useModal = (emit: any, props: any) => {
  const title = computed<string>(() => props.title ? props.title : props.isAdd ? '新增' : '修改')
  const disabledOk = ref<boolean>(false)

  const handleOpen = () => {
    disabledOk.value = false
    emit('open')
  }

  const handleCancel = () => {
    emit('close')
  }

  const handleOkClick = () => {
    disabledOk.value = true
    emit('ok')
  }

  return {
    handleOpen,
    handleCancel,
    handleOkClick,
    disabledOk,
    title
  }
}
