import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createNote } from "@/lib/api";
import type { NoteDraft } from "@/types/note";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Page for creating a new note.",
  openGraph: {
    title: "Create Note",
    description: "Page for creating a new note.",
    url: "https://08-zustand-two-pi.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub",
      },
    ],
  },
};

async function createNoteAction(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const rawTag = formData.get("tag");
  const tag: NoteDraft["tag"] =
    rawTag === null ? "Todo" : (rawTag as NoteDraft["tag"]);

  await createNote({
    title,
    content,
    tag,
  });

  redirect("/notes/filter/All");
}

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm formAction={createNoteAction} />
      </div>
    </main>
  );
};

export default CreateNote;
