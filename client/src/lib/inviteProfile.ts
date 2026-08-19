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
  surpriseNote: string;
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
    personalInvitation: "الدعوة دي ليكي ❤️",
    ready: "جاهزة؟ 👀",
    openStamp: "افتحي الختم",
    openingHeadline: (name) => `يا ${name}، الحكاية أحلى وإنتِ فيها.`,
    openingBody: "ناس قريبة، طاقة حلوة، وموعدنا من أول دقيقة.",
    noteLabel: "رسالة هذا الأسبوع",
    personalNote: "وجودك من أول دقيقة هيخلي اللمة أحلى.",
    surpriseNote: "مش هنحرقها دلوقتي… بس لازم تكوني موجودة من البداية.",
    programHeadline: "من أول صلاة… لحد المفاجأة اللي مستنياكي.",
    reactionHint: "اختاري إحساسك قبل ما تقرري.",
    shareText: "دي دعوتي لاجتماع الشباب بالأقصر يوم الأربعاء. ميعادنا من 7:00 م. تعالي معايا من البداية!",
    shareButton: "شاركي الرسالة",
    copiedLink: "تم نسخ الرابط. شاركيه مع صحابك.",
    finalWait: "هنستناكي من أول دقيقة.",
    finalLead: "متسمعيش عنها بس.",
    finalStrong: "خليكي حاضرة.",
    attendanceButton: "أنا جاهزة 🔥",
    arrival: "نشوفك هناك يا جميلة! ❤️",
    celebration: "SEE YOU THERE, GIRL! 🔥❤️",
    secretTitle: "YOU FOUND IT 👀",
    lateMessage: "بس بما إنك وصلتي هنا، متتأخريش عن 7:00 م.",
  },
  male: {
    personalInvitation: "الدعوة دي ليك ❤️",
    ready: "جاهز؟ 👀",
    openStamp: "افتح الختم",
    openingHeadline: (name) => `يا ${name}، الفريق مستنيك.`,
    openingBody: "ناس حلوة، طاقة على مزاجك، وتعالى من أول دقيقة.",
    noteLabel: "خطة الليلة",
    personalNote: "خلي مكانك في الفريق محسوم من البداية.",
    surpriseNote: "مش هنحرقها دلوقتي… بس تعالى من البداية عشان متفوتكش.",
    programHeadline: "من أول صلاة… لحد المفاجأة اللي مستنياك.",
    reactionHint: "اختار إحساسك قبل ما تقرر.",
    shareText: "دي دعوتي لاجتماع الشباب بالأقصر يوم الأربعاء. ميعادنا من 7:00 م. تعالى معايا من البداية!",
    shareButton: "شارك الدعوة",
    copiedLink: "تم نسخ الرابط. شاركه مع صحابك.",
    finalWait: "هنستناك من أول دقيقة.",
    finalLead: "متسمعش عنها بس.",
    finalStrong: "خليك حاضر.",
    attendanceButton: "أنا جاهز 🔥",
    arrival: "نشوفك هناك يا بطل! ❤️",
    celebration: "SEE YOU THERE, BRO! 🔥❤️",
    secretTitle: "YOU FOUND IT 👀",
    lateMessage: "بس بما إنك وصلت هنا، متتأخرش عن 7:00 م.",
  },
  neutral: {
    personalInvitation: "الدعوة دي معمولة ليك إنت ❤️",
    ready: "جاهز/ة؟ 👀",
    openStamp: "افتح الدعوة",
    openingHeadline: (name) => `يا ${name}، الحكاية أحلى بوجودك.`,
    openingBody: "ناس قريبة، طاقة حلوة، وموعدنا من أول دقيقة.",
    noteLabel: "رسالة هذا الأسبوع",
    personalNote: "وجودك من أول دقيقة هيخلي اللمة أحلى.",
    surpriseNote: "مش هنحرقها دلوقتي… وجودك من البداية مهم عشان متفوتكش.",
    programHeadline: "من أول صلاة… لحد المفاجأة المستنية.",
    reactionHint: "اختيار الإحساس ده محلي ليك وحدك.",
    shareText: "دي دعوة لاجتماع الشباب بالأقصر يوم الأربعاء. ميعادنا من 7:00 م. نورتنا من البداية!",
    shareButton: "مشاركة الدعوة",
    copiedLink: "تم نسخ الرابط. شاركه بالطريقة التي تناسبك.",
    finalWait: "مستنيين حضورك من أول دقيقة.",
    finalLead: "مش مجرد كلام.",
    finalStrong: "وجودك يفرق.",
    attendanceButton: "أنا معاكم 🔥",
    arrival: "نشوفك هناك! ❤️",
    celebration: "SEE YOU THERE! 🔥❤️",
    secretTitle: "YOU FOUND IT 👀",
    lateMessage: "بس بما إنك وصلت هنا، البداية الساعة 7:00 م.",
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
