import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'MsDialog',
  props: {
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
      default: '确定'
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
  },
  emits: ['update:visible', 'close', 'open', 'ok'],
  setup (props, { emit, slots }) {
    const disabled = ref<boolean>(false)
    const toggleVisible = (val: boolean) => { emit('update:visible', val) }

    const cancel = () => {
      emit('close')
      toggleVisible(false)
    }

    const open = () => {
      disabled.value = false
      emit('open')
    }

    const ok = () => {
      disabled.value = true
      emit('ok')
    }
    return () => {
      return (
        <el-dialog
          append-to-body
          model-value={props.visible}
          close-on-click-modal={false}
          before-close={cancel}
          onOpen={open}
          title={props.title ? props.title : props.isAdd ? '新增' : '修改'}
        >
          {{
            default: () => slots.default && slots.default(),
            footer: () => props.footer && slots.footer ? slots.footer() : (
              <>
                <el-button type="text" onClick={cancel}>取 消</el-button>
                <el-button
                  type="primary"
                  disabled={disabled.value}
                  onClick={ok}
                >
                  { props.okBtn }
                </el-button>
              </>
            )
          }}
        </el-dialog>
      )
    }
  }
})
