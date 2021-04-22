import { defineComponent, Transition } from 'vue'
import { modalProps, useModal } from '../Modal/useModal'
import './style.scss'

export default defineComponent({
  name: 'MsFull',
  props: modalProps,
  emits: ['close', 'open', 'ok'],
  setup (props, { slots, emit }) {
    const {
      handleOpen,
      handleCancel,
      handleOkClick,
      disabledOk,
      title
    } = useModal(emit, props)
    const cancel = () => { emit('close') }
    return () => {
      return (
        <Transition
          name="dialog-fade"
          onAfterEnter={handleOpen}
          onAfterLeave={handleCancel}
        >
          <div class="ms__full" v-show={props.visible}>
            <div class="ms__context">
              <div class="el-dialog__header">
                <div class="header__title">
                  { title.value }
                </div>
                <div class="tools">
                  <el-link
                    type="primary"
                    disabled={disabledOk.value}
                    onClick={handleOkClick}
                  >
                    { props.okBtn }
                  </el-link>
                </div>
                <button type="button" aria-label="close" class="el-dialog__headerbtn" onClick={cancel}>
                  <i class="close el-icon-close"></i>
                </button>
              </div>
              <div class="el-dialog__body">
                { slots.default && slots.default() }
              </div>
            </div>
          </div>
        </Transition>
      )
    }
  }
})
