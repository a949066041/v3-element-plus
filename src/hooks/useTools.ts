import { deletes } from '@/api'
import { IUseTableOption } from '@/types/hooks'
import { useBrother } from './useExpose'

const useTools = (options: IUseTableOption) => {
  const brother = useBrother()

  const handleDelByIds = (id: number) => {
    deletes(options.api, [id]).then((res) => {
      brother.searchTable()
    })
  }

  return {
    handleDelByIds
  }
}

export default useTools
