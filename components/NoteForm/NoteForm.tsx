import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
// import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
// import * as Yup from "yup";
import { createNote } from "@/lib/api";
import type { Note } from "../../types/note";

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProps {
  onCancel: () => void;
}

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation<Note, Error, FormValues>({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
  });

  async function handleSubmit(formData: FormData) {
    const values: FormValues = {
      title: formData.get("title") as string,
      content: (formData.get("content") as string) || "",
      tag: formData.get("tag") as string,
    };
    mutation.mutate(values);
  }

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          minLength={3}
          maxLength={50}
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          maxLength={500}
          required
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      {mutation.isError && (
        <div className={css.error}>{(mutation.error as Error).message}</div>
      )}

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
