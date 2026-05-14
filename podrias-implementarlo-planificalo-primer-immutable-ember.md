# Plan: Fix About Me Section Rendering

## Context

La sección "About Me" muestra 4 cards vacías en lugar de una sola card con todo el contenido.
La causa es una cadena de tres bugs relacionados:

1. `ProfileData.js` exporta un **objeto plano** `{}`, pero `Section._normalizeItems()` llama `Object.values()` sobre él → devuelve 4 valores sueltos (2 strings + 2 arrays) en lugar de 1 objeto completo.
2. `AboutMe.js` recibe esos valores sueltos, intenta desestructurarlos como objeto → todo `undefined`.
3. `AboutMe.getTemplate()` nunca puebla las listas de skills ni languages (el código no existe todavía).

## Archivos a modificar

| Archivo | Cambio |
|---|---|
| `data/ProfileData.js` | Envolver el objeto en un array |
| `components/AboutMe.js` | Poblar las listas de skills y languages en `getTemplate()` |
| `index.html` | Corregir `</section>` → `</div>` dentro del template (tag mal cerrado) |

---

## Cambio 1 — `data/ProfileData.js`

Envolver el objeto exportado en un array para que `Section._normalizeItems()` tome la rama `Array.isArray` y pase el objeto completo al constructor de `AboutMe`.

```js
const aboutData = [{   // ← añadir [ y ]
  title: "Web developer",
  description: "Desarrollador web en formación...",
  skills: ["HTML5", "CSS3", "JavaScript", "Git", "GitHub", "Figma"],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés",  level: "B2" },
    { name: "Francés", level: "B2" }
  ]
}];
export default aboutData;
```

---

## Cambio 2 — `components/AboutMe.js`

Añadir la lógica de populado de `skills` y `languages` dentro de `getTemplate()`.
No se necesita cambiar el constructor ni la firma.

```js
getTemplate() {
  const templateContent = this._template.content.firstElementChild.cloneNode(true);

  templateContent.querySelector('.about-me__title').textContent = this._title;
  templateContent.querySelector('.about-me__description').textContent = this._description;

  // Poblar lista de skills
  const skillsList = templateContent.querySelector('.about-me__skills-list');
  this._skills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    skillsList.append(li);
  });

  // Poblar lista de languages
  const languagesList = templateContent.querySelector('.about-me__languages-list');
  this._languages.forEach(({ name, level }) => {
    const li = document.createElement('li');
    li.textContent = `${name} — ${level}`;
    languagesList.append(li);
  });

  return templateContent;
}
```

---

## Cambio 3 — `index.html` (línea 95)

Corregir tag mal cerrado dentro del `<template id="about-me__template">`:

```html
<!-- ANTES -->
  </section>
</template>

<!-- DESPUÉS -->
  </div>
</template>
```

---

## Flujo resultante después del fix

```
Click "About Me"
  → config.data = [{ title, description, skills, languages }]  (array con 1 obj)
  → _normalizeItems → Array.isArray → devuelve el array tal cual
  → forEach itera 1 vez con el objeto completo
  → new AboutMe({ title, description, skills, languages }, "#about-me__template")
  → constructor desestructura correctamente
  → getTemplate() puebla título, descripción, 6 skills, 3 idiomas
  → 1 card con todo el contenido renderizada
```

## Verificación

1. Abrir `index.html` en el navegador (con servidor local o Live Server).
2. Clickear "About Me" en la navegación.
3. Verificar que aparece **1 sola sección** con:
   - Título: "Web developer"
   - Descripción: el párrafo completo
   - Lista Skills: HTML5, CSS3, JavaScript, Git, GitHub, Figma
   - Lista Languages: Español — Nativo, Inglés — B2, Francés — B2
4. Clickear "Projects" y verificar que las 3 cards siguen funcionando sin regresión.
