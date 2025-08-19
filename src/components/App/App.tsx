import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import css from "./App.module.css";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import { deletePost, fetchPosts } from "../../services/postService";
import Pagination from "../Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import { Post } from "../../types/post";
import PostForm from "../CreatePostForm/CreatePostForm";
import Modal from "../Modal/Modal";
import EditPostForm from "../EditPostForm/EditPostForm";
import { useQueryClient } from "@tanstack/react-query";

const LIMIT = 12;

export default function App() {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data } = useQuery({
    queryKey: ["posts", searchQuery, currentPage],
    queryFn: () => fetchPosts(searchQuery, currentPage, LIMIT),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (post: Post) => {
    setEditedPost(post);
    setIsEditPost(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditedPost(null);
    setIsEditPost(false);
    setIsModalOpen(false);
    setIsCreatePost(false);
  };

  const handleCreatePost = () => {
    setIsCreatePost(true);
    setIsModalOpen(true);
  };

  const handleChange = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, 500);

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = (id: number) => {
    console.log("Post deleted:", id);
    deleteMutation.mutate(id);
  };

  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / LIMIT) : 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleChange} />
        <button className={css.button} onClick={handleCreatePost}>
          Create post
        </button>
      </header>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          {isEditPost && editedPost && (
            <EditPostForm initialValues={editedPost} onClose={handleCloseModal} />
          )}
          {isCreatePost && <PostForm onClose={handleCloseModal} />}
        </Modal>
      )}
      {data && data?.posts.length > 0 && (
        <PostList posts={data.posts} handleEdit={handleEdit} handleDelete={handleDelete} />
      )}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
