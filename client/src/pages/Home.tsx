/**
 * Design philosophy: افتتاح فاخر وهادئ ليوم «شجرة واتنين ليمون» حول الارتباط والاختيار الواعي.
 */
import { CalendarDays, DoorOpen, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { getInviteProfile } from "@/lib/inviteProfile";

const LOGO_URL = "/manus-storage/youth-service-logo_a6060761.jpeg";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);
  const [secretPresses, setSecretPresses] = useState(0);
  const [secretOpen, setSecretOpen] = useState(false);
  const params = useMemo(() => new URLSearchParams(window.location.search), [location]);
  const profile = useMemo(() => getInviteProfile(window.location.search), [location]);

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
        <p>LOADING PRAYER...</p>
        <div className="loading-track"><i style={{ width: `${progress}%` }} /></div>
        <b>{progress}%</b>
        <strong>{progress === 100 ? "شجرة واتنين ليمون" : "نجهز يومًا يستاهل"}</strong>
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
          <span>شجرة واتنين ليمون</span>
        </div>
        <div className="header-day"><CalendarDays size={15} /> يوم الارتباط</div>
      </header>
      <section className="entry-card pulse-entry" aria-labelledby="entry-name">
        <button className="secret-date" type="button" onClick={unlockSecret} aria-label="شجرة واتنين ليمون">
          شجرة واتنين ليمون <small>THE CONNECTION EDIT</small>
        </button>
        <div className="entry-name-ritual">
          <div className="entry-orbit" aria-hidden="true"><i /><i /><i /></div>
          <p className="entry-kicker personal-reveal">{profile.copy.personalInvitation}</p>
          <h1 id="entry-name" className="cinematic-name">{profile.name}</h1>
        </div>
        <p className="entry-copy">
          {profile.copy.openingBody}
        </p>
        <p className="coming-question">{profile.copy.ready} <small>خليك واضح</small> <span>🍋</span></p>
        <button className={`open-invite pulse-cta ${joined ? "is-joined" : ""}`} type="button" onClick={openInvitation}>
          <DoorOpen size={19} />
          <span>{joined ? profile.copy.arrival : profile.copy.openStamp}</span>
          <b>{joined ? "SEE YOU THERE" : "I'M READY"}</b>
        </button>
        {joined && <div className="celebration-burst" aria-label={profile.copy.celebration}><i>✦</i><i>✦</i><i>✦</i><i>✦</i><strong>{profile.copy.celebration}</strong></div>}
      </section>

      <aside className="scripture-card entry-scripture" aria-label="كلمة عن الارتباط">
        <span>جملة اليوم</span>
        <blockquote>«الارتباط الصح مش بيقيدك؛ بيخليك أوضح، أهدى، وأقرب لنفسك.»</blockquote>
        <small>شجرة واتنين ليمون</small>
      </aside>

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
