import create from 'zustand';
import produce from 'immer';

/**
 * @property {Boolean} isLoading true when the app has not yet determined if user is signed-in/out to firebase
 * @property {Boolean} isSignout set to true when signing out
 * @property {string} userToken
 */

export const useAuthStore = create(
  (set, get) => ({
    isLoading: true,
    isSignout: false,
    userToken: null,

    onAuthStateChanged: userToken =>
      set(
        produce(draft => {
          draft.userToken = userToken;
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
