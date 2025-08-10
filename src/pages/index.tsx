import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        {/* Help Us Section moved to top */}
        <div className={styles.helpUsCard}>
          <h3>🚀 Help Us Improve Kavach!</h3>
          <p>
            We're still in initial development and your feedback is invaluable to us. 
            Help shape the future of enterprise secret management by sharing your suggestions, 
            reporting issues, or contributing to our open-source project.
          </p>
          <div className={styles.helpUsActions}>
            <Link
              className={styles.helpUsButton}
              href="https://github.com/Gkemhcs/kavach-cli/issues"
              target="_blank"
              rel="noopener noreferrer">
              🐛 Report Issues
            </Link>
            <Link
              className={styles.helpUsButton}
              href="https://github.com/Gkemhcs/kavach-cli/discussions"
              target="_blank"
              rel="noopener noreferrer">
              💬 Join Discussions
            </Link>
            <Link
              className={styles.helpUsButton}
              href="https://github.com/Gkemhcs/kavach-cli"
              target="_blank"
              rel="noopener noreferrer">
              ⭐ Star on GitHub
            </Link>
          </div>
        </div>
        
        <div className={styles.heroLogo}>
          <img className={styles.logo} src="/img/kavach.png" alt="Kavach Logo - The Ultimate Secret Management Tool" />
        </div>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.heroDescription}>
          <strong>Kavach Secret Management Tool</strong> - The ultimate CLI-first solution for enterprise secret management. 
          Manage, sync, and secure your secrets across multiple cloud providers with ease.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started">
            🚀 Get Started with Kavach Secret Tool
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/architecture/overview">
            🏗️ View Architecture
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: '🔐',
      title: 'Secure by Design',
      description: 'Enterprise-grade encryption, role-based access control, and audit trails. Your secrets are encrypted at rest and in transit with industry-standard algorithms.',
      bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: '⚡',
      title: 'CLI-First Experience',
      description: 'Powerful command-line interface for developers and DevOps teams. Integrate seamlessly into your existing workflows and CI/CD pipelines.',
      bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: '☁️',
      title: 'Multi-Cloud Integration',
      description: 'Sync secrets to GitHub, GCP Secret Manager, Azure Key Vault, and more. Centralized management with distributed deployment capabilities.',
      bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: '🏗️',
      title: 'Resource Hierarchy',
      description: 'Organize secrets with Organizations, Secret Groups, and Environments. Granular permissions and team-based access control.',
      bgColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      icon: '🔄',
      title: 'Version Control',
      description: 'Full version history, rollback capabilities, and change tracking. Never lose track of secret changes with comprehensive audit logs.',
      bgColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      icon: '👥',
      title: 'Team Collaboration',
      description: 'User groups, role-based permissions, and team management. Collaborate securely with fine-grained access controls.',
      bgColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <h2 className={styles.sectionTitle}>🚀 Core Features of Kavach Secret Tool</h2>
          <p className={styles.sectionSubtitle}>
            Kavach Secret Management Tool provides enterprise-grade secret management with these powerful capabilities
          </p>
        </div>
        
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className="col col--4 margin-bottom--lg">
              <div 
                className={styles.featureCard}
                style={{ background: feature.bgColor }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text--center margin-top--xl">
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started">
            🚀 Quick Start Guide for Kavach Secret Tool
          </Link>
        </div>
      </div>
    </section>
  );
}

function DevelopmentStatusSection() {
  return (
    <section className={styles.devStatusSection}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2 text--center">
            <h2 className={styles.sectionTitle}>🔄 Coming Soon</h2>
            <div className={styles.comingSoonCard}>
              <div className={styles.comingSoonIcon}>📊</div>
              <h3>Audit & Compliance</h3>
              <p>
                Comprehensive audit trails, compliance reporting, and activity monitoring. 
                Track every action, change, and access attempt with detailed logs and analytics.
              </p>
              <div className={styles.comingSoonBadge}>In Development</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Enterprise Secret Management Platform`}
      description="Kavach is an enterprise-grade secret management and synchronization platform. Manage secrets securely with CLI-first design, multi-cloud sync, and role-based access control.">
      <Head>
        {/* Favicon Links */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/img/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/kavach.png" />
        <link rel="manifest" href="/img/site.webmanifest" />
        
        {/* Primary Meta Tags */}
        <title>Kavach Documentation - Enterprise Secret Management Platform | The Ultimate Kavach Secret Tool</title>
        <meta name="title" content="Kavach Documentation - Enterprise Secret Management Platform | The Ultimate Kavach Secret Tool" />
        <meta name="description" content="Kavach is an enterprise-grade secret management and synchronization platform. Manage secrets securely with CLI-first design, multi-cloud sync, and role-based access control. The ultimate kavach secret tool for DevOps teams." />
        <meta name="keywords" content="kavach, kavach secret, kavach secret tool, kavach secret management, kavach cli, kavach secrets, secret management tool, secret management cli, secret management platform, devops, cli, cloud security, gcp, azure, aws, github, vault, secrets, encryption, rbac, access control, enterprise security, kubernetes secrets, docker secrets, hashicorp vault alternative, secret synchronization, secret rotation, secret automation, devops security, cloud secrets, api keys, passwords, tokens, credentials management" />
        <meta name="author" content="Kavach Team" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://docs.kavach.gkem.cloud/" />
        <meta property="og:title" content="Kavach Documentation - Enterprise Secret Management Platform | The Ultimate Kavach Secret Tool" />
        <meta property="og:description" content="Enterprise-grade secret management and synchronization platform with CLI-first design, multi-cloud sync, and role-based access control. The ultimate kavach secret tool for DevOps teams." />
        <meta property="og:image" content="https://docs.kavach.gkem.cloud/img/kavach-og.png" />
        <meta property="og:site_name" content="Kavach Documentation" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://docs.kavach.gkem.cloud/" />
        <meta property="twitter:title" content="Kavach Documentation - Enterprise Secret Management Platform | The Ultimate Kavach Secret Tool" />
        <meta property="twitter:description" content="Enterprise-grade secret management and synchronization platform with CLI-first design, multi-cloud sync, and role-based access control. The ultimate kavach secret tool for DevOps teams." />
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
        
        {/* Additional Search Engine Optimization */}
        <meta name="subject" content="Kavach Secret Management Tool Documentation" />
        <meta name="application-name" content="Kavach Secret Management Tool" />
        <meta name="category" content="Secret Management Software" />
        <meta name="classification" content="DevOps Tools, Security Software, CLI Applications, Secret Management" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="geo.position" content="37.0902;-95.7129" />
        <meta name="ICBM" content="37.0902, -95.7129" />
        
        {/* Keyword-specific meta tags */}
        <meta name="keywords" content="kavach secret, kavach secret tool, kavach secret management, kavach cli, kavach secrets" />
        <meta name="search_keywords" content="kavach secret, kavach secret tool, secret management tool, devops secret management" />
        
        {/* Social Media Optimization */}
        <meta property="og:keywords" content="kavach, kavach secret, kavach secret tool, secret management, devops, cli, cloud security" />
        <meta property="og:section" content="Software Documentation" />
        <meta property="og:tag" content="kavach, secret management, devops, cli" />
        
        {/* Twitter specific meta tags */}
        <meta name="twitter:label1" content="Category" />
        <meta name="twitter:data1" content="Secret Management Tool" />
        <meta name="twitter:label2" content="Type" />
        <meta name="twitter:data2" content="CLI Application" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://docs.kavach.gkem.cloud/" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Kavach Documentation",
            "description": "Enterprise-grade secret management and synchronization platform documentation. The ultimate kavach secret tool for DevOps teams.",
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
            },
            "keywords": "kavach, kavach secret, kavach secret tool, secret management, devops, cli, cloud security"
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Kavach",
            "description": "Enterprise-grade secret management and synchronization platform. The ultimate kavach secret tool for DevOps teams with CLI-first design.",
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
            },
            "keywords": "kavach, kavach secret, kavach secret tool, secret management, devops, cli, cloud security"
          })}
        </script>
        
        {/* Additional Structured Data for Tool/Software */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Tool",
            "name": "Kavach Secret Management Tool",
            "description": "CLI-first enterprise secret management and synchronization tool for DevOps teams",
            "url": "https://docs.kavach.gkem.cloud",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Linux, macOS, Windows",
            "softwareVersion": "v0.1.0-alpha.1",
            "author": {
              "@type": "Organization",
              "name": "Kavach Team"
            },
            "keywords": "kavach secret tool, secret management, devops, cli, cloud security",
            "featureList": [
              "CLI-First Experience",
              "Multi-Cloud Integration", 
              "Role-Based Access Control",
              "Secret Synchronization",
              "Version Control",
              "Team Collaboration"
            ]
          })}
        </script>
      </Head>
      
      <HomepageHeader />
      <main>
        {/* Introduction Section for SEO */}
        <section className={styles.introSection}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2 text--center">
                <h2>What is Kavach Secret Management Tool?</h2>
                <p>
                  <strong>Kavach</strong> is the ultimate <strong>secret management tool</strong> designed specifically for DevOps teams and developers. 
                  As a <strong>kavach secret tool</strong>, it provides enterprise-grade security with a CLI-first approach, making it perfect for 
                  automation and CI/CD pipelines. Whether you're managing <strong>kavach secrets</strong> across multiple cloud providers or 
                  need centralized access control, Kavach delivers the security and flexibility your team needs.
                </p>
                <p>
                  Our <strong>kavach secret management</strong> platform supports GitHub, GCP Secret Manager, Azure Key Vault, and more, 
                  allowing you to sync secrets seamlessly across your infrastructure. With built-in RBAC, audit trails, and 
                  version control, you can trust that your <strong>kavach secret</strong> data is always secure and compliant.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <DevelopmentStatusSection />
        <FeaturesSection />
      </main>
    </Layout>
  );
}
