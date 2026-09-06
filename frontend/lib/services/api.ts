import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface AddressPayload {
    area: string;
    district: string;
    state: string;
    pin: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    phone: string;
    password: string;
    address: AddressPayload;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    message?: string;
    token?: string;
    user?: {
        _id: string;
        name: string;
        email: string;
        role: string;
    };
}

export const kitchenApi = createApi({
    reducerPath: 'kitchenApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    }),
    tagTypes: ['User', 'Auth', 'Item', 'Order'],
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, RegisterPayload>({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['User']
        }),
        login: builder.mutation<AuthResponse, LoginPayload>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = kitchenApi;
