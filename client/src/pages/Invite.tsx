/**
 * Design philosophy: رحلة صلاة هادئة ومختصرة حول معنى «الله يسمعنا».
 */
import { CalendarPlus, CheckCircle2, ChevronRight, Copy, Heart, Share2, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { getInviteProfile } from "@/lib/inviteProfile";

const LOGO_URL = "/manus-storage/youth-service-logo_a6060761.jpeg";
type Session = { title: string; note: string };
type Vibe = { emoji: string; title: string; copy: string };

function nextWednesdayAtSeven() {
  const now = new Date();
  const target = new Date(now);
  const distance = (3 - now.getDay() + 7) % 7;
  target.setDate(now.getDate() + distance);
  target.setHours(19, 0, 0, 0);
  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 7);
  return target;
}

function calendarStamp(date: Date) {
  const part = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}${part(date.getMonth() + 1)}${part(date.getDate())}T${part(date.getHours())}${part(date.getMinutes())}00`;
}

function calendarLink() {
  const start = nextWednesdayAtSeven();
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const query = new URLSearchParams({
    action: "TEMPLATE",
    text: "اجتماع صلاة الشباب بالأقصر",
    dates: `${calendarStamp(start)}/${calendarStamp(end)}`,
    details: "اجتماع صلاة الشباب بالأقصر — الله يسمعنا",
  });
  return `https://calendar.google.com/calendar/render?${query.toString()}`;
}

const vibes: Vibe[] = [
  { emoji: "🤍", title: "سلام", copy: "نهدأ معًا" },
  { emoji: "🙏", title: "صلاة", copy: "نرفع قلوبنا" },
  { emoji: "🎶", title: "تسبيح", copy: "نسبّح بقلب واحد" },
  { emoji: "🕊️", title: "رجاء", copy: "نفتكر إن الله يسمعنا" },
];

export default function Invite() {
  const [location, setLocation] = useLocation();
  const params = useMemo(() => new URLSearchParams(window.location.search), [location]);
  const profile = useMemo(() => getInviteProfile(window.location.search), [location]);
  const [attending, setAttending] = useState(false);
  const [shareNote, setShareNote] = useState("");
  const [reaction, setReaction] = useState<string | null>(null);
  const [flyingReaction, setFlyingReaction] = useState<string | null>(null);
  const [celebrating, setCelebrating] = useState(false);
  const calendar = useMemo(calendarLink, []);

  const sessions: Session[] = [
    { title: "نهدأ", note: "نترك ضوضاء اليوم ونحضر بقلب مفتوح." },
    { title: "نرفع قلوبنا", note: "كل صلاة مسموعة، وكل شخص له مكان." },
    { title: "نسبّح", note: "نصلي ونرنم معًا في حضور الله." },
    { title: "نرجع برجاء", note: "الله يسمعنا ويقودنا بخطوات هادئة." },
  ];

  const backToEntry = () => setLocation(`/?${params.toString()}`);
  const share = async () => {
    const url = window.location.href;
    const text = profile.copy.shareText;
    try {
      if (navigator.share) {
        await navigator.share({ title: "اجتماع الشباب بالأقصر", text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareNote(profile.copy.copiedLink);
    } catch (error) {
      if ((error as Error).name !== "AbortError") setShareNote("لم نتمكن من فتح المشاركة الآن.");
    }
  };

  const chooseVibe = (emoji: string) => {
    setReaction(emoji);
    setFlyingReaction(emoji);
    window.setTimeout(() => setFlyingReaction(null), 820);
  };

  const confirmAttendance = () => {
    setAttending(true);
    setCelebrating(true);
    window.setTimeout(() => setCelebrating(false), 1000);
  };

  return (
    <main className={`invite-page pulse-invite invite-${profile.gender}`} dir="rtl">
      <div className="invite-particles" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="journey-run" aria-hidden="true"><i /><i /><i /><i /></div>
      <header className="invite-nav">
        <button onClick={backToEntry} className="back-link"><ChevronRight size={18} /> رجوع</button>
        <div className="brand-lockup"><img src={LOGO_URL} className="brand-logo" alt="شعار اجتماع الشباب بالأقصر" /><span>اجتماع الشباب بالأقصر</span></div>
      </header>
      <section className="invite-hero story-screen">
        <div className="hero-text">
          <p className="invite-eyebrow">HEY, {profile.name} 👀</p>
          <div className="hero-date-stack" dir="ltr"><strong>PRAYER MEETING</strong><span>GOD HEARS US</span></div>
          <h1>{profile.copy.openingHeadline(profile.name)}</h1>
          <p>{profile.copy.openingBody}</p>
          <p className="hero-question">{profile.copy.ready} <b>ARE YOU IN?</b></p>
        </div>
        <div className="personal-note neon-note">
          <span>{profile.copy.noteLabel}</span>
          <strong>{profile.copy.personalNote}</strong>
          <small>اجتماع صلاة · اجتماع الشباب بالأقصر</small>
        </div>
      </section>

      <section className="why-section story-screen" aria-labelledby="why-title">
        <div className="section-kicker">A QUIET INVITATION</div>
        <h2 id="why-title"><span>ليه نصلي مع بعض؟</span><small>GOD HEARS US</small></h2>
        <p>لأن الصلاة مساحة نرجع فيها لله ونسمع سلامه.</p>
        <div className="vibe-grid">
          {vibes.map((vibe) => <article key={vibe.title} className="vibe-card"><span>{vibe.emoji}</span><h3>{vibe.title}</h3><p>{vibe.copy}</p></article>)}
        </div>
      </section>

      <section className="program-section story-screen" aria-labelledby="program-title">
        <div className="program-head"><p>OUR PRAYER JOURNEY</p><h2 id="program-title">{profile.copy.programHeadline}</h2></div>
        <ol className={`male-sessions ${profile.isFemale ? "soft-sessions" : ""}`}>
          {sessions.map((session) => <li key={session.title}><span /><div><h3>{session.title}</h3><p>{session.note}</p></div></li>)}
        </ol>
      </section>

      <section className="reaction-section story-screen" aria-labelledby="reaction-title">
        <div><p className="section-kicker">A MOMENT OF STILLNESS</p><h2 id="reaction-title"><span>داخل تصلي بإيه؟</span><small>YOUR PRAYER</small></h2><span>{profile.copy.reactionHint}</span></div>
        <div className="reaction-row">
          {vibes.map((vibe) => <button className={reaction === vibe.emoji ? "is-selected" : ""} type="button" key={vibe.emoji} onClick={() => chooseVibe(vibe.emoji)}><b>{vibe.emoji}</b><small>{reaction === vibe.emoji ? "1" : "0"}</small></button>)}
          {flyingReaction && <i className="flying-reaction" aria-hidden="true">{flyingReaction}</i>}
        </div>
      </section>

      <section className="action-section final-screen story-screen">
        <div className="arrival-orbit" aria-hidden="true"><i /><i /><Sparkles size={16} /></div>
        <div className="final-seal" aria-hidden="true"><i /><i /></div>
        <div>
          <p><Sparkles size={15} /> A SIMPLE PRAYER</p>
          <h2>{profile.copy.finalLead}<br />{profile.copy.finalStrong} 🤍</h2>
          <span>{profile.copy.finalWait}</span>
        </div>
        <div className="action-buttons">
          <a className={`calendar-action primary-join ${attending ? "is-attending" : ""}`} href={calendar} target="_blank" rel="noreferrer" onClick={confirmAttendance}>
            {attending ? <CheckCircle2 size={19} /> : <CalendarPlus size={19} />}
            <span>{attending ? profile.copy.arrival : profile.copy.attendanceButton}</span>
          </a>
          <button className="share-action" onClick={share}><Share2 size={18} /> {profile.copy.shareButton}</button>
          {shareNote && <p className="share-note"><Copy size={14} /> {shareNote}</p>}
        </div>
        {celebrating && <div className="celebration-burst invite-burst" aria-live="polite"><i>✦</i><i>✦</i><i>✦</i><i>✦</i><strong>{profile.copy.celebration}</strong></div>}
      </section>
      <section className="scripture-section" aria-labelledby="scripture-title">
        <div className="section-kicker">WORDS TO PRAY WITH</div>
        <h2 id="scripture-title">آيات عن الصلاة</h2>
        <div className="scripture-grid">
          <blockquote>«ادعني في يوم الضيق أنقذك فتمجدني.»<small>مزمور ٥٠: ١٥</small></blockquote>
          <blockquote>«اسألوا تعطوا، اطلبوا تجدوا، اقرعوا يفتح لكم.»<small>متى ٧: ٧</small></blockquote>
          <blockquote>«قريب هو الرب من كل الذين يدعونه.»<small>مزمور ١٤٥: ١٨</small></blockquote>
        </div>
      </section>
      <p className="calendar-note"><Heart size={14} /> سجّل الدعوة في تقويمك، وخلي وقت الصلاة محفوظًا عندك.</p>
    </main>
  );
}
