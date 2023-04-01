import Head from "next/head";

export default function Meta(props) {
  const metaTitle =
    "Hello Logan Square // Find things to do in the neighborhood like a local";
  const metaDescription =
    "Restaurants, Bars, and Events in Logan Square. Find out cool things to see and do in Chicago, IL";

  return (
    <Head>
      <title>{props.title || metaTitle}</title>

      <meta name='description' content={props.description || metaDescription} />

      <link rel='icon' type='image/png' href='/favicon.png'></link>

      {/* Open Graph Tags*/}
      <meta
        property='og:title'
        content={props.title || metaTitle}
        key='og-title'
      />
      <meta property='og:type' content='website' />
      <meta
        property='og:description'
        content={props.description || metaDescription}
      />
      <meta
        property='og:image'
        content='https://helloLogan Square.co/hello-Logan Square-local.png'
      />
    </Head>
  );
}
