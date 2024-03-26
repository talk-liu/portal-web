
#! /bin/bash
git checkout --orphan latest_branch
git add -A
git commit -am 'commit message'
git branch -D master
git branch -m master
git remote add origin86 ssh://git@gitlab.riostox.com:2222/pro-team/portal-web.git
git push -f origin86 master
