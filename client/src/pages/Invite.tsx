/**
 * Design philosophy: «قمر الأقصر» — دعوة ليلية هادئة وعملية: برنامج واضح، حضور في التقويم، ومشاركة حقيقية.
 * يحتفظ القالبان بهوية واحدة داكنة ودافئة، ويختلفان في الصياغة الشخصية فقط.
 */
import { useMemo, useState } from "react";
import { ArrowRight, CalendarPlus, CheckCircle2, ChevronRight, Clock3, Copy, Heart, Share2, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

const LOGO_URL = "/manus-storage/youth-service-logo_a6060761.jpeg";

type Session = { time: string; title: string; note: string; featured?: boolean };

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

export default function Invite() {
  const [location, setLocation] = useLocation();
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const female = params.get("g")?.toLowerCase() === "f";
  const name = (params.get("name") || "").trim() || (female ? "يا جميلة" : "يا بطل");
  const [attending, setAttending] = useState(false);
  const [shareNote, setShareNote] = useState("");
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
      setShareNote("تم نسخ رابط الدعوة. ابعته لصاحبك.");
    } catch (error) {
      if ((error as Error).name !== "AbortError") setShareNote("لم نتمكن من فتح المشاركة الآن.");
    }
  };

  const opening = female
    ? { eyebrow: "رسالة ليكي", headline: "يا {name}، وجودك يكمّل الحكاية.", copy: "مساء هادي، ناس قريبة، وميعادنا من أول دقيقة الساعة 7:00 م." }
    : { eyebrow: "نداء للفريق", headline: "يا {name}، الفريق مستنيك.", copy: "ليلة هادية، ناس حلوة، وتعالى من البداية الساعة 7:00 م." };

  return (
    <main className={`invite-page ${female ? "invite-female" : "invite-male"}`} dir="rtl">
      <header className="invite-nav">
        <button onClick={backToEntry} className="back-link"><ChevronRight size={18} /> رجوع</button>
        <div className="brand-lockup"><img src={LOGO_URL} className="brand-logo" alt="شعار اجتماع الشباب بالأقصر" /><span>اجتماع الشباب بالأقصر</span></div>
      </header>

      <section className="invite-hero">
        <div className="hero-text">
          <p className="invite-eyebrow">{opening.eyebrow}</p>
          <h1>{opening.headline.replace("{name}", name)}</h1>
          <p>{opening.copy}</p>
          <div className="time-chip"><Clock3 size={16} /> الأربعاء · الحضور والبداية 7:00 م</div>
        </div>
        <div className="personal-note">
          <span>{female ? "رسالة هذا الأسبوع" : "خطة الليلة"}</span>
          <strong>{female ? "خدي وقتك وتعالي من أول دقيقة." : "خلي مكانك في الفريق محسوم من البداية."}</strong>
          <small>{female ? "هنفرح بوجودك." : "هنفرح بوجودك."}</small>
        </div>
      </section>

      <section className="program-section" aria-labelledby="program-title">
        <div className="program-head"><p>برنامج الاجتماع</p><h2 id="program-title">{female ? "ليلة بسيطة من أول خطوة" : "ليلة كاملة من أول لحظة"}</h2></div>
        <ol className={`male-sessions ${female ? "soft-sessions" : ""}`}>
          {sessions.map((session) => <li key={session.time} className={session.featured ? "is-main-event" : ""}><time>{session.time}<small>م</small></time><span /><div>{session.featured && <span className="main-event-label"><Sparkles size={12} /> لحظة خاصة الليلة</span>}<h3>{session.title}</h3><p>{session.note}</p></div></li>)}
        </ol>
      </section>

      <section className="action-section">
        <div className="arrival-orbit" aria-hidden="true"><i /><i /><Sparkles size={16} /></div>
        <div>
          <p><Sparkles size={15} /> خلي اسمك حاضر من البداية</p>
          <h2>{female ? "سجّلي موعدك وتعالي الساعة 7:00 م." : "ثبّت موعدك وتعالى الساعة 7:00 م."}</h2>
          <span>{female ? "هنستناكي من أول دقيقة." : "هنستناك من أول دقيقة."}</span>
        </div>
        <div className="action-buttons">
          <a className={`calendar-action ${attending ? "is-attending" : ""}`} href={calendar} target="_blank" rel="noreferrer" onClick={() => setAttending(true)}>
            {attending ? <CheckCircle2 size={19} /> : <CalendarPlus size={19} />}
            <span>{attending ? "تم فتح التقويم" : female ? "أنا جاية 7:00 م — ضيفي الموعد" : "أنا جاي 7:00 م — ضيف الموعد"}</span>
          </a>
          <button className="share-action" onClick={share}><Share2 size={18} /> {female ? "شاركي الرسالة" : "شارك الدعوة"}</button>
          {shareNote && <p className="share-note"><Copy size={14} /> {shareNote}</p>}
        </div>
      </section>
      <p className="calendar-note"><Heart size={14} /> اضغطي أو اضغط حضور، وسيُفتح موعدنا في تقويمك علشان متفوتناش من أول دقيقة.</p>
    </main>
  );
}
