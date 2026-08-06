/**
 * Step 157: Language Proficiency & Experience UI
 */
"use client";
export function LanguageExperience({ languages, experience, onChange }: { languages: string[]; experience?: number; onChange: (d: { languages: string[]; experience?: number }) => void }) {
  const langs = ["Bengali", "English", "Arabic", "Hindi", "Urdu"];
  const toggleLang = (l: string) => {
    const next = languages.includes(l) ? languages.filter((x) => x !== l) : [...languages, l];
    onChange({ languages: next, experience });
  };
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Step 157: Language & Experience</h3>
      <div>
        <p className="text-sm text-white/60">Languages</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {langs.map((l) => (
            <button key={l} onClick={() => toggleLang(l)} className={`rounded-full px-3 py-1 text-sm ${languages.includes(l) ? "bg-[#E5B84B] text-[#1D0B2E]" : "bg-white/10 text-white/80"}`}>
              {l}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm text-white/60">Experience (Years)</label>
        <input type="number" min={0} max={40} value={experience ?? ""} onChange={(e) => onChange({ languages, experience: parseInt(e.target.value) || 0 })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#1D0B2E] px-3 py-2 text-sm" placeholder="5" />
      </div>
    </div>
  );
}
