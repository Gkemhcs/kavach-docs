---
sidebar_position: 1
---

# Getting Started with Kavach

Welcome to **Kavach** - the enterprise-grade secret management and synchronization platform. This guide will help you get started with Kavach and understand its core concepts.

## What is Kavach?

Kavach is a comprehensive secret management solution designed for modern cloud-native applications. It provides:

- 🔐 **Secure Secret Storage** - Encrypted secret management with version control
- 🔄 **Multi-Cloud Synchronization** - Sync secrets to GitHub, GCP, Azure, and more
- 👥 **Role-Based Access Control** - Enterprise-grade authorization with RBAC
- 🏢 **Multi-Tenant Architecture** - Organization and group-based isolation
- 🚀 **CLI-First Design** - Developer-friendly command-line interface
- 🔒 **Zero-Trust Security** - End-to-end encryption and audit trails

## Architecture Overview

Kavach consists of two main components:

### 1. Backend Server (`kavach-backend`)
- **Language**: Go
- **Framework**: Gin HTTP server
- **Database**: PostgreSQL with SQLC
- **Authentication**: JWT + GitHub OAuth
- **Authorization**: Casbin RBAC
- **Encryption**: AES-256 for secrets and credentials

### 2. CLI Tool (`kavach-cli`)
- **Language**: Go
- **Framework**: Cobra CLI framework
- **Authentication**: Github Device code flow
- **HTTP Client**: RESTful API communication

## Core Concepts

### Resource Hierarchy
```
Organization
├── Secret Groups
│   |__ Environments
│       ├── Secrets (Versioned)
│       └── Provider Credentials   
└── User Groups
```

### Key Components

- **Organizations**: Top-level containers for teams and projects
- **Secret Groups**: Logical groupings of related secrets
- **Environments**: Deployment environments (dev, staging, prod)
- **Secrets**: Encrypted key-value pairs with version history
- **Providers**: External cloud platforms for secret synchronization
- **User Groups**: Role-based access control groups

## Quick Start

### 1. Install the CLI

```bash
# Download the latest release
curl -L https://github.com/Gkemhcs/kavach-cli/releases/latest/download/kavach-cli-linux-amd64 -o kavach
chmod +x kavach
sudo mv kavach /usr/local/bin/
```

### 2. Authenticate

```bash
# Login with GitHub OAuth
kavach login
```

### 3. Create Your First Organization

```bash
# Create an organization
kavach org create --name my-company --description "My company secrets"
```

### 4. Set Up Secret Groups and Environments

```bash
# Create a secret group
kavach group create backend --description "Backend application secrets"

# Create environments
kavach env create dev --description "Development environment"
kavach env create prod --description "Production environment"
```

> ⚠️ **Environment Naming Convention**
> 
> Kavach supports only the following environment names:
> - `dev` - Development environment
> - `staging` - Staging environment  
> - `prod` - Production environment
> - `qa` - Quality assurance environment
> - `testing` - Testing environment

### 5. Store Your First Secret

```bash
# Add secrets to staging area
kavach secret add --name "database-url" --value "postgresql://user:pass@localhost:5432/db"
kavach secret add --name "api-key" --value "sk-1234567890abcdef"

# Commit secrets to environment
kavach secret commit --message "Add database and API credentials"
```

### 6. Sync to Cloud Providers

```bash
# Configure GitHub provider
kavach provider configure github --token "ghp_xxx" --owner "myorg" --repo "myrepo"

# Sync secrets to GitHub
kavach secret sync --provider github
```

## Next Steps

- 📖 [CLI Reference](/docs/cli/overview) - Complete command reference
- 🏗️ [Architecture Guide](/docs/architecture/overview) - Deep dive into system design
- 🔒 [CLI Authentication](/docs/cli/authentication) - Security features and best practices
- 🚀 [Quick Start Guide](/docs/guides/quickstart) - Step-by-step setup tutorial
- ☁️ [Provider Commands](/docs/cli/commands/provider) - Configure multiple providers

## Support

- 📚 [Getting Started](/docs/getting-started) - Complete documentation
- 🐛 [Issues](https://github.com/Gkemhcs/kavach-docs/issues) - Report bugs
- 💬 [Discussions](https://github.com/Gkemhcs/kavach-docs/discussions) - Ask questions
- ⭐ [GitHub](https://github.com/Gkemhcs/kavach-docs) - Star the project

---

**Ready to get started?** Follow our [Quick Start Guide](/docs/guides/quickstart) for a detailed walkthrough! 