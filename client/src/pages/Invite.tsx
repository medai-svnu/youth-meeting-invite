/**
 * Design philosophy: «Wednesday Pulse» — رحلة تمرير حيوية تجمع الفضول والتفاعل وقرار الحضور، مع بقاء كل بيانات الاجتماع عملية وواضحة.
 */
import { CalendarPlus, CheckCircle2, ChevronRight, Copy, Heart, Share2, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { VibeToggle } from "@/components/VibeToggle";

const LOGO_URL = "/manus-storage/youth-service-logo_a6060761.jpeg";
type Session = { time: string; title: string; note: string; featured?: boolean };
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
    text: "اجتماع الشباب بالأقصر — البداية 7:00 م",
    dates: `${calendarStamp(start)}/${calendarStamp(end)}`,
    details: "الحضور والبداية 7:00 · الصلاة 7:00 · الترانيم 7:20 · مفاجأة 7:30 · ملحمة الأسر 8:15",
  });
  return `https://calendar.google.com/calendar/render?${query.toString()}`;
}

const vibes: Vibe[] = [
  { emoji: "🔥", title: "GOOD VIBES", copy: "لمة على مزاجك" },
  { emoji: "😂", title: "FUN", copy: "ضحك من القلب" },
  { emoji: "⚡", title: "ENERGY", copy: "شحن للأسبوع" },
  { emoji: "👥", title: "GOOD PEOPLE", copy: "ناس شبهك" },
  { emoji: "🎯", title: "SOMETHING DIFFERENT", copy: "مفاجأة مستنية" },
];

export default function Invite() {
  const [, setLocation] = useLocation();
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const female = params.get("g")?.toLowerCase() === "f";
  const name = ((params.get("name") || "").trim().replace(/^يا\s+/, "") || (female ? "جميلة" : "بطل"));
  const [attending, setAttending] = useState(false);
  const [shareNote, setShareNote] = useState("");
  const [reaction, setReaction] = useState<string | null>(null);
  const [flyingReaction, setFlyingReaction] = useState<string | null>(null);
  const [celebrating, setCelebrating] = useState(false);
  const calendar = useMemo(calendarLink, []);

  const sessions: Session[] = female
    ? [
        { time: "7:00", title: "الصلاة", note: "نبدأ براحة القلب ودفء اللمة." },
        { time: "7:20", title: "الترانيم", note: "صوت واحد وفرحة بتكبر بينا." },
        { time: "7:30", title: "المفاجأة", note: "مش هنحرقها دلوقتي… بس لازم تكوني موجودة من البداية.", featured: true },
        { time: "8:15", title: "ملحمة الأسر", note: "ضحك وحكايات وقرب أكتر." },
      ]
    : [
        { time: "7:00", title: "الصلاة", note: "بداية هادية بقلب واحد." },
        { time: "7:20", title: "الترانيم", note: "صوتك جزء من الصورة." },
        { time: "7:30", title: "المفاجأة", note: "مش هنحرقها دلوقتي… بس تعالى من البداية عشان متفوتكش.", featured: true },
        { time: "8:15", title: "ملحمة الأسر", note: "لمة وضحك وروح فريق." },
      ];

  const backToEntry = () => setLocation(`/?${params.toString()}`);
  const share = async () => {
    const url = window.location.href;
    const text = female
      ? "دي دعوتي لاجتماع الشباب بالأقصر يوم الأربعاء. ميعادنا من 7:00 م. تعالي معايا من البداية!"
      : "دي دعوتي لاجتماع الشباب بالأقصر يوم الأربعاء. ميعادنا من 7:00 م. تعالى معايا من البداية!";
    try {
      if (navigator.share) {
        await navigator.share({ title: "اجتماع الشباب بالأقصر", text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareNote("تم نسخ الرابط. ابعته لصاحبك.");
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

  const opening = female
    ? { eyebrow: "OPEN YOUR WEDNESDAY", headline: "يا {name}، الحكاية أحلى وإنتِ فيها.", copy: "ناس قريبة، طاقة حلوة، وموعدنا من أول دقيقة." }
    : { eyebrow: "OPEN YOUR WEDNESDAY", headline: "يا {name}، الفريق مستنيك.", copy: "ناس حلوة، طاقة على مزاجك، وتعالى من أول دقيقة." };

  return (
    <main className={`invite-page pulse-invite ${female ? "invite-female" : "invite-male"}`} dir="rtl">
      <div className="invite-particles" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="journey-run" aria-hidden="true"><i /><i /><i /><i /></div>
      <header className="invite-nav">
        <button onClick={backToEntry} className="back-link"><ChevronRight size={18} /> رجوع</button>
        <div className="brand-lockup"><img src={LOGO_URL} className="brand-logo" alt="شعار اجتماع الشباب بالأقصر" /><span>اجتماع الشباب بالأقصر</span></div>
      </header>
      <VibeToggle />

      <section className="invite-hero story-screen">
        <div className="hero-text">
          <p className="invite-eyebrow">{opening.eyebrow}</p>
          <div className="hero-date-stack" dir="ltr"><strong>WEDNESDAY</strong><span>7:00 PM</span></div>
          <h1>{opening.headline.replace("{name}", name)}</h1>
          <p>{opening.copy}</p>
          <p className="hero-question">OK... <b>ARE YOU IN?</b></p>
        </div>
        <div className="personal-note neon-note">
          <span>{female ? "رسالة هذا الأسبوع" : "خطة الليلة"}</span>
          <strong>{female ? "خدي وقتك، بس متتأخريش عن البداية." : "خلي مكانك في الفريق محسوم من البداية."}</strong>
          <small>7:00 م · الأربعاء</small>
        </div>
      </section>

      <section className="why-section story-screen" aria-labelledby="why-title">
        <div className="section-kicker">SCREEN 04 / THE VIBE</div>
        <h2 id="why-title"><span>ليه تيجي؟</span><small>WHY SHOULD YOU COME?</small></h2>
        <p>مش مجرد اجتماع… دي ليلة تكسر روتين الأسبوع.</p>
        <div className="vibe-grid">
          {vibes.map((vibe) => <article key={vibe.title} className="vibe-card"><span>{vibe.emoji}</span><h3>{vibe.title}</h3><p>{vibe.copy}</p></article>)}
        </div>
      </section>

      <section className="program-section story-screen" aria-labelledby="program-title">
        <div className="program-head"><p>THE NIGHT RUNS LIKE THIS</p><h2 id="program-title">من أول صلاة… لحد المفاجأة اللي مستنياك.</h2></div>
        <ol className={`male-sessions ${female ? "soft-sessions" : ""}`}>
          {sessions.map((session) => <li key={session.time} className={session.featured ? "is-main-event" : ""}><time>{session.time}<small>م</small></time><span /><div>{session.featured && <span className="main-event-label"><Sparkles size={12} /> KEEP THIS ONE A SECRET</span>}<h3>{session.title}</h3><p>{session.note}</p></div></li>)}
        </ol>
      </section>

      <section className="reaction-section story-screen" aria-labelledby="reaction-title">
        <div><p className="section-kicker">TAP ONE. IT'S YOUR VIBE.</p><h2 id="reaction-title"><span>داخل بإحساس إيه؟</span><small>WHAT'S YOUR VIBE?</small></h2><span>اختيارك هنا محلي ليك؛ اختار إحساسك قبل ما تقرر.</span></div>
        <div className="reaction-row">
          {vibes.map((vibe) => <button className={reaction === vibe.emoji ? "is-selected" : ""} type="button" key={vibe.emoji} onClick={() => chooseVibe(vibe.emoji)}><b>{vibe.emoji}</b><small>{reaction === vibe.emoji ? "1" : "0"}</small></button>)}
          {flyingReaction && <i className="flying-reaction" aria-hidden="true">{flyingReaction}</i>}
        </div>
      </section>

      <section className="action-section final-screen story-screen">
        <div className="arrival-orbit" aria-hidden="true"><i /><i /><Sparkles size={16} /></div>
        <div className="final-seal" aria-hidden="true"><i /><i /></div>
        <div>
          <p><Sparkles size={15} /> FINAL SCREEN / ختم قرارك</p>
          <div className="final-time" dir="ltr">WEDNESDAY <b>7:00 PM</b></div>
          <h2>متسمعش عنها بس.<br />خليك حاضر. 🔥</h2>
          <span>{female ? "هنستناكي من أول دقيقة." : "هنستناك من أول دقيقة."}</span>
        </div>
        <div className="action-buttons">
          <a className={`calendar-action primary-join ${attending ? "is-attending" : ""}`} href={calendar} target="_blank" rel="noreferrer" onClick={confirmAttendance}>
            {attending ? <CheckCircle2 size={19} /> : <CalendarPlus size={19} />}
            <span>{attending ? "YOU'RE IN! 🚀" : "I'M COMING 🔥"}</span>
          </a>
          <button className="share-action" onClick={share}><Share2 size={18} /> {female ? "شاركي الرسالة" : "شارك الدعوة"}</button>
          {shareNote && <p className="share-note"><Copy size={14} /> {shareNote}</p>}
        </div>
        {celebrating && <div className="celebration-burst invite-burst" aria-live="polite"><i>✦</i><i>✦</i><i>✦</i><i>✦</i><strong>SEE YOU WEDNESDAY ❤️</strong></div>}
      </section>
      <p className="calendar-note"><Heart size={14} /> زر الحضور يفتح الموعد الحقيقي في تقويمك؛ الوصول يبدأ الساعة 7:00 م.</p>
    </main>
  );
}
