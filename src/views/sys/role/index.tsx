import { defineComponent } from 'vue'
import RenderView from '@/components/RenderView'

export default defineComponent({
  name: 'SysRole',
  setup () {
    // cache
    const searchConf = {
      gutter: 20,
      baseSpan: 4,
      items: [
        {
          type: 'input',
          key: 'blurry',
          props: {
            placeholder: '请输入input。。。'
          },
          span: 6
        }
      ],
      btns: [
        {
          type: 'search',
          theme: 'primary',
          text: '搜索'
        },
        {
          type: 'reset',
          text: '重置'
        }
      ]
    }

    const table = [
      { dataIndex: 'name', label: '名称' },
      { dataIndex: 'dataScope', label: '数据权限' },
      { dataIndex: 'level', label: '角色级别' },
      { dataIndex: 'description', label: '描述', config: { 'show-overflow-tooltip': true } },
      { dataIndex: 'createTime', label: '创建时间', time: true }
    ]

    const modals = [
      {
        type: 'dialog',
        value: 'modal1'
      },
      {
        type: 'dialog',
        value: 'modal2'
      },
      {
        type: 'dialog',
        value: 'modal3'
      }
    ]
    return () => {
      return (
        <RenderView
          search={searchConf}
          table={table}
          modals={modals}
        />
      )
    }
  }
})
