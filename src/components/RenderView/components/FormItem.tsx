import { defineComponent, h, PropType } from 'vue'
import { ElInput, ElInputNumber } from 'element-plus'

const COMPONENTS: { [key: string]: any } = {
  input: ElInput,
  inputNumber: ElInputNumber
}

export default defineComponent({
  name: 'FormItem',
  props: {
    conf: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    // 类型不确定
    value: {
      type: [String, Number] as PropType<string | number>,
      default: ''
    },
    onInput: {
      type: Function as PropType<Function>,
      default: () => ({})
    }
  },
  setup (props, { emit }) {
    const conf: any = props.conf
    return () => {
      return (
        <el-form-item prop={conf.key} label={conf.label}>
          { h(COMPONENTS[conf.type], {
            ...conf.props,
            modelValue: props.value,
            onInput: (val: string) => {
              console.log(emit('input', val))
            }
          }) }
        </el-form-item>
      )
    }
  }
})
