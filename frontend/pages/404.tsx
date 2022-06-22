const NotFoundPage = () => (
  <main className="not-found">404 page</main>
);

export async function getStaticProps() {
  // const navData = await ApiController.nav.getNavItems(locale ?? (defaultLocale as string));
  return {
    props: {
      mainNavItems: [],
      structuredNavData: []
    }
  };
}

export default NotFoundPage;
