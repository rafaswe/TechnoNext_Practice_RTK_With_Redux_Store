import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery:fetchBaseQuery({
        baseUrl:"https://jsonplaceholder.typicode.com"
    }),
    tagTypes:['User']
    ,
    endpoints:(build)=>({
        getData:build.query({
            query: ()=>({
                url:"/users",
                method:"GET",
            }),
            transformResponse:res=> res.sort((a,b)=> b.id - a.id),
            providesTags:['User']
        }),
        
        getDataById:build.query({
            query:(id)=>({
                url: `/users/${id}`,
                method:"GET",
            }),
            providesTags:['User']
        }),

        postData: build.mutation({
            query: (data) => ({
                url: '/users',
                method: 'POST',
                body: data,
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }),
            invalidatesTags:['User']
        }),
        
        updateData: build.mutation({
            query: (data) => ({
                url: `/users/${data.id}`,
                method: 'PUT',
                body: data,
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }),
            invalidatesTags:['User']
        }),

        patchingData: build.mutation({
            query: (data) => ({
                url: `/users/${data.id}`,
                method: 'PATCH',
                body: data,
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              }),
              invalidatesTags:['User']
        }),

        deleteData: build.mutation({
            query:(id)=>({
                url: `/users/${id}`,
                method:"DELETE",
            }),
            invalidatesTags:['User']
        }),


    }),
})

export const {useGetDataQuery,useGetDataByIdQuery,usePostDataMutation,useUpdateDataMutation,usePatchingDataMutation,useDeleteDataMutation}= userApi;

// export const {endpoints,reducerPath,reducer,middleware}= userApi;
//Autometically added