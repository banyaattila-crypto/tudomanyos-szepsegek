// ===== EDITOR LOGIC =====
(function() {
  var DOMAIN_KEYS = ['matek','fizika','informatika'];
  var DOMAIN_LABELS = {matek:'Matek',fizika:'Fizika',informatika:'Info'};
  var currentDomain = 'matek';
  var currentEntryIdx = -1;
  var filterText = '';

  var toggle = document.getElementById('editorToggle');
  var panel = document.getElementById('editorPanel');
  var listEl = document.getElementById('editorList');
  var formEl = document.getElementById('editorForm');
  var actionsEl = document.getElementById('editorActions');
  var searchInput = document.getElementById('editorSearch');
  var statusText = document.getElementById('editorStatusText');
  var onlineStatus = document.getElementById('editorOnlineStatus');
  var toast = document.getElementById('editorToast');

  function esc(s) {
    return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;').replace(/>/g,'&gt;');
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function(){ toast.classList.remove('show'); }, 2000);
  }

  function getData() {
    return {matek:MATEK_DATA,fizika:FIZIKA_DATA,informatika:INFORMATIKA_DATA}[currentDomain];
  }

  function waitForData() {
    return new Promise(function(resolve) {
      if (typeof MATEK_DATA !== 'undefined' && MATEK_DATA.length > 0) { resolve(); return; }
      var tries = 0;
      var iv = setInterval(function() {
        tries++;
        if ((typeof MATEK_DATA !== 'undefined' && MATEK_DATA.length > 0) || tries > 50) {
          clearInterval(iv);
          resolve();
        }
      }, 200);
    });
  }

  function renderList() {
    var data = getData();
    var query = filterText.toLowerCase();
    listEl.innerHTML = '';
    data.forEach(function(entry, idx) {
      if (query && entry.name.toLowerCase().indexOf(query) < 0 &&
          entry.tag.toLowerCase().indexOf(query) < 0 &&
          entry.category.toLowerCase().indexOf(query) < 0) return;
      var div = document.createElement('div');
      div.className = 'editor-entry' + (idx === currentEntryIdx ? ' active' : '');
      div.innerHTML = '<span class="editor-entry-name">' + esc(entry.name) + '</span>' +
        '<span class="editor-entry-year">' + (entry.year || '?') + '</span>';
      div.addEventListener('click', function() { selectEntry(idx); });
      listEl.appendChild(div);
    });
  }

  function selectEntry(idx) {
    currentEntryIdx = idx;
    renderList();
    renderForm();
  }

  function renderForm() {
    var data = getData();
    var entry = currentEntryIdx >= 0 ? data[currentEntryIdx] : null;

    if (!entry) { formEl.style.display = 'none'; actionsEl.style.display = 'none'; return; }
    formEl.style.display = 'block';
    actionsEl.style.display = 'flex';

    var html = '';
    html += '<label>Név</label><input id="ef_name" value="' + esc(entry.name) + '">';
    html += '<label>Címke</label><input id="ef_tag" value="' + esc(entry.tag) + '">';
    html += '<label>Kategória</label><input id="ef_category" value="' + esc(entry.category) + '">';
    html += '<div class="field-row"><div><label>Év</label><input id="ef_year" type="number" value="' + (entry.year||'') + '"></div>';
    html += '<div><label>Illustration</label><select id="ef_illus">';
    ['wave','lattice','graph','spiral'].forEach(function(v) {
      html += '<option value="' + v + '"' + (entry.illustration===v?' selected':'') + '>' + v + '</option>';
    });
    html += '</select></div></div>';
    html += '<label>Wiki URL</label><input id="ef_wiki" value="' + esc(entry.wiki||'') + '">';
    html += '<label>TeX / Képlet</label><textarea id="ef_tex">' + esc(entry.tex||'') + '</textarea>';
    html += '<label>Miért szép? (why)</label><textarea id="ef_why">' + esc(entry.why||'') + '</textarea>';
    html += '<label>Bővebb (whyMore)</label><textarea id="ef_whyMore">' + esc(entry.whyMore||'') + '</textarea>';
    if (entry.badge) html += '<label>Badge</label><input id="ef_badge" value="' + esc(entry.badge) + '">';
    if (entry.type) html += '<label>Type</label><input id="ef_type" value="' + esc(entry.type) + '">';
    if (entry.pairs) html += '<label>Pairs (JSON)</label><textarea id="ef_pairs">' + esc(JSON.stringify(entry.pairs)) + '</textarea>';
    if (entry.equations) html += '<label>Equations (JSON)</label><textarea id="ef_equations">' + esc(JSON.stringify(entry.equations)) + '</textarea>';
    if (entry.special !== undefined) html += '<label><input type="checkbox" id="ef_special"' + (entry.special?' checked':'') + '> special</label>';
    if (entry.mega !== undefined) html += '<label><input type="checkbox" id="ef_mega"' + (entry.mega?' checked':'') + '> mega</label>';
    if (entry.scrollHint !== undefined) html += '<label><input type="checkbox" id="ef_scrollHint"' + (entry.scrollHint?' checked':'') + '> scrollHint</label>';
    if (entry.quote) html += '<label>Quote</label><input id="ef_quote" value="' + esc(entry.quote) + '">';
    if (entry.derived) html += '<label>Derived</label><input id="ef_derived" value="' + esc(entry.derived) + '">';

    formEl.innerHTML = html;
  }

  function readForm(entry) {
    entry.name = document.getElementById('ef_name').value;
    entry.tag = document.getElementById('ef_tag').value;
    entry.category = document.getElementById('ef_category').value;
    var y = document.getElementById('ef_year').value;
    entry.year = y ? parseInt(y) : null;
    entry.illustration = document.getElementById('ef_illus').value;
    entry.wiki = document.getElementById('ef_wiki').value;
    entry.tex = document.getElementById('ef_tex').value;
    entry.why = document.getElementById('ef_why').value;
    entry.whyMore = document.getElementById('ef_whyMore').value;
    var badge = document.getElementById('ef_badge');
    if (badge) entry.badge = badge.value;
    var type = document.getElementById('ef_type');
    if (type) entry.type = type.value;
    var pairs = document.getElementById('ef_pairs');
    if (pairs) { try { entry.pairs = JSON.parse(pairs.value); } catch(e) {} }
    var equations = document.getElementById('ef_equations');
    if (equations) { try { entry.equations = JSON.parse(equations.value); } catch(e) {} }
    var special = document.getElementById('ef_special');
    if (special) entry.special = special.checked;
    var mega = document.getElementById('ef_mega');
    if (mega) entry.mega = mega.checked;
    var scrollHint = document.getElementById('ef_scrollHint');
    if (scrollHint) entry.scrollHint = scrollHint.checked;
    var quote = document.getElementById('ef_quote');
    if (quote) entry.quote = quote.value;
    var derived = document.getElementById('ef_derived');
    if (derived) entry.derived = derived.value;
  }

  function saveEntry() {
    var data = getData();
    if (currentEntryIdx < 0) return;
    readForm(data[currentEntryIdx]);
    persistDomain(currentDomain);
    renderList();
    showToast('Mentve: ' + data[currentEntryIdx].name);
  }

  function addEntry() {
    var data = getData();
    var newEntry = { name:'Új tétel', tag:'', category:data[0]?data[0].category:'', year:null, tex:'', wiki:'', illustration:'wave', why:'', whyMore:'' };
    data.push(newEntry);
    currentEntryIdx = data.length - 1;
    persistDomain(currentDomain); // azonnal mentsük, hogy ne vesszen el bezárásnál
    renderList();
    renderForm();
    showToast('Új tétel hozzáadva');
  }

  function deleteEntry() {
    var data = getData();
    if (currentEntryIdx < 0) return;
    if (!confirm('Töröd: ' + data[currentEntryIdx].name + '?')) return;
    data.splice(currentEntryIdx, 1);
    currentEntryIdx = -1;
    persistDomain(currentDomain);
    renderList();
    renderForm();
    showToast('Törölve');
  }

  function persistDomain(domain) {
    try {
      var key = 'tsz_editor_' + domain;
      var arr = {matek:MATEK_DATA,fizika:FIZIKA_DATA,informatika:INFORMATIKA_DATA}[domain];
      localStorage.setItem(key, JSON.stringify(arr));
    } catch(e) {}
  }

  function exportJSON() {
    var domains = {matek:MATEK_DATA,fizika:FIZIKA_DATA,informatika:INFORMATIKA_DATA};
    Object.keys(domains).forEach(function(key) {
      var arr = domains[key];
      var blob = new Blob([JSON.stringify(arr, null, 2)], {type:'application/json'});
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'data/' + key + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
    showToast('JSON export letöltve');
  }

  function mergeEditorToData() {
    // Merge localStorage editor data back into main arrays (for offline edits)
    DOMAIN_KEYS.forEach(function(domain) {
      try {
        var saved = localStorage.getItem('tsz_editor_' + domain);
        if (saved) {
          var parsed = JSON.parse(saved);
          var target = {matek:MATEK_DATA,fizika:FIZIKA_DATA,informatika:INFORMATIKA_DATA}[domain];
          if (target && Array.isArray(parsed)) {
            if (parsed.length === target.length) {
              parsed.forEach(function(entry, idx) {
                target[idx] = entry;
              });
            } else {
              // Hossz-eltérés (hozzáadás/törlés a szerkesztőben): a mentett
              // állapot nyer, különben a felhasználó szerkesztése elveszne.
              target.length = 0;
              parsed.forEach(function(entry) { target.push(entry); });
            }
          }
        }
      } catch(e) {}
    });
  }

  // Events
  toggle.addEventListener('click', function() {
    panel.classList.toggle('open');
    toggle.textContent = panel.classList.contains('open') ? '✕' : '✏️';
  });
  document.querySelector('.editor-close').addEventListener('click', function() {
    panel.classList.remove('open');
    toggle.textContent = '✏️';
  });
  document.querySelectorAll('.editor-domain-tabs button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.editor-domain-tabs button').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentDomain = btn.dataset.domain;
      currentEntryIdx = -1;
      filterText = '';
      searchInput.value = '';
      renderList();
      renderForm();
    });
  });
  searchInput.addEventListener('input', function() {
    filterText = searchInput.value;
    renderList();
  });
  document.getElementById('editorSave').addEventListener('click', saveEntry);
  document.getElementById('editorAdd').addEventListener('click', addEntry);
  document.getElementById('editorDelete').addEventListener('click', deleteEntry);
  document.getElementById('editorExport').addEventListener('click', exportJSON);

  // Online/offline
  function updateOnline() {
    onlineStatus.textContent = navigator.onLine ? '🟢 Online' : '🔴 Offline';
    onlineStatus.className = navigator.onLine ? 'online' : 'offline';
    toggle.classList.toggle('offline', !navigator.onLine);
  }
  window.addEventListener('online', updateOnline);
  window.addEventListener('offline', updateOnline);
  updateOnline();

  // Init
  waitForData().then(function() {
    mergeEditorToData();
    statusText.textContent = 'OK — ' + DOMAIN_LABELS[currentDomain];
    statusText.className = 'online';
    renderList();
  }).catch(function() {
    statusText.textContent = 'Hiba: adat nem érhető el';
    statusText.className = 'offline';
  });
})();
