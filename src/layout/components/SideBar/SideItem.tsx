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
      type: Object as PropType<any>,
      default: () => ({})
    }
  },
  setup (props) {
    const isChildren: boolean = (props.context as any).children
    return () => {
      return isChildren ? (
        <el-submenu index={`${props.parentPath}${props.path}`}>
          {
            {
              title: () => <><i class="el-icon-message"></i>{ (props.context as any).meta.title }</>,
              default: () => (
                <>
                  {
                    (props.context as any).children.map((item: any) => (
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
          <el-menu-item index={`${props.parentPath}${props.path}`}>{ (props.context as any).meta.title }</el-menu-item>
        )
    }
  }
})
