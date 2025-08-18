---
sidebar_position: 1
---

# CLI Overview

<div class="dev-alert">
  <div class="dev-alert-content">
    <div class="dev-alert-icon">🚧</div>
    <div class="dev-alert-text">
      <strong>🚀 Kavach CLI is currently in active development!</strong>
      <p>
        We're working hard to make Kavach the best secret management platform. 
        Your feedback, suggestions, and contributions are invaluable to us!
      </p>
      <div class="dev-alert-actions">
        <a href="https://github.com/Gkemhcs/kavach-cli/issues" target="_blank" rel="noopener noreferrer" class="dev-alert-button">
          📝 Report Issues
        </a>
        <a href="https://github.com/Gkemhcs/kavach-cli/discussions" target="_blank" rel="noopener noreferrer" class="dev-alert-button">
          💬 Join Discussion
        </a>
        <a href="mailto:gudikotieswarmani@gmail.com" class="dev-alert-button">
          📧 Contact Us
        </a>
      </div>
    </div>
  </div>
</div>

The Kavach CLI (`kavach`) is the primary interface for interacting with the Kavach secret management platform. It provides a comprehensive set of commands for managing secrets, organizations, environments, and cloud provider integrations.

## Installation

### Download Pre-built Binary

```bash
# Linux (AMD64)
curl -L https://github.com/Gkemhcs/kavach-cli/releases/download/v0.1.0-beta.1/kavach-cli_Linux_x86_64.tar.gz -o kavach-cli_Linux_x86_64.tar.gz
tar -xzf kavach-cli_Linux_x86_64.tar.gz
chmod +x kavach
sudo mv kavach /usr/local/bin/

# Linux (ARM64)
curl -L https://github.com/Gkemhcs/kavach-cli/releases/download/v0.1.0-beta.1/kavach-cli_Linux_arm64.tar.gz -o kavach-cli_Linux_arm64.tar.gz
tar -xzf kavach-cli_Linux_arm64.tar.gz
chmod +x kavach
sudo mv kavach /usr/local/bin/

# macOS (AMD64)
curl -L https://github.com/Gkemhcs/kavach-cli/releases/download/v0.1.0-beta.1/kavach-cli_Darwin_x86_64.tar.gz -o kavach-cli_Darwin_x86_64.tar.gz
tar -xzf kavach-cli_Darwin_x86_64.tar.gz
chmod +x kavach
sudo mv kavach /usr/local/bin/

# macOS (ARM64/Apple Silicon)
curl -L https://github.com/Gkemhcs/kavach-cli/releases/download/v0.1.0-beta.1/kavach-cli_Darwin_arm64.tar.gz -o kavach-cli_Darwin_arm64.tar.gz
tar -xzf kavach-cli_Darwin_arm64.tar.gz
chmod +x kavach
sudo mv kavach /usr/local/bin/

# Windows (AMD64)
# Download from: https://github.com/Gkemhcs/kavach-cli/releases/download/v0.1.0-beta.1/kavach-cli_Windows_x86_64.zip

# Windows (ARM64)
# Download from: https://github.com/Gkemhcs/kavach-cli/releases/download/v0.1.0-beta.1/kavach-cli_Windows_arm64.zip
```

### Build from Source

```bash
git clone https://github.com/Gkemhcs/kavach-cli.git
cd kavach-cli
go build -o kavach cmd/main.go
sudo mv kavach /usr/local/bin/
```

## Authentication

Kavach CLI uses GitHub OAuth for authentication via device code flow:

```bash
# Login to Kavach
kavach login

# Logout from Kavach
kavach logout
```

## Command Structure

The CLI follows a hierarchical command structure:

```
kavach [command] [subcommand] [flags]
```

### Main Command Categories

| Command | Description |
|---------|-------------|
| `login` | Authenticate with GitHub OAuth |
| `logout` | Clear authentication credentials |
| `org` | Manage organizations |
| `group` | Manage secret groups |
| `env` | Manage environments |
| `secret` | Manage secrets |
| `provider` | Manage cloud provider integrations |
| `user-group` | Manage user groups and permissions |

## Global Flags

| Flag | Description |
|------|-------------|
| `--help, -h` | Show help for command |
| `--version, -v` | Show version information |
| `--debug` | Enable debug logging |
| `--config` | Path to config file |

## Configuration

The CLI stores configuration in `~/.kavach/`:

```
~/.kavach/
├── credentials.json    # Authentication tokens
├── config.yaml        # CLI configuration
└── logs/              # Log files
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `KAVACH_BACKEND_ENDPOINT` | Backend API endpoint | `https://kavach.gkem.cloud/api/v1/` |
| `KAVACH_DEBUG` | Enable debug logging | `false` |
| `KAVACH_CONFIG_PATH` | Path to config file | `~/.kavach/config.yaml` |

## Command Reference

### Authentication Commands

- **`kavach login`** - Authenticate with GitHub OAuth
- **`kavach logout`** - Clear authentication credentials

### Organization Commands

- **`kavach org create`** - Create a new organization
- **`kavach org list`** - List all organizations
- **`kavach org activate`** - Set active organization
- **`kavach org delete`** - Delete an organization
- **`kavach org grant`** - Grant permissions to users/groups
- **`kavach org revoke`** - Revoke permissions from users/groups

### Secret Group Commands

- **`kavach group create`** - Create a new secret group
- **`kavach group list`** - List all secret groups
- **`kavach group activate`** - Set active secret group
- **`kavach group delete`** - Delete a secret group
- **`kavach group grant`** - Grant permissions to users/groups
- **`kavach group revoke`** - Revoke permissions from users/groups

### Environment Commands

- **`kavach env create`** - Create a new environment
- **`kavach env list`** - List all environments
- **`kavach env activate`** - Set active environment
- **`kavach env delete`** - Delete an environment
- **`kavach env grant`** - Grant permissions to users/groups
- **`kavach env revoke`** - Revoke permissions from users/groups

### Secret Commands

- **`kavach secret add`** - Add secret to staging area
- **`kavach secret commit`** - Commit staged secrets
- **`kavach secret push`** - Push secrets to providers
- **`kavach secret list`** - List secret versions
- **`kavach secret details`** - Show secret version details
- **`kavach secret export`** - Export secrets to file
- **`kavach secret sync`** - Sync secrets from providers
- **`kavach secret rollback`** - Rollback to previous version
- **`kavach secret diff`** - Show differences between versions

### Provider Commands

- **`kavach provider configure`** - Configure cloud provider
- **`kavach provider list`** - List configured providers
- **`kavach provider show`** - Show provider details
- **`kavach provider update`** - Update provider configuration
- **`kavach provider delete`** - Delete provider configuration

### User Group Commands

- **`kavach user-group create`** - Create a new user group
- **`kavach user-group list`** - List all user groups
- **`kavach user-group delete`** - Delete a user group
- **`kavach user-group members add`** - Add member to group
- **`kavach user-group members list`** - List group members
- **`kavach user-group members remove`** - Remove member from group

## Examples

### Complete Workflow

```bash
# 1. Authenticate
kavach login

# 2. Create organization
kavach org create mycompany --description "My company"

# 3. Set active organization
kavach org activate mycompany

# 4. Create secret group
kavach group create backend --description "Backend application"

# 5. Set active secret group
kavach group activate backend

# 6. Create environment
kavach env create prod --description "Production environment"

# 7. Set active environment
kavach env activate prod

# 8. Add secrets
kavach secret add database-url --value "postgresql://user:pass@localhost:5432/db"
kavach secret add api-key --value "sk-1234567890abcdef"

# 9. Commit secrets
kavach secret commit --message "Add initial secrets"

# 10. Configure provider
kavach provider configure github --token "ghp_token" --owner "myorg" --repo "myrepo"

# 11. Sync secrets
kavach secret sync --provider github
```

### Batch Operations

```bash
# Add multiple secrets at once
kavach secret add db-host --value "localhost"
kavach secret add db-port --value "5432"
kavach secret add db-name --value "myapp"
kavach secret add db-user --value "myuser"
kavach secret add db-password --value "mypassword"

# Commit all at once
kavach secret commit --message "Add database configuration"
```

## Resource Hierarchy

Kavach follows a hierarchical resource structure:

```
Organization
├── Secret Groups
│   ├── Environments
│   │   └── Secrets
│   └── User Groups
└── User Groups
```

### Context Management

Commands operate within the current context:

1. **Organization**: Set with `kavach org activate`
2. **Secret Group**: Set with `kavach group activate`
3. **Environment**: Set with `kavach env activate`

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   ```bash
   kavach logout
   kavach login
   ```

2. **Permission Denied**
   ```bash
   kavach org list
   kavach group list
   ```

3. **Provider Sync Failed**
   ```bash
   kavach provider show --provider github
   ```

### Debug Mode

Enable debug logging for troubleshooting:

```bash
kavach --debug secret list
```

## Next Steps

- 📖 [Installation Guide](/docs/cli/installation) - Detailed installation instructions
- 🔐 [Authentication Guide](/docs/cli/authentication) - Authentication setup
- 🔐 [Secret Commands](/docs/cli/commands/secret) - Secret management
- 🔄 [Provider Commands](/docs/cli/commands/provider) - Cloud provider integration 