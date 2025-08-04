---
sidebar_position: 1
---

# Quick Start Guide

This guide will walk you through setting up Kavach and managing your first secrets in under 10 minutes.

## Prerequisites

- [Kavach CLI installed](/docs/cli/installation)
- GitHub account for authentication
- Access to a Kavach backend instance

## Step 1: Install and Authenticate

### Install the CLI

```bash
# Download and install (Linux/macOS)
curl -L https://github.com/Gkemhcs/kavach-cli/releases/latest/download/kavach-cli-linux-amd64 -o kavach
chmod +x kavach
sudo mv kavach /usr/local/bin/

# Verify installation
kavach --version
```

### Login to Kavach

```bash
# Authenticate with GitHub OAuth
kavach login
```

Follow the prompts to complete the device code authentication flow.

## Step 2: Create Your Organization

```bash
# Create your first organization
kavach org create mycompany --description "My company secrets"

# Set it as active
kavach org activate mycompany
```

## Step 3: Set Up Secret Groups and Environments

```bash
# Create a secret group for your application
kavach group create backend --description "Backend application secrets"

# Set it as active
kavach group activate backend

# Create environments
kavach env create development --description "Development environment"
kavach env create staging --description "Staging environment"
kavach env create production --description "Production environment"

# Set development as active
kavach env activate development
```

## Step 4: Store Your First Secrets

```bash
# Add database credentials
kavach secret add database-url --value "postgresql://user:password@localhost:5432/myapp"

# Add API keys
kavach secret add api-key --value "sk-1234567890abcdef"

# Add configuration values
kavach secret add redis-url --value "redis://localhost:6379"
kavach secret add jwt-secret --value "your-super-secret-jwt-key"

# Commit the secrets
kavach secret commit --message "Add initial application secrets"
```

## Step 5: View and Manage Secrets

```bash
# List all secret versions
kavach secret list

# View details of the latest version
kavach secret details --version "latest"

# Export secrets to .env file
kavach secret export --version "latest" --format env --output .env
```

## Step 6: Configure Cloud Provider (Optional)

### GitHub Integration

```bash
# Configure GitHub provider
kavach provider configure github \
  --token "ghp_your_github_token" \
  --owner "your-org" \
  --repo "your-repo"

# Push secrets to GitHub
kavach secret push --provider github
```

### GCP Integration

```bash
# Configure GCP provider
kavach provider configure gcp \
  --key-file "service-account.json" \
  --project-id "your-project-id"

# Push secrets to GCP Secret Manager
kavach secret push --provider gcp
```

## Step 7: Manage Secret Versions

```bash
# Update a secret
kavach secret add database-url --value "postgresql://newuser:newpass@localhost:5432/myapp"
kavach secret commit --message "Update database credentials"

# View differences between versions
kavach secret diff --from "abc12345" --to "def67890"

# Rollback if needed
kavach secret rollback --version "abc12345" --message "Rollback to stable version"
```

## Step 8: Set Up Team Access

```bash
# Create a user group
kavach user-group create developers --description "Development team"

# Add team members
kavach user-group members add --group developers --user "developer@company.com"

# Grant environment access
kavach env grant --user "developer@company.com" --role "developer"
```

## Complete Example Workflow

Here's a complete example that demonstrates a typical workflow:

```bash
# 1. Setup
kavach login
kavach org create acme-corp --description "Acme Corporation"
kavach org activate acme-corp

# 2. Create infrastructure
kavach group create webapp --description "Web application"
kavach group activate webapp

kavach env create dev --description "Development"
kavach env create prod --description "Production"
kavach env activate dev

# 3. Add secrets
kavach secret add db-host --value "localhost"
kavach secret add db-port --value "5432"
kavach secret add db-name --value "acme_dev"
kavach secret add db-user --value "acme_user"
kavach secret add db-password --value "secure_password_123"
kavach secret add redis-url --value "redis://localhost:6379"
kavach secret add api-key --value "sk-acme-api-key-123"
kavach secret add jwt-secret --value "super-secret-jwt-key-456"

# 4. Commit secrets
kavach secret commit --message "Initial application configuration"

# 5. Configure provider
kavach provider configure github \
  --token "ghp_github_token_here" \
  --owner "acme-corp" \
  --repo "webapp"

# 6. Push to GitHub
kavach secret push --provider github

# 7. Switch to production
kavach env activate prod

# 8. Add production secrets
kavach secret add db-host --value "prod-db.acme.com"
kavach secret add db-port --value "5432"
kavach secret add db-name --value "acme_prod"
kavach secret add db-user --value "acme_prod_user"
kavach secret add db-password --value "super_secure_prod_password"
kavach secret add redis-url --value "redis://prod-redis.acme.com:6379"
kavach secret add api-key --value "sk-acme-prod-api-key-789"
kavach secret add jwt-secret --value "super-secret-prod-jwt-key-012"

# 9. Commit production secrets
kavach secret commit --message "Production configuration"

# 10. Push production secrets
kavach secret push --provider github
```

## Best Practices

### 1. Secret Naming

Use descriptive, consistent names:

```bash
# Good naming
kavach secret add database-url --value "..."
kavach secret add redis-connection-string --value "..."
kavach secret add stripe-secret-key --value "..."

# Avoid generic names
kavach secret add key --value "..."  # Too generic
kavach secret add secret --value "..."  # Too generic
```

### 2. Commit Messages

Write clear, descriptive commit messages:

```bash
# Good commit messages
kavach secret commit --message "Add database credentials for user service"
kavach secret commit --message "Update API keys for payment integration"
kavach secret commit --message "Add SSL certificates for production deployment"

# Avoid vague messages
kavach secret commit --message "Update secrets"  # Too vague
kavach secret commit --message "Fix"  # Too vague
```

### 3. Environment Management

Keep environments separate and organized:

```bash
# Development workflow
kavach env activate development
# Add/update development secrets
kavach secret commit --message "Development updates"

# Production workflow
kavach env activate production
# Add/update production secrets
kavach secret commit --message "Production deployment"
```

### 4. Version Control

Regularly review and manage secret versions:

```bash
# List versions
kavach secret list

# Compare versions
kavach secret diff --from "abc123" --to "def456"

# Rollback if needed
kavach secret rollback --version "stable_version" --message "Rollback to stable"
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   ```bash
   # Clear credentials and re-login
   kavach logout
   kavach login
   ```

2. **Permission Denied**
   ```bash
   # Check your permissions
   kavach org list
   kavach group list
   ```

3. **Provider Push Failed**
   ```bash
   # Check provider configuration
   kavach provider show --provider github
   
   # Reconfigure if needed
   kavach provider configure github --token "new_token" --owner "org" --repo "repo"
   ```

### Getting Help

- 📖 [CLI Reference](/docs/cli/overview) - Complete command documentation
- 🏗️ [Architecture Guide](/docs/architecture/overview) - System design details
- 🔒 [Security Guide](/docs/security/overview) - Security best practices
- 🐛 [Issues](https://github.com/Gkemhcs/kavach-docs/issues) - Report problems

## Next Steps

Now that you've completed the quick start:

1. **Explore Advanced Features**: [Multi-cloud setup](/docs/guides/multi-cloud)
2. **Set Up CI/CD**: [CI/CD integration](/docs/guides/ci-cd)
3. **Security Hardening**: [Security best practices](/docs/security/overview)
4. **Team Management**: [User and group management](/docs/cli/overview#user-group-commands)

---

**Congratulations!** You've successfully set up Kavach and are ready to manage your secrets securely. 🎉 