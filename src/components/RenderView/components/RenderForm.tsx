import { defineComponent, PropType } from 'vue'
import FormItem from './FormItem'

export default defineComponent({
  name: 'RenderForm',
  props: {
    // 绑定一个form 由于是对象不会出现单向数据流问题
    model: {
      type: Object as PropType<object>,
      default: () => ({})
    },
    config: {
      type: Object as PropType<object>,
      default: () => ({})
    }
  },
  setup (props, { slots }) {
    const config: any = props.config
    const model: any = props.model
    return () => {
      return (
        <el-form model={model}>
          <el-row gutter={config.gutter}>
            {
              (config.form as []).map((item: any) => (
                <el-col span={item.span || config.baseSpan}>
                  <FormItem
                    conf={item}
                    value={model[item.key]}
                    onInput={(e: any) => { model[item.key] = e }}
                    onTrigger={(obj: any) => {
                      console.log(obj)
                      const { value, item } = obj
                      model[item.key] = value + 1
                    }}
                  />
                </el-col>
              ))
            }
            { slots.default?.() }
          </el-row>
        </el-form>
      )
    }
  }
})
