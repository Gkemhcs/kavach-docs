---
sidebar_position: 2
---

# Resource Hierarchy & Permissions

🏗️ Understanding Kavach's resource hierarchy and permission system.

## Resource Hierarchy

Kavach follows a hierarchical resource model where permissions cascade down from parent to child resources. Understanding this hierarchy is crucial for effective access control and resource management.

### Complete Resource Hierarchy

```
Organization (org)
├── User Groups
│   └── Users
├── Secret Groups (group)
│   ├── User Groups (with group-specific permissions)
│   ├── Environments (env)
│   │   ├── Secrets
│   │   ├── Providers (github, gcp, azure)
│   │   └── User Groups (with environment-specific permissions)
│   └── Secrets (group-level secrets)
└── Users (organization members)
```

### Resource Relationships

| Resource | Parent | Children | Description |
|----------|--------|----------|-------------|
| **Organization** | None | Secret Groups, User Groups, Users | Top-level container for all resources |
| **Secret Group** | Organization | Environments, Secrets, User Groups | Logical container for related secrets |
| **Environment** | Secret Group | Secrets, Providers | Deployment stage container |
| **User Group** | Organization/Secret Group/Environment | Users | Collection of users with shared permissions |
| **Secret** | Secret Group/Environment | None | Individual secret key-value pairs |
| **Provider** | Environment | None | Cloud provider integration |

## Permission System

### Role Hierarchy

```
owner > admin > editor > viewer
```

### Role Definitions

| Role | Permissions | Limitations |
|------|-------------|-------------|
| **owner** | Full administrative access | None |
| **admin** | Administrative access | Cannot delete the resource they were granted admin on |
| **editor** | Write access | Cannot assign permissions to others |
| **viewer** | Read-only access | Cannot modify anything |

### Detailed Role Permissions

#### Owner
- ✅ **Create, read, update, delete** the assigned resource
- ✅ **Grant and revoke permissions** to other users/groups
- ✅ **Create child resources** (e.g., org owner can create secret groups)
- ✅ **Manage all aspects** of the resource and its children
- ✅ **Delete the resource** they own

#### Admin
- ✅ **Create, read, update** the assigned resource
- ✅ **Grant and revoke permissions** to other users/groups
- ✅ **Create child resources** (e.g., secret group admin can create environments)
- ✅ **Manage all aspects** of the resource and its children
- ❌ **Cannot delete** the resource they were granted admin on

#### Editor
- ✅ **Create, read, update** the assigned resource
- ✅ **Modify child resources** (e.g., environment editor can modify secrets)
- ❌ **Cannot grant or revoke permissions** to others
- ❌ **Cannot delete** the assigned resource

#### Viewer
- ✅ **Read** the assigned resource and its children
- ❌ **Cannot modify** anything
- ❌ **Cannot grant or revoke permissions**
- ❌ **Cannot delete** anything

### Permission Inheritance

Permissions follow the hierarchy with these rules:

1. **Parent permissions don't automatically grant child permissions**
2. **Child permissions don't affect parent permissions**
3. **Explicit permissions override inherited ones**
4. **Higher roles can manage lower roles**

#### Example Permission Scenarios

```bash
# Scenario 1: Organization owner
kavach org grant --user "john@company.com" --role owner --org "mycompany"
# John can: Create/delete secret groups, manage all org resources

# Scenario 2: Secret group admin
kavach group grant --user "jane@company.com" --role admin --group "myapp"
# Jane can: Create/delete environments, manage secrets, but cannot delete "myapp" secret group

# Scenario 3: Environment editor
kavach env grant --user "bob@company.com" --role editor --env "prod"
# Bob can: Add/modify secrets, but cannot grant permissions to others

# Scenario 4: Environment viewer
kavach env grant --user "alice@company.com" --role viewer --env "prod"
# Alice can: View secrets only, no modifications allowed
```

## Quick Tutorial: Getting Started

### 🚀 Step 1: Authentication

```bash
# Login to Kavach
kavach login

# Verify login status
kavach status
```

### 🏢 Step 2: Organization Setup

```bash
# Create your first organization
kavach org create mycompany --description "My company organization"

# List organizations
kavach org list

# Activate the organization
kavach org activate mycompany
```

### 🔐 Step 3: Secret Group Creation

```bash
# Create a secret group for your application
kavach group create myapp --description "My application secrets"

# List secret groups
kavach group list

# Activate the secret group
kavach group activate myapp
```

### 🌍 Step 4: Environment Setup

```bash
# Create environments for different stages
kavach env create dev --description "Development environment"
kavach env create staging --description "Staging environment"
kavach env create prod --description "Production environment"

# List environments
kavach env list

# Activate development environment
kavach env activate dev
```

### 👥 Step 5: Team Management

```bash
# Create a user group for developers
kavach user-group create developers --description "Development team"

# Grant permissions to the user group
kavach group grant "myapp" --group "developers" --role editor --org "mycompany"
kavach env grant dev --group "developers" --role editor --org "mycompany" --secret-group "myapp"

# Add team members
kavach user-group members add --group "developers" --user "john@company.com"
kavach user-group members add --group "developers" --user "jane@company.com"
```

### 🔑 Step 6: Secret Management

```bash
# Add secrets to development environment
kavach secret add --name "database-url" --value "postgresql://dev:pass@localhost:5432/dev"
kavach secret add --name "api-key" --value "sk-dev-api-key"

# Commit the secrets
kavach secret commit --message "Add development secrets"

# List secrets
kavach secret list
```

### ☁️ Step 7: Provider Integration

```bash
# Configure GitHub provider for secret sync
kavach provider configure github \
  --token "ghp_your_github_token" \
  --owner "my-org" \
  --repository "my-repo" \
  --org "mycompany" \
  --group "myapp" \
  --env "development"

# Sync secrets to GitHub
kavach secret sync --provider github
```

### 🔄 Step 8: Workflow Management

```bash
# Switch to production environment
kavach env activate prod

# Add production secrets
kavach secret add --name "database-url" --value "postgresql://prod:pass@prod-db:5432/prod"
kavach secret add --name "api-key" --value "sk-prod-api-key"

# Commit production secrets
kavach secret commit --message "Add production secrets"

# Sync to production providers
kavach secret sync --provider github
```

## Permission Inheritance System

Kavach implements a hierarchical permission system where permissions cascade down through the resource hierarchy. This means users and groups can inherit permissions from higher levels, reducing the need to manage permissions at every level individually.

### How Inheritance Works

```
Organization Level
├── User: ceo@company.com (admin role)
├── Group: executives (viewer role)
└── Direct permissions apply to all resources

Secret Group Level
├── Inherits permissions from Organization
├── User: devops@company.com (editor role)
├── Group: infrastructure (viewer role)
└── Direct permissions apply to all environments in this group

Environment Level
├── Inherits permissions from Organization
├── Inherits permissions from Secret Group
├── User: john@company.com (admin role)
├── Group: developers (editor role)
└── Direct permissions are specific to this environment
```

### Example Inheritance Chain

```bash
# Organization level permissions
kavach org grant "mycompany" --user "ceo@company.com" --role admin

# Secret group inherits organization permissions
# Plus additional direct permissions
kavach group grant "myapp" --user "devops@company.com" --role editor --org "mycompany"

# Environment inherits both organization and secret group permissions
# Plus additional direct permissions
kavach env grant "prod" --user "john@company.com" --role admin --org "mycompany" --group "myapp"
```

### Viewing Inherited Permissions

```bash
# See all permissions including inherited ones
kavach org list-bindings "mycompany"
kavach group list-bindings "myapp" --org "mycompany"
kavach env list-bindings "prod" --org "mycompany" --group "myapp"
```

## Best Practices

### 1. Permission Strategy

```bash
# Use principle of least privilege
kavach env grant --user "viewer@company.com" --role viewer --env "prod"
kavach env grant --user "developer@company.com" --role editor --env "dev"
kavach env grant --user "admin@company.com" --role admin --env "staging"
```

### 2. Resource Organization

```bash
# Organize by application
kavach group create frontend --description "Frontend application"
kavach group create backend --description "Backend services"
kavach group create database --description "Database configurations"

# Organize by team
kavach group create dev-team --description "Development team resources"
kavach group create qa-team --description "QA team resources"
kavach group create ops-team --description "Operations team resources"
```

### 3. Environment Management

```bash
# Consistent environment naming
kavach env create dev --description "Development and testing"
kavach env create staging --description "Pre-production testing"
kavach env create production --description "Live production systems"

# Environment-specific permissions
kavach env grant dev --group "developers" --role editor --org "mycompany" --secret-group "myapp"
kavach env grant staging --group "qa-team" --role editor --org "mycompany" --secret-group "myapp"
kavach env grant prod --group "ops-team" --role admin --org "mycompany" --secret-group "myapp"
```

### 4. Security Considerations

- **Regular Access Review**: Periodically review and update permissions
- **Role Rotation**: Rotate admin roles regularly
- **Activity Monitoring**: Monitor resource changes and access
- **Secret Rotation**: Regularly rotate sensitive secrets

## Common Patterns

### Multi-Environment Application

```bash
# Setup for a typical web application
kavach org create mycompany
kavach group create webapp --description "Web application secrets"

# Create environments
kavach env create dev --description "Development environment"
kavach env create staging --description "Staging environment"
kavach env create prod --description "Production environment"

# Grant team permissions
kavach user-group create developers --description "Development team"
kavach env grant dev --group "developers" --role editor --org "mycompany" --secret-group "webapp"
kavach env grant staging --group "developers" --role viewer --org "mycompany" --secret-group "webapp"
kavach env grant prod --group "developers" --role viewer --org "mycompany" --secret-group "webapp"
```

### Microservices Architecture

```bash
# Create secret groups for each service
kavach group create user-service --description "User service secrets"
kavach group create payment-service --description "Payment service secrets"
kavach group create notification-service --description "Notification service secrets"

# Create environments for each service
kavach env create dev --group "user-service"
kavach env create staging --group "user-service"
kavach env create prod --group "user-service"
```

## Troubleshooting

### Permission Issues

```bash
# Check your current permissions
kavach org list
kavach group list
kavach env list

# Verify specific resource access
kavach secret list --env "prod"
```

### Resource Hierarchy Issues

```bash
# Ensure proper resource creation order
# 1. Organization first
kavach org create mycompany

# 2. Secret group within organization
kavach group create myapp --org "mycompany"

# 3. Environment within secret group
kavach env create prod --group "myapp" --org "mycompany"
```

## Next Steps

After understanding the resource hierarchy:

1. **Set up your organization**: [Organization Management](/docs/cli/commands/org)
2. **Create secret groups**: [Secret Group Management](/docs/cli/commands/group)
3. **Configure environments**: [Environment Management](/docs/cli/commands/env)
4. **Manage secrets**: [Secret Management](/docs/cli/commands/secret)
5. **Integrate providers**: [Provider Management](/docs/cli/commands/provider) 