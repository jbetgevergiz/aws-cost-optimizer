# GitHub Repository Setup - aws-cost-optimizer

## Repo Creation

```bash
gh repo create costoptimizer/aws-analyzer \
  --public \
  --source=/root/.openclaw/workspace/mvp \
  --remote=origin \
  --push
```

## Branch Protection Rules

**Main Branch Protection:**
- Require pull request reviews (1 approval)
- Require status checks to pass
- Require branches to be up to date
- Require code review from code owners

## Repo Structure

```
aws-analyzer/
├── frontend/                    # Next.js app
├── backend/                     # Express API
├── design/                      # Design system
├── research/                    # Marketing assets
├── .github/
│   ├── workflows/
│   │   ├── test.yml
│   │   ├── deploy-staging.yml
│   │   └── deploy-prod.yml
│   ├── CODEOWNERS
│   └── pull_request_template.md
├── docs/
│   ├── DEPLOY.md
│   ├── SETUP.md
│   └── API.md
├── .env.example
├── .gitignore
└── README.md
```

## CODEOWNERS

```
# Frontend
/frontend/ @frontend-team

# Backend
/backend/ @backend-team

# Design
/design/ @design-team
```

