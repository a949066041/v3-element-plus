import { defineComponent, PropType, h, Slot } from 'vue'
import { parseTime } from '@/utils'
import { IItemConfig } from '@/types/components'
// 修改了源码中的深拷贝
// node_modules/element-plus/lib/el-table-column/index.js
// return vue.h('div', props, [prefix, children]);
export default defineComponent({
  name: 'ItemCell',
  props: {
    context: Object as PropType<IItemConfig>,
    align: String as PropType<string>,
    slots: {
      type: Function as PropType<Slot>,
      default: undefined
    }
  },
  setup (props) {
    const { context } = props
    if (context?.slots && typeof props.slots !== 'function') {
      throw new Error(`[ms]:MsTable label:${context.label} slots of undefined`)
    }
    const dataIndex: string = context?.dataIndex as string
    const slotScope = context?.slots
      ? { default: (scope: any) => props.slots({ ...scope, value: scope.row[dataIndex] }) }
      : context?.time && { default: (scope: any) => h('span', parseTime(scope.row[dataIndex])) }
    return () => {
      return (
        <el-table-column
          key={dataIndex}
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
