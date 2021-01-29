import { defineComponent, ref, onMounted, watch } from 'vue'
import { getCacheDept } from '@/api/sys/dept'
import { IDept } from '@/types/model/entity/sys'

export default defineComponent({
  name: 'UserDepart',
  emits: ['change-dept'],
  setup (props, { emit }) {
    const tree = ref<any>(null)
    const deptData = ref<any[]>([])
    const filterText = ref<string>('')

    const handleNodeClick = (val: IDept) => { emit('change-dept', val.id) }

    // 获取左侧部门数据
    const getDeptData = (node: any, resolve: any) => {
      getCacheDept(node.data.id).then(res => {
        if (resolve) {
          resolve((res as any).content)
        }
      })
    }

    onMounted(() => {
      getCacheDept().then((res) => { deptData.value = res.content })
    })

    watch(filterText, (val) => { tree.value.filter(val) })

    return () => {
      return (
        <>
          <el-input
            placeholder="输入关键字进行过滤"
            v-model={[filterText.value]}
          />
          <el-tree
            ref={tree}
            onNodeClick={handleNodeClick}
            data={deptData.value}
            defaultNodeKey={{ children: 'children', label: 'name', isLeaf: 'leaf' }}
            expand-on-click-node={false}
            lazy
            load={getDeptData}
            filter-node-method={(value: string, data: any) => {
              if (!value) return true
              return data.label.indexOf(value) !== -1
            }}
          />
        </>
      )
    }
  }
})
