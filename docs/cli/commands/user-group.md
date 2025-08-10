---
sidebar_position: 6
title: "User Group Commands - Kavach CLI Reference"
description: "Manage user groups in Kavach using CLI commands. Create, list, delete, and manage group members for efficient access control."
keywords: ["kavach user-group", "user group commands", "kavach cli", "group management", "access control", "rbac", "kavach docs", "team management"]
---

# User Group Commands

👥 Manage user groups in Kavach - create, list, delete, and manage group members.

## Overview

User groups are collections of users that can be assigned permissions together. Instead of managing permissions for each user individually, you can create user groups and assign permissions to the entire group at once.

### Key Concepts

- **User groups belong to organizations** and contain multiple users
- **Group-based permissions** simplify access control management
- **Users can belong to multiple groups** for different permission sets
- **Group permissions work alongside individual permissions**
- **Efficient team management** for large organizations

### Available Roles

| Role | Permissions |
|------|-------------|
| **owner** | Full administrative access (create, delete, manage members, grant permissions) |
| **admin** | Administrative access (manage members and permissions, but cannot delete the resource they were granted admin on) |
| **editor** | Write access (modify resources, but cannot assign permissions to others) |
| **viewer** | Read-only access (view group only) |

## Commands

### `kavach user-group create`

🏗️ Create a new user group

#### Usage

```bash
kavach user-group create <name> [flags]
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | Name of the user group | Yes |

#### Flags

| Flag | Description | Required | Default |
|------|-------------|----------|---------|
| `--description` | Description of the user group | No | "" |
| `--organization, -o` | Organization under which to create the user group | No | Active organization |

#### Examples

```bash
# Create user group with description
kavach user-group create developers --description "Development team"

# Create user group without description
kavach user-group create qa-team --description "QA team"

# Create user group in specific organization
kavach user-group create ops-team --description "Operations team" --organization mycompany
```

#### Example Output

```
🎉 User group 'developers' created successfully under organization 'mycompany'.
```

---

### `kavach user-group list`

📋 List your user groups

#### Usage

```bash
kavach user-group list [flags]
```

#### Flags

| Flag | Description | Required | Default |
|------|-------------|----------|---------|
| `--organization, -o` | Organization under which to list user groups | No | Active organization |

#### Examples

```bash
# List all user groups in current organization
kavach user-group list

# List user groups in specific organization
kavach user-group list --organization mycompany
```

#### Example Output

```
┌─────────────────────────────────────┬─────────────────┬─────────────────────┬──────────────────┐
│ User Group Id                       │ User Group Name │ Description         │ Organization Name│
├─────────────────────────────────────┼─────────────────┼─────────────────────┼──────────────────┤
│ 550e8400-e29b-41d4-a716-446655440000│ developers      │ Development team    │ mycompany        │
│ 550e8400-e29b-41d4-a716-446655440001│ qa-team         │ QA team             │ mycompany        │
└─────────────────────────────────────┴─────────────────┴─────────────────────┴──────────────────┘
```

---

### `kavach user-group delete`

🗑️ Delete a user group by name

#### Usage

```bash
kavach user-group delete <name> [flags]
```

#### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `name` | Name of the user group to delete | Yes |

#### Flags

| Flag | Description | Required | Default |
|------|-------------|----------|---------|
| `--organization, -o` | Organization under which to delete the user group | No | Active organization |

#### Examples

```bash
# Delete user group (with confirmation)
kavach user-group delete qa-team

# Delete user group in specific organization
kavach user-group delete ops-team --organization mycompany
```

#### Confirmation Prompt

When deleting a user group, you'll see a confirmation prompt:

```
are you sure to delete user group qa-team under org mycompany if yes click on proceed otherwise cancel
UserGroup 'qa-team' deleted successfully.
```

---

### `kavach user-group members add`

➕ Add a user to a user group

#### Usage

```bash
kavach user-group members add [flags]
```

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--user-group, -g` | Name of the user group | Yes |
| `--user, -u` | Name of the user to add | Yes |
| `--organization, -o` | Organization under which the user group exists | No |

#### Examples

```bash
# Add user to user group
kavach user-group members add --user-group developers --user john

# Add user to user group in specific organization
kavach user-group members add --user-group qa-team --user sarah --organization mycompany

# Add user to admin group
kavach user-group members add --user-group admins --user mike
```

#### Example Output

```
🎉 Member 'john' added successfully to user group 'developers'.
```

---

### `kavach user-group members list`

📋 List members of a user group

#### Usage

```bash
kavach user-group members list [flags]
```

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--user-group, -g` | Name of the user group | Yes |
| `--organization, -o` | Organization under which the user group exists | No |

#### Examples

```bash
# List members of a user group
kavach user-group members list --user-group developers

# List members in specific organization
kavach user-group members list --user-group qa-team --organization mycompany

# List members of admin group
kavach user-group members list --user-group admins
```

#### Example Output

```
┌─────────────────────┬────────────┬─────────────────┐
│ UserEmail           │ UserName   │ UserGroupName   │
├─────────────────────┼────────────┼─────────────────┤
│ john@company.com    │ John Doe   │ developers      │
│ jane@company.com    │ Jane Smith │ developers      │
│ mike@company.com    │ Mike Brown │ developers      │
└─────────────────────┴────────────┴─────────────────┘
```

---

### `kavach user-group members remove`

➖ Remove a user from a user group

#### Usage

```bash
kavach user-group members remove [flags]
```

#### Flags

| Flag | Description | Required |
|------|-------------|----------|
| `--user-group, -g` | Name of the user group | Yes |
| `--user, -u` | Name of the user to remove | Yes |
| `--organization, -o` | Organization under which the user group exists | No |

#### Examples

```bash
# Remove user from user group
kavach user-group members remove --user-group developers --user john

# Remove user from user group in specific organization
kavach user-group members remove --user-group qa-team --user sarah --organization mycompany

# Remove user from admin group
kavach user-group members remove --user-group admins --user mike
```

#### Example Output

```
🎉 Member 'john' removed successfully from user group 'developers'.
```

## Workflow Examples

### Complete User Group Setup

```bash
# 1. Create user groups
kavach user-group create developers --description "Development team"
kavach user-group create qa-team --description "QA team"
kavach user-group create ops-team --description "Operations team"

# 2. List user groups
kavach user-group list

# 3. Add team members
kavach user-group members add --user-group developers --user "john@company.com"
kavach user-group members add --user-group developers --user "jane@company.com"
kavach user-group members add --user-group qa-team --user "sarah@company.com"

# 4. List members
kavach user-group members list --user-group developers
```

### Permission Management

```bash
# 1. Create role-based user groups
kavach user-group create admins --description "Administrators"
kavach user-group create editors --description "Content editors"
kavach user-group create viewers --description "Read-only users"

# 2. Add users to appropriate groups
kavach user-group members add --user-group admins --user "admin@company.com"
kavach user-group members add --user-group editors --user "editor@company.com"
kavach user-group members add --user-group viewers --user "viewer@company.com"

# 3. Grant group permissions to resources
kavach group grant --group "admins" --role admin --group "myapp"
kavach env grant --group "editors" --role editor --env "development"
kavach env grant --group "viewers" --role viewer --env "production"
```

## Best Practices

### 1. User Group Naming

```bash
# Good naming conventions
kavach user-group create developers --description "Development team"
kavach user-group create qa-team --description "QA team"
kavach user-group create ops-team --description "Operations team"

# Avoid generic names
kavach user-group create group --description "User group"  # Too generic
```

### 2. Role-Based Organization

```bash
# Create groups by role
kavach user-group create admins --description "System administrators"
kavach user-group create developers --description "Software developers"
kavach user-group create qa-engineers --description "Quality assurance engineers"
kavach user-group create devops --description "DevOps engineers"
```

## Next Steps

After setting up your user groups:

1. **Grant Permissions**: [Organization Management](/docs/cli/commands/org)
2. **Manage Secret Groups**: [Secret Group Management](/docs/cli/commands/group)
3. **Configure Environments**: [Environment Management](/docs/cli/commands/env)
4. **Set Up Providers**: [Provider Integration](/docs/cli/commands/provider) 