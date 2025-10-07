Para esta tarea con react desarrollé una página dinámica con react y vite que funciona de forma parecida aunque simplificada como los servicios web para hacer diagramas.
Básicamente permite crear nodos, moverlos por un lienzo, cambiarles el texto que contienen y enlazarlos entre sí como gustes.

<img width="870" height="79" alt="image" src="https://github.com/user-attachments/assets/455c9fe6-2617-4ab3-ba6b-e3bde9aa9b34" />

Hay una barra de herramientas arriba con las opciones Añadir Nodo, Enlazar, Desconectar y Exportar; y un lienzo donde puedes mover y editar el diagrama.

Al ingresar a la página ya habrán dos nodos inconexos por defecto.

La función de enlazar nodos funciona de manera muy sencilla. Los últimos dos nodos a los que se les dió click se verán resaltados en azul y rojo. El rojo es el último seleccionado, el que fue clickeado más reciente, el azul es el segundo ultimo nodo seleccionado
la línea se creará al pulsar el boton de conectar nodos entre estos dos nodos resaltados con una flecha apuntando al nodo rojo (el último seleccionado).

Antes de enlazar

<img width="650" height="458" alt="image" src="https://github.com/user-attachments/assets/7923faf5-7dd8-42af-aa63-348916f24ee3" />

Después de enlazar

La función de desconectar desconecta también de forma bidireccional, eso quiere decir que si Un nodo A estaba relacionado con B y también B con A, al desvincularlos se eliminaran las varias conexiones que haya entre esos dos nodos en caso de que haya más de una.

<img width="396" height="234" alt="image" src="https://github.com/user-attachments/assets/54660326-d8a1-45c5-a901-f156f694806e" />

Nodos conectados en doble sentido

<img width="650" height="347" alt="image" src="https://github.com/user-attachments/assets/0c2789f7-3a47-4a54-8c2a-2e6d5c2d5764" />

Ambas lineas desconectadas con un solo uso de desconectar

El código del proyecto esta separado por componentes, hooks y types. Cada directorio tiene su utilidad como la de guardar específicamente la disposición de los botones o funciones más básicas que tienen que ver más con la lógica del programa y menos que ver con react como es el caso del contenido en hooks.
El archivo TSX llamado App que esta fuera de estos directorios es el que maneja (manda a llamar de los demás) todas las funciones y la interactividad de la página. Contiene la disposición de los botones y el lienzo.

Los componentes de Nodo y Conector tienen sus propios Css para mostrar las flechas y el contorno de colores de los nodos

<img width="174" height="308" alt="{833A45E8-EB48-4E21-B388-C71CADFE05DD}" src="https://github.com/user-attachments/assets/a54fa93a-1e1e-482b-98a8-28bd67fc0dff" />


En cuanto al despligue, usé una librería llamada html2canvas, sirve para exportar el diagrama a pdf, ya esta incluida en los archivos de configuración del proyecto así que hacer install debería instalar todo incluyendo esta librería extra aparte de todas las dependencias de vite y react

<img width="343" height="174" alt="{AA221BF3-DC7E-4E99-82B0-6231ECB6EE4F}" src="https://github.com/user-attachments/assets/029eb110-514f-4c92-b1d6-a40dd69c9c53" />


Si quieres correrlo de forma local puedes hacer la build o correrlo en el entorno de desarrollo según lo que prefieras. En railway no fue necesario hacer ningún cambio. Simplemente le dices que construya la página a partir de este repositorio y funciona







