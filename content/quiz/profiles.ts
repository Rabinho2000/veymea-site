export type VeymeaProfile = "play" | "warm" | "fresh" | "slow";

export const PROFILE_ORDER: VeymeaProfile[] = ["play", "warm", "fresh", "slow"];

export type ProfileDefinition = {
  id: VeymeaProfile;
  name: string;
  tagline: string;
  shortDescription: string;
  resultTeaser: string;
  resultFull: string;
  resultNote: string;
  secondaryTips: string[];
  recommendationTags: string[];
};

export const profiles: Record<VeymeaProfile, ProfileDefinition> = {
  play: {
    id: "play",
    name: "PLAY",
    tagline: "Curiosidade em jogo",
    shortDescription:
      "Novelty, playfulness, experimentation, surprise and breaking routine.",
    resultTeaser:
      "O vosso match vive na curiosidade, na surpresa e na vontade de sair da rotina.",
    resultFull:
      "Gostam de quebrar a rotina, descobrir sensações inesperadas e deixar espaço para a surpresa. A vossa experiência ideal mistura novidade, intensidade e muita curiosidade.",
    resultNote:
      "A vossa experiência ideal mistura novidade, intensidade e muita curiosidade.",
    secondaryTips: [
      "Experimentem algo que nunca tenham feito antes — mesmo que seja pequeno.",
      "Deixem espaço para a surpresa: o imprevisto pode ser a melhor parte.",
      "Usem a curiosidade como ponto de partida para uma conversa a dois.",
    ],
    recommendationTags: ["play", "novelty", "experimentation"],
  },
  warm: {
    id: "warm",
    name: "WARM",
    tagline: "Calor que aproxima",
    shortDescription:
      "Intensity, warmth, sensual energy and prolonged experiences.",
    resultTeaser:
      "O vosso match vive no calor, na intensidade e em momentos que se prolongam.",
    resultFull:
      "Procuram uma experiência envolvente, intensa e criada para prolongar cada momento a dois. A vossa ligação cresce quando o ritmo abranda e a sensação ganha intensidade.",
    resultNote:
      "A vossa ligação cresce quando o ritmo abranda e a sensação ganha intensidade.",
    secondaryTips: [
      "Criem um ambiente envolvente antes de começar — luz, tempo, atenção.",
      "Deixem a intensidade crescer gradualmente em vez de ir direto ao ponto.",
      "Prolonguem o que já sabem que gostam, com mais presença.",
    ],
    recommendationTags: ["warm", "intensity", "sensual"],
  },
  fresh: {
    id: "fresh",
    name: "FRESH",
    tagline: "Contraste que desperta",
    shortDescription:
      "Lightness, texture, contrast, temperature and unexpected sensory changes.",
    resultTeaser:
      "O vosso match vive no contraste, na leveza e em sensações que transformam o familiar.",
    resultFull:
      "Gostam de leveza, espontaneidade e de sensações que transformam o familiar em algo novo. A vossa experiência ideal é fresca, lúdica e cheia de pequenos contrastes.",
    resultNote:
      "A vossa experiência ideal é fresca, lúdica e cheia de pequenos contrastes.",
    secondaryTips: [
      "Procurem pequenos contrastes — temperatura, textura, ritmo.",
      "Transformem algo familiar com um detalhe inesperado.",
      "Deixem a leveza guiar a experiência em vez de a tornar séria.",
    ],
    recommendationTags: ["fresh", "contrast", "texture"],
  },
  slow: {
    id: "slow",
    name: "SLOW",
    tagline: "Presença sem pressa",
    shortDescription:
      "Touch, comfort, massage, ritual, trust and connection.",
    resultTeaser:
      "O vosso match vive no toque, no tempo e nas pequenas coisas que criam proximidade.",
    resultFull:
      "Valorizam o toque, a confiança e os momentos que criam proximidade antes de qualquer outra coisa. A vossa experiência ideal começa na presença, no conforto e na conexão.",
    resultNote:
      "A vossa experiência ideal começa na presença, no conforto e na conexão.",
    secondaryTips: [
      "Comecem com um ritual — massagem, conversa, ou apenas presença.",
      "Deixem o toque e o conforto criar a base antes de mais.",
      "Dêem tempo ao tempo: a conexão não precisa de pressa.",
    ],
    recommendationTags: ["slow", "massage", "touch", "ritual"],
  },
};
