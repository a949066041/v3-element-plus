import { defineComponent } from 'vue'
import RenderView from '@/components/RenderView'
import { searchConf, table, modals } from './schema'

export default defineComponent({
  name: 'SysRole',
  setup () {
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
