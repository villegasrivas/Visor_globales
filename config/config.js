/* Configuración central: personalice este archivo para crear un visor nuevo. */
const appConfig = {
    version: 1,

    desarrollo: {
        validarConfiguracion: true          // Muestra advertencias útiles durante la edición.
    },

    /* Identidad y textos visibles de la aplicación. */
    aplicacion: {
        titulo: "Visor Conservación Global Mixto",
        tituloNavegador: "Conservación Global | Nueva Imperial",
        institucion: "Municipalidad de Nueva Imperial",
        subtitulo: "Departamento SIG-SECPLAN",
        
        logo: {
            enabled: true,                 // Oculta o muestra el logo completo.
            archivo: "images/muni3.png",
            textoAlternativo: "Logo de la Municipalidad de Nueva Imperial",
            textoRespaldo: "MNI"           // Se muestra si la imagen no carga.
        }
    },

    /* Vista de inicio y límites de navegación. */
    mapa: {
        vistaInicial: {
            tipo: "",                 // "capa" o "centro".
            capaId: "limiteComunal",      // Se usa cuando tipo es "capa".
            centro: [-38.74, -72.95],      // Respaldo o vista de tipo "centro".
            zoom: 10,
            padding: [20, 20]   // Espacio en píxeles entre el borde del mapa y la vista inicial.
        },
        zoomMin: 8,
        zoomMax: 19
    },

    /* Fuentes cartográficas de fondo; solo una queda activa. */
    mapasBase: [
        {
            id: "osm",
            nombre: "OpenStreetMap",
            enabled: true,
            visibleInicial: true,
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            opciones: {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        },
        {
            id: "satelite",
            nombre: "Satélite",
            enabled: true,
            visibleInicial: false,
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            opciones: {
                maxZoom: 19,
                attribution: "Tiles &copy; Esri"
            }
        }
    ],

    /* Opciones generales de las herramientas del visor. */
herramientas: {
    leyenda: {
        plegable: true,                     // Permite esconderla hacia la izquierda.
        colapsadaInicial: false             // true inicia mostrando solo la pestaña.
    },
    busqueda: {
            enabled: true,                 // Muestra u oculta el buscador.
            minimoCaracteres: 2,
            maxResultados: 10,
            soloCapasVisibles: true,       // Ignora capas apagadas al buscar.
            centrarResultado: true,
            resaltarResultado: true,
            abrirPopup: true
        },
        geolocalizacion: {
            enabled: true,
            zoom: 17
        },

        coordenadasCursor: {
            enabled: true,
            geograficas: {
                enabled: true,
                decimales: 6
            },
            utm: {
                enabled: true,
                zona: 18,
                hemisferio: "S",
                decimales: 0
            }
        },

        buscarCoordenadas: {
            enabled: false,
            geograficas: true,
            utm: true,
            zonaUtm: 18,
            hemisferioUtm: "S",
            zoom: 17,
            mostrarMarcador: true,
            estiloMarcador: {
                radius: 7,
                color: "#ffffff",
                weight: 2,
                fillColor: "#e47b25",
                fillOpacity: 1
            }
        },
        
        googleMaps: {
            enabled: false,                 // Muestra u oculta la herramienta Cómo llegar.
            modoViaje: "driving"           // driving: auto; walking: a pie; bicycling: bicicleta; transit: transporte público.
        },

        descargas: {
            enabled: false,                 // Muestra u oculta el panel de descargas.
            archivos: [                   // Copie un ejemplo y quite los // para publicarlo.
                {
                     enabled: true,      // Permite retirar un archivo sin borrar su configuración.
                     titulo: "Mapa general",
                     descripcion: "Mapa preparado para impresión.",
                     fechaActualizacion: "AAAA-MM-DD",
                     archivo: "descargas/mapas/PROY.pdf"
                },
                {
                     enabled: true,
                     titulo: "Capa para Google Earth",
                     descripcion: "Información espacial para descarga.",
                     fechaActualizacion: "AAAA-MM-DD",
                     archivo: "descargas/capas/comunidades.kml"
                 }
            ]
        },

        medicion: {
            enabled: true,                 // Muestra u oculta toda la herramienta.
            distancia: true,
            superficie: true,
            estilo: {
                color: "#e47b25",
                weight: 3,
                fillColor: "#e47b25",
                fillOpacity: 0.18
            }
        }
    },

    /* Organiza visualmente las capas en el panel lateral. */
    gruposCapas: [
        {
            id: "referencia",
            nombre: "Capas de referencia",
            enabled: true,
            ordenVisual: 410                    // Debajo de las capas temáticas.
        },
        {
            id: "tematicas",
            nombre: "Capas temáticas",
            enabled: true,
            ordenVisual: 430                    // Sobre las referencias normales.
        }
    ],

    /* Capas GeoJSON y comportamiento particular de cada una. */
    capas: [
        {
            id: "limiteComunal", // Identificador único, sin espacios.
            nombre: "Límite comunal", // Nombre presentado al usuario.
            enabled: true, // Incluye o excluye completamente la capa.
            grupo: "referencia", // ID definido en gruposCapas.
            archivo: "data/limite_comunal.geojson", // Ruta exacta del archivo GeoJSON.

            visibleInicial: true, // Define si aparece activa al comenzar.
            estructural: false, // Reserva el orden superior para límites.
            minZoom: null, // Zoom mínimo visible; null sin límite.
            maxZoom: null, // Zoom máximo visible; null sin límite.
            opacityControl: false, // Muestra el control de transparencia.
            cluster: false, // Agrupa puntos cercanos.
            interactive: true, // Permite interacción con las entidades.

            metadata: {
                enabled: false,                   // Muestra el ícono de información de la capa.
                fuente: "",
                institucion: "",
                fechaActualizacion: "",
                escala: "",
                descripcion: "Límite comunal utilizado como referencia estructural del visor.",
                enlace: ""
            },
            infoPanel: {
                enabled: false,                  // Información extensa en panel lateral.
                titulo: null,
                campos: []
            },
            popup: {
                enabled: false,                  // Información breve sobre el mapa.
                titulo: null,
                campos: []
            },

            seleccion: {
                enabled: false,
                centrarAlSeleccionar: false
            },
            resaltado: {
                enabled: false,
                estilo: {
                    color: "#e47b25",
                    weight: 5,
                    fillOpacity: 0.12
                }
            },
            busqueda: {
                enabled: false,                  // Incluye la capa en el buscador.
                campoPrincipal: null,
                campos: [],
                modoResultado: "resaltar"
            },

            simbologia: {
                tipo: "simple",
                halo: {
                    enabled: true,                // Trazo inferior para fondos claros u oscuros.
                    color: "#ffffff",
                    weight: 7,
                    opacity: 0.9
                },
                estilo: {
                    color: "#17365d",
                    weight: 3,
                    opacity: 1,
                    fill: false
                }
            },
            leyenda: {
                enabled: true,
                titulo: "Límite comunal"
            },
            etiquetado: {
                enabled: false,
                campo: null,
                zoomMin: 14,
                zoomMax: null,
                permanente: true,
                claseCss: "",                   // Clase visual definida en styles.css.
                orientacion: "horizontal"       // horizontal o linea.
            }
        },
        {
            id: "sectoresRurales", // Identificador único, sin espacios.
            nombre: "Sectores rurales", // Nombre presentado al usuario.
            enabled: true, // Incluye o excluye completamente la capa.
            grupo: "referencia", // ID definido en gruposCapas.
            archivo: "data/sectores_rurales_2609.geojson", // Ruta exacta del archivo GeoJSON.

            visibleInicial: false, // Define si aparece activa al comenzar.
            estructural: false, // Reserva el orden superior para límites.
            minZoom: null, // Zoom mínimo visible; null sin límite.
            maxZoom: null, // Zoom máximo visible; null sin límite.
            opacityControl: true, // Muestra el control de transparencia.
            cluster: false, // Agrupa puntos cercanos.
            interactive: true, // Permite interacción con las entidades.

            metadata: {
                enabled: false,                   // Muestra el ícono de información de la capa.
                fuente: "",
                institucion: "",
                fechaActualizacion: "",
                escala: "",
                descripcion: "Delimitación de los sectores rurales de la comuna.",
                enlace: ""
            },
            infoPanel: {
                enabled: false,                  // Información extensa en panel lateral.
                titulo: "NOMBRE",
                campos: []
            },
            popup: {
                enabled: true,                   // Información breve sobre el mapa.
                titulo: "NOMBRE",
                campos: [
                    {
                        campo: "Shape_Area",
                        etiqueta: "Sup (m2)",
                        formato: "decimal",
                        decimales: 0,
                        sufijo: " m2"
                    }
                ]
            },

            seleccion: {
                enabled: true,
                centrarAlSeleccionar: false
            },
            resaltado: {
                enabled: true,
                estilo: {
                    color: "#555555",
                    weight: 3,
                    fillOpacity: 0.25
                }
            },
            busqueda: {
                enabled: true,                   // Incluye la capa en el buscador.
                campoPrincipal: "NOMBRE",
                campos: [],
                modoResultado: "contrasteInverso",
                estiloContrasteInverso: {
                    seleccionado: {
                        color: "#ffffff",
                        weight: 4,
                        fillOpacity: 0
                    },
                    resto: {
                        fillOpacity: 0.65
                    }
                }
            },

            simbologia: {
                tipo: "simple",
                estilo: {
                    color: "#f3f4f6",
                    weight: 1.5,
                    fillColor: "#4e401f",
                    fillOpacity: 0.5
                }
             },
            leyenda: {
                enabled: true,
                titulo: "Sectores rurales"
            },
            etiquetado: {
                enabled: true,
                campo: "NOMBRE",
                zoomMin: 14,
                zoomMax: null,
                permanente: true,
                claseCss: "etiqueta-sector",   // Clase visual definida en styles.css.
                orientacion: "horizontal"       // horizontal o linea.
            }
        },
{
    id: "Comunidades", // Identificador único, sin espacios.
    nombre: "Títulos de Merced", // Nombre presentado al usuario.
    enabled: true, // Incluye o excluye completamente la capa.
    grupo: "referencia", // ID definido en gruposCapas.
    archivo: "data/comunidades_imp_2609.geojson", // Ruta exacta del archivo GeoJSON.

    visibleInicial: false, // Define si aparece activa al comenzar.
    estructural: false, // Reserva el orden superior para límites.
    minZoom: null, // Zoom mínimo visible; null sin límite.
    maxZoom: null, // Zoom máximo visible; null sin límite.
    opacityControl: true, // Muestra el control de transparencia.
    cluster: false, // Agrupa puntos cercanos.
    interactive: true, // Permite interacción con las entidades.

    metadata: {
        enabled: true,                     // Muestra el ícono de información de la capa.
        fuente: "Corporación Nacional de Desarrollo Indígena (CONADI)",
        institucion: "CONDAI",
        fechaActualizacion: "2022-11",
        escala: "Comuna Nueva Imperial",
        descripcion: "Cobertura de comunidades con Título de Merced ubicadas en la comuna de Nueva Imperial, según información oficial de CONADI.",
        enlace: ""
    },
    infoPanel: {
        enabled: false,                    // Información extensa en panel lateral.
        titulo: "COMUNIDAD",
        campos: []
    },
    popup: {
        enabled: true,                     // Información breve sobre el mapa.
        titulo: "COMUNIDAD",
        prefijo: "Com. ",
        campos: [
                     {
                campo: "sector",
                etiqueta: "Sector",
                formato: "texto"
            },
            {
                campo: "TM",
                etiqueta: "TM",
                formato: "texto"
            }
        ]
    },

    seleccion: {
        enabled: true,
        centrarAlSeleccionar: false
    },
    resaltado: {
        enabled: true,
        estilo: {
            color: "#ffffff",
            weight: 3,
            fillOpacity: 0.30
        }
    },
    busqueda: {
        enabled: true,                     // Incluye la capa en el buscador.
        campoPrincipal: "COMUNIDAD",
        campos: ["sector"],
        modoResultado: "resaltar"          // "resaltar", "aislar" o "contrasteInverso".
    },

    simbologia: {
        tipo: "simple",
        simboloPunto: "circulo",             // Solo para puntos; "marcador" conserva el ícono.
        estilo: {
            color: "#edf1f5",
            weight: 1.5,
            fillColor: "#0d3b08",
            fillOpacity: 0.5
        }
    },
    leyenda: {
        enabled: true,
        titulo: "Comunidades"
    },
    etiquetado: {
        enabled: true,
        campo: "COMUNIDAD",
        zoomMin: 14,
        zoomMax: null,
        permanente: true,
        claseCss: "etiqueta-comunidad",        // Clase visual definida en styles.css.
        orientacion: "horizontal"               // horizontal o linea.
    }
},
{
    id: "Sedes", // Identificador único, sin espacios.
    nombre: "Sedes Rurales", // Nombre presentado al usuario.
    enabled: true, // Incluye o excluye completamente la capa.
    grupo: "tematicas", // ID definido en gruposCapas.
    archivo: "data/sedes.geojson", // Ruta exacta del archivo GeoJSON.

    visibleInicial: false, // Define si aparece activa al comenzar.
    estructural: false, // Reserva el orden superior para límites.
    minZoom: null, // Zoom mínimo visible; null sin límite.
    maxZoom: null, // Zoom máximo visible; null sin límite.
    opacityControl: false, // Muestra el control de transparencia.
    cluster: true, // Agrupa puntos cercanos.
    interactive: true, // Permite interacción con las entidades.

    metadata: {
        enabled: false,                     // Muestra el ícono de información de la capa.
        fuente: "Sedes rurales de Nueva Imperial",
        institucion: "Municipalidad Nueva Imperial",
        fechaActualizacion: "2021-11",
        escala: "",
        descripcion: "Lugares destinados a reuniones de organizaciones territoriales y/o funcionales",
        enlace: ""
    },
    infoPanel: {
        enabled: false,                    // Información extensa en panel lateral.
        titulo: "CAMPO_TITULO",
        campos: [
            {
                campo: "CAMPO",
                etiqueta: "Etiqueta",
                formato: "texto"
            }
        ]
    },
    popup: {
        enabled: true,                     // Información breve sobre el mapa.
        titulo: "",
        prefijo: "",                          // Texto opcional antes del título.
        sufijo: "",                           // Texto opcional después del título.
        campos: [
            {
                campo: "Comunidad",
                etiqueta: "Sede Com. ",
                formato: "texto"
            },
              {
                campo: "Sector",
                etiqueta: "Sector",
                formato: "texto"
            }
        ]
    },

    seleccion: {
        enabled: true,
        centrarAlSeleccionar: false
    },
    resaltado: {
        enabled: true,
        estilo: {
            color: "#ffffff",
            weight: 3,
            fillOpacity: 0.30
        }
    },
    busqueda: {
        enabled: true,                     // Incluye la capa en el buscador.
        campoPrincipal: "Comunidad",
        campos: ["Sector"],
        modoResultado: "resaltar",         // "resaltar", "aislar" o "contrasteInverso".
        estiloContrasteInverso: {
            seleccionado: { color: "#ffffff", weight: 4, fillOpacity: 0 },
            resto: { fillOpacity: 0.65 }
        }
    },

    simbologia: {
        tipo: "simple",
        simboloPunto: "circulo",            // marcador, circulo, cuadrado, triangulo o cruz.
        estilo: {
            color: "#f9f9fb",
            weight: 2,
            fillColor: "#d60606",
            fillOpacity: 0.90,
            radius: 7                         // Tamaño del símbolo puntual, excepto marcador.
        }
    },
    leyenda: {
        enabled: true,
        titulo: "Sedes rurales"
    },
    etiquetado: {
        enabled: false,
        campo: "CAMPO_ETIQUETA",
        zoomMin: 14,
        zoomMax: null,
        permanente: true,
        claseCss: "etiqueta-punto",             // Clase visual definida en styles.css.
        orientacion: "horizontal"               // horizontal o linea.
    }
},
{
    id: "Globales", // Identificador único, sin espacios.
    nombre: "Conservación Global", // Nombre presentado al usuario.
    enabled: true, // Incluye o excluye completamente la capa.
    grupo: "tematicas", // ID definido en gruposCapas.
    archivo: "data/globales_2026.geojson", // Ruta exacta del archivo GeoJSON.

    visibleInicial: true, // Define si aparece activa al comenzar.
    estructural: false, // Reserva el orden superior para límites.
    minZoom: null, // Zoom mínimo visible; null sin límite.
    maxZoom: null, // Zoom máximo visible; null sin límite.
    opacityControl: true, // Muestra el control de transparencia.
    cluster: false, // Agrupa puntos cercanos.
    interactive: true, // Permite interacción con las entidades.

    metadata: {
        enabled: true,                     // Muestra el ícono de información de la capa.
        fuente: "Ministerio Obras Públicas, Dirección de Vialidad, Departamento de Estudios y Planificación, Unidad de Planificación Territorial",
        institucion: "Ministerio de Obras Públicas",
        fechaActualizacion: "2026-09",
        escala: "",
        descripcion: "Coberturas de Contratos de Conservación Global Mixto por Nivel de Servicios y por Precios Unitarios de Caminos de la Provincia de Cautín, en ejecución en la comuna de Nueva Imperial.",
        camposAdicionales: [],              // Información manual: { etiqueta: "...", valor: "..." }.
        estadisticas: [                     // Cálculos automáticos sobre toda la capa.
            {
                operacion: "suma",          // Por ahora se admite suma.
                campo: "long_km",           // Campo numérico que se calculará.
                etiqueta: "Kilómetros totales en Nueva Imperial",
                factor: 1,                  // 1 mantiene km; 0.001 convertiría metros a km.
                decimales: 2,               // Redondeo aplicado al resultado final.
                sufijo: " km"               // Unidad mostrada después del valor.
            }
        ],
        enlace: ""
    },
    infoCategorias: {
        enabled: true,                     // Muestra información común junto a cada categoría.
        mostrarCantidad: false,             // Calcula automáticamente las entidades del grupo.
        etiquetaCantidad: "Cantidad de tramos", // Nombre que acompaña al total calculado.
        camposAdicionales: [],              // Información manual común a todas las categorías.
        campos: [                          // Campos que se resumen dentro de la categoría.
            { campo: "empresa_01", etiqueta: "Empresa contratista", formato: "texto" },
            { campo: "f_inicio", etiqueta: "Fecha de inicio", formato: "texto" },
            { campo: "f_termino", etiqueta: "Fecha de término", formato: "texto" },
            { campo: "monto", etiqueta: "Presupuesto total ($)", formato: "texto" }
        ],
        estadisticas: [                     // Cálculos sobre los caminos de cada categoría.
            {
                operacion: "suma",          // Por ahora se admite suma.
                campo: "long_km",           // Campo numérico que se sumará.
                etiqueta: "Longitud total del Global en  Nueva Imperial",
                factor: 1,                  // El campo ya está expresado en kilómetros.
                decimales: 2,               // Redondeo aplicado después de sumar.
                sufijo: " km"               // Unidad mostrada después del valor.
            }
        ]
    },
    infoPanel: {
        enabled: false,                    // Información extensa en panel lateral.
        titulo: "nombre",
        campos: [
            {
                campo: "empresa_01",
                etiqueta: "Empresa contratista ",
                formato: "texto"
            },
             {
                campo: "f_inicio",
                etiqueta: "Fecha inicio: ",
                formato: "texto"
            },
             {
                campo: "f_termino",
                etiqueta: "Fecha término: ",
                formato: "texto"
            },
             {
                campo: "monto",
                etiqueta: "Presupuesto Total ($): ",
                formato: "texto"
            }
        ]
    },
    popup: {
        enabled: true,                     // Información breve sobre el mapa.
        titulo: "NOMBREFEMN",
        prefijo: "Camino ",                          // Texto opcional antes del título.
        sufijo: "",                           // Texto opcional después del título.
        campos: [
            {
                campo: "ROL",
                etiqueta: "Rol  ",
                formato: "texto"
            },
          {
                campo: "CARPETA",
                etiqueta: "Carpeta  ",
                formato: "texto"
            },
            {
                campo: "long_km",
                etiqueta: "Longitud",
                formato: "decimal",         // Presenta y redondea un valor numérico.
                factor: 1,                  // Mantiene kilómetros; 0.001 convertiría m a km.
                decimales: 2,               // Cantidad de decimales visibles.
                sufijo: " km"               // Unidad mostrada después del valor.
            }
        ]
    },

    seleccion: {
        enabled: true,
        centrarAlSeleccionar: false
    },
    resaltado: {
        enabled: true,
        estilo: {
            color: "#ffffff",
            fillColor: "#f28c28",
            weight: 6,
            opacity: 1,
            fillOpacity: 0.45,
            radius: 10
        }
    },
    busqueda: {
        enabled: true,                     // Incluye la capa en el buscador.
        campoPrincipal: "nombre",
        campos: [""],
        modoResultado: "aislar",         // "resaltar", "aislar" o "contrasteInverso".
        estiloContrasteInverso: {
            seleccionado: { color: "#ffffff", fillColor: "#f28c28", weight: 5, opacity: 1, fillOpacity: 0 },
            resto: { opacity: 0.25, fillOpacity: 0.65 }
        }
    },

    simbologia: {
        tipo: "valoresUnicos",
        campo: "nombre",
        filtroCategorias: {
            enabled: true,                          // Permite activar o desactivar categorías.
            mostrarTodas: true,                    // Muestra los botones Todas y Ninguna.
            abiertoInicial: true                   // Abre el listado al iniciar.
        },
        estiloBase: {
            weight: 4,
            opacity: 1,
            lineCap: "round"
        },
    
        categorias: [
            {
                valor: "ALMAGRO - PUERTO DOMINGUEZ",
                etiqueta: "ALMAGRO - PUERTO DOMINGUEZ",
                visibleInicial: true,               // Estado inicial de esta categoría.
                estilo: { color: "#ed8c1e" }
            },
            {
                valor: "CENTRAL ETAPA I",
                etiqueta: "CENTRAL ETAPA I",
                visibleInicial: true,               // Estado inicial de esta categoría.
                estilo: { color: "#75a80e" }
            },
            {
                valor: "HUAMAQUI ETAPA III",
                etiqueta: "HUAMAQUI ETAPA III",
                visibleInicial: true,               // Estado inicial de esta categoría.
                estilo: { color: "#2fd7cc" }
            },
            {
                valor: "SECTOR CAUTÍN, ETAPA IV",
                etiqueta: "SECTOR CAUTÍN, ETAPA IV",
                visibleInicial: true,               // Estado inicial de esta categoría.
                estilo: { color: "#480ac4" }
            },
            {
                valor: "SECTOR CHOL CHOL ORIENTE ETAPA I",
                etiqueta: "SECTOR CHOL CHOL ORIENTE ETAPA I",
                visibleInicial: true,               // Estado inicial de esta categoría.
                estilo: { color: "#c65bbb" }
            },
            {
                valor: "SECTOR COSTA ETAPA II",
                etiqueta: "SECTOR COSTA ETAPA II",
                visibleInicial: true,               // Estado inicial de esta categoría.
                estilo: { color: "#39050e" }
            }
        ],
        mostrarNoConfigurados: false,              // Oculta valores sin categoría definida.
        estiloDefault: { color: "#9e9e9e" },
        etiquetaDefault: "Sin información u otros",
        mostrarDefaultEnLeyenda: false
    },
    leyenda: {
        enabled: true,
        titulo: "Globales"
    },
    etiquetado: {
        enabled: true,
        campo: "N_MOP",
        zoomMin: 14,
        zoomMax: null,
        permanente: true,
        claseCss: "etiqueta-via",               // Estilo sin caja para caminos.
        orientacion: "horizontal"                    // horizontal o linea; linea sigue un tramo recto local.
    }
}

    ]
};

/*
PLANTILLA PARA AGREGAR UNA CAPA NUEVA
Copie este objeto dentro de appConfig.capas y complete sus valores.

{
    id: "idCapa",                          // Identificador único, sin espacios.
    nombre: "Nombre visible",              // Nombre presentado al usuario.
    enabled: true,                          // Incluye o excluye completamente la capa.
    grupo: "tematicas",                    // Debe existir en gruposCapas.
    archivo: "data/archivo.geojson",       // Ruta exacta del archivo GeoJSON.

    visibleInicial: false,                  // Estado del checkbox al iniciar.
    estructural: false,                     // Use true para límites siempre visibles.
    minZoom: null,                         // Zoom mínimo visible; null sin límite.
    maxZoom: null,                         // Zoom máximo visible; null sin límite.
    opacityControl: true,                  // Muestra el control de transparencia.
    cluster: false,                        // Use true solamente en capas de puntos.
    interactive: true,                     // Permite interacción con las entidades.

    metadata: {
        enabled: true,                     // Muestra el ícono de información de la capa.
        fuente: "Nombre de la fuente",
        institucion: "Institución responsable",
        fechaActualizacion: "AAAA-MM-DD",
        escala: "Escala o precisión de origen",
        descripcion: "Descripción breve del dataset.",
        enlace: ""
    },

    infoCategorias: {
        enabled: false,                    // Solo para simbología por valores únicos.
        mostrarCantidad: true,             // Cuenta las entidades de cada categoría.
        etiquetaCantidad: "Cantidad de entidades",
        campos: [
            { campo: "CAMPO_COMUN", etiqueta: "Dato común", formato: "texto" }
        ]
    },

    infoPanel: {
        enabled: false,                    // Información extensa de una entidad.
        titulo: "CAMPO_TITULO",
        campos: [
            {
                campo: "CAMPO",
                etiqueta: "Etiqueta",
                formato: "texto"
            }
        ]
    },

    popup: {
        enabled: true,                     // Información breve sobre el mapa.
        titulo: "CAMPO_TITULO",
        prefijo: "",                          // Texto opcional antes del título.
        sufijo: "",                           // Texto opcional después del título.
        campos: [
            {
                campo: "CAMPO",
                etiqueta: "Etiqueta",
                formato: "texto"
            },
            {
                campo: "Shape_Area",
                etiqueta: "Sup (m2)",
                formato: "decimal",
                decimales: 0,
                sufijo: " m2"
            }
        ]
    },

    seleccion: {
        enabled: true,                     // Permite seleccionar la entidad.
        centrarAlSeleccionar: false        // Centra el mapa después del clic.
    },

    resaltado: {
        enabled: true,                     // Destaca temporalmente la entidad.
        estilo: {
            color: "#ffffff",
            fillColor: "#f28c28",
            weight: 3,
            opacity: 1,
            fillOpacity: 0.45,
            radius: 10
        }
    },

    busqueda: {
        enabled: true,                     // Incluye la capa en el buscador.
        campoPrincipal: "CAMPO_PRINCIPAL",
        campos: ["CAMPO_SECUNDARIO"],
        modoResultado: "resaltar",         // "resaltar", "aislar" o "contrasteInverso".
        estiloContrasteInverso: {
            seleccionado: { color: "#ffffff", fillColor: "#f28c28", weight: 4, opacity: 1, fillOpacity: 0 },
            resto: { opacity: 0.25, fillOpacity: 0.65 }
        }
    },

    simbologia: {
        tipo: "simple",                    // simple, valoresUnicos o graduados.
        estilo: {
            color: "#3388ff",
            weight: 2,
            fillColor: "#3388ff",
            fillOpacity: 0.20
        }
    },

    leyenda: {
        enabled: true,                     // Incluye la capa en la leyenda.
        titulo: "Nombre en leyenda"        // Título mostrado en la leyenda.
    },

    etiquetado: {
        enabled: false,                    // Activa las etiquetas de esta capa.
        campo: "CAMPO_ETIQUETA",           // Campo usado como texto.
        zoomMin: 14,                       // Zoom mínimo para mostrar etiquetas.
        zoomMax: null,                     // Zoom máximo; null sin límite.
        permanente: true,                  // true fija; false muestra al apuntar.
        claseCss: "etiqueta-personalizada",     // Clase opcional definida en styles.css.
        orientacion: "horizontal"               // horizontal o linea; linea es solo para geometrías lineales.
    }
}

EJEMPLO DE SIMBOLOGÍA POR VALORES ÚNICOS
Reemplace el bloque simbologia de la capa por una estructura como esta:
Use fillColor en polígonos y puntos circulares; use color en líneas.

simbologia: {
    tipo: "valoresUnicos",
    campo: "CAMPO_CATEGORIA",
    simboloPunto: "circulo",               // marcador, circulo, cuadrado, triangulo o cruz.
    filtroCategorias: {
        enabled: true,                      // Permite activar o desactivar categorías.
        mostrarTodas: true,                // Muestra los botones Todas y Ninguna.
        abiertoInicial: true               // Abre el listado al iniciar.
    },
    estiloBase: {
        color: "#ffffff",
        weight: 1,
        fillOpacity: 0.60
    },
    categorias: [
        {
            valor: "VALOR_A",
            etiqueta: "Categoría A",
            visibleInicial: true,           // Estado inicial de esta categoría.
            informacion: {                 // Texto editorial opcional de la categoría.
                descripcion: "Descripción opcional.",
                enlace: "",
                textoEnlace: "Más información"
            },
            estilo: { fillColor: "#2f7d32" }
        },
        {
            valor: "VALOR_B",
            etiqueta: "Categoría B",
            visibleInicial: true,           // Estado inicial de esta categoría.
            estilo: { fillColor: "#7b4ab5" }
        }
    ],
    mostrarNoConfigurados: true,           // false oculta valores sin categoría.
    estiloDefault: { fillColor: "#9e9e9e" },
    etiquetaDefault: "Sin información u otros",
    mostrarDefaultEnLeyenda: true
}

EJEMPLO DE SIMBOLOGÍA POR COLORES GRADUADOS
Cada clase excluye min e incluye max; use max: null en la última clase.
Use fillColor en polígonos y puntos circulares; use color en líneas.

simbologia: {
    tipo: "graduados",
    campo: "CAMPO_NUMERICO",
    simboloPunto: "circulo",               // marcador, circulo, cuadrado, triangulo o cruz.
    valoresSinDatos: [0, null, ""],
    estiloBase: {
        color: "#ffffff",
        weight: 1,
        fillOpacity: 0.65
    },
    clases: [
        {
            min: 0,
            max: 50,
            etiqueta: "1–50",
            estilo: { fillColor: "#eff3ff" }
        },
        {
            min: 50,
            max: 100,
            etiqueta: "51–100",
            estilo: { fillColor: "#6baed6" }
        },
        {
            min: 100,
            max: null,
            etiqueta: "Más de 100",
            estilo: { fillColor: "#08519c" }
        }
    ],
    estiloDefault: { fillColor: "#bdbdbd" },
    etiquetaDefault: "Sin información",
    mostrarDefaultEnLeyenda: true
}
*/
