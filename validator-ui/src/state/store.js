import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers'

const persistConfig = {
    key: 'oauth',
    storage,
}

const persist = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persist,
})
