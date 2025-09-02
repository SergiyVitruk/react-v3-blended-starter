'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import css from './PostDetails.module.css';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

export default function PostDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const handleClickBack = () => {
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
    <>
      <div className={css.container}>
        <div className={css.item}>
          <button onClick={handleClickBack} className={css.backBtn}>
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
        </div>
      </div>
    </>
  );
}
