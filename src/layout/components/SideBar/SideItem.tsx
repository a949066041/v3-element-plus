import { IMenu } from '@/types/model/entity/sys'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'SideItem',
  props: {
    path: {
      type: String as PropType<string>,
      default: ''
    },
    parentPath: {
      type: String as PropType<string>,
      default: ''
    },
    context: {
      type: Object as PropType<IMenu>,
      default: () => ({})
    }
  },
  setup (props) {
    const isChildren = computed<boolean>(() => !!props.context.children)
    const title = computed<string>(() => props.context.meta && props.context.meta.title)
    return () => {
      return isChildren.value ? (
        <el-submenu index={`${props.parentPath}${props.path}`}>
          {
            {
              title: () => <><i class="el-icon-message"></i>{ title.value }</>,
              default: () => (
                <>
                  {
                    (props.context as any).children.map((item: IMenu) => (
                      <side-item parent-path={`${props.parentPath}${props.path}/`} path={item.path} context={item} />
                    ))
                  }
                </>
              )
            }
          }
        </el-submenu>
      )
        : (
          <el-menu-item index={`${props.parentPath}${props.path}`}>{ title.value }</el-menu-item>
        )
    }
  }
})
