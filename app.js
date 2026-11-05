(function () {
  'use strict';
  const D = window.Drama;
  const $ = id => document.getElementById(id);
  const key = 'rebirth-male-v2';
  const names = { proof: '线索', capital: '筹码', allies: '信任', heat: '暴露' };
  let state = { version: D.VERSION, answers: [], index: 0, phase: 'choice' };
  let saved = null;
  let storageAvailable = true;
  let selected = null;
  let posterUrl = null;
  let isSample = false;
  try {
    const parsed = JSON.parse(localStorage.getItem(key));
    if (D.validateSave(parsed)) saved = parsed;
  } catch (_) { storageAvailable = false; }

  function persist() {
    if (isSample) return;
    saved = JSON.parse(JSON.stringify(state));
    try { localStorage.setItem(key, JSON.stringify(state)); }
    catch (_) { storageAvailable = false; }
    $('save-note').textContent = storageAvailable ? '进度已保存在当前浏览器，可暂存后继续。' : '浏览器未能保存进度；本页仍可完成测评，请勿关闭或刷新。';
  }
  function show(name) {
    for (const id of ['home', 'play', 'result']) $(id).hidden = id !== name;
    $('home-button').hidden = name === 'home';
    $('edition').hidden = name !== 'home';
    $('home-button').textContent = isSample ? '返回封面' : '暂存并返回';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function focusTitle(id) { $(id).focus({ preventScroll: true }); }
  function home() {
    isSample = false;
    show('home');
    $('resume-button').hidden = !saved;
    $('start-button').textContent = saved ? '重新开机' : '重生，开机';
    if (saved) $('resume-button').textContent = saved.phase === 'result' ? '查看上次结局' : `继续第 ${saved.index + 1} 集`;
  }
  function start() {
    isSample = false;
    state = { version: D.VERSION, answers: [], index: 0, phase: 'choice' };
    persist();
    renderPlay();
  }
  function stats(target, score) {
    $(target).replaceChildren();
    for (const [id, label] of Object.entries(names)) {
      const wrap = document.createElement('div');
      const dt = document.createElement('dt'); dt.textContent = label;
      const dd = document.createElement('dd'); dd.textContent = score[id];
      wrap.append(dt, dd); $(target).append(wrap);
    }
  }
  function renderPlay() {
    const i = state.index, e = D.scene(i, state.answers);
    selected = state.answers[i] ?? null;
    const reaction = state.phase === 'reaction';
    show('play');
    $('episode-title').textContent = e.title;
    $('episode-count').textContent = `第 ${String(i + 1).padStart(2, '0')} / ${D.episodes.length} 集`;
    $('chapter').textContent = e.chapter;
    $('scene-number').textContent = String(i + 1).padStart(2, '0');
    $('place').textContent = e.place;
    $('scene-text').textContent = e.text;
    $('scene-quote').textContent = e.quote;
    const branch = D.branch(i, state.answers);
    $('branch-text').textContent = branch;
    $('branch-text').hidden = !branch;
    $('progress').value = reaction ? i + 1 : i;
    $('progress').setAttribute('aria-valuetext', `已完成 ${reaction ? i + 1 : i} 集，共 ${D.episodes.length} 集`);
    stats('live-stats', D.calculate(state.answers.slice(0, reaction ? i + 1 : i)).score);
    const inventory = D.inventory(state.answers.slice(0, reaction ? i + 1 : i));
    $('inventory').textContent = inventory.length ? inventory.join('；') + '。' : '关键证物与接应，会随你做过的选择留下。';
    $('choice-form').hidden = reaction;
    $('reaction').hidden = !reaction;
    $('options').replaceChildren();
    e.options.forEach((o, a) => {
      const label = document.createElement('label'); label.className = 'option';
      const input = document.createElement('input');
      input.type = 'radio'; input.name = 'choice'; input.value = a; input.checked = selected === a;
      const letter = document.createElement('span'); letter.className = 'option-letter'; letter.textContent = String.fromCharCode(65 + a); letter.setAttribute('aria-hidden', 'true');
      const copy = document.createElement('span');
      const strong = document.createElement('strong'); strong.textContent = o.title;
      const small = document.createElement('small'); small.textContent = o.line;
      copy.append(strong, small); label.append(input, letter, copy); $('options').append(label);
      input.addEventListener('change', () => { selected = a; $('confirm-button').disabled = false; });
    });
    $('confirm-button').disabled = selected === null;
    $('previous-button').hidden = i === 0;
    if (reaction) {
      const o = e.options[state.answers[i]];
      $('chosen-line').textContent = `你选了：${o.title}`;
      $('reaction-text').textContent = o.reaction;
      $('deltas').replaceChildren();
      const before = D.calculate(state.answers.slice(0, i)).score;
      const after = D.calculate(state.answers.slice(0, i + 1)).score;
      for (const id of Object.keys(o.delta)) {
        const difference = after[id] - before[id];
        const span = document.createElement('span'); span.textContent = `${names[id]} ${difference > 0 ? '+' : ''}${difference}`;
        $('deltas').append(span);
      }
      $('next-button').textContent = i === D.episodes.length - 1 ? '揭晓我的大结局' : '继续下一集';
    }
    $('save-note').textContent = storageAvailable ? '进度已保存在当前浏览器，可暂存后继续。' : '浏览器未能保存进度；本页仍可完成测评，请勿关闭或刷新。';
    focusTitle('episode-title');
  }
  function resetPoster() {
    if (posterUrl) URL.revokeObjectURL(posterUrl);
    posterUrl = null;
    $('poster-preview').hidden = true;
    $('poster-image-host').replaceChildren();
    $('poster-link').removeAttribute('href');
    $('download-status').textContent = '';
    $('download-button').textContent = '保存结局长图';
    $('download-button').removeAttribute('data-state');
  }
  function renderResult() {
    show('result');
    resetPoster();
    const r = D.calculate(state.answers);
    $('result-role').textContent = isSample ? `示例档案 / ${r.role}` : r.role;
    for (const [id, value] of Object.entries({ 'result-title': r.title, verdict: r.verdict, 'result-summary': r.summary, 'result-cost': r.cost, 'result-after': r.after, 'result-people': r.personal.join(''), 'result-line': r.line })) $(id).textContent = value;
    stats('final-stats', r.score);
    $('highlights').replaceChildren();
    D.highlights(state.answers).forEach(h => {
      const li = document.createElement('li');
      const n = document.createElement('span'); n.className = 'review-number'; n.textContent = `${String(h.episode).padStart(2, '0')} 集`; n.setAttribute('aria-label', `第 ${h.episode} 集`);
      const body = document.createElement('div');
      const title = document.createElement('h3'); title.textContent = h.choice;
      const p = document.createElement('p'); p.textContent = h.scene; body.append(title, p);
      const button = document.createElement('button'); button.type = 'button'; button.className = 'text-button'; button.textContent = '回看这集';
      button.addEventListener('click', () => { state.index = h.episode - 1; state.phase = 'choice'; persist(); renderPlay(); });
      li.append(n, body, button); $('highlights').append(li);
    });
    focusTitle('result-title');
  }
  $('start-button').addEventListener('click', () => { if (saved) $('restart-dialog').showModal(); else start(); });
  $('resume-button').addEventListener('click', () => {
    state = JSON.parse(JSON.stringify(saved));
    state.phase === 'result' ? renderResult() : renderPlay();
  });
  $('cancel-restart').addEventListener('click', () => $('restart-dialog').close());
  $('confirm-restart').addEventListener('click', () => { $('restart-dialog').close(); start(); });
  $('home-button').addEventListener('click', () => { home(); $('start-button').focus(); });
  $('choice-form').addEventListener('submit', e => {
    e.preventDefault();
    if (selected === null) return;
    if (state.answers[state.index] !== selected) state.answers = state.answers.slice(0, state.index);
    state.answers[state.index] = selected;
    state.phase = 'reaction'; persist(); renderPlay();
  });
  $('previous-button').addEventListener('click', () => { if (state.index === 0) return; state.index--; state.phase = 'choice'; persist(); renderPlay(); });
  $('rechoose-button').addEventListener('click', () => { state.phase = 'choice'; persist(); renderPlay(); });
  $('next-button').addEventListener('click', () => {
    if (state.index === D.episodes.length - 1) { state.phase = 'result'; persist(); renderResult(); }
    else { state.index++; state.phase = 'choice'; persist(); renderPlay(); }
  });
  $('replay-button').addEventListener('click', start);
  $('edit-button').addEventListener('click', () => { state.index = 0; state.phase = 'choice'; persist(); renderPlay(); });

  async function createPoster() {
    const r = D.calculate(state.answers);
    const button = $('download-button');
    button.disabled = true; button.setAttribute('aria-busy', 'true'); button.textContent = '正在排版长图';
    $('download-status').textContent = '';
    try {
      await document.fonts.ready;
      const css = getComputedStyle(document.documentElement);
      const token = name => css.getPropertyValue(name).trim();
      const colors = { paper: token('--color-poster-paper'), ink: token('--color-poster-ink'), muted: token('--color-poster-muted'), accent: token('--color-poster-accent'), rule: token('--color-poster-rule') };
      const font = token('--font-export');
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas unavailable');
      const left = 74, width = 932;
      let y = 72;
      const rows = [];
      function write(text, size, weight, color = colors.ink, gap = 24, maxWidth = width) {
        context.font = `${weight} ${size}px ${font}`;
        const lines = [];
        for (const paragraph of text.split('\n')) {
          let line = '';
          for (const char of Array.from(paragraph)) {
            const next = line + char;
            if (line && context.measureText(next).width > maxWidth) { lines.push(line); line = char; }
            else line = next;
          }
          if (line) lines.push(line);
        }
        for (const line of lines) {
          rows.push({ text: line, y, size, weight, color }); y += Math.ceil(size * 1.55);
        }
        y += gap;
      }
      function rule() { rows.push({ rule: true, y }); y += 40; }
      write('重生片场 / 男主篇' + (isSample ? ' / 示例档案' : ''), 27, 600, colors.muted, 36);
      rule();
      write(r.title, 64, 800, colors.ink, 24);
      write(`${r.role}    ${r.verdict}`, 31, 600, colors.ink, 34);
      write(r.summary, 32, 400, colors.ink, 36);
      write('这个结局的代价', 29, 600, colors.muted, 12);
      write(r.cost, 30, 400, colors.ink, 30);
      rule();
      write('这些选择，写出了你的结局', 34, 600, colors.ink, 24);
      for (const h of D.highlights(state.answers)) {
        write(`第 ${String(h.episode).padStart(2, '0')} 集 / ${h.scene}`, 25, 400, colors.muted, 5);
        write(h.choice, 34, 600, colors.ink, 24);
      }
      rule();
      write('终局筹码 / 剧情累计点数', 27, 600, colors.muted, 12);
      write(`线索 ${r.score.proof}    筹码 ${r.score.capital}    信任 ${r.score.allies}    暴露 ${r.score.heat}`, 34, 600, colors.ink, 32);
      write('这一世，你留下的人', 29, 600, colors.muted, 12);
      write(r.personal.join(''), 30, 400, colors.ink, 30);
      write('这一世的后来', 29, 600, colors.muted, 12);
      write(r.after, 30, 400, colors.ink, 32);
      write(r.line, 37, 600, colors.ink, 28);
      rule();
      write('原创虚构娱乐测评，不代表现实成功率或人格评价。', 23, 400, colors.muted, 4);
      write('每一幕都由你的选择累计；同样的答案，得到同样的结局。', 23, 400, colors.muted, 28);
      canvas.height = Math.ceil(y + 36);
      context.fillStyle = colors.paper; context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = colors.accent; context.fillRect(0, 0, canvas.width, 18);
      context.textBaseline = 'top';
      for (const row of rows) {
        if (row.rule) { context.fillStyle = colors.rule; context.fillRect(left, row.y, width, 2); }
        else { context.font = `${row.weight} ${row.size}px ${font}`; context.fillStyle = row.color; context.fillText(row.text, left, row.y); }
      }
      const blob = await new Promise((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error('PNG unavailable')), 'image/png'));
      if (posterUrl) URL.revokeObjectURL(posterUrl);
      posterUrl = URL.createObjectURL(blob);
      const posterImage = document.createElement('img');
      posterImage.src = posterUrl; posterImage.alt = '你的完整结局档案长图';
      $('poster-image-host').replaceChildren(posterImage);
      $('poster-link').href = posterUrl;
      $('poster-link').download = `重生结局-${r.role}.png`;
      $('poster-preview').hidden = false;
      $('poster-link').click();
      button.textContent = '再次生成结局长图';
    } catch (_) {
      button.dataset.state = 'error'; button.textContent = '重试保存长图';
      $('download-status').textContent = '这次生成没有成功。请重试，或使用浏览器截图保存当前结局。';
    } finally { button.disabled = false; button.removeAttribute('aria-busy'); }
  }
  $('download-button').addEventListener('click', createPoster);
  const sample = new URLSearchParams(location.search).get('sample');
  const examples = D.examples;
  if (sample && Object.hasOwn(examples, sample)) {
    isSample = true;
    state = { version: D.VERSION, answers: examples[sample], index: D.episodes.length - 1, phase: 'result' };
    renderResult();
  } else home();
})();
