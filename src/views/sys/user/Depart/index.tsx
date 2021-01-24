import { defineComponent, ref, onMounted } from 'vue'
import { getCacheDept } from '@/api/sys/dept'
import { IPageResponse } from '@/api'
import { IDept } from '@/types/model/entity/sys'

export default defineComponent({
  name: 'UserDepart',
  setup () {
    const deptData = ref<any[]>([])
    // 获取左侧部门数据
    const getDeptData = (node: any, resolve: any) => {
      getCacheDept(node.data.id).then(res => {
        if (resolve) {
          resolve((res as any).content)
        }
      })
    }

    onMounted(() => {
      getCacheDept().then((res: IPageResponse<IDept>) => {
        deptData.value = res.content
      })
    })

    return () => {
      return (
        <el-tree
          data={deptData.value}
          defaultNodeKey={{ children: 'children', label: 'name', isLeaf: 'leaf' }}
          expand-on-click-node={false}
          lazy
          load={getDeptData}
        />
      )
    }
  }
})
