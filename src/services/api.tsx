// Need to use the React-specific entry point to import createApi
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import apis from '../apis/url';
import { StorageKeys } from '../types/shared';

export const urls = {
  ALL_USERS: '/user',
  USER_DETAILS: (userId?: string) => (userId ? `/user/${userId}` : '/user/1'),
  REGISTER_USER: '/user/register',
  LOGIN_USER: '/user/login',
};

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    const token = await localStorage.getItem(StorageKeys.token);
    let customHeaders: any = {
      Authorization: `Bearer ${token}`,
    };
    if (headers) {
      customHeaders = {
        ...customHeaders,
        ...headers,
      };
    }

    try {
      let result: AxiosResponse = {} as AxiosResponse;
      if (method === 'GET') {
        result = await axios.get(`${baseUrl}${url}`, {
          params,
          headers: customHeaders,
        });
      }
      if (method === 'POST') {
        result = await axios.post(`${baseUrl}${url}`, data, {
          headers: customHeaders,
        });
      }
      if (method === 'PUT') {
        result = await axios.put(`${baseUrl}${url}`, data, {
          headers: customHeaders,
        });
      }

      return { data: result?.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      if (err?.response?.status === 401) {
        localStorage.removeItem(StorageKeys.token);
      }
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err,
        },
      };
    }
  };

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: apis.BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: urls.ALL_USERS,
        method: 'GET',
        params,
      }),
    }),
    getUser: builder.query({
      query: (userId?: string) => ({
        url: userId ? urls.USER_DETAILS(userId) : urls.USER_DETAILS(),
        method: 'GET',
        params: !userId
          ? {
              fromToken: true,
            }
          : {},
      }),
    }),
    signUpUser: builder.mutation({
      query: (data) => ({
        url: urls.REGISTER_USER,
        method: 'POST',
        data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: urls.LOGIN_USER,
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetAllUsersQuery, useSignUpUserMutation, useLoginUserMutation } = api;
