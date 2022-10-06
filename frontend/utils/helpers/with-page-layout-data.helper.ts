/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSidePropsContext } from 'next';
import { UserConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ErrorReporting from '../error-handling/error-reporting';
import Logger from '../error-handling/logger';

type DefaultData = {
  _nextI18Next?: {
    initialI18nStore: Record<string, unknown>;
    initialLocale: string;
    ns: string[];
    userConfig: UserConfig | null;
  };
  pageData: any;
  [key: string]: any;
};

type PageHandler = (ctx: GetServerSidePropsContext, locale: string) => Promise<{ props?: any; notFound?: boolean }>;

const isError = (exception: unknown): exception is Error => exception instanceof Error;
const getExceptionStack = (exception: unknown) => (isError(exception) ? exception.stack : undefined);

/* ------------------
 PageLayout data handler
 ------------------ */
const withPageLayoutData =
  <T extends { props: DefaultData; notFound?: boolean }>(handler: PageHandler) =>
  async (ctx: GetServerSidePropsContext) => {
    try {
      const localization = (ctx.locale as string) ?? (ctx.defaultLocale as string);
      const data = await handler(ctx, localization);

      // If no pageData return not found
      if ('notFound' in data && data?.notFound) {
        return data;
      }

      // Grab all general data for layout
      const translations = await serverSideTranslations(localization, ['common']); // Add additional translations files to this array

      return { ...data, props: { ...data.props, ...translations } } as { props: DefaultData; notFound?: boolean };
    } catch (exception) {
      const stack = getExceptionStack(exception);

      // This is the context being logged
      ErrorReporting.reportAny(exception, ctx.req as unknown as Request);

      // If we are able to retrieve the stack, we add it to the debugging logs
      if (stack) {
        Logger.debug(stack);
      }

      return { props: {}, notFound: true } as T;
    }
  };

export { withPageLayoutData };
