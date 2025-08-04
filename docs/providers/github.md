---
sidebar_position: 3
---

# GitHub Provider Configuration

🐙 Configure GitHub integration with Kavach for secret synchronization.

## Overview

Kavach can sync secrets to GitHub Actions Secrets and Variables, providing centralized secret management for your GitHub repositories. This guide covers setting up GitHub Personal Access Tokens (PAT) and configuring the integration.

### What You'll Learn

- **Personal Access Token Setup**: Create and configure GitHub PAT with proper permissions
- **Repository Configuration**: Set up GitHub repositories for secret storage
- **Permission Management**: Assign proper scopes and repository access
- **CLI Integration**: Configure Kavach to sync with GitHub
- **Troubleshooting**: Common issues and solutions

### Prerequisites

- **GitHub Account**: Active GitHub account with repository access
- **Repository Access**: Owner or Admin permissions on target repositories
- **Kavach CLI**: Kavach CLI installed and authenticated

## GUI Setup (Recommended)

### Step 1: Create GitHub Personal Access Token (PAT)

1. **Navigate to GitHub Settings**
   - Go to [GitHub Settings](https://github.com/settings)
   - Click on **Developer settings** in the left sidebar

   ![GitHub Settings - Developer Settings](https://via.placeholder.com/800x400/24292e/ffffff?text=GitHub+Settings+-+Developer+Settings)

2. **Access Personal Access Tokens**
   - Click on **Personal access tokens**
   - Click on **Fine-grained tokens**

   ![GitHub Personal Access Tokens](https://via.placeholder.com/800x400/24292e/ffffff?text=GitHub+Personal+Access+Tokens)

3. **Generate New Token**
   - Click **Generate new token**
   - Click **Generate new token (classic)** if fine-grained tokens are not available

   ![GitHub Generate New Token](https://via.placeholder.com/800x400/24292e/ffffff?text=GitHub+Generate+New+Token)

4. **Configure Token Details**
   - **Note**: `Kavach Secrets Token`
   - **Expiration**: Choose appropriate duration (recommend 90 days for security)
   - **Scopes**: Select the following permissions:
     - ✅ **repo** (Full control of private repositories)
     - ✅ **workflow** (Update GitHub Action workflows)
     - ✅ **admin:org** (Full control of organizations and teams)

   ![GitHub Token Configuration](https://via.placeholder.com/800x400/24292e/ffffff?text=GitHub+Token+Configuration)

5. **Generate and Copy Token**
   - Click **Generate token**
   - **IMPORTANT**: Copy the token immediately - it won't be shown again
   - Store this securely - you'll need it for Kavach configuration

   ![GitHub Token Generated](https://via.placeholder.com/800x400/24292e/ffffff?text=GitHub+Token+Generated)

### Step 2: Configure Repository Access (Fine-grained Tokens)

If using fine-grained tokens, configure repository access:

1. **Resource Owner**
   - Choose your username or organization
   - Select the account that owns the repositories

   ![GitHub Resource Owner Selection](https://via.placeholder.com/800x400/24292e/ffffff?text=GitHub+Resource+Owner+Selection)

2. **Repository Access**
   - Choose **Only select repositories**
   - Select specific repositories (e.g., `kavach-backend`, `kavach-cli`)
   - Or choose **All repositories** if you want access to all repos

   ![GitHub Repository Access](https://via.placeholder.com/800x400/24292e/ffffff?text=GitHub+Repository+Access)

3. **Repository Permissions**
   - **Actions**: **Read and write**
   - **Secrets**: **Read and write**
   - **Contents**: **Read and write** (if you need to update workflow files)

   ![GitHub Repository Permissions](https://via.placeholder.com/800x400/24292e/ffffff?text=GitHub+Repository+Permissions)

### Step 3: Verify Repository Secrets Access

1. **Navigate to Repository Settings**
   - Go to your target repository
   - Click on **Settings** tab
   - Click on **Secrets and variables** in the left sidebar
   - Click on **Actions**

   ![GitHub Repository Settings](https://via.placeholder.com/800x400/24292e/ffffff?text=GitHub+Repository+Settings)

2. **Check Secrets Section**
   - Verify you can see the **Secrets** and **Variables** sections
   - This confirms your token has proper permissions

   ![GitHub Repository Secrets](https://via.placeholder.com/800x400/24292e/ffffff?text=GitHub+Repository+Secrets)

### Step 4: Configure Kavach

```bash
# Configure GitHub provider in Kavach
kavach provider configure github \
  --token "your-github-token" \
  --owner "your-github-username-or-org" \
  --repo "your-repository-name" \
  --org "your-organization" \
  --group "your-secret-group" \
  --env "your-environment"
```

## Configuration Parameters

### Required Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `--token` | GitHub Personal Access Token | `ghp_xxxxxxxxxxxxxxxxxxxx` |
| `--owner` | GitHub username or organization | `myusername` or `myorg` |
| `--repo` | GitHub repository name | `my-app` |
| `--org` | Kavach organization name | `mycompany` |
| `--group` | Kavach secret group name | `myapp` |
| `--env` | Kavach environment name | `production` |

### Optional Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `--description` | Provider description | `GitHub Actions Secrets integration` |
| `--branch` | Target branch for workflow updates | `main` |

## Testing the Configuration

### Step 1: Verify Provider Setup

```bash
# List configured providers
kavach provider list

# Show GitHub provider details
kavach provider show --provider github
```

### Step 2: Test Secret Sync

```bash
# Add a test secret to Kavach
kavach secret add --name "github-test-secret" --value "test-value"

# Commit the secret
kavach secret commit --message "Add GitHub test secret"

# Sync to GitHub
kavach secret sync --provider github

# Verify in GitHub Repository
# Go to Settings → Secrets and variables → Actions
```

### Step 3: Verify in GitHub Repository

1. **Navigate to Repository Secrets**
   - Go to your repository on GitHub
   - Click **Settings** → **Secrets and variables** → **Actions**
   - Look for your synced secrets in the **Repository secrets** section

   ![GitHub Repository Secrets List](https://via.placeholder.com/800x400/24292e/ffffff?text=GitHub+Repository+Secrets+List)

2. **Check Secret Names**
   - Secrets should be prefixed with your Kavach configuration
   - Format: `{org}_{group}_{env}_{secret_name}`

   ![GitHub Secret Names](https://via.placeholder.com/800x400/24292e/ffffff?text=GitHub+Secret+Names)

## Security Best Practices

### Personal Access Token Security

1. **Token Management**
   - Use fine-grained tokens when possible
   - Set appropriate expiration dates
   - Rotate tokens regularly
   - Store tokens securely (not in version control)

2. **Repository Access**
   - Limit token access to specific repositories
   - Use organization-level tokens for multiple repos
   - Regularly audit token permissions

3. **Secret Naming**
   - Use consistent naming conventions
   - Include environment prefixes
   - Avoid sensitive information in secret names

### GitHub Actions Security

1. **Workflow Security**
   - Use `GITHUB_TOKEN` for workflow authentication
   - Limit workflow permissions to minimum required
   - Enable branch protection rules

2. **Secret Usage**
   - Use repository secrets for sensitive data
   - Use environment secrets for environment-specific data
   - Use organization secrets for shared data

## Troubleshooting

### Common Issues

#### 1. "Authentication Failed" Errors

```bash
# Verify token is valid
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user

# Check token permissions
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user/repos
```

#### 2. "Repository Not Found" Errors

```bash
# Verify repository exists and is accessible
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/repos/OWNER/REPO

# Check repository permissions
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/repos/OWNER/REPO/permissions
```

#### 3. "Insufficient Permissions" Errors

```bash
# Check token scopes
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user

# Verify repository access
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/repos/OWNER/REPO/collaborators/YOUR_USERNAME
```

#### 4. "Token Expired" Errors

```bash
# Generate new token
# Go to GitHub Settings → Developer settings → Personal access tokens
# Create new token with same permissions
# Update Kavach configuration
kavach provider update github --token "new-token-value"
```

### Debug Commands

```bash
# Test GitHub API access
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user

# Test repository access
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/repos/OWNER/REPO

# Test secrets access
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/repos/OWNER/REPO/actions/secrets

# Check Kavach provider status
kavach provider show --provider github
```

## Advanced Configuration

### Multiple Repository Setup

```bash
# Configure multiple repositories
kavach provider configure github \
  --token "your-token" \
  --owner "myorg" \
  --repo "backend-app" \
  --org "mycompany" \
  --group "backend" \
  --env "production"

kavach provider configure github \
  --token "your-token" \
  --owner "myorg" \
  --repo "frontend-app" \
  --org "mycompany" \
  --group "frontend" \
  --env "production"
```

### Organization-Level Configuration

```bash
# Configure organization-wide secrets
kavach provider configure github \
  --token "org-token" \
  --owner "myorg" \
  --repo "shared-secrets" \
  --org "mycompany" \
  --group "shared" \
  --env "organization"
```

### Environment-Specific Configuration

```bash
# Development environment
kavach provider configure github \
  --token "dev-token" \
  --owner "myorg" \
  --repo "myapp-dev" \
  --org "mycompany" \
  --group "myapp" \
  --env "development"

# Production environment
kavach provider configure github \
  --token "prod-token" \
  --owner "myorg" \
  --repo "myapp-prod" \
  --org "mycompany" \
  --group "myapp" \
  --env "production"
```

## GitHub Actions Integration

### Example Workflow

Create `.github/workflows/kavach-sync.yml`:

```yaml
name: Kavach Secret Sync

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  sync-secrets:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Kavach
        uses: actions/setup-go@v4
        with:
          go-version: '1.21'

      - name: Install Kavach CLI
        run: |
          go install github.com/Gkemhcs/kavach-cli@latest

      - name: Sync Secrets
        run: |
          kavach secret sync --provider github
        env:
          KAVACH_TOKEN: ${{ secrets.KAVACH_TOKEN }}
```

### Environment Secrets

For environment-specific secrets:

1. **Create Environment**
   - Go to repository **Settings** → **Environments**
   - Click **New environment**
   - Name: `production`, `staging`, etc.

   ![GitHub Environments](https://via.placeholder.com/800x400/24292e/ffffff?text=GitHub+Environments)

2. **Add Environment Secrets**
   - Click on the environment
   - Add secrets specific to that environment

   ![GitHub Environment Secrets](https://via.placeholder.com/800x400/24292e/ffffff?text=GitHub+Environment+Secrets)

## Summary of Required Values

You'll need to store these securely:

| Name | Source | Example |
|------|--------|---------|
| `token` | GitHub Settings → Developer settings → Personal access tokens | `ghp_xxxxxxxxxxxxxxxxxxxx` |
| `owner` | GitHub username or organization name | `myusername` or `myorg` |
| `repo` | Repository name | `my-app` |

## Next Steps

After configuring GitHub integration:

1. **Test Secret Sync**: Verify secrets are properly synced to GitHub
2. **Set Up Workflows**: Configure GitHub Actions for automated sync
3. **Implement Environments**: Set up environment-specific secrets
4. **Document Procedures**: Create runbooks for your team
5. **Configure Other Providers**: [Azure Provider Configuration](./azure) | [GCP Provider Configuration](./gcp)

## Support

If you encounter issues:

- **GitHub Documentation**: [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- **Kavach Issues**: [GitHub Issues](https://github.com/Gkemhcs/kavach-docs/issues)
- **Community Support**: [Discord Community](https://discord.gg/kavach)