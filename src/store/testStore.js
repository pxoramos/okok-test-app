import create from 'zustand';
import produce from 'immer';

const testStore = create((set, get) => ({
  store: [],
  addStore: payload =>
    set(
      produce(draft => {
        draft.store.push(payload);
      }),
    ),
  clearStore: () => set({store: []}),
}));

export default testStore;
