# Kavach Documentation

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator for Kavach documentation.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

## 📚 Documentation Structure

```
docs/
├── why-kavach.md              # Why choose Kavach
├── getting-started.md         # Getting started guide
├── cli/                       # CLI documentation
│   ├── overview.md
│   ├── installation.md
│   ├── authentication.md
│   └── commands/
├── providers/                 # Cloud provider guides
│   ├── gcp.md
│   ├── azure.md
│   └── github.md
├── authorization/             # RBAC documentation
│   └── rbac.md
├── architecture/              # System architecture
│   └── overview.md
└── guides/                    # Tutorial guides
    └── quickstart.md
```

## 🌐 GitHub Pages Deployment

This documentation is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Deployment URL
- **Production**: https://Gkemhcs.github.io/kavach-docs/
- **Custom Domain**: https://docs.kavach.gkemc.cloud/ (after DNS configuration)
- **Repository**: https://github.com/Gkemhcs/kavach-docs

### Automatic Deployment
The site is automatically built and deployed using GitHub Actions:
1. Push changes to `main` branch
2. GitHub Actions builds the site
3. Site is deployed to GitHub Pages
4. Available at the deployment URL

### Manual Deployment
If you need to deploy manually:

```bash
# Build the site
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🔧 Configuration

### Docusaurus Config
- **File**: `docusaurus.config.ts`
- **Base URL**: `/kavach-docs/`
- **Production URL**: `https://Gkemhcs.github.io`

### Sidebar Configuration
- **File**: `sidebars.ts`
- **Structure**: Hierarchical documentation organization

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm start`
5. Submit a pull request

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache and rebuild
npm run clear
npm run build
```

### Local Development Issues
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

- **Documentation**: https://Gkemhcs.github.io/kavach-docs/
- **GitHub Issues**: https://github.com/Gkemhcs/kavach-docs/issues
- **Repository**: https://github.com/Gkemhcs/kavach-docs
