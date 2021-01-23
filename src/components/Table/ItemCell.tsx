import { defineComponent, PropType, h, Slot } from 'vue'
import { parseTime } from '@/utils'
import { IItemConfig } from '@/types/components'

export default defineComponent({
  name: 'ItemCell',
  props: {
    context: Object as PropType<IItemConfig>,
    align: String as PropType<string>,
    slots: {
      type: Object as PropType<Slot>,
      default: undefined
    }
  },
  setup (props) {
    const { context } = props
    if (context?.slots && typeof props.slots !== 'function') {
      throw new Error(`[ms]:MsTable label:${context.label} slots of undefined`)
    }
    const slotScope = context?.slots
      ? { default: (scope: any) => props.slots(scope) }
      : context?.time && { default: (scope: any) => h('span', parseTime(scope.row[context?.dataIndex as string])) }
    return () => {
      return (
        <el-table-column
          { ...slotScope }
          { ...context?.config }
          prop={context?.dataIndex}
          label={context?.label}
          align={props.align}
          v-slots={slotScope}
        />
      )
    }
  }
})
