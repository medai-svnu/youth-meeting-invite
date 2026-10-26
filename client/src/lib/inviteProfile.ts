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
    personalInvitation: "دعوة لصلاة هادئة ❤️",
    ready: "مستعدة تصلي؟",
    openStamp: "افتحي الدعوة",
    openingHeadline: (name) => `يا ${name}، ربنا سامعك.`,
    openingBody: "وقت هادي نرفع فيه قلوبنا مع بعض، ونفتكر إن الله يسمعنا.",
    noteLabel: "رسالة الصلاة",
    personalNote: "تعالي كما أنتِ؛ صلاتك مسموعة ووجودك مهم.",
    programHeadline: "خطوات بسيطة نصليها بقلب واحد.",
    reactionHint: "خدي لحظة هدوء قبل ما تختاري.",
    shareText: "دي دعوتي لاجتماع صلاة الشباب بالأقصر يوم الأربعاء. الله يسمعنا. ياريت تكوني معانا.",
    shareButton: "شاركي الدعوة",
    copiedLink: "تم نسخ الرابط. شاركيه مع صحابك.",
    finalWait: "ربنا يملأ وقتنا سلامًا وحضورًا.",
    finalLead: "الله يسمعنا.",
    finalStrong: "صلّي معانا.",
    attendanceButton: "هصلي معاكم",
    arrival: "مستنيين صلاتك ❤️",
    celebration: "الله يسمعنا ❤️",
    secretTitle: "خدي نفسًا هادئًا",
    lateMessage: "خلي قلبك حاضرًا في الصلاة.",
  },
  male: {
    personalInvitation: "دعوة لصلاة هادئة ❤️",
    ready: "جاهز تصلي؟",
    openStamp: "افتح الدعوة",
    openingHeadline: (name) => `يا ${name}، ربنا سامعك.`,
    openingBody: "وقت هادي نرفع فيه قلوبنا مع بعض، ونفتكر إن الله يسمعنا.",
    noteLabel: "رسالة الصلاة",
    personalNote: "تعالى كما أنت؛ صلاتك مسموعة ووجودك مهم.",
    programHeadline: "خطوات بسيطة نصليها بقلب واحد.",
    reactionHint: "خد لحظة هدوء قبل ما تختار.",
    shareText: "دي دعوتي لاجتماع صلاة الشباب بالأقصر يوم الأربعاء. الله يسمعنا. ياريت تكون معانا.",
    shareButton: "شارك الدعوة",
    copiedLink: "تم نسخ الرابط. شاركه مع صحابك.",
    finalWait: "ربنا يملأ وقتنا سلامًا وحضورًا.",
    finalLead: "الله يسمعنا.",
    finalStrong: "صلّي معانا.",
    attendanceButton: "هصلي معاكم",
    arrival: "مستنيين صلاتك ❤️",
    celebration: "الله يسمعنا ❤️",
    secretTitle: "خد نفسًا هادئًا",
    lateMessage: "خلي قلبك حاضرًا في الصلاة.",
  },
  neutral: {
    personalInvitation: "دعوة لصلاة هادئة ❤️",
    ready: "جاهز/ة تصلي؟",
    openStamp: "افتح الدعوة",
    openingHeadline: (name) => `يا ${name}، ربنا سامعك.`,
    openingBody: "وقت هادي نرفع فيه قلوبنا مع بعض، ونفتكر إن الله يسمعنا.",
    noteLabel: "رسالة الصلاة",
    personalNote: "تعالى/ي كما أنت؛ صلاتك مسموعة ووجودك مهم.",
    programHeadline: "خطوات بسيطة نصليها بقلب واحد.",
    reactionHint: "خد/ي لحظة هدوء قبل ما تختار/ي.",
    shareText: "دي دعوة لاجتماع صلاة الشباب بالأقصر يوم الأربعاء. الله يسمعنا. ياريت تكون/ي معانا.",
    shareButton: "مشاركة الدعوة",
    copiedLink: "تم نسخ الرابط. شاركه بالطريقة التي تناسبك.",
    finalWait: "ربنا يملأ وقتنا سلامًا وحضورًا.",
    finalLead: "الله يسمعنا.",
    finalStrong: "صلّي معانا.",
    attendanceButton: "هصلي معاكم",
    arrival: "مستنيين صلاتك ❤️",
    celebration: "الله يسمعنا ❤️",
    secretTitle: "خد/ي نفسًا هادئًا",
    lateMessage: "خلي قلبك حاضرًا في الصلاة.",
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
