(() => {
  "use strict";

  const ATCSMAC_URL = "https://aisweb.decea.mil.br/download/?apikey=1587263166&arquivo=03128b37-8b19-4c44-b20eaf543432dd09";
  const airports = [
    ["SBSP","São Paulo / Congonhas",-23.6261,-46.6564,"Aeródromo IFR"], ["SBMT","Campo de Marte",-23.5092,-46.6383,"Aeródromo / VFR"],
    ["SBGR","Guarulhos",-23.4356,-46.4731,"Aeródromo IFR"], ["SBSJ","São José dos Campos",-23.2282,-45.8711,"Aeródromo IFR"],
    ["SBKP","Viracopos",-23.0074,-47.1345,"Aeródromo IFR"], ["SBJH","Catarina",-23.4286,-47.1347,"Aeródromo IFR"],
    ["SBJD","Jundiaí",-23.1807,-46.9439,"Aeródromo IFR / VFR"], ["SDAI","Americana",-22.7556,-47.2697,"Aeródromo VFR / IAC"], ["SDCO","Sorocaba",-23.4781,-47.4900,"Aeródromo VFR / IAC"]
  ].map(([id,name,lat,lon,type]) => ({id,name,lat,lon,type,source:"Posição de referência geográfica; confirme ARP, pista e operação na AIS/AIP vigente."}));
  const targetAirports = new Set(["SBSP","SBGR","SBKP","SBSJ","SBJH","SBJD","SDCO"]);
  const primaryTmaAirports = ["SBSP","SBGR","SBKP"];
  const procedureRunwayGroups = {
    SBSP:[{id:"17R/35L",label:"17R / 35L",runways:["17","17R","35L"]},{id:"17L/35R",label:"17L / 35R",runways:["17L","35","35R"]}],
    SBGR:[{id:"10L/28R",label:"10L / 28R",runways:["10","10L","28R"]},{id:"10R/28L",label:"10R / 28L",runways:["10R","28","28L"]}],
    SBKP:[{id:"15",label:"15",runways:["15"]},{id:"33",label:"33",runways:["33"]}]
  };
  const routeSequences = {
    PROC_001:[["KOMGU","SP048"],["LUVDI","SP048"],["SP048","SP049"]],
    PROC_002:[["KOMGU","GERSU"],["LUVDI","GERSU"],["GERSU","URUTA","SBSP"]],
    PROC_003:[["SP003","SP131","SP132","SP078","SBSP"]],
    PROC_009:[["SBSP","SP102","BAIAN","SP103","ISOXO","ORIMU","VUMEV","NUXEL"],["BAIAN","UREMI"],["BAIAN","NIBRU"]],
    PROC_010:[["SBSP","SP053","SP081","SP066","SP039","SP038","XOGOD","UMRAR","UBRAM"],["UBRAM","ASETA"],["UBRAM","EGEVA"]],
    PROC_011:[["SBSP","SP104","SP106","UTKOM","SP084","SP086","UGTIX","SP087","SP088","GERTU"],["UGTIX","LESSA","ASETA"],["UGTIX","LESSA","EGEVA"],["UGTIX","LESSA","VURDU"]],
    PROC_012:[["SBSP","SP104","SP106","UTKOM"],["UTKOM","SOVSI"],["UTKOM","NIBGA"],["UTKOM","UBSOD"],["UTKOM","MADNI"]],
    PROC_013:[["SBSP","SP107","VUNVU","SP108","BAIAN","SP103","ISOXO","ORIMU","VUMEV","NUXEL"],["BAIAN","UREMI"],["BAIAN","NIBRU"]],
    PROC_014:[["SBSP","SP082","SP083","SEDLO"],["SEDLO","SOVSI"],["SEDLO","NIBGA"],["SEDLO","UBSOD"],["SEDLO","MADNI"]],
    PROC_015:[["SBSP","SP074","SP079","SP038","XOGOD","UMRAR","UBRAM"],["UBRAM","ASETA"],["UBRAM","EGEVA"]],
    PROC_016:[["SBSP","SP082","SP083","SEDLO","SP084","SP086","UGTIX","SP087","SP088","GERTU"],["UGTIX","LESSA","ASETA"],["UGTIX","LESSA","EGEVA"],["UGTIX","LESSA","VURDU"]],
    PROC_018:[["IBDAL","MANLO","SP033","OGTAL","SP099","SP101","SP032","KOMGU"],["ANISE","SP091","SP111","OGTAL"]],
    PROC_020:[["ANISE","SP091","SP111","OGTAL"]], PROC_021:[["IBDAL","MANLO","SP033","ESUNI"]],
    PROC_022:[["UTLOT","RUSTE","ORESU","PRUMO","IROPU","KOMGU","SP098","OGTAL"],["ENTIT","OTAGA","NEKIG","MAVKA","SP031","ORESU"]],
    PROC_023:[["LOMEN","GR202","LUTPO","OPSER","SBGR"]], PROC_024:[["LOMEN","GR202","LUTPO","OPSER","SBGR"]],
    PROC_025:[["UTKUG","ETIKO","VUSNI","SBGR"]], PROC_026:[["UTKUG","ETIKO","VUSNI","SBGR"]],
    PROC_027:[["LOMEN","VUSMU","LUTPO","OPSER","SBGR"]], PROC_028:[["LOMEN","GR202","LUTPO","OPSER","SBGR"]],
    PROC_029:[["LOMEN","GR202","LUTPO","OPSER","SBGR"]], PROC_030:[["LOMEN","GR202","LUTPO","OPSER","SBGR"]],
    PROC_031:[["UTKUG","ETIKO","VUSNI","SBGR"]], PROC_032:[["UTKUG","ETIKO","VUSNI","SBGR"]],
    PROC_033:[["SBGR","AMVUL","GR222","GR217","GR321","VUMEV","NUXEL"],["GR321","GR223","GR224","ORONU","GERKA","GERTU"],["ORONU","ISMOB"]],
    PROC_034:[["SBGR","AMVUL","GR027","EKOPO","UREMI"],["EKOPO","NIBRU"]],
    PROC_035:[["SBGR","AMVUL","GR027","GR209","GR212","CGO","ZORZA"],["ZORZA","GR214","GR216","LESSA","EGEVA"],["ZORZA","GR214","GR216","LESSA","ASETA"],["ZORZA","SOVSI"],["ZORZA","UBSOD"],["ZORZA","MADNI"]],
    PROC_036:[["SBGR","GR317","GR319","UGIKI","GR212","CGO","ZORZA","GR214","GR216","LESSA","EGEVA"],["LESSA","ASETA"],["ZORZA","SOVSI"],["ZORZA","UBSOD"],["ZORZA","MADNI"]],
    PROC_037:[["SBGR","GR209","EKOPO","NIBRU"],["EKOPO","UREMI"]], PROC_038:[["SBGR","GR209","EKOPO","UREMI"]]
  };

  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[char]);
  const index = new Map(), selected = new Map(), active = new Map(), operational = new Map(), selectionMarkers = new Map();
  const allProcedures = (window.APP_PROCEDURE_ROUTES || []).filter(item => targetAirports.has(item.airport)).map(item => ({...item, airport:item.airport === "SBAM" ? "SDAI" : item.airport}));
  let spWaypoints = [], labelsVisible = true;

  if (!window.L) { $("#map").innerHTML = '<div class="panel-placeholder">Não foi possível carregar o mapa. Recarregue com conexão ativa.</div>'; return; }
  const map = L.map("map", {zoomControl:false,minZoom:7,maxZoom:14,preferCanvas:true}).setView([-23.45,-46.95],8);
  const base = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"&copy; OpenStreetMap contributors"}).addTo(map);
  const airportsLayer=L.layerGroup().addTo(map), selectionLayer=L.layerGroup().addTo(map), proceduresLayer=L.layerGroup().addTo(map), tmaLayer=L.layerGroup().addTo(map);
  const color = procedure => procedure.type === "SID" ? "#ffb347" : procedure.type === "STAR" ? "#75e36d" : /RNP|RNAV/i.test(procedure.title||"") ? "#bc8cff" : /ILS|LOC/i.test(procedure.title||"") ? "#39c8ff" : "#e86d9f";
  const resolve = id => index.get(String(id).replace(/^H_/,"")) || null;

  function airportIcon(item) { return L.divIcon({className:"",iconSize:[1,1],iconAnchor:[0,0],html:`<div class="airport-marker"><i></i><span>${esc(item.id)}</span></div>`}); }
  function renderAirports() { airports.forEach(item => L.marker([item.lat,item.lon],{icon:airportIcon(item)}).on("click",()=>choosePoint(item)).addTo(airportsLayer)); }
  function details(item, kind="FIX") {
    const coord=Number.isFinite(item.lat)?`<div class="info-row"><span class="info-label">Posição</span><span>${item.lat.toFixed(4)}, ${item.lon.toFixed(4)}</span></div>`:"";
    $("#details-content").innerHTML=`<div class="panel-header"><h3>${esc(item.id || item.name)}</h3><p class="subtitle">${esc(kind)}</p></div><div class="panel-body"><div class="info-row"><span class="info-label">Nome</span><b>${esc(item.name || item.id)}</b></div>${coord}<div class="info-row"><span class="info-label">Tipo</span><span>${esc(item.type || kind)}</span></div><div class="source-tag"><b>Fonte / situação:</b><br>${esc(item.source || "Verificar carta e AIS/AIP vigente.")}</div></div>`;
  }
  function choosePoint(item) {
    selected.set(item.id,item); const previous=selectionMarkers.get(item.id); if(previous) selectionLayer.removeLayer(previous);
    selectionMarkers.set(item.id,L.circleMarker([item.lat,item.lon],{radius:10,color:"#fff",weight:2,fillColor:"#2196f3",fillOpacity:.8}).addTo(selectionLayer));
    renderSelected(); details(item,item.type || "FIX"); map.flyTo([item.lat,item.lon],10,{duration:.35});
  }
  function renderSelected() {
    const node=$("#selected-points"); if(!selected.size){node.innerHTML='<span class="empty-selection">Nenhum ponto selecionado.</span>'; return;}
    node.innerHTML=[...selected.values()].map(item=>`<div class="selected-point-row"><span><b>${esc(item.id)}</b><br><small>${esc(item.name || item.type || "FIX")}</small></span><button data-remove="${esc(item.id)}">Remover</button></div>`).join("");
    node.querySelectorAll("[data-remove]").forEach(button=>button.onclick=()=>{const id=button.dataset.remove; selected.delete(id); const marker=selectionMarkers.get(id); if(marker) selectionLayer.removeLayer(marker); selectionMarkers.delete(id); renderSelected();});
  }
  function buildSearch() {
    const input=$("#search-input"), box=$("#suggestions-box");
    input.addEventListener("input",()=>{const q=input.value.trim().toLowerCase(); if(!q){box.style.display="none";return;} const hits=[...airports,...spWaypoints].filter(item=>`${item.id} ${item.name||""}`.toLowerCase().includes(q)).slice(0,12); box.innerHTML=hits.map(item=>`<button class="suggestion-item" data-point="${esc(item.id)}"><span><b>${esc(item.id)}</b> — ${esc(item.name || item.type || "FIX")}</span><span class="coord-tag">${item.lat.toFixed(2)}, ${item.lon.toFixed(2)}</span></button>`).join("");box.style.display=hits.length?"block":"none";box.querySelectorAll("[data-point]").forEach(button=>button.onclick=()=>{const item=resolve(button.dataset.point);if(item){input.value=item.id;box.style.display="none";choosePoint(item);}});});
    document.addEventListener("click",event=>{if(!event.target.closest(".search-container"))box.style.display="none";});
  }
  function currentProcedureAirport() { return $("#procedure-airport")?.value || "SBSP"; }
  function currentProcedureRunway() { return $("#procedure-runway")?.value || procedureRunwayGroups[currentProcedureAirport()][0].id; }
  function currentProcedureType() { return $("#procedure-type")?.value || "STAR"; }
  function procedureMatchesSelectedRunway(procedure, airport=currentProcedureAirport(), runwayId=currentProcedureRunway()) {
    const group=(procedureRunwayGroups[airport]||[]).find(item=>item.id===runwayId);
    return Boolean(group) && (procedure.runways||[]).some(runway=>group.runways.includes(String(runway)));
  }
  function matchingProcedureSelection() {
    const airport=currentProcedureAirport(), type=currentProcedureType();
    return allProcedures.filter(item=>item.airport===airport && item.type===type && procedureMatchesSelectedRunway(item));
  }
  function renderProcedureRunways() {
    const airport=currentProcedureAirport(), options=procedureRunwayGroups[airport]||[], selected=$("#procedure-runway");
    if(!options.some(option=>option.id===selected.value)) selected.value=options[0]?.id||"";
    const container=$("#procedure-runway-options");
    container.innerHTML=options.map(option=>`<button type="button" class="procedure-choice ${option.id===selected.value?"is-active":""}" data-procedure-runway="${esc(option.id)}" aria-pressed="${option.id===selected.value}">${esc(option.label)}</button>`).join("");
    container.querySelectorAll("[data-procedure-runway]").forEach(button=>button.onclick=()=>{selected.value=button.dataset.procedureRunway;renderProcedureRunways();optionsProcedure();});
  }
  function setProcedureAirport(airport) {
    if(!primaryTmaAirports.includes(airport)) return;
    $("#procedure-airport").value=airport;
    document.querySelectorAll("[data-procedure-airport]").forEach(button=>{const active=button.dataset.procedureAirport===airport;button.classList.toggle("is-active",active);button.setAttribute("aria-pressed",String(active));});
    renderProcedureRunways();optionsProcedure();
  }
  function setProcedureType(type) {
    $("#procedure-type").value=type;
    document.querySelectorAll("[data-procedure-type]").forEach(button=>{const active=button.dataset.procedureType===type;button.classList.toggle("is-active",active);button.setAttribute("aria-pressed",String(active));});
    optionsProcedure();
  }
  function optionsProcedure() {
    const select=$("#procedure-select"), transition=$("#procedure-transition"), previous=select.value;
    const list=matchingProcedureSelection(); select.innerHTML=list.length?list.map(item=>`<option value="${item.id}">${esc(item.title)}</option>`).join(""):'<option value="">Nenhuma carta compatível</option>';
    if(list.some(item=>item.id===previous)) select.value=previous;
    const procedure=list.find(item=>item.id===select.value)||list[0]; const sequences=routeSequences[procedure?.id] || [];
    transition.innerHTML=sequences.length?sequences.map((_,n)=>`<option value="${n}">Trajeto ${n+1}</option>`).join(""):'<option value="-1">Sequência a confirmar</option>';
    $("#add-procedure").disabled=!procedure;
    updateTerminalPanel();
  }

  function terminalViewMarkup(view, airportId, type, count) {
    const airport = airports.find(item=>item.id===airportId);
    const airportName = airport?.name || airportId;
    if (view === "flow") return `<p><strong>Fluxo em foco: ${esc(airportId)}.</strong> ${count} carta(s) ${esc(type)} catalogada(s) para ${esc(airportName)}. As rotas só são desenhadas quando a sequência fixo por fixo foi confirmada; o sistema não inventa ligações.</p>`;
    if (view === "study") return `<p><strong>Roteiro de estudo.</strong> Selecione aeródromo, tipo e carta; adicione a camada e clique nos fixos para consultar a referência. Em seguida, use a ATCSMAC como apoio de contexto, sempre confrontando com a publicação vigente.</p>`;
    return `<p><strong>Comece pelo aeródromo e pela carta.</strong> Use os controles à direita para selecionar uma SID, STAR ou IAC; a camada é desenhada apenas quando a sequência confirmada está disponível.</p>`;
  }

  function updateTerminalPanel() {
    const airportId = currentProcedureAirport();
    const type = currentProcedureType();
    const count = matchingProcedureSelection().length;
    const airport = airports.find(item=>item.id===airportId);
    const focusAirport = $("#terminal-airport"), focusCount = $("#terminal-procedure-count"), focusMode = $("#terminal-mode"), content = $("#terminal-view-content");
    if (focusAirport) focusAirport.textContent = airport ? `${airport.id} · ${airport.name}` : airportId;
    if (focusCount) focusCount.textContent = String(count);
    if (focusMode) focusMode.textContent = type;
    if (content) {
      const activeTab = document.querySelector(".terminal-tab.is-active")?.dataset.terminalView || "overview";
      content.innerHTML = terminalViewMarkup(activeTab, airportId, type, count);
    }
  }

  function setupTerminalPanel() {
    const panel=$("#terminal-panel"), toggle=$("#terminal-panel-toggle");
    if (!panel || !toggle) return;
    toggle.onclick=()=>{const collapsed=panel.classList.toggle("is-collapsed");toggle.setAttribute("aria-expanded",String(!collapsed));};
    document.querySelectorAll(".terminal-tab").forEach(button=>button.onclick=()=>{document.querySelectorAll(".terminal-tab").forEach(item=>item.classList.toggle("is-active",item===button));updateTerminalPanel();});
    document.querySelectorAll("[data-jump]").forEach(button=>button.onclick=()=>{
      const destination=button.dataset.jump;
      document.querySelectorAll(".app-nav-button").forEach(item=>item.classList.toggle("is-active",item.dataset.jump===destination));
      const operationalPanel=$("#operational-layout");
      operationalPanel.hidden=destination!=="operational";
      setTerminalWorkspace(destination==="terminal");
      if(destination==="terminal"){updateTerminalWorkspace();return;}
      if(destination==="map"){map.flyTo([-23.45,-46.95],8,{duration:.35});return;}
      if(destination==="operational"){panel.classList.remove("is-collapsed");toggle.setAttribute("aria-expanded","true");renderOperationalConfiguration();updateLayoutStatus();return;}
      const target=destination==="procedures" ? $("#procedures-section") : $("#atcsmac-section");
      target?.scrollIntoView({behavior:"smooth",block:"start"});
      if(destination==="atcsmac") showAtcsmac();
    });
    updateTerminalPanel();
  }

  const procedureCategory = procedure => procedure.type === "SID" ? "SID" : procedure.type === "STAR" ? "STAR" : /RNP|RNAV/i.test(procedure.title||"") ? "RNP" : /ILS|LOC/i.test(procedure.title||"") ? "ILS" : "IAC";
  function currentTmaConfiguration() {
    const sp=$("#layout-runway-sbsp")?.value || "17";
    const gr=$("#layout-runway-sbgr")?.value || "10";
    const kp=$("#layout-runway-sbkp")?.value || "15";
    return {sp,gr,kp,code:`SP${sp}_GR${gr}_KP${kp}`,display:`SP${sp} · GR${gr} · KP${kp}`};
  }
  function procedureMatchesRunway(procedure, configuration) {
    const runway = {SBSP:configuration.sp,SBGR:configuration.gr,SBKP:configuration.kp}[procedure.airport];
    return Boolean(runway) && (procedure.runways||[]).some(item=>String(item).startsWith(String(runway)));
  }
  function renderOperationalConfiguration() {
    const code=$("#layout-config-code");
    if(code) code.textContent=currentTmaConfiguration().display;
  }
  function selectedLayoutTypes() { return new Set([...document.querySelectorAll(".layout-type-filter:checked")].map(input=>input.value)); }
  function matchingOperationalProcedures() {
    const configuration=currentTmaConfiguration(), types=selectedLayoutTypes();
    return allProcedures.filter(procedure=>{
      if(!primaryTmaAirports.includes(procedure.airport) || !types.has(procedureCategory(procedure))) return false;
      if((procedure.configurations||[]).includes(configuration.code)) return true;
      return !(procedure.configurations||[]).length && procedureMatchesRunway(procedure,configuration);
    });
  }
  function updateLayoutStatus() {
    const status=$("#layout-status"); if(!status)return;
    const procedures=matchingOperationalProcedures(), confirmed=procedures.reduce((total,procedure)=>total+(routeSequences[procedure.id]||[]).length,0);
    const configuration=currentTmaConfiguration();
    renderOperationalConfiguration();
    status.textContent=`${configuration.display} · ${procedures.length} carta(s) selecionada(s) · ${confirmed} trajetória(s) com sequência confirmada.`;
  }
  function applyOperationalLayout() {
    operational.clear();
    if(!$("#layout-enabled").checked){rebuildRoutes();$("#layout-status").textContent="Camadas operacionais ocultadas.";return;}
    let rendered=0;
    matchingOperationalProcedures().forEach(procedure=>(routeSequences[procedure.id]||[]).forEach((_,sequenceNo)=>{operational.set(`operational:${procedure.id}:${sequenceNo}`,{procedure,sequenceNo});rendered++;}));
    rebuildRoutes();
    const configuration=currentTmaConfiguration();
    $("#layout-status").textContent=rendered ? `${configuration.display} · ${rendered} trajetória(s) confirmada(s) aplicada(s) ao mapa.` : `${configuration.display} · nenhuma trajetória confirmada corresponde à configuração atual; as cartas continuam disponíveis na biblioteca.`;
  }
  function setTerminalWorkspace(active) {
    const workspace=$("#terminal-workspace");
    if(!workspace) return;
    workspace.hidden=!active;
    $("#app-layout").classList.toggle("terminal-mode",active);
    window.setTimeout(()=>map.invalidateSize(),80);
  }
  function updateTerminalWorkspace() {
    const configuration=currentTmaConfiguration();
    const compact=`${configuration.sp} · ${configuration.gr} · ${configuration.kp}`;
    const label=$("#terminal-config-label"), status=$("#terminal-config-status");
    if(label) label.textContent=compact;
    if(status) status.textContent=`SBSP ${configuration.sp} · SBGR ${configuration.gr} · SBKP ${configuration.kp}`;
    document.querySelectorAll("[data-terminal-configuration]").forEach(button=>{
      const active=button.dataset.terminalConfiguration===`${configuration.sp}-${configuration.gr}-${configuration.kp}`;
      button.classList.toggle("is-active",active);
      button.setAttribute("aria-pressed",String(active));
    });
  }
  function setupTerminalWorkspace() {
    $("#close-terminal-workspace").onclick=()=>{
      setTerminalWorkspace(false);
      document.querySelectorAll(".app-nav-button").forEach(item=>item.classList.toggle("is-active",item.dataset.jump==="map"));
      map.flyTo([-23.45,-46.95],8,{duration:.35});
    };
    document.querySelectorAll("[data-terminal-configuration]").forEach(button=>button.onclick=()=>{
      const [sp,gr,kp]=button.dataset.terminalConfiguration.split("-");
      $("#layout-runway-sbsp").value=sp;
      $("#layout-runway-sbgr").value=gr;
      $("#layout-runway-sbkp").value=kp;
      $("#layout-enabled").checked=true;
      renderOperationalConfiguration();
      applyOperationalLayout();
      updateTerminalWorkspace();
    });
    updateTerminalWorkspace();
  }
  function setupOperationalLayout() {
    const airport=$("#layout-airport"); if(!airport)return;
    airport.innerHTML=primaryTmaAirports.map(id=>{const item=airports.find(entry=>entry.id===id);return `<option value="${id}">${id} — ${esc(item?.name||id)}</option>`;}).join("");
    airport.onchange=()=>{setProcedureAirport(airport.value);updateLayoutStatus();};
    ["#layout-runway-sbsp","#layout-runway-sbgr","#layout-runway-sbkp"].forEach(selector=>{
      const control=$(selector); if(control) control.onchange=()=>{renderOperationalConfiguration();updateLayoutStatus();};
    });
    document.querySelectorAll(".layout-type-filter").forEach(input=>input.onchange=updateLayoutStatus);
    $("#layout-enabled").onchange=()=>{if(!$("#layout-enabled").checked){operational.clear();rebuildRoutes();}updateLayoutStatus();};
    $("#layout-apply").onclick=applyOperationalLayout;
    $("#layout-clear").onclick=()=>{operational.clear();rebuildRoutes();$("#layout-status").textContent="Camadas do Mapa IFR removidas.";};
    renderOperationalConfiguration();updateLayoutStatus();
  }
  function setupProcedures() {
    document.querySelectorAll("[data-procedure-airport]").forEach(button=>button.onclick=()=>setProcedureAirport(button.dataset.procedureAirport));
    document.querySelectorAll("[data-procedure-type]").forEach(button=>button.onclick=()=>setProcedureType(button.dataset.procedureType));
    $("#procedure-select").addEventListener("change",optionsProcedure);
    $("#add-procedure").onclick=()=>{const p=allProcedures.find(item=>item.id===$("#procedure-select").value); const number=Number($("#procedure-transition").value); if(p) addProcedure(p,number);};
    renderProcedureRunways();optionsProcedure();
  }
  function addProcedure(procedure, sequenceNo) { active.set(`${procedure.id}:${sequenceNo}`,{procedure,sequenceNo}); rebuildRoutes(); renderActive(); showProcedure(procedure,sequenceNo); }
  function showProcedure(procedure, sequenceNo) {
    const sequence=(routeSequences[procedure.id] || [])[sequenceNo] || []; const missing=sequence.filter(id=>!resolve(id));
    const status=sequence.length ? (missing.length?`<div class="notice"><b>Traçado parcial.</b><br>Faltam coordenadas no índice para: ${esc(missing.join(", "))}. O sistema não une linhas através desses pontos.</div>`:`<div class="source-tag"><b>Traçado geográfico:</b><br>Sequência confirmada fixo por fixo no catálogo de rota.</div>`) : `<div class="notice"><b>Sequência ainda não confirmada.</b><br>Esta carta está disponível por aeródromo/pista, mas o novo mapa não exibirá linha até receber a ordem de pernas extraída da carta.</div>`;
    $("#details-content").innerHTML=`<div class="panel-header"><h3>${esc(procedure.title)}</h3><p class="subtitle">${esc(procedure.type)} · pista ${esc(procedure.runways.join("/"))}</p></div><div class="panel-body"><div class="info-row"><span class="info-label">Camada</span><b>${sequence.length?`Trajeto ${sequenceNo+1}`:"Aguardando sequência"}</b></div><div class="info-row"><span class="info-label">Fixos</span><span>${esc(sequence.join(" → ") || procedure.points.map(point=>point.fix).join(", ") || "Consultar carta")}</span></div>${status}<div class="source-tag"><b>Fonte:</b><br>Carta AIS catalogada no acervo local. Valide a versão vigente antes do uso operacional.</div></div>`;
  }
  function rebuildRoutes() {
    proceduresLayer.clearLayers();
    new Map([...operational,...active]).forEach(({procedure,sequenceNo})=>{const sequence=(routeSequences[procedure.id] || [])[sequenceNo];if(!sequence)return;let part=[];const draw=()=>{if(part.length>1)L.polyline(part.map(p=>[p.lat,p.lon]),{color:color(procedure),weight:3,opacity:.9}).addTo(proceduresLayer);part=[];};sequence.forEach(id=>{const point=resolve(id);if(!point){draw();return;}part.push(point);L.circleMarker([point.lat,point.lon],{radius:5,color:"#fff",weight:1.5,fillColor:color(procedure),fillOpacity:.95}).bindTooltip(point.id,{permanent:labelsVisible,direction:"top",className:"procedure-label"}).on("click",()=>choosePoint(point)).addTo(proceduresLayer);});draw();});
  }
  function renderActive() {
    const node=$("#active-procedures");if(!active.size){node.innerHTML='<span class="empty-selection">Nenhuma camada ativa.</span>';return;}node.innerHTML=[...active.entries()].map(([key,{procedure,sequenceNo}])=>`<div class="selected-point-row"><span><b>${esc(procedure.title)}</b><br><small>${sequenceNo>=0?`Trajeto ${sequenceNo+1}`:"Sequência pendente"}</small></span><button data-route="${esc(key)}">Remover</button></div>`).join("");node.querySelectorAll("[data-route]").forEach(button=>button.onclick=()=>{active.delete(button.dataset.route);rebuildRoutes();renderActive();});
  }
  function drawTmas(tmas) { tmaLayer.clearLayers();tmas.filter(item=>/^TMA São Paulo/i.test(item.name||"")).forEach((item,n)=>{const coords=(item.coordinates_decimal||[]).map(p=>[Number(p.latitude),Number(p.longitude)]).filter(p=>Number.isFinite(p[0])&&Number.isFinite(p[1]));if(coords.length<3)return;const polygon=L.polygon(coords,{color:["#00d9ff","#b990ff","#ffc857"][n%3],weight:2,dashArray:"6 5",fillOpacity:.05}).bindTooltip(`${item.name} · ${item.lower_limit}–${item.upper_limit}`,{sticky:true});polygon.on("click",()=>details({id:item.name,name:"Limite de espaço aéreo",type:`${item.airspace_class||"TMA"} · ${item.lower_limit||"—"} a ${item.upper_limit||"—"}`,source:item.source||"AIP Brasil — acervo de geometria."},"TMA / contexto ATCSMAC"));polygon.addTo(tmaLayer);}); }
  function showAtcsmac() {if(!map.hasLayer(tmaLayer))tmaLayer.addTo(map);$("#details-content").innerHTML=`<div class="panel-header atc-header"><h3>ATCSMAC · TMA São Paulo</h3><p class="subtitle">Altitude mínima de vigilância ATC</p></div><div class="panel-body"><p>A carta ATCSMAC serve para conferir altitude/nível atribuído sob vigilância ATC. Ela não substitui as restrições de uma SID, STAR ou IAC, nem uma autorização.</p><div class="source-tag"><b>No mapa</b><br>As áreas da TMA são mostradas como contexto. As altitudes por célula, FAVA e notas devem ser consultadas diretamente na carta oficial.</div><a class="action-btn atc-link" href="${ATCSMAC_URL}" target="_blank" rel="noreferrer">Abrir ATCSMAC oficial da TMA São Paulo</a></div>`;}
  async function loadData() {try {const [wp,tma]=await Promise.all([fetch("data/waypoints.json"),fetch("data/tmas.json")]);if(!wp.ok||!tma.ok)throw Error();const raw=await wp.json(), used=new Set(airports.map(p=>p.id));spWaypoints=(raw.features||[]).map(f=>f.properties||{}).filter(p=>{const id=String(p.ident||"").trim(),lat=Number(p.latitude),lon=Number(p.longitude);return id&&Number.isFinite(lat)&&Number.isFinite(lon)&&lat>=-24.8&&lat<=-21.9&&lon>=-48.5&&lon<=-45.2&&!used.has(id);}).map(p=>({id:String(p.ident).trim(),name:String(p.ident).trim(),lat:Number(p.latitude),lon:Number(p.longitude),type:p.tipo||"FIX",source:"Índice de waypoints do acervo enviado; confirme AIS/AIP e carta vigente."})).filter(p=>{if(used.has(p.id))return false;used.add(p.id);return true;});[...airports,...spWaypoints].forEach(p=>index.set(p.id,p));drawTmas((await tma.json()).tmas||[]);rebuildRoutes();}catch(error){console.warn(error);$("#details-content").innerHTML='<div class="panel-placeholder"><p>Mapa aberto, mas os dados locais não carregaram. Confirme que o servidor local está ativo e recarregue.</p></div>';}}

  $("#recenter").onclick=()=>map.flyTo([-23.45,-46.95],8,{duration:.5});
  $("#toggleLabels").onclick=()=>{labelsVisible=!labelsVisible;document.querySelectorAll(".airport-marker span").forEach(el=>el.style.display=labelsVisible?"":"none");rebuildRoutes();};
  $("#toggleAtcsmac").onclick=showAtcsmac; $("#openAtcsmac").onclick=showAtcsmac;
  renderAirports(); buildSearch(); setupProcedures(); setupOperationalLayout(); setupTerminalWorkspace(); setupTerminalPanel(); loadData(); L.control.zoom({position:"bottomleft"}).addTo(map);L.control.layers({"OpenStreetMap":base},{"Aeródromos":airportsLayer,"Pontos selecionados":selectionLayer,"Procedimentos por pista":proceduresLayer,"TMA São Paulo · contexto ATCSMAC":tmaLayer},{position:"topright",collapsed:true}).addTo(map);
})();
