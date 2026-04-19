import { OnboardingForm } from './components/onboarding-form'

export default function OnboardingPage() {
  return (
    <main className='min-h-screen bg-[radial-gradient(circle_at_top_left,#e0f2fe,#f8fafc_55%,#fefce8)] px-4 py-10 md:px-8'>
      <div className='mx-auto w-full max-w-4xl space-y-8'>
        <header className='space-y-3'>
          <p className='inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700'>
            Onboarding
          </p>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900 md:text-4xl'>
            Registra tu intencion de apertura
          </h1>
          <p className='max-w-3xl text-base leading-7 text-slate-700 md:text-lg'>
            Completa tus datos para iniciar el proceso. Tu intencion de apertura es el primer paso para que podamos ofrecerte la mejor cuenta de ahorro para tu meta. 
          </p>
        </header>

        <OnboardingForm />
      </div>
    </main>
  )
}
