import { defineComponent } from 'vue'
import MsTable from '@/components/Table'

export default defineComponent({
  name: 'DictDetail',
  setup () {
    return () => {
      return (
        <MsTable
          dataSource={[]}
          columns={[
            { dataIndex: 'username', label: '用户名' },
            { dataIndex: 'nickName', label: '昵称' },
            { dataIndex: 'gender', label: '性别' },
            { dataIndex: 'phone', label: '电话' },
            { dataIndex: 'email', label: '邮箱' }
          ]}
        />
      )
    }
  }
})
