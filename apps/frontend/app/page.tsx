import Link from 'next/link'

export default function Home() {
  return (
    <main className='page-shell'>
      <div className='page-content max-w-6xl'>
        <header className='page-header'>
          <p className='page-kicker kicker-sky'>Prueba Tecnica</p>
          <h1 className='page-title'>Rutas disponibles</h1>
          <p className='page-subtitle'>
            Navega por los apartados implementados en la solucion.
          </p>
        </header>

        <section className='grid gap-4 md:grid-cols-3'>
          <Link
            href='/products'
            className='glass-card rounded-2xl p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
          >
            <h2 className='text-primary text-lg font-semibold'>/products</h2>
            <p className='text-muted mt-2 text-sm'>
              Catalogo de productos con filtros.
            </p>
          </Link>

          <Link
            href='/simulator'
            className='glass-card rounded-2xl p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
          >
            <h2 className='text-primary text-lg font-semibold'>/simulator</h2>
            <p className='text-muted mt-2 text-sm'>
              Simulador de proyeccion de ahorro.
            </p>
          </Link>

          <Link
            href='/onboarding'
            className='glass-card rounded-2xl p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
          >
            <h2 className='text-primary text-lg font-semibold'>/onboarding</h2>
            <p className='text-muted mt-2 text-sm'>
              Formulario de intencion con validaciones.
            </p>
          </Link>
        </section>
      </div>
    </main>
  )
}
