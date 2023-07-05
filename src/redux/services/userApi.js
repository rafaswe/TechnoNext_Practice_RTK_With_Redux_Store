import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery:fetchBaseQuery({
        baseUrl:"https://jsonplaceholder.typicode.com"
    }),
    endpoints:(build)=>({
        getData:build.query({
            query: ()=>({
                url:"/users",
                method:"GET",
            }),
        }),
        getDataById:build.query({
            query:(id)=>({
                url: `/users/${id}`,
                method:"GET",
            })
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
        }),

        deleteData: build.mutation({
            query:(id)=>({
                url: `/users/${id}`,
                method:"DELETE",
            })
        }),


    }),
})

export const {useGetDataQuery,useGetDataByIdQuery,usePostDataMutation,useUpdateDataMutation,usePatchingDataMutation,useDeleteDataMutation}= userApi;

// export const {endpoints,reducerPath,reducer,middleware}= userApi;
//Autometically added