cumulus-bolt

## Deployment

This application is deployed to GitHub Pages at https://philbergdorf.github.io/loyalty-bolt/

The deployment is automated using GitHub Actions. On every push to the `main` branch:
1. The application is built using `npm run build:web`
2. The built files are deployed to the `gh-pages` branch
3. GitHub Pages serves the application from the `gh-pages` branch

The application uses the `/loyalty-bolt` base path to match the GitHub Pages URL structure.

