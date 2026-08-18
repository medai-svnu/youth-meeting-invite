/**
 * Design philosophy: «نداء النور المتحوّل» — دعوتان مستقلتان تماماً:
 * ساحة ضوء كهربائية للأولاد وحديقة نجوم دافئة للبنات، والاسم يقود التجربة من الرابط.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  DoorOpen,
  Flame,
  Gem,
  Heart,
  HeartHandshake,
  LockKeyhole,
  Music2,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Star,
  Volume2,
  X,
  Zap,
  type LucideIcon,
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
  tap: string;
  icon: LucideIcon;
};

type Boost = {
  title: string;
  note: string;
  icon: LucideIcon;
};

type Template = {
  gender: "male" | "female";
  eyebrow: string;
  title: string;
  hero: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionAccent: string;
  sectionCopy: string;
  agendaLabel: string;
  agendaLead: string;
  surpriseTitle: string;
  surpriseCopy: string;
  surpriseButton: string;
  finalEyebrow: string;
  finalTitle: string;
  finalAccent: string;
  finalCopy: string;
  hypePrompt: string;
  hypeDone: string;
  boosts: Boost[];
  agenda: AgendaItem[];
};

const MALE_TEMPLATE: Template = {
  gender: "male",
  eyebrow: "نداء للفريق",
  title: "ليلة فيها صوتك",
  hero: "الليلة دي مش حضور وخلاص. دي مساحة فريق محتاجة ضحكتك وصوتك وحضورك من أول لحظة.",
  sectionEyebrow: "خريطة التحدّي",
  sectionTitle: "في ناس بتتفرّج.",
  sectionAccent: "وإحنا بنشعل الليلة.",
  sectionCopy: "كل محطة هتدّيك طاقة جديدة. اضغط عليها واحدة واحدة وشوف النداء بيزيد إزاي.",
  agendaLabel: "المسار الليلي",
  agendaLead: "اتحرك معانا من أول شرارة لآخر لحظة",
  surpriseTitle: "في حاجة مستخبية للفريق.",
  surpriseCopy: "بس مش هتعرفها غير وإنت وسطنا.",
  surpriseButton: "افتح التلميح",
  finalEyebrow: "المقعد ليك",
  finalTitle: "يا {name}، الفريق",
  finalAccent: "ناقص من غيرك.",
  finalCopy: "تعالى نبدأ بقوة ونكمّل الليلة سوا. مكانك متساب باسمك.",
  hypePrompt: "فعّل 3 شرارات علشان تفتح مسار الليلة",
  hypeDone: "كده تمام… مسار الليلة اشتغل!",
  boosts: [
    { title: "شغّل العزم", note: "أول دفعة للفريق", icon: Zap },
    { title: "زوّد الصوت", note: "خلي الحماس يعلى", icon: Volume2 },
    { title: "ثبّت حضورك", note: "المقعد اتقفل باسمك", icon: ShieldCheck },
  ],
  agenda: [
    { time: "7:00", title: "الصلاة", note: "نبدأها بقلب واحد وتركيز كامل.", tap: "أول شرارة اتفتحت.", icon: Flame },
    { time: "7:20", title: "الترانيم", note: "صوتك جزء من الصورة الكبيرة.", tap: "الصوت بدأ يعلى.", icon: Music2 },
    { time: "7:30", title: "ملف سرّي", note: "مش هنحرقه… تعالى وشوف بنفسك.", tap: "التلميح اتسجّل عندك.", icon: LockKeyhole },
    { time: "8:15", title: "ملحمة الأسر", note: "وقت الضحك واللمة والروح الحلوة.", tap: "اللمة اكتملت بوجودك.", icon: HeartHandshake },
  ],
};

const FEMALE_TEMPLATE: Template = {
  gender: "female",
  eyebrow: "رسالة ليكي",
  title: "ليلة على نورك",
  hero: "الليلة دي فيها فرحة خفيفة، ناس قريبة، وحكاية مش هتحلى إلا لما تكوني موجودة فيها.",
  sectionEyebrow: "خيط النور",
  sectionTitle: "مش مجرد موعد.",
  sectionAccent: "دي مساحتك وسطنا.",
  sectionCopy: "كل لمسة هتنور محطة جديدة. اضغطي على التفاصيل وخلّي اللمعة تكمل معاكي.",
  agendaLabel: "حكاية الأربعاء",
  agendaLead: "خيط نور صغير يوصلنا من أول لحظة لآخر ضحكة",
  surpriseTitle: "في لمعة خاصة مستخبية ليكي.",
  surpriseCopy: "ومكانها الحقيقي هيكون وإنت وسطنا.",
  surpriseButton: "شوفي التلميح",
  finalEyebrow: "كرسيك مستنيكي",
  finalTitle: "يا {name}، الحكاية",
  finalAccent: "أحلى بوجودك.",
  finalCopy: "تعالي نبدأ على نور ونكملها بضحك وصور ولحظات حلوة سوا.",
  hypePrompt: "نوّري 3 لمعات علشان تفتحي حكاية الليلة",
  hypeDone: "النور اكتمل… حكاية الأربعاء جاهزة ليكي!",
  boosts: [
    { title: "ولّعي نجمة", note: "أول لمعة في الحكاية", icon: Star },
    { title: "زوّدي البهجة", note: "خلّي الجو يلمع", icon: Heart },
    { title: "ثبّتي وعدك", note: "كرسيك بقى ليكي", icon: Gem },
  ],
  agenda: [
    { time: "7:00", title: "الصلاة", note: "نبدأها براحة القلب ودفء اللمة.", tap: "أول لمعة ظهرت.", icon: Flame },
    { time: "7:20", title: "الترانيم", note: "صوت واحد وفرحة بتكبر بينا.", tap: "الفرحة بدأت تسمع.", icon: Music2 },
    { time: "7:30", title: "سر صغير", note: "مش هنقول… بس يستاهل إنك تيجي.", tap: "التلميح بقى ملكك.", icon: Sparkles },
    { time: "8:15", title: "ملحمة الأسر", note: "لمة فيها حكايات وضحك وقرب أكتر.", tap: "اللمة نورت بوجودك.", icon: HeartHandshake },
  ],
};

function nextWednesdayAtSeven() {
  const now = new Date();
  const target = new Date(now);
  const distance = (3 - now.getDay() + 7) % 7;
  target.setDate(now.getDate() + distance);
  target.setHours(19, 0, 0, 0);
  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 7);
  return target;
}

function getTimeLeft(target: Date) {
  const difference = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference % 86400000) / 3600000),
    minutes: Math.floor((difference % 3600000) / 60000),
    seconds: Math.floor((difference % 60000) / 1000),
  };
}

function useCountdown() {
  const [target] = useState(nextWednesdayAtSeven);
  const [remaining, setRemaining] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getTimeLeft(target)), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  return remaining;
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [hypeLevel, setHypeLevel] = useState(0);
  const [activeAgenda, setActiveAgenda] = useState<number | null>(null);
  const countdown = useCountdown();

  const invitation = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const rawName = (params.get("name") || "").trim();
    const female = params.get("g")?.toLowerCase() === "f";
    const name = rawName || (female ? "يا جميلة" : "يا بطل");
    return {
      name,
      female,
      call: female ? "تعالي" : "تعالى",
      yours: female ? "ليكي" : "ليك",
      waiting: female ? "مستنياكي" : "مستنيك",
    };
  }, []);

  const template = invitation.female ? FEMALE_TEMPLATE : MALE_TEMPLATE;
  const timeUnits = [
    { label: "يوم", value: countdown.days },
    { label: "ساعة", value: countdown.hours },
    { label: "دقيقة", value: countdown.minutes },
    { label: "ثانية", value: countdown.seconds },
  ];

  const revealInvite = () => {
    setOpened(true);
    window.setTimeout(() => document.getElementById("details")?.scrollIntoView({ behavior: "smooth", block: "start" }), 240);
  };

  const activateBoost = (index: number) => {
    if (index > hypeLevel) return;
    const nextLevel = Math.max(hypeLevel, index + 1);
    setHypeLevel(nextLevel);
    if (nextLevel === template.boosts.length) {
      setOpened(true);
      window.setTimeout(() => document.getElementById("details")?.scrollIntoView({ behavior: "smooth", block: "start" }), 440);
    }
  };

  return (
    <main className={`invitation-shell template-${template.gender}`} dir="rtl">
      <section className="hero-section" aria-labelledby="invite-title">
        <div className="hero-visual" style={{ backgroundImage: `url(${HERO_URL})` }} />
        <div className="hero-overlay" />
        <div className="hero-stars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>

        <header className="invite-header">
          <div className="service-brand">
            <img src={LOGO_URL} alt="شعار اجتماع الشباب" className="service-logo" />
            <div className="brand-copy"><span>اجتماع الشباب</span><strong>اجتماع الشباب بالأقصر</strong></div>
          </div>
          <div className="wednesday-chip"><CalendarDays size={14} /> الأربعاء</div>
        </header>

        <div className="hero-content">
          <p className="eyebrow"><span /> {template.eyebrow} <span /></p>
          <div className={`name-stage ${template.gender}-stage`}>
            <div className="stage-orbit stage-orbit-one" />
            <div className="stage-orbit stage-orbit-two" />
            <p className="name-prefix">{template.title}</p>
            <h1 id="invite-title">{invitation.name}</h1>
            <p className="name-tail">المساء ده {invitation.waiting}.</p>
          </div>
          <p className="hero-message">{template.hero}<br />{invitation.call} نخلّي الأربعاء له طعم جديد.</p>

          <button className="seal-button" onClick={revealInvite} aria-expanded={opened}>
            <span className="seal-halo" />
            <span className="seal-center"><DoorOpen size={21} /> افتح الدعوة</span>
            <small>أو فعّل الشرارات تحت</small>
          </button>

          <section className="countdown-card" aria-label="الوقت المتبقي للاجتماع">
            <p><Clock3 size={15} /> باقي على الأربعاء الساعة 7:00 م</p>
            <div className="countdown-units">
              {timeUnits.map((unit) => <div className="count-unit" key={unit.label}><b>{String(unit.value).padStart(2, "0")}</b><span>{unit.label}</span></div>)}
            </div>
          </section>

          <div className="hype-intro" aria-live="polite"><PartyPopper size={16} /><span>{hypeLevel === template.boosts.length ? template.hypeDone : template.hypePrompt}</span></div>
          <div className="boost-grid">
            {template.boosts.map((boost, index) => {
              const Icon = boost.icon;
              const active = index < hypeLevel;
              const locked = index > hypeLevel;
              return (
                <button key={boost.title} className={`boost-card ${active ? "is-active" : ""} ${locked ? "is-locked" : ""}`} onClick={() => activateBoost(index)} aria-pressed={active}>
                  <span className="boost-icon">{active ? <Check size={19} /> : <Icon size={19} />}</span>
                  <strong>{boost.title}</strong><small>{active ? "اتفعّلت!" : boost.note}</small>
                </button>
              );
            })}
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span>انزل وشوف اللي مستنيك</span><ChevronDown size={18} /></div>
      </section>

      <section id="details" className={`reveal-section ${opened ? "is-open" : ""}`} aria-hidden={!opened}>
        <div className="section-glow" />
        <div className="reveal-intro">
          <p className="eyebrow dark-eyebrow"><span /> {template.sectionEyebrow} <span /></p>
          <h2>{template.sectionTitle}<br /><em>{template.sectionAccent}</em></h2>
          <p>{template.sectionCopy}</p>
        </div>

        <div className="agenda-panel" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,13,27,.97) 10%, rgba(5,13,27,.71) 63%, rgba(5,13,27,.28)), url(${TIMELINE_ART_URL})` }}>
          <div className="agenda-head"><span className="agenda-label">{template.agendaLabel}</span><p>{template.agendaLead}</p></div>
          <ol className="agenda-list">
            {template.agenda.map((item, index) => {
              const Icon = item.icon;
              const active = activeAgenda === index;
              return (
                <li key={item.time}>
                  <button className={`agenda-item ${active ? "is-active" : ""}`} onClick={() => setActiveAgenda(index)} aria-pressed={active}>
                    <span className="agenda-time"><b>{item.time}</b><small>م</small></span>
                    <span className="agenda-marker"><Icon size={18} /></span>
                    <span className="agenda-copy"><strong>{item.title}</strong><small>{active ? item.tap : item.note}</small></span>
                    <Sparkles className="agenda-spark" size={14} />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="surprise-block">
          <div className="surprise-orb"><Sparkles size={28} /></div>
          <div><span className="surprise-label">عند 7:30</span><h3>{template.surpriseTitle}</h3><p>{template.surpriseCopy}</p></div>
          <button className="surprise-button" onClick={() => setSurpriseOpen(true)}>{template.surpriseButton}</button>
        </div>
      </section>

      <section className="closing-section" style={{ backgroundImage: `linear-gradient(90deg, rgba(4,12,24,.97), rgba(4,12,24,.44) 60%, rgba(4,12,24,.78)), url(${FINAL_ART_URL})` }}>
        <div className="closing-content">
          <img src={MARK_URL} alt="رمز ضوء اجتماع الشباب" className="closing-mark" />
          <p className="eyebrow"><span /> {template.finalEyebrow} <span /></p>
          <h2>{template.finalTitle.replace("{name}", invitation.name)}<br /><em>{template.finalAccent}</em></h2>
          <p className="closing-text">{template.finalCopy}<br />{invitation.call} نخليها ليلة تفضل في الذاكرة.</p>
          <a href="#invite-title" className="join-button"><span>{invitation.female ? "أنا جاية بإذن الله" : "أنا جاي بإذن الله"}</span><ArrowDown size={19} /></a>
          <p className="date-note"><CalendarDays size={16} /> الأربعاء، البداية 7:00 مساءً</p>
        </div>
      </section>

      {surpriseOpen && <div className="surprise-modal" role="dialog" aria-modal="true" aria-labelledby="surprise-title">
        <button className="modal-close" onClick={() => setSurpriseOpen(false)} aria-label="إغلاق"><X size={20} /></button>
        <div className="modal-spark"><Sparkles size={31} /></div>
        <p>{invitation.female ? "خليكي فضولية شوية" : "خليك متحمس شوية"}</p>
        <h2 id="surprise-title">{invitation.female ? "المفاجأة الحقيقية\nإنك تكوني موجودة." : "المفاجأة الحقيقية\nإنك تكون موجود."}</h2>
        <span>الأربعاء · 7:30 م</span>
        <button onClick={() => setSurpriseOpen(false)}>{invitation.female ? "وعد… هاجي" : "وعد… هاجي"}</button>
      </div>}
    </main>
  );
}
