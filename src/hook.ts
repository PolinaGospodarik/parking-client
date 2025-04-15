import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import type {RootState, AppDispatch} from "./redux/store/store.ts"

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;