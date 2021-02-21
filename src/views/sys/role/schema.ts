// cache
const searchConf = {
  gutter: 20,
  baseSpan: 4,
  form: [
    {
      type: 'input',
      key: 'blurry',
      props: {
        placeholder: '请输入input。。。'
      },
      span: 6
    },
    {
      type: 'choose',
      key: 'b',
      props: {
        clearable: true,
        dataSource: [{ id: 1, name: '123' }, { id: 2, name: '234' }],
        placeholder: '请选择select。。。'
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
    },
    {
      theme: 'primary',
      text: '打开弹窗1',
      trigger: 'modal1'
    },
    {
      theme: 'primary',
      text: '打开弹窗2',
      trigger: 'modal2'
    },
    {
      theme: 'primary',
      text: '打开弹窗3',
      trigger: 'modal3'
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
    value: 'modal1',
    gutter: 20,
    baseSpan: 4,
    form: [
      {
        type: 'input',
        key: 'blurry',
        trigger: {
          change: [
            { key: 'b', effect: 1 }
          ]
        },
        props: {
          placeholder: '请输入input。。。'
        },
        span: 6
      },
      {
        type: 'inputNumber',
        key: 'b',
        props: {
          placeholder: '请输入inpunumber。。。'
        },
        span: 6
      }
    ]
  },
  {
    type: 'drawer',
    value: 'modal2',
    gutter: 20,
    baseSpan: 4,
    form: [
      {
        type: 'inputNumber',
        key: 'blurry',
        props: {
          placeholder: '请输入inpunumber。。。'
        },
        span: 6
      }
    ]
  },
  {
    type: 'full',
    value: 'modal3',
    gutter: 20,
    baseSpan: 4,
    form: [
      {
        type: 'input',
        key: 'blurry',
        props: {
          placeholder: '请输入input。。。'
        },
        span: 6
      }
    ]
  }
]

export {
  searchConf,
  table,
  modals
}
