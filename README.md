# Parcial QA - CI/CD Pipeline

## Descripción

Este proyecto implementa un pipeline de **Continuous Integration (CI)** en JavaScript usando GitHub Actions, con validación automática de:
- **Linting** (ESLint): Calidad y consistencia de código.
- **Pruebas unitarias** (Jest): Funcionalidad correcta.
- **Cobertura de código** (Jest/Istanbul): Mínimo 80% de cobertura.
- **Build**: Compilación exitosa.

El pipeline falla si cualquier etapa no cumple los criterios.

---

## Requisitos

- **Node.js** 18+ 
- **npm** 8+
- **Docker** (para ejecutar localmente con nektos/act)

---

## Instalación

```bash
# Clonar el repositorio
git clone <URL_REPOSITORIO>
cd ParcialQA

# Instalar dependencias
npm install
```

---

## Ejecución Local

### Opción 1: Ejecutar manualmente

```bash
# Linting
npm run lint

# Tests
npm test

# Cobertura
npm run test:cov

# Build
npm run build
```

### Opción 2: Ejecutar con nektos/act (local CI)

#### ¿Qué es nektos/act?

`act` es una herramienta que **ejecuta workflows de GitHub Actions localmente** sin necesidad de pushar a GitHub. Simula el entorno de GitHub Actions en tu máquina usando Docker.

**Ventajas:**
- Prueba workflows antes de hacer push.
- Feedback rápido (evita PR rechazados).
- Ahorra uso de Actions minutes en GitHub.

#### Requisitos para act

1. **Docker Desktop** instalado y corriendo.
2. **act CLI** instalado:
   ```bash
   # En Windows (PowerShell como admin)
   choco install act-cli
   # O descargar desde: https://github.com/nektos/act/releases
   ```

#### Comandos para ejecutar

```bash
# Ejecutar workflow específico
act -j quality

# Ejecutar con output verboso
act -j quality -v

# Ejecutar simulando un push a main
act push -b main

# Ver logs sin stop
act -j quality --no-skip-checkout
```

---

## Estructura del Proyecto

```
ParcialQA/
├── src/
│   ├── index.js          # Entry point
│   ├── calculator.js     # Funciones matemáticas
│   └── utils.js          # Utilidades
├── test/
│   ├── calculator.test.js
│   └── utils.test.js
├── .github/
│   └── workflows/
│       └── ci-quality.yml    # Workflow CI
├── .eslintrc.json        # Configuración ESLint
├── jest.config.js        # Configuración Jest (umbral 80%)
├── package.json
└── README.md
```

---

## Workflow CI (`.github/workflows/ci-quality.yml`)

### Pasos Ejecutados

1. **Checkout**: Obtiene código del repositorio.
2. **Setup Node.js**: Configura Node 18.
3. **Install dependencies**: `npm ci` (instalación limpia).
4. **Linter**: `npm run lint` - Falla si hay violaciones.
5. **Build**: `npm run build` - Valida que compila.
6. **Tests**: `npm test` - Ejecuta todas las pruebas.
7. **Coverage**: `npm run test:cov` - Genera reporte.
8. **Validate threshold**: Verifica que cobertura ≥ 80%.
9. **Upload artifacts**: Guarda reporte de cobertura.

### Comportamiento de Fallos

- **`continue-on-error: false`** detiene el workflow si algún paso falla.
- El PR o push se marca como ❌ **FAILED** en GitHub.
- No se permite merge a main hasta que todo pase.

---

## Scripts npm

```json
{
  "test": "jest",
  "test:cov": "jest --coverage",
  "lint": "eslint src test",
  "lint:fix": "eslint src test --fix",
  "build": "echo 'Build completed successfully'"
}
```

---

## Ejemplo de Uso: Hacer un cambio

1. **Crear rama:**
   ```bash
   git checkout -b feature/mi-cambio
   ```

2. **Hacer cambios en `src/`** (ej: agregar función).

3. **Escribir tests** en `test/` (debe cubrir función).

4. **Ejecutar localmente:**
   ```bash
   npm run lint:fix
   npm run test:cov
   ```

5. **Si todo pasa:**
   ```bash
   git add .
   git commit -m "feat: agregar nueva función"
   git push origin feature/mi-cambio
   ```

6. **GitHub Actions ejecuta automáticamente** el workflow en el push.

7. **Si workflow pasa:** Puedes hacer merge a main.

---

## Troubleshooting

### ❌ ESLint falla

**Error:** `no-unused-vars`, `semi missing`, etc.

**Solución:**
```bash
# Arreglar automáticamente
npm run lint:fix

# Revisar violaciones específicas
npm run lint
```

### ❌ Tests fallan

**Error:** `expected X but received Y`

**Solución:**
```bash
# Ver output detallado
npm test -- --verbose

# Ejecutar test específico
npm test -- calculator.test.js
```

### ❌ Cobertura por debajo de 80%

**Error:** `Coverage is below 80% threshold`

**Solución:**
```bash
# Ver reporte de cobertura
npm run test:cov
# Revisar coverage/lcov-report/index.html

# Escribir tests para archivos sin cobertura
# Editar test/*.test.js
```

### ❌ act no funciona

**Error:** `Docker daemon not running`

**Solución:**
- Abrir Docker Desktop.
- Reinstalar act:
  ```bash
  choco uninstall act-cli
  choco install act-cli
  ```

---

## Comandos de Git

### Crear repositorio local

```powershell
cd c:\Users\POWER\Desktop\ParcialQA
git init
git add .
git commit -m "commit inicial"
```

### Conectar a GitHub

```powershell
git remote add origin https://github.com/Mileidys10/ParcialQA.git
git branch -M main
git push -u origin main
```

---

## Validación del Workflow

Para verificar que el workflow se ejecutó correctamente:

1. En GitHub, ir a la pestaña **Actions**.
2. Seleccionar el último run.
3. Verificar que todos los steps están ✅ (o 🔄 si está en progreso).
4. Si alguno es ❌, ver los logs haciendo clic en el step fallido.

---

## Próximos Pasos

Ver `RESPUESTAS.md` para:
- Parte 2: Logs de runs exitosos y fallidos.
- Parte 3: Uso avanzado de act.
- Parte 4: Detección de código generado por IA.
- Parte 5: Políticas de ética en IA.

