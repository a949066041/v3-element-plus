import { IMenu } from '@/types/model/entity/menu'
import { IStoreUser } from '@/types/store/user'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import SideItem from './SideItem'

export default defineComponent({
  name: 'SideBar',
  setup () {
    const store = useStore()
    const menuList = computed(() => ((store.state as any).user as IStoreUser).menus)
    return () => {
      return (
        <el-menu
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          {
            menuList.value.map((item: IMenu) => (
              <SideItem path={item.path} context={item} />
            ))
          }
        </el-menu>
      )
    }
  }
})
