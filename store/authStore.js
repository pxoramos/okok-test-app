import create from 'zustand';
import produce from 'immer';

export const authStore = create(
  (set, get) => ({
    isLoading: true, //true when the app has not yet determined if user is signed-in/out to firebase
    isSignout: false,
    userToken: null,
    onAuthStateChanged: user =>
      set(
        produce(draft => {
          draft.userToken = user;
          draft.isLoading = false;
          draft.isSignout = false;
        }),
      ),
    signOut: () =>
      set(
        produce(draft => {
          draft.isSignout = true;
        }),
      ),
  }),
  {
    name: 'auth',
  },
);
