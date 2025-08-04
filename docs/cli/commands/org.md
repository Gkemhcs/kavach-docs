---
sidebar_position: 2
---

# Organization Commands

🏢 Manage organizations in Kavach - create, list, activate, and delete organizations.

## Overview

Organizations are the top-level containers in Kavach that group related resources together. Each organization can contain multiple secret groups, environments, and user groups. Organizations help you organize your secrets and manage access control at a high level.

### Key Concepts

- **Organizations are the root containers** for all Kavach resources
- **Each organization can have multiple members** with different roles
- **Organizations can be activated** to set a default context for commands
- **All resources** (secret groups, environments) belong to an organization

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
- **admin**: Can do everything except delete the resource they were granted admin on (e.g., admin on org "apple" cannot delete org "apple")
- **editor**: Has write access but cannot assign permissions to others
- **viewer**: Read-only access only

## Commands

### `kavach org create`

🏗️ Create a new organization

#### Description

Create a new organization in Kavach. When you create an organization, you automatically become its owner with full administrative privileges.

#### Key Features

- **You become the owner** of the created organization
- **Organization names must be unique** across Kavach
- **Organizations can contain** multiple secret groups and environments
- **You can invite other users** and assign different roles

#### Usage

```bash
kavach org create <name> [flags]
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | Name of the organization | Yes |

#### Flags

| Flag | Description | Required | Default |
|------|-------------|----------|---------|
| `--description` | Description of the organization | No | "" |

#### Examples

```bash
# Create organization with description
kavach org create mycompany --description "My company organization"

# Create organization without description
kavach org create project-alpha --description "Alpha project organization"

# Create organization without description
kavach org create mycompany
```

#### Example Output

```
🎉 Organization 'mycompany' created successfully!
```

#### Error Handling

The command handles various error scenarios:

- **Backend Unreachable**: Displays helpful message with contact information
- **Not Logged In**: Prompts user to run `kavach login`
- **Duplicate Organization**: Suggests choosing a different name
- **Access Denied**: Shows appropriate error message

#### Notes

- Organization names should be descriptive and follow your naming conventions
- Once created, you can activate the organization to set it as default for future commands

---

### `kavach org list`

📋 List your organizations

#### Description

List all organizations you have access to in Kavach. This command displays a table of all organizations where you are a member, showing your role in each organization and which one is currently active.

#### Output Information

The output includes:
- **Organization ID**: Unique identifier for the organization
- **Organization Name**: Human-readable name of the organization
- **Role**: Your role in the organization (owner, admin, member, viewer)
- **Active**: Indicates which organization is currently set as default (🟢)

#### Usage

```bash
kavach org list
```

#### Examples

```bash
# List all accessible organizations
kavach org list

# Show detailed help
kavach org list --help
```

#### Example Output

```
┌─────────────────────────────────────┬─────────────┬────────┬────────┐
│ Org Id                              │ Org Name    │ Role   │ Active │
├─────────────────────────────────────┼─────────────┼────────┼────────┤
│ 550e8400-e29b-41d4-a716-446655440000│ mycompany   │ owner  │ 🟢     │
│ 550e8400-e29b-41d4-a716-446655440001│ project-alpha│ member │        │
└─────────────────────────────────────┴─────────────┴────────┴────────┘
```

#### Notes

- The active organization (marked with 🟢) is used as the default context for other commands
- Use `kavach org activate <name>` to change the active organization

---

### `kavach org activate`

🔄 Switch to a different organization

#### Description

Activate an organization to set it as the default context for future commands. When you activate an organization, it becomes the default context for all subsequent CLI commands.

#### Key Benefits

- **Reduces the need** to specify `--org` flag in every command
- **Provides a consistent** working context
- **Makes command usage** more convenient
- **Helps avoid accidentally** working in the wrong organization

#### Activation Process

1. **Verifies you have access** to the specified organization
2. **Sets the organization** as the default context
3. **Saves the configuration** locally
4. **Confirms the activation**

#### Usage

```bash
kavach org activate <org_name>
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `org_name` | Name of the organization to activate | Yes |

#### Examples

```bash
# Set mycompany as default
kavach org activate mycompany

# Switch to project-alpha
kavach org activate project-alpha

# See which org is active
kavach org list
```

#### Example Output

```
✅ Organization 'mycompany' is now active.
```

#### Error Handling

The command handles various error scenarios:

- **Not Logged In**: Prompts user to run `kavach login`
- **Backend Unreachable**: Displays helpful message with contact information
- **Organization Not Found**: Indicates the organization doesn't exist
- **Access Denied**: Shows appropriate error message

#### Notes

- You can still override the active organization by explicitly specifying `--org` flag in individual commands
- The active organization is used only when no organization is explicitly provided

---

### `kavach org delete`

🗑️ Delete an organization

#### Description

Delete an organization and all its associated resources. This is a destructive operation that removes the organization, all its secret groups, environments, and secrets.

#### Usage

```bash
kavach org delete <org_name>
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `org_name` | Name of the organization to delete | Yes |

#### Examples

```bash
# Delete organization (with confirmation)
kavach org delete mycompany

# Show detailed help
kavach org delete --help
```

#### Confirmation Prompt

When deleting an organization, you'll see a confirmation prompt:

```
Are you sure you want to delete the organization 'mycompany'?
This will permanently delete the organization and all its resources.
Type 'yes' to confirm: yes
Organization 'mycompany' deleted successfully.
```

#### Notes

- This operation is **irreversible**
- All resources within the organization will be permanently deleted
- Only organization owners can delete organizations

---

### `kavach org grant`

🔓 Grant permissions to users or groups

#### Description

Grant permissions to users or user groups within an organization. This allows you to manage access control at the organization level.

#### Usage

```bash
kavach org grant <organization-name> [flags]
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `organization-name` | Name of the organization to grant permissions on | Yes |

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--user, -u` | GitHub username to grant permissions to | Yes* |
| `--group, -g` | User group name to grant permissions to | Yes* |
| `--role, -r` | Role to grant (admin, editor, viewer) | Yes |

*One of `--user` or `--group` is required.

#### Examples

```bash
# Grant admin role to user
kavach org grant "mycompany" --user "john.doe" --role admin

# Grant editor role to user group
kavach org grant "mycompany" --group "developers" --role editor

# Grant viewer role to user
kavach org grant "startup" --user "sarah" --role viewer
```

#### Available Roles

- **owner**: Full administrative access (create, delete, manage members, grant permissions)
- **admin**: Administrative access (manage resources and members, but cannot delete the resource they were granted admin on)
- **editor**: Write access (modify resources, but cannot assign permissions to others)
- **viewer**: Read-only access (view resources only)

---

### `kavach org revoke`

🚫 Revoke permissions from users or groups

#### Description

Revoke permissions from users or user groups within an organization. This removes their access to the organization and its resources.

#### Usage

```bash
kavach org revoke <organization-name> [flags]
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `organization-name` | Name of the organization to revoke permissions from | Yes |

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--user, -u` | GitHub username to revoke permissions from | Yes* |
| `--group, -g` | User group name to revoke permissions from | Yes* |
| `--role, -r` | Role to revoke (admin, editor, viewer) | Yes |

*One of `--user` or `--group` is required.

#### Examples

```bash
# Revoke admin role from user
kavach org revoke "mycompany" --user "john.doe" --role admin

# Revoke editor role from user group
kavach org revoke "mycompany" --group "developers" --role editor

# Revoke viewer role from user
kavach org revoke "startup" --user "sarah" --role viewer
```

## Workflow Examples

### Complete Organization Setup

```bash
# 1. Create organization
kavach org create mycompany --description "My company organization"

# 2. List organizations
kavach org list

# 3. Activate organization
kavach org activate mycompany

# 4. Grant permissions to team members
kavach org grant "mycompany" --user "john@example.com" --role admin
kavach org grant "mycompany" --user "jane@example.com" --role editor

# 5. Create user group and grant permissions
kavach user-group create developers --description "Development team"
kavach org grant "mycompany" --group "developers" --role editor
```

### Organization Management

```bash
# 1. Check current organization
kavach org list

# 2. Switch to different organization
kavach org activate project-alpha

# 3. Grant new team member access
kavach org grant "mycompany" --user "newdev@company.com" --role editor

# 4. Remove access for departed team member
kavach org revoke "mycompany" --user "olddev@company.com" --role editor
```

### Multi-Organization Workflow

```bash
# 1. List all organizations
kavach org list

# 2. Work in company organization
kavach org activate mycompany
kavach group create backend --description "Backend services"
kavach env create production --description "Production environment"

# 3. Switch to project organization
kavach org activate project-alpha
kavach group create frontend --description "Frontend application"
kavach env create staging --description "Staging environment"
```

## Best Practices

### 1. Organization Naming

```bash
# Good naming conventions
kavach org create mycompany --description "My company organization"
kavach org create project-alpha --description "Alpha project organization"
kavach org create client-acme --description "ACME client project"

# Avoid generic names
kavach org create org --description "Organization"  # Too generic
kavach org create test --description "Test"  # Too generic
```

### 2. Role Management

```bash
# Grant minimal required permissions
kavach org grant "mycompany" --user "viewer@company.com" --role viewer
kavach org grant "mycompany" --user "developer@company.com" --role editor
kavach org grant "mycompany" --user "admin@company.com" --role admin

# Use user groups for team management
kavach user-group create developers --description "Development team"
kavach org grant "mycompany" --group "developers" --role editor
```

### 3. Organization Structure

```bash
# Create separate organizations for different purposes
kavach org create company-prod --description "Production resources"
kavach org create company-dev --description "Development resources"
kavach org create client-projects --description "Client-specific projects"
```

### 4. Security Considerations

- **Regular Access Review**: Periodically review and update permissions
- **Principle of Least Privilege**: Grant only necessary permissions
- **User Group Management**: Use groups for easier permission management
- **Audit Trail**: Monitor organization changes and access

## Troubleshooting

### Common Issues

1. **Organization Not Found**
   ```bash
   # Error: Organization not found
   # Solution: Check organization name and your access
   kavach org list
   ```

2. **Access Denied**
   ```bash
   # Error: Access denied
   # Solution: Check your role in the organization
   kavach org list
   ```

3. **Duplicate Organization**
   ```bash
   # Error: Organization already exists
   # Solution: Choose a different name
   kavach org create new-org-name --description "New organization"
   ```


## Next Steps

After setting up your organization:

1. **Create Secret Groups**: [Secret Group Management](/docs/cli/commands/group)
2. **Set Up Environments**: [Environment Management](/docs/cli/commands/env)
3. **Manage User Groups**: [User Group Management](/docs/cli/commands/user-group)
4. **Store Secrets**: [Secret Management](/docs/cli/commands/secret) 