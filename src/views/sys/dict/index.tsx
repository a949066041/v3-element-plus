import { defineComponent, ref, watch } from 'vue'
import DictMain from './main'
import DictDetail from './detail'

export default defineComponent({
  name: 'Dict',
  setup () {
    const dict = ref<object>({})

    return () => {
      return (
        <el-row gutter={20}>
          <el-col span={12}>
            <DictMain v-model={[dict.value, 'dict']} />
          </el-col>
          <el-col span={12}>
            <DictDetail v-model={[dict.value, 'dict']} />
          </el-col>
        </el-row>
      )
    }
  }
})
