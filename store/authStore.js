import create from 'zustand';
import produce from 'immer';

export const authStore = create((set, get) => ({
  isLoading: true,
  isSignout: false,
  userToken: null,
  restoreToken: payload =>
    set(
      produce(draft => {
        draft.userToken = payload;
        draft.isLoading = false;
      }),
    ),
  signIn: payload =>
    set(
      produce(draft => {
        draft.isSignout = false;
        draft.userToken = payload;
      }),
    ),
  signout: payload =>
    set(
      produce(draft => {
        draft.isSignout = true;
        draft.userToken = null;
      }),
    ),
}));
