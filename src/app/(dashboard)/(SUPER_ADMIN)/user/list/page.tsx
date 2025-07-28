// Component Imports
import { getAllUsers } from '@/libs/api/endpoints/user.api'
import UserList from '@views/apps/user/list'

const UserListApp = async () => {
  // Vars
  const data = await getAllUsers({ take: 2 })
  const userData = data.data.items

  return <UserList userData={userData} />
}

export default UserListApp
