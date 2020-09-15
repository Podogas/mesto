const presets = [
  ['@babel/env', { // какой пресет использовать
    targets: { // какие версии браузеров поддерживать
      "chrome": 54,
      "edge": 13,
      "firefox": 49,
      "ie": 10,
      "ios": 10,
      "safari": 9,
      "opera": 41
    },

    // использовать полифиллы для браузеров из свойства target
    // по умолчанию babel использует поллифиллы библиотеки core-js
    useBuiltIns: "entry"
  }]
];

module.exports = { presets };