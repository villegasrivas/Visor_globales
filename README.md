# Plantilla de visor cartográfico municipal

Plantilla reutilizable basada en HTML, CSS, JavaScript, Leaflet y GeoJSON. La personalización habitual se realiza en `config/config.js`; los datos se mantienen en `data/` y los recursos gráficos en `images/`.

## Crear un visor nuevo

1. Duplique la carpeta completa de la plantilla.
2. Copie las nuevas capas GeoJSON dentro de `data/`.
3. Copie el logo y otros recursos gráficos dentro de `images/`.
4. Modifique la identidad, la vista inicial, las herramientas y las capas en `config/config.js`.
5. Abra el visor mediante un servidor local y compruebe cada capa antes de agregar la siguiente.

> No es necesario modificar `layers.js`, `ui.js` ni los demás archivos JavaScript para configurar un visor normal.

## Organización principal de `config.js`

- `aplicacion`: títulos, institución y logo.
- `mapa`: vista inicial y límites generales de zoom.
- `mapasBase`: fondos cartográficos disponibles.
- `herramientas`: búsqueda, geolocalización, coordenadas, medición, Google Maps y descargas.
- `gruposCapas`: orden de las secciones del panel de capas.
- `capas`: archivo, comportamiento, información y simbología de cada capa.

Todas las herramientas generales quedan habilitadas en la plantilla base. Para ocultar una herramienta en un visor particular, cambie su propiedad `enabled` a `false`.

El botón **Capas** está a la izquierda, debajo del buscador. Las demás herramientas permanecen abajo a la derecha. Sus botones muestran una ayuda al mantener el cursor encima, también cuando el diseño responsivo oculta el texto.

## Guía rápida de apariencia en `styles.css`

`config/config.js` controla qué muestra y cómo se comporta el visor. `css/styles.css` controla su apariencia: colores, tamaños, espacios, bordes y adaptación a pantallas pequeñas. Para un visor normal no es necesario modificar los archivos JavaScript.

Los bloques más habituales de `styles.css` son:

- `:root`: colores generales, altura del encabezado, bordes y sombras.
- `.app-header`: encabezado, logo y títulos institucionales.
- `.search-container`: buscador principal.
- `.tool-button`: botones de herramientas.
- `.feature-info-panel`: apariencia del panel de información extensa.
- `.map-legend`: ancho, altura, fondo y separación de la leyenda.
- `.leaflet-tooltip.etiqueta-...`: apariencia de las etiquetas de cada capa.
- `@media (...)`: ajustes responsivos para teléfonos y pantallas pequeñas.

Use `px` para tamaños directos, por ejemplo `font-size: 12px`. Los colores sólidos pueden escribirse como `#17365d`; para transparencia use `rgba(rojo, verde, azul, opacidad)`, donde la opacidad va de `0` a `1`.

Ejemplo de fondo oscuro transparente para el panel de información:

```css
.feature-info-panel {
    --info-panel-background: rgba(0, 0, 0, 0.82);
    --info-panel-title-color: #ffffff;
    --info-panel-label-color: #b8c7d9;
    --info-panel-value-color: #ffffff;
}
```

Para personalizar etiquetas sin afectar otras capas, cree una clase propia:

```css
.leaflet-tooltip.etiqueta-rol {
    color: #3b2b1a;
    background: rgba(255, 255, 255, 0.75);
    font-size: 12px;
    font-weight: 700;
}
```

Luego vincúlela desde la capa correspondiente:

```js
claseCss: "etiqueta-rol"
```

Cambie una propiedad por vez y recargue el navegador. Evite modificar los bloques `@media` salvo que necesite un comportamiento diferente en teléfonos; una regla ubicada allí solo actúa en los tamaños de pantalla indicados.

## Agregar una capa

Al final de `config.js` existe un objeto comentado llamado **PLANTILLA PARA AGREGAR UNA CAPA NUEVA**. Cópielo dentro de `appConfig.capas` y complete sus valores.

Revise especialmente:

- `id`: identificador único, sin espacios.
- `archivo`: ruta exacta al GeoJSON dentro de `data/`.
- `grupo`: debe coincidir con un grupo definido en `gruposCapas`.
- `enabled`: incluye o excluye completamente la capa.
- `visibleInicial`: define el estado inicial de una capa temática.
- `interactive`: permite o impide la interacción con sus entidades.
- `opacityControl`: muestra el control de transparencia.
- `cluster`: agrupa entidades; úselo solamente con capas de puntos.
- `minZoom` y `maxZoom`: rango visible de la capa; `null` significa sin límite adicional.

Los nombres de campos son sensibles a mayúsculas, minúsculas y tildes. Deben escribirse exactamente como aparecen en las propiedades del GeoJSON.

## Información de capa y de entidades

Cada bloque cumple una función distinta:

- `metadata`: información general del dataset, como fuente, institución, actualización, escala y descripción. Se abre con el ícono `i`.
- `popup`: información breve de una entidad sobre el mapa.
- `infoPanel`: información extensa de una entidad en un panel lateral.

Para una misma capa normalmente se utiliza `popup` o `infoPanel`, según la cantidad de información que se quiera mostrar.

## Capas estructurales

Una capa como el límite comunal puede configurarse con:

```js
enabled: true,
estructural: true,
interactive: false
```

Estas capas permanecen visibles, se dibujan por encima de las demás, no bloquean la selección y aparecen en la leyenda. Para retirarlas completamente de un visor, cambie `enabled` a `false` o elimine su objeto desde `config.js`.

El bloque `simbologia.halo` permite generar el doble trazo que mantiene visible el límite sobre fondos claros u oscuros.

## Selección, búsqueda y etiquetado

- `seleccion.enabled`: permite seleccionar la entidad.
- `resaltado.enabled`: aplica el estilo de selección configurado.
- `busqueda.enabled`: incorpora la capa al buscador.
- `busqueda.modoResultado`: admite `resaltar`, `aislar` o `contrasteInverso`.
- `etiquetado.enabled`: activa las etiquetas.
- `etiquetado.zoomMin` y `zoomMax`: controlan cuándo aparecen.
- `etiquetado.claseCss`: permite aplicar un estilo particular definido en `styles.css`.

Las capas apagadas no se incluyen en la búsqueda cuando `soloCapasVisibles` está activado.

## Simbología

La propiedad `simbologia.tipo` admite:

- `simple`: un solo estilo para toda la capa.
- `valoresUnicos`: un estilo para cada categoría de un campo.
- `graduados`: clases de color construidas a partir de un campo numérico.

Los tres tipos funcionan con puntos, líneas y polígonos. En líneas use `color`, `weight` y `opacity`; en polígonos use además `fillColor` y `fillOpacity`. Para puntos, `simboloPunto` admite `marcador`, `circulo`, `cuadrado`, `triangulo` y `cruz`; `radius` ajusta el tamaño de las cuatro figuras vectoriales.

El resaltado usa un solo estilo adaptable: `fillColor` pasa a ser el color principal de una línea y genera un halo cuando se conserva el marcador tradicional.

En `estiloContrasteInverso.resto`, use conjuntamente `opacity` y `fillOpacity`: la primera atenúa líneas y bordes, y la segunda atenúa rellenos.

En valores únicos, `mostrarNoConfigurados: false` excluye del mapa las entidades cuyo valor no figura en `categorias`; también quedan fuera de la búsqueda y la selección. El valor predeterminado es mostrarlas con `estiloDefault`.

### Filtrar categorías de valores únicos

Agregue `filtroCategorias` dentro de `simbologia` para mostrar cajas de verificación en el panel **Capas**:

```js
filtroCategorias: {
    enabled: true,          // Activa el filtro.
    mostrarTodas: true,    // Muestra Todas y Ninguna.
    abiertoInicial: true   // Abre el listado al iniciar.
}
```

Cada elemento de `categorias` admite `visibleInicial: true` o `false`. Si se muestran valores no clasificados, `visibleDefaultInicial` controla su estado inicial. El checkbox principal sigue apagando la capa completa; los controles interiores afectan solamente sus categorías.

Las categorías apagadas se retiran del mapa, la búsqueda, las etiquetas y la leyenda. La selección se conserva durante la sesión y vuelve a sus valores iniciales al recargar la página.

### Información común por categoría

`infoCategorias` agrega un ícono `i` junto a cada valor único y reutiliza el panel lateral sin seleccionar ni acercar el mapa:

```js
infoCategorias: {
    enabled: true,                     // Habilita el ícono en cada categoría.
    mostrarCantidad: true,             // Cuenta las entidades automáticamente.
    etiquetaCantidad: "Cantidad de tramos",
    campos: [
        { campo: "empresa", etiqueta: "Empresa", formato: "texto" },
        { campo: "carpeta", etiqueta: "Tipo de carpeta", formato: "texto" }
    ]
}
```

Para cada campo, un valor común se muestra una sola vez. Si existen varios, el panel indica **Valores múltiples** y lista cada valor con su cantidad; si no hay datos, muestra **Sin información**. Los datos se leen del GeoJSON completo, incluso cuando la categoría está apagada.

Opcionalmente, una categoría puede incorporar información editorial propia: `informacion: { descripcion: "...", enlace: "...", textoEnlace: "..." }`. Esto complementa los valores calculados y no reemplaza la metadata de la capa ni el popup de cada entidad.

### Campos manuales y sumas automáticas

`metadata` e `infoCategorias` admiten dos complementos:

- `camposAdicionales`: pares de `etiqueta` y `valor` escritos manualmente.
- `estadisticas`: cálculos obtenidos desde un campo numérico del GeoJSON.

```js
camposAdicionales: [
    { etiqueta: "Estado de la información", valor: "Preliminar" }
],
estadisticas: [
    {
        operacion: "suma",          // Por ahora se admite suma.
        campo: "long_km",           // Campo numérico utilizado.
        etiqueta: "Longitud total",
        factor: 1,                  // 1 conserva la unidad; 0.001 convierte m a km.
        decimales: 2,               // Redondea el resultado después de sumar.
        sufijo: " km"
    }
]
```

En `metadata`, la suma considera toda la capa; en `infoCategorias`, solamente las entidades de la categoría abierta. Para un dato manual exclusivo de una categoría use `informacion.camposAdicionales` dentro de esa categoría.

Los campos de un popup también admiten `formato: "decimal"`, `factor`, `decimales`, `prefijo` y `sufijo`. Si se omite `factor`, se utiliza `1`.

`gruposCapas.ordenVisual` controla el orden: un número mayor se dibuja encima. Los límites con `estructural: true` conservan su nivel superior y no bloquean la interacción.

Al final de `config.js` existen ejemplos comentados de las tres estructuras. En valores únicos agregue tantas categorías como valores necesite representar. En graduados, cada clase excluye `min` e incluye `max`; use `max: null` en la última clase.

La leyenda detecta automáticamente puntos, líneas y polígonos. Los puntos con ícono muestran el mismo marcador del mapa; las líneas muestran su trazo y los polígonos su borde y relleno. No requiere una propiedad adicional en `config.js`. Los marcadores predeterminados de Leaflet no cambian de color mediante `fillColor`.

La prueba de regresión de la leyenda se ejecuta con Node.js: `node tests/legend.test.cjs`.

## Cómo llegar con Google Maps

`herramientas.googleMaps.enabled` muestra u oculta el botón **Cómo llegar**. `modoViaje` acepta `driving` (automóvil), `walking` (a pie), `bicycling` (bicicleta) o `transit` (transporte público).

Pulse **Cómo llegar**, acerque el mapa si es necesario y marque un destino. Revise el punto y pulse **Abrir Google Maps**. Puede cambiarlo con **Cambiar destino**, o cerrar y limpiar con **Cancelar**, la cruz o Escape. Al activar otra herramienta se cancela esta selección.

El destino solo se envía a Google al abrir el enlace. El visor no solicita la ubicación de origen ni calcula rutas; Google Maps permite indicar el origen y revisar las alternativas. No requiere una clave de API. Seleccione accesos reales, no el centro de predios o polígonos. La disponibilidad de rutas depende de Google Maps.

Prueba local sin abrir Google: `node tests/google-maps.test.cjs`.

## Publicar mapas PDF y capas KML

La herramienta **Descargas** está habilitada por defecto y se encuentra al final de la barra inferior derecha. Para ocultarla use `herramientas.descargas.enabled: false`.

1. Copie los PDF preparados en `descargas/mapas/` y los KML en `descargas/capas/`.
2. En `herramientas.descargas.archivos`, copie uno de los ejemplos comentados y quite los `//` del objeto.
3. Complete `titulo`, `descripcion`, `fechaActualizacion` y `archivo` con la ruta exacta.
4. Separe los objetos con comas y pruebe la descarga desde el visor servido por HTTP/HTTPS.

El formato se reconoce por la extensión `.pdf` o `.kml`. Cada entrada permite `enabled: false` para ocultarla sin borrarla. Los archivos se registran explícitamente: no se listan automáticamente las carpetas ni se convierten los GeoJSON de `data/`.

Si no hay entradas, el panel muestra “No hay archivos publicados para descargar”. Si falta un archivo, se informa el problema y se permite reintentar. No se incluye cartografía ficticia en el catálogo de la plantilla.

Ocultar una entrada o la herramienta no protege el archivo publicado: puede seguir siendo accesible mediante su URL directa. Publique únicamente información destinada a distribución y revise los atributos de los KML. El PDF es un documento preparado previamente, no una exportación de la vista actual.

Pruebas: `node tests/downloads.test.cjs`. La página `tests/downloads.html` contiene un ensayo separado con un KML ficticio y un archivo deliberadamente ausente; no forma parte del catálogo público y la carpeta `tests/` no es necesaria para desplegar el visor.

## Comprobación antes de publicar

Revise el visor con este orden:

1. Carga del mapa base, logo y vista inicial.
2. Visibilidad, leyenda y transparencia de cada capa.
3. Selección y resaltado.
4. Popup o panel de información.
5. Búsqueda y comportamiento del resultado.
6. Etiquetas y rangos de zoom.
7. Clustering en capas de puntos.
8. Geolocalización, coordenadas y medición.
9. Selección, cambio y cancelación del destino de Cómo llegar.
10. Descarga efectiva de los PDF y KML publicados.
11. Apariencia en escritorio y teléfono.

Mantenga `desarrollo.validarConfiguracion: true` mientras prepara el visor. Las advertencias visibles ayudan a detectar rutas, identificadores o configuraciones incorrectas.

## Problemas frecuentes

- **La capa no aparece:** compruebe `enabled`, `visibleInicial`, la ruta de `archivo` y el rango `minZoom`/`maxZoom`.
- **La búsqueda no encuentra registros:** revise que la capa esté visible y que `campoPrincipal` coincida exactamente con el GeoJSON.
- **No aparece el título del popup:** `popup.titulo` debe contener el nombre de un campo válido; `prefijo` y `sufijo` solo complementan ese valor.
- **El clustering no funciona:** la capa debe contener geometrías de tipo punto y tener `cluster: true`.
- **La transparencia parece tener poco efecto:** configure una opacidad inicial suficientemente alta en la simbología y luego ajústela desde el control.
- **El visor falla al abrir `index.html` directamente:** ejecútelo mediante un servidor local, porque las capas se cargan como archivos externos.
