import { OnboardingForm } from './components/onboarding-form'

export default function OnboardingPage() {
  return (
    <main className='page-shell'>
      <div className='page-content max-w-4xl'>
        <header className='page-header'>
          <p className='page-kicker kicker-cyan'>Onboarding</p>
          <h1 className='page-title'>Registra tu intencion de apertura</h1>
          <p className='page-subtitle'>
            Completa tus datos para iniciar el proceso. Tu intencion de apertura
            es el primer paso para que podamos ofrecerte la mejor cuenta de
            ahorro para tu meta.
          </p>
        </header>

        <OnboardingForm />
      </div>
    </main>
  )
}
