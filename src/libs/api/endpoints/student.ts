import type { Student } from '@/types/student.type'
import { api } from '../index'
import { API_ROUTES } from '../routes'

export const getStudentDetail = (id: number): Promise<Student> => {
  return api(API_ROUTES.STUDENTS.DETAIL(id))
}
