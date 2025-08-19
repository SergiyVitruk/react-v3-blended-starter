import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";
import css from "./CreatePostForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../services/postService";
import { useQueryClient } from "@tanstack/react-query";

interface PostFormValues {
  title: string;
  body: string;
}

interface PostFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required").min(3, "Too short"),
  body: Yup.string().required("Content is required").min(5, "Too short"),
});

export default function PostForm({ onClose }: PostFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
  });

  const handleSubmit = (values: PostFormValues, { resetForm }: FormikHelpers<PostFormValues>) => {
    console.log("New post created:", values);
    mutation.mutate(values);
    resetForm();
    onClose();
  };

  return (
    <Formik
      initialValues={{ title: "", body: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows="8" className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
            {mutation.isPending ? "Creating..." : "Create post"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
