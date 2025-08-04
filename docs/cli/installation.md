---
sidebar_position: 2
---

# CLI Installation

This guide provides detailed instructions for installing the Kavach CLI on different operating systems and platforms.

## Prerequisites

Before installing the Kavach CLI, ensure you have:

- **GitHub Account** - Required for authentication
- **Network Access** - To connect to the Kavach backend
- **Administrative Privileges** - For system-wide installation (optional)

## Installation Methods

### Method 1: Download Pre-built Binary (Recommended)

#### Linux (AMD64)

```bash
# Download the latest release
curl -L https://github.com/Gkemhcs/kavach-cli/releases/latest/download/kavach-cli-linux-amd64 -o kavach

# Make executable
chmod +x kavach

# Move to system PATH (requires sudo)
sudo mv kavach /usr/local/bin/

# Verify installation
kavach --version
```

#### macOS (AMD64)

```bash
# Download the latest release
curl -L https://github.com/Gkemhcs/kavach-cli/releases/latest/download/kavach-cli-darwin-amd64 -o kavach

# Make executable
chmod +x kavach

# Move to system PATH (requires sudo)
sudo mv kavach /usr/local/bin/

# Verify installation
kavach --version
```

#### macOS (ARM64/Apple Silicon)

```bash
# Download the latest release
curl -L https://github.com/Gkemhcs/kavach-cli/releases/latest/download/kavach-cli-darwin-arm64 -o kavach

# Make executable
chmod +x kavach

# Move to system PATH (requires sudo)
sudo mv kavach /usr/local/bin/

# Verify installation
kavach --version
```

#### Windows (AMD64)

**Using PowerShell:**

```powershell
# Download the latest release
Invoke-WebRequest -Uri "https://github.com/Gkemhcs/kavach-cli/releases/latest/download/kavach-cli-windows-amd64.exe" -OutFile "kavach.exe"

# Move to system PATH (requires admin privileges)
Move-Item -Path "kavach.exe" -Destination "C:\Windows\System32\"

# Verify installation
kavach.exe --version
```

**Using Command Prompt:**

```cmd
# Download the latest release
curl -L -o kavach.exe https://github.com/Gkemhcs/kavach-cli/releases/latest/download/kavach-cli-windows-amd64.exe

# Move to system PATH (requires admin privileges)
move kavach.exe C:\Windows\System32\

# Verify installation
kavach.exe --version
```

### Method 2: Build from Source

#### Prerequisites for Building

- **Go 1.21 or later**
- **Git**

#### Build Steps

```bash
# Clone the repository
git clone https://github.com/Gkemhcs/kavach-cli.git
cd kavach-cli

# Build the binary
go build -o kavach cmd/main.go

# Make executable (Linux/macOS)
chmod +x kavach

# Move to system PATH (requires sudo)
sudo mv kavach /usr/local/bin/

# Verify installation
kavach --version
```

### Method 3: Using Package Managers

#### Homebrew (macOS/Linux)

```bash
# Add the tap (if not already added)
brew tap Gkemhcs/kavach

# Install the CLI
brew install kavach-cli

# Verify installation
kavach --version
```

#### Snap (Linux)

```bash
# Install via snap
sudo snap install kavach-cli

# Verify installation
kavach --version
```

## Configuration

### Initial Setup

After installation, the CLI will create its configuration directory on first run:

```bash
# Login to create initial configuration
kavach login
```

This creates the following directory structure:

```
~/.kavach/
├── credentials.json    # Authentication tokens
├── config.yaml        # CLI configuration
└── logs/              # Log files
```

### Environment Variables

You can configure the CLI using environment variables:

```bash
# Set backend endpoint
export KAVACH_BACKEND_ENDPOINT="https://kavach.gkem.cloud/api/v1/"

# Set authentication endpoints
export KAVACH_DEVICE_CODE_URL="https://kavach.gkem.cloud/api/v1/auth/device/code"
export KAVACH_DEVICE_TOKEN_URL="https://kavach.gkem.cloud/api/v1/auth/device/token"

# Set file paths
export KAVACH_TOKEN_FILE_PATH="~/.kavach/credentials.json"
export KAVACH_LOG_DIR_PATH="~/.kavach/logs/"
```

### Configuration File

The CLI configuration is stored in `~/.kavach/config.yaml`:

```yaml
# CLI Configuration
organization: "my-company"
secretgroup: "backend"
environment: "production"

# Backend Configuration
backend_endpoint: "https://kavach.gkem.cloud/api/v1/"
device_code_url: "https://kavach.gkem.cloud/api/v1/auth/device/code"
device_token_url: "https://kavach.gkem.cloud/api/v1/auth/device/token"

# File Paths
token_file_path: "~/.kavach/credentials.json"
log_dir_path: "~/.kavach/logs/"
```

## Verification

### Check Installation

```bash
# Check version
kavach --version

# Check help
kavach --help

# Check configuration
kavach info
```

### Test Authentication

```bash
# Login to test authentication
kavach login

# Check status
kavach status
```

## Troubleshooting

### Common Issues

#### 1. Permission Denied

```bash
# Error: permission denied
# Solution: Make executable
chmod +x kavach

# Or install with sudo
sudo mv kavach /usr/local/bin/
```

#### 2. Command Not Found

```bash
# Error: command not found
# Solution: Check PATH
echo $PATH

# Add to PATH if needed
export PATH=$PATH:/usr/local/bin
```

#### 3. SSL Certificate Issues

```bash
# Error: SSL certificate issues
# Solution: Check system certificates
# For development, you can use HTTP
export KAVACH_BACKEND_ENDPOINT="http://localhost:8080/api/v1/"
```

#### 4. Network Connectivity

```bash
# Error: Network connectivity issues
# Solution: Check network and firewall
curl -I https://kavach.gkem.cloud/healthz
```

### Debug Mode

Enable debug logging for troubleshooting:

```bash
# Run with debug logging
kavach --debug login

# Check log files
tail -f ~/.kavach/logs/kavach.log
```

### Uninstallation

#### Remove Binary

```bash
# Remove the binary
sudo rm /usr/local/bin/kavach

# Or if installed in user directory
rm ~/bin/kavach
```

#### Remove Configuration

```bash
# Remove configuration directory
rm -rf ~/.kavach/
```

## Platform-Specific Notes

### Linux

- **Distribution Support**: Tested on Ubuntu 20.04+, CentOS 8+, RHEL 8+
- **Dependencies**: No additional dependencies required
- **Systemd Integration**: Can be installed as a systemd service

### macOS

- **Version Support**: macOS 10.15+ (Catalina)
- **Architecture**: Supports both Intel (AMD64) and Apple Silicon (ARM64)
- **Gatekeeper**: May require allowing execution in Security & Privacy settings

### Windows

- **Version Support**: Windows 10+ (64-bit)
- **PowerShell**: Recommended for installation and usage
- **Antivirus**: May trigger antivirus software - add to exclusions if needed

## Next Steps

After successful installation:

1. **Authentication**: [Login to Kavach](/docs/cli/authentication)
2. **Quick Start**: [Get started with your first secrets](/docs/guides/quickstart)
3. **Configuration**: [Configure your environment](/docs/cli/overview#configuration)
4. **Commands**: [Explore CLI commands](/docs/cli/overview#command-reference)

## Support

If you encounter issues during installation:

- 📚 [Getting Started](/docs/getting-started) - Complete documentation
- 🐛 [Issues](https://github.com/Gkemhcs/kavach-docs/issues) - Report installation problems
- 💬 [Discussions](https://github.com/Gkemhcs/kavach-docs/discussions) - Ask for help
- ⭐ [GitHub](https://github.com/Gkemhcs/kavach-docs) - Star the project 