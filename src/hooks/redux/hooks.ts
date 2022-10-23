import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../store/store.config";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;