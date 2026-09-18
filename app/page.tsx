"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CalendarDays,
  Check,
  Clock3,
  Compass,
  Crown,
  GalleryHorizontalEnd,
  Heart,
  KeyRound,
  LockKeyhole,
  Mail,
  Map,
  MessageCircleHeart,
  Music2,
  NotebookPen,
  Pause,
  Play,
  RotateCcw,
  Smartphone,
  Sparkles,
  Star,
  Trophy,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Progress } from "@/components/ui/progress";

const STORAGE_KEY = "our-story-letters-edition-v7";
const START_DATE = "2025-09-18T00:00:00+07:00";

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const photoSrc = (number: number) => {
  if (number === 1) return assetUrl("photos/01-first-phone.webp");
  if (number === 2) return assetUrl("photos/02-first-selfie.webp");
  return assetUrl(`photos/${String(number).padStart(2, "0")}-memory.webp`);
};

const chapters = [
  {
    id: 1,
    code: "01",
    eyebrow: "The first signal",
    title: "Temukan lima sinyal hati",
    short: "Cari jejak kecil yang membawa kita kembali ke awal.",
    reward: "Awal yang sederhana",
    rewardCopy:
      "Dua orang, satu pertemuan, dan cerita yang diam-diam mulai tumbuh.",
    photo: 2,
    icon: Heart,
  },
  {
    id: 2,
    code: "02",
    eyebrow: "Our timeline",
    title: "Susun perjalanan kita",
    short: "Letakkan empat bagian cerita dalam urutan yang benar.",
    reward: "Kita belajar berjalan",
    rewardCopy:
      "Ga selalu mulus, tapi kita selalu menemukan alasan untuk kembali.",
    photo: 28,
    icon: Map,
  },
  {
    id: 3,
    code: "03",
    eyebrow: "Memory constellation",
    title: "Pasangkan kenangannya",
    short: "Temukan empat pasang foto yang bersembunyi di langit.",
    reward: "Hari-hari kecil yang berarti",
    rewardCopy:
      "Ternyata bahagia sering datang tanpa rencana asalkan ada kamu di sana.",
    photo: 10,
    icon: Star,
  },
  {
    id: 4,
    code: "04",
    eyebrow: "The secret date",
    title: "Pecahkan kode rahasia",
    short: "Empat angka dari tanggal yang mengubah dua orang menjadi kita.",
    reward: "Tanggal yang jadi rumah",
    rewardCopy:
      "18 September bukan lagi sekadar tanggal. Itu halaman pertama milik kita.",
    photo: 41,
    icon: KeyRound,
  },
  {
    id: 5,
    code: "05",
    eyebrow: "The last promise",
    title: "Jaga janji terakhir",
    short: "Tahan hati ini sampai penuh. Jangan dilepas di tengah jalan.",
    reward: "365 hari kemudian",
    rewardCopy:
      "Sesudah semua tawa dan berantem, pilihan kita masih sama: tetap bersama.",
    photo: 46,
    icon: Crown,
  },
] as const;

const chapterLetters = [
  {
    id: 1,
    code: "LETTER I",
    title: "When I First Found You",
    subtitle: "Before I knew how important you would become",
    stamp: "THE BEGINNING",
    photo: 2,
    paragraphs: [
      "Kalau aku bisa balik ke awal, mungkin aku bakal senyum lihat kita yang waktu itu belum tahu apa-apa. Belum tahu bakal punya begitu banyak foto, cerita, panggilan aneh, dan hari-hari yang rasanya cuma bisa dimengerti oleh kita berdua.",
      "Aku gatau tepatnya kapan rasa penasaran berubah jadi ingin dekat lebih lama. Mungkin bukan satu momen besar. Mungkin cuma dari obrolan kecil yang terus aku tunggu, dari caramu hadir, dan dari hari-hari biasa yang mendadak terasa punya sesuatu untuk dinantikan.",
      "Yang paling lucu adalah waktu pertama menemukanmu, aku belum tahu kalau suatu hari aku akan membuat tempat seperti ini hanya supaya kita bisa mengingat perjalanan kita.",
      "Jadi kalau ada satu hal yang ingin aku bilang ke versi kita di awal yaitu 'jangan buru-buru'. Nikmati semuanya, kalian sedang memulai sesuatu yang suatu hari akan sangat kalian syukuri.",
    ],
    signoff: "I didn't know it yet, but I was already walking toward you.",
  },
  {
    id: 2,
    code: "LETTER II",
    title: "The Little Things",
    subtitle: "The reasons that never make it into big speeches",
    stamp: "ORDINARY MAGIC",
    photo: 10,
    paragraphs: [
      "Aku sadar ternyata yang paling sering bikin aku sayang bukan hal-hal besar. Justru yang kecil. Cara kamu merespons sesuatu, ekspresi random yang kadang ga kamu sadari, cara kita bisa ketawa karena hal bodoh, sampai percakapan yang sebenarnya ga penting tapi tetap ingin aku lanjutkan.",
      "Ada banyak kebiasaanmu yang mungkin menurutmu biasa saja. Tapi ketika aku tidak melihatnya, justru itu yang gampang aku rindukan. Kehadiranmu pelan-pelan punya bentuk sendiri di kepalaku.",
      "Aku suka bahwa bersamamu, hari yang tidak punya rencana besar tetap bisa pulang sebagai kenangan. Kita ga harus selalu pergi jauh atau membuat sesuatu yang spektakuler. Kadang cukup kamu ada, aku ada, lalu dunia terasa sedikit lebih ringan.",
      "Kalau suatu hari kamu merasa tidak istimewa, aku harap kamu ingat, aku jatuh cinta bukan cuma pada momen terbaikmu, aku jatuh pada banyak hal kecil yang mungkin bahkan tidak pernah kamu sadari.",
    ],
    signoff: "Turns out, love hides really well inside ordinary things.",
  },
  {
    id: 3,
    code: "LETTER III",
    title: "Our Happiest Days",
    subtitle: "For the moments I wish I could keep in my pocket",
    stamp: "KEEP THIS ONE",
    photo: 23,
    paragraphs: [
      "Ada beberapa hari bersama kamu yang kalau bisa, ingin aku simpan di kantong dan aku bawa ke mana-mana. Bukan karena semuanya sempurna, tapi karena di hari itu aku ingat rasanya menjadi benar-benar bahagia tanpa perlu memikirkan banyak hal.",
      "Aku suka foto-foto kita bukan cuma karena kita terlihat senang. Aku suka karena setiap foto punya suara yang cuma bisa aku dengar di kepala, tawa sebelum fotonya diambil, candaan setelahnya, cerita perjalanan ke tempat itu, atau rasa capek yang akhirnya berubah jadi kenangan lucu.",
      "Mungkin bertahun-tahun lagi kita bakal lupa detail kecilnya, tempatnya berubah, wajah kita juga berubah. Tapi aku berharap saat melihat foto-foto ini, ada bagian dari kita yang tetap ingat, pernah ada masa ketika dua orang ini benar-benar menikmati hidup karena mereka menjalaninya bersama.",
      "Terima kasih sudah jadi bagian dari hari-hari favoritku.",
    ],
    signoff: "Some days end, Somehow, the feeling stays.",
  },
  {
    id: 4,
    code: "LETTER IV",
    title: "The Days We Were Not Okay",
    subtitle: "A letter for the parts of us that needed repair",
    stamp: "HANDLE WITH CARE",
    photo: 29,
    paragraphs: [
      "Aku gamau cerita satu tahun kita cuma berisi bagian yang cantik, kita pernah marah, pernah salah paham, pernah capek bicara, mungkin pernah ada saat ketika kita sama-sama bertanya kenapa mencintai seseorang bisa terasa serumit itu.",
      "Aku juga tahu ada bagian dari diriku yang pernah menyakitimu, entah lewat kata, sikap, ego, atau cara aku merespons sesuatu. Aku gamau menghapusnya dari cerita kita hanya supaya anniversary kita terlihat sempurna.",
      "Justru salah satu hal paling berarti buatku adalah kita mau kembali ke percakapan setelah emosi turun. Kita mencoba memahami, meminta maaf, memberi kesempatan, lalu belajar lagi. Kita belum selalu hebat melakukannya, tapi kita masih mencoba.",
      "Aku berharap di tahun berikutnya kita bukan jadi pasangan yang tidak pernah bertengkar. Aku berharap kita jadi dua orang yang lebih baik dalam menjaga satu sama lain ketika pertengkaran itu datang.",
    ],
    signoff: "Not perfect. Still worth repairing. Still us.",
  },
  {
    id: 5,
    code: "LETTER V",
    title: "Why I Still Choose You",
    subtitle: "Not because it is easy. Because it is you.",
    stamp: "365 DAYS LATER",
    photo: 46,
    paragraphs: [
      "Setelah satu tahun, aku sudah melihat lebih banyak versi kamu daripada ketika semuanya baru dimulai. Aku melihat kamu bahagia, capek, kesal, lembut, keras kepala, lucu, diam, dan mungkin beberapa versi yang bahkan kamu sendiri ga terlalu suka.",
      "Dan kamu juga sudah melihat banyak versi diriku. Jadi ketika aku bilang aku masih memilih kamu, pilihan itu terasa berbeda dari hari pertama. Sekarang bukan lagi memilih seseorang yang baru aku kenal. Sekarang aku memilih seseorang yang sudah berbagi bagian hidup yang nyata denganku.",
      "Aku ga tinggal karena kita sudah terlanjur sejauh ini. Aku tinggal karena di antara semua kekurangan kita, masih ada sesuatu yang membuatku ingin belajar mencintaimu lebih baik besok daripada hari ini.",
      "Kalau cinta adalah pilihan kecil yang harus diulang terus, maka ini pilihanku hari ini adalah kamu, kita dan kesempatan untuk melihat sejauh apa cerita ini bisa berjalan.",
    ],
    signoff: "One year later, my answer is still you.",
  },
] as const;

const timelineMoments = [
  {
    id: 0,
    label: "Kita bertemu",
    copy: "Semuanya dimulai dari dua orang yang belum tahu akan sejauh ini.",
  },
  {
    id: 1,
    label: "Kita mulai punya cerita",
    copy: "Hari biasa perlahan berubah jadi kenangan yang ingin disimpan.",
  },
  {
    id: 2,
    label: "Kita belajar bertahan",
    copy: "Ada beda, ada marah, lalu ada usaha untuk saling memahami.",
  },
  {
    id: 3,
    label: "Kita sampai di satu tahun",
    copy: "Bukan sempurna hanya dua orang yang terus memilih satu sama lain.",
  },
];

const memoryDeck = [5, 18, 32, 41, 18, 5, 41, 32].map((photo, index) => ({
  id: `memory-${index}`,
  photo,
}));
const signalSpots = [
  { left: "9%", top: "17%", rotate: "-12deg" },
  { left: "79%", top: "12%", rotate: "9deg" },
  { left: "47%", top: "44%", rotate: "-4deg" },
  { left: "14%", top: "76%", rotate: "15deg" },
  { left: "81%", top: "73%", rotate: "-10deg" },
];

const prologueScenes = [
  {
    overline: "18 September 2025",
    title: "Before there was us...",
    copy: "Ada dua orang yang menjalani harinya masing-masing, tanpa tahu satu pertemuan kecil bakal mengubah banyak hal.",
    photos: [1, 2],
  },
  {
    overline: "Somewhere between hello and home",
    title: "Then ordinary days became memories.",
    copy: "Obrolan, jalan kecil, foto random, ketawa yang ga direncanakan. Perlahan, hidup punya kata baru: kita.",
    photos: [7, 18],
  },
  {
    overline: "365 days later",
    title: "And somehow, we kept choosing us.",
    copy: "Ga selalu mudah. Tapi setelah semua yang kita lewati, aku masih ingin melanjutkan ceritanya bersamamu.",
    photos: [28, 46],
  },
];

const months = [
  {
    month: "SEP",
    title: "The beginning",
    copy: "Satu tanggal mulai punya arti baru.",
    photo: 2,
  },
  {
    month: "OCT",
    title: "Getting closer",
    copy: "Mulai hafal hal-hal kecil tentang satu sama lain.",
    photo: 5,
  },
  {
    month: "NOV",
    title: "Little routines",
    copy: "Hal sederhana mulai terasa seperti rumah.",
    photo: 9,
  },
  {
    month: "DEC",
    title: "Our first year-end",
    copy: "Menutup tahun dengan seseorang yang ingin dibawa ke tahun berikutnya.",
    photo: 13,
  },
  {
    month: "JAN",
    title: "Another chapter",
    copy: "Tahun baru, orang yang masih sama di sampingku.",
    photo: 17,
  },
  {
    month: "FEB",
    title: "Soft days",
    copy: "Ada hari-hari yang ga perlu istimewa untuk jadi kenangan.",
    photo: 21,
  },
  {
    month: "MAR",
    title: "Learning us",
    copy: "Mulai paham bahwa mencintai juga berarti belajar.",
    photo: 25,
  },
  {
    month: "APR",
    title: "Still here",
    copy: "Ada beda pendapat, tapi ada juga alasan untuk tetap tinggal.",
    photo: 29,
  },
  {
    month: "MAY",
    title: "More stories",
    copy: "Koleksi foto bertambah, begitu juga cerita di baliknya.",
    photo: 33,
  },
  {
    month: "JUN",
    title: "Growing together",
    copy: "Pelan-pelan kita memperbaiki cara saling memahami.",
    photo: 37,
  },
  {
    month: "JUL",
    title: "Choosing again",
    copy: "Kadang cinta bukan perasaan besar, cuma keputusan kecil yang diulang.",
    photo: 41,
  },
  {
    month: "AUG",
    title: "Almost a year",
    copy: "Ternyata kita sudah sejauh ini.",
    photo: 45,
  },
  {
    month: "SEP",
    title: "One year",
    copy: "365 hari, dan aku masih memilih kamu.",
    photo: 50,
  },
];

const directorsChat = [
  {
    from: "me",
    time: "22:41",
    text: "Kadang aku mikir, dari semua hal random yang bisa terjadi, lucu juga ya akhirnya aku ketemu kamu.",
  },
  { from: "her", time: "22:42", text: "terus? 👀" },
  {
    from: "me",
    time: "22:43",
    text: "Terus hidup yang tadinya biasa aja jadi punya banyak tanggal, tempat, dan foto yang ingin aku simpan.",
  },
  { from: "her", time: "22:44", text: "cieeee" },
  {
    from: "me",
    time: "22:45",
    text: "Aku serius, bahkan hari yang ga spesial pun jadi punya arti kalau ada kamu di dalamnya.",
  },
  { from: "her", time: "22:46", text: "🥺" },
  {
    from: "me",
    time: "22:47",
    text: "Makanya kalau suatu hari kita lupa detailnya, semoga tempat kecil ini bisa ngingetin bahwa kita pernah berusaha sejauh ini.",
  },
];

const untoldThings = [
  {
    title: "Your ordinary version",
    copy: "Aku suka kamu bukan cuma ketika kamu rapi, lucu, atau lagi dalam mood terbaik, aku juga suka versi kamu yang capek, bete, diam, dan cuma ingin ditemani.",
  },
  {
    title: "The way you stay",
    copy: "Di tengah beda cara berpikir dan beberapa hari yang berat, kamu masih memilih ngobrol lagi. Buatku, itu bentuk cinta yang sering ga keliatan.",
  },
  {
    title: "Your smallest habits",
    copy: "Ada kebiasaan-kebiasaan kecil kamu yang mungkin kamu anggap biasa, tapi justru itu yang bikin kehadiranmu gampang dirindukan.",
  },
  {
    title: "You make time feel different",
    copy: "Ada hari panjang yang terasa pendek karena sama kamu, dan ada lima menit yang bisa jadi kenangan hanya karena kita tertawa di waktu yang tepat.",
  },
  {
    title: "I notice more than I say",
    copy: "Aku mungkin ga selalu bilang ketika aku bangga, tenang, atau senang melihat kamu. Tapi percayalah, ada banyak momen ketika aku cuma melihatmu dan berpikir, untung ada kamu.",
  },
  {
    title: "I still want to learn you",
    copy: "Setelah satu tahun, aku ga ngerasa uda tau semuanya tentang kamu, justru aku masih penasaran dengan versi-versi kamu yang belum sempat aku kenal.",
  },
  {
    title: "You became a safe place",
    copy: "Bukan karena semuanya selalu sempurna, tapi karena setelah ribut, lelah, dan salah paham, aku masih punya keinginan untuk pulang ke percakapan denganmu.",
  },
  {
    title: "I choose the real us",
    copy: "Kalau harus memilih, aku gamau cuma bagian indahnya, aku memilih kita yang lengkap, lucu, keras kepala, berantakan, belajar, lalu mencoba lagi.",
  },
];

const hardDayFragments = [
  {
    id: "listen",
    title: "Listen longer",
    copy: "Kadang yang kita butuhkan bukan jawaban cepat, cuma ruang untuk menyelesaikan kalimat tanpa merasa sedang dilawan.",
  },
  {
    id: "pause",
    title: "Pause before hurting",
    copy: "Ada kata-kata yang mungkin benar saat marah, tapi tidak harus dilemparkan, kita belajar bahwa menang berdebat ga selalu berarti menang menjaga hubungan.",
  },
  {
    id: "sorry",
    title: "Say sorry properly",
    copy: "Bukan sekadar supaya masalah selesai, tapi karena kita benar-benar ingin memahami bagian mana yang membuat orang yang kita sayang terluka.",
  },
  {
    id: "again",
    title: "Try again",
    copy: "Mungkin ini bagian paling penting, sesudah semuanya, kita masih mau mencoba lagi, bukan karena mudah, tapi karena 'kita' masih layak diperjuangkan.",
  },
];

const museumRooms = [
  {
    id: 1,
    code: "ROOM 01",
    title: "The Beginning",
    subtitle: "When ordinary became important",
    photo: 2,
    copy: "Tempat untuk semua hal pertama, rasa penasaran, foto awal, dan momen ketika dua hidup pelan-pelan mulai punya irisan.",
  },
  {
    id: 2,
    code: "ROOM 02",
    title: "The Days I Fell Harder",
    subtitle: "Small reasons, repeated",
    photo: 10,
    copy: "Bukan satu kejadian besar, lebih seperti ratusan hal kecil yang diam-diam membuat aku semakin yakin bahwa aku ingin tetap dekat.",
  },
  {
    id: 3,
    code: "ROOM 03",
    title: "The Silly Things",
    subtitle: "Our least serious archive",
    photo: 23,
    copy: "Foto aneh, bercandaan ga jelas, chat random, dan momen yang mungkin ga masuk album orang lain tapi justru terasa paling kita.",
  },
  {
    id: 4,
    code: "ROOM 04",
    title: "The Hard Days",
    subtitle: "Proof that love also needs repair",
    photo: 29,
    copy: "Ruangan ini ga nyembunyiin hari yang berat, karena cerita kita bukan indah karena ga pernah retak, tapi karena kita belajar memperbaikinya.",
  },
  {
    id: 5,
    code: "ROOM 05",
    title: "Why I Stayed",
    subtitle: "Not habit. A choice.",
    photo: 41,
    copy: "Aku tinggal bukan karena satu tahun sudah terlanjur berjalan, aku tinggal karena di balik semua kekurangan kita, aku masih melihat seseorang yang ingin aku perjuangkan.",
  },
  {
    id: 6,
    code: "ROOM 06",
    title: "The Future",
    subtitle: "Exhibit currently unavailable",
    photo: 50,
    copy: "Ruangan terakhir belum punya koleksi, bukan karena kita kehabisan cerita tapi karena kenangan di sini belum kita jalani.",
  },
];

const finalSymbols = [
  { id: "heart", label: "Heart", Icon: Heart, clue: "The first signal" },
  { id: "map", label: "Map", Icon: Map, clue: "Our timeline" },
  { id: "star", label: "Star", Icon: Star, clue: "Memory constellation" },
  { id: "key", label: "Key", Icon: KeyRound, clue: "The secret date" },
  { id: "crown", label: "Promise", Icon: Crown, clue: "The last promise" },
] as const;
const finalCorrectOrder = ["heart", "map", "star", "key", "crown"];
const finalShuffled = [
  finalSymbols[2],
  finalSymbols[4],
  finalSymbols[0],
  finalSymbols[3],
  finalSymbols[1],
];

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [prologueStep, setPrologueStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const [rewardChapter, setRewardChapter] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [photoFlipped, setPhotoFlipped] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [songTime, setSongTime] = useState(0);
  const [songDuration, setSongDuration] = useState(0);
  const [elapsed, setElapsed] = useState({
    days: 365,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [futureCapsuleUnlocked, setFutureCapsuleUnlocked] = useState(false);
  const [signalFound, setSignalFound] = useState<number[]>([]);
  const [timelineOrder, setTimelineOrder] = useState([2, 0, 3, 1]);
  const [timelineError, setTimelineError] = useState(false);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matchedPhotos, setMatchedPhotos] = useState<number[]>([]);
  const [secretCode, setSecretCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const [phoneApp, setPhoneApp] = useState<
    "messages" | "gallery" | "notes" | "calendar"
  >("messages");
  const [phoneOpened, setPhoneOpened] = useState(false);
  const [timelineVisited, setTimelineVisited] = useState(false);
  const [eggs, setEggs] = useState<string[]>([]);
  const [achievementToast, setAchievementToast] = useState<string | null>(null);
  const [finalMissionOpen, setFinalMissionOpen] = useState(false);
  const [finalSequence, setFinalSequence] = useState<string[]>([]);
  const [finalError, setFinalError] = useState(false);
  const [finalMissionComplete, setFinalMissionComplete] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [letterUnsealed, setLetterUnsealed] = useState(false);
  const [chapterLetterOpen, setChapterLetterOpen] = useState<number | null>(
    null,
  );
  const [readLetters, setReadLetters] = useState<number[]>([]);
  const [endingSeen, setEndingSeen] = useState(false);
  const [chatRevealCount, setChatRevealCount] = useState(1);
  const [untoldOpen, setUntoldOpen] = useState<number[]>([]);
  const [repairOpen, setRepairOpen] = useState<string[]>([]);
  const [museumRoom, setMuseumRoom] = useState<number | null>(null);
  const [museumVisited, setMuseumVisited] = useState<number[]>([]);
  const [finalChoiceMade, setFinalChoiceMade] = useState(false);
  const [capsuleSealed, setCapsuleSealed] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allComplete = completed.length === chapters.length;
  const progress = (completed.length / chapters.length) * 100;
  const unlockedPhotos = Math.min(50, completed.length * 10);

  const starField = useMemo(
    () =>
      Array.from({ length: 72 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 101}%`,
        top: `${(index * 61) % 97}%`,
        size: `${1 + (index % 3)}px`,
        delay: `${(index % 9) * 0.23}s`,
      })),
    [],
  );

  const achievements = useMemo(
    () => [
      {
        id: "begin",
        title: "The Beginning",
        copy: "Selesaikan Chapter 1",
        unlocked: completed.includes(1),
      },
      {
        id: "keeper",
        title: "Memory Keeper",
        copy: "Buka 30 kenangan",
        unlocked: unlockedPhotos >= 30,
      },
      {
        id: "phone",
        title: "Curious One",
        copy: "Temukan private phone",
        unlocked: phoneOpened,
      },
      {
        id: "historian",
        title: "Our Historian",
        copy: "Jelajahi timeline 365 hari",
        unlocked: timelineVisited,
      },
      {
        id: "secret",
        title: "Secret Hunter",
        copy: "Temukan semua hidden hearts",
        unlocked: eggs.length >= 5,
      },
      {
        id: "unsaid",
        title: "Read Between Us",
        copy: "Buka semua hal yang jarang aku bilang",
        unlocked: untoldOpen.length >= untoldThings.length,
      },
      {
        id: "repair",
        title: "We Repair",
        copy: "Baca semua pelajaran dari hari sulit",
        unlocked: repairOpen.length >= hardDayFragments.length,
      },
      {
        id: "letters",
        title: "Dear You",
        copy: "Baca semua lima chapter letters",
        unlocked: readLetters.length >= chapterLetters.length,
      },
      {
        id: "curator",
        title: "Museum Curator",
        copy: "Kunjungi seluruh Museum of Us",
        unlocked: museumVisited.length >= museumRooms.length,
      },
      {
        id: "choose",
        title: "Still Choosing You",
        copy: "Selesaikan Final Mission",
        unlocked: finalMissionComplete,
      },
      {
        id: "always",
        title: "Year Two",
        copy: "Pilih chapter berikutnya",
        unlocked: finalChoiceMade,
      },
    ],
    [
      completed,
      unlockedPhotos,
      phoneOpened,
      timelineVisited,
      eggs.length,
      untoldOpen.length,
      repairOpen.length,
      readLetters.length,
      museumVisited.length,
      finalMissionComplete,
      finalChoiceMade,
    ],
  );

  const unlockedAchievements = achievements.filter(
    (achievement) => achievement.unlocked,
  ).length;

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(STORAGE_KEY) ??
        localStorage.getItem("our-story-directors-cut-v6") ??
        localStorage.getItem("our-story-adventure-v5") ??
        localStorage.getItem("our-story-adventure-v1");
      if (stored) {
        const parsed = JSON.parse(stored) as {
          completed?: number[];
          entered?: boolean;
          eggs?: string[];
          phoneOpened?: boolean;
          timelineVisited?: boolean;
          finalMissionComplete?: boolean;
          endingSeen?: boolean;
          untoldOpen?: number[];
          repairOpen?: string[];
          readLetters?: number[];
          museumVisited?: number[];
          finalChoiceMade?: boolean;
          capsuleSealed?: boolean;
        };
        if (Array.isArray(parsed.completed))
          setCompleted(parsed.completed.filter((id) => id >= 1 && id <= 5));
        if (parsed.entered) setEntered(true);
        if (Array.isArray(parsed.eggs)) setEggs(parsed.eggs);
        if (parsed.phoneOpened) setPhoneOpened(true);
        if (parsed.timelineVisited) setTimelineVisited(true);
        if (parsed.finalMissionComplete) setFinalMissionComplete(true);
        if (parsed.endingSeen) setEndingSeen(true);
        if (Array.isArray(parsed.untoldOpen)) setUntoldOpen(parsed.untoldOpen);
        if (Array.isArray(parsed.repairOpen)) setRepairOpen(parsed.repairOpen);
        if (Array.isArray(parsed.readLetters))
          setReadLetters(parsed.readLetters.filter((id) => id >= 1 && id <= 5));
        if (Array.isArray(parsed.museumVisited))
          setMuseumVisited(parsed.museumVisited);
        if (parsed.finalChoiceMade) setFinalChoiceMade(true);
        if (parsed.capsuleSealed) setCapsuleSealed(true);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        completed,
        entered,
        eggs,
        phoneOpened,
        timelineVisited,
        finalMissionComplete,
        endingSeen,
        untoldOpen,
        repairOpen,
        readLetters,
        museumVisited,
        finalChoiceMade,
        capsuleSealed,
      }),
    );
  }, [
    completed,
    entered,
    eggs,
    phoneOpened,
    timelineVisited,
    finalMissionComplete,
    endingSeen,
    untoldOpen,
    repairOpen,
    readLetters,
    museumVisited,
    finalChoiceMade,
    capsuleSealed,
    hydrated,
  ]);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const totalSeconds = Math.max(
        0,
        Math.floor((now - new Date(START_DATE).getTime()) / 1000),
      );
      setElapsed({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor(totalSeconds / 3600) % 24,
        minutes: Math.floor(totalSeconds / 60) % 60,
        seconds: totalSeconds % 60,
      });
      setFutureCapsuleUnlocked(
        now >= new Date("2027-09-18T00:00:00+07:00").getTime(),
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [first, second] = flipped.map((id) =>
      memoryDeck.find((card) => card.id === id),
    );
    const timer = setTimeout(() => {
      if (first && second && first.photo === second.photo)
        setMatchedPhotos((current) =>
          current.includes(first.photo) ? current : [...current, first.photo],
        );
      setFlipped([]);
    }, 650);
    return () => clearTimeout(timer);
  }, [flipped]);

  useEffect(() => {
    if (matchedPhotos.length === 4 && activeChapter === 3) {
      const timer = setTimeout(() => finishChapter(3), 650);
      return () => clearTimeout(timer);
    }
  }, [matchedPhotos, activeChapter]);

  useEffect(
    () => () => {
      if (holdTimerRef.current) clearInterval(holdTimerRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    },
    [],
  );

  const showAchievement = (label: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setAchievementToast(label);
    toastTimerRef.current = setTimeout(() => setAchievementToast(null), 3200);
  };

  const enterAdventure = async () => {
    if (prologueStep < prologueScenes.length - 1) {
      setPrologueStep((step) => step + 1);
      return;
    }
    setEntered(true);
    try {
      await audioRef.current?.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const skipPrologue = async () => {
    setEntered(true);
    try {
      await audioRef.current?.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const finishChapter = (id: number) => {
    const isNew = !completed.includes(id);
    setCompleted((current) =>
      current.includes(id) ? current : [...current, id].sort((a, b) => a - b),
    );
    setActiveChapter(null);
    setRewardChapter(id);
    if (isNew)
      showAchievement(
        id === 1
          ? "Achievement unlocked · The Beginning"
          : `Chapter ${id} complete · 10 memories unlocked`,
      );
    if (id === 5) {
      setCelebrating(true);
      setTimeout(() => setCelebrating(false), 4200);
    }
  };

  const openChapter = (id: number) => {
    if (id !== 1 && !completed.includes(id - 1)) return;
    if (completed.includes(id)) {
      if (id === 1) setSignalFound([]);
      if (id === 2) setTimelineOrder([2, 0, 3, 1]);
      if (id === 3) {
        setFlipped([]);
        setMatchedPhotos([]);
      }
      if (id === 4) setSecretCode("");
      if (id === 5) setHoldProgress(0);
    }
    setActiveChapter(id);
    setTimelineError(false);
    setCodeError(false);
  };

  const moveTimeline = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= timelineOrder.length) return;
    setTimelineOrder((current) => {
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
    setTimelineError(false);
  };

  const checkTimeline = () => {
    if (timelineOrder.every((id, index) => id === index)) finishChapter(2);
    else setTimelineError(true);
  };

  const flipMemory = (id: string, photo: number) => {
    if (
      flipped.length >= 2 ||
      flipped.includes(id) ||
      matchedPhotos.includes(photo)
    )
      return;
    setFlipped((current) => [...current, id]);
  };

  const checkCode = () => {
    if (secretCode === "1809") finishChapter(4);
    else {
      setCodeError(true);
      setSecretCode("");
    }
  };

  const startHold = () => {
    if (holdTimerRef.current) return;
    holdTimerRef.current = setInterval(() => {
      setHoldProgress((value) => {
        const next = Math.min(100, value + 3.4);
        if (next >= 100) {
          if (holdTimerRef.current) clearInterval(holdTimerRef.current);
          holdTimerRef.current = null;
          setTimeout(() => finishChapter(5), 300);
        }
        return next;
      });
    }, 100);
  };

  const stopHold = () => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    holdTimerRef.current = null;
    if (!completed.includes(5)) setHoldProgress(0);
  };

  const collectEgg = (id: string) => {
    if (eggs.includes(id)) return;
    const next = [...eggs, id];
    setEggs(next);
    showAchievement(
      next.length === 5
        ? "Secret unlocked · You found every hidden heart"
        : `Hidden heart found · ${next.length}/5`,
    );
  };

  const selectFinalSymbol = (id: string) => {
    if (finalMissionComplete || finalSequence.includes(id)) return;
    const next = [...finalSequence, id];
    const expected = finalCorrectOrder[next.length - 1];
    if (id !== expected) {
      setFinalError(true);
      setTimeout(() => {
        setFinalSequence([]);
        setFinalError(false);
      }, 800);
      return;
    }
    setFinalSequence(next);
    setFinalError(false);
    if (next.length === finalCorrectOrder.length) {
      setTimeout(() => {
        setFinalMissionComplete(true);
        setFinalMissionOpen(false);
        setCelebrating(true);
        showAchievement("Achievement unlocked · Still Choosing You");
        setTimeout(() => {
          setCelebrating(false);
          setLetterOpen(true);
        }, 1200);
      }, 700);
    }
  };

  const openPhone = (app: typeof phoneApp) => {
    setPhoneApp(app);
    if (!phoneOpened) {
      setPhoneOpened(true);
      showAchievement("Achievement unlocked · Curious One");
    }
  };

  const openTimelineMemory = (photo: number) => {
    if (!timelineVisited) {
      setTimelineVisited(true);
      showAchievement("Achievement unlocked · Our Historian");
    }
    if (photo <= unlockedPhotos) {
      setPhotoFlipped(false);
      setSelectedPhoto(photo);
    }
  };

  const openChapterLetter = (id: number) => {
    if (!completed.includes(id)) return;
    setChapterLetterOpen(id);
    if (!readLetters.includes(id)) {
      const next = [...readLetters, id].sort((a, b) => a - b);
      setReadLetters(next);
      if (next.length === chapterLetters.length)
        showAchievement("Achievement unlocked · Dear You");
    }
  };

  const openLetter = () => {
    if (!finalMissionComplete) return;
    setLetterUnsealed(false);
    setLetterOpen(true);
  };

  const revealUntold = (index: number) => {
    if (untoldOpen.includes(index)) return;
    const next = [...untoldOpen, index];
    setUntoldOpen(next);
    if (next.length === untoldThings.length)
      showAchievement("Achievement unlocked · Read Between Us");
  };

  const revealRepair = (id: string) => {
    if (repairOpen.includes(id)) return;
    const next = [...repairOpen, id];
    setRepairOpen(next);
    if (next.length === hardDayFragments.length)
      showAchievement("Achievement unlocked · We Repair");
  };

  const visitMuseumRoom = (id: number) => {
    setMuseumRoom(id);
    if (!museumVisited.includes(id)) {
      const next = [...museumVisited, id];
      setMuseumVisited(next);
      if (next.length === museumRooms.length)
        showAchievement("Achievement unlocked · Museum Curator");
    }
  };

  const chooseYearTwo = () => {
    if (finalChoiceMade) return;
    setFinalChoiceMade(true);
    setCelebrating(true);
    showAchievement("Achievement unlocked · Year Two");
    setTimeout(() => setCelebrating(false), 4200);
  };

  const resetAdventure = () => {
    setCompleted([]);
    setSignalFound([]);
    setTimelineOrder([2, 0, 3, 1]);
    setTimelineError(false);
    setFlipped([]);
    setMatchedPhotos([]);
    setSecretCode("");
    setCodeError(false);
    setHoldProgress(0);
    setRewardChapter(null);
    setSelectedPhoto(null);
    setPhotoFlipped(false);
    setPhoneOpened(false);
    setTimelineVisited(false);
    setEggs([]);
    setFinalSequence([]);
    setFinalError(false);
    setFinalMissionComplete(false);
    setLetterOpen(false);
    setLetterUnsealed(false);
    setEndingSeen(false);
    setChatRevealCount(1);
    setUntoldOpen([]);
    setRepairOpen([]);
    setChapterLetterOpen(null);
    setReadLetters([]);
    setMuseumRoom(null);
    setMuseumVisited([]);
    setFinalChoiceMade(false);
    setCapsuleSealed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentReward = chapters.find(
    (chapter) => chapter.id === rewardChapter,
  );
  const scene = prologueScenes[prologueStep];

  return (
    <main className="adventure-shell">
      <audio
        ref={audioRef}
        src={assetUrl("audio/aku-milikmu-dewa19.mp3")}
        loop
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(event) =>
          setSongDuration(event.currentTarget.duration)
        }
        onTimeUpdate={(event) => setSongTime(event.currentTarget.currentTime)}
      />
      <div className="stars" aria-hidden="true">
        {starField.map((star) => (
          <span
            key={star.id}
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {!entered && hydrated && (
        <section
          className="cinematic-prologue"
          aria-labelledby="prologue-title"
        >
          <button
            className="prologue-skip"
            type="button"
            onClick={skipPrologue}
          >
            Skip intro <ArrowRight size={14} />
          </button>
          <div className="cinema-frame" key={prologueStep}>
            <div className="cinema-visual">
              <div className="cinema-orbit" />
              <figure className="cinema-photo cinema-photo-a">
                <img src={photoSrc(scene.photos[0])} alt="" />
              </figure>
              <figure className="cinema-photo cinema-photo-b">
                <img src={photoSrc(scene.photos[1])} alt="" />
              </figure>
              <div className="cinema-center">
                <Heart fill="currentColor" />
              </div>
            </div>
            <div className="cinema-copy">
              <p className="kicker">{scene.overline}</p>
              <h1 id="prologue-title">{scene.title}</h1>
              <p>{scene.copy}</p>
              <div className="scene-progress">
                {prologueScenes.map((_, index) => (
                  <span
                    key={index}
                    className={index <= prologueStep ? "active" : ""}
                  />
                ))}
              </div>
              <button
                className="hero-button"
                type="button"
                onClick={enterAdventure}
              >
                {prologueStep === prologueScenes.length - 1
                  ? "Enter our universe"
                  : "Continue"}{" "}
                <ArrowRight size={18} />
              </button>
              <span className="tiny-note">
                Headphones recommended · progress tersimpan otomatis.
              </span>
            </div>
          </div>
        </section>
      )}

      <header className={`game-hud ${entered ? "game-hud-visible" : ""}`}>
        <a className="brand-mark" href="#journey">
          <Compass size={18} />
          <span>OUR UNIVERSE</span>
        </a>
        <div className="hud-progress">
          <span>
            {completed.length} / 5 chapter · {unlockedAchievements}/11
            achievements
          </span>
          <Progress value={progress} />
        </div>
        <nav aria-label="Navigasi petualangan">
          <a href="#journey">Map</a>
          <a href="#phone">Phone</a>
          <a href="#timeline">Timeline</a>
          <a href="#letters">Letters</a>
          <a href="#directors-cut">Director&apos;s Cut</a>
          {finalMissionComplete && <a href="#museum">Museum</a>}
          <button
            type="button"
            onClick={openLetter}
            disabled={!finalMissionComplete}
          >
            Letter
          </button>
        </nav>
        <button
          className="music-toggle"
          type="button"
          onClick={toggleMusic}
          aria-label={playing ? "Jeda lagu" : "Putar lagu"}
        >
          {playing ? (
            <Pause size={16} fill="currentColor" />
          ) : (
            <Play size={16} fill="currentColor" />
          )}
        </button>
      </header>

      <section className="journey" id="journey">
        <button
          className={`easter-heart egg-map ${eggs.includes("map") ? "found" : ""}`}
          type="button"
          onClick={() => collectEgg("map")}
          aria-label="Hidden heart"
        >
          <Heart fill="currentColor" />
        </button>
        <div className="journey-intro">
          <div>
            <p className="kicker">Mission control · Anniversary quest</p>
            <h2>
              Welcome to
              <br />
              <em>our universe.</em>
            </h2>
          </div>
          <div className="journey-status">
            <span>Adventure progress</span>
            <strong>{Math.round(progress)}%</strong>
            <Progress value={progress} />
            <p>
              {allComplete
                ? "Lima chapter selesai. Tapi perjalanan terakhir baru saja terbuka."
                : `Selesaikan Chapter ${Math.min(completed.length + 1, 5)} untuk membuka rute berikutnya.`}
            </p>
          </div>
        </div>

        <div className="time-capsule" aria-label="Durasi hubungan">
          <div>
            <span>We have been choosing us for</span>
            <strong>{elapsed.days}</strong>
            <small>days</small>
          </div>
          {[
            [elapsed.hours, "hours"],
            [elapsed.minutes, "minutes"],
            [elapsed.seconds, "seconds"],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <small>{label}</small>
            </div>
          ))}
        </div>

        <div className="story-map" aria-label="Peta chapter">
          <div className="route-line" aria-hidden="true">
            <span style={{ height: `${progress}%` }} />
          </div>
          {chapters.map((chapter, index) => {
            const done = completed.includes(chapter.id);
            const unlocked =
              chapter.id === 1 || completed.includes(chapter.id - 1);
            const Icon = chapter.icon;
            return (
              <article
                className={`chapter-node chapter-${chapter.id} ${done ? "chapter-done" : ""} ${unlocked ? "chapter-unlocked" : "chapter-locked"}`}
                key={chapter.id}
              >
                <div className="chapter-orb">
                  <span>
                    {done ? <Check /> : unlocked ? <Icon /> : <LockKeyhole />}
                  </span>
                  <small>{chapter.code}</small>
                </div>
                <button
                  type="button"
                  className="chapter-card"
                  onClick={() => openChapter(chapter.id)}
                  disabled={!unlocked}
                >
                  <div className="chapter-image">
                    <img src={photoSrc(chapter.photo)} alt="" />
                    <span>
                      {done
                        ? "Completed"
                        : unlocked
                          ? "Ready to play"
                          : "Locked"}
                    </span>
                  </div>
                  <div className="chapter-copy">
                    <p>{chapter.eyebrow}</p>
                    <h3>{chapter.title}</h3>
                    <span>{chapter.short}</span>
                    <b>
                      {done
                        ? "Mainkan lagi"
                        : unlocked
                          ? "Buka chapter"
                          : `Selesaikan chapter ${index}`}{" "}
                      <ArrowRight size={15} />
                    </b>
                  </div>
                </button>
              </article>
            );
          })}

          <article
            className={`final-node ${allComplete ? "final-unlocked" : ""} ${finalMissionComplete ? "final-solved" : ""}`}
          >
            <div className="final-emblem">
              {finalMissionComplete ? <Mail /> : <Crown />}
            </div>
            <div>
              <p className="kicker">The final destination</p>
              <h3>
                {finalMissionComplete
                  ? "The letter is yours."
                  : allComplete
                    ? "Final Mission unlocked."
                    : "One last destination is hidden."}
              </h3>
              <span>
                {finalMissionComplete
                  ? "Kunci terakhir sudah terpecahkan. Surat ini sekarang cuma milikmu."
                  : allComplete
                    ? "Lima simbol dari perjalanan kita membentuk satu urutan. Ingat chapter yang sudah kamu lewati."
                    : "Selesaikan lima chapter. Semua clue akan dipakai sekali lagi di akhir."}
              </span>
            </div>
            <button
              type="button"
              disabled={!allComplete}
              onClick={() =>
                finalMissionComplete ? openLetter() : setFinalMissionOpen(true)
              }
            >
              {finalMissionComplete
                ? "Open letter"
                : allComplete
                  ? "Final mission"
                  : `${completed.length}/5 selesai`}{" "}
              {finalMissionComplete ? (
                <Mail size={17} />
              ) : allComplete ? (
                <Sparkles size={17} />
              ) : (
                <LockKeyhole size={17} />
              )}
            </button>
          </article>
        </div>
      </section>

      <section className="phone-section" id="phone">
        <button
          className={`easter-heart egg-phone ${eggs.includes("phone") ? "found" : ""}`}
          type="button"
          onClick={() => collectEgg("phone")}
          aria-label="Hidden heart"
        >
          <Heart fill="currentColor" />
        </button>
        <div className="section-copy">
          <p className="kicker">Private device · unlocked after chapter 02</p>
          <h2>
            A little phone full of <em>us.</em>
          </h2>
          <p>
            Kayak nemuin HP yang ditinggal terbuka cuma isinya bukan rahasia
            besar. Isinya hal-hal kecil yang bikin satu tahun terasa penuh.
          </p>
        </div>
        <div
          className={`phone-stage ${completed.length >= 2 ? "phone-ready" : "phone-disabled"}`}
        >
          <div className="phone-halo" />
          <div className="phone-device">
            <div className="phone-notch" />
            {completed.length < 2 ? (
              <div className="phone-lock">
                <LockKeyhole />
                <strong>Private phone locked</strong>
                <span>Complete Chapter 02 to decrypt this device.</span>
              </div>
            ) : (
              <>
                <div className="phone-status">
                  <span>18:09</span>
                  <span>♥ 100%</span>
                </div>
                <div className="phone-screen">
                  {phoneApp === "messages" && (
                    <div className="phone-app messages-app">
                      <header>
                        <MessageCircleHeart />
                        <div>
                          <strong>Us</strong>
                          <span>a tiny recreated conversation</span>
                        </div>
                      </header>
                      <div className="chat-thread director-chat">
                        {directorsChat
                          .slice(0, chatRevealCount)
                          .map((message, index) => (
                            <div
                              key={index}
                              className={`chat-bubble ${message.from === "me" ? "mine" : "theirs"}`}
                            >
                              <span>{message.text}</span>
                              <small>{message.time}</small>
                            </div>
                          ))}
                        {chatRevealCount < directorsChat.length && (
                          <div className="typing-bubble">
                            <i />
                            <i />
                            <i />
                          </div>
                        )}
                      </div>
                      <button
                        className="chat-continue"
                        type="button"
                        onClick={() =>
                          setChatRevealCount((count) =>
                            Math.min(directorsChat.length, count + 1),
                          )
                        }
                      >
                        {chatRevealCount < directorsChat.length
                          ? "Continue conversation"
                          : "Conversation saved"}{" "}
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  )}
                  {phoneApp === "gallery" && (
                    <div className="phone-app gallery-app">
                      <header>
                        <GalleryHorizontalEnd />
                        <div>
                          <strong>Favorites</strong>
                          <span>
                            {Math.max(0, unlockedPhotos)} memories available
                          </span>
                        </div>
                      </header>
                      <div className="phone-gallery">
                        {[2, 10, 18, 28, 41, 46].map((photo) => (
                          <button
                            type="button"
                            key={photo}
                            disabled={photo > unlockedPhotos}
                            onClick={() => {
                              setPhotoFlipped(false);
                              setSelectedPhoto(photo);
                            }}
                          >
                            <img src={photoSrc(photo)} alt="" />
                            {photo > unlockedPhotos && <LockKeyhole />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {phoneApp === "notes" && (
                    <div className="phone-app notes-app">
                      <header>
                        <NotebookPen />
                        <div>
                          <strong>Notes</strong>
                          <span>1 pinned note</span>
                        </div>
                      </header>
                      <article>
                        <small>PINNED · 18 SEP 2026</small>
                        <h3>Things I still want with you</h3>
                        <p>
                          Lebih banyak random date, lebih banyak foto jelek yang
                          akhirnya jadi favorit, lebih jago minta maaf, lebih
                          jago dengerin, dan lebih banyak tahun yang bisa kita
                          ceritakan nanti.
                        </p>
                        <span>— future plans, hopefully ♡</span>
                      </article>
                    </div>
                  )}
                  {phoneApp === "calendar" && (
                    <div className="phone-app calendar-app">
                      <header>
                        <CalendarDays />
                        <div>
                          <strong>Calendar</strong>
                          <span>September 2026</span>
                        </div>
                      </header>
                      <div className="mini-calendar">
                        <div className="calendar-labels">
                          {"SMTWTFS".split("").map((d, i) => (
                            <span key={i}>{d}</span>
                          ))}
                        </div>
                        <div className="calendar-days">
                          {Array.from({ length: 35 }, (_, i) => i - 1).map(
                            (day, i) => (
                              <span
                                key={i}
                                className={
                                  day === 18
                                    ? "anniversary-day"
                                    : day < 1 || day > 30
                                      ? "empty"
                                      : ""
                                }
                              >
                                {day >= 1 && day <= 30 ? day : ""}
                                {day === 18 && <Heart fill="currentColor" />}
                              </span>
                            ),
                          )}
                        </div>
                        <p>
                          <strong>18 September</strong> · Our first anniversary
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <nav className="phone-dock" aria-label="Phone apps">
                  <button
                    className={phoneApp === "messages" ? "active" : ""}
                    type="button"
                    onClick={() => openPhone("messages")}
                  >
                    <MessageCircleHeart />
                    <span>Chat</span>
                  </button>
                  <button
                    className={phoneApp === "gallery" ? "active" : ""}
                    type="button"
                    onClick={() => openPhone("gallery")}
                  >
                    <GalleryHorizontalEnd />
                    <span>Photos</span>
                  </button>
                  <button
                    className={phoneApp === "notes" ? "active" : ""}
                    type="button"
                    onClick={() => openPhone("notes")}
                  >
                    <NotebookPen />
                    <span>Notes</span>
                  </button>
                  <button
                    className={phoneApp === "calendar" ? "active" : ""}
                    type="button"
                    onClick={() => openPhone("calendar")}
                  >
                    <CalendarDays />
                    <span>Date</span>
                  </button>
                </nav>
              </>
            )}
          </div>
          <div className="phone-side-note">
            <Smartphone />
            <span>Tap the apps.</span>
            <small>
              Ada beberapa hal yang cuma muncul kalau kamu cukup kepo.
            </small>
          </div>
        </div>
      </section>

      <section className="timeline-section" id="timeline">
        <button
          className={`easter-heart egg-timeline ${eggs.includes("timeline") ? "found" : ""}`}
          type="button"
          onClick={() => collectEgg("timeline")}
          aria-label="Hidden heart"
        >
          <Heart fill="currentColor" />
        </button>
        <div className="timeline-heading">
          <div>
            <p className="kicker">365-day archive · Sep 2025 → Sep 2026</p>
            <h2>
              One year,
              <br />
              <em>month by month.</em>
            </h2>
          </div>
          <p>
            Geser timelinenya, setiap bulan bukan cuma tanggal, ada versi kita
            yang sedikit berbeda, sedikit lebih tahu caranya bertahan.
          </p>
        </div>
        <div
          className="year-rail"
          onPointerDown={() => {
            if (!timelineVisited) {
              setTimelineVisited(true);
              showAchievement("Achievement unlocked · Our Historian");
            }
          }}
        >
          {months.map((item, index) => {
            const unlocked = item.photo <= unlockedPhotos;
            return (
              <button
                className={`month-card ${unlocked ? "month-open" : "month-locked"}`}
                key={`${item.month}-${index}`}
                type="button"
                onClick={() => openTimelineMemory(item.photo)}
              >
                <span className="month-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="month-photo">
                  <img src={photoSrc(item.photo)} alt="" />
                  {!unlocked && <LockKeyhole />}
                </div>
                <p>
                  {item.month}{" "}
                  {index === 0
                    ? "2025"
                    : index === months.length - 1
                      ? "2026"
                      : ""}
                </p>
                <h3>{item.title}</h3>
                <span>
                  {unlocked
                    ? item.copy
                    : "Complete more chapters to reveal this memory."}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="directors-cut-section" id="directors-cut">
        <div className="directors-heading">
          <div>
            <p className="kicker">
              Director&apos;s cut · the parts between the photos
            </p>
            <h2>
              Things I <em>never say enough.</em>
            </h2>
          </div>
          <p>
            Foto bisa menyimpan wajah dan tempat, tapi ga selalu menyimpan apa
            yang sebenarnya aku pikirkan saat melihatmu. Buka kartu-kartu ini
            satu per satu.
          </p>
        </div>
        <div
          className={`untold-grid ${completed.length >= 3 ? "" : "director-locked"}`}
        >
          {completed.length < 3 && (
            <div className="director-lock-screen">
              <LockKeyhole />
              <strong>Complete Chapter 03</strong>
              <span>
                Some feelings need a few memories before they make sense.
              </span>
            </div>
          )}
          {untoldThings.map((item, index) => {
            const open = untoldOpen.includes(index);
            return (
              <button
                key={item.title}
                type="button"
                className={`untold-card ${open ? "untold-open" : ""}`}
                disabled={completed.length < 3}
                onClick={() => revealUntold(index)}
              >
                <span className="untold-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Heart fill={open ? "currentColor" : "none"} />
                <h3>{open ? item.title : "Something I notice"}</h3>
                <p>
                  {open
                    ? item.copy
                    : "Tap to read something I probably should have said more often."}
                </p>
                <small>
                  {open ? "kept here so I don't forget" : "tap to reveal"}
                </small>
              </button>
            );
          })}
        </div>
        <div className="director-progress">
          <span>
            {untoldOpen.length}/{untoldThings.length} notes opened
          </span>
          <Progress value={(untoldOpen.length / untoldThings.length) * 100} />
        </div>
      </section>

      <section className="hard-days-section">
        <div className="hard-days-photo">
          <img src={photoSrc(29)} alt="" />
          <div>
            <span>Not every page was easy.</span>
            <strong>That does not make it less worth keeping.</strong>
          </div>
        </div>
        <div className="hard-days-copy">
          <p className="kicker">The hard days · no highlight reel here</p>
          <h2>
            We weren&apos;t perfect.
            <br />
            <em>We repaired.</em>
          </h2>
          <p>
            Bagian ini sengaja ada, karena satu tahun kita bukan cuma tawa dan
            foto bagus, ada salah paham, nada yang terlalu tinggi, diam yang
            terlalu lama, dan hari ketika kita sama-sama capek, tapi kalau kita
            mau membawa cerita ini lebih jauh, ini yang ingin aku ingat.
          </p>
          <div
            className={`repair-list ${completed.length >= 4 ? "" : "repair-locked"}`}
          >
            {hardDayFragments.map((item, index) => {
              const open = repairOpen.includes(item.id);
              return (
                <button
                  type="button"
                  key={item.id}
                  disabled={completed.length < 4}
                  className={open ? "repair-open" : ""}
                  onClick={() => revealRepair(item.id)}
                >
                  <span>
                    {open ? <Check /> : String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>
                      {open
                        ? item.copy
                        : completed.length >= 4
                          ? "Open this lesson."
                          : "Complete Chapter 04 to unlock."}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          {repairOpen.length === hardDayFragments.length && (
            <blockquote>
              “Aku gamau hubungan yang ga pernah punya masalah, aku mau hubungan
              yang ketika punya masalah, dua orangnya masih mau belajar pulang.”
            </blockquote>
          )}
        </div>
      </section>

      <section className="vault-section" id="vault">
        <button
          className={`easter-heart egg-vault ${eggs.includes("vault") ? "found" : ""}`}
          type="button"
          onClick={() => collectEgg("vault")}
          aria-label="Hidden heart"
        >
          <Heart fill="currentColor" />
        </button>
        <div className="vault-heading">
          <div>
            <p className="kicker">
              Memory vault · {unlockedPhotos}/50 unlocked
            </p>
            <h2>
              Fifty pieces of
              <br />
              <em>our evidence.</em>
            </h2>
          </div>
          <p>
            Setiap chapter membuka tepat sepuluh foto. Klik foto untuk
            melihatnya lebih dekat dan coba balik Polaroidnya. Beberapa kenangan
            punya pesan di belakang.
          </p>
        </div>
        <div className="vault-grid">
          {Array.from({ length: 50 }, (_, index) => index + 1).map((photo) => {
            const unlocked = photo <= unlockedPhotos;
            return (
              <button
                key={photo}
                type="button"
                className={`vault-photo ${unlocked ? "vault-photo-open" : "vault-photo-locked"}`}
                disabled={!unlocked}
                onClick={() => {
                  setPhotoFlipped(false);
                  setSelectedPhoto(photo);
                }}
                aria-label={
                  unlocked
                    ? `Buka foto kenangan ${photo}`
                    : `Foto ${photo} masih terkunci`
                }
              >
                <img
                  loading="lazy"
                  src={photoSrc(photo)}
                  alt={unlocked ? `Kenangan kita nomor ${photo}` : ""}
                />
                <span>
                  {unlocked ? (
                    String(photo).padStart(2, "0")
                  ) : (
                    <LockKeyhole size={15} />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="letters-section" id="letters">
        <div className="letters-heading">
          <div>
            <p className="kicker">
              Love Letter Archive · {readLetters.length}/5 chapter letters read
            </p>
            <h2>
              Some things were easier
              <br />
              to write than <em>say.</em>
            </h2>
          </div>
          <p>
            Setiap chapter meninggalkan satu surat, bukan copy-paste dengan
            judul berbeda, masing-masing menyimpan bagian cerita yang berbeda.
            Final Letter tetap tersegel sampai Final Mission selesai.
          </p>
        </div>
        <div className="letter-archive-grid">
          {chapterLetters.map((letter) => {
            const unlocked = completed.includes(letter.id);
            const read = readLetters.includes(letter.id);
            return (
              <button
                key={letter.id}
                type="button"
                className={`archive-letter ${unlocked ? "archive-unlocked" : "archive-locked"} ${read ? "archive-read" : ""}`}
                disabled={!unlocked}
                onClick={() => openChapterLetter(letter.id)}
              >
                <span className="archive-stamp">{letter.code}</span>
                <div className="archive-envelope">
                  <Mail />
                  <Heart fill="currentColor" />
                </div>
                <small>
                  {unlocked
                    ? read
                      ? "READ · OPEN AGAIN"
                      : "UNREAD · OPEN ME"
                    : `LOCKED · CHAPTER ${String(letter.id).padStart(2, "0")}`}
                </small>
                <h3>{letter.title}</h3>
                <p>{letter.subtitle}</p>
                <b>
                  {unlocked ? (
                    <>
                      Read letter <ArrowRight size={14} />
                    </>
                  ) : (
                    <>
                      <LockKeyhole size={14} /> Locked
                    </>
                  )}
                </b>
              </button>
            );
          })}
          <button
            type="button"
            className={`archive-letter archive-final ${finalMissionComplete ? "archive-unlocked" : "archive-locked"}`}
            disabled={!finalMissionComplete}
            onClick={openLetter}
          >
            <span className="archive-stamp">FINAL</span>
            <div className="archive-envelope">
              <Crown />
              <Heart fill="currentColor" />
            </div>
            <small>
              {finalMissionComplete
                ? endingSeen
                  ? "READ · OPEN AGAIN"
                  : "DECRYPTED · OPEN ME"
                : "SEALED · FINAL MISSION REQUIRED"}
            </small>
            <h3>If I Could Choose Again</h3>
            <p>The last letter. Everything before this was leading here.</p>
            <b>
              {finalMissionComplete ? (
                <>
                  Open final letter <ArrowRight size={14} />
                </>
              ) : (
                <>
                  <LockKeyhole size={14} /> Sealed
                </>
              )}
            </b>
          </button>
        </div>
        <div className="archive-progress">
          <span>{readLetters.length} of 5 chapter letters read</span>
          <Progress value={(readLetters.length / 5) * 100} />
          <small>
            {readLetters.length === 5
              ? "Every chapter letter has found its reader. ♡"
              : "You can keep moving even if you save a letter for later."}
          </small>
        </div>
      </section>

      <section className="achievements-section" id="achievements">
        <button
          className={`easter-heart egg-achievement ${eggs.includes("achievement") ? "found" : ""}`}
          type="button"
          onClick={() => collectEgg("achievement")}
          aria-label="Hidden heart"
        >
          <Heart fill="currentColor" />
        </button>
        <div className="achievements-copy">
          <p className="kicker">
            Achievement room · {unlockedAchievements}/11 unlocked
          </p>
          <h2>
            Apparently love has <em>side quests.</em>
          </h2>
          <p>
            Ga wajib ditamatkan untuk buka surat, tapi rasanya sayang kalau ada
            rahasia yang masih belum kamu temukan.
          </p>
        </div>
        <div className="achievement-grid">
          {achievements.map((achievement, index) => (
            <article
              key={achievement.id}
              className={
                achievement.unlocked
                  ? "achievement-unlocked"
                  : "achievement-locked"
              }
            >
              <span>{achievement.unlocked ? <Trophy /> : <LockKeyhole />}</span>
              <small>0{index + 1}</small>
              <h3>{achievement.title}</h3>
              <p>{achievement.copy}</p>
              {achievement.unlocked && <b>UNLOCKED</b>}
            </article>
          ))}
        </div>
        <div className="secret-counter">
          <span>Hidden hearts</span>
          <strong>{eggs.length} / 5</strong>
          <div>
            {Array.from({ length: 5 }, (_, index) => (
              <Heart
                key={index}
                fill={index < eggs.length ? "currentColor" : "none"}
              />
            ))}
          </div>
          {eggs.length === 5 && (
            <p>
              Secret message: bahkan setelah seluruh game selesai, aku masih
              berharap kamu terus menemukan alasan kecil untuk tinggal. ♡
            </p>
          )}
        </div>
      </section>

      {eggs.length >= 5 && (
        <section className="secret-chapter" id="secret-chapter">
          <div className="secret-stars" aria-hidden="true">
            <span>✦</span>
            <span>♥</span>
            <span>✦</span>
            <span>♥</span>
          </div>
          <div className="secret-photo-stack">
            {[7, 18, 35].map((photo, index) => (
              <figure
                key={photo}
                style={{ "--secret-index": index } as CSSProperties}
              >
                <img src={photoSrc(photo)} alt="" />
              </figure>
            ))}
          </div>
          <div className="secret-copy">
            <p className="kicker">Secret chapter · all five hearts found</p>
            <h2>
              What I see
              <br />
              when I look at <em>you.</em>
            </h2>
            <p>
              Aku melihat seseorang yang masih ingin aku kenal lebih lama,
              seseorang yang bisa bikin aku kesal, tertawa, kangen, tenang, dan
              kadang bingung dalam hari yang sama.
            </p>
            <p>
              Aku melihat manusia yang nyata bukan versi sempurna yang cuma ada
              di caption anniversary. Dan anehnya, justru versi nyata itu yang
              masih ingin aku pilih.
            </p>
            <div className="secret-lines">
              <span>I see home in progress.</span>
              <span>I see a best friend I can still flirt with.</span>
              <span>I see someone worth learning again tomorrow.</span>
            </div>
            <strong className="secret-signature">
              That&apos;s the secret. It was you in every clue. ♡
            </strong>
          </div>
        </section>
      )}

      {finalMissionComplete && (
        <section className="finale-section" id="finale">
          <div className="mosaic-wall" aria-hidden="true">
            {Array.from({ length: 50 }, (_, index) => index + 1).map(
              (photo) => (
                <img key={photo} src={photoSrc(photo)} alt="" />
              ),
            )}
            <div className="mosaic-shade" />
          </div>
          <div className="finale-copy">
            <p className="kicker">Finale · all memories decrypted</p>
            <h2>
              365 days.
              <br />
              <em>50 memories.</em>
              <br />
              Still you.
            </h2>
            <p>
              Kalau semua halaman ini punya satu jawaban, jawabannya sederhana,
              di antara banyak hal yang berubah dalam satu tahun, aku masih
              ingin berjalan ke chapter berikutnya bersamamu.
            </p>
            <button className="hero-button" type="button" onClick={openLetter}>
              Open the final letter <Mail size={18} />
            </button>
          </div>
        </section>
      )}

      {finalMissionComplete && (
        <section className="museum-section" id="museum">
          <div className="museum-marquee">
            <span>
              THE MUSEUM OF US · ONE YEAR EXHIBITION · THE MUSEUM OF US · ONE
              YEAR EXHIBITION ·
            </span>
          </div>
          <div className="museum-heading">
            <div>
              <p className="kicker">
                Post-game exhibition · Director&apos;s Cut
              </p>
              <h2>
                The Museum
                <br />
                of <em>Us.</em>
              </h2>
            </div>
            <p>
              Enam ruangan. Lima berisi hal-hal yang sudah kita jalani. Satu
              ruangan sengaja belum punya koleksi.
            </p>
          </div>
          <div className="museum-corridor">
            {museumRooms.map((room) => {
              const visited = museumVisited.includes(room.id);
              const isFuture = room.id === 6;
              return (
                <button
                  key={room.id}
                  type="button"
                  className={`museum-door ${visited ? "museum-visited" : ""} ${isFuture ? "museum-future-door" : ""}`}
                  onClick={() => visitMuseumRoom(room.id)}
                >
                  <div className="museum-door-image">
                    {!isFuture ? (
                      <img src={photoSrc(room.photo)} alt="" />
                    ) : (
                      <div className="empty-exhibit">
                        <span>?</span>
                      </div>
                    )}
                    <span>{visited ? <Check /> : room.code}</span>
                  </div>
                  <small>{room.code}</small>
                  <h3>{room.title}</h3>
                  <p>{room.subtitle}</p>
                  <b>
                    Enter room <ArrowRight size={14} />
                  </b>
                </button>
              );
            })}
          </div>

          {finalChoiceMade && (
            <div
              className={`future-capsule ${capsuleSealed ? "capsule-sealed" : ""}`}
            >
              <div className="capsule-mark">
                <Clock3 />
                <span>18 · 09 · 2027</span>
              </div>
              <div>
                <p className="kicker">Future time capsule</p>
                <h3>
                  {futureCapsuleUnlocked
                    ? "Hey, future us."
                    : capsuleSealed
                      ? "Promise sealed."
                      : "A note for us, one year from now."}
                </h3>
                {futureCapsuleUnlocked ? (
                  <p>
                    If you&apos;re reading this on or after our second
                    anniversary: I hope we kept learning. I hope we collected
                    more stupid photos, repaired faster after arguments, and
                    still found reasons to make each other laugh. Whatever
                    changed, thank you for giving Year Two a chance to exist.
                  </p>
                ) : (
                  <p>
                    {capsuleSealed
                      ? "Disimpan untuk 18 September 2027."
                      : "Simpan satu pesan kecil untuk versi kita yang sudah melewati satu tahun lagi. Ga perlu tahu jawabannya sekarang, cukup percaya ada chapter berikutnya yang layak dijalani."}
                  </p>
                )}
              </div>
              {!futureCapsuleUnlocked && (
                <button
                  type="button"
                  disabled={capsuleSealed}
                  onClick={() => setCapsuleSealed(true)}
                >
                  {capsuleSealed ? (
                    <>
                      <Check /> Sealed until Year Two
                    </>
                  ) : (
                    <>
                      <Mail /> Seal the promise
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </section>
      )}

      <section className="epilogue">
        <div className="epilogue-collage">
          {[3, 23, 46].map((photo) => (
            <img key={photo} src={photoSrc(photo)} alt="" />
          ))}
          <span>
            <Heart fill="currentColor" />
          </span>
        </div>
        <div>
          <p className="kicker">To be continued</p>
          <h2>
            Satu tahun selesai.
            <br />
            <em>Cerita kita belum.</em>
          </h2>
          <p>
            Aku gatau chapter berikutnya akan membawa kita ke mana, tapi kalau
            boleh memilih teman perjalanan, aku masih memilih kamu.
          </p>
          {finalMissionComplete && (
            <button
              className="hero-button"
              type="button"
              onClick={() => {
                setEndingSeen(true);
                openLetter();
              }}
            >
              Read it again <Heart size={17} fill="currentColor" />
            </button>
          )}
        </div>
      </section>

      <footer>
        <span>Our Story: The Game · 18 September 2026</span>
        <span>
          {endingSeen
            ? "ENDING DISCOVERED · TO BE CONTINUED"
            : "Find the ending."}
        </span>
        <button type="button" onClick={resetAdventure}>
          <RotateCcw size={14} /> Reset universe
        </button>
      </footer>

      <div className={`music-player ${entered ? "music-player-visible" : ""}`}>
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={playing ? "Jeda lagu" : "Putar lagu"}
        >
          {playing ? (
            <Pause size={18} fill="currentColor" />
          ) : (
            <Play size={18} fill="currentColor" />
          )}
        </button>
        <div>
          <span>
            <Music2 size={12} /> soundtrack
          </span>
          <strong>Aku Milikmu · Dewa 19</strong>
          <input
            type="range"
            min="0"
            max={songDuration || 100}
            value={Math.min(songTime, songDuration || 100)}
            onChange={(event) => {
              if (audioRef.current)
                audioRef.current.currentTime = Number(event.target.value);
            }}
            aria-label="Posisi lagu"
          />
        </div>
        <small>{formatTime(songTime)}</small>
      </div>

      {achievementToast && (
        <div className="achievement-toast">
          <Trophy />
          <div>
            <span>OUR STORY</span>
            <strong>{achievementToast}</strong>
          </div>
          <button type="button" onClick={() => setAchievementToast(null)}>
            <X />
          </button>
        </div>
      )}
      {celebrating && (
        <div className="celebration" aria-hidden="true">
          {Array.from({ length: 50 }, (_, index) => (
            <span
              key={index}
              style={{
                left: `${(index * 29) % 100}%`,
                animationDelay: `${(index % 7) * 0.12}s`,
              }}
            >
              {index % 3 === 0 ? "♥" : "✦"}
            </span>
          ))}
        </div>
      )}

      <Dialog
        open={activeChapter !== null}
        onOpenChange={(open) => {
          if (!open) setActiveChapter(null);
        }}
      >
        <DialogContent className="game-dialog" showCloseButton>
          {activeChapter && (
            <>
              <DialogHeader className="game-dialog-head">
                <p className="kicker">
                  Chapter {String(activeChapter).padStart(2, "0")} ·{" "}
                  {chapters[activeChapter - 1].eyebrow}
                </p>
                <DialogTitle>{chapters[activeChapter - 1].title}</DialogTitle>
                <DialogDescription>
                  {chapters[activeChapter - 1].short}
                </DialogDescription>
              </DialogHeader>
              {activeChapter === 1 && (
                <div className="signal-game">
                  <div className="signal-field">
                    {[7, 24, 39].map((photo) => (
                      <img key={photo} src={photoSrc(photo)} alt="" />
                    ))}
                    {signalSpots.map((spot, index) => {
                      const found = signalFound.includes(index);
                      return (
                        <button
                          key={index}
                          type="button"
                          className={`signal-heart ${found ? "signal-found" : ""}`}
                          style={
                            {
                              left: spot.left,
                              top: spot.top,
                              "--rotate": spot.rotate,
                            } as CSSProperties
                          }
                          onClick={() => {
                            const next = signalFound.includes(index)
                              ? signalFound
                              : [...signalFound, index];
                            setSignalFound(next);
                            if (next.length === 5)
                              setTimeout(() => finishChapter(1), 500);
                          }}
                          aria-label={
                            found
                              ? `Hati ${index + 1} ditemukan`
                              : `Cari hati ${index + 1}`
                          }
                        >
                          <Heart fill="currentColor" />
                        </button>
                      );
                    })}
                  </div>
                  <div className="game-meter">
                    <span>{signalFound.length} dari 5 sinyal ditemukan</span>
                    <Progress value={signalFound.length * 20} />
                  </div>
                </div>
              )}
              {activeChapter === 2 && (
                <div className="timeline-game">
                  <div className="timeline-list">
                    {timelineOrder.map((momentId, index) => {
                      const moment = timelineMoments[momentId];
                      return (
                        <div className="timeline-piece" key={moment.id}>
                          <span>{index + 1}</span>
                          <div>
                            <strong>{moment.label}</strong>
                            <p>{moment.copy}</p>
                          </div>
                          <div>
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => moveTimeline(index, -1)}
                              aria-label="Geser ke atas"
                            >
                              <ArrowUp />
                            </button>
                            <button
                              type="button"
                              disabled={index === timelineOrder.length - 1}
                              onClick={() => moveTimeline(index, 1)}
                              aria-label="Geser ke bawah"
                            >
                              <ArrowDown />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {timelineError && (
                    <p className="game-error">
                      Urutannya belum tepat. Coba ingat: semuanya dimulai dari
                      pertemuan.
                    </p>
                  )}
                  <button
                    className="game-submit"
                    type="button"
                    onClick={checkTimeline}
                  >
                    Periksa urutan <ArrowRight size={17} />
                  </button>
                </div>
              )}
              {activeChapter === 3 && (
                <div className="match-game">
                  <div className="match-grid">
                    {memoryDeck.map((card) => {
                      const open =
                        flipped.includes(card.id) ||
                        matchedPhotos.includes(card.photo);
                      return (
                        <button
                          key={card.id}
                          type="button"
                          className={`match-card ${open ? "match-card-open" : ""}`}
                          disabled={matchedPhotos.includes(card.photo)}
                          onClick={() => flipMemory(card.id, card.photo)}
                          aria-label={
                            open
                              ? `Foto kenangan ${card.photo}`
                              : "Buka kartu kenangan"
                          }
                        >
                          <span className="match-back">
                            <Star fill="currentColor" />
                          </span>
                          <span className="match-front">
                            <img src={photoSrc(card.photo)} alt="" />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="game-meter">
                    <span>
                      {matchedPhotos.length} dari 4 pasangan ditemukan
                    </span>
                    <Progress value={matchedPhotos.length * 25} />
                  </div>
                </div>
              )}
              {activeChapter === 4 && (
                <div className="code-game">
                  <div className="code-clue">
                    <KeyRound />
                    <p>
                      <span>Clue</span>Hari dan bulan ketika kisah kita resmi
                      dimulai. Format: <strong>DDMM</strong>.
                    </p>
                  </div>
                  <InputOTP
                    maxLength={4}
                    value={secretCode}
                    onChange={(value) => {
                      setSecretCode(value);
                      setCodeError(false);
                    }}
                    onComplete={(value) => {
                      if (value === "1809") finishChapter(4);
                      else setCodeError(true);
                    }}
                    containerClassName="otp-wrap"
                  >
                    <InputOTPGroup>
                      {[0, 1, 2, 3].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="otp-slot"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  {codeError && (
                    <p className="game-error">
                      Kodenya belum benar. Lihat lagi tanggal anniversary kita.
                    </p>
                  )}
                  <button
                    className="game-submit"
                    type="button"
                    disabled={secretCode.length !== 4}
                    onClick={checkCode}
                  >
                    Buka kode <KeyRound size={17} />
                  </button>
                </div>
              )}
              {activeChapter === 5 && (
                <div className="promise-game">
                  <div className="promise-rings">
                    <span />
                    <span />
                    <button
                      type="button"
                      className="promise-button"
                      onPointerDown={startHold}
                      onPointerUp={stopHold}
                      onPointerLeave={stopHold}
                      onPointerCancel={stopHold}
                      onKeyDown={(event) => {
                        if (event.key === " " || event.key === "Enter")
                          startHold();
                      }}
                      onKeyUp={stopHold}
                      style={
                        {
                          "--hold": `${holdProgress * 3.6}deg`,
                        } as CSSProperties
                      }
                    >
                      <i>
                        <Heart fill="currentColor" />
                      </i>
                    </button>
                  </div>
                  <strong>
                    {holdProgress > 0
                      ? "Jangan dilepas..."
                      : "Tekan dan tahan selama 3 detik"}
                  </strong>
                  <div className="game-meter">
                    <span>Promise strength</span>
                    <Progress value={holdProgress} />
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={rewardChapter !== null}
        onOpenChange={(open) => {
          if (!open) setRewardChapter(null);
        }}
      >
        <DialogContent className="reward-dialog" showCloseButton>
          {currentReward && (
            <>
              <div className="reward-photo">
                <img
                  src={photoSrc(currentReward.photo)}
                  alt={`Hadiah chapter ${currentReward.id}`}
                />
                <span>
                  <Trophy />
                </span>
              </div>
              <DialogHeader>
                <p className="kicker">
                  Chapter complete · 10 memories unlocked
                </p>
                <DialogTitle>{currentReward.reward}</DialogTitle>
                <DialogDescription>
                  {currentReward.rewardCopy}
                </DialogDescription>
              </DialogHeader>
              <div className="reward-actions">
                <button
                  className="game-submit"
                  type="button"
                  onClick={() => {
                    const id = currentReward.id;
                    setRewardChapter(null);
                    setTimeout(() => openChapterLetter(id), 180);
                  }}
                >
                  Buka {chapterLetters[currentReward.id - 1].code}{" "}
                  <Mail size={17} />
                </button>
                <button
                  className="reward-skip"
                  type="button"
                  onClick={() => {
                    setRewardChapter(null);
                    if (currentReward.id === 5)
                      setTimeout(() => setFinalMissionOpen(true), 350);
                  }}
                >
                  Nanti, lanjut dulu <ArrowRight size={15} />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={selectedPhoto !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPhoto(null);
            setPhotoFlipped(false);
          }
        }}
      >
        <DialogContent className="photo-dialog polaroid-dialog" showCloseButton>
          <DialogHeader className="sr-only">
            <DialogTitle>Foto kenangan {selectedPhoto}</DialogTitle>
            <DialogDescription>
              Salah satu foto yang terbuka dari perjalanan kita.
            </DialogDescription>
          </DialogHeader>
          {selectedPhoto && (
            <button
              type="button"
              className={`memory-polaroid ${photoFlipped ? "is-flipped" : ""}`}
              onClick={() => setPhotoFlipped((value) => !value)}
            >
              <span className="polaroid-face polaroid-front">
                <img
                  src={photoSrc(selectedPhoto)}
                  alt={`Kenangan kita nomor ${selectedPhoto}`}
                />
                <b>
                  {String(selectedPhoto).padStart(2, "0")} / 50 · tap to flip
                </b>
              </span>
              <span className="polaroid-face polaroid-back">
                <Heart fill="currentColor" />
                <strong>
                  {selectedPhoto % 5 === 0
                    ? "Keep this one."
                    : selectedPhoto % 3 === 0
                      ? "We looked happy here."
                      : "Another proof that ordinary days can become favorite memories."}
                </strong>
                <p>
                  {selectedPhoto === 18
                    ? "Hint: 18 is more than just a number in our story."
                    : selectedPhoto === 41
                      ? "Some photos remember things even when we forget the details."
                      : "I hope future us gets to look back at this and smile."}
                </p>
                <small>tap again to return</small>
              </span>
            </button>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={chapterLetterOpen !== null}
        onOpenChange={(open) => {
          if (!open) setChapterLetterOpen(null);
        }}
      >
        <DialogContent className="chapter-letter-dialog" showCloseButton>
          {chapterLetterOpen &&
            (() => {
              const letter = chapterLetters.find(
                (item) => item.id === chapterLetterOpen,
              );
              if (!letter) return null;
              return (
                <>
                  <div className="chapter-letter-top">
                    <div className="letter-postmark">
                      <span>{letter.code}</span>
                      <small>{letter.stamp}</small>
                    </div>
                    <img src={photoSrc(letter.photo)} alt="" />
                  </div>
                  <DialogHeader>
                    <p className="kicker">
                      Unlocked after Chapter{" "}
                      {String(letter.id).padStart(2, "0")} · private
                      correspondence
                    </p>
                    <DialogTitle>{letter.title}</DialogTitle>
                    <DialogDescription>{letter.subtitle}</DialogDescription>
                  </DialogHeader>
                  <div className="chapter-letter-paper">
                    {letter.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                    <p className="chapter-letter-signoff">
                      <em>{letter.signoff}</em>
                      <span>— yours ♡</span>
                    </p>
                  </div>
                  <div className="chapter-letter-footer">
                    <span>{letter.code} · ARCHIVED</span>
                    <button
                      type="button"
                      onClick={() => {
                        const id = letter.id;
                        setChapterLetterOpen(null);
                        if (id === 5 && allComplete && !finalMissionComplete)
                          setTimeout(() => setFinalMissionOpen(true), 250);
                      }}
                    >
                      Continue the story <ArrowRight size={15} />
                    </button>
                  </div>
                </>
              );
            })()}
        </DialogContent>
      </Dialog>

      <Dialog
        open={museumRoom !== null}
        onOpenChange={(open) => {
          if (!open) setMuseumRoom(null);
        }}
      >
        <DialogContent
          className={`museum-dialog ${museumRoom === 6 ? "museum-future-dialog" : ""}`}
          showCloseButton
        >
          {museumRoom &&
            (() => {
              const room = museumRooms.find((item) => item.id === museumRoom);
              if (!room) return null;
              if (room.id === 6)
                return (
                  <div className="future-room">
                    <p className="kicker">
                      {room.code} · {room.subtitle}
                    </p>
                    <div className="future-room-space">
                      <span>THIS SPACE INTENTIONALLY LEFT EMPTY</span>
                    </div>
                    <h2>This room is empty.</h2>
                    <p>
                      Karena kita belum hidup cukup lama untuk mengisi ruangan
                      ini.
                    </p>
                    {!endingSeen ? (
                      <div className="future-room-locked">
                        <LockKeyhole />
                        <span>
                          Read the final letter first. There is one last
                          question after it.
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setMuseumRoom(null);
                            openLetter();
                          }}
                        >
                          Open final letter <Mail size={16} />
                        </button>
                      </div>
                    ) : !finalChoiceMade ? (
                      <div className="year-two-choice">
                        <small>ONE QUESTION · NO PUZZLE THIS TIME</small>
                        <strong>After everything in Year One...</strong>
                        <h3>do you still choose us?</h3>
                        <button type="button" onClick={chooseYearTwo}>
                          Always. <Heart fill="currentColor" />
                        </button>
                      </div>
                    ) : (
                      <div className="year-two-reveal">
                        <Sparkles />
                        <small>NEXT EXHIBITION</small>
                        <strong>YEAR TWO</strong>
                        <span>COMING SOON</span>
                        <p>Collecting memories now.</p>
                      </div>
                    )}
                  </div>
                );
              return (
                <>
                  <div className="museum-dialog-photo">
                    <img src={photoSrc(room.photo)} alt="" />
                    <span>{room.code}</span>
                  </div>
                  <DialogHeader>
                    <p className="kicker">{room.code} · permanent collection</p>
                    <DialogTitle>{room.title}</DialogTitle>
                    <DialogDescription>{room.subtitle}</DialogDescription>
                  </DialogHeader>
                  <div className="museum-room-copy">
                    <p>{room.copy}</p>
                    {room.id === 4 && (
                      <span>
                        Not a room for regret. A room for remembering what we
                        want to do better.
                      </span>
                    )}
                    {room.id === 5 && (
                      <span>
                        Staying means less when it happens automatically. I want
                        mine to keep being a choice.
                      </span>
                    )}
                  </div>
                  <div className="museum-ticket">
                    <span>ONE YEAR EXHIBITION</span>
                    <strong>ADMIT TWO</strong>
                    <small>18 SEP 2025 — FOREVER IN PROGRESS</small>
                  </div>
                </>
              );
            })()}
        </DialogContent>
      </Dialog>

      <Dialog
        open={finalMissionOpen && allComplete && !finalMissionComplete}
        onOpenChange={(open) => {
          setFinalMissionOpen(open);
          if (!open) {
            setFinalSequence([]);
            setFinalError(false);
          }
        }}
      >
        <DialogContent className="final-mission-dialog" showCloseButton>
          <DialogHeader>
            <p className="kicker">Final mission · everything led here</p>
            <DialogTitle>Remember the order.</DialogTitle>
            <DialogDescription>
              Setiap chapter meninggalkan satu simbol. Tekan simbol sesuai
              urutan Chapter 01 sampai Chapter 05.
            </DialogDescription>
          </DialogHeader>
          <div
            className={`sequence-track ${finalError ? "sequence-error" : ""}`}
          >
            {finalCorrectOrder.map((_, index) => (
              <span key={index}>
                {finalSequence[index] ? <Check /> : index + 1}
              </span>
            ))}
          </div>
          <div className="symbol-grid">
            {finalShuffled.map(({ id, label, Icon, clue }) => (
              <button
                type="button"
                key={id}
                disabled={finalSequence.includes(id)}
                onClick={() => selectFinalSymbol(id)}
              >
                <Icon
                  fill={
                    id === "heart" || id === "star" ? "currentColor" : "none"
                  }
                />
                <strong>{label}</strong>
                <span>{clue}</span>
              </button>
            ))}
          </div>
          {finalError && (
            <p className="game-error">
              Urutannya salah. Semua clue sudah ada di nama lima chapter.
            </p>
          )}
          <div className="final-hint">
            <Clock3 />
            <span>
              Think chronologically: first signal → timeline → constellation →
              secret date → promise.
            </span>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={letterOpen && finalMissionComplete}
        onOpenChange={(open) => {
          setLetterOpen(open);
          if (!open) setLetterUnsealed(false);
        }}
      >
        <DialogContent
          className={`letter-dialog cinematic-letter ${letterUnsealed ? "letter-opened" : ""}`}
          showCloseButton
        >
          {!letterUnsealed ? (
            <div className="sealed-letter">
              <p className="kicker">Final reward · for your eyes only</p>
              <div className="envelope">
                <div className="envelope-flap" />
                <div className="envelope-paper">
                  <Heart fill="currentColor" />
                </div>
                <button
                  type="button"
                  className="wax-seal"
                  onClick={() => {
                    setLetterUnsealed(true);
                    setEndingSeen(true);
                  }}
                >
                  <Heart fill="currentColor" />
                  <span>break the seal</span>
                </button>
              </div>
              <h2>The sixth letter.</h2>
              <p>
                Lima surat membawamu sampai sini, yang terakhir ga punya clue
                lagi cuma sesuatu yang ingin aku bilang setelah tahu seluruh
                cerita kita.
              </p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <p className="kicker">FINAL LETTER · decrypted 18.09.2026</p>
                <DialogTitle>If I Could Choose Again</DialogTitle>
                <DialogDescription>
                  Everything before this was leading here.
                </DialogDescription>
              </DialogHeader>
              <div className="letter-scenes">
                {[2, 10, 28, 41, 46].map((photo) => (
                  <img key={photo} src={photoSrc(photo)} alt="" />
                ))}
              </div>
              <div className="letter-body">
                <p>
                  Kalau aku bisa mengulang semuanya dari awal dengan ingatan
                  yang aku punya sekarang, aku tetap mau mengambil jalan yang
                  membawaku ke kamu. Bahkan kalau itu berarti aku harus melewati
                  lagi hari-hari sulitnya, percakapan panjangnya, salah
                  pahamnya, dan semua bagian yang membuat kita harus belajar
                  menjadi lebih dewasa.
                </p>
                <p>
                  Aku akan tetap memilih pertemuan pertama itu, aku akan tetap
                  menunggu obrolan-obrolan kecil kita, aku akan tetap mengambil
                  foto-foto yang mungkin blur dan ga sempurna, aku akan tetap
                  tertawa di hal-hal receh yang kita anggap lucu.
                </p>
                <p>
                  Dan ketika sampai di hari-hari ketika kita tidak baik-baik
                  saja, aku ingin mengulangnya dengan versi diriku yang sedikit
                  lebih sabar, sedikit lebih mau mendengar, sedikit lebih cepat
                  memeluk daripada mempertahankan ego, karena kalau satu tahun
                  ini mengajariku sesuatu, cinta ternyata bukan cuma soal
                  menemukan orang yang tepat, cinta juga soal belajar menjadi
                  orang yang lebih baik untuk seseorang yang ingin kita jaga.
                </p>
                <p>
                  Aku gatau seperti apa Year Two nanti, Kita mungkin punya lebih
                  banyak tempat untuk didatangi, lebih banyak foto jelek untuk
                  disimpan, lebih banyak hal untuk dirayakan, dan mungkin juga
                  masalah baru yang belum kita kenal, tapi aku tidak butuh tahu
                  seluruh jawabannya hari ini.
                </p>
                <p>
                  Aku cuma tahu satu jawaban yang masih sama setelah 365 hari,
                  kalau aku diberi pilihan sekali lagi, setelah tahu seluruh
                  versi cerita kita yang indah maupun yang berantakan aku masih
                  memilih kamu.
                </p>
                <p>
                  Terima kasih sudah menjadi bagian dari hidupku yang tidak lagi
                  terasa seperti kebetulan kecil. Terima kasih sudah bertahan
                  cukup lama sampai kita punya sejarah. Dan terima kasih karena
                  sampai halaman ini, kata “kita” masih punya masa depan yang
                  ingin aku lihat.
                </p>
                <p className="letter-signoff">
                  Happy first anniversary, sayang.
                  <br />
                  <em>If I could choose again, I&apos;d still choose us.</em>
                </p>
                <span>
                  — yours, in every chapter, every argument, every tomorrow ♡
                </span>
              </div>
              <div className="end-credit">
                <Sparkles />
                <span>ENDING 01</span>
                <strong>OUR STORY CONTINUES</strong>
                <small>
                  No sequel announced. We&apos;ll make it ourselves.
                </small>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
