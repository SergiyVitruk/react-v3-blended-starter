import type { Metadata } from 'next';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: '404 - Page Not Found | CurrencyConverter',
  description: 'The page you are looking for does not exist on CurrencyConverter.',
  openGraph: {
    title: '404 - Page Not Found | CurrencyConverter',
    description: 'Oops! The page you are trying to access does not exist.',
    url: '/not-found',
    type: 'website',
  },
};

export default function NotFound() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </main>
  );
}
