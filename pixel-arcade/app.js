(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const storage = {
    get(key, fallback) {
      try {
        const value = localStorage.getItem(`pixel-arcade:${key}`);
        return value === null ? fallback : value;
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(`pixel-arcade:${key}`, String(value));
      } catch {
        // Private browsing can disable storage; games still work without records.
      }
    }
  };

  const getBest = (id) => Number(storage.get(`best:${id}`, 0)) || 0;
  const setBest = (id, score) => {
    if (score > getBest(id)) storage.set(`best:${id}`, score);
  };

  const GAME_META = [
    {
      id: "2048",
      title: "2048",
      subtitle: "数字合并",
      category: "puzzle",
      categoryLabel: "益智挑战",
      description: "滑动数字，把相同的方块合在一起，向 2048 发起挑战。",
      icon: "2⁴",
      bg: "#e96054",
      fg: "#2b1714",
      time: "5 MIN",
      hint: "方向键 / WASD 移动方块 · 手机可在棋盘上滑动"
    },
    {
      id: "tetris",
      title: "方块坠落",
      subtitle: "TETRIS",
      category: "puzzle",
      categoryLabel: "益智挑战",
      description: "旋转并排列下落的方块，填满整行，让它们消失。",
      icon: "▦",
      bg: "#705cff",
      fg: "#eeeaff",
      time: "10 MIN",
      hint: "← → 移动 · ↑ 旋转 · ↓ 加速 · 空格直接落下"
    },
    {
      id: "snake",
      title: "贪吃蛇",
      subtitle: "NEON SNAKE",
      category: "arcade",
      categoryLabel: "街机动作",
      description: "吃掉发光果实不断长大，别撞上墙壁，也别咬到自己。",
      icon: "•••",
      bg: "#1a5c45",
      fg: "#a8ff78",
      time: "∞",
      hint: "方向键 / WASD 改变方向 · 越吃越快"
    },
    {
      id: "flappy",
      title: "像素鸟",
      subtitle: "FLAPPY",
      category: "arcade",
      categoryLabel: "街机动作",
      description: "连续拍动翅膀穿过水管。每次点击，都要刚刚好。",
      icon: "✦",
      bg: "#2672a3",
      fg: "#f6e44d",
      time: "2 MIN",
      hint: "点击画面、空格或 ↑ 拍动翅膀"
    },
    {
      id: "ball",
      title: "跃动弹球",
      subtitle: "BOUNCE",
      category: "arcade",
      categoryLabel: "街机动作",
      description: "控制挡板接住弹球，击碎所有彩色砖块，赢得高分。",
      icon: "●",
      bg: "#e8ad35",
      fg: "#221c0e",
      time: "5 MIN",
      hint: "← → / A D 移动挡板 · 也可用鼠标或手指拖动"
    },
    {
      id: "plane",
      title: "星际飞机",
      subtitle: "STAR RAID",
      category: "arcade",
      categoryLabel: "街机动作",
      description: "驾驶战机穿越敌阵，自动开火，在星海中坚持更久。",
      icon: "➤",
      bg: "#24184a",
      fg: "#75f5ff",
      time: "3 MIN",
      hint: "方向键 / WASD 移动 · 战机自动射击 · 空格开始"
    },
    {
      id: "gomoku",
      title: "五子棋",
      subtitle: "GOMOKU",
      category: "strategy",
      categoryLabel: "对战棋牌",
      description: "黑白交替落子，率先把五颗棋子连成一线的一方获胜。",
      icon: "⑤",
      bg: "#c7aa77",
      fg: "#2a2116",
      time: "15 MIN",
      hint: "点击棋盘落子 · 可切换电脑对手 · Z 悔棋 · M 切换模式"
    },
    {
      id: "rps",
      title: "石头剪刀布",
      subtitle: "RPS DUEL",
      category: "strategy",
      categoryLabel: "对战棋牌",
      description: "三局定胜负太慢？和电脑连续对决，刷新你的连胜纪录。",
      icon: "✌",
      bg: "#f0d5dd",
      fg: "#38222c",
      time: "1 MIN",
      hint: "点击手势，或按键盘 1 / 2 / 3 出拳"
    },
    {
      id: "minesweeper",
      title: "雷区探秘",
      subtitle: "MINESWEEPER",
      category: "puzzle",
      categoryLabel: "益智挑战",
      description: "根据数字推断地雷位置。第一次点击绝对安全，插旗与扫雷都有提示。",
      icon: "✹",
      bg: "#304862",
      fg: "#eaf8ff",
      time: "5 MIN",
      hint: "左键翻格 · 右键或“插旗模式”标记地雷 · 数字代表周围雷数",
      isNew: true
    },
    {
      id: "memory",
      title: "记忆翻牌",
      subtitle: "MEMORY",
      category: "puzzle",
      categoryLabel: "益智挑战",
      description: "翻开卡牌寻找相同图案。用更少的步数和时间完成全部配对。",
      icon: "▣",
      bg: "#a82f59",
      fg: "#ffe1ec",
      time: "3 MIN",
      hint: "点击卡牌翻开 · 每次可翻两张 · 全部配对后完成",
      isNew: true
    },
    {
      id: "whack",
      title: "疯狂地鼠",
      subtitle: "WHACK-A-MOLE",
      category: "arcade",
      categoryLabel: "街机动作",
      description: "三十秒手速挑战。连续命中会提升连击，金色地鼠更值钱，小心炸弹。",
      icon: "⊕",
      bg: "#7b5a28",
      fg: "#ffeaa0",
      time: "30 SEC",
      hint: "点击冒头的地鼠 · 连击越高得分越多 · 躲开炸弹",
      isNew: true
    },
    {
      id: "tictactoe",
      title: "智能井字棋",
      subtitle: "TIC-TAC-TOE",
      category: "strategy",
      categoryLabel: "对战棋牌",
      description: "与会思考的电脑过招，或和朋友同屏对战。看似简单，每步都需要判断。",
      icon: "＃",
      bg: "#164f52",
      fg: "#c8fff7",
      time: "2 MIN",
      hint: "点击空格落子 · 可在“电脑 / 双人”模式间切换",
      isNew: true
    }
  ];

  class ArcadeSound {
    constructor() {
      this.enabled = storage.get("sound", "true") !== "false";
      this.context = null;
    }

    unlock() {
      if (!this.enabled) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!this.context) this.context = new AudioContext();
      if (this.context.state === "suspended") this.context.resume().catch(() => {});
    }

    play(type = "click") {
      if (!this.enabled) return;
      this.unlock();
      if (!this.context) return;

      const profiles = {
        click: [260, 0.035, "square", 0.025],
        move: [180, 0.035, "square", 0.018],
        merge: [520, 0.09, "triangle", 0.04],
        eat: [740, 0.055, "square", 0.025],
        flap: [440, 0.055, "sine", 0.025],
        hit: [90, 0.08, "sawtooth", 0.03],
        lose: [70, 0.25, "sawtooth", 0.035],
        win: [880, 0.14, "triangle", 0.04]
      };
      const [frequency, duration, wave, volume] = profiles[type] || profiles.click;
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      const now = this.context.currentTime;

      oscillator.type = wave;
      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(Math.max(40, frequency * 0.72), now + duration);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscillator.connect(gain);
      gain.connect(this.context.destination);
      oscillator.start(now);
      oscillator.stop(now + duration);
    }
  }

  const sound = new ArcadeSound();
  const gameGrid = $("#gameGrid");
  const gameModal = $("#gameModal");
  const gameStage = $("#gameStage");
  const gameTouch = $("#gameTouch");
  const gameTitle = $("#gameTitle");
  const gameCategory = $("#gameCategory");
  const gameHint = $("#gameHint");
  const gameStats = $("#gameStats");
  const gameAnnouncement = $("#gameAnnouncement");
  const toast = $("#toast");
  let activeGame = null;
  let activeMeta = null;
  let lastFocused = null;
  let toastTimer = 0;
  let stageClearTimer = 0;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function announce(message) {
    gameAnnouncement.textContent = "";
    window.setTimeout(() => {
      gameAnnouncement.textContent = message;
    }, 20);
  }

  function renderGameCards() {
    gameGrid.innerHTML = GAME_META.map((game) => `
      <button class="game-card" type="button" data-game="${game.id}" data-category="${game.category}"
        style="--card-bg:${game.bg};--card-fg:${game.fg}" aria-label="打开${game.title}">
        <span class="card-art" aria-hidden="true">
          <span class="card-pixels"><span></span><span></span><span></span><span></span></span>
          <span class="card-icon">${game.icon}</span>
          ${game.isNew ? '<span class="card-new">NEW</span>' : ""}
          <span class="card-play">▶</span>
        </span>
        <span class="card-meta">
          <span>${game.categoryLabel.toUpperCase()} · ${game.time}</span>
          <span class="card-title-row">
            <h3>${game.title}</h3>
            <small>${game.subtitle}</small>
          </span>
          <p>${game.description}</p>
        </span>
      </button>
    `).join("");
  }

  function setStats(definitions) {
    gameStats.innerHTML = definitions.map((item) => `
      <span class="stat-chip"><span>${item.label}</span><strong id="stat-${item.key}">${item.value ?? 0}</strong></span>
    `).join("");
  }

  function setStat(key, value) {
    const element = $(`#stat-${key}`);
    if (element && element.textContent !== String(value)) element.textContent = value;
  }

  function emptyTouch() {
    gameTouch.innerHTML = "";
  }

  function mountTouch(html) {
    gameTouch.innerHTML = html;
    $$("[data-touch]", gameTouch).forEach((button) => {
      const action = button.dataset.touch;
      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        event.stopPropagation();
        button.setPointerCapture?.(event.pointerId);
        sound.unlock();
        activeGame?.action(action);
      });
      button.addEventListener("pointerup", (event) => {
        event.preventDefault();
        event.stopPropagation();
        activeGame?.action(`${action}End`);
      });
      button.addEventListener("pointercancel", () => activeGame?.action(`${action}End`));
    });
  }

  function directionTouch(extra = "") {
    return `
      <div class="touch-group">
        <div class="dpad">
          <button class="touch-button up" data-touch="up" aria-label="向上">↑</button>
          <button class="touch-button left" data-touch="left" aria-label="向左">←</button>
          <button class="touch-button down" data-touch="down" aria-label="向下">↓</button>
          <button class="touch-button right" data-touch="right" aria-label="向右">→</button>
        </div>
      </div>
      ${extra ? `<div class="touch-group">${extra}</div>` : ""}
    `;
  }

  function openGame(id, trigger) {
    const meta = GAME_META.find((game) => game.id === id);
    if (!meta) return;

    activeGame?.stop?.();
    activeGame = null;
    activeMeta = meta;
    lastFocused = trigger || document.activeElement;
    clearTimeout(stageClearTimer);
    gameTitle.textContent = meta.title;
    gameCategory.textContent = meta.subtitle;
    gameHint.textContent = meta.hint;
    gameStage.innerHTML = "";
    emptyTouch();
    setStats([{ key: "loading", label: "LOADING", value: "···" }]);

    gameModal.classList.add("open");
    gameModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    sound.unlock();

    try {
      activeGame = createGame(meta);
      activeGame.start?.();
      window.requestAnimationFrame(() => $("#gameClose").focus({ preventScroll: true }));
    } catch (error) {
      console.error(error);
      gameStage.innerHTML = '<div class="game-error">游戏加载失败，请关闭后重试。</div>';
      showToast("游戏加载失败");
    }
  }

  function closeGame() {
    if (!gameModal.classList.contains("open")) return;
    activeGame?.stop?.();
    activeGame = null;
    activeMeta = null;
    gameModal.classList.remove("open");
    gameModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    stageClearTimer = window.setTimeout(() => {
      gameStage.innerHTML = "";
      gameTouch.innerHTML = "";
      gameStats.innerHTML = "";
    }, 180);
    lastFocused?.focus?.({ preventScroll: true });
  }

  function restartGame() {
    if (!activeMeta) return;
    activeGame?.stop?.();
    gameStage.innerHTML = "";
    emptyTouch();
    activeGame = createGame(activeMeta);
    activeGame.start?.();
    sound.play("click");
  }

  function createCanvas(width, height, className = "game-canvas") {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.className = className;
    canvas.style.aspectRatio = `${width} / ${height}`;
    canvas.setAttribute("aria-label", "游戏画面");
    gameStage.appendChild(canvas);
    return { canvas, ctx: canvas.getContext("2d") };
  }

  function roundedRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function keyDirection(event) {
    const key = event.key.toLowerCase();
    if (key === "arrowup" || key === "w") return "up";
    if (key === "arrowdown" || key === "s") return "down";
    if (key === "arrowleft" || key === "a") return "left";
    if (key === "arrowright" || key === "d") return "right";
    return "";
  }

  function createGame(meta) {
    if (meta.id === "2048") return create2048();
    if (meta.id === "tetris") return createTetris();
    if (meta.id === "snake") return createSnake();
    if (meta.id === "flappy") return createFlappy();
    if (meta.id === "ball") return createBreakout();
    if (meta.id === "plane") return createPlane();
    if (meta.id === "gomoku") return createGomoku();
    if (meta.id === "rps") return createRps();
    if (meta.id === "minesweeper") return createMinesweeper();
    if (meta.id === "memory") return createMemory();
    if (meta.id === "whack") return createWhack();
    if (meta.id === "tictactoe") return createTicTacToe();
    return { start() {}, stop() {} };
  }

  function create2048() {
    gameStage.innerHTML = `
      <div class="g2048-shell">
        <div class="g2048-grid" id="grid2048" role="grid" aria-label="2048 棋盘"></div>
        <p class="g2048-message" id="msg2048">合并数字，向 2048 出发</p>
        <div class="g2048-tools">
          <button class="mini-toggle" id="undo2048" type="button" disabled>↶ 撤销一步</button>
          <span id="undo2048Count">可撤销 0 步</span>
        </div>
      </div>
    `;
    const grid = $("#grid2048");
    const message = $("#msg2048");
    const undoButton = $("#undo2048");
    const undoCount = $("#undo2048Count");
    let board = Array.from({ length: 4 }, () => Array(4).fill(0));
    let score = 0;
    let moves = 0;
    let best = getBest("2048");
    let completed = false;
    let ended = false;
    let pointerStart = null;
    let history = [];

    function updateStats() {
      setStats([
        { key: "score", label: "分数", value: score },
        { key: "best", label: "最高", value: best },
        { key: "moves", label: "步数", value: moves }
      ]);
      undoButton.disabled = history.length === 0;
      undoCount.textContent = `可撤销 ${history.length} 步`;
    }

    function addRandom() {
      const cells = [];
      board.forEach((row, y) => row.forEach((value, x) => {
        if (!value) cells.push([x, y]);
      }));
      if (!cells.length) return;
      const [x, y] = cells[randomInt(0, cells.length - 1)];
      board[y][x] = Math.random() < 0.9 ? 2 : 4;
    }

    function render() {
      grid.innerHTML = board.flat().map((value) => `
        <div class="tile-2048${value > 2048 ? " big" : ""}" data-value="${value || ""}">${value || ""}</div>
      `).join("");
    }

    function hasMoves() {
      if (board.some((row) => row.includes(0))) return true;
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          const value = board[y][x];
          if (board[y][x + 1] === value || board[y + 1]?.[x] === value) return true;
        }
      }
      return false;
    }

    function slide(line) {
      const values = line.filter(Boolean);
      let gain = 0;
      for (let i = 0; i < values.length - 1; i++) {
        if (values[i] === values[i + 1]) {
          values[i] *= 2;
          gain += values[i];
          values.splice(i + 1, 1);
        }
      }
      while (values.length < 4) values.push(0);
      return { line: values, gain };
    }

    function move(direction) {
      if (ended) return;
      const before = board.map((row) => [...row]);
      let gain = 0;

      if (direction === "left" || direction === "right") {
        board = board.map((row) => {
          const source = direction === "right" ? [...row].reverse() : row;
          const result = slide(source);
          gain += result.gain;
          return direction === "right" ? result.line.reverse() : result.line;
        });
      } else {
        for (let x = 0; x < 4; x++) {
          const column = board.map((row) => row[x]);
          const source = direction === "down" ? [...column].reverse() : column;
          const result = slide(source);
          const line = direction === "down" ? result.line.reverse() : result.line;
          gain += result.gain;
          line.forEach((value, y) => {
            board[y][x] = value;
          });
        }
      }

      const moved = board.some((row, y) => row.some((value, x) => value !== before[y][x]));
      if (!moved) {
        sound.play("move");
        return;
      }

      history.push({
        board: before,
        score,
        moves,
        completed,
        ended
      });
      if (history.length > 12) history.shift();
      score += gain;
      moves += 1;
      if (score > best) {
        best = score;
        setBest("2048", best);
      }
      addRandom();
      render();
      updateStats();
      sound.play(gain ? "merge" : "move");

      const max = Math.max(...board.flat());
      if (max >= 2048 && !completed) {
        completed = true;
        message.textContent = "你合出了 2048！继续挑战更大的数字吧";
        sound.play("win");
        announce("你合出了 2048");
      }

      if (!hasMoves()) {
        ended = true;
        message.textContent = `没有可移动的方块了 · 本局 ${score} 分`;
        sound.play("lose");
        announce(`游戏结束，得分 ${score}`);
      }
    }

    function reset() {
      board = Array.from({ length: 4 }, () => Array(4).fill(0));
      score = 0;
      moves = 0;
      completed = false;
      ended = false;
      history = [];
      best = getBest("2048");
      addRandom();
      addRandom();
      message.textContent = "合并数字，向 2048 出发";
      render();
      updateStats();
    }

    function undo() {
      const snapshot = history.pop();
      if (!snapshot) return;
      board = snapshot.board;
      score = snapshot.score;
      moves = snapshot.moves;
      completed = snapshot.completed;
      ended = false;
      message.textContent = "已撤销上一步";
      render();
      updateStats();
      sound.play("move");
    }

    grid.addEventListener("pointerdown", (event) => {
      pointerStart = { x: event.clientX, y: event.clientY };
      grid.setPointerCapture?.(event.pointerId);
    });
    grid.addEventListener("pointerup", (event) => {
      if (!pointerStart) return;
      const dx = event.clientX - pointerStart.x;
      const dy = event.clientY - pointerStart.y;
      pointerStart = null;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
      if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? "right" : "left");
      else move(dy > 0 ? "down" : "up");
    });
    undoButton.addEventListener("click", undo);

    reset();
    return {
      start: reset,
      stop() {},
      action(direction) {
        if (["up", "down", "left", "right"].includes(direction)) move(direction);
      },
      handleKey(event) {
        if (event.key.toLowerCase() === "z" || event.key === "Backspace") {
          undo();
          return true;
        }
        const direction = keyDirection(event);
        if (!direction || event.repeat) return false;
        move(direction);
        return true;
      },
      handleKeyUp() {
        return false;
      }
    };
  }

  function createTetris() {
    const { canvas, ctx } = createCanvas(300, 600);
    const shell = document.createElement("div");
    shell.className = "tetris-shell";
    gameStage.appendChild(shell);
    shell.appendChild(canvas);
    const side = document.createElement("div");
    side.className = "tetris-side";
    side.innerHTML = `
      <span>NEXT</span>
      <canvas id="tetrisNext" width="112" height="112" aria-label="下一个方块"></canvas>
      <div class="tetris-side-help"><b>↑</b> 旋转<br><b>空格</b> 落下</div>
    `;
    shell.appendChild(side);
    const nextCanvas = $("#tetrisNext", side);
    const nextCtx = nextCanvas.getContext("2d");
    const COLS = 10;
    const ROWS = 20;
    const CELL = 30;
    const SHAPES = {
      I: [[1, 1, 1, 1]],
      J: [[1, 0, 0], [1, 1, 1]],
      L: [[0, 0, 1], [1, 1, 1]],
      O: [[1, 1], [1, 1]],
      S: [[0, 1, 1], [1, 1, 0]],
      T: [[0, 1, 0], [1, 1, 1]],
      Z: [[1, 1, 0], [0, 1, 1]]
    };
    const COLORS = {
      I: "#48e5ed",
      J: "#6f79ff",
      L: "#ff9c4b",
      O: "#f7df58",
      S: "#7beb75",
      T: "#c67aff",
      Z: "#ff6670"
    };
    const state = {
      board: Array.from({ length: ROWS }, () => Array(COLS).fill(null)),
      piece: null,
      nextType: "",
      bag: [],
      score: 0,
      lines: 0,
      level: 1,
      over: false,
      lastTime: 0,
      dropCounter: 0,
      raf: 0
    };

    function takeFromBag() {
      if (!state.bag.length) {
        state.bag = Object.keys(SHAPES).sort(() => Math.random() - 0.5);
      }
      return state.bag.pop();
    }

    function makePiece(type) {
      const matrix = SHAPES[type].map((row) => [...row]);
      return {
        type,
        matrix,
        x: Math.floor((COLS - matrix[0].length) / 2),
        y: 0
      };
    }

    function spawn() {
      state.piece = makePiece(state.nextType || takeFromBag());
      state.nextType = takeFromBag();
      state.dropCounter = 0;
      drawNext();
      if (collides(state.piece.matrix, state.piece.x, state.piece.y)) {
        state.over = true;
        setBest("tetris", state.score);
        sound.play("lose");
        announce(`游戏结束，得分 ${state.score}`);
      }
    }

    function drawNext() {
      nextCtx.clearRect(0, 0, 112, 112);
      nextCtx.fillStyle = "#171621";
      nextCtx.fillRect(0, 0, 112, 112);
      if (!state.nextType) return;
      const matrix = SHAPES[state.nextType];
      const cellSize = 21;
      const width = matrix[0].length * cellSize;
      const height = matrix.length * cellSize;
      const offsetX = (112 - width) / 2;
      const offsetY = (112 - height) / 2;
      matrix.forEach((row, y) => row.forEach((value, x) => {
        if (!value) return;
        roundedRect(nextCtx, offsetX + x * cellSize + 1, offsetY + y * cellSize + 1, cellSize - 2, cellSize - 2, 4);
        nextCtx.fillStyle = COLORS[state.nextType];
        nextCtx.fill();
      }));
    }

    function collides(matrix, offsetX, offsetY) {
      return matrix.some((row, y) => row.some((value, x) => {
        if (!value) return false;
        const boardX = x + offsetX;
        const boardY = y + offsetY;
        return boardX < 0 || boardX >= COLS || boardY >= ROWS ||
          (boardY >= 0 && Boolean(state.board[boardY][boardX]));
      }));
    }

    function updateStats() {
      setStats([
        { key: "score", label: "分数", value: state.score },
        { key: "lines", label: "消行", value: state.lines },
        { key: "level", label: "等级", value: state.level },
        { key: "best", label: "最高", value: getBest("tetris") }
      ]);
    }

    function rotateMatrix(matrix) {
      return matrix[0].map((_, index) => matrix.map((row) => row[index]).reverse());
    }

    function rotate() {
      if (state.over) return;
      const rotated = rotateMatrix(state.piece.matrix);
      for (const kick of [0, -1, 1, -2, 2]) {
        if (!collides(rotated, state.piece.x + kick, state.piece.y)) {
          state.piece.matrix = rotated;
          state.piece.x += kick;
          sound.play("click");
          return;
        }
      }
    }

    function moveHorizontal(direction) {
      if (state.over) return;
      const nextX = state.piece.x + direction;
      if (!collides(state.piece.matrix, nextX, state.piece.y)) {
        state.piece.x = nextX;
        sound.play("move");
      }
    }

    function softDrop() {
      if (state.over) return;
      if (!collides(state.piece.matrix, state.piece.x, state.piece.y + 1)) {
        state.piece.y += 1;
        state.dropCounter = 0;
      } else {
        lockPiece();
      }
    }

    function hardDrop() {
      if (state.over) return;
      let distance = 0;
      while (!collides(state.piece.matrix, state.piece.x, state.piece.y + 1)) {
        state.piece.y += 1;
        distance += 1;
      }
      state.score += distance * 2;
      lockPiece();
    }

    function lockPiece() {
      state.piece.matrix.forEach((row, y) => row.forEach((value, x) => {
        if (value && state.piece.y + y >= 0) {
          state.board[state.piece.y + y][state.piece.x + x] = state.piece.type;
        }
      }));

      const before = state.lines;
      state.board = state.board.filter((row) => row.some((cell) => !cell));
      const cleared = ROWS - state.board.length;
      while (state.board.length < ROWS) {
        state.board.unshift(Array(COLS).fill(null));
      }
      if (cleared) {
        state.lines += cleared;
        state.score += [0, 100, 300, 600, 1000][cleared] * state.level;
        state.level = Math.floor(state.lines / 10) + 1;
        sound.play("merge");
        announce(`消除 ${cleared} 行`);
      }
      if (state.lines !== before) setBest("tetris", state.score);
      spawn();
      updateStats();
    }

    function drawCell(x, y, color, alpha = 1, size = CELL - 2) {
      ctx.save();
      ctx.globalAlpha = alpha;
      roundedRect(ctx, x * CELL + 1, y * CELL + 1, size, size, 5);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.2)";
      ctx.fillRect(x * CELL + 5, y * CELL + 5, size - 8, 3);
      ctx.restore();
    }

    function draw() {
      const gradient = ctx.createLinearGradient(0, 0, 0, 600);
      gradient.addColorStop(0, "#151522");
      gradient.addColorStop(1, "#0b0b12");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 300, 600);

      ctx.strokeStyle = "rgba(255,255,255,.04)";
      ctx.lineWidth = 1;
      for (let x = 1; x < COLS; x++) {
        ctx.beginPath();
        ctx.moveTo(x * CELL, 0);
        ctx.lineTo(x * CELL, 600);
        ctx.stroke();
      }
      for (let y = 1; y < ROWS; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * CELL);
        ctx.lineTo(300, y * CELL);
        ctx.stroke();
      }

      state.board.forEach((row, y) => row.forEach((type, x) => {
        if (type) drawCell(x, y, COLORS[type]);
      }));

      if (state.piece && !state.over) {
        let ghostY = state.piece.y;
        while (!collides(state.piece.matrix, state.piece.x, ghostY + 1)) ghostY++;
        state.piece.matrix.forEach((row, y) => row.forEach((value, x) => {
          if (value) drawCell(state.piece.x + x, ghostY + y, COLORS[state.piece.type], 0.18);
        }));
        state.piece.matrix.forEach((row, y) => row.forEach((value, x) => {
          if (value) drawCell(state.piece.x + x, state.piece.y + y, COLORS[state.piece.type]);
        }));
      }

      if (state.over) {
        ctx.fillStyle = "rgba(7,7,13,.8)";
        ctx.fillRect(0, 0, 300, 600);
        ctx.textAlign = "center";
        ctx.fillStyle = "#f8f7f3";
        ctx.font = "900 29px monospace";
        ctx.fillText("GAME OVER", 150, 270);
        ctx.fillStyle = "#c7ff4a";
        ctx.font = "700 16px monospace";
        ctx.fillText(`${state.score} POINTS`, 150, 308);
        ctx.fillStyle = "rgba(255,255,255,.55)";
        ctx.font = "11px monospace";
        ctx.fillText("点击“重开”再来一局", 150, 342);
      }
    }

    function update(time = 0) {
      if (!state.lastTime) state.lastTime = time;
      const delta = Math.min(time - state.lastTime, 50);
      state.lastTime = time;

      if (!state.over) {
        state.dropCounter += delta;
        const interval = Math.max(90, 760 - (state.level - 1) * 65);
        if (state.dropCounter >= interval) {
          if (!collides(state.piece.matrix, state.piece.x, state.piece.y + 1)) {
            state.piece.y += 1;
          } else {
            lockPiece();
          }
          state.dropCounter = 0;
        }
        draw();
        state.raf = requestAnimationFrame(update);
      } else {
        draw();
      }
    }

    function reset() {
      state.board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
      state.score = 0;
      state.lines = 0;
      state.level = 1;
      state.over = false;
      state.lastTime = 0;
      state.dropCounter = 0;
      state.bag = [];
      state.nextType = takeFromBag();
      spawn();
      updateStats();
      draw();
    }

    reset();
    mountTouch(`
      <div class="touch-group">
        <button class="touch-button" data-touch="left" aria-label="向左">←</button>
        <button class="touch-button" data-touch="right" aria-label="向右">→</button>
      </div>
      <div class="touch-group">
        <button class="touch-button" data-touch="down" aria-label="向下">↓</button>
        <button class="touch-button" data-touch="rotate" aria-label="旋转">↻</button>
        <button class="touch-button" data-touch="drop" aria-label="直接落下">⇊</button>
      </div>
    `);
    return {
      start() {
        state.raf = requestAnimationFrame(update);
      },
      stop() {
        cancelAnimationFrame(state.raf);
      },
      action(action) {
        if (action === "left") moveHorizontal(-1);
        if (action === "right") moveHorizontal(1);
        if (action === "down") softDrop();
        if (action === "up" || action === "rotate") rotate();
        if (action === "drop") hardDrop();
      },
      handleKey(event) {
        if (event.repeat && !["arrowdown", "s"].includes(event.key.toLowerCase())) return false;
        if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") moveHorizontal(-1);
        else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") moveHorizontal(1);
        else if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") softDrop();
        else if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") rotate();
        else if (event.key === " ") hardDrop();
        else return false;
        return true;
      },
      handleKeyUp() {
        return false;
      }
    };
  }

  function createSnake() {
    const WIDTH = 640;
    const HEIGHT = 400;
    const CELL = 20;
    const COLS = WIDTH / CELL;
    const ROWS = HEIGHT / CELL;
    const { canvas, ctx } = createCanvas(WIDTH, HEIGHT);
    let snake = [];
    let direction = { x: 1, y: 0 };
    let pendingDirections = [];
    let food = { x: 0, y: 0, type: "normal" };
    let score = 0;
    let best = getBest("snake");
    let over = false;
    let accumulator = 0;
    let lastTime = 0;
    let stepTime = 120;
    let fruitCount = 0;
    let paused = false;
    let raf = 0;

    function updateStats() {
      setStats([
        { key: "score", label: "分数", value: score },
        { key: "length", label: "长度", value: snake.length },
        { key: "speed", label: "速度", value: `${Math.round(1200 / stepTime) / 10}x` },
        { key: "best", label: "最高", value: best }
      ]);
    }

    function isOnSnake(x, y) {
      return snake.some((segment) => segment.x === x && segment.y === y);
    }

    function placeFood() {
      const free = [];
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (!isOnSnake(x, y)) free.push({ x, y });
        }
      }
      const spot = free[randomInt(0, free.length - 1)] || { x: 0, y: 0 };
      food = {
        ...spot,
        type: fruitCount > 0 && fruitCount % 5 === 0 ? "golden" : "normal"
      };
    }

    function reset() {
      snake = [
        { x: 9, y: 10 },
        { x: 8, y: 10 },
        { x: 7, y: 10 },
        { x: 6, y: 10 }
      ];
      direction = { x: 1, y: 0 };
      pendingDirections = [];
      score = 0;
      best = getBest("snake");
      over = false;
      accumulator = 0;
      stepTime = 120;
      fruitCount = 0;
      paused = false;
      placeFood();
      updateStats();
      draw();
    }

    function turn(nextDirection) {
      const base = pendingDirections.length ? pendingDirections[pendingDirections.length - 1] : direction;
      if (base.x + nextDirection.x === 0 && base.y + nextDirection.y === 0) return;
      if (base.x === nextDirection.x && base.y === nextDirection.y) return;
      if (pendingDirections.length < 2) pendingDirections.push(nextDirection);
    }

    function step() {
      if (over) return;
      if (pendingDirections.length) direction = pendingDirections.shift();
      const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
      };
      const hitsWall = head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS;
      const eats = head.x === food.x && head.y === food.y;
      const body = eats ? snake : snake.slice(0, -1);
      const hitsSelf = body.some((segment) => segment.x === head.x && segment.y === head.y);

      if (hitsWall || hitsSelf) {
        over = true;
        best = Math.max(best, score);
        setBest("snake", score);
        sound.play("lose");
        announce(`游戏结束，得分 ${score}`);
        return;
      }

      snake.unshift(head);
      if (eats) {
        fruitCount += 1;
        score += food.type === "golden" ? 30 : 10;
        stepTime = Math.max(68, stepTime - (food.type === "golden" ? 5 : 3));
        sound.play("eat");
        placeFood();
        best = Math.max(best, score);
        setBest("snake", score);
        updateStats();
      } else {
        snake.pop();
      }
      setStat("length", snake.length);
      setStat("score", score);
    }

    function draw() {
      ctx.fillStyle = "#0e1718";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.strokeStyle = "rgba(116,255,182,.075)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath();
        ctx.moveTo(x * CELL, 0);
        ctx.lineTo(x * CELL, HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * CELL);
        ctx.lineTo(WIDTH, y * CELL);
        ctx.stroke();
      }

      const pulse = 0.72 + Math.sin(performance.now() / 180) * 0.22;
      ctx.save();
      ctx.shadowColor = food.type === "golden" ? "#ffd84f" : "#ff6670";
      ctx.shadowBlur = 16 * pulse;
      roundedRect(ctx, food.x * CELL + 4, food.y * CELL + 4, CELL - 8, CELL - 8, food.type === "golden" ? 10 : 5);
      ctx.fillStyle = food.type === "golden" ? "#ffd84f" : "#ff6670";
      ctx.fill();
      ctx.restore();

      snake.forEach((segment, index) => {
        const ratio = 1 - index / Math.max(1, snake.length * 1.4);
        ctx.fillStyle = index === 0 ? "#c7ff4a" : `rgba(106, 234, 151, ${0.42 + ratio * 0.58})`;
        roundedRect(ctx, segment.x * CELL + 2, segment.y * CELL + 2, CELL - 4, CELL - 4, index === 0 ? 6 : 4);
        ctx.fill();
      });

      const head = snake[0];
      if (head) {
        ctx.fillStyle = "#10130d";
        const eyeSize = 3;
        if (direction.x !== 0) {
          ctx.fillRect(head.x * CELL + (direction.x > 0 ? 12 : 5), head.y * CELL + 6, eyeSize, eyeSize);
          ctx.fillRect(head.x * CELL + (direction.x > 0 ? 12 : 5), head.y * CELL + 12, eyeSize, eyeSize);
        } else {
          ctx.fillRect(head.x * CELL + 6, head.y * CELL + (direction.y > 0 ? 12 : 5), eyeSize, eyeSize);
          ctx.fillRect(head.x * CELL + 12, head.y * CELL + (direction.y > 0 ? 12 : 5), eyeSize, eyeSize);
        }
      }

      if (over) {
        ctx.fillStyle = "rgba(5,10,10,.78)";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.textAlign = "center";
        ctx.fillStyle = "#f6f3e9";
        ctx.font = "900 38px monospace";
        ctx.fillText("GAME OVER", WIDTH / 2, HEIGHT / 2 - 8);
        ctx.fillStyle = "#c7ff4a";
        ctx.font = "700 16px monospace";
        ctx.fillText(`得分 ${score} · 长度 ${snake.length}`, WIDTH / 2, HEIGHT / 2 + 27);
      } else if (paused) {
        ctx.fillStyle = "rgba(5,10,10,.72)";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.textAlign = "center";
        ctx.fillStyle = "#c7ff4a";
        ctx.font = "900 34px monospace";
        ctx.fillText("PAUSED", WIDTH / 2, HEIGHT / 2);
        ctx.fillStyle = "rgba(255,255,255,.48)";
        ctx.font = "11px monospace";
        ctx.fillText("按 P / 空格继续", WIDTH / 2, HEIGHT / 2 + 30);
      }
    }

    function togglePause() {
      if (over) return;
      paused = !paused;
      announce(paused ? "游戏已暂停" : "继续游戏");
    }

    function loop(time) {
      if (!lastTime) lastTime = time;
      const delta = Math.min(time - lastTime, 70);
      lastTime = time;
      if (!over && !paused) {
        accumulator += delta;
        if (accumulator >= stepTime) {
          accumulator %= stepTime;
          step();
        }
      }
      draw();
      raf = requestAnimationFrame(loop);
    }

    reset();
    mountTouch(directionTouch('<button class="touch-button" data-touch="pause" aria-label="暂停">Ⅱ</button>'));
    return {
      start() {
        raf = requestAnimationFrame(loop);
      },
      stop() {
        cancelAnimationFrame(raf);
      },
      action(action) {
        const directions = {
          up: { x: 0, y: -1 },
          down: { x: 0, y: 1 },
          left: { x: -1, y: 0 },
          right: { x: 1, y: 0 }
        };
        if (directions[action]) turn(directions[action]);
        if (action === "pause") togglePause();
      },
      handleKey(event) {
        if (event.key.toLowerCase() === "p" || event.key === " ") {
          togglePause();
          return true;
        }
        const directionName = keyDirection(event);
        if (!directionName) return false;
        const directions = {
          up: { x: 0, y: -1 },
          down: { x: 0, y: 1 },
          left: { x: -1, y: 0 },
          right: { x: 1, y: 0 }
        };
        turn(directions[directionName]);
        return true;
      },
      handleKeyUp() {
        return false;
      }
    };
  }

  function createFlappy() {
    const WIDTH = 480;
    const HEIGHT = 640;
    const { canvas, ctx } = createCanvas(WIDTH, HEIGHT);
    const state = {
      bird: { x: 118, y: 285, vy: 0, rotation: 0 },
      pipes: [],
      clouds: [
        { x: 40, y: 130, s: 1 },
        { x: 310, y: 75, s: 0.72 },
        { x: 210, y: 240, s: 0.5 }
      ],
      score: 0,
      scroll: 0,
      phase: "ready",
      spawnTimer: 0,
      lastTime: 0,
      raf: 0,
      best: getBest("flappy")
    };
    const GRAVITY = 1420;
    const FLAP = -485;
    const PIPE_SPEED = 155;
    const PIPE_GAP = 158;
    const PIPE_WIDTH = 70;

    function updateStats() {
      setStats([
        { key: "score", label: "得分", value: state.score },
        { key: "best", label: "最高", value: state.best },
        { key: "state", label: "状态", value: state.phase === "ready" ? "准备" : state.phase === "running" ? "飞行中" : "结束" }
      ]);
    }

    function reset() {
      state.bird = { x: 118, y: 285, vy: 0, rotation: 0 };
      state.pipes = [];
      state.score = 0;
      state.scroll = 0;
      state.phase = "ready";
      state.spawnTimer = 0;
      state.lastTime = 0;
      state.best = getBest("flappy");
      updateStats();
      draw();
    }

    function flap() {
      if (state.phase === "over") {
        reset();
        return;
      }
      if (state.phase === "ready") {
        state.phase = "running";
        setStat("state", "飞行中");
      }
      state.bird.vy = FLAP;
      state.bird.rotation = -0.36;
      sound.play("flap");
    }

    function spawnPipe() {
      const gapCenter = randomInt(165, HEIGHT - 175);
      state.pipes.push({
        x: WIDTH + 5,
        gapCenter,
        passed: false
      });
    }

    function collide(bird, pipe) {
      const topHeight = pipe.gapCenter - PIPE_GAP / 2;
      const bottomStart = pipe.gapCenter + PIPE_GAP / 2;
      const birdLeft = bird.x - 17;
      const birdRight = bird.x + 19;
      const birdTop = bird.y - 14;
      const birdBottom = bird.y + 14;
      if (birdRight < pipe.x || birdLeft > pipe.x + PIPE_WIDTH) return false;
      return birdTop < topHeight || birdBottom > bottomStart;
    }

    function drawPipe(pipe) {
      const topHeight = pipe.gapCenter - PIPE_GAP / 2;
      const bottomY = pipe.gapCenter + PIPE_GAP / 2;
      const gradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + PIPE_WIDTH, 0);
      gradient.addColorStop(0, "#315b42");
      gradient.addColorStop(0.25, "#65ab61");
      gradient.addColorStop(0.7, "#3f7d48");
      gradient.addColorStop(1, "#244c36");
      ctx.fillStyle = gradient;
      ctx.strokeStyle = "#163423";
      ctx.lineWidth = 4;
      roundedRect(ctx, pipe.x, -10, PIPE_WIDTH, topHeight + 10, 4);
      ctx.fill();
      ctx.stroke();
      roundedRect(ctx, pipe.x - 6, topHeight - 24, PIPE_WIDTH + 12, 24, 4);
      ctx.fill();
      ctx.stroke();
      roundedRect(ctx, pipe.x, bottomY, PIPE_WIDTH, HEIGHT - bottomY, 4);
      ctx.fill();
      ctx.stroke();
      roundedRect(ctx, pipe.x - 6, bottomY, PIPE_WIDTH + 12, 24, 4);
      ctx.fill();
      ctx.stroke();
    }

    function drawBird() {
      ctx.save();
      ctx.translate(state.bird.x, state.bird.y);
      ctx.rotate(state.bird.rotation);
      ctx.shadowColor = "rgba(247,228,77,.55)";
      ctx.shadowBlur = 16;
      ctx.fillStyle = "#f7e44d";
      ctx.strokeStyle = "#332b1d";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(0, 0, 20, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#f39b36";
      ctx.beginPath();
      ctx.moveTo(16, -2);
      ctx.lineTo(29, 4);
      ctx.lineTo(16, 9);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(8, -6, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#25211c";
      ctx.beginPath();
      ctx.arc(10, -6, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#e7c529";
      ctx.beginPath();
      ctx.ellipse(-7, 2, 10, 6, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function draw() {
      const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      sky.addColorStop(0, "#68c4dd");
      sky.addColorStop(0.7, "#9fe3dc");
      sky.addColorStop(1, "#f1d893");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.fillStyle = "rgba(255,255,255,.65)";
      state.clouds.forEach((cloud) => {
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, 18 * cloud.s, 0, Math.PI * 2);
        ctx.arc(cloud.x + 22 * cloud.s, cloud.y - 7 * cloud.s, 24 * cloud.s, 0, Math.PI * 2);
        ctx.arc(cloud.x + 49 * cloud.s, cloud.y, 17 * cloud.s, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = "#8bc9a8";
      ctx.beginPath();
      ctx.moveTo(0, HEIGHT - 46);
      for (let x = -120; x <= WIDTH + 120; x += 80) {
        const px = x - (state.scroll * 0.16 % 80);
        ctx.quadraticCurveTo(px + 40, HEIGHT - 138, px + 80, HEIGHT - 46);
      }
      ctx.lineTo(WIDTH, HEIGHT - 46);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#6faa83";
      ctx.beginPath();
      ctx.moveTo(0, HEIGHT - 46);
      for (let x = -80; x <= WIDTH + 120; x += 52) {
        const px = x - (state.scroll * 0.28 % 52);
        ctx.quadraticCurveTo(px + 26, HEIGHT - 100, px + 52, HEIGHT - 46);
      }
      ctx.lineTo(WIDTH, HEIGHT - 46);
      ctx.closePath();
      ctx.fill();

      state.pipes.forEach(drawPipe);

      ctx.fillStyle = "#d8c67c";
      ctx.fillRect(0, HEIGHT - 46, WIDTH, 46);
      ctx.fillStyle = "#78a551";
      ctx.fillRect(0, HEIGHT - 46, WIDTH, 13);
      ctx.fillStyle = "rgba(86,116,51,.38)";
      for (let x = 0; x < WIDTH; x += 22) {
        ctx.fillRect(x, HEIGHT - 29 + (x % 44 ? 5 : 0), 11, 4);
      }

      drawBird();

      ctx.save();
      ctx.fillStyle = "rgba(18,25,28,.74)";
      roundedRect(ctx, WIDTH - 99, 24, 74, 44, 10);
      ctx.fill();
      ctx.textAlign = "center";
      ctx.fillStyle = "#fffdf3";
      ctx.font = "900 27px monospace";
      ctx.fillText(String(state.score).padStart(2, "0"), WIDTH - 62, 56);
      ctx.restore();

      if (state.phase !== "running") {
        ctx.fillStyle = "rgba(8,18,24,.35)";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.textAlign = "center";
        ctx.fillStyle = "#fffdf3";
        ctx.strokeStyle = "rgba(20,25,29,.42)";
        ctx.lineWidth = 6;
        ctx.font = "900 34px monospace";
        const title = state.phase === "ready" ? "FLAPPY PIXEL" : "GAME OVER";
        ctx.strokeText(title, WIDTH / 2, 250);
        ctx.fillText(title, WIDTH / 2, 250);
        ctx.font = "700 14px monospace";
        if (state.phase === "over") {
          ctx.fillStyle = "#f7e44d";
          ctx.fillText(`${state.score} POINTS`, WIDTH / 2, 282);
          const stars = state.score >= 20 ? 3 : state.score >= 10 ? 2 : state.score >= 5 ? 1 : 0;
          ctx.font = "700 21px monospace";
          ctx.fillText("★".repeat(stars) + "☆".repeat(3 - stars), WIDTH / 2, 308);
        }
        ctx.fillStyle = "#fffdf3";
        ctx.fillText(state.phase === "ready" ? "点击 / 空格 开始" : "点击 / 空格 再来一局", WIDTH / 2, 320);
      }
    }

    function update(time) {
      if (!state.lastTime) state.lastTime = time;
      const delta = Math.min((time - state.lastTime) / 1000, 0.032);
      state.lastTime = time;

      state.clouds.forEach((cloud) => {
        cloud.x -= 7 * delta * cloud.s;
        if (cloud.x < -70) cloud.x = WIDTH + 40;
      });
      state.scroll += PIPE_SPEED * delta * (state.phase === "running" ? 1 : 0.25);

      if (state.phase === "running") {
        state.bird.vy += GRAVITY * delta;
        state.bird.y += state.bird.vy * delta;
        state.bird.rotation = clamp(state.bird.vy / 720, -0.38, 0.9);
        state.spawnTimer += delta;
        if (state.spawnTimer >= 1.38) {
          state.spawnTimer = 0;
          spawnPipe();
        }

        state.pipes.forEach((pipe) => {
          pipe.x -= PIPE_SPEED * delta;
          if (!pipe.passed && pipe.x + PIPE_WIDTH < state.bird.x) {
            pipe.passed = true;
            state.score += 1;
            sound.play("eat");
            setStat("score", state.score);
          }
          if (collide(state.bird, pipe)) {
            state.phase = "over";
          }
        });
        state.pipes = state.pipes.filter((pipe) => pipe.x + PIPE_WIDTH > -20);

        if (state.bird.y > HEIGHT - 53 || state.bird.y < 0) state.phase = "over";
        if (state.phase === "over") {
          state.best = Math.max(state.best, state.score);
          setBest("flappy", state.score);
          setStat("best", state.best);
          setStat("state", "结束");
          sound.play("lose");
          announce(`游戏结束，得分 ${state.score}`);
        }
      }

      draw();
      state.raf = requestAnimationFrame(update);
    }

    canvas.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      flap();
    });

    reset();
    mountTouch('<div class="touch-group"><button class="touch-button" data-touch="flap">拍翅 ↑</button></div>');
    return {
      start() {
        state.raf = requestAnimationFrame(update);
      },
      stop() {
        cancelAnimationFrame(state.raf);
      },
      action(action) {
        if (action === "flap") flap();
      },
      handleKey(event) {
        if ([" ", "ArrowUp", "w", "W"].includes(event.key)) {
          if (!event.repeat) flap();
          return true;
        }
        return false;
      },
      handleKeyUp() {
        return false;
      }
    };
  }

  function createBreakout() {
    const WIDTH = 640;
    const HEIGHT = 480;
    const { canvas, ctx } = createCanvas(WIDTH, HEIGHT);
    const brickColors = ["#ff6670", "#ff9c4b", "#f7df58", "#69df82", "#48cce5", "#8a6cff"];
    const state = {
      paddle: { x: WIDTH / 2 - 48, y: HEIGHT - 42, w: 96, h: 13 },
      ball: { x: WIDTH / 2, y: HEIGHT - 66, dx: 0, dy: 0, radius: 8 },
      bricks: [],
      powerUps: [],
      wideTimer: 0,
      score: 0,
      lives: 3,
      level: 1,
      phase: "ready",
      keys: { left: false, right: false },
      lastTime: 0,
      raf: 0
    };

    function buildBricks() {
      state.bricks = [];
      const columns = 8;
      const rows = 5;
      const gap = 6;
      const margin = 28;
      const brickWidth = (WIDTH - margin * 2 - gap * (columns - 1)) / columns;
      const brickHeight = 22;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          state.bricks.push({
            x: margin + col * (brickWidth + gap),
            y: 58 + row * (brickHeight + gap),
            w: brickWidth,
            h: brickHeight,
            color: brickColors[row],
            alive: true,
            points: (rows - row) * 10
          });
        }
      }
    }

    function updateStats() {
      setStats([
        { key: "score", label: "分数", value: state.score },
        { key: "lives", label: "生命", value: "♥".repeat(state.lives) || "0" },
        { key: "level", label: "关卡", value: state.level },
        { key: "best", label: "最高", value: getBest("ball") }
      ]);
    }

    function attachBall() {
      state.ball.x = state.paddle.x + state.paddle.w / 2;
      state.ball.y = state.paddle.y - 11;
      state.ball.dx = 0;
      state.ball.dy = 0;
      state.phase = "ready";
    }

    function serve() {
      if (state.phase === "gameover") {
        reset();
        return;
      }
      if (state.phase !== "ready") return;
      state.phase = "running";
      const speed = 280 + (state.level - 1) * 30;
      state.ball.dx = speed * (Math.random() > 0.5 ? 0.72 : -0.72);
      state.ball.dy = -Math.sqrt(speed * speed - state.ball.dx * state.ball.dx);
      sound.play("flap");
    }

    function reset() {
      state.score = 0;
      state.lives = 3;
      state.level = 1;
      state.powerUps = [];
      state.wideTimer = 0;
      state.paddle.w = 96;
      state.paddle.x = WIDTH / 2 - state.paddle.w / 2;
      buildBricks();
      attachBall();
      updateStats();
    }

    function loseLife() {
      state.lives -= 1;
      sound.play("hit");
      if (state.lives <= 0) {
        state.phase = "gameover";
        setBest("ball", state.score);
        sound.play("lose");
        announce(`游戏结束，得分 ${state.score}`);
      } else {
        attachBall();
        announce(`剩余 ${state.lives} 条命`);
      }
      updateStats();
    }

    function finishLevel() {
      state.level += 1;
      state.score += 100;
      state.powerUps = [];
      buildBricks();
      attachBall();
      setBest("ball", state.score);
      sound.play("win");
      updateStats();
      announce(`进入第 ${state.level} 关`);
    }

    function draw() {
      const bg = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      bg.addColorStop(0, "#1d1821");
      bg.addColorStop(1, "#0c0b12");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.strokeStyle = "rgba(255,255,255,.035)";
      for (let x = 0; x < WIDTH; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y < HEIGHT; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(WIDTH, y);
        ctx.stroke();
      }

      state.bricks.forEach((brick) => {
        if (!brick.alive) return;
        const gradient = ctx.createLinearGradient(brick.x, brick.y, brick.x, brick.y + brick.h);
        gradient.addColorStop(0, brick.color);
        gradient.addColorStop(1, `${brick.color}aa`);
        roundedRect(ctx, brick.x, brick.y, brick.w, brick.h, 4);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,.27)";
        ctx.fillRect(brick.x + 4, brick.y + 4, brick.w - 8, 2);
      });

      state.powerUps.forEach((power) => {
        ctx.save();
        ctx.translate(power.x, power.y);
        ctx.rotate(performance.now() / 700);
        ctx.shadowColor = power.type === "wide" ? "#c7ff4a" : "#68e9ff";
        ctx.shadowBlur = 15;
        roundedRect(ctx, -9, -9, 18, 18, 4);
        ctx.fillStyle = power.type === "wide" ? "#c7ff4a" : "#68e9ff";
        ctx.fill();
        ctx.restore();
        ctx.fillStyle = "#10121a";
        ctx.textAlign = "center";
        ctx.font = "900 11px monospace";
        ctx.fillText(power.type === "wide" ? "W" : "S", power.x, power.y + 4);
      });

      const paddleGradient = ctx.createLinearGradient(0, state.paddle.y, 0, state.paddle.y + state.paddle.h);
      paddleGradient.addColorStop(0, "#e4ff76");
      paddleGradient.addColorStop(1, "#8fc42d");
      roundedRect(ctx, state.paddle.x, state.paddle.y, state.paddle.w, state.paddle.h, 7);
      ctx.fillStyle = paddleGradient;
      ctx.fill();

      ctx.save();
      ctx.shadowColor = "#f7df58";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#fff8cf";
      ctx.fill();
      ctx.restore();

      if (state.phase !== "running") {
        ctx.fillStyle = "rgba(6,6,11,.56)";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.textAlign = "center";
        ctx.fillStyle = "#fffdf3";
        ctx.font = "900 33px monospace";
        ctx.fillText(state.phase === "ready" ? "BOUNCE!" : "GAME OVER", WIDTH / 2, 300);
        ctx.fillStyle = state.phase === "ready" ? "#c7ff4a" : "#ff6670";
        ctx.font = "700 14px monospace";
        ctx.fillText(state.phase === "ready" ? "点击 / 空格发球" : `得分 ${state.score}`, WIDTH / 2, 334);
      }
    }

    function update(time) {
      if (!state.lastTime) state.lastTime = time;
      const delta = Math.min((time - state.lastTime) / 1000, 0.028);
      state.lastTime = time;

      if (state.keys.left) state.paddle.x -= 430 * delta;
      if (state.keys.right) state.paddle.x += 430 * delta;
      state.paddle.x = clamp(state.paddle.x, 10, WIDTH - state.paddle.w - 10);

      state.powerUps.forEach((power) => {
        power.y += 88 * delta;
        const caught = power.y + 10 >= state.paddle.y &&
          power.y - 10 <= state.paddle.y + state.paddle.h &&
          power.x >= state.paddle.x && power.x <= state.paddle.x + state.paddle.w;
        if (caught) {
          power.caught = true;
          if (power.type === "wide") {
            state.paddle.w = 142;
            state.wideTimer = 10;
          } else {
            state.ball.dx *= 0.82;
            state.ball.dy *= 0.82;
          }
          sound.play("win");
        }
      });
      state.powerUps = state.powerUps.filter((power) => !power.caught && power.y < HEIGHT + 20);

      if (state.wideTimer > 0) {
        state.wideTimer -= delta;
        if (state.wideTimer <= 0) {
          state.paddle.w = 96;
          state.paddle.x = clamp(state.paddle.x, 10, WIDTH - state.paddle.w - 10);
        }
      }

      if (state.phase === "ready") {
        state.ball.x = state.paddle.x + state.paddle.w / 2;
        state.ball.y = state.paddle.y - 11;
      }

      if (state.phase === "running") {
        state.ball.x += state.ball.dx * delta;
        state.ball.y += state.ball.dy * delta;
        const radius = state.ball.radius;

        if (state.ball.x - radius < 0) {
          state.ball.x = radius;
          state.ball.dx = Math.abs(state.ball.dx);
        } else if (state.ball.x + radius > WIDTH) {
          state.ball.x = WIDTH - radius;
          state.ball.dx = -Math.abs(state.ball.dx);
        }
        if (state.ball.y - radius < 0) {
          state.ball.y = radius;
          state.ball.dy = Math.abs(state.ball.dy);
        }

        const paddleHit = state.ball.dy > 0 &&
          state.ball.y + radius >= state.paddle.y &&
          state.ball.y - radius <= state.paddle.y + state.paddle.h &&
          state.ball.x >= state.paddle.x - radius &&
          state.ball.x <= state.paddle.x + state.paddle.w + radius;
        if (paddleHit) {
          const hitPosition = clamp((state.ball.x - state.paddle.x) / state.paddle.w, 0, 1);
          const angle = (hitPosition - 0.5) * 1.25;
          const speed = Math.max(290, Math.hypot(state.ball.dx, state.ball.dy));
          state.ball.dx = Math.sin(angle) * speed;
          state.ball.dy = -Math.abs(Math.cos(angle) * speed);
          state.ball.y = state.paddle.y - radius - 1;
          sound.play("move");
        }

        for (const brick of state.bricks) {
          if (!brick.alive) continue;
          const closestX = clamp(state.ball.x, brick.x, brick.x + brick.w);
          const closestY = clamp(state.ball.y, brick.y, brick.y + brick.h);
          const dx = state.ball.x - closestX;
          const dy = state.ball.y - closestY;
          if (dx * dx + dy * dy <= radius * radius) {
            brick.alive = false;
            state.score += brick.points;
            setBest("ball", state.score);
            setStat("score", state.score);
            setStat("best", getBest("ball"));
            if (Math.abs(dx) > Math.abs(dy)) state.ball.dx *= -1;
            else state.ball.dy *= -1;
            state.ball.x += state.ball.dx * delta * 2;
            state.ball.y += state.ball.dy * delta * 2;
            sound.play("eat");
            if (Math.random() < 0.2) {
              state.powerUps.push({
                x: brick.x + brick.w / 2,
                y: brick.y + brick.h / 2,
                type: Math.random() < 0.55 ? "wide" : "slow"
              });
            }
            if (state.bricks.every((item) => !item.alive)) finishLevel();
            break;
          }
        }

        if (state.ball.y - radius > HEIGHT) loseLife();
      }

      draw();
      state.raf = requestAnimationFrame(update);
    }

    function movePaddleFromPointer(event) {
      const rect = canvas.getBoundingClientRect();
      const localX = ((event.clientX - rect.left) / rect.width) * WIDTH;
      state.paddle.x = clamp(localX - state.paddle.w / 2, 10, WIDTH - state.paddle.w - 10);
      if (state.phase === "ready") serve();
    }

    canvas.addEventListener("pointermove", (event) => {
      if (event.pointerType === "mouse") movePaddleFromPointer(event);
    });
    canvas.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      movePaddleFromPointer(event);
      if (state.phase === "gameover") reset();
    });

    reset();
    mountTouch(`
      <div class="touch-group">
        <button class="touch-button" data-touch="left" aria-label="向左">←</button>
        <button class="touch-button" data-touch="right" aria-label="向右">→</button>
      </div>
      <div class="touch-group"><button class="touch-button" data-touch="serve">发球</button></div>
    `);
    return {
      start() {
        state.raf = requestAnimationFrame(update);
      },
      stop() {
        cancelAnimationFrame(state.raf);
      },
      action(action) {
        if (action === "left") state.keys.left = true;
        if (action === "leftEnd") state.keys.left = false;
        if (action === "right") state.keys.right = true;
        if (action === "rightEnd") state.keys.right = false;
        if (action === "serve") serve();
      },
      handleKey(event) {
        const dir = keyDirection(event);
        if (dir === "left") state.keys.left = true;
        else if (dir === "right") state.keys.right = true;
        else if (event.key === " ") serve();
        else return false;
        if (state.phase === "ready") serve();
        return true;
      },
      handleKeyUp(event) {
        const dir = keyDirection(event);
        if (dir === "left") state.keys.left = false;
        if (dir === "right") state.keys.right = false;
        return false;
      }
    };
  }

  function createPlane() {
    const WIDTH = 560;
    const HEIGHT = 700;
    const { canvas, ctx } = createCanvas(WIDTH, HEIGHT);
    const state = {
      player: { x: WIDTH / 2, y: HEIGHT - 88, w: 38, h: 48, lives: 3, invulnerable: 0, power: 1, shield: 0 },
      bullets: [],
      enemies: [],
      powerUps: [],
      particles: [],
      stars: Array.from({ length: 74 }, () => ({
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        size: Math.random() * 1.7 + 0.4,
        speed: Math.random() * 30 + 12
      })),
      score: 0,
      phase: "ready",
      keys: { left: false, right: false, up: false, down: false },
      fireTimer: 0,
      spawnTimer: 0,
      elapsed: 0,
      lastTime: 0,
      raf: 0
    };

    function updateStats() {
      setStats([
        { key: "score", label: "分数", value: state.score },
        { key: "lives", label: "生命", value: "♥".repeat(state.player.lives) || "0" },
        { key: "power", label: "火力", value: `★${state.player.power}` },
        { key: "best", label: "最高", value: getBest("plane") },
        { key: "state", label: "状态", value: state.phase === "ready" ? "待命" : state.phase === "running" ? "作战中" : "结束" }
      ]);
    }

    function reset() {
      state.player = { x: WIDTH / 2, y: HEIGHT - 88, w: 38, h: 48, lives: 3, invulnerable: 0, power: 1, shield: 0 };
      state.bullets = [];
      state.enemies = [];
      state.powerUps = [];
      state.particles = [];
      state.score = 0;
      state.phase = "ready";
      state.fireTimer = 0;
      state.spawnTimer = 0;
      state.elapsed = 0;
      state.lastTime = 0;
      updateStats();
    }

    function launch() {
      if (state.phase === "gameover") {
        reset();
        state.phase = "running";
        updateStats();
        return;
      }
      if (state.phase === "ready") {
        state.phase = "running";
        setStat("state", "作战中");
        sound.play("win");
      }
    }

    function shoot() {
      const offsets = state.player.power === 1
        ? [-10, 10]
        : state.player.power === 2
          ? [-12, 0, 12]
          : [-20, -7, 7, 20];
      offsets.forEach((offset) => {
        state.bullets.push({
          x: state.player.x + offset,
          y: state.player.y - 20 - Math.abs(offset) * 0.12,
          vy: -530
        });
      });
    }

    function spawnEnemy() {
      const type = Math.random() < 0.18 ? "heavy" : "scout";
      state.enemies.push({
        x: randomInt(35, WIDTH - 35),
        y: -40,
        vy: 82 + Math.min(100, state.elapsed * 1.8) + Math.random() * 45,
        radius: type === "heavy" ? 22 : 16,
        hp: type === "heavy" ? 2 : 1,
        type,
        rotation: Math.random() * Math.PI
      });
    }

    function createExplosion(x, y, color) {
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 40 + Math.random() * 140;
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.45 + Math.random() * 0.25,
          maxLife: 0.7,
          color
        });
      }
    }

    function drawPlayer() {
      const p = state.player;
      ctx.save();
      ctx.translate(p.x, p.y);
      if (p.invulnerable > 0 && Math.floor(p.invulnerable * 10) % 2 === 0) ctx.globalAlpha = 0.28;
      ctx.shadowColor = "#57edff";
      ctx.shadowBlur = 18;
      ctx.fillStyle = "#68e9ff";
      ctx.beginPath();
      ctx.moveTo(0, -32);
      ctx.lineTo(12, -5);
      ctx.lineTo(29, 12);
      ctx.lineTo(10, 9);
      ctx.lineTo(7, 27);
      ctx.lineTo(0, 19);
      ctx.lineTo(-7, 27);
      ctx.lineTo(-10, 9);
      ctx.lineTo(-29, 12);
      ctx.lineTo(-12, -5);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#dffcff";
      ctx.beginPath();
      ctx.moveTo(0, -25);
      ctx.lineTo(7, 7);
      ctx.lineTo(0, 12);
      ctx.lineTo(-7, 7);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#ff6670";
      ctx.fillRect(-3, 18, 6, 13 + Math.random() * 8);
      ctx.restore();
    }

    function drawEnemy(enemy) {
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.rotate(enemy.rotation);
      ctx.fillStyle = enemy.type === "heavy" ? "#ff7d68" : "#c484ff";
      ctx.strokeStyle = "rgba(255,255,255,.35)";
      ctx.lineWidth = 2;
      if (enemy.type === "heavy") {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 2;
          const x = Math.cos(angle) * enemy.radius;
          const y = Math.sin(angle) * enemy.radius;
          if (!i) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#2c1728";
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, 17);
        ctx.lineTo(16, -10);
        ctx.lineTo(4, -5);
        ctx.lineTo(0, -15);
        ctx.lineTo(-4, -5);
        ctx.lineTo(-16, -10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
    }

    function draw() {
      const bg = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      bg.addColorStop(0, "#08091a");
      bg.addColorStop(0.65, "#18113a");
      bg.addColorStop(1, "#080810");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      state.stars.forEach((star) => {
        ctx.fillStyle = `rgba(255,255,255,${0.25 + star.size / 3})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      ctx.strokeStyle = "#ff6670";
      ctx.lineWidth = 3;
      ctx.shadowColor = "#ff6670";
      ctx.shadowBlur = 12;
      state.bullets.forEach((bullet) => {
        ctx.beginPath();
        ctx.moveTo(bullet.x, bullet.y + 12);
        ctx.lineTo(bullet.x, bullet.y - 7);
        ctx.stroke();
      });
      ctx.shadowBlur = 0;

      state.enemies.forEach(drawEnemy);
      state.particles.forEach((particle) => {
        ctx.globalAlpha = clamp(particle.life / particle.maxLife, 0, 1);
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, 4, 4);
      });
      ctx.globalAlpha = 1;
      if (state.phase !== "gameover") drawPlayer();
      if (state.phase !== "gameover" && state.player.shield > 0) {
        ctx.save();
        ctx.strokeStyle = `rgba(104,233,255,${0.45 + Math.sin(performance.now() / 120) * 0.2})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = "#68e9ff";
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(state.player.x, state.player.y, 36, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      state.powerUps.forEach((power) => {
        ctx.save();
        ctx.translate(power.x, power.y);
        ctx.rotate(performance.now() / 500);
        ctx.shadowColor = power.type === "shield" ? "#68e9ff" : "#ffd84f";
        ctx.shadowBlur = 18;
        roundedRect(ctx, -11, -11, 22, 22, 6);
        ctx.fillStyle = power.type === "shield" ? "#68e9ff" : "#ffd84f";
        ctx.fill();
        ctx.restore();
        ctx.fillStyle = "#11101a";
        ctx.textAlign = "center";
        ctx.font = "900 12px monospace";
        ctx.fillText(power.type === "shield" ? "S" : "P", power.x, power.y + 4);
      });

      if (state.phase !== "running") {
        ctx.fillStyle = "rgba(5,5,13,.58)";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.textAlign = "center";
        ctx.fillStyle = "#f8f7f3";
        ctx.font = "900 35px monospace";
        ctx.fillText(state.phase === "ready" ? "STAR RAID" : "MISSION OVER", WIDTH / 2, 310);
        ctx.fillStyle = state.phase === "ready" ? "#c7ff4a" : "#ff6670";
        ctx.font = "700 15px monospace";
        ctx.fillText(state.phase === "ready" ? "空格 / 点击开始" : `得分 ${state.score}`, WIDTH / 2, 345);
      }
    }

    function endGame() {
      state.phase = "gameover";
      state.player.lives = 0;
      setBest("plane", state.score);
      setStat("lives", "0");
      setStat("state", "结束");
      setStat("best", getBest("plane"));
      sound.play("lose");
      announce(`任务结束，得分 ${state.score}`);
    }

    function update(time) {
      if (!state.lastTime) state.lastTime = time;
      const delta = Math.min((time - state.lastTime) / 1000, 0.032);
      state.lastTime = time;
      state.elapsed += delta;

      state.stars.forEach((star) => {
        if (state.phase === "running") star.y += star.speed * delta;
        if (star.y > HEIGHT) {
          star.y = -2;
          star.x = Math.random() * WIDTH;
        }
      });

      if (state.phase === "running") {
        const moveSpeed = 320 * delta;
        if (state.keys.left) state.player.x -= moveSpeed;
        if (state.keys.right) state.player.x += moveSpeed;
        if (state.keys.up) state.player.y -= moveSpeed;
        if (state.keys.down) state.player.y += moveSpeed;
        state.player.x = clamp(state.player.x, 34, WIDTH - 34);
        state.player.y = clamp(state.player.y, 75, HEIGHT - 55);
        state.player.invulnerable = Math.max(0, state.player.invulnerable - delta);
        state.player.shield = Math.max(0, state.player.shield - delta);

        state.powerUps.forEach((power) => {
          power.y += 72 * delta;
          const dx = power.x - state.player.x;
          const dy = power.y - state.player.y;
          if (power.y > 30 && dx * dx + dy * dy < 34 * 34) {
            power.caught = true;
            if (power.type === "shield") {
              state.player.shield = 9;
              announce("护盾启动");
            } else {
              state.player.power = Math.min(3, state.player.power + 1);
              setStat("power", `★${state.player.power}`);
              announce(`火力提升到 ${state.player.power} 级`);
            }
            sound.play("win");
          }
        });
        state.powerUps = state.powerUps.filter((power) => !power.caught && power.y < HEIGHT + 30);

        state.fireTimer += delta;
        if (state.fireTimer >= 0.17) {
          state.fireTimer = 0;
          shoot();
        }

        state.spawnTimer += delta;
        const spawnInterval = Math.max(0.24, 0.74 - state.elapsed * 0.012);
        if (state.spawnTimer >= spawnInterval) {
          state.spawnTimer = 0;
          spawnEnemy();
        }

        state.bullets.forEach((bullet) => {
          bullet.y += bullet.vy * delta;
        });
        state.bullets = state.bullets.filter((bullet) => bullet.y > -25);

        state.enemies.forEach((enemy) => {
          enemy.y += enemy.vy * delta;
          enemy.rotation += delta * 1.2;
        });

        for (const enemy of state.enemies) {
          for (const bullet of state.bullets) {
            if (bullet.dead) continue;
            const dx = bullet.x - enemy.x;
            const dy = bullet.y - enemy.y;
            if (dx * dx + dy * dy < (enemy.radius + 5) ** 2) {
              bullet.dead = true;
              enemy.hp -= 1;
              if (enemy.hp <= 0) {
                enemy.dead = true;
                state.score += enemy.type === "heavy" ? 30 : 10;
                setStat("score", state.score);
                setBest("plane", state.score);
                createExplosion(enemy.x, enemy.y, enemy.type === "heavy" ? "#ff8c72" : "#c484ff");
                if (enemy.type === "heavy" && Math.random() < 0.4) {
                  state.powerUps.push({
                    x: enemy.x,
                    y: enemy.y,
                    type: Math.random() < 0.5 ? "shield" : "power"
                  });
                }
                sound.play("eat");
              }
              break;
            }
          }

          if (!enemy.dead && state.player.invulnerable <= 0) {
            const dx = enemy.x - state.player.x;
            const dy = enemy.y - state.player.y;
            if (dx * dx + dy * dy < (enemy.radius + 20) ** 2) {
              enemy.dead = true;
              if (state.player.shield > 0) {
                state.player.shield = 0;
                createExplosion(state.player.x, state.player.y, "#68e9ff");
                sound.play("hit");
                announce("护盾挡住了攻击");
                continue;
              }
              state.player.lives -= 1;
              state.player.invulnerable = 1.5;
              createExplosion(state.player.x, state.player.y, "#68e9ff");
              setStat("lives", "♥".repeat(Math.max(0, state.player.lives)) || "0");
              sound.play("hit");
              announce(`被击中，剩余 ${state.player.lives} 条命`);
              if (state.player.lives <= 0) endGame();
            }
          }

          if (enemy.y > HEIGHT + 40) enemy.dead = true;
        }

        state.bullets = state.bullets.filter((bullet) => !bullet.dead);
        state.enemies = state.enemies.filter((enemy) => !enemy.dead);
        state.particles.forEach((particle) => {
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;
          particle.vy += 80 * delta;
          particle.life -= delta;
        });
        state.particles = state.particles.filter((particle) => particle.life > 0);
      }

      draw();
      state.raf = requestAnimationFrame(update);
    }

    canvas.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      launch();
    });
    reset();
    mountTouch(directionTouch());
    return {
      start() {
        state.raf = requestAnimationFrame(update);
      },
      stop() {
        cancelAnimationFrame(state.raf);
      },
      action(action) {
        if (action in state.keys) state.keys[action] = true;
        if (action.endsWith("End")) {
          const key = action.slice(0, -3);
          if (key in state.keys) state.keys[key] = false;
        }
        launch();
      },
      handleKey(event) {
        const dir = keyDirection(event);
        if (dir) {
          state.keys[dir] = true;
          launch();
          return true;
        }
        if (event.key === " " || event.key === "Enter") {
          launch();
          return true;
        }
        return false;
      },
      handleKeyUp(event) {
        const dir = keyDirection(event);
        if (dir) state.keys[dir] = false;
        return false;
      }
    };
  }

  function createGomoku() {
    const SIZE = 620;
    const GRID = 15;
    const PADDING = 32;
    const STEP = (SIZE - PADDING * 2) / (GRID - 1);
    const { canvas, ctx } = createCanvas(SIZE, SIZE);
    const shell = document.createElement("div");
    shell.className = "gomoku-wrap";
    shell.innerHTML = `
      <div class="gomoku-tools">
        <button class="mini-toggle" id="gomokuMode" type="button">开启电脑对手</button>
        <button class="mini-toggle" id="gomokuUndo" type="button">↶ 悔棋</button>
      </div>
    `;
    gameStage.appendChild(shell);
    shell.appendChild(canvas);
    const modeButton = $("#gomokuMode", shell);
    const undoButton = $("#gomokuUndo", shell);
    const state = {
      board: Array.from({ length: GRID }, () => Array(GRID).fill(0)),
      player: 1,
      moves: 0,
      over: false,
      hover: null,
      winning: [],
      last: null,
      history: [],
      aiMode: false,
      aiTimer: 0
    };

    function updateStats() {
      setStats([
        { key: "turn", label: "当前", value: state.over ? "已结束" : state.player === 1 ? "● 黑方" : "○ 白方" },
        { key: "moves", label: "手数", value: state.moves },
        { key: "mode", label: "模式", value: state.aiMode ? "电脑执白" : "双人对战" }
      ]);
      undoButton.disabled = state.history.length === 0;
    }

    function reset() {
      clearTimeout(state.aiTimer);
      state.board = Array.from({ length: GRID }, () => Array(GRID).fill(0));
      state.player = 1;
      state.moves = 0;
      state.over = false;
      state.hover = null;
      state.winning = [];
      state.last = null;
      state.history = [];
      updateStats();
      draw();
    }

    function getPoint(event) {
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * SIZE;
      const y = ((event.clientY - rect.top) / rect.height) * SIZE;
      const col = Math.round((x - PADDING) / STEP);
      const row = Math.round((y - PADDING) / STEP);
      if (col < 0 || col >= GRID || row < 0 || row >= GRID) return null;
      const px = PADDING + col * STEP;
      const py = PADDING + row * STEP;
      if (Math.hypot(x - px, y - py) > STEP * 0.48) return null;
      return { row, col };
    }

    function lineFor(row, col, dr, dc, player) {
      const line = [{ row, col }];
      for (const sign of [-1, 1]) {
        for (let distance = 1; distance < 5; distance++) {
          const rr = row + dr * distance * sign;
          const cc = col + dc * distance * sign;
          if (rr < 0 || rr >= GRID || cc < 0 || cc >= GRID || state.board[rr][cc] !== player) break;
          line.push({ row: rr, col: cc });
        }
      }
      return line;
    }

    function snapshot() {
      return {
        board: state.board.map((row) => [...row]),
        player: state.player,
        moves: state.moves,
        over: state.over,
        winning: [...state.winning],
        last: state.last ? { ...state.last } : null
      };
    }

    function restore(saved) {
      state.board = saved.board;
      state.player = saved.player;
      state.moves = saved.moves;
      state.over = saved.over;
      state.winning = saved.winning;
      state.last = saved.last;
      state.hover = null;
      updateStats();
      draw();
    }

    function directionalScore(row, col, player, dr, dc) {
      let count = 1;
      let openEnds = 0;
      for (const sign of [-1, 1]) {
        for (let distance = 1; distance < 5; distance++) {
          const rr = row + dr * distance * sign;
          const cc = col + dc * distance * sign;
          if (rr < 0 || rr >= GRID || cc < 0 || cc >= GRID) break;
          if (state.board[rr][cc] === player) {
            count += 1;
          } else {
            if (!state.board[rr][cc]) openEnds += 1;
            break;
          }
        }
      }
      if (count >= 5) return 1_000_000;
      if (count === 4) return openEnds ? 80_000 : 8_000;
      if (count === 3) return openEnds === 2 ? 6_000 : openEnds ? 1_200 : 100;
      if (count === 2) return openEnds * 80;
      return 4 + openEnds;
    }

    function chooseAiMove() {
      const candidates = [];
      for (let row = 0; row < GRID; row++) {
        for (let col = 0; col < GRID; col++) {
          if (state.board[row][col]) continue;
          let nearby = false;
          for (let dy = -2; dy <= 2 && !nearby; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              const rr = row + dy;
              const cc = col + dx;
              if (rr >= 0 && rr < GRID && cc >= 0 && cc < GRID && state.board[rr][cc]) {
                nearby = true;
                break;
              }
            }
          }
          if (nearby || !state.moves) candidates.push({ row, col });
        }
      }
      if (!candidates.length) return null;

      for (const player of [2, 1]) {
        for (const { row, col } of candidates) {
          state.board[row][col] = player;
          const wins = [[1, 0], [0, 1], [1, 1], [1, -1]].some(([dr, dc]) => lineFor(row, col, dr, dc, player).length >= 5);
          state.board[row][col] = 0;
          if (wins) return { row, col };
        }
      }

      let bestScore = -Infinity;
      const bestMoves = [];
      const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
      candidates.forEach(({ row, col }) => {
        state.board[row][col] = 2;
        let attack = directions.reduce((sum, [dr, dc]) => sum + directionalScore(row, col, 2, dr, dc), 0);
        state.board[row][col] = 1;
        let defend = directions.reduce((sum, [dr, dc]) => sum + directionalScore(row, col, 1, dr, dc), 0);
        state.board[row][col] = 0;
        const center = 20 - (Math.abs(row - 7) + Math.abs(col - 7)) * 2;
        const score = attack * 1.18 + defend + center;
        if (score > bestScore) {
          bestScore = score;
          bestMoves.length = 0;
          bestMoves.push({ row, col });
        } else if (score === bestScore) {
          bestMoves.push({ row, col });
        }
      });
      return bestMoves[randomInt(0, bestMoves.length - 1)];
    }

    function scheduleAi() {
      clearTimeout(state.aiTimer);
      if (!state.aiMode || state.over || state.player !== 2) return;
      state.aiTimer = window.setTimeout(() => {
        if (state.over || state.player !== 2) return;
        const move = chooseAiMove();
        if (move) place(move.row, move.col);
      }, 320);
    }

    function place(row, col) {
      if (state.over || state.board[row][col]) return;
      state.history.push(snapshot());
      state.board[row][col] = state.player;
      state.moves += 1;
      state.last = { row, col };
      sound.play("click");

      const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
      for (const [dr, dc] of directions) {
        const line = lineFor(row, col, dr, dc, state.player);
        if (line.length >= 5) {
          state.over = true;
          state.winning = line;
          sound.play("win");
          announce(`${state.player === 1 ? "黑方" : "白方"}获胜`);
          break;
        }
      }

      if (!state.over && state.moves === GRID * GRID) {
        state.over = true;
        announce("棋盘已满，平局");
      }
      if (!state.over) state.player = state.player === 1 ? 2 : 1;
      updateStats();
      draw();
      scheduleAi();
    }

    function undoMove() {
      clearTimeout(state.aiTimer);
      if (!state.history.length) return;
      restore(state.history.pop());
      if (state.aiMode && state.player === 2 && state.history.length) {
        restore(state.history.pop());
      }
      sound.play("move");
    }

    function drawStone(row, col, player) {
      const cx = PADDING + col * STEP;
      const cy = PADDING + row * STEP;
      const radius = STEP * 0.4;
      const gradient = ctx.createRadialGradient(cx - radius * 0.38, cy - radius * 0.42, 1, cx, cy, radius);
      if (player === 1) {
        gradient.addColorStop(0, "#5b5960");
        gradient.addColorStop(0.45, "#201f24");
        gradient.addColorStop(1, "#050507");
      } else {
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(0.6, "#f4f1e8");
        gradient.addColorStop(1, "#beb9ae");
      }
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.shadowColor = "rgba(0,0,0,.35)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 3;
      ctx.fill();
      ctx.shadowColor = "transparent";
      ctx.strokeStyle = player === 1 ? "rgba(255,255,255,.18)" : "rgba(50,45,38,.2)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function draw() {
      const wood = ctx.createLinearGradient(0, 0, SIZE, SIZE);
      wood.addColorStop(0, "#d8bb83");
      wood.addColorStop(0.5, "#c9aa70");
      wood.addColorStop(1, "#b8975f");
      ctx.fillStyle = wood;
      ctx.fillRect(0, 0, SIZE, SIZE);

      ctx.strokeStyle = "rgba(66,49,27,.7)";
      ctx.lineWidth = 1.4;
      for (let i = 0; i < GRID; i++) {
        const point = PADDING + i * STEP;
        ctx.beginPath();
        ctx.moveTo(PADDING, point);
        ctx.lineTo(SIZE - PADDING, point);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(point, PADDING);
        ctx.lineTo(point, SIZE - PADDING);
        ctx.stroke();
      }

      ctx.fillStyle = "#4d3a22";
      [[3, 3], [11, 3], [7, 7], [3, 11], [11, 11]].forEach(([row, col]) => {
        ctx.beginPath();
        ctx.arc(PADDING + col * STEP, PADDING + row * STEP, 3.2, 0, Math.PI * 2);
        ctx.fill();
      });

      if (state.hover && !state.over && !state.board[state.hover.row][state.hover.col]) {
        const x = PADDING + state.hover.col * STEP;
        const y = PADDING + state.hover.row * STEP;
        ctx.beginPath();
        ctx.arc(x, y, STEP * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = state.player === 1 ? "rgba(15,14,18,.22)" : "rgba(255,255,255,.35)";
        ctx.fill();
      }

      state.board.forEach((row, y) => row.forEach((player, x) => {
        if (player) drawStone(y, x, player);
      }));

      if (state.last && !state.over) {
        const x = PADDING + state.last.col * STEP;
        const y = PADDING + state.last.row * STEP;
        ctx.strokeStyle = "#ff5d62";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, STEP * 0.13, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (state.winning.length) {
        state.winning.forEach(({ row, col }) => {
          ctx.beginPath();
          ctx.arc(PADDING + col * STEP, PADDING + row * STEP, STEP * 0.47, 0, Math.PI * 2);
          ctx.strokeStyle = "#c7ff4a";
          ctx.lineWidth = 3;
          ctx.stroke();
        });
        ctx.fillStyle = "rgba(30,25,18,.78)";
        roundedRect(ctx, SIZE / 2 - 135, SIZE / 2 - 32, 270, 64, 10);
        ctx.fill();
        ctx.fillStyle = "#c7ff4a";
        ctx.textAlign = "center";
        ctx.font = "800 22px 'Microsoft YaHei', sans-serif";
        ctx.fillText(`${state.winning.length ? (state.board[state.winning[0].row][state.winning[0].col] === 1 ? "黑方" : "白方") : ""}获胜！`, SIZE / 2, SIZE / 2 + 8);
      }
    }

    canvas.addEventListener("pointermove", (event) => {
      state.hover = getPoint(event);
      draw();
    });
    canvas.addEventListener("pointerleave", () => {
      state.hover = null;
      draw();
    });
    canvas.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      if (state.aiMode && state.player === 2) return;
      const point = getPoint(event);
      if (point) place(point.row, point.col);
    });
    modeButton.addEventListener("click", () => {
      state.aiMode = !state.aiMode;
      modeButton.textContent = state.aiMode ? "关闭电脑对手" : "开启电脑对手";
      modeButton.classList.toggle("active", state.aiMode);
      sound.play("click");
      reset();
      if (state.aiMode && !state.moves) announce("电脑执白，你执黑先手");
    });
    undoButton.addEventListener("click", undoMove);

    reset();
    emptyTouch();
    return {
      start() {
        reset();
      },
      stop() {
        clearTimeout(state.aiTimer);
      },
      action() {},
      handleKey(event) {
        if (event.key.toLowerCase() === "z") {
          undoMove();
          return true;
        }
        if (event.key.toLowerCase() === "m") {
          modeButton.click();
          return true;
        }
        return false;
      },
      handleKeyUp() {
        return false;
      }
    };
  }

  function createRps() {
    const hands = {
      rock: { icon: "✊", label: "石头" },
      paper: { icon: "✋", label: "布" },
      scissors: { icon: "✌️", label: "剪刀" }
    };
    const keys = { rock: "1", paper: "2", scissors: "3" };
    let scores = { player: 0, computer: 0, ties: 0 };
    let streak = 0;
    let bestStreak = Number(storage.get("best-streak:rps", 0)) || 0;
    let history = [];

    gameStage.innerHTML = `
      <div class="rps-shell">
        <div class="rps-player">
          <small>YOU</small>
          <div class="rps-hand" id="rpsPlayer">✊</div>
          <strong id="rpsPlayerScore">0</strong>
        </div>
        <div class="rps-versus">VS</div>
        <div class="rps-player">
          <small>CPU</small>
          <div class="rps-hand" id="rpsComputer">✊</div>
          <strong id="rpsComputerScore">0</strong>
        </div>
        <div class="rps-result" id="rpsResult">选择你的手势</div>
        <div class="rps-choices">
          <button class="rps-choice" type="button" data-choice="rock"><span>✊</span><b>石头 · 1</b></button>
          <button class="rps-choice" type="button" data-choice="paper"><span>✋</span><b>布 · 2</b></button>
          <button class="rps-choice" type="button" data-choice="scissors"><span>✌️</span><b>剪刀 · 3</b></button>
        </div>
        <div class="rps-history" id="rpsHistory">最近对局会出现在这里</div>
      </div>
    `;

    const result = $("#rpsResult");
    const playerHand = $("#rpsPlayer");
    const computerHand = $("#rpsComputer");
    const historyElement = $("#rpsHistory");
    const rpsShell = $(".rps-shell", gameStage);

    function updateStats() {
      setStats([
        { key: "wins", label: "胜局", value: scores.player },
        { key: "losses", label: "负局", value: scores.computer },
        { key: "ties", label: "平局", value: scores.ties },
        { key: "streak", label: "连胜", value: streak },
        { key: "beststreak", label: "最高连胜", value: bestStreak }
      ]);
    }

    function reset() {
      scores = { player: 0, computer: 0, ties: 0 };
      streak = 0;
      bestStreak = Number(storage.get("best-streak:rps", 0)) || 0;
      history = [];
      playerHand.textContent = "✊";
      computerHand.textContent = "✊";
      result.textContent = "选择你的手势";
      historyElement.textContent = "最近对局会出现在这里";
      updateStats();
    }

    function play(choice) {
      const choices = Object.keys(hands);
      const computer = choices[randomInt(0, 2)];
      playerHand.textContent = hands[choice].icon;
      computerHand.textContent = hands[computer].icon;
      rpsShell.classList.remove("dealing");
      void rpsShell.offsetWidth;
      rpsShell.classList.add("dealing");

      let outcome = "tie";
      if (
        (choice === "rock" && computer === "scissors") ||
        (choice === "paper" && computer === "rock") ||
        (choice === "scissors" && computer === "paper")
      ) outcome = "win";
      if (
        (choice === "rock" && computer === "paper") ||
        (choice === "paper" && computer === "scissors") ||
        (choice === "scissors" && computer === "rock")
      ) outcome = "lose";

      if (outcome === "win") {
        scores.player += 1;
        streak += 1;
        bestStreak = Math.max(bestStreak, streak);
        storage.set("best-streak:rps", bestStreak);
        result.textContent = "你赢了！";
        result.style.color = "#c7ff4a";
        sound.play("win");
      } else if (outcome === "lose") {
        scores.computer += 1;
        streak = 0;
        result.textContent = "电脑赢了";
        result.style.color = "#ff7a70";
        sound.play("hit");
      } else {
        scores.ties += 1;
        result.textContent = "平手，再来";
        result.style.color = "#f7df58";
        sound.play("click");
      }

      history.unshift(`${hands[choice].label} vs ${hands[computer].label} · ${outcome === "win" ? "胜" : outcome === "lose" ? "负" : "平"}`);
      history = history.slice(0, 6);
      historyElement.textContent = history.join("　");
      $("#rpsPlayerScore").textContent = scores.player;
      $("#rpsComputerScore").textContent = scores.computer;
      updateStats();
      announce(result.textContent);
    }

    $$("[data-choice]", gameStage).forEach((button) => {
      button.addEventListener("click", () => play(button.dataset.choice));
    });

    reset();
    return {
      start() {
        updateStats();
      },
      stop() {},
      action() {},
      handleKey(event) {
        const choice = Object.keys(keys).find((key) => keys[key] === event.key);
        if (!choice) return false;
        play(choice);
        return true;
      },
      handleKeyUp() {
        return false;
      }
    };
  }

  function createMinesweeper() {
    const ROWS = 9;
    const COLS = 9;
    const MINE_COUNT = 10;
    gameStage.innerHTML = `
      <div class="mines-shell">
        <div class="mines-toolbar">
          <button class="mini-toggle" id="minesFlagMode" type="button" aria-pressed="false">
            <span>⚑</span> 插旗模式
          </button>
          <span class="mines-legend"><i class="mine-dot"></i> 首次点击安全</span>
        </div>
        <div class="mines-board" id="minesBoard" style="--mines-cols:${COLS}" role="grid" aria-label="扫雷棋盘"></div>
        <p class="mines-message" id="minesMessage">翻开第一格，计时将自动开始</p>
      </div>
    `;
    const boardElement = $("#minesBoard");
    const flagModeButton = $("#minesFlagMode");
    const message = $("#minesMessage");
    let cells = [];
    let started = false;
    let over = false;
    let won = false;
    let flags = 0;
    let seconds = 0;
    let flagMode = false;
    let timer = 0;
    let best = Number(storage.get("best-time:mines", 0)) || 0;

    function updateStats() {
      setStats([
        { key: "mines", label: "剩余", value: Math.max(0, MINE_COUNT - flags) },
        { key: "time", label: "时间", value: `${String(seconds).padStart(2, "0")}s` },
        { key: "best", label: "最快", value: best ? `${best}s` : "--" }
      ]);
    }

    function neighbors(row, col) {
      const result = [];
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const rr = row + dy;
          const cc = col + dx;
          if (rr >= 0 && rr < ROWS && cc >= 0 && cc < COLS) result.push([rr, cc]);
        }
      }
      return result;
    }

    function startTimer() {
      if (started) return;
      started = true;
      message.textContent = "小心推断，每一格都可能藏着地雷";
      timer = window.setInterval(() => {
        seconds += 1;
        setStat("time", `${String(seconds).padStart(2, "0")}s`);
      }, 1000);
    }

    function placeMines(safeRow, safeCol) {
      const safe = new Set([`${safeRow},${safeCol}`]);
      neighbors(safeRow, safeCol).forEach(([row, col]) => safe.add(`${row},${col}`));
      const available = [];
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          if (!safe.has(`${row},${col}`)) available.push([row, col]);
        }
      }
      for (let i = available.length - 1; i > 0; i--) {
        const j = randomInt(0, i);
        [available[i], available[j]] = [available[j], available[i]];
      }
      available.slice(0, MINE_COUNT).forEach(([row, col]) => {
        cells[row][col].mine = true;
      });
      cells.forEach((row, r) => row.forEach((cell, c) => {
        cell.adjacent = neighbors(r, c).filter(([rr, cc]) => cells[rr][cc].mine).length;
      }));
    }

    function render() {
      boardElement.innerHTML = cells.flatMap((row, r) => row.map((cell, c) => {
        let content = "";
        let className = "mine-cell";
        if (cell.flagged && !cell.revealed) {
          content = "⚑";
          className += " flagged";
        } else if (cell.revealed) {
          className += " revealed";
          if (cell.mine) {
            content = "✹";
            className += " exploded";
          } else if (cell.adjacent) {
            content = cell.adjacent;
            className += ` adjacent-${cell.adjacent}`;
          }
        }
        const label = cell.flagged ? "已插旗" : cell.revealed
          ? cell.mine ? "地雷" : `周围有 ${cell.adjacent} 个地雷`
          : "未翻开";
        return `<button class="${className}" type="button" role="gridcell" data-row="${r}" data-col="${c}" aria-label="第 ${r + 1} 行第 ${c + 1} 列，${label}">${content}</button>`;
      })).join("");
    }

    function finish(isWin) {
      over = true;
      won = isWin;
      clearInterval(timer);
      flagMode = false;
      flagModeButton.classList.remove("active");
      flagModeButton.setAttribute("aria-pressed", "false");
      if (isWin) {
        if (!best || seconds < best) {
          best = seconds;
          storage.set("best-time:mines", best);
        }
        cells.forEach((row) => row.forEach((cell) => {
          if (cell.mine) cell.flagged = true;
        }));
        flags = MINE_COUNT;
        message.textContent = `雷区清理完成 · 用时 ${seconds} 秒`;
        sound.play("win");
        announce(`扫雷成功，用时 ${seconds} 秒`);
      } else {
        cells.forEach((row) => row.forEach((cell) => {
          if (cell.mine) cell.revealed = true;
        }));
        message.textContent = "踩到地雷了 · 点击“重开”再试一次";
        sound.play("lose");
        announce("踩到地雷，游戏结束");
      }
      updateStats();
      render();
    }

    function checkWin() {
      const safeRevealed = cells.every((row) => row.every((cell) => cell.mine || cell.revealed));
      if (safeRevealed) finish(true);
    }

    function reveal(row, col) {
      if (over || cells[row][col].flagged || cells[row][col].revealed) return;
      startTimer();
      if (cells[row][col].mine) {
        cells[row][col].revealed = true;
        finish(false);
        return;
      }
      const queue = [[row, col]];
      while (queue.length) {
        const [r, c] = queue.pop();
        const cell = cells[r][c];
        if (cell.revealed || cell.flagged) continue;
        cell.revealed = true;
        if (cell.adjacent === 0) {
          neighbors(r, c).forEach(([rr, cc]) => {
            if (!cells[rr][cc].revealed && !cells[rr][cc].flagged) queue.push([rr, cc]);
          });
        }
      }
      sound.play("click");
      render();
      updateStats();
      checkWin();
    }

    function toggleFlag(row, col) {
      if (over || cells[row][col].revealed) return;
      const cell = cells[row][col];
      if (!cell.flagged && flags >= MINE_COUNT) {
        message.textContent = "旗子已经用完了，可以先取消一面旗";
        return;
      }
      cell.flagged = !cell.flagged;
      flags += cell.flagged ? 1 : -1;
      sound.play("move");
      render();
      updateStats();
    }

    function reset() {
      clearInterval(timer);
      started = false;
      over = false;
      won = false;
      flags = 0;
      seconds = 0;
      flagMode = false;
      cells = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => ({
        mine: false,
        flagged: false,
        revealed: false,
        adjacent: 0
      })));
      flagModeButton.classList.remove("active");
      flagModeButton.setAttribute("aria-pressed", "false");
      message.textContent = "翻开第一格，计时将自动开始";
      updateStats();
      render();
    }

    boardElement.addEventListener("click", (event) => {
      const button = event.target.closest("[data-row]");
      if (!button) return;
      const row = Number(button.dataset.row);
      const col = Number(button.dataset.col);
      if (!started && !over) placeMines(row, col);
      if (flagMode) toggleFlag(row, col);
      else reveal(row, col);
    });

    boardElement.addEventListener("contextmenu", (event) => {
      const button = event.target.closest("[data-row]");
      if (!button) return;
      event.preventDefault();
      if (!started && !over) placeMines(Number(button.dataset.row), Number(button.dataset.col));
      toggleFlag(Number(button.dataset.row), Number(button.dataset.col));
    });

    flagModeButton.addEventListener("click", () => {
      flagMode = !flagMode;
      flagModeButton.classList.toggle("active", flagMode);
      flagModeButton.setAttribute("aria-pressed", String(flagMode));
      sound.play("click");
    });

    reset();
    emptyTouch();
    return {
      start() {},
      stop() {
        clearInterval(timer);
      },
      action() {},
      handleKey(event) {
        if (event.key.toLowerCase() === "f") {
          flagModeButton.click();
          return true;
        }
        return false;
      },
      handleKeyUp() {
        return false;
      }
    };
  }

  function createMemory() {
    const SYMBOLS = ["🚀", "👾", "🕹️", "⭐", "🌈", "🔮", "🎲", "🎧"];
    gameStage.innerHTML = `
      <div class="memory-shell">
        <div class="memory-heading">
          <span>找到全部 8 组图案</span>
          <strong id="memoryPairs">0 / 8</strong>
        </div>
        <div class="memory-grid" id="memoryGrid" aria-label="记忆翻牌棋盘"></div>
        <p class="memory-message" id="memoryMessage">翻出第一张牌，计时开始</p>
      </div>
    `;
    const grid = $("#memoryGrid");
    const message = $("#memoryMessage");
    let deck = [];
    let flipped = [];
    let matched = new Set();
    let moves = 0;
    let seconds = 0;
    let started = false;
    let locked = false;
    let over = false;
    let timer = 0;
    let flipTimeout = 0;
    let bestMoves = Number(storage.get("best-moves:memory", 0)) || 0;

    function updateStats() {
      setStats([
        { key: "pairs", label: "配对", value: `${matched.size / 2} / 8` },
        { key: "moves", label: "步数", value: moves },
        { key: "time", label: "时间", value: `${String(seconds).padStart(2, "0")}s` },
        { key: "best", label: "最佳步数", value: bestMoves || "--" }
      ]);
      $("#memoryPairs").textContent = `${matched.size / 2} / 8`;
    }

    function startTimer() {
      if (started) return;
      started = true;
      message.textContent = "记住每张牌的位置";
      timer = window.setInterval(() => {
        seconds += 1;
        setStat("time", `${String(seconds).padStart(2, "0")}s`);
      }, 1000);
    }

    function render() {
      grid.innerHTML = deck.map((symbol, index) => {
        const isFlipped = flipped.includes(index) || matched.has(index);
        return `
          <button class="memory-card${isFlipped ? " flipped" : ""}${matched.has(index) ? " matched" : ""}"
            type="button" data-card="${index}" aria-label="${isFlipped ? symbol : "未翻开的卡牌"}">
            <span class="memory-card-inner">
              <span class="memory-card-back"><b>?</b><i></i></span>
              <span class="memory-card-front">${symbol}</span>
            </span>
          </button>
        `;
      }).join("");
    }

    function finish() {
      over = true;
      clearInterval(timer);
      if (!bestMoves || moves < bestMoves) {
        bestMoves = moves;
        storage.set("best-moves:memory", bestMoves);
      }
      message.textContent = `全部配对完成 · ${moves} 步 · ${seconds} 秒`;
      sound.play("win");
      updateStats();
      announce(`记忆翻牌完成，共 ${moves} 步`);
    }

    function selectCard(index) {
      if (locked || over || matched.has(index) || flipped.includes(index)) return;
      startTimer();
      flipped.push(index);
      sound.play("click");
      render();
      if (flipped.length < 2) return;

      locked = true;
      moves += 1;
      setStat("moves", moves);
      const [first, second] = flipped;
      if (deck[first] === deck[second]) {
        matched.add(first);
        matched.add(second);
        flipped = [];
        locked = false;
        sound.play("merge");
        updateStats();
        render();
        if (matched.size === deck.length) finish();
      } else {
        flipTimeout = window.setTimeout(() => {
          flipped = [];
          locked = false;
          render();
        }, 720);
      }
    }

    function reset() {
      clearInterval(timer);
      clearTimeout(flipTimeout);
      deck = [...SYMBOLS, ...SYMBOLS].sort(() => Math.random() - 0.5);
      flipped = [];
      matched = new Set();
      moves = 0;
      seconds = 0;
      started = false;
      locked = false;
      over = false;
      message.textContent = "翻出第一张牌，计时开始";
      updateStats();
      render();
    }

    grid.addEventListener("click", (event) => {
      const card = event.target.closest("[data-card]");
      if (card) selectCard(Number(card.dataset.card));
    });

    reset();
    emptyTouch();
    return {
      start() {},
      stop() {
        clearInterval(timer);
        clearTimeout(flipTimeout);
      },
      action() {},
      handleKey() {
        return false;
      },
      handleKeyUp() {
        return false;
      }
    };
  }

  function createWhack() {
    gameStage.innerHTML = `
      <div class="whack-shell" id="whackShell">
        <div class="whack-overlay" id="whackOverlay">
          <span class="whack-kicker">30 SECOND SPRINT</span>
          <strong>准备好了吗？</strong>
          <p>点击冒头的地鼠，连击越高分数越多。</p>
          <button class="whack-start" id="whackStart" type="button">开始挑战</button>
        </div>
        <div class="whack-grid" id="whackGrid" aria-label="打地鼠九宫格">
          ${Array.from({ length: 9 }, (_, index) => `
            <button class="whack-hole" type="button" data-hole="${index}" aria-label="第 ${index + 1} 个洞口">
              <span class="whack-shadow"></span>
              <span class="whack-mole">
                <i class="mole-eye left"></i><i class="mole-eye right"></i><b class="mole-nose"></b>
                <span class="mole-badge"></span>
              </span>
              <span class="hole-front"></span>
            </button>
          `).join("")}
        </div>
        <div class="whack-combo" id="whackCombo" aria-live="polite"></div>
      </div>
    `;
    const shell = $("#whackShell");
    const overlay = $("#whackOverlay");
    const grid = $("#whackGrid");
    const comboLabel = $("#whackCombo");
    let running = false;
    let score = 0;
    let remaining = 30;
    let combo = 0;
    let maxCombo = 0;
    let best = getBest("whack");
    let active = new Map();
    let spawnTimer = 0;
    let clockTimer = 0;

    function updateStats() {
      setStats([
        { key: "score", label: "分数", value: score },
        { key: "time", label: "剩余", value: `${remaining}s` },
        { key: "combo", label: "连击", value: combo },
        { key: "best", label: "最高", value: best }
      ]);
    }

    function clearHoles() {
      active.forEach((timeout) => clearTimeout(timeout));
      active.clear();
      $$(".whack-hole", grid).forEach((hole) => {
        hole.classList.remove("up", "normal", "golden", "bomb", "hit");
      });
    }

    function hideHole(index) {
      const hole = grid.querySelector(`[data-hole="${index}"]`);
      if (!hole) return;
      hole.classList.remove("up");
      window.setTimeout(() => hole.classList.remove("normal", "golden", "bomb", "hit"), 190);
      active.delete(index);
    }

    function spawnMole() {
      if (!running) return;
      const free = Array.from({ length: 9 }, (_, index) => index).filter((index) => !active.has(index));
      if (!free.length) return;
      const index = free[randomInt(0, free.length - 1)];
      const roll = Math.random();
      const type = roll < 0.12 ? "bomb" : roll < 0.23 ? "golden" : "normal";
      const hole = grid.querySelector(`[data-hole="${index}"]`);
      hole.classList.remove("normal", "golden", "bomb", "hit");
      hole.classList.add(type, "up");
      const lifetime = type === "golden" ? 560 : 720;
      const timeout = window.setTimeout(() => {
        if (active.get(index)) {
          hideHole(index);
          if (type !== "bomb") {
            combo = 0;
            setStat("combo", combo);
          }
        }
      }, lifetime);
      active.set(index, timeout);
    }

    function showCombo(text, color) {
      comboLabel.textContent = text;
      comboLabel.style.color = color;
      comboLabel.classList.remove("show");
      void comboLabel.offsetWidth;
      comboLabel.classList.add("show");
    }

    function hitHole(index) {
      if (!running || !active.has(index)) return;
      const hole = grid.querySelector(`[data-hole="${index}"]`);
      const type = hole.classList.contains("bomb") ? "bomb" : hole.classList.contains("golden") ? "golden" : "normal";
      clearTimeout(active.get(index));
      active.delete(index);
      hole.classList.add("hit");
      hole.classList.remove("up");

      if (type === "bomb") {
        score = Math.max(0, score - 25);
        combo = 0;
        shell.classList.remove("shake");
        void shell.offsetWidth;
        shell.classList.add("shake");
        showCombo("-25  炸弹！", "#ff7168");
        sound.play("hit");
      } else {
        combo += 1;
        maxCombo = Math.max(maxCombo, combo);
        const base = type === "golden" ? 30 : 10;
        const points = base + Math.min(30, (combo - 1) * 2);
        score += points;
        showCombo(`+${points}${type === "golden" ? "  金色地鼠！" : combo >= 3 ? `  x${combo} 连击` : ""}`, type === "golden" ? "#ffd84f" : "#c7ff4a");
        sound.play(type === "golden" ? "win" : "eat");
      }
      updateStats();
    }

    function finish() {
      running = false;
      clearInterval(spawnTimer);
      clearInterval(clockTimer);
      clearHoles();
      best = Math.max(best, score);
      setBest("whack", score);
      overlay.classList.remove("hidden");
      overlay.innerHTML = `
        <span class="whack-kicker">TIME IS UP</span>
        <strong>${score} 分</strong>
        <p>最高连击 ${maxCombo} · 历史最高 ${best} 分</p>
        <button class="whack-start" id="whackStart" type="button">再来一局</button>
      `;
      $("#whackStart").addEventListener("click", startRound);
      updateStats();
      sound.play("win");
      announce(`时间到，得分 ${score}`);
    }

    function startRound() {
      clearInterval(spawnTimer);
      clearInterval(clockTimer);
      clearHoles();
      running = true;
      score = 0;
      remaining = 30;
      combo = 0;
      maxCombo = 0;
      best = getBest("whack");
      overlay.classList.add("hidden");
      updateStats();
      sound.play("win");
      spawnMole();
      spawnTimer = window.setInterval(() => {
        spawnMole();
        if (Math.random() < 0.28) window.setTimeout(spawnMole, 100);
      }, 660);
      clockTimer = window.setInterval(() => {
        remaining = Math.max(0, remaining - 1);
        setStat("time", `${remaining}s`);
        if (remaining <= 0) finish();
      }, 1000);
    }

    grid.addEventListener("click", (event) => {
      const hole = event.target.closest("[data-hole]");
      if (hole) hitHole(Number(hole.dataset.hole));
    });
    $("#whackStart").addEventListener("click", startRound);

    updateStats();
    emptyTouch();
    return {
      start() {},
      stop() {
        running = false;
        clearInterval(spawnTimer);
        clearInterval(clockTimer);
        clearHoles();
      },
      action(action) {
        if (action === "start") startRound();
      },
      handleKey(event) {
        if (event.key === " " || event.key === "Enter") {
          if (!running) startRound();
          return true;
        }
        const index = Number(event.key) - 1;
        if (index >= 0 && index < 9) {
          hitHole(index);
          return true;
        }
        return false;
      },
      handleKeyUp() {
        return false;
      }
    };
  }

  function createTicTacToe() {
    gameStage.innerHTML = `
      <div class="ttt-shell">
        <div class="ttt-mode" role="group" aria-label="井字棋模式">
          <button class="mini-toggle active" type="button" data-ttt-mode="ai">人机对战</button>
          <button class="mini-toggle" type="button" data-ttt-mode="local">同屏双人</button>
        </div>
        <div class="ttt-status" id="tttStatus">轮到你落子</div>
        <div class="ttt-board" id="tttBoard" role="grid" aria-label="井字棋棋盘">
          ${Array.from({ length: 9 }, (_, index) => `
            <button class="ttt-cell" type="button" data-cell="${index}" aria-label="第 ${index + 1} 格"></button>
          `).join("")}
        </div>
        <p class="ttt-message">X 先手 · 先连成一线者获胜</p>
      </div>
    `;
    const boardElement = $("#tttBoard");
    const statusElement = $("#tttStatus");
    let board = Array(9).fill("");
    let aiMode = true;
    let turn = "X";
    let over = false;
    let wins = 0;
    let losses = 0;
    let draws = 0;
    let aiTimer = 0;

    function updateStats() {
      setStats([
        { key: "mode", label: "模式", value: aiMode ? "电脑" : "双人" },
        { key: "wins", label: "胜", value: wins },
        { key: "losses", label: "负", value: losses },
        { key: "draws", label: "和", value: draws }
      ]);
    }

    function winner(current) {
      const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
      for (const line of lines) {
        if (current[line[0]] && current[line[0]] === current[line[1]] && current[line[0]] === current[line[2]]) {
          return { player: current[line[0]], line };
        }
      }
      return current.every(Boolean) ? { player: "draw", line: [] } : null;
    }

    function minimax(current, maximizing) {
      const result = winner(current);
      if (result?.player === "O") return 10;
      if (result?.player === "X") return -10;
      if (result?.player === "draw") return 0;
      if (maximizing) {
        let bestScore = -Infinity;
        current.forEach((value, index) => {
          if (value) return;
          current[index] = "O";
          bestScore = Math.max(bestScore, minimax(current, false));
          current[index] = "";
        });
        return bestScore;
      }
      let bestScore = Infinity;
      current.forEach((value, index) => {
        if (value) return;
        current[index] = "X";
        bestScore = Math.min(bestScore, minimax(current, true));
        current[index] = "";
      });
      return bestScore;
    }

    function bestAiMove() {
      let bestScore = -Infinity;
      let choices = [];
      board.forEach((value, index) => {
        if (value) return;
        board[index] = "O";
        const score = minimax(board, false);
        board[index] = "";
        if (score > bestScore) {
          bestScore = score;
          choices = [index];
        } else if (score === bestScore) {
          choices.push(index);
        }
      });
      return choices[randomInt(0, choices.length - 1)];
    }

    function renderBoard(winningLine = []) {
      $$(".ttt-cell", boardElement).forEach((cell, index) => {
        cell.textContent = board[index];
        cell.className = `ttt-cell${board[index] ? ` ${board[index].toLowerCase()}` : ""}${winningLine.includes(index) ? " winning" : ""}`;
        cell.disabled = Boolean(board[index]) || over;
        cell.setAttribute("aria-label", `第 ${index + 1} 格${board[index] ? `，${board[index]}` : "，空"}`);
      });
    }

    function endRound(result) {
      over = true;
      if (result.player === "X") {
        wins += 1;
        statusElement.textContent = aiMode ? "你赢了！" : "X 获胜";
        sound.play("win");
      } else if (result.player === "O") {
        losses += 1;
        statusElement.textContent = aiMode ? "电脑获胜" : "O 获胜";
        sound.play("lose");
      } else {
        draws += 1;
        statusElement.textContent = "平局";
      }
      renderBoard(result.line);
      updateStats();
      announce(statusElement.textContent);
    }

    function place(index, mark) {
      if (over || board[index]) return false;
      board[index] = mark;
      const result = winner(board);
      if (result) {
        endRound(result);
        return true;
      }
      turn = mark === "X" ? "O" : "X";
      statusElement.textContent = aiMode && turn === "O" ? "电脑思考中…" : aiMode ? "轮到你落子" : `轮到 ${turn} 落子`;
      renderBoard();
      return true;
    }

    function handleCell(index) {
      if (over || (aiMode && turn !== "X")) return;
      if (!place(index, turn)) return;
      sound.play("click");
      if (aiMode && !over && turn === "O") {
        clearTimeout(aiTimer);
        aiTimer = window.setTimeout(() => {
          if (over) return;
          place(bestAiMove(), "O");
          sound.play("move");
        }, 360);
      }
    }

    function resetRound() {
      clearTimeout(aiTimer);
      board = Array(9).fill("");
      turn = "X";
      over = false;
      statusElement.textContent = aiMode ? "轮到你落子" : "轮到 X 落子";
      renderBoard();
      updateStats();
    }

    boardElement.addEventListener("click", (event) => {
      const cell = event.target.closest("[data-cell]");
      if (cell) handleCell(Number(cell.dataset.cell));
    });

    $$("[data-ttt-mode]", gameStage).forEach((button) => {
      button.addEventListener("click", () => {
        aiMode = button.dataset.tttMode === "ai";
        $$("[data-ttt-mode]", gameStage).forEach((item) => item.classList.toggle("active", item === button));
        sound.play("click");
        resetRound();
      });
    });

    resetRound();
    emptyTouch();
    return {
      start() {},
      stop() {
        clearTimeout(aiTimer);
      },
      action() {},
      handleKey(event) {
        const index = Number(event.key) - 1;
        if (index >= 0 && index < 9) {
          handleCell(index);
          return true;
        }
        return false;
      },
      handleKeyUp() {
        return false;
      }
    };
  }

  renderGameCards();

  const featuredIdOrder = ["2048", "minesweeper", "snake", "memory", "plane", "gomoku", "tetris", "whack", "ball", "tictactoe", "flappy", "rps"];
  let featuredPosition = 0;
  let featuredTimer = 0;

  function renderFeaturedGame(index, restartProgress = true) {
    featuredPosition = (index + featuredIdOrder.length) % featuredIdOrder.length;
    const game = GAME_META.find((item) => item.id === featuredIdOrder[featuredPosition]);
    const card = $("#featuredCard");
    $("#featuredIcon").textContent = game.icon;
    $("#featuredTitle").textContent = game.title;
    $("#featuredCategory").textContent = game.categoryLabel;
    $("#featuredDescription").textContent = game.description;
    $("#featuredIndex").textContent = `${String(featuredPosition + 1).padStart(2, "0")} / ${String(featuredIdOrder.length).padStart(2, "0")}`;
    card.style.setProperty("--feature-color", game.bg);
    card.dataset.game = game.id;
    const progress = $("#featuredProgress");
    progress.classList.remove("animate");
    if (restartProgress) {
      void progress.offsetWidth;
      progress.classList.add("animate");
    }
    clearTimeout(featuredTimer);
    featuredTimer = window.setTimeout(() => renderFeaturedGame(featuredPosition + 1), 4500);
  }

  $("#featuredCard").addEventListener("click", (event) => {
    const id = event.currentTarget.dataset.game;
    if (id) openGame(id, event.currentTarget);
  });

  renderFeaturedGame(0);

  gameGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-game]");
    if (!card) return;
    sound.unlock();
    sound.play("click");
    openGame(card.dataset.game, card);
  });

  $$(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      $$(".filter-button").forEach((item) => item.classList.toggle("active", item === button));
      $$(".game-card").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });

  $("#randomGame").addEventListener("click", (event) => {
    const game = GAME_META[randomInt(0, GAME_META.length - 1)];
    openGame(game.id, event.currentTarget);
    showToast(`随机落点：${game.title}`);
  });

  $("#gameClose").addEventListener("click", closeGame);
  $("#gameBack").addEventListener("click", closeGame);
  $("#gameRestart").addEventListener("click", restartGame);
  gameModal.addEventListener("pointerdown", (event) => {
    if (event.target === gameModal) closeGame();
  });

  $("#backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const soundToggle = $("#soundToggle");
  function updateSoundButton() {
    soundToggle.classList.toggle("muted", !sound.enabled);
    soundToggle.setAttribute("aria-pressed", String(sound.enabled));
    soundToggle.setAttribute("aria-label", sound.enabled ? "关闭音效" : "开启音效");
  }
  updateSoundButton();
  soundToggle.addEventListener("click", () => {
    sound.enabled = !sound.enabled;
    storage.set("sound", sound.enabled);
    updateSoundButton();
    if (sound.enabled) sound.play("win");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && gameModal.classList.contains("open")) {
      event.preventDefault();
      closeGame();
      return;
    }
    if (gameModal.classList.contains("open") && activeGame?.handleKey?.(event)) {
      event.preventDefault();
    }
  });

  document.addEventListener("keyup", (event) => {
    if (gameModal.classList.contains("open")) activeGame?.handleKeyUp?.(event);
  });

  document.addEventListener("pointerdown", () => sound.unlock(), { once: true });
})();
