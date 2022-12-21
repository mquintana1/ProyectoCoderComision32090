## Testeamos nuestra API

Agregué testing de algunos controllers utilizando **Jest**, generé las Requests con **axios**.

```console
test
└── controllers
    ├── other.test.js
    └── product.test.js
```

Para correr los tests se puede ejecutar los siguientes comandos _(debe estár levantado el servidor)_

### `npm run test`

Este comando mostrará por terminal los resultados.


### `npm run testReport`

Mostrará los resultados por terminal y además guardará en la carpeta **_testresults_** un archivo con los resultados, el archivo está identificado con la fecha en que se corrió.
