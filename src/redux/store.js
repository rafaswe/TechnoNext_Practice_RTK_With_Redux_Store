import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "./services/userApi"

export default configureStore({
    reducer:{
        user: "userInfo",
        [userApi.reducerPath]: userApi.reducer,    
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(userApi.middleware)
})