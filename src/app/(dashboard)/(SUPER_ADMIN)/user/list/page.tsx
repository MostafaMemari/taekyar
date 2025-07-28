// Component Imports
import UserList from '@views/apps/user/list'

// Data Imports
import { getAllUsers } from '@/libs/api/endpoints/user.api'

const UserListApp = async () => {
  // Vars
  const data = await getAllUsers()
  const userData = data.data.items

  return <UserList userData={userData} />
}

export default UserListApp
