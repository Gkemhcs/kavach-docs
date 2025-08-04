import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Head from '@docusaurus/Head';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started">
            Get Started - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Enterprise Secret Management Platform`}
      description="Kavach is an enterprise-grade secret management and synchronization platform. Manage secrets securely with CLI-first design, multi-cloud sync, and role-based access control.">
      <Head>
        {/* Primary Meta Tags */}
        <title>Kavach Documentation - Enterprise Secret Management Platform</title>
        <meta name="title" content="Kavach Documentation - Enterprise Secret Management Platform" />
        <meta name="description" content="Kavach is an enterprise-grade secret management and synchronization platform. Manage secrets securely with CLI-first design, multi-cloud sync, and role-based access control." />
        <meta name="keywords" content="kavach, secret management, secrets, devops, security, cli, enterprise, cloud, synchronization, github, gcp, azure, aws, vault, hashicorp vault alternative, kubernetes secrets, docker secrets" />
        <meta name="author" content="Kavach Team" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://docs.kavach.gkem.cloud/" />
        <meta property="og:title" content="Kavach Documentation - Enterprise Secret Management Platform" />
        <meta property="og:description" content="Enterprise-grade secret management and synchronization platform with CLI-first design, multi-cloud sync, and role-based access control." />
        <meta property="og:image" content="https://docs.kavach.gkem.cloud/img/kavach-og.png" />
        <meta property="og:site_name" content="Kavach Documentation" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://docs.kavach.gkem.cloud/" />
        <meta property="twitter:title" content="Kavach Documentation - Enterprise Secret Management Platform" />
        <meta property="twitter:description" content="Enterprise-grade secret management and synchronization platform with CLI-first design, multi-cloud sync, and role-based access control." />
        <meta property="twitter:image" content="https://docs.kavach.gkem.cloud/img/kavach-og.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2e8555" />
        <meta name="msapplication-TileColor" content="#2e8555" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Kavach Docs" />
        <meta name="application-name" content="Kavach Documentation" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://docs.kavach.gkem.cloud/" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Kavach Documentation",
            "description": "Enterprise-grade secret management and synchronization platform documentation",
            "url": "https://docs.kavach.gkem.cloud/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://docs.kavach.gkem.cloud/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Kavach",
              "url": "https://kavach.gkem.cloud"
            }
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Kavach",
            "description": "Enterprise-grade secret management and synchronization platform",
            "applicationCategory": "SecurityApplication",
            "operatingSystem": "Linux, macOS, Windows",
            "url": "https://kavach.gkem.cloud",
            "downloadUrl": "https://github.com/Gkemhcs/kavach-cli/releases",
            "softwareVersion": "v0.1.0-alpha.1",
            "author": {
              "@type": "Organization",
              "name": "Kavach Team"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Head>
      
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        
        {/* Additional SEO Content */}
        <section className="container margin-vert--xl">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <h2>What is Kavach Secret Management?</h2>
              <p>
                <strong>Kavach</strong> is an enterprise-grade secret management and synchronization platform designed for modern cloud-native applications. 
                It provides secure, scalable, and developer-friendly tools for managing secrets across multiple cloud platforms including GitHub, 
                Google Cloud Platform (GCP), Azure, and AWS.
              </p>
              
              <h3>Key Features of Kavach</h3>
              <ul>
                <li><strong>CLI-First Design:</strong> Developer-friendly command-line interface for seamless integration</li>
                <li><strong>Multi-Cloud Synchronization:</strong> Sync secrets across GitHub, GCP, Azure, AWS, and more</li>
                <li><strong>Role-Based Access Control:</strong> Enterprise-grade authorization with RBAC</li>
                <li><strong>Multi-Tenant Architecture:</strong> Organization and group-based isolation</li>
                <li><strong>Zero-Trust Security:</strong> End-to-end encryption and comprehensive audit trails</li>
                <li><strong>Version Control:</strong> Track secret changes with full version history</li>
              </ul>
              
              <h3>Why Choose Kavach for Secret Management?</h3>
              <p>
                Kavach stands out as a modern alternative to traditional secret management solutions like HashiCorp Vault. 
                It's designed specifically for DevOps teams and developers who need a simple, secure, and scalable way to 
                manage secrets across their infrastructure.
              </p>
              
              <div className="margin-vert--lg">
                <Link
                  className="button button--primary button--lg"
                  to="/docs/getting-started">
                  Get Started with Kavach
                </Link>
                <Link
                  className="button button--secondary button--lg margin-left--md"
                  to="/docs/architecture/overview">
                  View Architecture
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
