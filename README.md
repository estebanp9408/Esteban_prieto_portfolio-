 Portfolio Web – Esteban Prieto

Demo en vivo: https://estebanp9408.github.io/Esteban_prieto_portfolio-/

 Descripción

Este proyecto es un portafolio web desarrollado con JavaScript vanilla, enfocado en construir una interfaz dinámica basada en datos sin el uso de frameworks.

El objetivo es aplicar principios de arquitectura frontend moderna, como la separación de responsabilidades, la reutilización de componentes y el renderizado dinámico del DOM.


 Enfoque de desarrollo

El proyecto sigue una estructura modular donde:
	•	La UI se genera dinámicamente a partir de objetos de datos
	•	Se utilizan templates HTML reutilizables (<template>)
	•	La lógica de render está desacoplada de la lógica de navegación
	•	Se implementa una arquitectura basada en clases

 Tecnologías utilizadas
	•	HTML5
	•	CSS3
	•	JavaScript (ES6+)
	•	Manipulación del DOM
	•	Programación orientada a objetos


 Arquitectura

  Componentes principales

Section
Clase encargada de renderizar listas dinámicas en el DOM a partir de un array de datos y una función renderer.

Templates HTML
Se utilizan múltiples <template> para representar unidades reutilizables:
	•	Template de sección (estructura base)
	•	Template de skills (items simples)
	•	Template de languages (items compuestos)
	•	Template de tarjetas (cards)


 Estructura de datos

El render está basado en objetos JavaScript estructurados, por ejemplo:
	•	Arrays simples para listas (skills)
	•	Arrays de objetos para datos compuestos (languages)
	•	Objetos con múltiples propiedades para tarjetas (contact)



 Controlador

El archivo principal actúa como controlador de la aplicación:
	•	Decide qué se renderiza
	•	Maneja la navegación entre vistas
	•	Controla eventos globales (como el botón “volver”)



 Flujo de render
	1.	Se definen los datos en JavaScript
	2.	Se instancia la clase Section
	3.	Se utiliza una función renderer para transformar cada item en un nodo DOM
	4.	Los elementos se insertan dinámicamente en el contenedor

 Objetivo
	•	Fortalecer fundamentos de JavaScript sin frameworks
	•	Entender cómo funcionan internamente librerías modernas como React
	•	Construir una base sólida para escalar a arquitecturas más complejas

 Próximos pasos
	•	Mejorar la navegación entre secciones
	•	Implementar manejo de estado más estructurado
	•	Optimizar estilos y diseño responsive
	•	Migrar a un framework como React manteniendo la lógica de componente

 Autor

Esteban Prieto
Desarrollador web en formación con background en gastronomía, enfocado en crear soluciones funcionales y bien estructuradas.
