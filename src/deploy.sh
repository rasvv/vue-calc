#!/usr/bin/env sh

npm run build
cd dist
git add dist
git commit -m 'deploy'
#git subtree push --prefix dist origin gh-pages
git push -f git@github.com:rasvv.github.io/vue-calc.git master:gh-pages
# остановить публикацию при ошибках
# set -e

# сборка
# npm run build

# переход в каталог сборки
# cd dist

# если вы публикуете на пользовательский домен
# echo 'www.example.com' > CNAME

# git init
# git add dist
# git commit -m 'deploy'

# если вы публикуете по адресу https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# если вы публикуете по адресу https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:rasvv.github.io/vue-calc.git master:gh-pages
# git subtree push --prefix dist origin gh-pages

# cd -