# GUÍA DE GIT - PASO A PASO

## Prerequisitos

- Git instalado en Windows: https://git-scm.com/download/win
- GitHub account: https://github.com

---

## PASO 1: Inicializar Repositorio Local

```powershell
cd c:\Users\POWER\Desktop\ParcialQA

# Inicializar git
git init

# Ver archivos sin seguimiento
git status
```

**Output esperado:**
```
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .eslintrc.json
        .gitignore
        jest.config.js
        package.json
        ...
```

---

## PASO 2: Hacer Primer Commit

```powershell
# Agregar todos los archivos
git add .

# Crear commit
git commit -m "commit #1: Estructura base del proyecto"

# Ver historial
git log --oneline
```

**Output:**
```
1234567 commit #1: Estructura base del proyecto
```

---

## PASO 3: Crear Repositorio en GitHub

1. Ir a https://github.com/new
2. **Repository name:** `ParcialQA`
3. **Owner:** Tu cuenta (ej: Mileidys10)
4. **Public** o **Private** (depende de requisitos)
5. **NO inicializar** con README (ya lo tenemos local)
6. Click **Create repository**

---

## PASO 4: Conectar Local con GitHub

GitHub te mostrará comandos. En PowerShell:

```powershell
# Agregar remote
git remote add origin https://github.com/Mileidys10/ParcialQA.git

# Renombrar rama a main (GitHub default)
git branch -M main

# Push del código local a GitHub
git push -u origin main
```

**Output:**
```
Enumerating objects: 9, done.
Counting objects: 100% (9/9), done.
Writing objects: 100% (9/9), 1.23 KiB | 1.23 MiB/s
...
 * [new branch]      main -> origin/main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## PASO 5: Verificar en GitHub

1. Ir a https://github.com/Mileidys10/ParcialQA
2. Verificar que archivos aparecen:
   - ✅ src/, test/, .github/workflows/, README.md, etc.
3. Ver commits en **Commits** tab
4. Ver workflow en **Actions** tab (debería estar corriendo)

---

## FLUJO DE TRABAJO NORMAL (después del setup)

### Crear rama feature

```powershell
git checkout -b feature/nueva-funcionalidad
```

### Hacer cambios y commits

```powershell
# Editar archivos en tu editor (VS Code, etc.)

# Ver cambios
git status
git diff src/calculator.js

# Agregar cambios específicos
git add src/calculator.js test/calculator.test.js

# Commit
git commit -m "feat: agregar función exponencial"

# Ver historial local
git log --oneline
```

### Push a GitHub

```powershell
git push origin feature/nueva-funcionalidad
```

### Crear Pull Request

1. Ir a GitHub → https://github.com/Mileidys10/ParcialQA/pulls
2. Click **New Pull Request**
3. Seleccionar rama: **feature/nueva-funcionalidad**
4. Click **Create Pull Request**
5. **GitHub Actions ejecuta automáticamente** el workflow
6. Si ✅ pasa: Click **Merge pull request**
7. Si ❌ falla: Ver logs, arreglar, hacer push de nuevo

### Actualizar main local

```powershell
# Switch a main
git checkout main

# Bajar cambios de GitHub
git pull origin main
```

---

## COMANDOS ÚTILES

```powershell
# Ver ramas locales
git branch

# Ver ramas remotas
git branch -r

# Ver todas (local + remota)
git branch -a

# Cambiar de rama
git checkout main

# Ver último commit
git log -1

# Ver últimos 5 commits
git log -5 --oneline

# Ver diferencias
git diff

# Stash (guardar cambios temporales)
git stash
git stash pop

# Deshacer cambios en archivo
git restore archivo.js

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer último commit (perder cambios)
git reset --hard HEAD~1
```

---

## TROUBLESHOOTING

### ❌ "fatal: not a git repository"

Solución:
```powershell
git init
```

### ❌ "refused to merge unrelated histories"

Solución:
```powershell
git pull origin main --allow-unrelated-histories
```

### ❌ "fatal: The current branch main has no upstream branch"

Solución:
```powershell
git push --set-upstream origin main
# o
git push -u origin main
```

### ❌ Cambios sin guardar antes de cambiar rama

Solución:
```powershell
git stash  # Guardar
git checkout otra-rama
git checkout mi-rama
git stash pop  # Recuperar
```

### ❌ "Permission denied (publickey)"

Solución:
- Generar SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
- O usar HTTPS en lugar de SSH en el remote:
  ```powershell
  git remote set-url origin https://github.com/Mileidys10/ParcialQA.git
  ```

---

## VERIFICAR WORKFLOW EN GITHUB ACTIONS

1. Push código:
   ```powershell
   git push origin main
   ```

2. Ir a GitHub → **Actions** tab

3. Ver workflow "CI Quality Pipeline" ejecutándose:
   - 🟡 En progreso
   - ✅ Completado (todos green)
   - ❌ Fallido (alguno red)

4. Click en el workflow para ver logs detallados

5. Si falla: arreglar código local → commit → push automáticamente reintenta

---

## RESUMEN: Tus 6 commits

1. **commit #1:** Estructura base
2. **commit #2:** Workflow CI/CD
3. **commit #3:** Documentación Parte 1
4. **commit #4:** Package-lock.json (dependencias)
5. **commit #5:** Logs de ejecución
6. **commit #6:** RESPUESTAS.md completo

Cada uno visible en GitHub → Commits histórico.

