# Prueba Tecnica Michael Page

Este proyecto implementa una solucion completa para la prueba tecnica solicitada:

- Frontend en Next.js con TypeScript, Tailwind y HeroUI.
- Backend en NestJS para exponer la API.
- Monorepo con npm workspaces.

## Objetivo de la Solucion

Se construyeron los 3 apartados principales solicitados:

- `/products`: listado de productos con filtros por nombre y tipo.
- `/simulator`: simulador de rentabilidad con validaciones.
- `/onboarding`: formulario de intencion con validaciones y envio a backend.

Adicionalmente, se implemento el plus de separar frontend y backend:

- Frontend consume API real en NestJS.
- Endpoints movidos del frontend al backend.

## Stack Tecnico

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS, HeroUI, React Hook Form.
- Backend: NestJS 11, TypeScript.
- Monorepo: npm workspaces.

## Estructura del Proyecto

```text
.
├─ apps/
│  ├─ frontend/
│  │  ├─ app/
│  │  │  ├─ products/
│  │  │  ├─ simulator/
│  │  │  └─ onboarding/
│  │  ├─ const/
│  │  └─ ...
│  └─ backend/
│     ├─ src/
│     │  ├─ modules/
│     │  │  ├─ products/
│     │  │  └─ onboarding/
│     │  └─ main.ts
│     └─ ...
├─ package.json
└─ README.md
```

## Instalacion

Desde la raiz del repositorio:

```bash
npm install
```

## Ejecucion del Proyecto

### Opcion 1: levantar todo con un solo comando

Desde la raiz:

```bash
npm run dev:all
```

Esto levanta:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Opcion 2: levantar por separado

Terminal 1:

```bash
npm run dev:backend
```

Terminal 2:

```bash
npm run dev:frontend
```

## Scripts Utiles

Desde la raiz del repo:

- `npm run dev`: levanta solo frontend.
- `npm run dev:all`: levanta frontend + backend.
- `npm run dev:frontend`: frontend en modo desarrollo.
- `npm run dev:backend`: backend en modo watch.
- `npm run build`: build de frontend.
- `npm run build:backend`: build de backend.
- `npm run lint`: lint de frontend.
- `npm run lint:backend`: lint de backend.
- `npm run lint:all`: lint de ambos.

## Endpoints Backend

Prefijo global configurado en Nest: `/api`

- `GET /api/products`
  - Query params opcionales: `name`, `type`
  - Respuesta: `{ data: SavingsProduct[], total: number }`

- `GET /api/products/types`
  - Respuesta: `{ data: ProductType[], total: number }`

- `POST /api/onboarding`
  - Body: `fullName`, `document`, `email`, `recaptcha`
  - Validaciones de campos requeridos y token de recaptcha simulado
  - Respuesta exitosa: `{ success: true, code, fullName }`

## Explicacion de Cada Apartado de la Prueba

### 1) Products

Que hace:

- Consulta tipos disponibles y productos desde backend.
- Permite filtrar por nombre y tipo.
- Mantiene filtros en query params para compartir URL.

Por que se implemento asi:

- Se usa renderizado en servidor para mejorar SEO del listado.
- Los filtros por URL mejoran trazabilidad y experiencia de uso.
- La logica de filtrado vive en backend para centralizar reglas de negocio.

### 2) Simulator

Que hace:

- Formulario para monto inicial, aporte mensual y meses.
- Validaciones de negocio y de formato.
- Calcula valor futuro, total aportado e interes estimado.

Por que se implemento asi:

- React Hook Form permite validaciones claras y feedback rapido.
- Se separo la formula en una capa de utilidades para mantener el componente limpio.
- Se muestra formula y resultados para transparencia funcional.

Formula utilizada y por que:

- Se usa una proyeccion con interes compuesto mensual y aportes mensuales constantes.
- Esta formula modela dos componentes:
  - Capital inicial creciendo con interes compuesto.
  - Serie de aportes mensuales acumulados (anualidad ordinaria).

Definiciones:

- Tasa anual: 6.5%
- Tasa mensual: r = tasa anual / 12
- Meses: n
- Monto inicial: P
- Aporte mensual: A

Ecuaciones:

```text
Factor de crecimiento = (1 + r)^n

Valor futuro del monto inicial = P * (1 + r)^n

Valor futuro de aportes mensuales = A * [((1 + r)^n - 1) / r]

Valor futuro total =
  P * (1 + r)^n + A * [((1 + r)^n - 1) / r]

Total aportado = P + (A * n)

Interes estimado = Valor futuro total - Total aportado
```

Por que esta formula es adecuada para la prueba:

- Refleja un comportamiento financiero realista para productos de ahorro.
- Permite explicar claramente al usuario de donde sale el resultado.
- Es estable, deterministicamente reproducible y facil de validar en backend o frontend.
- Tiene manejo explicito del caso r = 0 para evitar division por cero.

### 3) Onboarding

Que hace:

- Captura nombre, documento y correo.
- Incluye recaptcha simulado en segundo plano (campo oculto).
- Envia al backend y devuelve codigo de solicitud.

Por que se implemento asi:

- El token oculto simula una integracion real anti-bot sin exponer complejidad al usuario.
- La validacion final ocurre en backend para no confiar solo en cliente.
- Se devuelve codigo unico para trazabilidad de la solicitud.

## Decisiones de Arquitectura

### Monorepo

- Practicidad al momento de probar dos los servicios de forma rapida.
- Permite versionar frontend y backend juntos.
- Facilita sincronizacion de cambios y despliegues coordinados.
- Simplifica comandos de desarrollo y validacion.

### Backend

Cada modulo se separa en:

- `domain`: contratos y reglas de negocio puras.
- `application`: casos de uso.
- `infrastructure`: implementaciones concretas
- `presentation`: controladores y DTOs HTTP.

Beneficio:

- Mayor mantenibilidad y reemplazo sencillo de infraestructura futura.

## Estado Actual

Implementado:

- Frontend con las 3 rutas solicitadas.
- Backend Nest con endpoints para productos y onboarding.
- Integracion frontend -> backend.
- Lint y build funcionando en ambos proyectos.

## Posibles Mejoras

- Agregar tests unitarios y de integracion.
- Extraer contratos compartidos (tipos) a un paquete comun.
- Configurar pipeline CI para lint, build y test de ambos proyectos.
