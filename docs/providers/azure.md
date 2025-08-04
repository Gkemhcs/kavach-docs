---
sidebar_position: 2
---

# Azure Provider Configuration

☁️ Configure Microsoft Azure integration with Kavach for secret synchronization.

## Overview

Kavach can sync secrets to Azure Key Vault, providing centralized secret management with enterprise-grade security. This guide covers setting up Azure Service Principal credentials and configuring the integration.

### What You'll Learn

- **Service Principal Setup**: Create and configure Azure Service Principals
- **Key Vault Configuration**: Set up Azure Key Vault for secret storage
- **Permission Management**: Assign proper RBAC roles and permissions
- **CLI Integration**: Configure Kavach to sync with Azure
- **Troubleshooting**: Common issues and solutions

### Prerequisites

- **Azure Subscription**: Active Microsoft Azure subscription
- **Key Vault**: Azure Key Vault resource (or permission to create one)
- **Admin Access**: Owner or Contributor permissions on the Azure subscription
- **Kavach CLI**: Kavach CLI installed and authenticated

## Method 1: GUI Setup (Recommended for Beginners)

### Step 1: Create Service Principal via Azure Portal

1. **Navigate to Microsoft Entra ID**
   - Go to [Azure Portal](https://portal.azure.com/)
   - Search for "App Registration" in the search bar
   - Click on **App Registration**
   ![Azure App Registration Search](/img/azure/app-registration-search.png)
2. **Register New Application**
   - In the left menu, click **App registrations**
   - Click **New registration**
    ![Azure App Registration Page](/img/azure/app-registration-page.png)
   

3. **Configure Application Details**
   - **Name**: `kavach-secret-sp`
   - **Supported account types**: Select **Single tenant**
   - **Redirect URI**: Leave empty (not needed for backend applications)
   - Click **Register**

   ![Azure Create App Registration](/img/azure/create-app-registration.png)



5. **Copy Client ID**
   - Click on kavac-secret-sp service principal
   - Click on Overview Page
   - Click on the **Application (client) ID** to copy it
   - This is your `client_id` for Kavach configuration

   ![Azure Client ID](/img/azure/client-id.png)

### Step 2: Create Client Secret

1. **Navigate to Certificates & Secrets**
   - In the left menu, click **Certificates & secrets**
   - Under **Client secrets**, click **New client secret**
   ![Azure Manage Options](/img/azure/manage-options.png)
   ![Azure Client Secret Page](/img/azure/client-secret-page.png)

2. **Configure Client Secret**
   - **Description**: `Kavach Secret Sync`
   - **Expires**: Choose appropriate expiration (recommend 12-24 months)
   - Click **Add**

   ![Azure Create Client Secret](/img/azure/create-client-secret.png)

3. **Copy Secret Value**
   - **IMPORTANT**: Copy the secret value immediately - it won't be shown again
   - Store this securely - you'll need it for Kavach configuration

   ![Azure Copy Client Secret](/img/azure/copy-client-secret.png)

### Step 2a: Manage Application (Optional)

If you need to manage your application later:

1. **Navigate to App Registrations**
   - Go to **Microsoft Entra ID** → **App registrations**
   - Find your application in the list

2. **Manage Application Options**
   - Click on your application to view details
   - Use the left menu to manage different aspects of your app

   

### Step 3: Create Azure Key Vault (If Not Exists)

If you don't have a Key Vault yet, create one first:

#### Option A: GUI Method (Azure Portal)

1. **Navigate to Create Resource**
   - Go to [Azure Portal](https://portal.azure.com/)
   - Click on **"Create a resource"**

2. **Search for Key Vault**
   - Search for **"Key Vault"** in the search bar
   - Click on **Key Vault** from the results

3. **Configure Key Vault**
   - **Subscription**: Your Azure subscription
   - **Resource Group**: Create or select an existing one (e.g., `kavach-rg`)
   - **Key Vault Name**: e.g., `kavach-keyvault` (must be globally unique)
   - **Region**: Choose a region close to your resources
   - **Pricing tier**: Standard (recommended)

4. **Access Configuration**
   - **Permission model**: Select **"Azure role-based access control (RBAC)"**
   - ⚠️ **Important**: Avoid using the legacy "Vault access policy"
   - **Soft-delete retention period**: 7 days (default)
   - **Purge protection**: Enable (recommended for production)

5. **Create Key Vault**
   - Click **Review + create**
   - Review the settings and click **Create**

#### Option B: CLI Method (Azure CLI)

```bash
# Create resource group (if not exists)
az group create --name kavach-rg --location eastus

# Create Key Vault with RBAC enabled
az keyvault create \
  --name kavach-keyvault \
  --resource-group kavach-rg \
  --location eastus \
  --enable-rbac-authorization true \
  --enable-soft-delete true \
  --soft-delete-retention-in-days 7 \
  --enable-purge-protection true
```

> **Note**: The `--enable-rbac-authorization true` flag is crucial to use Azure RBAC instead of legacy access policies.

### Step 4: Grant Access to Service Principal

#### Option A: GUI Method (Azure Portal)

1. **Navigate to Key Vault Access Control**
   - Go to your Key Vault in Azure Portal
   - Click on **Access control (IAM)** in the left menu

2. **Add Role Assignment**
   - Click **+ Add** → **Add role assignment**

3. **Select Role**
   - Choose one of the following roles:
     - 🔹 **Key Vault Secrets User** → Read-only access to secrets
     - 🔹 **Key Vault Secrets Officer** → Read and write access to secrets (recommended for Kavach)

4. **Assign Access**
   - **Assign access to**: Select **User, group or service principal**
   - **Select**: Search for your Service Principal name (e.g., `kavach-secret-sp`)
   - Click **Review + assign**

#### Option B: CLI Method (Azure CLI)

```bash
# Assign Key Vault Secrets Officer role to Service Principal
az role assignment create \
  --assignee <appId-of-service-principal> \
  --role "Key Vault Secrets Officer" \
  --scope /subscriptions/<subscription-id>/resourceGroups/kavach-rg/providers/Microsoft.KeyVault/vaults/kavach-keyvault
```

Replace:
- `<appId-of-service-principal>` with your Service Principal's **Client ID**
- `<subscription-id>` with your Azure Subscription ID

### Step 5: Verify Key Vault Access

1. **Navigate to Key Vault**
   - Go to [Azure Portal](https://portal.azure.com/)
   - Search for "Key Vaults" in the search bar
   - Click on your Key Vault

   ![Azure Key Vault - Overview](https://via.placeholder.com/800x400/0078d4/ffffff?text=Azure+Key+Vault+-+Overview)

2. **Verify Access Control**
   - In the left menu, click **Access control (IAM)**
   - Verify your Service Principal appears in the role assignments list
   - You should see the **Key Vault Secrets Officer** role assigned

   ![Azure Key Vault - Access Policies](https://via.placeholder.com/800x400/0078d4/ffffff?text=Azure+Key+Vault+-+Access+Policies)

3. **Test Secret Access (Optional)**
   - Go to **Secrets** in the left menu
   - Try to create a test secret to verify permissions
   - Delete the test secret after verification

   ![Azure Key Vault - Secret Permissions](https://via.placeholder.com/800x400/0078d4/ffffff?text=Azure+Key+Vault+-+Secret+Permissions)

### Step 6: Get Subscription ID

1. **Navigate to Subscriptions**
   - Go to [Azure Portal](https://portal.azure.com/)
   - Search for "Subscriptions" in the search bar
   - Click on **Subscriptions**

   ![Azure Subscriptions - Overview](https://via.placeholder.com/800x400/0078d4/ffffff?text=Azure+Subscriptions+-+Overview)

2. **Copy Subscription ID**
   - Click on your subscription
   - Copy the **Subscription ID** from the overview page

   ![Azure Subscription - Details](https://via.placeholder.com/800x400/0078d4/ffffff?text=Azure+Subscription+-+Details)

### Step 7: Configure Kavach

```bash
# Configure Azure provider in Kavach
kavach provider configure azure \
  --client-id "your-client-id" \
  --client-secret "your-client-secret" \
  --tenant-id "your-tenant-id" \
  --subscription-id "your-subscription-id" \
  --key-vault-name "your-key-vault-name" \
  --org "your-organization" \
  --group "your-secret-group" \
  --env "your-environment"
```

## Method 2: CLI Setup (Advanced Users)

### Step 1: Install Azure CLI

```bash
# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login to Azure
az login
```

### Step 2: Create Service Principal

```bash
# Create service principal with SDK auth
az ad sp create-for-rbac \
  --name "kavach-secret-sp" \
  --sdk-auth \
  --role "Key Vault Secrets Officer"
```

This command outputs JSON similar to:

```json
{
  "clientId": "your-client-id",
  "clientSecret": "your-client-secret",
  "subscriptionId": "your-subscription-id",
  "tenantId": "your-tenant-id",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "activeDirectoryGraphResourceId": "https://graph.windows.net/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/"
}
```

> 🔐 **Save this JSON securely** - it contains all the credentials needed for Kavach configuration.

### Step 3: Create Key Vault (If Not Exists)

```bash
# Create resource group (if not exists)
az group create --name kavach-rg --location eastus

# Create Key Vault with RBAC enabled
az keyvault create \
  --name "your-key-vault-name" \
  --resource-group kavach-rg \
  --location eastus \
  --enable-rbac-authorization true \
  --enable-soft-delete true \
  --soft-delete-retention-in-days 7 \
  --enable-purge-protection true
```

### Step 4: Assign Key Vault Permissions

```bash
# Assign Key Vault Secrets Officer role to Service Principal
az role assignment create \
  --assignee "your-client-id" \
  --role "Key Vault Secrets Officer" \
  --scope /subscriptions/your-subscription-id/resourceGroups/kavach-rg/providers/Microsoft.KeyVault/vaults/your-key-vault-name
```

### Step 5: Test Access

```bash
# Test Key Vault access
az keyvault secret set \
  --vault-name "your-key-vault-name" \
  --name "test-secret" \
  --value "test-value"

# Verify secret creation
az keyvault secret show \
  --vault-name "your-key-vault-name" \
  --name "test-secret"

# Clean up test secret
az keyvault secret delete \
  --vault-name "your-key-vault-name" \
  --name "test-secret"
```

### Step 6: Configure Kavach

```bash
# Configure Azure provider
kavach provider configure azure \
  --client-id "your-client-id" \
  --client-secret "your-client-secret" \
  --tenant-id "your-tenant-id" \
  --subscription-id "your-subscription-id" \
  --key-vault-name "your-key-vault-name" \
  --org "your-organization" \
  --group "your-secret-group" \
  --env "your-environment"
```

## Configuration Parameters

### Required Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `--client-id` | Azure Service Principal client ID | `12345678-1234-1234-1234-123456789012` |
| `--client-secret` | Azure Service Principal client secret | `your-secret-value` |
| `--tenant-id` | Azure tenant ID | `87654321-4321-4321-4321-210987654321` |
| `--subscription-id` | Azure subscription ID | `11111111-2222-3333-4444-555555555555` |
| `--key-vault-name` | Azure Key Vault name | `my-key-vault` |
| `--org` | Kavach organization name | `mycompany` |
| `--group` | Kavach secret group name | `myapp` |
| `--env` | Kavach environment name | `production` |

### Optional Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `--description` | Provider description | `Azure Key Vault integration` |
| `--region` | Azure region for Key Vault | `eastus` |

## Testing the Configuration

### Step 1: Verify Provider Setup

```bash
# List configured providers
kavach provider list

# Show Azure provider details
kavach provider show --provider azure
```

### Step 2: Test Secret Sync

```bash
# Add a test secret to Kavach
kavach secret add --name "azure-test-secret" --value "test-value"

# Commit the secret
kavach secret commit --message "Add Azure test secret"

# Sync to Azure
kavach secret sync --provider azure

# Verify in Azure Portal
az keyvault secret list --vault-name "your-key-vault-name"
```

## Security Best Practices

### Service Principal Security

1. **Principle of Least Privilege**
   - Only assign necessary permissions
   - Regularly review and audit permissions
   - Use custom roles for specific requirements

2. **Secret Management**
   - Rotate client secrets regularly
   - Store secrets securely (not in version control)
   - Use environment variables or secret management

3. **Access Control**
   - Limit who can access service principal credentials
   - Use conditional access policies
   - Monitor service principal usage

### Key Vault Security

1. **Naming Conventions**
   - Use consistent naming patterns
   - Include environment prefixes
   - Avoid sensitive information in names

2. **Access Policies**
   - Enable soft delete and purge protection
   - Set up automatic rotation policies
   - Monitor secret access patterns

## Troubleshooting

### Common Issues

#### 1. "Authentication Failed" Errors

```bash
# Check service principal credentials
az ad sp show --id "your-client-id"

# Verify client secret
az ad sp credential list --id "your-client-id"
```

#### 2. "Access Denied" to Key Vault

```bash
# Check Key Vault access policies
az keyvault show --name "your-key-vault-name" --query "properties.accessPolicies"

# Verify service principal permissions
az keyvault get-policy --name "your-key-vault-name" --spn "your-client-id"
```

#### 3. "Invalid Client Secret" Errors

```bash
# Regenerate client secret
az ad sp credential reset --id "your-client-id"

# Update Kavach configuration with new secret
kavach provider update azure --client-secret "new-secret-value"
```

#### 4. "Subscription Not Found" Errors

```bash
# List accessible subscriptions
az account list --output table

# Set correct subscription
az account set --subscription "your-subscription-id"
```

### Debug Commands

```bash
# Test Azure authentication
az account show

# Test service principal access
az login --service-principal \
  --username "your-client-id" \
  --password "your-client-secret" \
  --tenant "your-tenant-id"

# Test Key Vault access
az keyvault secret list --vault-name "your-key-vault-name" --maxresults 5

# Check Kavach provider status
kavach provider show --provider azure
```

## Advanced Configuration

### Custom RBAC Roles

For enhanced security, create custom RBAC roles with minimal permissions:

```bash
# Create custom role definition
cat > kavach-keyvault-role.json << EOF
{
  "Name": "Kavach Key Vault Secrets Officer",
  "Description": "Custom role for Kavach secret synchronization",
  "Actions": [
    "Microsoft.KeyVault/vaults/secrets/read",
    "Microsoft.KeyVault/vaults/secrets/write",
    "Microsoft.KeyVault/vaults/secrets/delete",
    "Microsoft.KeyVault/vaults/secrets/list"
  ],
  "NotActions": [],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": [
    "/subscriptions/your-subscription-id/resourceGroups/your-resource-group/providers/Microsoft.KeyVault/vaults/your-key-vault-name"
  ]
}
EOF

# Create the custom role
az role definition create --role-definition kavach-keyvault-role.json

# Assign custom role to service principal
az role assignment create \
  --assignee "your-client-id" \
  --role "Kavach Key Vault Secrets Officer" \
  --scope "/subscriptions/your-subscription-id/resourceGroups/your-resource-group/providers/Microsoft.KeyVault/vaults/your-key-vault-name"
```

### Environment-Specific Configuration

```bash
# Development environment
kavach provider configure azure \
  --client-id "dev-client-id" \
  --client-secret "dev-client-secret" \
  --tenant-id "your-tenant-id" \
  --subscription-id "dev-subscription-id" \
  --key-vault-name "dev-key-vault" \
  --org "mycompany" \
  --group "myapp" \
  --env "development"

# Production environment
kavach provider configure azure \
  --client-id "prod-client-id" \
  --client-secret "prod-client-secret" \
  --tenant-id "your-tenant-id" \
  --subscription-id "prod-subscription-id" \
  --key-vault-name "prod-key-vault" \
  --org "mycompany" \
  --group "myapp" \
  --env "production"
```

## Summary of Required Values

You'll need to store these securely (especially in CLI automation):

| Name | Source | Example |
|------|--------|---------|
| `client_id` | App registration → Application (client) ID | `12345678-1234-1234-1234-123456789012` |
| `client_secret` | App registration → Certificates & secrets | `your-secret-value` |
| `tenant_id` | App registration → Directory (tenant) ID | `87654321-4321-4321-4321-210987654321` |
| `subscription_id` | Subscriptions → Subscription ID | `11111111-2222-3333-4444-555555555555` |
| `key_vault_name` | Key Vault → Name | `my-key-vault` |

## Next Steps

After configuring Azure integration:

1. **Test Secret Sync**: Verify secrets are properly synced to Azure Key Vault
2. **Set Up Monitoring**: Configure alerts for sync failures
3. **Implement Rotation**: Set up automatic secret rotation
4. **Document Procedures**: Create runbooks for your team
5. **Configure GCP**: [GCP Provider Configuration](/docs/providers/gcp)

## Support

If you encounter issues:

- **Azure Documentation**: [Key Vault Documentation](https://docs.microsoft.com/en-us/azure/key-vault/)
- **Kavach Issues**: [GitHub Issues](https://github.com/Gkemhcs/kavach-docs/issues)
- **Community Support**: [GitHub Discussions](https://github.com/Gkemhcs/kavach-docs/discussions) 