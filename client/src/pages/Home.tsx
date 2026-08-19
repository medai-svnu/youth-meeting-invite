/**
 * Design philosophy: «Wednesday Pulse» — افتتاح قصصي عالي الطاقة، يبقي الاسم والموعد في المركز ويقود إلى الدعوة.
 */
import { CalendarDays, ChevronDown, Clock3, DoorOpen, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { VibeToggle } from "@/components/VibeToggle";
import { getInviteProfile } from "@/lib/inviteProfile";

const LOGO_URL = "/manus-storage/youth-service-logo_a6060761.jpeg";

function nextWednesdayAtSeven() {
  const now = new Date();
  const target = new Date(now);
  const distance = (3 - now.getDay() + 7) % 7;
  target.setDate(now.getDate() + distance);
  target.setHours(19, 0, 0, 0);
  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 7);
  return target;
}

function timeUntil(target: Date) {
  const value = Math.max(0, target.getTime() - Date.now());
  return [
    [Math.floor(value / 86400000), "DAYS"],
    [Math.floor((value % 86400000) / 3600000), "HOURS"],
    [Math.floor((value % 3600000) / 60000), "MINUTES"],
    [Math.floor((value % 60000) / 1000), "SECONDS"],
  ] as const;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [target] = useState(nextWednesdayAtSeven);
  const [clock, setClock] = useState(() => timeUntil(target));
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);
  const [secretPresses, setSecretPresses] = useState(0);
  const [secretOpen, setSecretOpen] = useState(false);
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const profile = useMemo(() => getInviteProfile(), []);

  useEffect(() => {
    const timer = window.setInterval(() => setClock(timeUntil(target)), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(100, current + 20);
        if (next === 100) {
          window.clearInterval(timer);
          window.setTimeout(() => setLoading(false), 180);
        }
        return next;
      });
    }, 120);
    return () => window.clearInterval(timer);
  }, []);

  const openInvitation = () => {
    if (joined) return;
    setJoined(true);
    window.setTimeout(() => setLocation(`/invite?${params.toString()}`), 720);
  };

  const unlockSecret = () => {
    const next = secretPresses + 1;
    if (next >= 5) {
      setSecretOpen(true);
      setSecretPresses(0);
      return;
    }
    setSecretPresses(next);
  };

  if (loading) {
    return (
      <main className="loading-screen" dir="ltr" aria-live="polite">
        <div className="loading-orbit"><i /><i /><span><Sparkles size={20} /></span></div>
        <p>LOADING WEDNESDAY...</p>
        <div className="loading-track"><i style={{ width: `${progress}%` }} /></div>
        <b>{progress}%</b>
        <strong>{progress === 100 ? "LET'S GO" : "GETTING THE VIBE READY"}</strong>
      </main>
    );
  }

  return (
    <main className={`entry-shell pulse-shell entry-${profile.gender}`} dir="rtl">
      <div className="entry-art" />
      <div className="entry-overlay" />
      <div className="pulse-particles" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <header className="site-header">
        <div className="brand-lockup">
          <img src={LOGO_URL} className="brand-logo" alt="شعار اجتماع الشباب بالأقصر" />
          <span>اجتماع الشباب بالأقصر</span>
        </div>
        <div className="header-day"><CalendarDays size={15} /> الأربعاء</div>
      </header>
      <VibeToggle />

      <section className="entry-card pulse-entry" aria-labelledby="entry-name">
        <button className="secret-date" type="button" onClick={unlockSecret} aria-label="الأربعاء">
          الأربعاء <small>WEDNESDAY</small>
        </button>
        <p className="hero-time">7:00 <small>PM</small></p>
        <div className="entry-name-ritual">
          <div className="entry-orbit" aria-hidden="true"><i /><i /><i /></div>
          <p className="entry-kicker personal-reveal">{profile.copy.personalInvitation}</p>
          <h1 id="entry-name" className="cinematic-name">{profile.name}</h1>
        </div>
        <p className="entry-copy">
          {profile.copy.openingBody}
        </p>
        <p className="coming-question">{profile.copy.ready} <small>YOU IN?</small> <span>👀</span></p>
        <button className={`open-invite pulse-cta ${joined ? "is-joined" : ""}`} type="button" onClick={openInvitation}>
          <DoorOpen size={19} />
          <span>{joined ? profile.copy.arrival : profile.copy.openStamp}</span>
          <b>{joined ? "LET'S GOOOO" : "I'M READY"}</b>
        </button>
        {joined && <div className="celebration-burst" aria-label={profile.copy.celebration}><i>✦</i><i>✦</i><i>✦</i><i>✦</i><strong>{profile.copy.celebration}</strong></div>}
      </section>

      <section className="entry-countdown neon-countdown" aria-label="الوقت المتبقي للاجتماع">
        <p><Clock3 size={15} /> الأربعاء · الحضور والبداية 7:00 م</p>
        <div>
          {clock.map(([value, label]) => <span key={label}><b>{String(value).padStart(2, "0")}</b><small>{label}</small></span>)}
        </div>
        <button className="countdown-cue" type="button" onClick={() => document.querySelector(".entry-countdown")?.scrollIntoView({ behavior: "smooth", block: "end" })}>COUNTDOWN <ChevronDown size={14} /></button>
      </section>

      {secretOpen && (
        <div className="secret-modal" role="dialog" aria-modal="true" aria-label="رسالة مخفية">
          <div>
            <button type="button" onClick={() => setSecretOpen(false)} aria-label="إغلاق"><X size={18} /></button>
            <span>YOU FOUND IT 👀</span>
            <h2>{profile.copy.secretTitle}</h2>
            <p>{profile.copy.lateMessage}</p>
          </div>
        </div>
      )}
    </main>
  );
}
