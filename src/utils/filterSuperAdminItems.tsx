import { UserRole } from '@/types/apps/user.types'
import type { HorizontalMenuDataType, VerticalMenuDataType } from '@/types/menu.types'

const filterSuperAdminItems = (
  items: VerticalMenuDataType[] | HorizontalMenuDataType[],
  role: UserRole = UserRole.COACH
): (VerticalMenuDataType | HorizontalMenuDataType)[] => {
  return items
    .filter(item => {
      return item.roles ? item.roles.includes(role) : false
    })
    .map(item => {
      if ('children' in item && item.children) {
        return {
          ...item,
          children: filterSuperAdminItems(item.children, role)
        }
      }

      return item
    })
}

export default filterSuperAdminItems
