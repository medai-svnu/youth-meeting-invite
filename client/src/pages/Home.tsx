/**
 * Design philosophy: «نداء النور» — ممر ضوء رأسي، اسم المدعو في المقدمة،
 * وكشف تدريجي يبدّل المعلومات من دعوة صامتة إلى وعد بلقاء دافئ.
 */
import { useMemo, useState } from "react";
import {
  ArrowDown,
  CalendarDays,
  ChevronDown,
  Clock3,
  DoorOpen,
  Flame,
  HeartHandshake,
  Music2,
  Sparkles,
  X,
} from "lucide-react";

const LOGO_URL = "/manus-storage/youth-service-logo_a6060761.jpeg";
const HERO_URL = "/manus-storage/youth-night-hero_6ebeb0e1.jpg";
const TIMELINE_ART_URL = "/manus-storage/youth-timeline-art_48b0c82b.jpg";
const FINAL_ART_URL = "/manus-storage/youth-final-invite_06dcd079.jpg";
const MARK_URL = "/manus-storage/youth-light-mark_ffaf3b02.png";

type AgendaItem = {
  time: string;
  title: string;
  note: string;
  icon: typeof Clock3;
  accent: "gold" | "turquoise";
};

const agenda: AgendaItem[] = [
  { time: "7:00", title: "الصلاة", note: "نبدأها سوا بقلب واحد.", icon: Flame, accent: "gold" },
  { time: "7:20", title: "الترانيم", note: "صوت واحد… وفرحة أكبر.", icon: Music2, accent: "turquoise" },
  { time: "7:30", title: "خلّيها مفاجأة", note: "مش عايزين نحرقها دلوقتي… تعالى واكتشف.", icon: Sparkles, accent: "gold" },
  { time: "8:15", title: "ملحمة الأسر", note: "فقرة تقرّبنا من بعض أكتر.", icon: HeartHandshake, accent: "turquoise" },
];

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [surpriseOpen, setSurpriseOpen] = useState(false);

  const invitation = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const rawName = (params.get("name") || "").trim();
    const gender = params.get("g")?.toLowerCase();
    const female = gender === "f";
    const name = rawName || "يا صديقنا";
    const isDefaultName = !rawName;

    return {
      name,
      female,
      isDefaultName,
      call: female ? "تعالي" : "تعالى",
      yours: female ? "ليكي" : "ليك",
      waiting: female ? "مستنياكي" : "مستنيك",
    };
  }, []);

  const revealInvite = () => {
    setOpened(true);
    window.setTimeout(() => document.getElementById("details")?.scrollIntoView({ behavior: "smooth", block: "start" }), 260);
  };

  return (
    <main className="invitation-shell" dir="rtl">
      <section className="hero-section" aria-labelledby="invite-title">
        <div className="hero-visual" style={{ backgroundImage: `url(${HERO_URL})` }} />
        <div className="hero-overlay" />
        <div className="hero-stars" aria-hidden="true">
          <i /><i /><i /><i /><i /><i />
        </div>

        <header className="invite-header">
          <div className="service-brand">
            <img src={LOGO_URL} alt="شعار اجتماع الشباب" className="service-logo" />
            <div className="brand-copy">
              <span>اجتماع الشباب</span>
              <strong>اجتماع الشباب بالأقصر</strong>
            </div>
          </div>
          <div className="wednesday-chip"><CalendarDays size={14} /> الأربعاء</div>
        </header>

        <div className="hero-content">
          <p className="eyebrow"><span /> دعوة شخصية <span /></p>
          <div className="name-orbit">
            <div className="orbit-ring orbit-ring-one" />
            <div className="orbit-ring orbit-ring-two" />
            <p className="name-prefix">{invitation.isDefaultName ? "أهلًا" : "يا"}</p>
            <h1 id="invite-title">{invitation.name}</h1>
            <p className="name-tail">المساء ده {invitation.waiting}.</p>
          </div>

          <p className="hero-message">
            في مكان حلو، في ناس حلوة، وفي وقت محتاجين نكون فيه مع بعض.
            <br />{invitation.call} نخلّي الأربعاء له معنى تاني.
          </p>

          <button className="seal-button" onClick={revealInvite} aria-expanded={opened}>
            <span className="seal-halo" />
            <span className="seal-center"><DoorOpen size={21} /> افتح الدعوة</span>
            <small>اضغط هنا</small>
          </button>

          <div className="time-lockup">
            <Clock3 size={17} />
            <span>الأربعاء</span>
            <b>7:00 م</b>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span>انزل وشوف اللي مستنيك</span><ChevronDown size={18} /></div>
      </section>

      <section id="details" className={`reveal-section ${opened ? "is-open" : ""}`} aria-hidden={!opened}>
        <div className="section-glow" />
        <div className="reveal-intro">
          <p className="eyebrow dark-eyebrow"><span /> ليلة على مزاجنا <span /></p>
          <h2>مش مجرد اجتماع.<br /><em>ده مكانك وسطنا.</em></h2>
          <p>
            دي مش مواعيد مكتوبة وخلاص؛ دي لحظات معمولة علشان نعيشها سوا. وكل لحظة فيها مستنياك.
          </p>
        </div>

        <div className="agenda-panel" style={{ backgroundImage: `linear-gradient(90deg, rgba(6,19,35,.98) 15%, rgba(6,19,35,.79) 65%, rgba(6,19,35,.42)), url(${TIMELINE_ART_URL})` }}>
          <div className="agenda-head">
            <span className="agenda-label">رحلتنا الليلة</span>
            <p>خطوة بخطوة… لحد ما نكملها سوا</p>
          </div>
          <ol className="agenda-list">
            {agenda.map((item, index) => {
              const Icon = item.icon;
              return (
                <li className={`agenda-item ${item.accent}`} key={item.time} style={{ animationDelay: `${0.12 + index * 0.1}s` }}>
                  <div className="agenda-time"><span>{item.time}</span><small>م</small></div>
                  <div className="agenda-marker"><span><Icon size={18} /></span></div>
                  <div className="agenda-copy">
                    <h3>{item.title}</h3>
                    <p>{item.note}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="surprise-block">
          <div className="surprise-orb"><Sparkles size={28} /></div>
          <div>
            <span className="surprise-label">عند 7:30</span>
            <h3>مش هَنحرقها دلوقتي.</h3>
            <p>{invitation.female ? "اللي محضرينه مستني ابتسامتك." : "اللي محضرينه مستني ضحكتك."}</p>
          </div>
          <button className="surprise-button" onClick={() => setSurpriseOpen(true)}>إيه المفاجأة؟</button>
        </div>
      </section>

      <section className="closing-section" style={{ backgroundImage: `linear-gradient(90deg, rgba(4,12,24,.96), rgba(4,12,24,.50) 60%, rgba(4,12,24,.80)), url(${FINAL_ART_URL})` }}>
        <div className="closing-content">
          <img src={MARK_URL} alt="رمز ضوء اجتماع الشباب" className="closing-mark" />
          <p className="eyebrow"><span /> نداء أخير <span /></p>
          <h2>{invitation.name}،<br />مكانك <em>مش كامل</em> من غيرك.</h2>
          <p className="closing-text">
            الكرسي ده مش صورة. ده مكان فعلاً {invitation.waiting}.<br />{invitation.call} نبدأها مع بعض، ونكمّلها مع بعض.
          </p>
          <a href="#invite-title" className="join-button"><span>أنا جاي بإذن الله</span><ArrowDown size={19} /></a>
          <p className="date-note"><CalendarDays size={16} /> الأربعاء، البداية 7:00 مساءً</p>
        </div>
      </section>

      {surpriseOpen && (
        <div className="surprise-modal" role="dialog" aria-modal="true" aria-labelledby="surprise-title">
          <button className="modal-close" onClick={() => setSurpriseOpen(false)} aria-label="إغلاق"><X size={20} /></button>
          <div className="modal-spark"><Sparkles size={31} /></div>
          <p>لسه بنخبي أحلى تفصيلة</p>
          <h2 id="surprise-title">المفاجأة الحقيقية<br />إنك تكون موجود.</h2>
          <span>الأربعاء · 7:30 م</span>
          <button onClick={() => setSurpriseOpen(false)}>وعد… هاجي</button>
        </div>
      )}
    </main>
  );
}
