---
sidebar_position: 3
---

# Secret Group Commands

🔐 Manage secret groups in Kavach - create, list, activate, and delete secret groups.

## Overview

Secret groups are logical containers that organize related secrets within an organization. Each secret group can contain multiple environments (like development, staging, production) and provides a way to manage access control and organization of your secrets.

### Key Concepts

- **Secret groups belong to organizations** and contain environments
- **Each secret group can have multiple environments** with different configurations
- **Secret groups help organize secrets** by project, team, or application
- **Access control can be managed** at the secret group level
- **Secret groups can be activated** to set a default context for commands

### Resource Hierarchy

```
Organization
├── Secret Groups
│   ├── Environments
│   │   └── Secrets
│   └── User Groups
└── User Groups
```

### Available Roles

| Role | Permissions |
|------|-------------|
| **owner** | Full administrative access (create, delete, manage members, grant permissions) |
| **admin** | Administrative access (manage resources and members, but cannot delete the resource they were granted admin on) |
| **editor** | Write access (modify resources, but cannot assign permissions to others) |
| **viewer** | Read-only access (view resources only) |

### Role Hierarchy

```
owner > admin > editor > viewer
```

**Key Differences:**
- **owner**: Can do anything including delete, grant permissions, create child resources, and update assigned resources
- **admin**: Can do everything except delete the resource they were granted admin on (e.g., admin on secret group "myapp" cannot delete secret group "myapp")
- **editor**: Has write access but cannot assign permissions to others
- **viewer**: Read-only access only

## Commands

### `kavach group create`

🏗️ Create a new secret group

#### Description

Create a new secret group within the current organization. When you create a secret group, you automatically become its owner with full administrative privileges.

#### Key Features

- **You become the owner** of the created secret group
- **Secret group names must be unique** within the organization
- **Secret groups can contain** multiple environments (dev, staging, prod)
- **You can invite other users** and assign different roles
- **Secret groups help organize secrets** by project, team, or application

#### Usage

```bash
kavach group create <name> [flags]
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | Name of the secret group | Yes |

#### Flags

| Flag | Description | Required | Default |
|------|-------------|----------|---------|
| `--description` | Description of the secret group | No | "" |
| `--organization, -o` | Organization under which to create the secret group | No | Active organization |

#### Examples

```bash
# Create secret group with description
kavach group create myapp --description "My application secrets"

# Create secret group without description
kavach group create backend --description "Backend service secrets"

# Create secret group in specific organization
kavach group create frontend --description "Frontend app" --organization mycompany

# Create secret group without description
kavach group create myapp
```

#### Example Output

```
🎉 Secret group 'myapp' created successfully under organization 'mycompany'.
```

#### Error Handling

The command handles various error scenarios:

- **Not Logged In**: Prompts user to run `kavach login`
- **Backend Unreachable**: Displays helpful message with contact information
- **Organization Not Found**: Indicates the organization doesn't exist
- **Duplicate Secret Group**: Suggests choosing a different name
- **Access Denied**: Shows appropriate error message

#### Notes

- Secret group names should be descriptive and follow your naming conventions
- Once created, you can activate the secret group to set it as default for future commands
- If no organization is specified, uses the active organization

---

### `kavach group list`

📋 List your secret groups

#### Description

List all secret groups in the current organization. This command displays a table of all secret groups within the active organization, showing your role in each secret group and which one is currently active.

#### Output Information

The output includes:
- **Secret Group ID**: Unique identifier for the secret group
- **Secret Group Name**: Human-readable name of the secret group
- **Organization Name**: The organization this secret group belongs to
- **Role**: Your role in the secret group (owner, admin, member, viewer)
- **Active**: Indicates which secret group is currently set as default (🟢)

#### Usage

```bash
kavach group list [flags]
```

#### Flags

| Flag | Description | Required | Default |
|------|-------------|----------|---------|
| `--organization, -o` | Organization under which to list secret groups | No | Active organization |

#### Examples

```bash
# List all secret groups in current organization
kavach group list

# List secret groups in specific organization
kavach group list --organization mycompany

# Show detailed help
kavach group list --help
```

#### Example Output

```
┌─────────────────────────────────────┬─────────────────┬──────────────────┬────────┬────────┐
│ Secret Group Id                     │ Secret Group Name│ Organization Name│ Role   │ Active │
├─────────────────────────────────────┼─────────────────┼──────────────────┼────────┼────────┤
│ 550e8400-e29b-41d4-a716-446655440000│ myapp           │ mycompany        │ owner  │ 🟢     │
│ 550e8400-e29b-41d4-a716-446655440001│ backend         │ mycompany        │ member │        │
└─────────────────────────────────────┴─────────────────┴──────────────────┴────────┴────────┘
```

#### Notes

- The active secret group (marked with 🟢) is used as the default context for other commands
- Use `kavach group activate <name>` to change the active secret group

---

### `kavach group activate`

🔄 Switch to a different secret group

#### Description

Activate a secret group to set it as the default context for future commands. When you activate a secret group, it becomes the default context for all subsequent CLI commands.

#### Key Benefits

- **Reduces the need** to specify `--group` flag in every command
- **Provides a consistent** working context
- **Makes command usage** more convenient
- **Helps avoid accidentally** working in the wrong secret group

#### Usage

```bash
kavach group activate <group_name>
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `group_name` | Name of the secret group to activate | Yes |

#### Examples

```bash
# Set myapp as default secret group
kavach group activate myapp

# Switch to backend secret group
kavach group activate backend

# See which secret group is active
kavach group list
```

#### Example Output

```
✅ Secret group 'myapp' is now active.
```

#### Notes

- You can still override the active secret group by explicitly specifying `--group` flag in individual commands
- The active secret group is used only when no secret group is explicitly provided

---

### `kavach group delete`

🗑️ Delete a secret group

#### Description

Delete a secret group and all its associated resources. This is a destructive operation that removes the secret group, all its environments, and secrets.

#### Usage

```bash
kavach group delete <group_name>
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `group_name` | Name of the secret group to delete | Yes |

#### Examples

```bash
# Delete secret group (with confirmation)
kavach group delete myapp

# Show detailed help
kavach group delete --help
```

#### Confirmation Prompt

When deleting a secret group, you'll see a confirmation prompt:

```
Are you sure you want to delete the secret group 'myapp'?
This will permanently delete the secret group and all its resources.
Type 'yes' to confirm: yes
Secret group 'myapp' deleted successfully.
```

#### Notes

- This operation is **irreversible**
- All resources within the secret group will be permanently deleted
- Only secret group owners can delete secret groups

---

### `kavach group grant`

🔓 Grant permissions to users or groups

#### Description

Grant permissions to users or user groups within a secret group. This allows you to manage access control at the secret group level.

#### Usage

```bash
kavach group grant <secret-group-name> [flags]
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `secret-group-name` | Name of the secret group to grant permissions on | Yes |

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--user, -u` | GitHub username to grant permissions to | Yes* |
| `--group, -g` | User group name to grant permissions to | Yes* |
| `--role, -r` | Role to grant (admin, editor, viewer) | Yes |
| `--org, -o` | Organization name where the secret group exists | Yes |

*One of `--user` or `--group` is required.

#### Examples

```bash
# Grant admin role to user
kavach group grant "myapp" --user "john.doe" --role admin --org "mycompany"

# Grant editor role to user group
kavach group grant "myapp" --group "developers" --role editor --org "mycompany"

# Grant viewer role to user
kavach group grant "backend" --user "sarah" --role viewer --org "startup"
```

#### Available Roles

- **owner**: Full administrative access (create, delete, manage members, grant permissions)
- **admin**: Administrative access (manage resources and members, but cannot delete the resource they were granted admin on)
- **editor**: Write access (modify resources, but cannot assign permissions to others)
- **viewer**: Read-only access (view resources only)

---

### `kavach group revoke`

🚫 Revoke permissions from users or groups

#### Description

Revoke permissions from users or user groups within a secret group. This removes their access to the secret group and its resources.

#### Usage

```bash
kavach group revoke <secret-group-name> [flags]
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `secret-group-name` | Name of the secret group to revoke permissions from | Yes |

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--user, -u` | GitHub username to revoke permissions from | Yes* |
| `--group, -g` | User group name to revoke permissions from | Yes* |
| `--role, -r` | Role to revoke (admin, editor, viewer) | Yes |
| `--org, -o` | Organization name where the secret group exists | Yes |

*One of `--user` or `--group` is required.

#### Examples

```bash
# Revoke admin role from user
kavach group revoke "myapp" --user "john.doe" --role admin --org "mycompany"

# Revoke editor role from user group
kavach group revoke "myapp" --group "developers" --role editor --org "mycompany"

# Revoke viewer role from user
kavach group revoke "backend" --user "sarah" --role viewer --org "startup"
```

## Workflow Examples

### Complete Secret Group Setup

```bash
# 1. Create secret group
kavach group create myapp --description "My application secrets"

# 2. List secret groups
kavach group list

# 3. Activate secret group
kavach group activate myapp

# 4. Grant permissions to team members
kavach group grant "myapp" --user "john@example.com" --role admin --org "mycompany"
kavach group grant "myapp" --user "jane@example.com" --role editor --org "mycompany"

# 5. Create user group and grant permissions
kavach user-group create developers --description "Development team"
kavach group grant "myapp" --group "developers" --role editor --org "mycompany"
```

### Secret Group Management

```bash
# 1. Check current secret group
kavach group list

# 2. Switch to different secret group
kavach group activate backend

# 3. Grant new team member access
kavach group grant "myapp" --user "newdev@company.com" --role editor --org "mycompany"

# 4. Remove access for departed team member
kavach group revoke "myapp" --user "olddev@company.com" --role editor --org "mycompany"
```

### Multi-Secret Group Workflow

```bash
# 1. List all secret groups
kavach group list

# 2. Work in application secret group
kavach group activate myapp
kavach env create prod --description "Production environment"
kavach secret add database-url --value "postgresql://user:pass@localhost:5432/myapp"

# 3. Switch to backend secret group
kavach group activate backend
kavach env create staging --description "Staging environment"
kavach secret add api-key --value "sk-backend-api-key"
```

## Best Practices

### 1. Secret Group Naming

```bash
# Good naming conventions
kavach group create myapp --description "My application secrets"
kavach group create backend --description "Backend service secrets"
kavach group create frontend --description "Frontend application secrets"

# Avoid generic names
kavach group create group --description "Secret group"  # Too generic
kavach group create test --description "Test"  # Too generic
```

### 2. Role Management

```bash
# Grant minimal required permissions
kavach group grant "myapp" --user "viewer@company.com" --role viewer --org "mycompany"
kavach group grant "myapp" --user "developer@company.com" --role editor --org "mycompany"
kavach group grant "myapp" --user "admin@company.com" --role admin --org "mycompany"

# Use user groups for team management
kavach user-group create developers --description "Development team"
kavach group grant "myapp" --group "developers" --role editor --org "mycompany"
```

### 3. Secret Group Organization

```bash
# Create separate secret groups for different purposes
kavach group create production-apps --description "Production applications"
kavach group create development-apps --description "Development applications"
kavach group create client-projects --description "Client-specific projects"
```

### 4. Security Considerations

- **Regular Access Review**: Periodically review and update permissions
- **Principle of Least Privilege**: Grant only necessary permissions
- **User Group Management**: Use groups for easier permission management
- **Audit Trail**: Monitor secret group changes and access

## Use Cases

### Organize by Application

```bash
# Create secret groups for different applications
kavach group create user-service --description "User service secrets"
kavach group create payment-service --description "Payment service secrets"
kavach group create notification-service --description "Notification service secrets"
```

### Organize by Team

```bash
# Create secret groups for different teams
kavach group create dev-team --description "Development team secrets"
kavach group create qa-team --description "QA team secrets"
kavach group create ops-team --description "Operations team secrets"
```

### Organize by Project

```bash
# Create secret groups for different projects
kavach group create project-alpha --description "Alpha project secrets"
kavach group create project-beta --description "Beta project secrets"
kavach group create project-gamma --description "Gamma project secrets"
```

## Troubleshooting

### Common Issues

1. **Secret Group Not Found**
   ```bash
   # Error: Secret group not found
   # Solution: Check secret group name and your access
   kavach group list
   ```

2. **Access Denied**
   ```bash
   # Error: Access denied
   # Solution: Check your role in the secret group
   kavach group list
   ```

3. **Duplicate Secret Group**
   ```bash
   # Error: Secret group already exists
   # Solution: Choose a different name
   kavach group create new-group-name --description "New secret group"
   ```

4. **No Active Organization**
   ```bash
   # Error: No default organization is set
   # Solution: Set active organization
   kavach org activate mycompany
   ```

### Debug Commands

```bash
# Enable debug logging
kavach --debug group list

# Check current configuration
kavach status

# Verify secret group access
kavach group list
```

## Next Steps

After setting up your secret groups:

1. **Create Environments**: [Environment Management](/docs/cli/commands/env)
2. **Manage User Groups**: [User Group Management](/docs/cli/commands/user-group)
3. **Store Secrets**: [Secret Management](/docs/cli/commands/secret)
4. **Configure Providers**: [Provider Integration](/docs/cli/commands/provider) 