import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'MsSelect',
  props: {
    dataSource: {
      type: Array as PropType<any[]>,
      default: () => ([])
    },
    defaultProps: {
      type: Object as PropType<{ name: string; key: string }>,
      default: () => ({
        key: 'id',
        name: 'name'
      })
    },
    value: {
      type: [String, Number] as PropType<string | number>,
      default: ''
    }
  },
  setup (props, { emit, attrs }) {
    return () => {
      return (
        <el-select { ...attrs } value={props.value} onChange={(val: any) => emit('input', val)}>
          {
            props.dataSource.map((item) => (
              <el-option
                key={item[props.defaultProps.name]}
                label={item[props.defaultProps.name]}
                value={item[props.defaultProps.key]}
              />
            ))
          }
        </el-select>
      )
    }
  }
})
