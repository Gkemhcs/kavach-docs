---
sidebar_position: 1
---

# Secret Commands

The `kavach secret` commands provide comprehensive secret management capabilities including creation, versioning, synchronization, and export functionality.

## Overview

Secret management in Kavach follows a versioned approach:

1. **Add secrets** to a staging area
2. **Commit secrets** to create a new version
3. **List and view** secret versions
4. **Export secrets** for application use
5. **Push secrets** to external providers
6. **Sync secrets** from external providers
7. **Rollback** to previous versions if needed

## Command Structure

```bash
kavach secret [subcommand] [flags]
```

## Subcommands

### `kavach secret add`

Add a secret to the staging area for the current environment.

#### Syntax

```bash
kavach secret add [flags]
```

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--name, -n` | Name of the secret | Yes |
| `--value, -v` | Secret value (string) | Yes* |
| `--file` | Path to file containing secret | Yes* |
| `--from-env` | Environment variable name | Yes* |

*One of `--value`, `--file`, or `--from-env` is required.

#### Examples

```bash
# Add string secret
kavach secret add --name "database-url" --value "postgresql://user:pass@localhost:5432/db"

# Add file secret
kavach secret add --name "ssl-cert" --file ./certificate.pem

# Add from environment variable
kavach secret add --name "api-key" --from-env API_KEY

# Add multiple secrets
kavach secret add --name "db-host" --value "localhost"
kavach secret add --name "db-port" --value "5432"
kavach secret add --name "db-name" --value "myapp"

# Add using short flags
kavach secret add -n "jwt-secret" -v "super-secret-jwt-key"
```

#### Use Cases

- **Configuration Values**: Database URLs, API endpoints
- **Credentials**: Passwords, API keys, tokens
- **Certificates**: SSL certificates, SSH keys
- **Sensitive Data**: Any confidential information

### `kavach secret commit`

Commit staged secrets to create a new version in the current environment.

#### Syntax

```bash
kavach secret commit [flags]
```

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--message` | Commit message describing the changes | Yes |

#### Examples

```bash
# Commit with descriptive message
kavach secret commit --message "Add database credentials for user service"

# Commit with detailed message
kavach secret commit --message "Update API keys for payment integration - version 2.1"

# Commit after adding multiple secrets
kavach secret add db-host --value "localhost"
kavach secret add db-port --value "5432"
kavach secret commit --message "Add database configuration"
```

#### Best Practices

- **Descriptive Messages**: Use clear, descriptive commit messages
- **Atomic Commits**: Group related secrets in single commits
- **Version Tracking**: Include version numbers or change descriptions

### `kavach secret push`

Push secrets to external cloud providers.

#### Syntax

```bash
kavach secret push [flags]
```

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--provider` | Provider name (github, gcp, azure) | Yes |
| `--version` | Version ID to push (default: latest) | No |

#### Examples

```bash
# Push latest version to GitHub
kavach secret push --provider github

# Push specific version to GCP
kavach secret push --provider gcp --version "abc12345"

# Push to Azure
kavach secret push --provider azure

# Push to multiple providers
kavach secret push --provider github
kavach secret push --provider gcp
```

#### Supported Providers

- **GitHub**: Repository secrets and environment secrets
- **GCP**: Secret Manager
- **Azure**: Key Vault

### `kavach secret list`

List all secret versions in the current environment.

#### Syntax

```bash
kavach secret list [flags]
```

#### Flags

| Flag | Description | Default |
|------|-------------|---------|
| `--format` | Output format (table, json, yaml) | table |
| `--limit` | Maximum number of versions to show | 10 |

#### Examples

```bash
# List recent versions
kavach secret list

# List with JSON format
kavach secret list --format json

# List more versions
kavach secret list --limit 20

# List with YAML format
kavach secret list --format yaml
```

#### Output Format

**Table Format:**
```
┌──────────┬──────────────────────┬─────────────────────┬─────────────────┐
│ VERSION  │ COMMIT MESSAGE       │ CREATED AT          │ SECRET COUNT    │
├──────────┼──────────────────────┼─────────────────────┼─────────────────┤
│ abc12345 │ Add database creds   │ 2024-01-15 10:30:00 │ 3               │
│ def67890 │ Update API keys      │ 2024-01-15 09:15:00 │ 5               │
│ ghi11111 │ Initial setup        │ 2024-01-15 08:00:00 │ 2               │
└──────────┴──────────────────────┴─────────────────────┴─────────────────┘
```

**JSON Format:**
```json
{
  "versions": [
    {
      "id": "abc12345",
      "commit_message": "Add database credentials",
      "created_at": "2024-01-15T10:30:00Z",
      "secret_count": 3
    }
  ]
}
```

### `kavach secret details`

Show detailed information about a specific secret version.

#### Syntax

```bash
kavach secret details [flags]
```

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--version` | Version ID to show details for | Yes |

#### Examples

```bash
# Show details of specific version
kavach secret details --version "abc12345"

# Show details of latest version
kavach secret details --version "latest"

# Show details with JSON format
kavach secret details --version "abc12345" --format json
```

#### Output Format

**Table Format:**
```
Version Details:
┌─────────────┬─────────────────────────────────────────────┐
│ ID          │ abc12345                                     │
├─────────────┼─────────────────────────────────────────────┤
│ Commit Msg  │ Add database credentials for user service   │
├─────────────┼─────────────────────────────────────────────┤
│ Created At  │ 2024-01-15 10:30:00 UTC                     │
├─────────────┼─────────────────────────────────────────────┤
│ Secret Count│ 3                                            │
└─────────────┴─────────────────────────────────────────────┘

Secrets:
┌─────────────┬─────────────────────────────────────────────┐
│ NAME        │ VALUE                                        │
├─────────────┼─────────────────────────────────────────────┤
│ database-url│ postgresql://user:pass@localhost:5432/db    │
├─────────────┼─────────────────────────────────────────────┤
│ api-key     │ sk-1234567890abcdef                         │
├─────────────┼─────────────────────────────────────────────┤
│ redis-url   │ redis://localhost:6379                      │
└─────────────┴─────────────────────────────────────────────┘
```

### `kavach secret export`

Export secrets from a specific version to various formats.

#### Syntax

```bash
kavach secret export [flags]
```

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--version` | Version ID to export | Yes |
| `--format` | Export format (env, json, yaml) | Yes |
| `--output` | Output file path | No |

#### Examples

```bash
# Export to .env file
kavach secret export --version "abc12345" --format env --output .env

# Export to JSON file
kavach secret export --version "abc12345" --format json --output secrets.json

# Export to YAML file
kavach secret export --version "abc12345" --format yaml --output secrets.yaml

# Export to stdout
kavach secret export --version "abc12345" --format env

# Export latest version
kavach secret export --version "latest" --format env --output .env
```

#### Export Formats

**Environment Variables (.env):**
```bash
# .env file
DATABASE_URL=postgresql://user:pass@localhost:5432/db
API_KEY=sk-1234567890abcdef
REDIS_URL=redis://localhost:6379
```

**JSON:**
```json
{
  "database-url": "postgresql://user:pass@localhost:5432/db",
  "api-key": "sk-1234567890abcdef",
  "redis-url": "redis://localhost:6379"
}
```

**YAML:**
```yaml
database-url: postgresql://user:pass@localhost:5432/db
api-key: sk-1234567890abcdef
redis-url: redis://localhost:6379
```

### `kavach secret sync`

Synchronize secrets from external cloud providers.

#### Syntax

```bash
kavach secret sync [flags]
```

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--provider` | Provider name (github, gcp, azure) | Yes |
| `--version` | Version ID to sync (default: latest) | No |

#### Examples

```bash
# Sync from GitHub
kavach secret sync --provider github

# Sync specific version from GCP
kavach secret sync --provider gcp --version "abc12345"

# Sync from Azure
kavach secret sync --provider azure

# Sync from multiple providers
kavach secret sync --provider github
kavach secret sync --provider gcp
```

#### Supported Providers

- **GitHub**: Repository secrets and environment secrets
- **GCP**: Secret Manager
- **Azure**: Key Vault

### `kavach secret rollback`

Rollback to a previous version of secrets.

#### Syntax

```bash
kavach secret rollback [flags]
```

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--version` | Version ID to rollback to | Yes |
| `--message` | Commit message for rollback | Yes |

#### Examples

```bash
# Rollback to specific version
kavach secret rollback --version "abc12345" --message "Rollback to stable version"

# Rollback to previous version
kavach secret rollback --version "def67890" --message "Revert breaking changes"

# Rollback with detailed message
kavach secret rollback --version "abc12345" --message "Rollback due to API key compromise"
```

#### Use Cases

- **Emergency Rollbacks**: Quick reversion during incidents
- **Testing Rollbacks**: Revert to known good state
- **Security Rollbacks**: Remove compromised credentials

### `kavach secret diff`

Show differences between two secret versions.

#### Syntax

```bash
kavach secret diff [flags]
```

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--from` | Source version ID | Yes |
| `--to` | Target version ID | Yes |
| `--format` | Output format (table, json) | No |

#### Examples

```bash
# Compare two versions
kavach secret diff --from "abc12345" --to "def67890"

# Compare with latest
kavach secret diff --from "abc12345" --to "latest"

# Compare with JSON output
kavach secret diff --from "abc12345" --to "def67890" --format json
```

#### Output Format

**Table Format:**
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ SECRET NAME │ FROM VALUE  │ TO VALUE    │ STATUS      │
├─────────────┼─────────────┼─────────────┼─────────────┤
│ database-url│ old-url     │ new-url     │ MODIFIED    │
├─────────────┼─────────────┼─────────────┼─────────────┤
│ api-key     │ old-key     │ new-key     │ MODIFIED    │
├─────────────┼─────────────┼─────────────┼─────────────┤
│ redis-url   │ (not set)   │ redis://... │ ADDED       │
├─────────────┼─────────────┼─────────────┼─────────────┤
│ old-secret  │ old-value   │ (not set)   │ REMOVED     │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

## Workflow Examples

### Complete Secret Management Workflow

```bash
# 1. Add secrets to staging
kavach secret add database-url --value "postgresql://user:pass@localhost:5432/db"
kavach secret add api-key --value "sk-1234567890abcdef"
kavach secret add redis-url --value "redis://localhost:6379"

# 2. Commit secrets
kavach secret commit --message "Add initial application secrets"

# 3. List versions
kavach secret list

# 4. Export for development
kavach secret export --version "latest" --format env --output .env

# 5. Push to cloud providers
kavach secret push --provider github
kavach secret push --provider gcp
```

### Update Secrets Workflow

```bash
# 1. Add updated secrets
kavach secret add database-url --value "postgresql://newuser:newpass@localhost:5432/db"
kavach secret add api-key --value "sk-new-api-key-123"

# 2. Commit changes
kavach secret commit --message "Update database credentials and API key"

# 3. Compare with previous version
kavach secret diff --from "abc12345" --to "latest"

# 4. Push updates
kavach secret push --provider github
```

### Emergency Rollback Workflow

```bash
# 1. Identify the issue
kavach secret list

# 2. Rollback to stable version
kavach secret rollback --version "abc12345" --message "Emergency rollback - API key compromise"

# 3. Verify rollback
kavach secret details --version "latest"

# 4. Push rollback
kavach secret push --provider github
```

## Best Practices

### 1. Secret Naming

```bash
# Good naming conventions
kavach secret add database-url --value "..."
kavach secret add redis-connection-string --value "..."
kavach secret add stripe-secret-key --value "..."

# Avoid generic names
kavach secret add key --value "..."  # Too generic
kavach secret add secret --value "..."  # Too generic
```

### 2. Commit Messages

```bash
# Good commit messages
kavach secret commit --message "Add database credentials for user service"
kavach secret commit --message "Update API keys for payment integration v2.1"
kavach secret commit --message "Add SSL certificates for production deployment"

# Avoid vague messages
kavach secret commit --message "Update secrets"  # Too vague
kavach secret commit --message "Fix"  # Too vague
```

### 3. Version Management

```bash
# Regular version review
kavach secret list

# Compare versions before updates
kavach secret diff --from "current" --to "latest"

# Keep stable versions for rollbacks
kavach secret rollback --version "stable_v1.0" --message "Rollback to stable"
```

### 4. Security Considerations

- **Never commit secrets to version control**
- **Use environment-specific secrets**
- **Rotate secrets regularly**
- **Monitor secret access and changes**

## Troubleshooting

### Common Issues

1. **Secret Already Exists**
   ```bash
   # Error: Secret already exists in staging
   # Solution: Clear staging area or use different name
   kavach secret commit --message "Clear staging"
   kavach secret add new-secret-name --value "..."
   ```

2. **Version Not Found**
   ```bash
   # Error: Version not found
   # Solution: Check available versions
   kavach secret list
   ```

3. **Provider Push Failed**
   ```bash
   # Error: Provider push failed
   # Solution: Check provider configuration
   kavach provider show --provider github
   ```

### Debug Commands

```bash
# Enable debug logging
kavach --debug secret list

# Check current environment
kavach status

# Verify provider configuration
kavach provider list
```

## Next Steps

- 📖 [Provider Commands](/docs/cli/commands/provider) - Cloud provider integration
- 🔄 [Multi-Cloud Setup](/docs/guides/multi-cloud) - Configure multiple providers
- 🔒 [Security Best Practices](/docs/security/overview) - Security guidelines
- 🚀 [CI/CD Integration](/docs/guides/ci-cd) - Automated secret management 