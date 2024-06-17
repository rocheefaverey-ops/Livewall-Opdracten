import { Dictionary } from 'dictionaries/dictionary';
import 'server-only';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dictionaries: { [key: string]: () => Promise<Dictionary> } = {
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
  nl: () => import('../../dictionaries/nl.json').then((module) => module.default)
};

export const getDictionary = async (locale: string) => (dictionaries[locale] ? dictionaries[locale]() : dictionaries.nl());
