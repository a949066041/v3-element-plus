import { defineComponent, PropType, computed } from 'vue'

export default defineComponent({
  name: 'ItemCell',
  props: {
    context: Object as PropType<any>,
    align: String as PropType<string>,
    slots: {
      type: [Function, undefined] as PropType<any>
    }
  },
  setup (props) {
    const context: any = computed(() => props.context)
    if (context.value.slots && typeof props.slots !== 'function') {
      throw new Error(`[ms]:MsTable label:${context.value.label} slots of undefined`)
    }
    const slotScope = context?.slots &&
      { default: (scope: any) => (props.slots as Function)(scope) }
    return () => {
      return (
        <el-table-column
          { ...slotScope }
          { ...context.value?.config }
          prop={context.value?.dataIndex}
          label={context.value?.label}
          align={props.align}
          v-slots={slotScope}
        />
      )
    }
  }
})
