import { SimulatorForm } from './components/simulator-form'

export default function SimulatorPage() {
  return (
    <main className='page-shell'>
      <div className='page-content max-w-6xl'>
        <header className='page-header'>
          <p className='page-kicker kicker-emerald'>Simulador</p>
          <h1 className='page-title'>Simula la rentabilidad de tu ahorro</h1>
          <p className='page-subtitle'>
            Ingresa tus montos y el horizonte de tiempo para estimar el
            crecimiento de tu ahorro con una tasa anual fija.
          </p>
        </header>

        <SimulatorForm />
      </div>
    </main>
  )
}
