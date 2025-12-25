import React from 'react'
import { Helmet } from "react-helmet";

import Herosection from '../../Components/Herosection/Herosection'
import News from '../../Components/News/News'
import Homeabout from '../../Components/Homeabout/Homeabout'
import Oursolutions from '../../Components/Oursolutions/Oursolutions'
import Creativeshowcase from '../../Components/Creativeshowcase/Creativeshowcase'
import Contactus from '../../Components/Contactus/Contactus'
import Blueprint from '../../Components/Blueprint/Blueprint'
import Successinthefield from '../../Components/Successinthefield/Successinthefield'
import Innovationdiaries from '../../Components/Innovationdiaries/Innovationdiaries'
import Clientstories from '../../Components/Clientstories/Clientstories'
import Workflowinsights from '../../Components/Workflowinsights/Workflowinsights'

const Home = () => {
  return (
    <div>

      <Helmet>

        {/* 🔥 MAIN SEO TITLE */}
        <title>
          PR WEBSTOCK | Best Software Company in Bhubaneswar | Website, Application, CRM, SEO & Digital Marketing Services
        </title>

        {/* 🔥 UPDATED SEO DESCRIPTION — more professional */}
        <meta 
          name="description"
          content="PR WEBSTOCK is a leading software development company in Bhubaneswar, Odisha helping startups and businesses grow with world-class Website Development, Mobile Application Development, CRM Solutions, SEO, Digital Marketing, and Social Media Management. We empower brands with innovative technology, 24/7 support, and top-class service quality."
        />

        {/* 🔥 UPDATED SEO KEYWORDS */}
        <meta 
          name="keywords"
          content="
            PR WEBSTOCK,
            PR WEBSTOC,
            PR WEBSTOCK OPC PVT LTD,
            PR WEBSTOCK PVT LTD,
            prwebstock,
            pr webstock,
            PR Webstock,
            PR Web Stock,
            Webstock company,
            Webstock Bhubaneswar,
            Best software company in Bhubaneswar,
            Startup software company Odisha,
            Website development Bhubaneswar,
            App development Odisha,
            CRM software Bhubaneswar,
            SEO services Odisha,
            Digital marketing Bhubaneswar,
            Social media management Odisha,
            IT company Bhubaneswar,
            24/7 IT support company,
            Grow your startup Bhubaneswar
          "
        />

        {/* 🔥 OPEN GRAPH (Preview Image Fix) */}
        <meta property="og:title" content="PR WEBSTOCK – Leading Software & Digital Solutions Company in Bhubaneswar" />
        <meta property="og:description" content="We help startups and businesses grow through Website Development, App Development, CRM Systems, SEO, Digital Marketing & Social Media services." />
        <meta property="og:image" content="https://www.prwebstock.com/logo.png" />
        <meta property="og:url" content="https://www.prwebstock.com/" />
        <meta property="og:type" content="website" />

        {/* 🔥 TWITTER CARD */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PR WEBSTOCK | Software & Digital Services in Bhubaneswar" />
        <meta name="twitter:description" content="A complete IT & digital solutions agency offering websites, applications, CRM, SEO & branding services with 24/7 support." />
        <meta name="twitter:image" content="https://www.prwebstock.com/logo.png" />

        {/* 🔥 LOCAL SEO */}
        <meta name="geo.region" content="IN-OD" />
        <meta name="geo.placename" content="Bhubaneswar" />
        <meta name="geo.position" content="20.2961;85.8245" />
        <meta name="ICBM" content="20.2961, 85.8245" />

        {/* CANONICAL URL */}
        <link rel="canonical" href="https://www.prwebstock.com/" />

        {/* 🔥🔥 UPDATED JSON-LD ORGANIZATION SCHEMA */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PR WEBSTOCK",
            "alternateName": [
              "prwebstock",
              "PR WEBSTOCK OPC PVT LTD",
              "PR WEBSTOCK PVT LTD",
              "PR WEBSTOC",
              "Pr Webstock",
              "PR Web Stock",
              "Webstock",
              "Webstock Bhubaneswar"
            ],
            "url": "https://www.prwebstock.com",
            "logo": "https://www.prwebstock.com/logo.png",
            "sameAs": [
              "https://share.google/g1EaGINZXjs9j8qaO"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bhubaneswar",
              "addressRegion": "Odisha",
              "addressCountry": "IN"
            },
            "description": "PR WEBSTOCK helps startups and businesses build powerful Websites, Mobile Apps, CRM systems, SEO campaigns, and Digital Marketing strategies with 24/7 professional support and top-class service delivery."
          }
          `}
        </script>

      </Helmet>


      {/* ===============================
          HOME PAGE SECTIONS
      ================================= */}
      <Herosection />
      <News />
      <Homeabout />
      <Oursolutions />
      {/* <Creativeshowcase /> */}
      <Blueprint />
      {/* <Successinthefield /> */}
      <Clientstories />
      <Innovationdiaries />
    </div>
  )
}

export default Home
