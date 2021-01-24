import { defineComponent, Transition } from 'vue'
import './style.scss'

export default defineComponent({
  name: 'MsFull',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { slots, emit }) {
    return () => {
      return (
        <Transition
          name="dialog-fade"
        >
          <div class="ms__full" v-show={props.visible}>
            <div class="ms__context">
              <div class="el-dialog__header">
                <button type="button" aria-label="close" class="el-dialog__headerbtn" onClick={() => emit('update:visible', false)}>
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
