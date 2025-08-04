---
sidebar_position: 1
---

# Role-Based Access Control (RBAC) in Kavach

🔐 Understanding Kavach's hierarchical RBAC system for fine-grained access control.

## Overview

Kavach implements a hierarchical Role-Based Access Control (RBAC) system using Casbin to provide granular access control across organizations, secret groups, environments, and their associated resources. This system ensures that users can only access and modify resources they have explicit permissions for.

### Key Concepts

- **Hierarchical Resources**: Permissions cascade down the resource hierarchy
- **Four Core Roles**: Owner, Admin, Editor, and Viewer with distinct capabilities
- **Implicit Ownership**: Resource creators automatically become owners
- **Explicit Role Assignment**: Only Admin, Editor, and Viewer roles can be explicitly granted
- **Action-Based Permissions**: Different actions require different minimum role levels

## Resource Hierarchy

Kavach follows a strict hierarchical structure where permissions cascade from parent to child resources:

```
Organizations
├── Secret Groups
│   ├── Environments
│   │   ├── Secrets
│   │   └── Providers
└── User Groups
```

### Resource Types and Permissions

| Resource Type | Permission Level | Description |
|---------------|------------------|-------------|
| **Organizations** | Organization | Top-level resource that contains all other resources |
| **Secret Groups** | Organization, SecretGroup | Logical grouping of related secrets and environments |
| **Environments** | Organization, SecretGroup, Environment | Specific deployment environments (dev, staging, prod) |
| **Secrets** | Organization, SecretGroup, Environment | Individual secret values (inherits from Environment) |
| **Providers** | Organization, SecretGroup, Environment | External service integrations (inherits from Environment) |
| **User Groups** | Organization | Collections of users with shared permissions |

> **Important**: Permissions cannot be granted directly on Secrets or Providers. Access to these resources is controlled through their parent resources (Environment, SecretGroup, or Organization). User Groups are organizational resources used for grouping users when granting permissions.

## Core Roles

Kavach defines four distinct roles with specific capabilities and limitations:

### 1. Owner Role

**Default Assignment**: Automatically assigned to the creator of any resource.

**Characteristics**:
- ✅ **Full Control**: Complete access to all actions on the resource
- ✅ **Resource Deletion**: Can delete the resource they created
- ✅ **Permission Management**: Can grant/revoke permissions to other users
- ✅ **Child Resource Management**: Full control over all child resources
- ❌ **Explicit Assignment**: Cannot be explicitly granted to other users
- ❌ **Transfer**: Cannot transfer ownership to another user

**Use Cases**:
- Resource creators who need complete control
- System administrators managing critical resources
- Initial setup and configuration

### 2. Admin Role

**Explicit Assignment**: Can be explicitly granted to users or groups.

**Characteristics**:
- ✅ **Grant/Revoke Permissions**: Can assign roles to other users
- ✅ **Full Resource Access**: Read, write, create, update operations
- ✅ **Child Resource Management**: Can manage all child resources
- ✅ **Provider Configuration**: Can manage provider configurations
- ❌ **Resource Deletion**: Cannot delete resources they have been granted access to
- ❌ **Ownership Transfer**: Cannot transfer ownership

**Use Cases**:
- Team leads managing their team's resources
- DevOps engineers managing infrastructure
- Security administrators

### 3. Editor Role

**Explicit Assignment**: Can be explicitly granted to users or groups.

**Characteristics**:
- ✅ **Read/Write Access**: Can read and modify existing resources
- ✅ **Resource Updates**: Can update the resources they have access to (org, secret group, environment)
- ✅ **Child Resource Creation**: Can create new child resources
- ✅ **Secret Management**: Can create, update, and delete secrets
- ✅ **Provider Sync**: Can sync secrets to external providers
- ❌ **Permission Management**: Cannot grant/revoke permissions
- ❌ **Provider Configuration**: Cannot create, update, or delete provider configurations

**Use Cases**:
- Developers managing application secrets
- CI/CD pipelines requiring secret access
- Application deployment processes

### 4. Viewer Role

**Explicit Assignment**: Can be explicitly granted to users or groups.

**Characteristics**:
- ✅ **Read-Only Access**: Can view resources and their metadata
- ✅ **Secret Reading**: Can read secret values (but not modify)
- ❌ **Provider Access**: Cannot view provider configurations
- ❌ **Modifications**: Cannot create, update, or delete resources
- ❌ **Permission Management**: Cannot manage permissions

**Use Cases**:
- Auditors reviewing security configurations
- Support teams troubleshooting issues
- Read-only monitoring systems

## Permission Matrix

### Organization Level Actions

| Action | Owner | Admin | Editor | Viewer |
|--------|-------|-------|--------|--------|
| **Create Secret Group** | ✅ | ✅ | ✅ | ❌ |
| **Create User Group** | ✅ | ✅ | ❌ | ❌ |
| **Delete Organization** | ✅ | ❌ | ❌ | ❌ |
| **Grant Permissions** | ✅ | ✅ | ❌ | ❌ |
| **View Organization** | ✅ | ✅ | ✅ | ✅ |
| **Update Organization** | ✅ | ✅ | ✅ | ❌ |

### Secret Group Level Actions

| Action | Owner | Admin | Editor | Viewer |
|--------|-------|-------|--------|--------|
| **Create Environment** | ✅ | ✅ | ✅ | ❌ |
| **Delete Secret Group** | ✅ | ❌ | ❌ | ❌ |
| **Grant Permissions** | ✅ | ✅ | ❌ | ❌ |
| **View Secret Group** | ✅ | ✅ | ✅ | ✅ |
| **Update Secret Group** | ✅ | ✅ | ✅ | ❌ |

### Environment Level Actions

| Action | Owner | Admin | Editor | Viewer |
|--------|-------|-------|--------|--------|
| **Create Secret** | ✅ | ✅ | ✅ | ❌ |
| **Create Provider** | ✅ | ✅ | ✅ | ❌ |
| **Delete Environment** | ✅ | ❌ | ❌ | ❌ |
| **Grant Permissions** | ✅ | ✅ | ❌ | ❌ |
| **View Environment** | ✅ | ✅ | ✅ | ✅ |
| **Update Environment** | ✅ | ✅ | ✅ | ❌ |

### Secret Level Actions

| Action | Owner | Admin | Editor | Viewer |
|--------|-------|-------|--------|--------|
| **Create Secret** | ✅ | ✅ | ✅ | ❌ |
| **Read Secret** | ✅ | ✅ | ✅ | ✅ |
| **Update Secret** | ✅ | ✅ | ✅ | ❌ |
| **Delete Secret** | ✅ | ✅ | ✅ | ❌ |
| **Sync Secret** | ✅ | ✅ | ✅ | ❌ |

### Provider Level Actions

| Action | Owner | Admin | Editor | Viewer |
|--------|-------|-------|--------|--------|
| **View Provider Config** | ✅ | ✅ | ✅ | ❌ |
| **Create Provider** | ✅ | ✅ | ❌ | ❌ |
| **Update Provider** | ✅ | ✅ | ❌ | ❌ |
| **Delete Provider** | ✅ | ✅ | ❌ | ❌ |

## Hierarchical Permission Inheritance

### Permission Cascading

Permissions granted at higher levels automatically cascade to all child resources:

```
Organization (Admin) 
├── Secret Group (inherits Admin)
│   ├── Environment (inherits Admin)
│   │   ├── Secrets (inherits Admin)
│   │   └── Providers (inherits Admin)
└── User Groups (inherits Admin)
```

### Example Scenarios

#### Scenario 1: Organization-Level Admin
```yaml
User: alice@company.com
Role: Admin
Resource: Organization (my-company)
```

**Result**: Alice can:
- Manage all secret groups in the organization
- Create and manage user groups
- Create new environments in any secret group
- Manage all secrets and providers
- Grant permissions to other users at any level
- Cannot delete the organization

#### Scenario 2: Secret Group-Level Editor
```yaml
User: bob@company.com
Role: Editor
Resource: Secret Group (production-apps)
```

**Result**: Bob can:
- Create environments within the production-apps secret group
- Manage secrets and providers in those environments
- Sync secrets to external providers
- Cannot grant permissions to other users
- Cannot delete the secret group

#### Scenario 3: Environment-Level Viewer
```yaml
User: charlie@company.com
Role: Viewer
Resource: Environment (staging)
```

**Result**: Charlie can:
- View all secrets in the staging environment
- Cannot view provider configurations
- Cannot modify any resources
- Cannot access other environments

## Role Assignment Rules

### Explicit Role Assignment

Only three roles can be explicitly assigned:
- **Admin**: Can be granted by Owner or Admin
- **Editor**: Can be granted by Owner or Admin
- **Viewer**: Can be granted by Owner or Admin

### Implicit Role Assignment

- **Owner**: Automatically assigned to resource creator
- Cannot be explicitly granted or transferred
- Recorded in role bindings with resource type and ID

### Role Assignment Hierarchy

```
Owner (implicit)
├── Admin (explicit)
│   ├── Editor (explicit)
│   └── Viewer (explicit)
└── Editor (explicit)
    └── Viewer (explicit)
```

## Access Control Implementation

### Casbin Hierarchical RBAC Model

Kavach uses Casbin's hierarchical RBAC model with SQLx adapter for persistent storage and structured resource naming with grouped policies.

#### Policy Model Configuration

```ini
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub, r.obj) && r.obj == p.obj && r.act == p.act
```

#### Storage Configuration

Kavach uses Casbin with SQLx adapter for persistent policy storage:

```go
// Casbin with SQLx adapter configuration
adapter, err := sqlxadapter.NewAdapter(driverName, dataSourceName, tableName)
if err != nil {
    log.Fatal(err)
}

enforcer, err := casbin.NewEnforcer(modelPath, adapter)
if err != nil {
    log.Fatal(err)
}
```

**Database Schema:**
```sql
-- Casbin policy table
CREATE TABLE casbin_rule (
    id SERIAL PRIMARY KEY,
    ptype VARCHAR(10),
    v0 VARCHAR(256),
    v1 VARCHAR(256),
    v2 VARCHAR(256),
    v3 VARCHAR(256),
    v4 VARCHAR(256),
    v5 VARCHAR(256)
);
```

#### Resource Hierarchy Structure

Kavach uses hierarchical resource naming following this pattern:

```
Organizations:     /organizations/{org-id}
Secret Groups:     /organizations/{org-id}/secret-groups/{secret-group-id}
Environments:      /organizations/{org-id}/secret-groups/{secret-group-id}/environments/{env-id}
User Groups:       /organizations/{org-id}/user-groups/{user-group-id}
```

**Example Resource IDs:**
```
org:        /organizations/1k3o131
secretgroup: /organizations/1k3o131/secret-groups/i3i3p13
environment: /organizations/1k3o131/secret-groups/i3i3p13/environments/103031
usergroup:   /organizations/1k3o131/user-groups/170101
```

### Policy Structure

Kavach uses grouped policies for better organization and management:

#### 1. Role-Based Policies (Grouped)

```csv
# Admin role policies
admin, read
admin, write
admin, create
admin, delete
admin, grant

# Editor role policies
editor, read
editor, write
editor, create

# Viewer role policies
viewer, read
```

#### 2. User-Role Assignments

```csv
# Direct user-role assignments
user:13018310, admin, /organizations/3038013031
user:38010, editor, /organizations/319311/secret-groups/1391ene191
user:charlie@company.com, viewer, /organizations/1k3o131/secret-groups/i3i3p13/environments/103031
```

#### 3. Group-to-Role Mapping Policies

```csv
# Resource bindings to group
group:10303013, admin, /organizations/31u313193/ju39u1313
group:011804104, editor, /organizations/1k3o131/secret-groups/i3i3p13
group:3u01, viewer, /organizations/1k3o131/secret-groups/i3i3p13/environments/103031
group:dev-team, admin, /organizations/1k3o131
group:qa-team, editor, /organizations/1k3o131/secret-groups/i3i3p13
group:monitoring, viewer, /organizations/1k3o131/secret-groups/i3i3p13/environments/103031
```

#### 4. User-Group Mappings

```csv
# User to group mappings (when adding members to group)
user:21031031, group:011804104
user:j314h14, group:3u01
user:alice@company.com, group:dev-team
user:bob@company.com, group:qa-team
user:charlie@company.com, group:monitoring
```

**Explanation:**
- `group:10303013, admin, /organizations/31u313193/ju39u1313` - Group gets admin role at specified resource
- `user:21031031, group:011804104` - User is added as member to group, inheriting group's permissions
- When a user is added to a group, they automatically inherit all permissions granted to that group

### Policy Examples

#### Organization-Level Access

```csv
# Organization owner
user:admin@company.com, admin, /organizations/1k3o131

# Organization admin
user:devops@company.com, admin, /organizations/1k3o131

# Organization editor
user:developer@company.com, editor, /organizations/1k3o131

# Organization viewer
user:auditor@company.com, viewer, /organizations/1k3o131
```

#### Secret Group-Level Access

```csv
# Secret group admin
user:team-lead@company.com, admin, /organizations/1k3o131/secret-groups/i3i3p13

# Secret group editor
user:developer@company.com, editor, /organizations/1k3o131/secret-groups/i3i3p13

# Secret group viewer
user:monitor@company.com, viewer, /organizations/1k3o131/secret-groups/i3i3p13
```

#### Environment-Level Access

```csv
# Environment admin
user:devops@company.com, admin, /organizations/1k3o131/secret-groups/i3i3p13/environments/103031

# Environment editor
user:deploy@company.com, editor, /organizations/1k3o131/secret-groups/i3i3p13/environments/103031

# Environment viewer
user:monitor@company.com, viewer, /organizations/1k3o131/secret-groups/i3i3p13/environments/103031
```

#### User Group Management

```csv
# User group admin
user:hr@company.com, admin, /organizations/1k3o131/user-groups/170101

# User group member assignment
user:john@company.com, group:170101, /organizations/1k3o131
```

#### Group-to-Role Mapping Examples

```csv
# Complete group-to-role mapping example
# 1. User to group mappings (adding members to groups)
user:alice@company.com, group:dev-team
user:bob@company.com, group:dev-team
user:charlie@company.com, group:qa-team
user:diana@company.com, group:monitoring

# 2. Resource bindings to group (group role assignments)
group:dev-team, admin, /organizations/1k3o131
group:qa-team, editor, /organizations/1k3o131/secret-groups/i3i3p13
group:monitoring, viewer, /organizations/1k3o131/secret-groups/i3i3p13/environments/103031

# Result: Effective permissions
# alice@company.com: admin at /organizations/1k3o131 (inherits from dev-team)
# bob@company.com: admin at /organizations/1k3o131 (inherits from dev-team)
# charlie@company.com: editor at /organizations/1k3o131/secret-groups/i3i3p13 (inherits from qa-team)
# diana@company.com: viewer at /organizations/1k3o131/secret-groups/i3i3p13/environments/103031 (inherits from monitoring)
```

### Hierarchical Permission Inheritance

The hierarchical structure allows permissions to cascade down:

```csv
# Organization-level admin cascades to all child resources
user:admin@company.com, admin, /organizations/1k3o131

# This automatically grants access to:
# - /organizations/1k3o131/secret-groups/i3i3p13
# - /organizations/1k3o131/secret-groups/i3i3p13/environments/103031
# - /organizations/1k3o131/user-groups/170101
```

### Policy Enforcement

When a user requests access to a resource:

1. **Resource Resolution**: System resolves the full hierarchical path
2. **Permission Check**: Casbin checks policies for the exact resource path
3. **Hierarchical Check**: If not found, checks parent resources up the hierarchy
4. **Role Resolution**: Resolves user roles and group memberships
5. **Action Validation**: Validates the requested action against role permissions

**Example Request:**
```
User: developer@company.com
Resource: /organizations/1k3o131/secret-groups/i3i3p13/environments/103031
Action: read
```

**Policy Check Order:**
1. Check exact resource: `/organizations/1k3o131/secret-groups/i3i3p13/environments/103031`
2. Check parent: `/organizations/1k3o131/secret-groups/i3i3p13`
3. Check parent: `/organizations/1k3o131`
4. Check user groups and roles

### Policy Storage with SQLx Adapter

#### Database Storage

Policies are stored in the database using Casbin's SQLx adapter:

```sql
-- Example policy records in casbin_rule table
INSERT INTO casbin_rule (ptype, v0, v1, v2) VALUES 
('p', 'user:alice@company.com', '/organizations/1k3o131', 'read'),
('p', 'user:alice@company.com', '/organizations/1k3o131', 'write'),
('g', 'user:alice@company.com', 'admin', '/organizations/1k3o131'),
('g', 'user:bob@company.com', 'group:dev-team', '/organizations/1k3o131'),
('g', 'group:dev-team', 'admin', '/organizations/1k3o131');
```

#### Policy Management Operations

```go
// Add policy
enforcer.AddPolicy("user:alice@company.com", "/organizations/1k3o131", "read")

// Add role assignment
enforcer.AddGroupingPolicy("user:alice@company.com", "admin", "/organizations/1k3o131")

// Add user to group
enforcer.AddGroupingPolicy("user:bob@company.com", "group:dev-team", "/organizations/1k3o131")

// Add group role assignment
enforcer.AddGroupingPolicy("group:dev-team", "admin", "/organizations/1k3o131")

// Check permission
enforcer.Enforce("user:alice@company.com", "/organizations/1k3o131", "read")
```

#### Performance Considerations

- **Caching**: Casbin caches policies in memory for fast access
- **Auto-save**: Policies are automatically persisted to database
- **Batch Operations**: Multiple policy changes can be batched for efficiency
- **Connection Pooling**: SQLx adapter supports connection pooling for better performance

## Special Actions and Permissions

### Secret Synchronization

**Action**: `sync`
**Minimum Role**: Editor
**Scope**: Secret level

Users with Editor role or higher can sync secrets to external providers using the methods exposed by providers in the secret service:
- Azure Key Vault
- Google Cloud Secret Manager
- GitHub Actions Secrets

**Note**: Sync operations are performed at the secret level, not the provider level. The secret service uses provider methods to handle the actual synchronization.

### Provider Configuration Management

| Action | Minimum Role | Description |
|--------|--------------|-------------|
| **View Provider Config** | Editor | View provider configuration details |
| **Create Provider** | Admin | Create new provider configurations |
| **Update Provider** | Admin | Modify existing provider configurations |
| **Delete Provider** | Admin | Remove provider configurations |

### User Group Management

**Resource**: User Groups
**Permission Level**: Organization
**Actions**:
- Create user groups (Admin/Owner at org level)
- Manage user group membership (Admin/Owner at org level)
- View user groups (Viewer+ at org level)

**Note**: User Groups are not resources that can have permissions granted on them. They are organizational tools used to group users when granting permissions to other resources (Secret Groups, Environments, etc.).

## Best Practices

### 1. Principle of Least Privilege

- Start with Viewer role and escalate as needed
- Grant permissions at the lowest possible level
- Regularly review and audit permissions

### 2. Role Assignment Strategy

```yaml
# Recommended role assignments
Organization:
  - Owner: System administrators
  - Admin: DevOps leads, security team, user group managers
  
Secret Groups:
  - Admin: Team leads, project managers
  - Editor: Developers, CI/CD systems
  
Environments:
  - Editor: Application deployment processes
  - Viewer: Monitoring systems, auditors

User Groups:
  - Admin: HR, team leads (for managing group membership)
  - Viewer: Auditors (for reviewing group assignments)
```

### 3. Security Considerations

- **Secret Rotation**: Only Editors and above can rotate secrets
- **Provider Access**: Admin role required for provider configuration changes
- **Audit Logging**: All permission changes are logged
- **Resource Isolation**: Use secret groups to isolate different projects/teams

### 4. Permission Auditing

Regular permission audits should include:
- Review of explicit role assignments
- Verification of inherited permissions
- Removal of unused permissions
- Validation of least-privilege principle

## Troubleshooting

### Common Permission Issues

#### 1. "Access Denied" Errors

**Cause**: User lacks required role for the action
**Solution**: Grant appropriate role at the correct resource level



## Support and Resources

- **Documentation**: [CLI Overview](/docs/cli/overview)
- **Authentication**: [CLI Authentication](/docs/cli/authentication)
- **Examples**: [GitHub Repository](https://github.com/Gkemhcs/kavach-docs)
- **Community**: [GitHub Discussions](https://github.com/Gkemhcs/kavach-docs/discussions) 