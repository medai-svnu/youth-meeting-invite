/**
 * Design philosophy: «Wednesday Pulse / Link Lab» — أداة داخلية واضحة، تجعل تجهيز الدعوات الشخصية دفعة واحدة سريعاً ومنظماً.
 */
import { ArrowUpLeft, Check, ChevronRight, Copy, Download, ExternalLink, Link2, MessageCircle, Sparkles, UsersRound, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";

const LOGO_URL = "/manus-storage/youth-service-logo_a6060761.jpeg";
const MAX_INVITES = 250;
type Gender = "m" | "f";
type InviteLink = { id: string; name: string; gender: Gender; url: string };

function parseGuestList(value: string, defaultGender: Gender) {
  return value
    .split(/\n|،|,/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, MAX_INVITES)
    .map((line) => {
      const [rawName, rawGender = ""] = line.split(/[|:]/).map((part) => part.trim());
      const normalizedName = rawName.replace(/^يا\s+/, "").trim();
      const genderHint = rawGender.toLowerCase();
      const gender: Gender = /^(f|female|girl|بنت|بنات|أنثى|انثى)$/.test(genderHint) ? "f" : /^(m|male|boy|ولد|أولاد|اولاد|ذكر)$/.test(genderHint) ? "m" : defaultGender;
      return { name: normalizedName, gender };
    })
    .filter((guest) => guest.name.length > 0);
}

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const field = document.createElement("textarea");
  field.value = value;
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  document.execCommand("copy");
  field.remove();
}

function whatsAppShareUrl(link: InviteLink) {
  const message = `يا ${link.name} 🍋\nدي دعوتك ليوم «شجرة واتنين ليمون».\nكلام صادق عن الارتباط والاختيار والحدود.\n${link.url}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export default function Generator() {
  const [, setLocation] = useLocation();
  const [rawNames, setRawNames] = useState("");
  const [defaultGender, setDefaultGender] = useState<Gender>("m");
  const [links, setLinks] = useState<InviteLink[]>([]);
  const [notice, setNotice] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const baseUrl = useMemo(() => window.location.origin, []);

  const buildLinks = () => {
    const guests = parseGuestList(rawNames, defaultGender);
    if (!guests.length) {
      setNotice("اكتب اسماً واحداً على الأقل قبل توليد الروابط.");
      return;
    }
    const generated = guests.map((guest, index) => ({
      id: `${guest.name}-${guest.gender}-${index}`,
      ...guest,
      url: `${baseUrl}/?name=${encodeURIComponent(guest.name)}&g=${guest.gender}`,
    }));
    setLinks(generated);
    setNotice(`تم تجهيز ${generated.length} رابط${generated.length === 1 ? "" : "اً"} شخصي${generated.length === 1 ? "" : "اً"}.`);
  };

  const copyOne = async (link: InviteLink) => {
    try {
      await copyToClipboard(link.url);
      setCopiedId(link.id);
      setNotice(`تم نسخ رابط ${link.name}.`);
      window.setTimeout(() => setCopiedId(null), 1300);
    } catch {
      setNotice("تعذّر النسخ تلقائياً؛ يمكنك تحديد الرابط ونسخه.");
    }
  };

  const copyAll = async () => {
    if (!links.length) return;
    const list = links.map((link) => `${link.name} — ${link.gender === "f" ? "قالب البنات" : "قالب الأولاد"}\n${link.url}`).join("\n\n");
    try {
      await copyToClipboard(list);
      setNotice("تم نسخ كل الروابط بصيغة جاهزة للمشاركة.");
    } catch {
      setNotice("تعذّر النسخ تلقائياً؛ جرّب تنزيل القائمة.");
    }
  };

  const downloadList = () => {
    if (!links.length) return;
    const text = links.map((link) => `${link.name}\t${link.gender === "f" ? "بنت" : "ولد"}\t${link.url}`).join("\n");
    const objectUrl = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = "روابط-شجرة-واتنين-ليمون.txt";
    anchor.click();
    URL.revokeObjectURL(objectUrl);
    setNotice("تم تنزيل ملف الروابط.");
  };

  const girls = links.filter((link) => link.gender === "f").length;
  const boys = links.length - girls;

  return (
    <main className="generator-page" dir="rtl">
      <div className="generator-spark-field" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <header className="generator-header">
        <button className="generator-back" type="button" onClick={() => setLocation("/")}><ChevronRight size={18} /> الدعوة</button>
        <div className="brand-lockup"><img src={LOGO_URL} className="brand-logo" alt="شعار شجرة واتنين ليمون" /><span>شجرة واتنين ليمون</span></div>
      </header>

      <section className="generator-hero">
        <p><Sparkles size={15} /> LINK LAB / أداة الخدمة</p>
        <h1>حضّر دعوات باسم كل شخص.<br /><b>دفعة واحدة.</b></h1>
        <span>الرابط يضع الاسم داخل دعوة «شجرة واتنين ليمون» تلقائياً، ويختار قالب الأولاد أو البنات من غير أي تعديل يدوي لاحقاً.</span>
      </section>

      <section className="generator-shell" aria-label="مولد روابط الدعوات">
        <form className="generator-form" onSubmit={(event) => { event.preventDefault(); buildLinks(); }}>
          <div className="lab-label"><WandSparkles size={15} /> 01 / أدخل الأسماء</div>
          <label htmlFor="guest-list">اسم واحد في كل سطر</label>
          <textarea id="guest-list" value={rawNames} onChange={(event) => setRawNames(event.target.value)} placeholder={"جولي | f\nمكاريوس | m\nمينا"} aria-describedby="guest-help" />
          <p id="guest-help">يمكنك كتابة <b>| f</b> للبنات أو <b>| m</b> للأولاد بعد الاسم. إن لم تحدد النوع، سنستخدم الاختيار الافتراضي أدناه.</p>
          <fieldset>
            <legend>القالب الافتراضي للأسماء بلا نوع</legend>
            <div className="gender-switch">
              <button className={defaultGender === "m" ? "is-active" : ""} type="button" onClick={() => setDefaultGender("m")}>قالب الأولاد</button>
              <button className={defaultGender === "f" ? "is-active" : ""} type="button" onClick={() => setDefaultGender("f")}>قالب البنات</button>
            </div>
          </fieldset>
          <button className="generate-links" type="submit"><Link2 size={18} /> توليد الروابط</button>
        </form>

        <aside className="generator-results" aria-live="polite">
          <div className="results-heading">
            <div><span className="lab-label"><UsersRound size={15} /> 02 / الروابط الجاهزة</span><h2>{links.length ? "جهّزناها لك" : "هتظهر الروابط هنا"}</h2></div>
            {links.length > 0 && <div className="result-count"><b>{links.length}</b><small>دعوة</small></div>}
          </div>
          {links.length > 0 ? (
            <>
              <div className="result-summary"><span>👦 {boys} أولاد</span><span>👧 {girls} بنات</span></div>
              <div className="link-list">
                {links.map((link) => <article key={link.id} className={`generated-link ${link.gender === "f" ? "girl-link" : "boy-link"}`}>
                  <div><b>{link.name}</b><small>{link.gender === "f" ? "قالب البنات" : "قالب الأولاد"}</small></div>
                  <code>{link.url}</code>
                  <div className="link-actions"><button type="button" onClick={() => void copyOne(link)}>{copiedId === link.id ? <Check size={15} /> : <Copy size={15} />}{copiedId === link.id ? "تم النسخ" : "نسخ"}</button><a className="whatsapp-action" href={whatsAppShareUrl(link)} target="_blank" rel="noreferrer" aria-label={`إرسال دعوة ${link.name} عبر واتساب`}><MessageCircle size={15} /> واتساب</a><a href={link.url} target="_blank" rel="noreferrer"><ExternalLink size={15} /> معاينة</a></div>
                </article>)}
              </div>
              <div className="bulk-actions"><button type="button" onClick={() => void copyAll()}><Copy size={16} /> نسخ كل الروابط</button><button type="button" onClick={downloadList}><Download size={16} /> تنزيل القائمة</button></div>
            </>
          ) : (
            <div className="empty-links"><Link2 size={29} /><p>اكتب الأسماء ثم اضغط «توليد الروابط».</p><small>سننشئ حتى {MAX_INVITES} رابطاً في الدفعة الواحدة.</small></div>
          )}
          {notice && <p className="generator-notice">{notice}</p>}
        </aside>
      </section>
      <p className="generator-footnote"><ArrowUpLeft size={14} /> الروابط تظل على نطاق دعوتك الحالي وتفتح صفحة دخول شخصية لكل مدعو.</p>
    </main>
  );
}
