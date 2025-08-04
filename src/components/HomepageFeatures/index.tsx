import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '🔐 Secure by Design',
    description: (
      <>
        Enterprise-grade encryption, role-based access control, and audit trails. 
        Your secrets are encrypted at rest and in transit with industry-standard algorithms.
      </>
    ),
  },
  {
    title: '⚡ CLI-First Experience',
    description: (
      <>
        Powerful command-line interface for developers and DevOps teams. 
        Integrate seamlessly into your existing workflows and CI/CD pipelines.
      </>
    ),
  },
  {
    title: '☁️ Multi-Cloud Integration',
    description: (
      <>
        Sync secrets to GitHub, GCP Secret Manager, Azure Key Vault, and more. 
        Centralized management with distributed deployment capabilities.
      </>
    ),
  },
  {
    title: '🏗️ Resource Hierarchy',
    description: (
      <>
        Organize secrets with Organizations, Secret Groups, and Environments. 
        Granular permissions and team-based access control.
      </>
    ),
  },
  {
    title: '🔄 Version Control',
    description: (
      <>
        Full version history, rollback capabilities, and change tracking. 
        Never lose track of secret changes with comprehensive audit logs.
      </>
    ),
  },
  {
    title: '👥 Team Collaboration',
    description: (
      <>
        User groups, role-based permissions, and team management. 
        Collaborate securely with fine-grained access controls.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

function CallToAction() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className="text--center">
          <Heading as="h2">Ready to Get Started?</Heading>
          <p className="text--center" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Join thousands of developers who trust Kavach for their secret management needs.
          </p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/guides/quickstart">
              Start Your Journey 🚀
            </Link>
            <Link
              className="button button--outline button--lg"
              to="/docs/architecture/overview"
              style={{ marginLeft: '1rem' }}>
              Learn Architecture 🏗️
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
