import { defineComponent, PropType } from 'vue'
import { modalProps } from './useModal'
import MsFull from '../Full'
import MsDialog from '../Dialog'
import MsDrawer from '../Drawer'

export default defineComponent({
  name: 'MsModal',
  props: {
    ...modalProps,
    type: {
      type: Number as PropType<number>,
      default: 0
    }
  },
  setup (props, { attrs, slots }) {
    return () => {
      return (
        props.type === 0 ? <MsFull { ...props } { ...attrs }> {{ default: () => slots.default }} </MsFull>
          : props.type === 1 ? <MsDrawer { ...props } { ...attrs } />
            : <MsDialog { ...props } { ...attrs } />
      )
    }
  }
})
