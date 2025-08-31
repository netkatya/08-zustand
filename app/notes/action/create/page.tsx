// import { getTags } from "@/lib/api";
import css from "./createNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import { getTags } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create note",
  description: "Page for creating a new note",
  openGraph: {
    title: "Create note",
    description: "Page for creating a new note",
    url: "https://08-zustand-ten-ochre.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub Logo",
      },
    ],
  },
};

export default async function CreateNote() {
  const tags = await getTags();
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        {<NoteForm tags={tags} />}
      </div>
    </main>
  );
}
