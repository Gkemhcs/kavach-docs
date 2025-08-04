---
sidebar_position: 5
---

# Provider Commands

🔄 Manage cloud provider credentials for secret synchronization.

## Overview

Provider commands allow you to configure, manage, and monitor cloud provider integrations for secret synchronization. This enables automated secret deployment to external cloud platforms like GitHub, GCP, and Azure.

### Supported Providers

| Provider | Service | Use Case |
|----------|---------|----------|
| **GitHub** | Repository secrets | CI/CD integration, GitHub Actions |
| **GCP** | Secret Manager | Google Cloud applications |
| **Azure** | Key Vault | Azure applications |

## Commands

### `kavach provider configure`

🔧 Configure provider credentials for secret synchronization

#### Usage

```bash
kavach provider configure <provider> [flags]
```

#### Subcommands

- **`kavach provider configure github`** - Configure GitHub provider
- **`kavach provider configure gcp`** - Configure Google Cloud provider
- **`kavach provider configure azure`** - Configure Azure provider

---

### `kavach provider configure github`

🐙 Configure GitHub provider credentials

#### Required Flags

| Flag | Description |
|------|-------------|
| `--token` | GitHub Personal Access Token with repo scope |
| `--owner` | GitHub organization or username |
| `--repository` | GitHub repository name |
| `--org` | Organization name |
| `--group` | Secret group name |
| `--env` | Environment name |

#### Optional Flags

| Flag | Description | Default |
|------|-------------|---------|
| `--environment` | GitHub environment name | "default" |
| `--secret-visibility` | Secret visibility: all, selected, private | "private" |

#### Examples

```bash
# Basic GitHub configuration
kavach provider configure github \
  --token "ghp_xxxxxxxxxxxxxxxxxxxx" \
  --owner "myorg" \
  --repository "myrepo" \
  --org "myorg" \
  --group "mygroup" \
  --env "prod"

# GitHub configuration with environment and visibility
kavach provider configure github \
  --token "ghp_xxxxxxxxxxxxxxxxxxxx" \
  --owner "myorg" \
  --repository "myrepo" \
  --environment "production" \
  --secret-visibility "private" \
  --org "myorg" \
  --group "mygroup" \
  --env "prod"
```

---

### `kavach provider configure gcp`

☁️ Configure Google Cloud provider credentials

#### Required Flags

| Flag | Description |
|------|-------------|
| `--key-file` | Path to service account JSON file |
| `--project-id` | GCP project ID |
| `--org` | Organization name |
| `--group` | Secret group name |
| `--env` | Environment name |

#### Examples

```bash
# Basic GCP configuration
kavach provider configure gcp \
  --key-file "./service-account.json" \
  --project-id "my-gcp-project" \
  --org "myorg" \
  --group "mygroup" \
  --env "prod"
```

---

### `kavach provider configure azure`

🔷 Configure Azure provider credentials

#### Required Flags

| Flag | Description |
|------|-------------|
| `--tenant-id` | Azure tenant ID |
| `--client-id` | Azure client ID |
| `--client-secret` | Azure client secret |
| `--vault-name` | Azure Key Vault name |
| `--org` | Organization name |
| `--group` | Secret group name |
| `--env` | Environment name |

#### Examples

```bash
# Basic Azure configuration
kavach provider configure azure \
  --tenant-id "your-tenant-id" \
  --client-id "your-client-id" \
  --client-secret "your-client-secret" \
  --vault-name "my-key-vault" \
  --org "myorg" \
  --group "mygroup" \
  --env "prod"
```

---

### `kavach provider list`

📋 List configured providers

#### Usage

```bash
kavach provider list [flags]
```

#### Flags

| Flag | Description | Required | Default |
|------|-------------|----------|---------|
| `--format` | Output format (table, json, yaml) | No | table |

#### Examples

```bash
# List all providers
kavach provider list

# List with JSON format
kavach provider list --format json
```

---

### `kavach provider show`

👁️ Show provider details

#### Usage

```bash
kavach provider show [flags]
```

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--provider` | Provider name (github, gcp, azure) | Yes |
| `--format` | Output format (table, json) | No |

#### Examples

```bash
# Show GitHub provider details
kavach provider show --provider github

# Show GCP provider details
kavach provider show --provider gcp
```

---

### `kavach provider update`

🔄 Update provider configuration

#### Usage

```bash
kavach provider update [flags]
```

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--provider` | Provider name (github, gcp, azure) | Yes |
| `--token` | New GitHub token | No* |
| `--key-file` | New GCP service account file | No* |
| `--client-secret` | New Azure client secret | No* |

*Provider-specific flags are required for the respective provider.

#### Examples

```bash
# Update GitHub token
kavach provider update --provider github --token "ghp_new_token_here"

# Update GCP service account
kavach provider update --provider gcp --key-file "./new-service-account.json"
```

---

### `kavach provider delete`

🗑️ Delete provider configuration

#### Usage

```bash
kavach provider delete [flags]
```

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--provider` | Provider name (github, gcp, azure) | Yes |
| `--force` | Skip confirmation prompt | No |

#### Examples

```bash
# Delete GitHub provider (with confirmation)
kavach provider delete --provider github

# Delete GCP provider (force without confirmation)
kavach provider delete --provider gcp --force
```

## Provider Setup Guides

### GitHub Setup

#### 1. Create GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `workflow`
4. Copy the generated token

#### 2. Configure GitHub Provider

```bash
kavach provider configure github \
  --token "ghp_your_github_token" \
  --owner "your-org" \
  --repository "your-repo" \
  --org "myorg" \
  --group "mygroup" \
  --env "prod"
```

### GCP Setup

#### 1. Create Service Account

1. Go to Google Cloud Console → IAM & Admin → Service Accounts
2. Click "Create Service Account"
3. Assign roles: `Secret Manager Admin`, `Secret Manager Secret Accessor`
4. Create and download JSON key file

#### 2. Configure GCP Provider

```bash
kavach provider configure gcp \
  --key-file "./service-account.json" \
  --project-id "my-gcp-project" \
  --org "myorg" \
  --group "mygroup" \
  --env "prod"
```

### Azure Setup

#### 1. Create Service Principal

1. Go to Azure Portal → Azure Active Directory → App registrations
2. Click "New registration"
3. Assign roles: `Key Vault Secrets Officer`, `Key Vault Secrets User`

#### 2. Configure Azure Provider

```bash
kavach provider configure azure \
  --tenant-id "your-tenant-id" \
  --client-id "your-client-id" \
  --client-secret "your-client-secret" \
  --vault-name "my-key-vault" \
  --org "myorg" \
  --group "mygroup" \
  --env "prod"
```

## Workflow Examples

### Complete Provider Setup

```bash
# 1. Configure GitHub provider
kavach provider configure github \
  --token "ghp_github_token" \
  --owner "my-org" \
  --repository "my-repo" \
  --org "myorg" \
  --group "mygroup" \
  --env "prod"

# 2. Configure GCP provider
kavach provider configure gcp \
  --key-file "./gcp-service-account.json" \
  --project-id "my-gcp-project" \
  --org "myorg" \
  --group "mygroup" \
  --env "prod"

# 3. List all providers
kavach provider list

# 4. Sync secrets to providers
kavach secret sync --provider github
kavach secret sync --provider gcp
```

## Best Practices

### 1. Credential Management

```bash
# Use environment variables for sensitive data
export GITHUB_TOKEN="ghp_your_token"
export GCP_KEY_FILE="./service-account.json"

kavach provider configure github --token "$GITHUB_TOKEN"
kavach provider configure gcp --key-file "$GCP_KEY_FILE"
```

### 2. Token Rotation

```bash
# Regular token updates
kavach provider update --provider github --token "new_token"
kavach provider update --provider gcp --key-file "new_service_account.json"
```

## Next Steps

After configuring providers:

1. **Store Secrets**: [Secret Management](/docs/cli/commands/secret)
2. **Sync Secrets**: [Secret Synchronization](/docs/cli/commands/secret#kavach-secret-sync)
3. **Set Up CI/CD**: [CI/CD Integration](/docs/guides/ci-cd) 