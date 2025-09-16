'use client';

import { Wave } from 'react-animated-text';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';

import css from './RatesPage.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import { useEffect, useMemo } from 'react';
import { latestRates } from '@/lib/service/exchangeAPI';
import Loader from '@/components/Loader/Loader';
import RatesList from '@/components/RatesList/RatesList';
import Filter from '@/components/Filter/Filter';

export default function RatesPage() {
  const isError = useCurrencyStore((state) => state.isError);
  const isLoading = useCurrencyStore((state) => state.isLoading);
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);
  const rates = useCurrencyStore((state) => state.rates);
  const filter = useCurrencyStore((state) => state.filter);
  const setIsLoading = useCurrencyStore((state) => state.setIsLoading);
  const setIsError = useCurrencyStore((state) => state.setIsError);
  const setRates = useCurrencyStore((state) => state.setRates);
  const filterRates = useMemo(() => {
    return rates
      .filter(([key]) => key !== baseCurrency && key.toLowerCase().includes(filter.toLowerCase()))
      .map(([key, value]) => ({ key, value: Number((1 / value).toFixed(2)) }));
  }, [baseCurrency, filter, rates]);

  useEffect(() => {
    if (!baseCurrency) return;
    setIsLoading(true);
    latestRates(baseCurrency)
      .then((data) => {
        setRates(data);
      })
      .catch((error) => setIsError(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [baseCurrency, setIsError, setIsLoading, setRates]);

  if (!baseCurrency) return <Loader />;

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for ${baseCurrency} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />
          {rates.length > 0 && <Filter />}
          {filterRates.length > 0 && <RatesList rates={filterRates} />}
          {isLoading && <Loader />}
          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}
        </Container>
      </Section>
    </main>
  );
}
