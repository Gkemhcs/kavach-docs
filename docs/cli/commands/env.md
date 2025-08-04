---
sidebar_position: 4
---

# Environment Commands

🌍 Manage environments in Kavach - create, list, activate, and delete environments.

## Overview

Environments are the containers where your actual secrets are stored and managed. Each environment belongs to a secret group and can have different configurations for different deployment stages (development, staging, production).

### Key Concepts

- **Environments belong to secret groups** and contain actual secrets
- **Each environment can have different provider configurations** (GCP, Azure, GitHub)
- **Environments help separate secrets** by deployment stage or configuration
- **Access control can be managed** at the environment level
- **Environments can be activated** to set a default context for commands

### Common Environment Patterns

- **dev**: For development and testing
- **staging**: For pre-production testing
- **prod**: For live production systems
- **testing**: For automated testing environments
- **qa**: For quality assurance testing

> ⚠️ **Environment Naming Convention**
> 
> Kavach supports only the following environment names:
> - `dev` - Development environment
> - `staging` - Staging environment  
> - `prod` - Production environment
> - `qa` - Quality assurance environment
> - `testing` - Testing environment

### Available Roles

| Role | Permissions |
|------|-------------|
| **owner** | Full administrative access (create, delete, manage members, grant permissions) |
| **admin** | Administrative access (manage secrets and members, but cannot delete the resource they were granted admin on) |
| **editor** | Write access (modify secrets, but cannot assign permissions to others) |
| **viewer** | Read-only access (view secrets only) |

### Role Hierarchy

```
owner > admin > editor > viewer
```

**Key Differences:**
- **owner**: Can do anything including delete, grant permissions, create child resources, and update assigned resources
- **admin**: Can do everything except delete the resource they were granted admin on (e.g., admin on environment "production" cannot delete environment "production")
- **editor**: Has write access but cannot assign permissions to others
- **viewer**: Read-only access only

## Commands

### `kavach env create`

🏗️ Create a new environment

#### Description

Create a new environment within the current secret group. Environments are containers where your actual secrets are stored and managed.

#### Usage

```bash
kavach env create <name> [flags]
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | Name of the environment | Yes |

#### Flags

| Flag | Description | Required | Default |
|------|-------------|----------|---------|
| `--description` | Description of the environment | No | "" |
| `--organization, -o` | Organization under which to create the environment | No | Active organization |
| `--secret-group, -g` | Secret group under which to create the environment | No | Active secret group |

#### Examples

```bash
# Create environment with description
kavach env create prod --description "Production environment"

# Create environment in specific organization and secret group
kavach env create staging --description "Staging environment" --organization mycompany --secret-group myapp

# Create environment without description
kavach env create dev
```

#### Example Output

```
🎉 Environment 'prod' created successfully!
```

#### Notes

- Environment names should be descriptive and follow your naming conventions
- Once created, you can activate the environment to set it as default for future commands
- If no organization or secret group is specified, uses the active ones

---

### `kavach env list`

📋 List your environments

#### Description

List all environments in the current secret group. This command displays a table of all environments within the active secret group.

#### Usage

```bash
kavach env list [flags]
```

#### Flags

| Flag | Description | Required | Default |
|------|-------------|----------|---------|
| `--organization, -o` | Organization under which to list environments | No | Active organization |
| `--secret-group, -g` | Secret group under which to list environments | No | Active secret group |

#### Examples

```bash
# List all environments in current secret group
kavach env list

# List environments in specific organization and secret group
kavach env list --organization mycompany --secret-group myapp
```

---

### `kavach env activate`

🔄 Switch to a different environment

#### Description

Activate an environment to set it as the default context for future commands.

#### Usage

```bash
kavach env activate <env_name>
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `env_name` | Name of the environment to activate | Yes |

#### Examples

```bash
# Set production as default environment
kavach env activate prod

# Switch to development environment
kavach env activate development
```

---

### `kavach env delete`

🗑️ Delete an environment

#### Description

Delete an environment and all its associated secrets. This is a destructive operation.

#### Usage

```bash
kavach env delete <env_name>
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `env_name` | Name of the environment to delete | Yes |

#### Examples

```bash
# Delete environment (with confirmation)
kavach env delete testing
```

---

### `kavach env grant`

🔓 Grant permissions to users or groups

#### Description

Grant permissions to users or user groups within an environment.

#### Usage

```bash
kavach env grant <environment-name> [flags]
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `environment-name` | Name of the environment to grant permissions on | Yes |

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--user, -u` | GitHub username to grant permissions to | Yes* |
| `--group, -g` | User group name to grant permissions to | Yes* |
| `--role, -r` | Role to grant (admin, editor, viewer) | Yes |
| `--org, -o` | Organization name where the environment exists | Yes |
| `--secret-group, -s` | Secret group name containing the environment | Yes |

*One of `--user` or `--group` is required.

#### Examples

```bash
# Grant admin role to user
kavach env grant prod --user "john.doe" --role admin --org "mycompany" --secret-group "myapp"

# Grant editor role to user group
kavach env grant development --group "developers" --role editor --org "mycompany" --secret-group "myapp"

# Grant viewer role to user
kavach env grant staging --user "sarah" --role viewer --org "startup" --secret-group "backend"
```

---

### `kavach env revoke`

🚫 Revoke permissions from users or groups

#### Description

Revoke permissions from users or user groups within an environment.

#### Usage

```bash
kavach env revoke <environment-name> [flags]
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `environment-name` | Name of the environment to revoke permissions from | Yes |

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--user, -u` | GitHub username to revoke permissions from | Yes* |
| `--group, -g` | User group name to revoke permissions from | Yes* |
| `--role, -r` | Role to revoke (admin, editor, viewer) | Yes |
| `--org, -o` | Organization name where the environment exists | Yes |
| `--secret-group, -s` | Secret group name containing the environment | Yes |

*One of `--user` or `--group` is required.

#### Examples

```bash
# Revoke admin role from user
kavach env revoke prod --user "john.doe" --role admin --org "mycompany" --secret-group "myapp"

# Revoke editor role from user group
kavach env revoke development --group "developers" --role editor --org "mycompany" --secret-group "myapp"

# Revoke viewer role from user
kavach env revoke staging --user "sarah" --role viewer --org "startup" --secret-group "backend"
```

## Workflow Examples

### Complete Environment Setup

```bash
# 1. Create environments
kavach env create development --description "Development environment"
kavach env create staging --description "Staging environment"
kavach env create production --description "Production environment"

# 2. List environments
kavach env list

# 3. Activate development environment
kavach env activate development

# 4. Grant permissions to team members
kavach env grant development --user "john@example.com" --role admin --org "mycompany" --secret-group "myapp"
kavach env grant development --user "jane@example.com" --role editor --org "mycompany" --secret-group "myapp"
```

### Multi-Environment Workflow

```bash
# 1. Work in development environment
kavach env activate development
kavach secret add --name "database-url" --value "postgresql://dev:pass@localhost:5432/dev"
kavach secret commit --message "Add development secrets"

# 2. Switch to production environment
kavach env activate production
kavach secret add --name "database-url" --value "postgresql://prod:pass@prod-db:5432/prod"
kavach secret commit --message "Add production secrets"
```

## Best Practices

### 1. Environment Naming

```bash
# Good naming conventions
kavach env create development --description "Development environment"
kavach env create staging --description "Staging environment"
kavach env create production --description "Production environment"

# Avoid generic names
kavach env create env --description "Environment"  # Too generic
```

### 2. Role Management

```bash
# Grant minimal required permissions
kavach env grant production --user "viewer@company.com" --role viewer --org "mycompany" --secret-group "myapp"
kavach env grant development --user "developer@company.com" --role editor --org "mycompany" --secret-group "myapp"
kavach env grant staging --user "admin@company.com" --role admin --org "mycompany" --secret-group "myapp"
```

## Next Steps

After setting up your environments:

1. **Store Secrets**: [Secret Management](/docs/cli/commands/secret)
2. **Configure Providers**: [Provider Integration](/docs/cli/commands/provider)
3. **Manage User Groups**: [User Group Management](/docs/cli/commands/user-group) 