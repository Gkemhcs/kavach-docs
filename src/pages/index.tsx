import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="text--center">
          <img 
            src="/img/kavach.png" 
            alt="Kavach Logo" 
            className={styles.heroLogo}
            style={{ maxWidth: '100px', marginBottom: '1rem' }}
          />
        </div>
        <Heading as="h1" className="hero__title" style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle" style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 2px rgba(0,0,0,0.3)', fontSize: '1.2rem' }}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/guides/quickstart"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.9)', 
              color: '#333',
              border: 'none',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}>
            Get Started - 5min ⚡
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/cli/overview"
            style={{ 
              marginLeft: '1rem',
              borderColor: 'rgba(255,255,255,0.8)',
              color: 'white',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}>
            CLI Reference 📖
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Secure Secret Management`}
      description="Kavach is a modern, secure secret management platform with CLI-first design, multi-cloud integration, and enterprise-grade security features.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
