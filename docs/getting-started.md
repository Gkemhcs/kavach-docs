---
sidebar_position: 1
title: "Getting Started with Kavach - Enterprise Secret Management Platform"
description: "Learn how to get started with Kavach, the enterprise-grade secret management and synchronization platform. Install CLI, authenticate, and manage secrets securely."
keywords: ["kavach getting started", "kavach installation", "kavach cli setup", "secret management tutorial", "kavach docs", "kavach secret management"]
---

# Getting Started with Kavach

Welcome to **Kavach** - the enterprise-grade secret management and synchronization platform. This comprehensive guide will help you get started with Kavach and understand its core concepts for secure secret management.

## What is Kavach?

Kavach is a comprehensive secret management solution designed for modern cloud-native applications. It provides enterprise-grade security with developer-friendly tools for managing secrets across multiple cloud platforms.

### Key Features

- 🔐 **Secure Secret Storage** - Encrypted secret management with version control
- 🔄 **Multi-Cloud Synchronization** - Sync secrets to GitHub, GCP, Azure, AWS, and more
- 👥 **Role-Based Access Control** - Enterprise-grade authorization with RBAC
- 🏢 **Multi-Tenant Architecture** - Organization and group-based isolation
- 🚀 **CLI-First Design** - Developer-friendly command-line interface
- 🔒 **Zero-Trust Security** - End-to-end encryption and audit trails

## Architecture Overview

Kavach consists of two main components designed for scalability and security:

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
- **Authentication**: GitHub Device code flow
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

## Quick Start Guide

### 1. Install the Kavach CLI

Choose your platform and install the Kavach CLI tool:

#### Linux Installation
```bash
# Download the latest release
curl -L https://github.com/Gkemhcs/kavach-cli/releases/latest/download/kavach-cli_Linux_x86_64.tar.gz | tar -xz
chmod +x kavach
sudo mv kavach /usr/local/bin/
```

#### macOS Installation
```bash
# Using Homebrew (recommended)
brew install Gkemhcs/kavach-cli/kavach-cli

# Or download manually
curl -L https://github.com/Gkemhcs/kavach-cli/releases/latest/download/kavach-cli_Darwin_x86_64.tar.gz | tar -xz
chmod +x kavach
sudo mv kavach /usr/local/bin/
```

#### Windows Installation
```bash
# Download and extract the Windows zip file
# Extract kavach.exe to a directory in your PATH
# Or use Chocolatey (if available)
choco install kavach-cli
```

### 2. Verify Installation

```bash
# Check if Kavach CLI is installed correctly
kavach version

# Expected output:
# 🔖 Version: v0.1.0-alpha.1 (prerelease)
# 🕒 Build Time: 2024-08-04T10:30:00Z
# 🔗 Git Commit: abc123def456
# 🌿 Git Branch: main
# ⚡ Go Version: go1.23.0
# 💻 Platform: linux/amd64
```

### 3. Authenticate with Kavach

```bash
# Login with GitHub OAuth
kavach login

# This will open your browser for GitHub authentication
# Follow the prompts to complete the authentication
```

### 4. Create Your First Organization

```bash
# Create an organization for your team or project
kavach org create --name my-company --description "My company secrets"

# List organizations
kavach org list
```

### 5. Set Up Secret Groups and Environments

```bash
# Create a secret group for your application
kavach group create backend --description "Backend application secrets"

# Create environments for different deployment stages
kavach env create dev --description "Development environment"
kavach env create staging --description "Staging environment"
kavach env create prod --description "Production environment"
```

> ⚠️ **Environment Naming Convention**
> 
> Kavach supports only the following environment names:
> - `dev` - Development environment
> - `staging` - Staging environment  
> - `prod` - Production environment

### 6. Add Your First Secret

```bash
# Add a database password secret
kavach secret add DB_PASSWORD --value "my-secure-password" --env dev

# Add an API key secret
kavach secret add API_KEY --value "sk-1234567890abcdef" --env prod

# List secrets in an environment
kavach secret list --env dev
```

### 7. Configure Cloud Provider Integration

```bash
# Add GitHub as a provider
kavach provider add github --name github-secrets --repo "my-org/my-repo"

# Add Google Cloud Platform
kavach provider add gcp --name gcp-secrets --project "my-gcp-project"

# List configured providers
kavach provider list
```

### 8. Synchronize Secrets

```bash
# Sync secrets to GitHub
kavach sync --provider github-secrets --env prod

# Sync secrets to GCP Secret Manager
kavach sync --provider gcp-secrets --env staging
```

## Next Steps

Now that you have Kavach set up, explore these resources:

- **[CLI Reference](/docs/cli/overview)** - Complete command reference
- **[Architecture Guide](/docs/architecture/overview)** - Deep dive into Kavach architecture
- **[Why Kavach](/docs/why-kavach)** - Learn about Kavach's benefits
- **[Providers](/docs/providers/github)** - Cloud provider integration guides

## Common Use Cases

### Development Workflow
1. **Local Development**: Use `dev` environment for local testing
2. **Staging Deployment**: Sync `staging` environment secrets to cloud providers
3. **Production Deployment**: Sync `prod` environment secrets with strict access controls

### Team Collaboration
1. **Organization Setup**: Create organizations for different teams
2. **Access Control**: Use user groups to manage permissions
3. **Secret Sharing**: Share secrets securely within your organization

### Cloud Integration
1. **Multi-Cloud**: Sync secrets to multiple cloud providers
2. **CI/CD Integration**: Use Kavach in your deployment pipelines
3. **Kubernetes Integration**: Mount secrets in Kubernetes pods

## Troubleshooting

### Common Issues

**Authentication Problems**
```bash
# Clear authentication cache
kavach logout
kavach login
```

**Permission Errors**
```bash
# Check your permissions
kavach org list
kavach group list
```

**Sync Failures**
```bash
# Check provider configuration
kavach provider list
kavach provider show <provider-name>
```

### Getting Help

- **[Documentation](/docs/getting-started)** - Comprehensive guides and references
- **[GitHub Issues](https://github.com/Gkemhcs/kavach-cli/issues)** - Report bugs and request features
- **[Discussions](https://github.com/Gkemhcs/kavach-cli/discussions)** - Community support and questions
- **[Discord](https://discord.gg/kavach)** - Real-time community chat

## Security Considerations

- 🔐 **Never commit secrets** to version control
- 🔐 **Use environment-specific secrets** for different deployment stages
- 🔐 **Regularly rotate secrets** and API keys
- 🔐 **Monitor access logs** for suspicious activity
- 🔐 **Use least privilege** access controls

---

**Ready to get started?** Follow the steps above to set up Kavach for your project. For more detailed information, explore the [CLI Reference](/docs/cli/overview) and [Architecture Guide](/docs/architecture/overview). 