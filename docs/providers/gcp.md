---
sidebar_position: 1
---

# GCP Provider Configuration

☁️ Configure Google Cloud Platform (GCP) integration with Kavach for secret synchronization.

## Overview

Kavach can sync secrets to Google Cloud Platform's Secret Manager, providing centralized secret management with enterprise-grade security. This guide covers setting up GCP credentials and configuring the integration.

### What You'll Learn

- **Service Account Setup**: Create and configure GCP service accounts
- **Secret Manager Configuration**: Set up GCP Secret Manager for secret storage
- **Permission Management**: Assign proper IAM roles and permissions
- **CLI Integration**: Configure Kavach to sync with GCP
- **Troubleshooting**: Common issues and solutions

### Prerequisites

- **GCP Project**: Active Google Cloud Platform project
- **Billing Enabled**: GCP billing must be enabled for Secret Manager
- **Admin Access**: Owner or Editor permissions on the GCP project
- **Kavach CLI**: Kavach CLI installed and authenticated

## Method 1: GUI Setup (Recommended for Beginners)

### Step 1: Enable Required APIs

1. **Navigate to Google Cloud Console**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project from the dropdown

2. **Enable Secret Manager API**
   - Go to **APIs & Services** > **Library**
   - Search for "Secret Manager API"
   - Click on **Secret Manager API**
   - Click **Enable**

3. **Enable Cloud Resource Manager API**
   - Search for "Cloud Resource Manager API"
   - Click on **Cloud Resource Manager API**
   - Click **Enable**

### Step 2: Create Service Account

1. **Navigate to IAM & Admin**
   - Go to **IAM & Admin** > **Service Accounts**
   - Click **Create Service Account**

2. **Configure Service Account**
   - **Service account name**: `kavach-secret-sync`
   - **Service account ID**: `kavach-secret-sync` (auto-generated)
   - **Description**: `Service account for Kavach secret synchronization`
   - Click **Create and Continue**

3. **Assign Roles**
   - Click **Select a role**
   - Search for and select the following roles:
     - **Secret Manager Secret Accessor**
     - **Secret Manager Admin** (for creating/updating secrets)
     - **Cloud Resource Manager Project IAM Admin** (for managing permissions)
   - Click **Continue**

4. **Grant Access**
   - **Grant this service account access to project**: Leave unchecked
   - Click **Done**

### Step 3: Create and Download Service Account Key

1. **Generate Key**
   - Find your service account in the list
   - Click the **Actions** menu (three dots)
   - Select **Manage keys**

2. **Add Key**
   - Click **Add Key** > **Create new key**
   - Choose **JSON** format
   - Click **Create**
   - The JSON key file will automatically download

3. **Secure the Key**
   - Store the JSON file securely
   - Never commit it to version control
   - Consider using environment variables or secure storage

### Step 4: Configure Secret Manager

1. **Navigate to Secret Manager**
   - Go to **Security** > **Secret Manager**
   - Click **Enable Secret Manager** if not already enabled

2. **Create Secret**
   - Click **Create Secret**
   - **Name**: `test-secret`
   - **Secret value**: `test-value`
   - Click **Create Secret**

3. **Verify Permissions**
   - Ensure your service account can access the secret
   - Test by viewing the secret details

### Step 5: Configure Kavach

```bash
# Configure GCP provider in Kavach
kavach provider configure gcp \
  --key-file "path/to/service-account.json" \
  --project-id "your-gcp-project-id" \
  --org "your-organization" \
  --group "your-secret-group" \
  --env "your-environment"
```

## Method 2: CLI Setup (Advanced Users)

### Step 1: Install Google Cloud CLI

```bash
# Install gcloud CLI
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Initialize gcloud
gcloud init
```

### Step 2: Enable Required APIs

```bash
# Enable Secret Manager API
gcloud services enable secretmanager.googleapis.com

# Enable Cloud Resource Manager API
gcloud services enable cloudresourcemanager.googleapis.com

# Verify enabled APIs
gcloud services list --enabled --filter="name:secretmanager.googleapis.com"
```

### Step 3: Create Service Account

```bash
# Create service account
gcloud iam service-accounts create kavach-secret-sync \
  --display-name="Kavach Secret Sync" \
  --description="Service account for Kavach secret synchronization"

# Get service account email
SERVICE_ACCOUNT_EMAIL=$(gcloud iam service-accounts list \
  --filter="displayName:Kavach Secret Sync" \
  --format="value(email)")

echo "Service Account Email: $SERVICE_ACCOUNT_EMAIL"
```

### Step 4: Assign IAM Roles

```bash
# Get project ID
PROJECT_ID=$(gcloud config get-value project)

# Assign Secret Manager Admin role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
  --role="roles/secretmanager.admin"

# Assign Cloud Resource Manager Project IAM Admin role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
  --role="roles/resourcemanager.projectIamAdmin"

# Verify roles
gcloud projects get-iam-policy $PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:$SERVICE_ACCOUNT_EMAIL" \
  --format="table(bindings.role)"
```

### Step 5: Create Service Account Key

```bash
# Create and download service account key
gcloud iam service-accounts keys create kavach-service-account.json \
  --iam-account=$SERVICE_ACCOUNT_EMAIL

# Verify key file
cat kavach-service-account.json | jq '.project_id'
```

### Step 6: Test Secret Manager Access

```bash
# Create a test secret
echo -n "test-secret-value" | gcloud secrets create test-secret \
  --data-file=-

# Verify secret creation
gcloud secrets versions access latest --secret="test-secret"

# Clean up test secret
gcloud secrets delete test-secret --quiet
```

### Step 7: Configure Kavach

```bash
# Configure GCP provider
kavach provider configure gcp \
  --key-file "kavach-service-account.json" \
  --project-id "$PROJECT_ID" \
  --org "your-organization" \
  --group "your-secret-group" \
  --env "your-environment"
```

## Configuration Parameters

### Required Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `--key-file` | Path to service account JSON key file | `./kavach-service-account.json` |
| `--project-id` | GCP project ID | `my-gcp-project-123` |
| `--org` | Kavach organization name | `mycompany` |
| `--group` | Kavach secret group name | `myapp` |
| `--env` | Kavach environment name | `production` |

### Optional Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `--description` | Provider description | `GCP Secret Manager integration` |
| `--region` | GCP region for secrets | `us-central1` |

## Testing the Configuration

### Step 1: Verify Provider Setup

```bash
# List configured providers
kavach provider list

# Show GCP provider details
kavach provider show --provider gcp
```

### Step 2: Test Secret Sync

```bash
# Add a test secret to Kavach
kavach secret add --name "gcp-test-secret" --value "test-value"

# Commit the secret
kavach secret commit --message "Add GCP test secret"

# Sync to GCP
kavach secret sync --provider gcp

# Verify in GCP Console
gcloud secrets list --filter="name:gcp-test-secret"
```

## Security Best Practices

### Service Account Security

1. **Principle of Least Privilege**
   - Only assign necessary roles
   - Regularly review and audit permissions
   - Use custom roles for specific requirements

2. **Key Management**
   - Rotate service account keys regularly
   - Store keys securely (not in version control)
   - Use environment variables or secret management

3. **Access Control**
   - Limit who can access service account keys
   - Use IAM conditions for additional restrictions
   - Monitor service account usage

### Secret Management

1. **Naming Conventions**
   - Use consistent naming patterns
   - Include environment prefixes
   - Avoid sensitive information in names

2. **Version Control**
   - Enable secret versioning
   - Set up automatic rotation policies
   - Monitor secret access patterns

## Troubleshooting

### Common Issues

#### 1. "Permission Denied" Errors

```bash
# Check service account permissions
gcloud projects get-iam-policy $PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:$SERVICE_ACCOUNT_EMAIL"

# Verify API is enabled
gcloud services list --enabled --filter="name:secretmanager.googleapis.com"
```

#### 2. "API Not Enabled" Errors

```bash
# Enable Secret Manager API
gcloud services enable secretmanager.googleapis.com

# Wait for API to be fully enabled
sleep 30
```

#### 3. "Invalid Key File" Errors

```bash
# Verify key file format
cat kavach-service-account.json | jq '.type'

# Check key file permissions
ls -la kavach-service-account.json

# Regenerate key if needed
gcloud iam service-accounts keys create new-key.json \
  --iam-account=$SERVICE_ACCOUNT_EMAIL
```

#### 4. "Project Not Found" Errors

```bash
# Verify project ID
gcloud config get-value project

# List accessible projects
gcloud projects list

# Set correct project
gcloud config set project YOUR_PROJECT_ID
```

### Debug Commands

```bash
# Test GCP authentication
gcloud auth list

# Test service account access
gcloud auth activate-service-account --key-file=kavach-service-account.json

# Test Secret Manager access
gcloud secrets list --limit=5

# Check Kavach provider status
kavach provider show --provider gcp
```

## Advanced Configuration

### Custom IAM Roles

For enhanced security, create custom IAM roles with minimal permissions:

```bash
# Create custom role definition
cat > kavach-secret-role.yaml << EOF
title: "Kavach Secret Manager Role"
description: "Custom role for Kavach secret synchronization"
stage: "GA"
includedPermissions:
- secretmanager.secrets.create
- secretmanager.secrets.delete
- secretmanager.secrets.get
- secretmanager.secrets.list
- secretmanager.secrets.update
- secretmanager.versions.add
- secretmanager.versions.access
- secretmanager.versions.destroy
- secretmanager.versions.disable
- secretmanager.versions.enable
- secretmanager.versions.get
- secretmanager.versions.list
EOF

# Create the custom role
gcloud iam roles create kavachSecretManager \
  --project=$PROJECT_ID \
  --file=kavach-secret-role.yaml

# Assign custom role to service account
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
  --role="projects/$PROJECT_ID/roles/kavachSecretManager"
```

### Environment-Specific Configuration

```bash
# Development environment
kavach provider configure gcp \
  --key-file "dev-service-account.json" \
  --project-id "my-project-dev" \
  --org "mycompany" \
  --group "myapp" \
  --env "development"

# Production environment
kavach provider configure gcp \
  --key-file "prod-service-account.json" \
  --project-id "my-project-prod" \
  --org "mycompany" \
  --group "myapp" \
  --env "production"
```

## Next Steps

After configuring GCP integration:

1. **Test Secret Sync**: Verify secrets are properly synced to GCP
2. **Set Up Monitoring**: Configure alerts for sync failures
3. **Implement Rotation**: Set up automatic secret rotation
4. **Document Procedures**: Create runbooks for your team
5. **Configure Azure**: [Azure Provider Configuration](./azure)

## Support

If you encounter issues:

- **GCP Documentation**: [Secret Manager Documentation](https://cloud.google.com/secret-manager/docs)
- **Kavach Issues**: [GitHub Issues](https://github.com/Gkemhcs/kavach-docs/issues)
- **Community Support**: [Discord Community](https://discord.gg/kavach) 