import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="author" content="Viraj Global Machinery" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/logo.png" />
        <link rel="icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Viraj Global Machinery",
              "image": "https://virajglobalmachinery.com/logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "64/G/2, Pavan Industry, Tarihal Industrial Area",
                "addressLocality": "Hubballi",
                "addressRegion": "Karnataka",
                "postalCode": "580026",
                "addressCountry": "IN"
              },
              "telephone": "+91-90357-77333",
              "openingHours": "Mo-Sa 09:00-18:00",
              "geo": { "@type": "GeoCoordinates", "latitude": 15.3647, "longitude": 75.1240 },
              "url": "https://virajglobalmachinery.com",
              "priceRange": "₹₹",
              "description": "ISO 9001:2015 certified manufacturer of commercial food processing machinery in Hubballi, Karnataka."
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
