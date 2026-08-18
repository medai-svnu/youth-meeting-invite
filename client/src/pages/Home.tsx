/**
 * Design philosophy: «قمر الأقصر» — صفحة دخول ليلية هادئة تشبه رسالة شخصية تحت ضوء القمر.
 * الاسم والموعد هما البطلان؛ لا مؤثرات إلكترونية ولا تفاعلات للزينة.
 */
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3, DoorOpen } from "lucide-react";
import { useLocation } from "wouter";

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
    [Math.floor(value / 86400000), "يوم"],
    [Math.floor((value % 86400000) / 3600000), "ساعة"],
    [Math.floor((value % 3600000) / 60000), "دقيقة"],
  ] as const;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [target] = useState(nextWednesdayAtSeven);
  const [clock, setClock] = useState(() => timeUntil(target));
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const female = params.get("g")?.toLowerCase() === "f";
  const name = (params.get("name") || "").trim() || (female ? "يا جميلة" : "يا بطل");

  useEffect(() => {
    const timer = window.setInterval(() => setClock(timeUntil(target)), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const openInvitation = () => setLocation(`/invite?${params.toString()}`);

  return (
    <main className={`entry-shell ${female ? "entry-female" : "entry-male"}`} dir="rtl">
      <div className="entry-art" />
      <div className="entry-overlay" />
      <header className="site-header">
        <div className="brand-lockup">
          <img src={LOGO_URL} className="brand-logo" alt="شعار اجتماع الشباب بالأقصر" />
          <span>اجتماع الشباب بالأقصر</span>
        </div>
        <div className="header-day"><CalendarDays size={15} /> الأربعاء</div>
      </header>

      <section className="entry-card" aria-labelledby="entry-name">
        <div className="entry-name-ritual">
          <div className="entry-orbit" aria-hidden="true"><i /><i /><i /></div>
          <p className="entry-kicker">{female ? "رسالة خاصة ليكي" : "دعوة خاصة ليك"}</p>
          <h1 id="entry-name">{name}</h1>
        </div>
        <p className="entry-copy">
          {female
            ? "في رسالة صغيرة مستنياكي… وميعادنا من أول دقيقة، الساعة 7:00 م."
            : "في دعوة باسمك مستنياك… وتعالى من البداية، الساعة 7:00 م."}
        </p>
        <button className="open-invite" onClick={openInvitation}>
          <DoorOpen size={19} />
          <span>{female ? "افتحي رسالتك" : "افتح دعوتك"}</span>
        </button>
      </section>

      <section className="entry-countdown" aria-label="الوقت المتبقي للاجتماع">
        <p><Clock3 size={15} /> الأربعاء · الحضور والبداية 7:00 م</p>
        <div>
          {clock.map(([value, label]) => <span key={label}><b>{String(value).padStart(2, "0")}</b><small>{label}</small></span>)}
        </div>
      </section>
    </main>
  );
}
