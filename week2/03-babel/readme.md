# Простой скрипт на транспиляторе Babel с Pipipeline (композиции функций) / Simple Babel Script With Pipelines Transpile

## Запуск / How to srart
1. clone this repo
2. yarn install
3. yarn run transpile
4. yarn run start

## Конфигурирация / How to
1. yarn init -y
2. nano | code `src/index.js` 
   `16 |> Math.sqrt |> console.log`
3. `yarn add -D @babel/cli @babel/core @babel/plugin-proposal-pipeline-operator`
4. nano | code `.babelrc.json`
5. add `@babel/proposal-pipeline-plugin` to `"plugins"` with `"proposal": "minimal"`
6. config scripts in `package.json` `"transpile": "yarn babel ./src/index.js -o index.js"`
7. config scripts in `package.json` `"start": "node index"`
