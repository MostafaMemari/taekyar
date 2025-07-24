// services/wallet.ts
import type { ApiResponse } from '@/types/api-response.type'
import { api } from '../index'
import { API_ROUTES } from '../routes'

export const payWallet = (data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.WALLET.PAY, {
    method: 'POST',
    body: data
  })
}

export const verifyWallet = (): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.WALLET.VERIFY, {
    method: 'GET'
  })
}

export const manualCreditWallet = (walletId: string | number, data: any): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.WALLET.MANUAL_CREDIT(walletId), {
    method: 'POST',
    body: data
  })
}

export const getAllWallets = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.WALLET.BASE, {
    method: 'GET'
  })
}

export const getWalletDeductions = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.WALLET.DEDUCTIONS, {
    method: 'GET'
  })
}

export const getWalletManualCredits = (): Promise<ApiResponse<any[]>> => {
  return api(API_ROUTES.WALLET.MANUAL_CREDITS, {
    method: 'GET'
  })
}

export const getMyWallet = (): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.WALLET.MY_WALLET, {
    method: 'GET'
  })
}

export const getWalletById = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.WALLET.DETAIL(id), {
    method: 'GET'
  })
}

export const blockWallet = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.WALLET.BLOCK(id), {
    method: 'PUT'
  })
}

export const unblockWallet = (id: string | number): Promise<ApiResponse<any>> => {
  return api(API_ROUTES.WALLET.UNBLOCK(id), {
    method: 'PUT'
  })
}
