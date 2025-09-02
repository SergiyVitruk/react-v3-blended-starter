'use client';

import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

export default function PostPreviewClient() {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const { data } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!data) return;
    const fn = async () => {
      const response = await fetchUserById(data.userId);
      setUser(response);
    };
    fn();
  }, [data]);

  return (
    <Modal onClose={handleClose}>
      <button className={css.backBtn} onClick={handleClose}>
        ← Back
      </button>
      {data && (
        <div className={css.post}>
          <div className={css.wrapper}>
            <div className={css.header}>
              <h2>{data.title}</h2>
            </div>

            <p className={css.content}>{data.body}</p>
          </div>
          {user && <p className={css.user}>Author: {user.name}</p>}
        </div>
      )}
    </Modal>
  );
}
