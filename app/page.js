export default function Home() {
    return (
      <main
        style={{
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          padding: 24,
        }}
      >
        <h1> Demo Next.js application </h1>
        <p style={{ marginTop: 12 }}>
          I would really love to get the DevOps internship opportunity at{' '}
          <strong>Wexa.ai</strong>
        </p>
  
        <section style={{ marginTop: 24 }}>
          <h2>Health Check</h2>
          <p>
            Visit <code>/api/health</code> to verify app status.
          </p>
        </section>
      </main>
    )
  }
  