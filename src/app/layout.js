    import "./globals.css";
    import Footer from "@/components/Footer/Footer";
    import { Header } from "@/components/Header/Header";
    import { ToastDisplay } from '@/components/ui/toast';
    import Script from "next/script";
    import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/utils/metadata";

    export const metadata = {
      metadataBase: new URL(SITE_URL),
      title: {
        default: "Best Hotel in Varanasi near Railway Station | The Elegance",
        template: "%s | The Elegance",
      },
      description: "The Elegance - Best Boutique Hotel in Varanasi near Banaras Railway Station and BHU. Situated close to BLW, the Hotel is the best place for Stay in Varanasi.",
      applicationName: SITE_NAME,
      openGraph: {
        siteName: SITE_NAME,
        locale: "en_IN",
        type: "website",
        images: [DEFAULT_OG_IMAGE],
      },
      twitter: { card: "summary_large_image", images: [DEFAULT_OG_IMAGE.url] },
    };

    export default function RootLayout({ children }) {
      return (
        <html lang="en">
          <head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
              rel="icon"
              href="/assets/dev-img/logo/fav.png"
              type="image/png"
            />
            <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css?v=7.0.0" />
            <link rel="stylesheet" href="/assets/css/vendor/remixicon.css?v=7.0.0" />
            {/* <link rel="stylesheet" href="assets/css/vendor/aos.css" /> */}
            {/* <link rel="stylesheet" href="assets/css/vendor/animate.min.css" /> */}
            {/* <link rel="stylesheet" href="assets/css/vendor/jquery.fancybox.min.css"/> */}
            {/* <link rel="stylesheet" href="assets/css/vendor/slick.min.css" />
            <link rel="stylesheet" href="assets/css/vendor/owl.carousel.min.css" />
            <link rel="stylesheet" href="assets/css/vendor/swiper-bundle.min.css" /> */}
            {/* Main Style */}
            <link rel="stylesheet" href="/assets/css/style.css?v=4.3.1.0" />        
          </head>
          <body>
            <div className="page-wraper">
              <Header />
              {children}
              <ToastDisplay />
              <Footer />
            </div>
            <script src="/assets/js/vendor/bootstrap.bundle.min.js" defer></script>
            {/* <script src="assets/js/vendor/aos.js"></script>
            <script src="assets/js/vendor/smoothscroll.min.js"></script>
            <script src="assets/js/vendor/jquery.fancybox.min.js"></script>
            <script src="assets/js/vendor/slick.min.js"></script>
            <script src="assets/js/vendor/owl.carousel.min.js"></script>
            <script src="assets/js/vendor/swiper-bundle.min.js"></script>
            <script src="assets/js/main.js"></script> */}
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-ZNW7VCL3YL"
              strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-ZNW7VCL3YL');
              `}
            </Script>
          </body>
        </html>
      );
    }
