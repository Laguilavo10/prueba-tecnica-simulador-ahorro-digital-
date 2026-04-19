import Link from 'next/link'

export default function Home() {
  return (
    <main className='min-h-screen bg-[radial-gradient(circle_at_top_left,#e0f2fe,#f8fafc_55%,#fefce8)] px-4 py-10 md:px-8'>
      <div className='mx-auto w-full max-w-6xl space-y-8'>
        <header className='space-y-3'>
          <p className='inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700'>
            Prueba Tecnica
          </p>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900 md:text-4xl'>
            Rutas disponibles
          </h1>
          <p className='max-w-3xl text-base leading-7 text-slate-700 md:text-lg'>
            Navega por los apartados implementados en la solucion.
          </p>
        </header>

        <section className='grid gap-4 md:grid-cols-3'>
          <Link
            href='/products'
            className='rounded-2xl border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md'
          >
            <h2 className='text-lg font-semibold text-slate-900'>/products</h2>
            <p className='mt-2 text-sm text-slate-600'>
              Catalogo de productos con filtros.
            </p>
          </Link>

          <Link
            href='/simulator'
            className='rounded-2xl border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md'
          >
            <h2 className='text-lg font-semibold text-slate-900'>/simulator</h2>
            <p className='mt-2 text-sm text-slate-600'>
              Simulador de proyeccion de ahorro.
            </p>
          </Link>

          <Link
            href='/onboarding'
            className='rounded-2xl border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md'
          >
            <h2 className='text-lg font-semibold text-slate-900'>
              /onboarding
            </h2>
            <p className='mt-2 text-sm text-slate-600'>
              Formulario de intencion con validaciones.
            </p>
          </Link>
        </section>
      </div>
    </main>
  )
}
