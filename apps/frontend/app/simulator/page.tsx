import { SimulatorForm } from './components/simulator-form'

export default function SimulatorPage() {
  return (
    <main className='min-h-screen bg-[radial-gradient(circle_at_top_left,#e0f2fe,#f8fafc_55%,#fefce8)] px-4 py-10 md:px-8'>
      <div className='mx-auto w-full max-w-6xl space-y-8'>
        <header className='space-y-3'>
          <p className='inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700'>
            Simulador
          </p>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900 md:text-4xl'>
            Simula la rentabilidad de tu ahorro
          </h1>
          <p className='max-w-3xl text-base leading-7 text-slate-700 md:text-lg'>
            Ingresa tus montos y el horizonte de tiempo para estimar el
            crecimiento de tu ahorro con una tasa anual fija.
          </p>
        </header>

        <SimulatorForm />
      </div>
    </main>
  )
}
