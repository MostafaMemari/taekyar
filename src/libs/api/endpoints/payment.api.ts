import { api } from '@/libs/api'
import type { ApiResponse } from '@/types/api-response.type'
import { API_ROUTES } from '../routes'

export const pay = (data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.PAYMENT.PAY, {
    method: 'POST',
    body: data
  })
}

export const verifyPayment = (): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.PAYMENT.VERIFY, {
    method: 'GET'
  })
}

export const refundTransaction = (transactionId: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.PAYMENT.REFUND(transactionId), {
    method: 'POST'
  })
}

export const getMyTransactions = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.PAYMENT.MY_TRANSACTIONS, {
    method: 'GET'
  })
}

export const getAllTransactions = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.PAYMENT.ALL_TRANSACTIONS, {
    method: 'GET'
  })
}

export const getTransactionDetail = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.PAYMENT.DETAIL(id), {
    method: 'GET'
  })
}
