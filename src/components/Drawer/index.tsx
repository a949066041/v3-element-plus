import { defineComponent } from 'vue'
import { modalProps, useModal } from '../Modal/useModal'
import './style.scss'

export default defineComponent({
  name: 'MsDrawer',
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
        <el-drawer
          title={title.value}
          model-value={props.visible}
          direction="rtl"
          onOpen={handleOpen}
          before-close={handleCancel}
        >
          <div class="ms__drawer__form">
            <div class="form__context">
              { slots.default && slots.default() }
            </div>
            <div class="form__footer">
              <el-link type="primary" onClick={handleCancel}>取 消</el-link>
              <el-button
                type="primary"
                disabled={disabledOk.value}
                onClick={handleOkClick}
              >
                { props.okBtn }
              </el-button>
            </div>
          </div>
        </el-drawer>
      )
    }
  }
})
