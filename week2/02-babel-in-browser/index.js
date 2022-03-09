// Получаем Babel Standalone
const src = await fetch('https://kodaktor.ru/babel7.7.3.js').then(file => file.text())
eval(src)

// В переменную code записываем результат исполнения ф-ии transform с переданными параметрами
const { code } = Babel.transform('16 |> Math.sqrt |> console.log', { plugins: [[ 'proposal-pipeline-operator', { 'proposal': 'minimal' } ]] })
//  Сам код
code
// Получаем результат исполнения кода
eval(code)