/**
 * Dynamic invitation profile: URL → parameters → typed state → personal Arabic copy.
 * The g parameter is the sole source of gendered wording; names are never used to infer it.
 */
export type InviteGender = "female" | "male" | "neutral";

type InvitationCopy = {
  personalInvitation: string;
  ready: string;
  openStamp: string;
  openingHeadline: (name: string) => string;
  openingBody: string;
  noteLabel: string;
  personalNote: string;
  programHeadline: string;
  reactionHint: string;
  shareText: string;
  shareButton: string;
  copiedLink: string;
  finalWait: string;
  finalLead: string;
  finalStrong: string;
  attendanceButton: string;
  arrival: string;
  celebration: string;
  secretTitle: string;
  lateMessage: string;
};

export type InviteProfile = {
  name: string;
  gender: InviteGender;
  isFemale: boolean;
  isMale: boolean;
  extras: Record<string, string>;
  copy: InvitationCopy;
};

const COPY: Record<InviteGender, InvitationCopy> = {
  female: {
    personalInvitation: "دعوة من النوع اللي بتتقال بهدوء 🤍",
    ready: "مستعدة تسمعي؟",
    openStamp: "افتحي الدعوة",
    openingHeadline: (name) => `يا ${name}، الارتباط يبدأ من كلمة صادقة.`,
    openingBody: "مساحة راقية نتكلم فيها عن القرب، الاختيار، والحدود اللي بتحفظ القلب.",
    noteLabel: "موضوع اليوم",
    personalNote: "مش كل إعجاب ارتباط، ومش كل قرب أمان. تعالي نعرف الفرق.",
    programHeadline: "من أول سؤال… لحد صورة أوضح عن الارتباط.",
    reactionHint: "اختاري الكلمة الأقرب لقلبك.",
    shareText: "دي دعوتي ليوم «شجرة واتنين ليمون» في الأقصر. كلام صادق عن الارتباط والاختيار والحدود. ياريت تكوني معانا.",
    shareButton: "شاركي الدعوة",
    copiedLink: "تم نسخ الرابط. شاركيه مع صحابك.",
    finalWait: "خدي معاكِ فكرة تليق بقلبك وتكبر مع الوقت.",
    finalLead: "الارتباط مش صدفة.",
    finalStrong: "هو اختيار واعي.",
    attendanceButton: "أنا جاية أفهم أكتر",
    arrival: "مستنيين رأيك 🤍",
    celebration: "كلمة صادقة تغيّر كتير 🤍",
    secretTitle: "القلب له حدود",
    lateMessage: "القرب الصحي يبدأ باحترام ووضوح.",
  },
  male: {
    personalInvitation: "دعوة من النوع اللي بتتقال بهدوء 🤍",
    ready: "جاهز تسمع؟",
    openStamp: "افتح الدعوة",
    openingHeadline: (name) => `يا ${name}، الارتباط يبدأ من كلمة صادقة.`,
    openingBody: "مساحة راقية نتكلم فيها عن القرب، الاختيار، والحدود اللي بتحفظ القلب.",
    noteLabel: "موضوع اليوم",
    personalNote: "مش كل إعجاب ارتباط، ومش كل قرب أمان. تعالى نعرف الفرق.",
    programHeadline: "من أول سؤال… لحد صورة أوضح عن الارتباط.",
    reactionHint: "خد الكلمة الأقرب لقلبك.",
    shareText: "دي دعوتي ليوم «شجرة واتنين ليمون» في الأقصر. كلام صادق عن الارتباط والاختيار والحدود. ياريت تكون معانا.",
    shareButton: "شارك الدعوة",
    copiedLink: "تم نسخ الرابط. شاركه مع صحابك.",
    finalWait: "خد معاك فكرة تليق بقلبك وتكبر مع الوقت.",
    finalLead: "الارتباط مش صدفة.",
    finalStrong: "هو اختيار واعي.",
    attendanceButton: "أنا جاي أفهم أكتر",
    arrival: "مستنيين رأيك 🤍",
    celebration: "كلمة صادقة تغيّر كتير 🤍",
    secretTitle: "القلب له حدود",
    lateMessage: "القرب الصحي يبدأ باحترام ووضوح.",
  },
  neutral: {
    personalInvitation: "دعوة من النوع اللي بتتقال بهدوء 🤍",
    ready: "جاهز/ة تسمع؟",
    openStamp: "افتح الدعوة",
    openingHeadline: (name) => `يا ${name}، الارتباط يبدأ من كلمة صادقة.`,
    openingBody: "مساحة راقية نتكلم فيها عن القرب، الاختيار، والحدود اللي بتحفظ القلب.",
    noteLabel: "موضوع اليوم",
    personalNote: "مش كل إعجاب ارتباط، ومش كل قرب أمان. تعالى/ي نعرف الفرق.",
    programHeadline: "من أول سؤال… لحد صورة أوضح عن الارتباط.",
    reactionHint: "خد/ي الكلمة الأقرب لقلبك.",
    shareText: "دي دعوة ليوم «شجرة واتنين ليمون» في الأقصر. كلام صادق عن الارتباط والاختيار والحدود. ياريت تكون/ي معانا.",
    shareButton: "مشاركة الدعوة",
    copiedLink: "تم نسخ الرابط. شاركه بالطريقة التي تناسبك.",
    finalWait: "خد/ي معاك فكرة تليق بقلبك وتكبر مع الوقت.",
    finalLead: "الارتباط مش صدفة.",
    finalStrong: "هو اختيار واعي.",
    attendanceButton: "أنا جاي/ة أفهم أكتر",
    arrival: "مستنيين رأيك 🤍",
    celebration: "كلمة صادقة تغيّر كتير 🤍",
    secretTitle: "القلب له حدود",
    lateMessage: "القرب الصحي يبدأ باحترام ووضوح.",
  },
};

function safelyDecode(value: string) {
  try {
    return value.includes("%") ? decodeURIComponent(value) : value;
  } catch {
    return value;
  }
}

function normalizedSearch(search: string) {
  if (/^https?:\/\//i.test(search)) {
    try {
      return new URL(search).search;
    } catch {
      return search;
    }
  }
  return search.startsWith("?") ? search : `?${search}`;
}

function normalizedName(value: string) {
  return safelyDecode(value)
    .normalize("NFC")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .replace(/^يا\s+/, "")
    .trim();
}

export function getInviteProfile(search = window.location.search): InviteProfile {
  const params = new URLSearchParams(normalizedSearch(search));
  const rawGender = params.get("g")?.trim().toLowerCase();
  const gender: InviteGender = rawGender === "f" ? "female" : rawGender === "m" ? "male" : "neutral";
  const suppliedName = normalizedName(params.get("name") || "");
  const name = suppliedName || "ضيفنا";
  const extras = Object.fromEntries(Array.from(params.entries()).filter(([key]) => key !== "name" && key !== "g"));

  return { name, gender, isFemale: gender === "female", isMale: gender === "male", extras, copy: COPY[gender] };
}
