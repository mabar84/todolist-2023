import { Dispatch } from "redux";
import { appActions } from "features/app/model/appSLice";
import { BaseResponseType } from "features/TodolistsList/api/todolists.api";

export const handleServerAppError = <D>(data: BaseResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setError({ error: "Some error occurred" }));
  }
  dispatch(appActions.setStatus({ status: "failed" }));
};
export const handleNetworkAppError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(appActions.setStatus({ status: "failed" }));
  dispatch(appActions.setError({ error: error.message }));
};
