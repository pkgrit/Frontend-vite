import { create } from "zustand";

const useStore = create((set) => ({
  className: "light",
  darkmode: () =>
    set((state) =>
      state.className === "light"
        ? { className: "dark" }
        : { className: "light" }
    ),
  search: "creative",
  searchnow: (searchValue) => set((state) => ({ search: searchValue })),
  notification: "invisible",
  setnotification: (notifystate) =>
    set((state) => ({ notification: notifystate })),
  countSeen: 0,
  setCountSeen: (val) =>
    set((state) => ({ countSeen: val > 0 ? val : state.countSeen + 1 })),
  seenStatus: () => set((state) => ({ countSeen: 0 })),
}));

export default useStore;
