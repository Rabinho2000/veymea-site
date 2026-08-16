export type VeymeaProfile = "play" | "warm" | "fresh" | "slow";

export const PROFILE_ORDER: VeymeaProfile[] = ["play", "warm", "fresh", "slow"];

export type ProfileResultCopy = {
  teaser: string;
  full: string;
  note: string;
  tips: string[];
};

export type ProfileDefinition = {
  id: VeymeaProfile;
  name: string;
  tagline: string;
  internalDescription: string;
  resultCopy: {
    couple: ProfileResultCopy;
    individual: ProfileResultCopy;
  };
  recommendationTags: string[];
};

export const profiles: Record<VeymeaProfile, ProfileDefinition> = {
  play: {
    id: "play",
    name: "PLAY",
    tagline: "Curiosidade em jogo",
    internalDescription:
      "Novelty, playfulness, experimentation, surprise, breaking routine.",
    resultCopy: {
      couple: {
        teaser:
          "O vosso match vive na curiosidade, na surpresa e na vontade de sair da rotina.",
        full:
          "Gostam de quebrar a rotina, descobrir sensações inesperadas e deixar espaço para a surpresa. A vossa experiência ideal mistura novidade, intensidade e muita curiosidade.",
        note:
          "A vossa experiência ideal mistura novidade, intensidade e muita curiosidade.",
        tips: [
          "Experimentem algo que nunca tenham feito antes — mesmo que seja pequeno.",
          "Deixem espaço para a surpresa: o imprevisto pode ser a melhor parte.",
          "Usem a curiosidade como ponto de partida para uma conversa a dois.",
        ],
      },
      individual: {
        teaser:
          "O teu match vive na curiosidade, na surpresa e na vontade de sair da rotina.",
        full:
          "Gostas de quebrar a rotina, descobrir sensações inesperadas e deixar espaço para a surpresa. A tua experiência ideal mistura novidade, intensidade e muita curiosidade.",
        note:
          "A tua experiência ideal mistura novidade, intensidade e muita curiosidade.",
        tips: [
          "Experimenta algo que nunca tenhas feito antes — mesmo que seja pequeno.",
          "Deixa espaço para a surpresa: o imprevisto pode ser a melhor parte.",
          "Usa a curiosidade como ponto de partida para te descobrires.",
        ],
      },
    },
    recommendationTags: ["play", "novelty", "experimentation"],
  },
  warm: {
    id: "warm",
    name: "WARM",
    tagline: "Calor que aproxima",
    internalDescription:
      "Intensity, warmth, sensual energy, prolonged experiences.",
    resultCopy: {
      couple: {
        teaser:
          "O vosso match vive no calor, na intensidade e em momentos que se prolongam.",
        full:
          "Procuram uma experiência envolvente, intensa e criada para prolongar cada momento a dois. A vossa ligação cresce quando o ritmo abranda e a sensação ganha intensidade.",
        note:
          "A vossa ligação cresce quando o ritmo abranda e a sensação ganha intensidade.",
        tips: [
          "Criem um ambiente envolvente antes de começar — luz, tempo, atenção.",
          "Deixem a intensidade crescer gradualmente em vez de ir direto ao ponto.",
          "Prolonguem o que já sabem que gostam, com mais presença.",
        ],
      },
      individual: {
        teaser:
          "O teu match vive no calor, na intensidade e em momentos que se prolongam.",
        full:
          "Procuras uma experiência envolvente, intensa e criada para prolongar cada momento. A tua ligação cresce quando o ritmo abranda e a sensação ganha intensidade.",
        note:
          "A tua ligação cresce quando o ritmo abranda e a sensação ganha intensidade.",
        tips: [
          "Cria um ambiente envolvente antes de começar — luz, tempo, atenção.",
          "Deixa a intensidade crescer gradualmente em vez de ir direto ao ponto.",
          "Prolonga o que já sabes que gostas, com mais presença.",
        ],
      },
    },
    recommendationTags: ["warm", "intensity", "sensual"],
  },
  fresh: {
    id: "fresh",
    name: "FRESH",
    tagline: "Contraste que desperta",
    internalDescription:
      "Lightness, texture, contrast, temperature, unexpected sensory changes.",
    resultCopy: {
      couple: {
        teaser:
          "O vosso match vive no contraste, na leveza e em sensações que transformam o familiar.",
        full:
          "Gostam de leveza, espontaneidade e de sensações que transformam o familiar em algo novo. A vossa experiência ideal é fresca, lúdica e cheia de pequenos contrastes.",
        note:
          "A vossa experiência ideal é fresca, lúdica e cheia de pequenos contrastes.",
        tips: [
          "Procurem pequenos contrastes — temperatura, textura, ritmo.",
          "Transformem algo familiar com um detalhe inesperado.",
          "Deixem a leveza guiar a experiência em vez de a tornar séria.",
        ],
      },
      individual: {
        teaser:
          "O teu match vive no contraste, na leveza e em sensações que transformam o familiar.",
        full:
          "Gostas de leveza, espontaneidade e de sensações que transformam o familiar em algo novo. A tua experiência ideal é fresca, lúdica e cheia de pequenos contrastes.",
        note:
          "A tua experiência ideal é fresca, lúdica e cheia de pequenos contrastes.",
        tips: [
          "Procura pequenos contrastes — temperatura, textura, ritmo.",
          "Transforma algo familiar com um detalhe inesperado.",
          "Deixa a leveza guiar a experiência em vez de a tornar séria.",
        ],
      },
    },
    recommendationTags: ["fresh", "contrast", "texture"],
  },
  slow: {
    id: "slow",
    name: "SLOW",
    tagline: "Presença sem pressa",
    internalDescription:
      "Touch, comfort, massage, ritual, trust, connection.",
    resultCopy: {
      couple: {
        teaser:
          "O vosso match vive no toque, no tempo e nas pequenas coisas que criam proximidade.",
        full:
          "Valorizam o toque, a confiança e os momentos que criam proximidade antes de qualquer outra coisa. A vossa experiência ideal começa na presença, no conforto e na conexão.",
        note:
          "A vossa experiência ideal começa na presença, no conforto e na conexão.",
        tips: [
          "Comecem com um ritual — massagem, conversa, ou apenas presença.",
          "Deixem o toque e o conforto criar a base antes de mais.",
          "Dêem tempo ao tempo: a conexão não precisa de pressa.",
        ],
      },
      individual: {
        teaser:
          "O teu match vive no toque, no tempo e nas pequenas coisas que criam proximidade.",
        full:
          "Valorizas o toque, a confiança e os momentos que criam proximidade antes de qualquer outra coisa. A tua experiência ideal começa na presença, no conforto e na conexão.",
        note:
          "A tua experiência ideal começa na presença, no conforto e na conexão.",
        tips: [
          "Começa com um ritual — massagem, conversa, ou apenas presença.",
          "Deixa o toque e o conforto criar a base antes de mais.",
          "Dá tempo ao tempo: a conexão não precisa de pressa.",
        ],
      },
    },
    recommendationTags: ["slow", "massage", "touch", "ritual"],
  },
};
