rem for first time computer setup - need to add those 2 lines first dsf
git init
rem account user:nirmic (password regular)
rem git remote add origin https://github.com/nirmic/projects.git

rem account user:nirmic75 (password regular)
git remote add origin https://github.com/nirmic75/cwkprojects.git
git add --all
git commit -am "push to github"
git push origin master --force
start https://nirmic.github.io/projects/JavaScriptProjects/index.html