# Parcial de Calidad de Software Avanzado

## PARTE 1 – ESTRATEGIA

### 1. Diferencia entre CI y CD

**Continuous Integration (CI):**
- Automatiza la integración de cambios en un repositorio compartido.
- Se ejecuta en cada push o pull_request.
- Valida que el código compila, los tests pasan y cumple estándares de calidad (linting).
- Objetivo: detectar problemas tempranamente en el desarrollo.
- En este proyecto: checkout → install → lint → build → test → coverage.

**Continuous Deployment/Delivery (CD):**
- Automatiza la entrega o despliegue del código a producción.
- Se ejecuta después de que CI pasa exitosamente.
- Requiere aprobación manual (CD) o es automático (Continuous Deployment).
- Objetivo: llevar código validado a usuarios finales.
- En este proyecto: no implementado (se enfoca en CI).

---

### 2. Herramientas Seleccionadas

#### Lenguaje: **JavaScript (Node.js)**
**Justificación:**
- Ecosistema maduro con herramientas estándares.
- Fácil configuración de linters, tests y cobertura.
- Ideal para proyectos pequeños/medianos.

#### Linter: **ESLint**
**Justificación:**
- Estándar de facto en JavaScript.
- Altamente configurable (reglas de estilo, calidad de código).
- Integración fácil con GitHub Actions.
- Detecta: variables no usadas, inconsistencias de sintaxis, errores lógicos comunes.
- Configuración: `.eslintrc.json` con reglas estrictas (indentación, comillas, semicolons, eqeqeq).

#### Framework de Tests: **Jest**
**Justificación:**
- Framework oficial recomendado por Meta.
- Incluye cobertura nativa (no necesita herramienta externa).
- Sintaxis clara y setup automático.
- Excelente para tests unitarios.

#### Cobertura: **Jest (integrado)**
**Justificación:**
- Jest incluye soporte nativo para reportes de cobertura vía Istanbul.
- Genera reportes en JSON, HTML, LCOV.
- Permite fijar umbrales mínimos en `jest.config.js`.

---

### 3. Umbral Mínimo de Cobertura: **80%**

**Justificación:**
- **70% es insuficiente:** Deja demasiado código sin probar; riesgos de bugs en producción.
- **90% es excesivo:** Requiere cobertura de edge cases complejos; retorna decreciente en tiempo vs. calidad.
- **80% es óptimo:**
  - Cubre funciones principales y caminos críticos.
  - Permite edge cases documentados sin pruebas.
  - Equilibrio entre calidad y productividad.
  - Métrica estándar en industria (recomendado por Google, Microsoft).

**Métrica definida en `jest.config.js`:**
```javascript
coverageThreshold: {
  global: {
    lines: 80,
    functions: 80,
    branches: 80,
    statements: 80
  }
}
```

Esto significa:
- **80% de líneas ejecutadas.**
- **80% de funciones llamadas.**
- **80% de branches (if/else) probados.**
- **80% de statements evaluados.**

---

## Resumen

| Aspecto | Selección | Justificación |
|--------|-----------|---------------|
| Lenguaje | JavaScript | Ecosistema maduro, herramientas estándares |
| Linter | ESLint | Configurable, detección temprana de errores |
| Tests | Jest | Oficial, cobertura integrada, sintaxis clara |
| Cobertura | Jest (Istanbul) | Nativa, umbrales configurables |
| Umbral | 80% | Óptimo: calidad + productividad |

---

## PARTE 2 – WORKFLOW CI/CD

Ver archivo `.github/workflows/ci-quality.yml`.

### Pasos del Workflow

1. **Checkout**: Obtiene el código del repositorio.
2. **Setup Node.js**: Instala Node 18.
3. **Install dependencies**: `npm ci` (instalación reproducible).
4. **Run linter**: `npm run lint` - Valida estándares de código.
   - Falla si: variables no usadas, semicolons faltantes, uso de `==` en lugar de `===`.
5. **Build project**: `npm run build` - Verifica que compila.
6. **Run tests**: `npm test` - Ejecuta todos los tests.
   - Falla si: algún test no pasa.
7. **Generate coverage report**: `npm run test:cov` - Genera reporte de cobertura.
8. **Validate coverage threshold**: Verifica cobertura ≥ 80%.
   - Falla si: cobertura < 80%.
9. **Upload coverage to artifacts**: Guarda reporte para revisión.

### Configuración Crítica

- **`continue-on-error: false`**: Detiene el workflow si algún paso falla.
- **Activación**: Push a `main` o `develop`, y Pull Requests.
- **Resultado**: PR rechazado (❌) si falla; aprobado (✅) si todo pasa.

---

## PARTE 3 – NEKTOS/ACT

### ¿Qué es `act`?

`act` es una herramienta que **ejecuta workflows de GitHub Actions localmente** dentro de un contenedor Docker.

**Propósito:**
- Probar el workflow antes de hacer push a GitHub.
- Verificar que pasos específicos funcionan en tu máquina.
- Ahorrar GitHub Actions minutes.

**Cómo funciona:**
1. Lee el archivo `.github/workflows/*.yml`.
2. Simula el entorno de GitHub Actions.
3. Ejecuta pasos dentro de un contenedor Docker.
4. Muestra output en tiempo real.

### Requisitos

- **Docker Desktop** (instalar desde https://www.docker.com/products/docker-desktop)
  - Asegurarse de que Docker está corriendo (icono en system tray).
- **act CLI** (en Windows):
  ```powershell
  # Opción 1: Con Chocolatey
  choco install act-cli
  
  # Opción 2: Descargar manualmente
  # https://github.com/nektos/act/releases → act_Windows_x86_64.zip
  # Extraer y agregar a PATH
  ```

### Comandos para Ejecutar

```bash
# Ver qué workflows hay disponibles
act --list

# Ejecutar workflow específico
act -j quality

# Ejecutar con output verboso
act -j quality -v

# Simular push a rama específica
act push -b main

# Ejecutar workflow sin usar caché
act -j quality --no-cache
```

**Ejemplo:**
```powershell
cd c:\Users\POWER\Desktop\ParcialQA
act -j quality -v
```

**Output esperado:**
```
[CI Quality Pipeline/quality] 🚀 Start job 'quality'
[CI Quality Pipeline/quality] 🐳 Docker pull `node:18-alpine`
[CI Quality Pipeline/quality] 🐳 docker run ... (containers running)
[CI Quality Pipeline/quality] ✅ Checkout code
[CI Quality Pipeline/quality] ✅ Setup Node.js
[CI Quality Pipeline/quality] ✅ Install dependencies
[CI Quality Pipeline/quality] ✅ Run linter
[CI Quality Pipeline/quality] ✅ Build project
[CI Quality Pipeline/quality] ✅ Run tests
[CI Quality Pipeline/quality] ✅ Generate coverage report
[CI Quality Pipeline/quality] ✅ Validate coverage threshold
[CI Quality Pipeline/quality] ✅ Upload coverage to artifacts
[CI Quality Pipeline/quality] ✅ Job 'quality' succeeded
```

---

## PARTE 4 – VALIDACIÓN Y LOGS

### Cómo Identificar Fallos en Logs

#### **Fallo 1: ESLint (Linter)**

**En logs local (`npm run lint`):**
```
  src/calculator.js
    12:10  error  'temp' is assigned a value but never used  no-unused-vars
    45:5   error  Missing semicolon                          semi
```

**En GitHub Actions:**
1. Ir a Actions → workflow run → expandir "Run linter"
2. Buscar palabra clave: `error`
3. Ver línea exacta y regla violada.

**Solución:**
```bash
npm run lint:fix  # Arreglar automáticamente
```

---

#### **Fallo 2: Tests (Jest)**

**En logs local (`npm test`):**
```
● Calculator Functions › add › should add zero

  expect(received).toBe(expected)
  
  Expected: 5
  Received: 6
  
   12 |    test('should add zero', () => {
   13 |      expect(add(0, 5)).toBe(5);
       |                       ^
```

**En GitHub Actions:**
1. Ver step "Run tests"
2. Buscar: `FAIL` o `●` (punto negro = test fallido)
3. Identificar test name + assertion.

**Solución:**
1. Corregir lógica en `src/`
2. Actualizar test si el comportamiento es correcto
3. Reejecutar: `npm test`

---

#### **Fallo 3: Cobertura < 80%**

**En logs local (`npm run test:cov`):**
```
Statements   : 60% ( 24/40 )  ← DEBAJO DEL UMBRAL
Branches     : 55% ( 10/18 )
Functions    : 70% ( 5/7 )
Lines        : 65% ( 26/40 )

Coverage is below 80% threshold
exit code: 1
```

**En GitHub Actions:**
1. Ver step "Validate coverage threshold"
2. Buscar: `Coverage is below 80%`
3. Revisar `coverage/lcov-report/index.html` en artifacts.

**Solución:**
1. Analizar qué líneas no están cubiertas: `npm run test:cov`
2. Ver archivo: `coverage/lcov-report/index.html`
3. Escribir tests adicionales para esas líneas.

---

### Comparar: Run Exitoso vs Fallido

| Aspecto | ✅ EXITOSO | ❌ FALLIDO |
|---------|-----------|-----------|
| Tests | All passed | ✗ X failed |
| Cobertura | 100% >= 80% | 60% < 80% |
| Linter | 0 errors | 3+ errors |
| GitHub badge | ✅ | ❌ |
| Merge habilitado | Sí | No |
| Logs | "successfully" | "exit code: 1" |

**Logs completos ver:**
- `LOGS_EXITOSO.txt`: Ejemplo de run correcto.
- `LOGS_FALLIDO.txt`: Ejemplo de run fallido + causas.

---

## PARTE 5 – DETECCIÓN DE CÓDIGO GENERADO POR IA

### Método 1: Herramientas Online de IA Detection

**Herramientas:**
1. **GPTZero** (https://www.gptzero.me/)
   - Diseñada para detectar contenido ChatGPT.
   - Funciona subiendo texto.
   - Limitaciones: falsos positivos en código repetitivo.

2. **Copyleaks** (https://www.copyleaks.com/)
   - Detecta IA (ChatGPT, Gemini, Claude).
   - API para integración.
   - Más preciso que GPTZero.

3. **Turnitin** (https://www.turnitin.com/)
   - Estándar académico.
   - Detecta IA y plagio.
   - Integración con LMS.

### Método 2: Análisis Manual

**Indicadores de código generado por IA:**
- Comentarios excesivamente genéricos.
- Nombres de variables inconsistentes.
- Patrones repetitivos innecesarios.
- Falta de edge cases manejados.
- Código "demasiado perfecto" (sin evolución iterativa).

### ¿Por qué no es 100% seguro?

1. **IA Evoluciona:** Modelos nuevos generan código menos predecible.
2. **Alineación con Humanos:** Prompt bien diseñado genera código "natural".
3. **Falsos Positivos:** Código legítimo puede parecer generado (patrones estándares).
4. **Falsos Negativos:** Código generado puede parecer manual si se edita después.
5. **Ambigüedad Legal:** ¿Dónde termina "inspiración" y comienza "generación"?

### Políticas Razonables de IA en Educación

1. **Transparencia Obligatoria:**
   - Declarar si se usó IA (ChatGPT, GitHub Copilot, etc.).
   - Incluir prompts y outputs en documentación.

2. **Uso Permitido (Asistencia):**
   - Explicar conceptos.
   - Sugerir arquitectura (no código).
   - Revisar y refactorizar código manual.
   - Debugging (encontrar errores en código propio).

3. **Uso Prohibido (Generación):**
   - Generar código completo de funciones.
   - Generar tests sin entender qué prueban.
   - Submeter código generado como propio.

4. **Validación:**
   - Usar herramientas de detección (GPTZero, Copyleaks).
   - Evaluar proceso de desarrollo (logs, commits).
   - Conducta ante fallos: estudiante debe explicar/defender.

5. **Educación sobre IA:**
   - Enseñar cuándo IA es herramienta vs. sustituto.
   - Debate ético: beneficios vs. riesgos.
   - Mentalidad crítica: validar outputs de IA.

---

## Conclusión

Este proyecto demuestra un pipeline CI/CD completo con:
- **Linting automático** para calidad.
- **Pruebas unitarias** para funcionalidad.
- **Cobertura de código** para completitud.
- **Ejecución local con act** para feedback rápido.
- **Transparencia en logs** para debugging.

Todo implementado sin IA para generar código, respetando principios de ética académica.

