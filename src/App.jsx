import { useState, useCallback } from 'react'
import Spline from '@splinetool/react-spline'
import { Upload, Image as ImageIcon, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react'

function App() {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [prompt, setPrompt] = useState('')

  const handleFiles = useCallback((files) => {
    if (!files || files.length === 0) return
    const f = files[0]
    if (!f.type.startsWith('image/')) return
    setFile(f)
    const url = URL.createObjectURL(f)
    setPreview(url)
  }, [])

  const onDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
      e.dataTransfer.clearData()
    }
  }

  const onDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const onDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const onInputChange = (e) => {
    handleFiles(e.target.files)
  }

  const handleStart = () => {
    // Placeholder action for CTA
    const msg = file ? `Bereit zur Bearbeitung mit Wunsch: "${prompt || '—'}"` : 'Lade ein Bild hoch, um zu starten.'
    alert(msg)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-md" />
            <div className="text-lg font-semibold tracking-tight">Auralens</div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Funktionen</a>
            <a href="#upload" className="hover:text-slate-900 transition-colors">Upload</a>
            <a href="#beispiele" className="hover:text-slate-900 transition-colors">Beispiele</a>
          </div>
          <button onClick={handleStart} className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
            Jetzt starten <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* Hero with Spline */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 text-white/90">
            <Sparkles size={14} className="text-yellow-300" /> Powered by KI
          </p>
          <h1 className="mt-6 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Revolutionäre KI-Bildbearbeitung –
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"> blitzschnell, kreativ, intuitiv</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-slate-600 text-base md:text-lg">
            Automatische Retusche, kreative Veränderungen und Hintergrundaustausch – in Sekunden. Lade ein Bild hoch und beschreibe, was du möchtest.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#upload" className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors">
              Jetzt starten <ArrowRight size={18} />
            </a>
            <a href="#beispiele" className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold border border-slate-200 hover:bg-slate-50 transition-colors">
              Beispiele ansehen
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard icon={<ImageIcon className="text-indigo-600" size={22} />} title="Automatische Retusche" desc="Entfernt Hautunreinheiten, glättet und optimiert – ganz ohne manuelle Nacharbeit." />
          <FeatureCard icon={<Sparkles className="text-purple-600" size={22} />} title="Kreative Veränderungen" desc="Füge neue Elemente hinzu oder verändere den Stil deines Bildes mit natürlicher Sprache." />
          <FeatureCard icon={<ShieldCheck className="text-pink-600" size={22} />} title="Sicher & privat" desc="Deine Bilder bleiben vertraulich – wir setzen auf moderne Sicherheits-Standards." />
        </div>
      </section>

      {/* Upload Area */}
      <section id="upload" className="bg-slate-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Bild hochladen & Wunsch eingeben</h2>
          <p className="mt-2 text-slate-600">Ziehe eine Datei hierher oder nutze den Button. Beschreibe anschließend deine Bearbeitungsidee.</p>

          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={`mt-6 border-2 border-dashed rounded-2xl bg-white transition-colors ${dragActive ? 'border-indigo-400 bg-indigo-50/50' : 'border-slate-200'}`}
          >
            <div className="p-8 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="aspect-video w-full rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                  ) : (
                    <div className="text-center p-6 text-slate-500">
                      <Upload className="mx-auto mb-3 text-slate-400" />
                      <div className="font-medium">Ziehe dein Bild hierher</div>
                      <div className="text-sm">oder klicke auf „Bild wählen“</div>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 cursor-pointer">
                    <Upload size={16} /> Bild wählen
                    <input type="file" accept="image/*" className="hidden" onChange={onInputChange} />
                  </label>
                  {file && (
                    <span className="text-sm text-slate-600 truncate">{file.name}</span>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700">Dein Bearbeitungswunsch</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="z. B. ‚Füge einen Sonnenuntergang hinzu‘ oder ‚Entferne den Hintergrund‘"
                  className="mt-2 w-full h-40 rounded-xl border border-slate-200 bg-white p-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
                <button onClick={handleStart} className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-5 py-3 rounded-xl font-semibold shadow hover:shadow-md transition-shadow">
                  Jetzt starten
                </button>
                <p className="mt-3 text-xs text-slate-500">Hinweis: Diese Demo zeigt das Interface. Die Verarbeitung erfolgt im nächsten Schritt.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section id="beispiele" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Beispiele – Vorher & Nachher</h2>
        <p className="mt-2 text-slate-600">Lass dich inspirieren, was möglich ist.</p>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <ExampleCard
            title="Hintergrund entfernen"
            before="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"
            after="https://images.unsplash.com/photo-1603415526960-f7e0328d13d1?q=80&w=1200&auto=format&fit=crop"
          />
          <ExampleCard
            title="Sonnenuntergang hinzufügen"
            before="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
            after="https://images.unsplash.com/photo-1501973801540-537f08ccae7b?q=80&w=1200&auto=format&fit=crop"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-white font-semibold text-lg">Auralens</div>
              <p className="mt-2 text-sm text-slate-400">Kontakt: support@auralens.app</p>
            </div>
            <div className="text-sm text-slate-400">
              <a href="#" className="hover:text-white">Datenschutz</a>
              <span className="mx-2">•</span>
              <a href="#" className="hover:text-white">Impressum</a>
            </div>
          </div>
          <div className="mt-6 text-xs text-slate-500">© {new Date().getFullYear()} Auralens. Alle Rechte vorbehalten.</div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="font-semibold text-slate-900">{title}</div>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  )
}

function ExampleCard({ title, before, after }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
      <div className="p-4 flex items-center justify-between">
        <div className="font-semibold text-slate-900">{title}</div>
        <div className="text-xs text-slate-500">Vorher / Nachher</div>
      </div>
      <div className="grid grid-cols-2 gap-0">
        <figure className="relative aspect-video overflow-hidden">
          <img src={before} alt="Vorher" className="absolute inset-0 w-full h-full object-cover" />
          <figcaption className="absolute bottom-2 left-2 text-xs bg-white/80 px-2 py-1 rounded">Vorher</figcaption>
        </figure>
        <figure className="relative aspect-video overflow-hidden">
          <img src={after} alt="Nachher" className="absolute inset-0 w-full h-full object-cover" />
          <figcaption className="absolute bottom-2 left-2 text-xs bg-white/80 px-2 py-1 rounded">Nachher</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default App
