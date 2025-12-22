import type { NoteDraft } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DraftState {
  draft: NoteDraft;
  setDraft: (draft: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

const initialDraft: NoteDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useDraftNote = create<DraftState>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (draft) =>
        set((state) => ({
          draft: { ...state.draft, ...draft },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
