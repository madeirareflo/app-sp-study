(() => {
  const data = window.APP_DATA;
  const procedures = window.APP_PROCEDURE_ROUTES || [];
  const analysis = window.APP_ANALYSIS?.procedures || [];
  if (!data || !procedures.length) return;
  const analysisById = Object.fromEntries(analysis.map(item => [item.id, item]));
  analysis.forEach(item => { if (item.airport === "SBAM") item.airport = "SDAI"; });
  procedures.forEach(item => { if (item.airport === "SBAM") item.airport = "SDAI"; });
  const chartRouteSequences = {
    PROC_001: [
      ["KOMGU", "SP048"],
      ["LUVDI", "SP048"],
      ["SP048", "SP049"],
      { points: ["H_SBSP", "KOMGU"], className: "route-missed" }
    ],
    PROC_002: [
      ["KOMGU", "GERSU"],
      ["LUVDI", "GERSU"],
      ["GERSU", "URUTA", "H_SBSP"],
      { points: ["H_SBSP", "KOMGU"], className: "route-missed" }
    ],
    PROC_003: [
      ["SP003", "SP131", "SP132", "SP078", "H_SBSP"],
      { points: ["H_SBSP", "SP137"], className: "route-missed" }
    ],
    PROC_009: [
      ["H_SBSP", "SP102", "BAIAN", "SP103", "ISOXO", "ORIMU", "VUMEV", "NUXEL"],
      ["BAIAN", "UREMI"],
      ["BAIAN", "NIBRU"]
    ],
    PROC_010: [
      ["H_SBSP", "SP053", "SP081", "SP066", "SP039", "SP038", "XOGOD", "UMRAR", "UBRAM"],
      ["UBRAM", "ASETA"],
      ["UBRAM", "EGEVA"]
    ],
    PROC_011: [
      ["H_SBSP", "SP104", "SP106", "UTKOM", "SP084", "SP086", "UGTIX", "SP087", "SP088", "GERTU"],
      ["UGTIX", "LESSA", "ASETA"],
      ["UGTIX", "LESSA", "EGEVA"],
      ["UGTIX", "LESSA", "VURDU"]
    ],
    PROC_012: [
      ["H_SBSP", "SP104", "SP106", "UTKOM"],
      ["UTKOM", "SOVSI"],
      ["UTKOM", "NIBGA"],
      ["UTKOM", "UBSOD"],
      ["UTKOM", "MADNI"]
    ],
    PROC_013: [
      ["H_SBSP", "SP107", "VUNVU", "SP108", "BAIAN", "SP103", "ISOXO", "ORIMU", "VUMEV", "NUXEL"],
      ["BAIAN", "UREMI"],
      ["BAIAN", "NIBRU"]
    ],
    PROC_014: [
      ["H_SBSP", "SP082", "SP083", "SEDLO"],
      ["SEDLO", "SOVSI"],
      ["SEDLO", "NIBGA"],
      ["SEDLO", "UBSOD"],
      ["SEDLO", "MADNI"]
    ],
    PROC_015: [
      ["H_SBSP", "SP074", "SP079", "SP038", "XOGOD", "UMRAR", "UBRAM"],
      ["UBRAM", "ASETA"],
      ["UBRAM", "EGEVA"]
    ],
    PROC_016: [
      ["H_SBSP", "SP082", "SP083", "SEDLO", "SP084", "SP086", "UGTIX", "SP087", "SP088", "GERTU"],
      ["UGTIX", "LESSA", "ASETA"],
      ["UGTIX", "LESSA", "EGEVA"],
      ["UGTIX", "LESSA", "VURDU"]
    ],
    PROC_018: [
      ["IBDAL", "MANLO", "SP033", "OGTAL", "SP099", "SP101", "SP032", "KOMGU"],
      ["ANISE", "SP091", "SP111", "OGTAL"]
    ],
    PROC_020: [
      ["ANISE", "SP091", "SP111", "OGTAL"]
    ],
    PROC_021: [
      ["IBDAL", "MANLO", "SP033", "ESUNI"]
    ],
    PROC_022: [
      ["UTLOT", "RUSTE", "ORESU", "PRUMO", "IROPU", "KOMGU", "SP098", "OGTAL"],
      ["ENTIT", "OTAGA", "NEKIG", "MAVKA", "SP031", "ORESU"]
    ],
    PROC_023: [
      ["LOMEN", "GR202", "LUTPO", "OPSER", "H_SBGR"],
      { points: ["H_SBGR", "ISIMU"], className: "route-missed", curve: "right-turn" }
    ],
    PROC_024: [
      ["LOMEN", "GR202", "LUTPO", "OPSER", "H_SBGR"],
      { points: ["H_SBGR", "ISIMU"], className: "route-missed", curve: "right-turn" }
    ],
    PROC_025: [
      ["UTKUG", "ETIKO", "VUSNI", "H_SBGR"],
      { points: ["H_SBGR", "ISIMU"], className: "route-missed", curve: "left-turn" }
    ],
    PROC_026: [
      ["UTKUG", "ETIKO", "VUSNI", "H_SBGR"],
      { points: ["H_SBGR", "ISIMU"], className: "route-missed", curve: "left-turn" }
    ],
    PROC_027: [
      ["LOMEN", "VUSMU", "LUTPO", "OPSER", "H_SBGR"],
      { anchor: "H_SBGR", offsets: [[0, 0], [0.067, -0.002], [0.104, 0.071]], className: "route-missed", curve: "vector-turn" }
    ],
    PROC_028: [
      ["LOMEN", "GR202", "LUTPO", "OPSER", "H_SBGR"],
      { points: ["H_SBGR", "ISIMU"], className: "route-missed", curve: "right-turn" }
    ],
    PROC_029: [
      ["LOMEN", "GR202", "LUTPO", "OPSER", "H_SBGR"],
      { points: ["H_SBGR", "ISIMU"], className: "route-missed", curve: "right-turn" }
    ],
    PROC_030: [
      ["LOMEN", "GR202", "LUTPO", "OPSER", "H_SBGR"],
      { points: ["H_SBGR", "ISIMU"], className: "route-missed", curve: "right-turn" }
    ],
    PROC_031: [
      ["UTKUG", "ETIKO", "VUSNI", "H_SBGR"],
      { points: ["H_SBGR", "ISIMU"], className: "route-missed", curve: "left-turn" }
    ],
    PROC_032: [
      ["UTKUG", "ETIKO", "VUSNI", "H_SBGR"],
      { points: ["H_SBGR", "ISIMU"], className: "route-missed", curve: "left-turn" }
    ],
    PROC_033: [
      ["H_SBGR", "AMVUL", "GR222", "GR217", "GR321", "VUMEV", "NUXEL"],
      ["GR321", "GR223", "GR224", "ORONU", "GERKA", "GERTU"],
      ["ORONU", "ISMOB"]
    ],
    PROC_034: [
      ["H_SBGR", "AMVUL", "GR027", "EKOPO", "UREMI"],
      ["EKOPO", "NIBRU"]
    ],
    PROC_035: [
      ["H_SBGR", "AMVUL", "GR027", "GR209", "GR212", "CGO", "ZORZA"],
      ["ZORZA", "GR214", "GR216", "LESSA", "EGEVA"],
      ["ZORZA", "GR214", "GR216", "LESSA", "ASETA"],
      ["ZORZA", "SOVSI"],
      ["ZORZA", "UBSOD"],
      ["ZORZA", "MADNI"]
    ],
    PROC_036: [
      ["H_SBGR", "GR317", "GR319", "UGIKI", "GR212", "CGO", "ZORZA", "GR214", "GR216", "LESSA", "EGEVA"],
      ["LESSA", "ASETA"],
      ["ZORZA", "SOVSI"],
      ["ZORZA", "UBSOD"],
      ["ZORZA", "MADNI"]
    ],
    PROC_037: [
      ["H_SBGR", "GR209", "EKOPO", "NIBRU"],
      ["EKOPO", "UREMI"]
    ],
    PROC_038: [
      ["H_SBGR", "GR209", "EKOPO", "UREMI"]
    ]
  };
  const supplementalPoints = {
    PROC_011: [
      { fix: "SP106", x: 0.39347, y: 0.62068, quality: "referência compartilhada" },
      { fix: "SP084", x: 0.24284, y: 0.5877, quality: "referência compartilhada" },
      { fix: "LESSA", x: 0.22, y: 0.32, quality: "ajuste necessário" }
    ],
    PROC_013: [
      { fix: "SP103", x: 0.68448, y: 0.60364, quality: "referência compartilhada" }
    ],
    PROC_016: [
      { fix: "LESSA", x: 0.22, y: 0.32, quality: "referência compartilhada" }
    ],
    PROC_023: [
      { fix: "LOMEN", x: 0.46177, y: 0.46854, quality: "referência compartilhada" },
      { fix: "GR202", x: 0.50422, y: 0.5801, quality: "ajuste necessário" },
      { fix: "LUTPO", x: 0.59265, y: 0.49145, quality: "ajuste necessário" },
      { fix: "OPSER", x: 0.6319, y: 0.51, quality: "ajuste necessário" },
      { fix: "ISIMU", x: 0.48044, y: 0.50786, quality: "ajuste necessário" }
    ],
    PROC_024: [
      { fix: "LOMEN", x: 0.46177, y: 0.46854, quality: "referência compartilhada" },
      { fix: "GR202", x: 0.50422, y: 0.5801, quality: "referência compartilhada" },
      { fix: "LUTPO", x: 0.59265, y: 0.49145, quality: "referência compartilhada" },
      { fix: "OPSER", x: 0.6319, y: 0.51, quality: "referência compartilhada" },
      { fix: "ISIMU", x: 0.48044, y: 0.50786, quality: "referência compartilhada" }
    ],
    PROC_027: [
      { fix: "VUSMU", x: 0.53, y: 0.49, quality: "ajuste necessário" }
    ],
    PROC_035: [
      { fix: "LESSA", x: 0.22, y: 0.32, quality: "ajuste necessário" },
      { fix: "UBSOD", x: 0.14388, y: 0.83157, quality: "referência compartilhada" },
      { fix: "CGO", x: 0.34, y: 0.48, quality: "referência da carta; ajuste necessário" }
    ],
    PROC_036: [
      { fix: "LESSA", x: 0.22, y: 0.32, quality: "referência compartilhada" },
      { fix: "CGO", x: 0.34, y: 0.48, quality: "referência da carta; ajuste necessário" }
    ]
  };
  const chartSupplementalRestrictions = {
    PROC_001: {
      SP048: { published: ["≥ 4700'"], explanation: "A carta RNP T publica a passagem em SP048 a 4700 pés ou acima; SP048 é o IF comum dos ramos de KOMGU e LUVDI." }
    },
    PROC_002: {
      GERSU: { published: ["≥ 4700'"], explanation: "A carta ILS X publica a interceptação em GERSU a 4700 pés ou acima." },
    },
    PROC_010: {
      SP053: { published: ["IAS MAX 190KT"], explanation: "A carta publica velocidade indicada máxima de 190 nós em SP053." }
    },
    PROC_011: {
      SP104: { published: ["IAS MAX 250KT"], explanation: "A carta publica velocidade indicada máxima de 250 nós em SP104." },
      SP106: { published: ["≤ 7500'"], explanation: "A carta publica cruzamento de SP106 a 7500 pés ou abaixo." },
      SP084: { published: ["≥ FL100"], explanation: "A carta publica cruzamento de SP084 no FL100 ou acima." }
    },
    PROC_012: {
      SP104: { published: ["IAS MAX 250KT"], explanation: "A carta publica velocidade indicada máxima de 250 nós em SP104." },
      SP106: { published: ["≤ 7500'"], explanation: "A carta publica cruzamento de SP106 a 7500 pés ou abaixo." }
    },
    PROC_013: {
      SP107: { published: ["IAS MAX 210KT"], explanation: "A carta publica velocidade indicada máxima de 210 nós em SP107." },
      VUNVU: { published: ["≤ 5500'"], explanation: "A carta publica cruzamento de VUNVU a 5500 pés ou abaixo." },
      SP103: { published: ["≥ FL140"], explanation: "A carta publica cruzamento de SP103 no FL140 ou acima." }
    },
    PROC_014: {
      SP082: { published: ["IAS MAX 220KT"], explanation: "A carta publica velocidade indicada máxima de 220 nós em SP082." }
    },
    PROC_015: {
      SP074: { published: ["IAS MAX 220KT"], explanation: "A carta publica velocidade indicada máxima de 220 nós em SP074." }
    },
    PROC_016: {
      SP082: { published: ["IAS MAX 240KT"], explanation: "A carta publica velocidade indicada máxima de 240 nós em SP082." }
    }
  };
  const chartRestrictionOverrides = {
    PROC_018: {
      MANLO: { published: ["≤ FL260"], explanation: "A carta publica cruzamento de MANLO no FL260 ou abaixo." }
    },
    PROC_022: {
      ORESU: { published: ["≥ FL130", "≤ FL170"], explanation: "A carta publica janela entre FL130 e FL170 em ORESU." },
      PRUMO: { published: ["≥ FL120"], explanation: "A carta publica cruzamento de PRUMO no FL120 ou acima." }
    },
    PROC_023: {
      LOMEN: { published: ["≥ 6000'"], explanation: "A carta publica entrada em LOMEN a 6000 pés ou acima." },
      GR202: { published: ["≥ 5100'"], explanation: "A carta publica cruzamento de GR202 a 5100 pés ou acima." },
      LUTPO: { published: ["≥ 4500'"], explanation: "A carta publica cruzamento de LUTPO a 4500 pés ou acima." },
      OPSER: { published: ["≥ 4100'"], explanation: "A carta publica cruzamento do FAF OPSER a 4100 pés ou acima." },
      ISIMU: { published: ["≥ 6000'"], explanation: "A aproximação perdida publica espera em ISIMU a 6000 pés ou acima." }
    },
    PROC_024: {
      LOMEN: { published: ["≥ 6000'"], explanation: "A carta publica entrada em LOMEN a 6000 pés ou acima." },
      GR202: { published: ["≥ 5100'"], explanation: "A carta publica cruzamento de GR202 a 5100 pés ou acima." },
      LUTPO: { published: ["≥ 4500'"], explanation: "A carta publica cruzamento de LUTPO a 4500 pés ou acima." },
      OPSER: { published: ["≥ 4100'"], explanation: "A carta publica cruzamento do FAF OPSER a 4100 pés ou acima." },
      ISIMU: { published: ["≥ 6000'"], explanation: "A aproximação perdida publica espera em ISIMU a 6000 pés ou acima." }
    },
    PROC_025: {
      UTKUG: { published: ["≥ 6000'"], explanation: "A carta publica entrada no IAF UTKUG a 6000 pés ou acima." },
      ETIKO: { published: ["≥ 4500'"], explanation: "A carta publica cruzamento do IF ETIKO a 4500 pés ou acima." },
      VUSNI: { published: ["≥ 4090'"], explanation: "A carta publica cruzamento do FAF VUSNI a 4090 pés ou acima." },
      ISIMU: { published: ["≥ 6000'"], explanation: "A aproximação perdida publica espera em ISIMU a 6000 pés ou acima." }
    },
    PROC_026: {
      UTKUG: { published: ["≥ 6000'"], explanation: "A carta publica entrada no IAF UTKUG a 6000 pés ou acima." },
      ETIKO: { published: ["≥ 4500'"], explanation: "A carta publica cruzamento do IF ETIKO a 4500 pés ou acima." },
      VUSNI: { published: ["≥ 4090'"], explanation: "A carta publica cruzamento do FAF VUSNI a 4090 pés ou acima." },
      ISIMU: { published: ["≥ 6000'"], explanation: "A aproximação perdida publica espera em ISIMU a 6000 pés ou acima." }
    },
    PROC_027: {
      LOMEN: { published: ["≥ 6000'"], explanation: "A carta publica entrada no IAF LOMEN a 6000 pés ou acima." },
      VUSMU: { published: ["≥ 5100'"], explanation: "A carta publica cruzamento do IF VUSMU a 5100 pés ou acima." },
      LUTPO: { published: ["≥ 4200'"], explanation: "A carta publica cruzamento de LUTPO a 4200 pés ou acima." },
      OPSER: { published: ["≥ 4100'"], explanation: "A carta publica cruzamento do FAF OPSER a 4100 pés ou acima." }
    },
    PROC_028: {
      LOMEN: { published: ["≥ 6000'"], explanation: "A carta publica entrada no IAF LOMEN a 6000 pés ou acima." },
      GR202: { published: ["≥ 5100'"], explanation: "A carta publica cruzamento de GR202 a 5100 pés ou acima." },
      LUTPO: { published: ["≥ 4500'"], explanation: "A carta publica cruzamento do IF LUTPO a 4500 pés ou acima." },
      OPSER: { published: ["≥ 4100'"], explanation: "A carta publica cruzamento do FAF OPSER a 4100 pés ou acima." },
      ISIMU: { published: ["≥ 6000'"], explanation: "A aproximação perdida publica espera em ISIMU a 6000 pés ou acima." }
    },
    PROC_029: {
      LOMEN: { published: ["≥ 6000'"], explanation: "A carta publica entrada no IAF LOMEN a 6000 pés ou acima." },
      GR202: { published: ["≥ 5100'"], explanation: "A carta publica cruzamento de GR202 a 5100 pés ou acima." },
      LUTPO: { published: ["≥ 4500'"], explanation: "A carta publica cruzamento do IF LUTPO a 4500 pés ou acima." },
      OPSER: { published: ["≥ 4100'"], explanation: "A carta publica cruzamento do FAF OPSER a 4100 pés ou acima." },
      ISIMU: { published: ["≥ 6000'"], explanation: "A aproximação perdida publica espera em ISIMU a 6000 pés ou acima." }
    },
    PROC_030: {
      LOMEN: { published: ["≥ 6000'"], explanation: "A carta publica entrada no IAF LOMEN a 6000 pés ou acima." },
      GR202: { published: ["≥ 5100'"], explanation: "A carta publica cruzamento de GR202 a 5100 pés ou acima." },
      LUTPO: { published: ["≥ 4500'"], explanation: "A carta publica cruzamento do IF LUTPO a 4500 pés ou acima." },
      OPSER: { published: ["≥ 4100'"], explanation: "A carta publica cruzamento do FAF OPSER a 4100 pés ou acima." },
      ISIMU: { published: ["≥ 6000'"], explanation: "A aproximação perdida publica espera em ISIMU a 6000 pés ou acima." }
    },
    PROC_031: {
      UTKUG: { published: ["≥ 6000'"], explanation: "A carta publica entrada no IAF UTKUG a 6000 pés ou acima." },
      ETIKO: { published: ["≥ 4500'"], explanation: "A carta publica cruzamento do IF ETIKO a 4500 pés ou acima." },
      VUSNI: { published: ["≥ 4090'"], explanation: "A carta publica cruzamento do FAF VUSNI a 4090 pés ou acima." },
      ISIMU: { published: ["≥ 6000'"], explanation: "A aproximação perdida publica espera em ISIMU a 6000 pés ou acima." }
    },
    PROC_032: {
      UTKUG: { published: ["≥ 6000'"], explanation: "A carta publica entrada no IAF UTKUG a 6000 pés ou acima." },
      ETIKO: { published: ["≥ 4500'"], explanation: "A carta publica cruzamento do IF ETIKO a 4500 pés ou acima." },
      VUSNI: { published: ["≥ 4090'"], explanation: "A carta publica cruzamento do FAF VUSNI a 4090 pés ou acima." },
      ISIMU: { published: ["≥ 6000'"], explanation: "A aproximação perdida publica espera em ISIMU a 6000 pés ou acima." }
    },
    PROC_033: {
      GR217: { published: ["≥ FL100"], explanation: "A carta publica cruzamento de GR217 no FL100 ou acima." },
      GR222: { published: ["≤ FL100"], explanation: "A carta publica cruzamento de GR222 no FL100 ou abaixo." },
      GR223: { published: ["≥ FL180"], explanation: "A carta publica cruzamento de GR223 no FL180 ou acima." },
      GR224: { published: ["≥ FL250"], explanation: "A carta publica cruzamento de GR224 no FL250 ou acima." }
    },
    PROC_003: {
      SP132: { published: ["4240'"], explanation: "No perfil operacional da carta, SP132 é o FAF e o cruzamento publicado é 4240 pés." },
      SP078: { published: ["3595'"], explanation: "No perfil operacional da carta, SP078 é o FROP e o cruzamento publicado é 3595 pés." }
    },
    PROC_034: {
      GR027: { published: ["≤ FL100"], explanation: "Leitura operacional indicada para esta carta: cruzamento de GR027 no FL100 ou abaixo; confirmar na publicação vigente." },
      EKOPO: { published: ["≤ FL130"], explanation: "Leitura operacional indicada para esta carta: cruzamento de EKOPO no FL130 ou abaixo; confirmar na publicação vigente." }
    },
    PROC_035: {
      GR027: { published: ["070/090"], explanation: "A carta mostra janela entre 7000 pés e FL090 em GR027." },
      GR212: { published: ["≤ FL160"], explanation: "A carta publica cruzamento de GR212 no FL160 ou abaixo." },
      GR214: { published: ["≥ FL240"], explanation: "A carta publica cruzamento de GR214 no FL240 ou acima." },
      GR216: { published: ["≥ FL270"], explanation: "A carta publica cruzamento de GR216 no FL270 ou acima." },
      CGO: { published: ["≥ FL100"], explanation: "Restrição operacional informada para a passagem sobre Congonhas: manter FL100 ou acima; confirmar na publicação vigente." }
    },
    PROC_036: {
      CGO: { published: ["≥ FL100"], explanation: "A carta publica passagem sobre o VOR/DME CGO no FL100 ou acima." },
      GR319: { published: ["060/070"], explanation: "Ajuste informado para a carta: GR319 deve ser cruzado entre 6000 e 7000 pés; confirmar na publicação vigente." },
      GR212: { published: ["≤ FL160"], explanation: "A carta publica cruzamento de GR212 no FL160 ou abaixo." },
      GR214: { published: ["≥ FL240"], explanation: "A carta publica cruzamento de GR214 no FL240 ou acima." },
      GR216: { published: ["≥ FL270"], explanation: "A carta publica cruzamento de GR216 no FL270 ou acima." }
    },
    PROC_037: {
      GR209: { published: ["≤ 6000'"], explanation: "A carta publica cruzamento de GR209 a 6000 pés ou abaixo." },
      EKOPO: { published: ["≤ FL130"], explanation: "A carta publica cruzamento de EKOPO no FL130 ou abaixo." }
    },
    PROC_038: {
      GR209: { published: ["≤ 6000'"], explanation: "A carta publica cruzamento de GR209 a 6000 pés ou abaixo." },
      EKOPO: { published: ["≤ FL130"], explanation: "A carta publica cruzamento de EKOPO no FL130 ou abaixo." }
    }
  };
  for (const [procedureId, fixes] of Object.entries(chartRestrictionOverrides)) {
    const source = analysisById[procedureId];
    if (!source) continue;
    for (const [fix, override] of Object.entries(fixes)) {
      let restriction = source.restrictions?.find(item => item.fix === fix);
      if (restriction) Object.assign(restriction, override);
      else if (source.restrictions) {
        restriction = {
          fix, ...override,
          conflict: "Ainda não identificado com segurança",
          separation: "Não estabelecida",
          confidence: "pending_validation",
          analysis_status: "causal_explanation_not_established",
          configurations: source.configurations || [],
          sources: [source.source_title],
          validation: "Restrição confirmada visualmente na carta; motivo operacional pendente."
        };
        source.restrictions.push(restriction);
      }
      if (source.fix_levels) source.fix_levels[fix] = override.published;
    }
  }

  for (const procedure of procedures) {
    if (procedure.id === "PROC_017") procedure.points = [];
    if (procedure.id === "PROC_002") procedure.points = procedure.points.filter(point => ["KOMGU", "LUVDI", "GERSU", "URUTA"].includes(point.fix));
    if (procedure.id === "PROC_020") procedure.points = procedure.points.filter(point => ["ANISE", "SP091", "SP111", "OGTAL"].includes(point.fix));
    if (procedure.id === "PROC_021") procedure.points = procedure.points.filter(point => ["IBDAL", "MANLO", "SP033", "ESUNI"].includes(point.fix));
    if (procedure.id === "PROC_024") procedure.points = procedure.points.filter(point => ["LOMEN", "GR202", "LUTPO", "OPSER", "ISIMU"].includes(point.fix));
    if (procedure.id === "PROC_025") procedure.points = procedure.points.filter(point => ["UTKUG", "ETIKO", "VUSNI", "ISIMU"].includes(point.fix));
    if (procedure.id === "PROC_026") procedure.points = procedure.points.filter(point => ["UTKUG", "ETIKO", "VUSNI", "ISIMU"].includes(point.fix));
    for (const point of supplementalPoints[procedure.id] || []) {
      if (!procedure.points.some(existing => existing.fix === point.fix)) procedure.points.push(point);
    }
    const source = analysisById[procedure.id];
    const hotspotIds = [];
    const hotspotIdByFix = {};
    for (let index = 0; index < procedure.points.length; index++) {
      const point = procedure.points[index];
      const entityId = `MAP_${procedure.id}_${index}`;
      const hotspotId = `H_${entityId}`;
      const restriction = chartRestrictionOverrides[procedure.id]?.[point.fix]
        || source?.restrictions?.find(item => item.fix === point.fix)
        || chartSupplementalRestrictions[procedure.id]?.[point.fix];
      data.entities.push({
        id: entityId,
        type: restriction ? "level" : "fix",
        title: `${point.fix} · ${procedure.title}`,
        summary: `${procedure.type} de ${procedure.airport} · posição ${point.quality}.`,
        facts: {
          "Procedimento": procedure.title,
          "Aeródromo": procedure.airport,
          "Pistas": procedure.runways.join(" / ") || "Consultar carta",
          "Posição inicial": point.quality,
          "Restrição publicada": restriction?.published?.join(" / ") || "Sem restrição extraída neste fixo"
        },
        reason: restriction?.explanation || "Fixo extraído da carta e disponibilizado para calibração no mapa.",
        whyRestriction: restriction ? `${restriction.explanation} Fluxo relacionado: ${restriction.conflict}. Separação: ${restriction.separation}.` : null,
        conflict: restriction?.conflict || "",
        source: source?.source_title || procedure.title,
        confidence: restriction?.confidence || "pending_validation",
        validation: point.quality === "calibrado" ? "Posição derivada da grade geográfica da carta." : "Posição preliminar e ajustável; confirme visualmente no mapa.",
        route: procedure.id,
        routeOnly: true
      });
      data.hotspots.push({
        id: hotspotId,
        entity: entityId,
        label: point.fix,
         displayLabel: procedure.id === "PROC_002" && ["KOMGU", "LUVDI"].includes(point.fix) ? `${point.fix} (IAF)`
           : procedure.id === "PROC_002" && point.fix === "GERSU" ? "GERSU (IF)"
           : procedure.id === "PROC_002" && point.fix === "URUTA" ? "URUTA (FAF)"
           : procedure.id === "PROC_003" && point.fix === "SP003" ? "SP003 (IAF)"
           : procedure.id === "PROC_003" && point.fix === "SP131" ? "SP131 (IF)"
           : procedure.id === "PROC_003" && point.fix === "SP132" ? "SP132 (FAF)"
           : procedure.id === "PROC_003" && point.fix === "SP078" ? "SP078 (FROP)"
           : procedure.id === "PROC_001" && ["KOMGU", "LUVDI"].includes(point.fix) ? `${point.fix} (IAF)`
          : procedure.id === "PROC_001" && point.fix === "SP048" ? "SP048 (IF)"
          : procedure.id === "PROC_001" && point.fix === "SP049" ? "SP049 (FAF)"
          : procedure.id === "PROC_018" && point.fix === "KOMGU" ? "KOMGU (IAF)"
          : procedure.id === "PROC_020" && point.fix === "OGTAL" ? "OGTAL (IAF)"
          : procedure.id === "PROC_021" && point.fix === "ESUNI" ? "ESUNI (IAF)"
          : procedure.id === "PROC_022" && point.fix === "OGTAL" ? "OGTAL (IAF)"
          : procedure.id === "PROC_023" && point.fix === "LOMEN" ? "LOMEN (IAF)"
          : procedure.id === "PROC_023" && point.fix === "LUTPO" ? "LUTPO (IF)"
          : procedure.id === "PROC_023" && point.fix === "OPSER" ? "OPSER (FAF)"
          : procedure.id === "PROC_023" && point.fix === "ISIMU" ? "ISIMU (MAHF)"
          : procedure.id === "PROC_024" && point.fix === "LOMEN" ? "LOMEN (IAF)"
          : procedure.id === "PROC_024" && point.fix === "LUTPO" ? "LUTPO (IF)"
          : procedure.id === "PROC_024" && point.fix === "OPSER" ? "OPSER (FAF)"
          : procedure.id === "PROC_024" && point.fix === "ISIMU" ? "ISIMU (MAHF)"
          : procedure.id === "PROC_025" && point.fix === "UTKUG" ? "UTKUG (IAF)"
          : procedure.id === "PROC_025" && point.fix === "ETIKO" ? "ETIKO (IF)"
          : procedure.id === "PROC_025" && point.fix === "VUSNI" ? "VUSNI (FAF)"
          : procedure.id === "PROC_025" && point.fix === "ISIMU" ? "ISIMU (MAHF)"
          : procedure.id === "PROC_026" && point.fix === "UTKUG" ? "UTKUG (IAF)"
          : procedure.id === "PROC_026" && point.fix === "ETIKO" ? "ETIKO (IF)"
          : procedure.id === "PROC_026" && point.fix === "VUSNI" ? "VUSNI (FAF)"
          : procedure.id === "PROC_026" && point.fix === "ISIMU" ? "ISIMU (MAHF)"
          : procedure.id === "PROC_027" && point.fix === "LOMEN" ? "LOMEN (IAF)"
          : procedure.id === "PROC_027" && point.fix === "VUSMU" ? "VUSMU (IF)"
          : procedure.id === "PROC_027" && point.fix === "OPSER" ? "OPSER (FAF)"
          : procedure.id === "PROC_028" && point.fix === "LOMEN" ? "LOMEN (IAF)"
          : procedure.id === "PROC_028" && point.fix === "LUTPO" ? "LUTPO (IF)"
          : procedure.id === "PROC_028" && point.fix === "OPSER" ? "OPSER (FAF)"
          : procedure.id === "PROC_028" && point.fix === "ISIMU" ? "ISIMU (MAHF)"
          : procedure.id === "PROC_029" && point.fix === "LOMEN" ? "LOMEN (IAF)"
          : procedure.id === "PROC_029" && point.fix === "LUTPO" ? "LUTPO (IF)"
          : procedure.id === "PROC_029" && point.fix === "OPSER" ? "OPSER (FAF)"
          : procedure.id === "PROC_029" && point.fix === "ISIMU" ? "ISIMU (MAHF)"
          : procedure.id === "PROC_030" && point.fix === "LOMEN" ? "LOMEN (IAF)"
          : procedure.id === "PROC_030" && point.fix === "LUTPO" ? "LUTPO (IF)"
          : procedure.id === "PROC_030" && point.fix === "OPSER" ? "OPSER (FAF)"
          : procedure.id === "PROC_030" && point.fix === "ISIMU" ? "ISIMU (MAHF)"
          : procedure.id === "PROC_031" && point.fix === "UTKUG" ? "UTKUG (IAF)"
          : procedure.id === "PROC_031" && point.fix === "ETIKO" ? "ETIKO (IF)"
          : procedure.id === "PROC_031" && point.fix === "VUSNI" ? "VUSNI (FAF)"
          : procedure.id === "PROC_031" && point.fix === "ISIMU" ? "ISIMU (MAHF)"
          : procedure.id === "PROC_032" && point.fix === "UTKUG" ? "UTKUG (IAF)"
          : procedure.id === "PROC_032" && point.fix === "ETIKO" ? "ETIKO (IF)"
          : procedure.id === "PROC_032" && point.fix === "VUSNI" ? "VUSNI (FAF)"
          : procedure.id === "PROC_032" && point.fix === "ISIMU" ? "ISIMU (MAHF)"
          : point.fix,
        restrictionLabel: restriction?.published?.join(" / ") || "",
        type: restriction ? "level" : "fix",
        x: point.x,
        y: point.y,
        configurations: procedure.configurations,
        routeOnly: true,
        routeId: procedure.id,
        active: false
      });
      hotspotIds.push(hotspotId);
      hotspotIdByFix[point.fix] = hotspotId;
    }
    const className = procedure.type === "SID" ? "route-b" : procedure.type === "STAR" ? "route-a" : "route-procedure";
    const chartSequences = chartRouteSequences[procedure.id];
    data.routes[procedure.id] = chartSequences
      ? chartSequences.map(sequence => {
          const points = Array.isArray(sequence) ? sequence : sequence.points;
          if (!Array.isArray(sequence) && sequence.anchor) return {
            className: sequence.className || className,
            curve: sequence.curve || null,
            anchorHotspotId: sequence.anchor,
            offsets: sequence.offsets
          };
          if (!Array.isArray(sequence) && sequence.coordinates) return {
            className: sequence.className || className,
            curve: sequence.curve || null,
            points: sequence.coordinates
          };
          return {
            className: sequence.className || className,
            curve: sequence.curve || null,
            hotspotIds: points.map(item => item.startsWith("H_") ? item : hotspotIdByFix[item]).filter(Boolean)
          };
        })
      : [{ className, hotspotIds }];
  }
  window.APP_PROCEDURE_ROUTE_META = procedures.map(procedure => ({
    id: procedure.id,
    title: `${procedure.title} · ${procedure.airport}`,
    subtitle: `${procedure.type} · pista ${procedure.runways.join("/") || "consultar"} · ${procedure.calibrated ? "calibrada" : "ajustável"}`,
    configurations: procedure.configurations,
    procedure: true,
    calibrated: procedure.calibrated
  }));
})();
