import { defineComponent } from 'vue'
import { modalProps, useModal } from '../Modal/useModal'

export default defineComponent({
  name: 'MsDialog',
  props: modalProps,
  emits: ['close', 'open', 'ok'],
  setup (props, { emit, slots }) {
    const {
      handleOpen,
      handleCancel,
      handleOkClick,
      disabledOk,
      title
    } = useModal(emit, props)
    return () => {
      return (
        <el-dialog
          model-value={props.visible}
          close-on-click-modal={false}
          before-close={handleCancel}
          onOpen={handleOpen}
          title={title.value}
        >
          {{
            default: () => slots.default && slots.default(),
            footer: () => props.footer && slots.footer ? slots.footer() : (
              <>
                <el-button type="text" onClick={handleCancel}>取 消</el-button>
                <el-button
                  type="primary"
                  disabled={disabledOk.value}
                  onClick={handleOkClick}
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
