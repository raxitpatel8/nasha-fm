export type Track = {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  /** mm:ss placeholder — replace once the real videoId is wired up; the player
   *  also reads the live duration back from the YouTube IFrame API at runtime. */
  duration: string;
  /**
   * TODO: replace with the official rights-holder upload's video ID
   * (e.g. T-Series / Saregama / Zee Music channel). Left blank on purpose —
   * see project notes: we don't add copyrighted videoIds without your say-so.
   */
  videoId: string;
};

export type Playlist = {
  id: string;
  name: string;
  tagline: string;
  tracks: Track[];
};

// Sourced entirely from the "My Top 19 Picks" list you provided, split into
// three moods. Adding a song anywhere below is a one-line change.
export const playlists: Playlist[] = [
  {
    id: "golden-aashiqui",
    name: "Golden Aashiqui",
    tagline: "Romantic & evergreen",
    tracks: [
      { id: "t1", title: "Pehla Nasha", artist: "Udit Narayan, Sadhana Sargam", film: "Jo Jeeta Wohi Sikandar", year: 1992, duration: "5:32", videoId: "LzXLcKbbDTw" },
      { id: "t2", title: "Tu Meri Zindagi Hai", artist: "Kumar Sanu, Anuradha Paudwal", film: "Aashiqui", year: 1990, duration: "5:47", videoId: "a4QyYyloteQ" },
      { id: "t3", title: "Nazar Ke Samne", artist: "Kumar Sanu", film: "Aashiqui", year: 1990, duration: "5:58", videoId: "A4_KJ8t-dbo" },
      { id: "t4", title: "Bahut Pyar Karte Hain", artist: "Kumar Sanu, Sadhana Sargam", film: "Saajan", year: 1991, duration: "6:10", videoId: "" },
      { id: "t5", title: "Mera Dil Bhi Kitna Pagal Hai", artist: "Kumar Sanu, Alka Yagnik", film: "Saajan", year: 1991, duration: "5:41", videoId: "" },
      { id: "t6", title: "Dheere Dheere Se Meri Zindagi Mein Aana", artist: "Kumar Sanu", film: "Aashiqui", year: 1990, duration: "5:25", videoId: "Mcs2xEZ6K8o" },
      { id: "t7", title: "Ek Ladki Ko Dekha", artist: "Kumar Sanu", film: "1942: A Love Story", year: 1994, duration: "5:52", videoId: "fTauOK8J-U8" },
    ],
  },
  {
    id: "dil-se",
    name: "Dil Se",
    tagline: "Sad & emotional",
    tracks: [
      { id: "t8", title: "Kuch Na Kaho", artist: "Kumar Sanu, Kavita Krishnamurthy", film: "1942: A Love Story", year: 1994, duration: "6:20", videoId: "Kidtrrn4aUM" },
      { id: "t9", title: "Tujhe Dekha To", artist: "Kumar Sanu, Lata Mangeshkar", film: "Dilwale Dulhania Le Jayenge", year: 1995, duration: "5:38", videoId: "cNV5hLSa9H8" },
      { id: "t10", title: "Ho Gaya Hai Tujhko To Pyar Sajna", artist: "Lata Mangeshkar, Udit Narayan", film: "Dilwale Dulhania Le Jayenge", year: 1995, duration: "5:55", videoId: "" },
      { id: "t11", title: "Mujhe Neend Na Aaye", artist: "Kumar Sanu, Anuradha Paudwal", film: "Dil", year: 1990, duration: "5:14", videoId: "qjLPZsfA9Os" },
      { id: "t12", title: "Tadap Tadap Ke", artist: "K.K.", film: "Hum Dil De Chuke Sanam", year: 1999, duration: "6:47", videoId: "" },
      { id: "t13", title: "Pardesi Pardesi", artist: "Udit Narayan, Alka Yagnik", film: "Raja Hindustani", year: 1996, duration: "6:32", videoId: "" },
    ],
  },
  {
    id: "sikandar-nights",
    name: "Sikandar Nights",
    tagline: "Fun & feel-good",
    tracks: [
      { id: "t14", title: "Aaye Ho Meri Zindagi Mein", artist: "Udit Narayan, Alka Yagnik", film: "Raja Hindustani", year: 1996, duration: "5:29", videoId: "" },
      { id: "t15", title: "Do Dil Mil Rahe Hain", artist: "Udit Narayan, Alka Yagnik", film: "Pardes", year: 1997, duration: "5:44", videoId: "" },
      { id: "t16", title: "Tum Mile Dil Khile", artist: "Kumar Sanu, Sadhana Sargam", film: "Criminal", year: 1995, duration: "5:18", videoId: "" },
      { id: "t17", title: "Aankhon Se Tune Kya Keh Diya", artist: "Kumar Sanu, Alka Yagnik", film: "Ghulam", year: 1998, duration: "5:36", videoId: "" },
      { id: "t18", title: "Yahan Ke Hum Sikandar", artist: "Udit Narayan, Vinod Rathod", film: "Jo Jeeta Wohi Sikandar", year: 1992, duration: "5:20", videoId: "" },
      { id: "t19", title: "Yeh Jo Des Hai Tera", artist: "Udit Narayan", film: "Swades", year: 2004, duration: "5:47", videoId: "" },
    ],
  },
];
