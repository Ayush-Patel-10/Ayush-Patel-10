import { motion } from 'framer-motion'

const C = { a: '#58a6ff', g: '#56d364', o: '#ffa657', p: '#d2a8ff', r: '#ff7b72', dim: '#3a4658', txt: '#e6edf3', mut: '#8b98a8', panel: '#161b22', bg2: '#0f141b' }
const FONT = 'system-ui, -apple-system, "Segoe UI", sans-serif'
const spring = { type: 'spring', stiffness: 70, damping: 15 }

const T = ({ x, y, children, size = 12, fill = C.txt, anchor = 'middle', weight = 600 }) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill} fontWeight={weight} fontFamily={FONT}>{children}</text>
)
const Svg = ({ children, label }) => (
  <svg viewBox="0 0 520 290" className="scene" role="presentation" aria-hidden="true" focusable="false">{children}</svg>
)
const Box = ({ x, y, w = 92, h = 44, label, sub, on, color = C.a }) => (
  <g>
    <motion.rect x={x} y={y} width={w} height={h} rx="10" fill={C.panel} initial={false}
      animate={{ stroke: on ? color : C.dim, strokeWidth: on ? 2.5 : 1.5 }} transition={{ duration: 0.3 }} />
    <T x={x + w / 2} y={y + h / 2 + (sub ? -2 : 4)} fill={on ? '#fff' : C.mut}>{label}</T>
    {sub && <T x={x + w / 2} y={y + h / 2 + 12} size={10.5} weight={500} fill={on ? color : C.mut}>{sub}</T>}
  </g>
)
// Elements in per-step scenes fade and rise in when the step mounts.
const In = ({ children, delay = 0, y = 10, x = 0 }) => (
  <motion.g initial={{ opacity: 0, y, x }} animate={{ opacity: 1, y: 0, x: 0 }} transition={{ delay, duration: 0.5, ease: 'easeOut' }}>{children}</motion.g>
)
const Line = ({ x1, y1, x2, y2, on, color = C.a, w = 2, dash }) => (
  <motion.line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round" initial={false} animate={{ stroke: on ? color : C.dim }} transition={{ duration: 0.4 }} />
)
const Draw = ({ d, delay = 0, color = C.a, w = 2, dash }) => (
  <motion.path d={d} fill="none" stroke={color} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay, duration: 0.7, ease: 'easeInOut' }} />
)

/* ---------------- Anemos ---------------- */
export function AnemosScene({ step }) {
  const nodes = [
    { l: 'Data', s: 'features' }, { l: 'Train', s: 'Kubeflow · GKE' }, { l: 'Deploy', s: 'Terraform CI/CD' },
    { l: 'Serve', s: 'Vertex AI' }, { l: 'Monitor', s: 'drift checks' },
  ]
  const x = (i) => 14 + i * 100, w = 92, y = 110
  return (
    <Svg>
      <path d={`M${x(4) + w / 2} ${y + 46} C ${x(4) + w / 2} 250 ${x(1) + w / 2} 250 ${x(1) + w / 2} ${y + 46}`} fill="none" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" stroke={step === 4 ? C.o : C.dim} className={step === 4 ? 'march' : ''} />
      <T x={260} y={246} size={11} fill={step === 4 ? C.o : C.dim}>drift detected, retrain</T>
      {nodes.slice(0, -1).map((_, i) => <Line key={i} x1={x(i) + w} y1={y + 22} x2={x(i + 1)} y2={y + 22} on={step > i} />)}
      {nodes.map((n, i) => <Box key={n.l} x={x(i)} y={y} w={w} label={n.l} sub={n.s} on={step === i} color={i === 4 ? C.o : C.a} />)}
      <motion.circle r="8" fill={C.g} initial={false} animate={{ cx: x(step) + w / 2, cy: y - 22 }} transition={spring} />
      <T x={260} y={60} size={11} fill={C.mut} weight={500}>a model moving through the platform</T>
    </Svg>
  )
}

/* ---------------- Dynamic pricing ---------------- */
const rnd = (() => { let s = 11; return () => (s = (s * 16807) % 2147483647) / 2147483647 })()
const N = 18
const scatter = Array.from({ length: N }, () => ({ x: 30 + rnd() * 460, y: 40 + rnd() * 200 }))
const gx = [100, 260, 420]
const grouped = Array.from({ length: N }, (_, i) => { const g = i % 3, k = Math.floor(i / 3); return { x: gx[g] - 26 + (k % 3) * 26, y: 145 + Math.floor(k / 3) * 26 } })
const split = Array.from({ length: N }, (_, i) => { const side = i % 2, k = Math.floor(i / 2); return { x: (side ? 310 : 70) + (k % 3) * 50, y: 125 + Math.floor(k / 3) * 42 } })
const gcol = [C.a, C.g, C.o]

export function PricingScene({ step }) {
  return (
    <Svg>
      {step === 1 || step === 2 ? gx.map((cx, g) => (
        <In key={g} delay={0.3 + g * 0.1}><T x={cx} y={222} size={11} fill={gcol[g]}>{['most sensitive', 'in between', 'least sensitive'][g]}</T></In>
      )) : null}
      {step === 2 && gx.map((cx, g) => (
        <In key={g} delay={0.2 + g * 0.15} y={-8}>
          <rect x={cx - 38} y={80} width="76" height="26" rx="13" fill="none" stroke={gcol[g]} strokeWidth="2" />
          <T x={cx} y={97} size={11} fill={gcol[g]}>incentive</T>
          <path d={`M${cx} 108 V 128`} stroke={gcol[g]} strokeWidth="2" strokeDasharray="3 4" />
        </In>
      ))}
      {step === 3 && [[40, 'Control', '#6b7686'], [280, 'Treatment', C.g]].map(([bx, lab, col]) => (
        <In key={lab}>
          <rect x={bx} y={70} width="200" height="185" rx="14" fill="none" stroke={col} strokeWidth="1.5" strokeDasharray="5 5" />
          <T x={bx + 100} y={62} size={12} fill={col}>{lab}</T>
        </In>
      ))}
      {step === 4 && (
        <g>
          <line x1="90" y1="250" x2="440" y2="250" stroke={C.dim} strokeWidth="2" />
          <T x={90} y={56} size={12} fill={C.mut} anchor="start">margin</T>
          {[[130, 60, '#6b7686', 'Control'], [320, 118, C.g, 'Treatment']].map(([bx, h, col, lab], i) => (
            <g key={lab}>
              <motion.rect x={bx} width="80" rx="8" fill={col} initial={{ y: 250, height: 0 }} animate={{ y: 250 - h, height: h }} transition={{ delay: 0.2 + i * 0.35, duration: 0.9, ease: 'easeOut' }} />
              <T x={bx + 40} y={272} size={12} fill={col}>{lab}</T>
            </g>
          ))}
        </g>
      )}
      {scatter.map((p, i) => {
        const pos = step === 0 ? p : step <= 2 ? grouped[i] : split[i]
        const col = step === 0 ? '#6b7686' : step <= 2 ? gcol[i % 3] : i % 2 ? C.g : '#6b7686'
        return <motion.circle key={i} r="9" initial={false} animate={{ cx: pos.x, cy: pos.y, fill: col, opacity: step === 4 ? 0 : 1 }} transition={{ ...spring, delay: i * 0.02 }} />
      })}
      {step === 0 && <T x={260} y={272} size={11} fill={C.mut} weight={500}>each dot is a loan officer</T>}
    </Svg>
  )
}

/* ---------------- Document AI ---------------- */
const DocShape = ({ x, y, w = 110, h = 140, lines = 7, color = C.dim }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="8" fill={C.panel} stroke={color} strokeWidth="1.5" />
    {Array.from({ length: lines }).map((_, i) => <rect key={i} x={x + 12} y={y + 16 + i * ((h - 30) / lines)} width={i % 3 === 2 ? w * 0.45 : w - 24} height="5" rx="2.5" fill={C.dim} />)}
  </g>
)

export function DocScene({ step }) {
  const k = step
  return (
    <Svg>
      <motion.g key={k}>
        {k === 0 && [0, 1, 2, 3].map((i) => (
          <In key={i} x={-120} y={0} delay={i * 0.28}><DocShape x={120 + i * 66} y={70 - i * 8} /></In>
        ))}
        {k === 1 && (
          <g>
            <DocShape x={40} y={50} w={170} h={200} lines={9} />
            {[[62, 85, 126, C.a], [62, 123, 90, C.g], [62, 179, 126, C.o]].map(([hx, hy, hw, col], i) => (
              <motion.rect key={i} x={hx - 6} y={hy - 7} width={hw + 12} height="18" rx="4" fill={col} fillOpacity="0.28" stroke={col} strokeWidth="1.5" initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} style={{ transformOrigin: `${hx - 6}px ${hy}px` }} transition={{ delay: 0.5 + i * 0.5, duration: 0.5 }} />
            ))}
            {[[88, C.a], [126, C.g], [182, C.o]].map(([ly, col], i) => (
              <In key={i} delay={1 + i * 0.5} x={-30} y={0}>
                <path d={`M220 ${ly + 2} H 300`} stroke={col} strokeWidth="2" strokeDasharray="3 4" />
                <rect x="302" y={ly - 12} width="140" height="28" rx="8" fill={C.panel} stroke={col} strokeWidth="1.5" />
                <rect x="314" y={ly - 2} width={70 - i * 12} height="6" rx="3" fill={col} />
              </In>
            ))}
            <T x={372} y={36} size={11} fill={C.mut} weight={500}>extracted fields (illustrative)</T>
          </g>
        )}
        {k === 2 && (
          <g>
            <In x={-20} y={0}><rect x="30" y="100" width="130" height="60" rx="14" fill={C.panel} stroke={C.mut} strokeWidth="1.5" /><T x={95} y={136} size={22} fill={C.mut}>?</T><T x={95} y={86} size={11} fill={C.mut}>underwriting question</T></In>
            <In delay={0.5} y={0}><circle cx="260" cy="130" r="42" fill={C.panel} stroke={C.p} strokeWidth="2.5" /><T x={260} y={127} size={13}>Gemini</T><T x={260} y={143} size={9.5} fill={C.p} weight={500}>fine-tuned</T></In>
            <Draw d="M162 130 H 216" delay={0.3} color={C.mut} />
            <Draw d="M304 130 H 358" delay={1} color={C.p} />
            <In delay={1.3} x={20} y={0}><rect x="360" y="100" width="130" height="60" rx="14" fill={C.panel} stroke={C.p} strokeWidth="1.5" /><rect x="376" y="122" width="98" height="6" rx="3" fill={C.p} /><rect x="376" y="136" width="64" height="6" rx="3" fill={C.dim} /><T x={425} y={86} size={11} fill={C.p}>answer</T></In>
          </g>
        )}
        {k === 3 && (
          <g>
            <line x1="330" y1="50" x2="330" y2="250" stroke={C.o} strokeWidth="2" strokeDasharray="6 5" />
            <T x={330} y={40} size={11} fill={C.o}>confidence bar</T>
            {[['answer A', 270, C.g], ['answer B', 220, C.g], ['answer C', 120, C.r]].map(([lab, len, col], i) => (
              <g key={lab}>
                <T x={40} y={92 + i * 62} size={11} fill={C.mut} anchor="start" weight={500}>{lab}</T>
                <rect x="40" y={100 + i * 62} width="400" height="14" rx="7" fill={C.bg2} stroke={C.dim} />
                <motion.rect x="40" y={100 + i * 62} height="14" rx="7" fill={col} initial={{ width: 0 }} animate={{ width: len + 40 - 40 }} transition={{ delay: 0.3 + i * 0.4, duration: 1, ease: 'easeOut' }} />
              </g>
            ))}
          </g>
        )}
        {k === 4 && (
          <g>
            <rect x="250" y="40" width="14" height="210" rx="4" fill={C.o} fillOpacity="0.85" />
            <T x={257} y={30} size={11} fill={C.o}>gate</T>
            {[[80, C.g, true], [145, C.g, true], [210, C.r, false]].map(([ay, col, pass], i) => (
              <g key={i}>
                <motion.rect y={ay - 14} width="70" height="28" rx="8" fill={C.panel} stroke={col} strokeWidth="2" initial={{ x: 30 }} animate={{ x: pass ? [30, 130, 130, 360] : [30, 130, 140, 130] }} transition={{ delay: 0.3 + i * 0.6, duration: 2.2, times: pass ? [0, 0.4, 0.55, 1] : [0, 0.4, 0.55, 1], ease: 'easeInOut' }} />
                <motion.text y={ay + 4} fontSize="14" textAnchor="middle" fill={col} fontFamily={FONT} fontWeight="700" initial={{ x: 65 }} animate={{ x: pass ? [65, 165, 165, 395] : [65, 165, 175, 165] }} transition={{ delay: 0.3 + i * 0.6, duration: 2.2, times: [0, 0.4, 0.55, 1], ease: 'easeInOut' }}>{pass ? '✓' : '✕'}</motion.text>
              </g>
            ))}
            <In delay={2.4}><T x={430} y={115} size={11} fill={C.g}>passes</T><T x={160} y={262} size={11} fill={C.r}>held back</T></In>
          </g>
        )}
      </motion.g>
    </Svg>
  )
}

/* ---------------- Multi-agent assistant ---------------- */
const Agent = ({ x, y, label, on, color }) => (
  <motion.g initial={false} animate={{ opacity: on ? 1 : 0.55 }}>
    <rect x={x - 46} y={y - 17} width="92" height="34" rx="10" fill={C.panel} stroke={on ? color : C.dim} strokeWidth={on ? 2.5 : 1.5} />
    <T x={x} y={y + 4} size={11.5} fill={on ? '#fff' : C.mut}>{label}</T>
  </motion.g>
)

export function AgentsScene({ step }) {
  const k = step
  return (
    <Svg>
      <motion.g key={k}>
        {k === 0 && (
          <g>
            <In y={0} x={-30}><rect x="40" y="90" width="220" height="70" rx="16" fill={C.panel} stroke={C.a} strokeWidth="2" />
              {[0, 1].map((i) => <motion.rect key={i} x="58" y={108 + i * 20} height="7" rx="3.5" fill={C.a} initial={{ width: 0 }} animate={{ width: i ? 100 : 160 }} transition={{ delay: 0.5 + i * 0.5, duration: 0.9 }} />)}
              <T x={150} y={78} size={11} fill={C.a}>a question, in plain language</T></In>
            <In delay={1.8}><circle cx="380" cy="125" r="34" fill={C.panel} stroke={C.mut} strokeWidth="2" /><T x={380} y={129} size={12}>Orchestrator</T></In>
            <Draw d="M264 125 H 340" delay={1.6} color={C.a} />
          </g>
        )}
        {k === 1 && (
          <g>
            <circle cx="150" cy="145" r="40" fill={C.panel} stroke={C.a} strokeWidth="2.5" />
            <T x={150} y={149} size={12}>Orchestrator</T>
            {[['Text-to-SQL', 60, C.g], ['Retrieval', 145, C.p], ['Reports', 230, C.o]].map(([lab, ay, col], i) => (
              <g key={lab}>
                <Draw d={`M190 145 C 260 145 270 ${ay} 330 ${ay}`} delay={0.2 + i * 0.2} color={i === 0 ? col : C.dim} />
                <Agent x={376} y={ay} label={lab} on={i === 0} color={col} />
              </g>
            ))}
            <In delay={1.2}><T x={150} y={215} size={11} fill={C.mut} weight={500}>intent understood: pick a sub-agent</T></In>
          </g>
        )}
        {k === 2 && (
          <g>
            <Agent x={90} y={145} label="Text-to-SQL" on color={C.g} />
            <Draw d="M138 145 H 210" delay={0.2} color={C.g} />
            <In delay={0.5}><rect x="212" y="52" width="150" height="186" rx="14" fill={C.panel} stroke={C.a} strokeWidth="2" /><T x={287} y={74} size={11} fill={C.a}>MCP server · AWS EC2</T></In>
            {['SQL', 'MongoDB', 'Retrieval', 'Reports'].map((t, i) => (
              <In key={t} delay={0.8 + i * 0.25} x={-14} y={0}><rect x="232" y={90 + i * 36} width="110" height="26" rx="8" fill={C.bg2} stroke={i < 2 ? C.g : C.dim} strokeWidth="1.5" /><T x={287} y={107 + i * 36} size={11} fill={i < 2 ? C.g : C.mut}>{t}</T></In>
            ))}
            <In delay={2}><T x={440} y={145} size={11} fill={C.g}>queries run</T><Draw d="M366 145 H 400" delay={2} color={C.g} /></In>
          </g>
        )}
        {k === 3 && (
          <g>
            <Agent x={110} y={145} label="Sub-agent" on color={C.g} />
            {[['Mem0', 70, C.p], ['Redis', 220, C.o]].map(([lab, my, col], i) => (
              <g key={lab}>
                <Draw d={`M156 145 C 230 145 250 ${my} 320 ${my}`} delay={0.3 + i * 0.3} color={col} />
                <In delay={0.6 + i * 0.3}><rect x="322" y={my - 24} width="130" height="48" rx="12" fill={C.panel} stroke={col} strokeWidth="2" /><T x={387} y={my + 4} fill={col}>{lab}</T></In>
              </g>
            ))}
            <In delay={1.4}><T x={387} y={146} size={11} fill={C.mut} weight={500}>conversation memory</T></In>
          </g>
        )}
        {k === 4 && (
          <g>
            <In><rect x="50" y="60" width="420" height="64" rx="12" fill={C.panel} stroke={C.dim} strokeWidth="1.5" /><T x={80} y={96} size={13} fill={C.mut} anchor="start" weight={500}>Reply for</T></In>
            <rect x="150" y="82" width="130" height="24" rx="5" fill={C.dim} />
            <motion.rect x="150" y="82" height="24" rx="5" fill={C.r} initial={{ width: 0 }} animate={{ width: 130 }} transition={{ delay: 0.8, duration: 0.7 }} />
            <T x={215} y={99} size={11} fill="#04111f">personal data</T>
            <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5 }} style={{ transformOrigin: '260px 205px' }}>
              <path d="M260 160 L300 174 V212 C300 232 280 244 260 252 C240 244 220 232 220 212 V174 Z" fill={C.panel} stroke={C.g} strokeWidth="2.5" />
              <path d="M242 208 L256 222 L280 194" fill="none" stroke={C.g} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
            <In delay={1.8}><T x={140} y={214} size={11} fill={C.g}>PII masked</T><T x={400} y={214} size={11} fill={C.g}>prompt injection blocked</T></In>
          </g>
        )}
      </motion.g>
    </Svg>
  )
}

/* ---------------- CI/CD ---------------- */
export function CicdScene({ step }) {
  const rails = [{ y: 70, l: 'dev' }, { y: 140, l: 'main' }, { y: 210, l: 'release' }]
  const pos = [{ x: 300, y: 70 }, { x: 340, y: 140 }, { x: 392, y: 140 }, { x: 392, y: 210 }]
  return (
    <Svg>
      {rails.map((r) => (
        <g key={r.l}>
          <T x={16} y={r.y + 4} size={12} fill={C.mut} anchor="start">{r.l}</T>
          <line x1="80" y1={r.y} x2="400" y2={r.y} stroke={C.dim} strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      {[110, 170, 230].map((cx) => <circle key={cx} cx={cx} cy="70" r="5" fill={C.dim} />)}
      <path d="M300 70 C 320 70 320 140 340 140" fill="none" stroke={step >= 1 ? C.a : 'transparent'} strokeWidth="2" strokeDasharray="5 5" />
      <path d="M340 140 C 360 140 360 210 380 210" fill="none" stroke={step >= 3 ? C.a : 'transparent'} strokeWidth="2" strokeDasharray="5 5" />
      <Line x1={340} y1={140} x2={410} y2={140} on={step >= 2} />
      <Line x1={380} y1={210} x2={410} y2={210} on={step >= 3} />
      {step === 1 && ['lint', 'tests', 'bundle'].map((c, i) => (
        <In key={c} delay={0.3 + i * 0.45} y={6}>
          <rect x={100 + i * 66} y="92" width="58" height="26" rx="8" fill={C.panel} stroke={C.g} strokeWidth="1.5" />
          <T x={129 + i * 66} y={109} size={10.5} fill={C.g}>✓ {c}</T>
        </In>
      ))}
      <Box x={410} y={118} w={100} label="Staging" on={step === 2} color={C.o} />
      <Box x={410} y={188} w={100} label="Production" on={step === 3} color={C.g} />
      <motion.circle r="9" fill={C.a} initial={false} animate={{ cx: pos[step].x, cy: pos[step].y }} transition={spring} />
    </Svg>
  )
}

/* ---------------- Show, Attend and Tell ---------------- */
const COLS = 8, ROWS = 5, IX = 20, IY = 36, CW = 32.5, CH = 33
const heat = (c, r, tc, tr) => Math.exp(-(((c + 0.5 - tc) ** 2 + (r + 0.5 - tr) ** 2) / (2 * 1.05 * 1.05)))
const words = ['a', 'sun', 'over', 'hills']

export function SatScene({ step }) {
  const target = step === 4 ? [3.2, 3.7] : [6.5, 1.2]
  const shown = step === 3 ? 2 : step === 4 ? 4 : 0
  return (
    <Svg>
      <defs>
        <linearGradient id="sat-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d3557" /><stop offset="1" stopColor="#5a8fb5" /></linearGradient>
        <clipPath id="sat-clip"><rect x={IX} y={IY} width={COLS * CW} height={ROWS * CH} rx="10" /></clipPath>
      </defs>
      <g clipPath="url(#sat-clip)">
        <rect x={IX} y={IY} width={COLS * CW} height={ROWS * CH} fill="url(#sat-sky)" />
        <circle cx={IX + 6.5 * CW} cy={IY + 1.2 * CH} r="19" fill="#ffd166" />
        <path d={`M${IX} ${IY + 3.2 * CH} Q ${IX + 70} ${IY + 2.4 * CH} ${IX + 130} ${IY + 3 * CH} T ${IX + 260} ${IY + 2.9 * CH} V ${IY + 5 * CH} H ${IX}Z`} fill="#0b3d4d" />
        <path d={`M${IX} ${IY + 4 * CH} Q ${IX + 90} ${IY + 3.4 * CH} ${IX + 170} ${IY + 4 * CH} T ${IX + 260} ${IY + 3.8 * CH} V ${IY + 5 * CH} H ${IX}Z`} fill="#06303c" />
        {Array.from({ length: ROWS * COLS }).map((_, n) => {
          const c = n % COLS, r = Math.floor(n / COLS)
          const hw = step >= 2 ? heat(c, r, target[0], target[1]) : 0
          return (
            <motion.rect key={n} x={IX + c * CW} y={IY + r * CH} width={CW} height={CH} initial={false}
              animate={{ fill: '#ffffff', fillOpacity: step >= 2 ? 0.8 * hw : step === 1 ? 0.07 : 0, stroke: '#ffffff', strokeOpacity: step >= 1 ? 0.35 : 0 }}
              strokeWidth="1" transition={{ duration: 0.5, delay: step === 1 ? (c + r) * 0.04 : 0 }} />
          )
        })}
      </g>
      {step >= 1 && <T x={IX + (COLS * CW) / 2} y={IY + ROWS * CH + 20} size={11} fill={C.mut} weight={500}>{step === 1 ? 'a grid of feature vectors' : step >= 2 ? 'brighter = more attention' : ''}</T>}
      <T x={IX + 4} y={IY - 10} size={10} fill={C.mut} anchor="start" weight={500}>illustration, not model output</T>

      <Box x={330} y={36} w={160} h={42} label="CNN encoder" sub="VGG19 / InceptionV3" on={step === 1} color={C.o} />
      <Box x={330} y={96} w={160} h={42} label="Soft attention" sub="weights over the grid" on={step === 2} color={C.a} />
      <Box x={330} y={156} w={160} h={42} label="GRU decoder" sub="next word" on={step >= 3} color={C.g} />
      <Line x1={410} y1={78} x2={410} y2={96} on={step >= 2} />
      <Line x1={410} y1={138} x2={410} y2={156} on={step >= 3} />
      <g>
        {words.slice(0, shown).map((w, i) => (
          <motion.g key={w + i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: step === 3 ? i * 0.5 : 0, duration: 0.4 }}>
            <rect x={330 + i * 42} y={216} width="38" height="26" rx="8" fill={C.panel} stroke={C.g} strokeWidth="1.5" />
            <T x={349 + i * 42} y={233} size={11} fill={C.g}>{w}</T>
          </motion.g>
        ))}
      </g>
    </Svg>
  )
}

/* ---------------- LitArt: adapters ---------------- */
// A small "model" drawn as a grid of weight blocks.
const Blocks = ({ x, y, frozen, adapters, glow }) => (
  <g>
    <rect x={x - 10} y={y - 24} width="244" height="170" rx="14" fill={C.panel} stroke={frozen ? '#4a90d9' : C.dim} strokeWidth="1.5" />
    {Array.from({ length: 12 }).map((_, n) => {
      const c = n % 4, r = Math.floor(n / 4), bx = x + c * 58, by = y + r * 44
      const attn = c === 1 || c === 2 // the q / v columns that receive adapters
      return (
        <g key={n}>
          <rect x={bx} y={by} width="50" height="34" rx="6" fill={frozen ? '#1b2a3d' : '#1f2630'} stroke={frozen ? '#31577f' : C.dim} />
          {attn && adapters && (
            <motion.g initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + (n % 5) * 0.12, duration: 0.5 }}>
              <rect x={bx + 33} y={by + 4} width="14" height="26" rx="4" fill={C.p} fillOpacity={glow ? 0.95 : 0.7} stroke={C.p} />
              {glow && <rect x={bx + 33} y={by + 4} width="14" height="26" rx="4" fill="none" stroke="#fff" strokeOpacity="0.8"><animate attributeName="stroke-opacity" values="0.2;0.9;0.2" dur="1.4s" repeatCount="indefinite" /></rect>}
            </motion.g>
          )}
        </g>
      )
    })}
  </g>
)

export function LitartScene({ step }) {
  const k = step
  const spines = [C.a, C.o, C.g, C.p, C.r, C.a, C.o, C.g]
  return (
    <Svg>
      <motion.g key={k}>
        {k === 0 && (
          <g>
            {spines.map((col, i) => (
              <motion.rect key={i} x={70 + i * 46} width="36" rx="5" fill={col} fillOpacity="0.85" initial={{ y: 250, height: 0 }} animate={{ y: 250 - (110 + ((i * 37) % 50)), height: 110 + ((i * 37) % 50) }} transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }} />
            ))}
            <line x1="50" y1="250" x2="460" y2="250" stroke={C.dim} strokeWidth="2" />
            <In delay={1.2}><T x={260} y={50} size={12} fill={C.mut} weight={500}>many genres, many books</T></In>
          </g>
        )}
        {k === 1 && (
          <g>
            <In><Blocks x={40} y={60} frozen /></In>
            <In delay={0.5}>
              <rect x="334" y="70" width="150" height="56" rx="12" fill={C.panel} stroke="#4a90d9" strokeWidth="1.5" />
              <T x={409} y={93} size={12}>Llama-2 7B</T><T x={409} y={112} size={10.5} fill="#4a90d9" weight={500}>4-bit, frozen</T>
            </In>
            <In delay={0.9}>
              <path d="M347 168 v-9 a7 7 0 0 1 14 0 v9" fill="none" stroke="#4a90d9" strokeWidth="2.5" />
              <rect x="341" y="167" width="26" height="20" rx="4" fill="#4a90d9" />
              <T x={420} y={182} size={11} fill={C.mut} weight={500}>weights not updated</T>
            </In>
          </g>
        )}
        {k === 2 && (
          <g>
            <Blocks x={40} y={60} frozen adapters />
            <In delay={1.1}>
              <rect x="334" y="64" width="150" height="40" rx="10" fill={C.panel} stroke={C.p} strokeWidth="2" />
              <rect x="346" y="76" width="14" height="16" rx="3" fill={C.p} /><T x={425} y={89} size={11.5} fill={C.p}>LoRA adapter</T>
              <T x={409} y={126} size={10.5} fill={C.mut} weight={500}>small low-rank matrices</T>
              <T x={409} y={142} size={10.5} fill={C.mut} weight={500}>on the attention layers (q, v)</T>
            </In>
          </g>
        )}
        {k === 3 && (
          <g>
            <Blocks x={30} y={60} frozen adapters glow />
            <Draw d="M260 100 H 310" delay={0.2} color={C.p} />
            <In delay={0.4} x={14} y={0}>
              <rect x="316" y="46" width="170" height="30" rx="8" fill={C.panel} stroke={C.mut} />
              {[0, 1].map((i) => <rect key={i} x="326" y={54 + i * 9} width={140 - i * 40} height="4" rx="2" fill={C.dim} />)}
              <T x={400} y={38} size={10.5} fill={C.mut} weight={500}>chapter</T>
            </In>
            <In delay={1.2} x={14} y={0}>
              <rect x="316" y="118" width="170" height="30" rx="8" fill={C.panel} stroke={C.p} />
              <rect x="326" y="128" width="90" height="5" rx="2.5" fill={C.p} />
              <T x={400} y={166} size={10.5} fill={C.p} weight={500}>summary</T>
            </In>
            <In delay={1.8}><rect x="316" y="186" width="170" height="30" rx="8" fill={C.panel} stroke={C.g} /><T x={401} y={206} size={11} fill={C.g}>adapter saved on its own</T></In>
            <T x={140} y={250} size={11} fill={C.mut} weight={500}>only the purple adapter is trained</T>
          </g>
        )}
        {k === 4 && (
          <g>
            <In x={-16} y={0}>{[150, 110, 130].map((w, i) => <rect key={i} x="36" y={118 + i * 18} width={w} height="8" rx="4" fill={C.mut} />)}<T x={36} y={104} size={11} fill={C.mut} anchor="start" weight={500}>summary</T></In>
            <Draw d="M200 140 H 236" delay={0.3} />
            <In delay={0.5}>
              <rect x="238" y="100" width="116" height="80" rx="12" fill={C.panel} stroke="#4a90d9" strokeWidth="1.5" />
              <T x={296} y={134} size={12}>Stable Diffusion</T>
              <rect x="250" y="146" width="92" height="20" rx="6" fill={C.p} fillOpacity="0.2" stroke={C.p} /><T x={296} y={160} size={10.5} fill={C.p}>LoRA adapter</T>
            </In>
            <Draw d="M358 140 H 388" delay={1} />
            <defs><linearGradient id="lit-cover" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff7eb3" /><stop offset="0.35" stopColor="#ffd166" /><stop offset="0.65" stopColor="#58a6ff" /><stop offset="1" stopColor="#d2a8ff" /></linearGradient>
              <clipPath id="lit-reveal"><motion.rect x="392" y="60" width="100" initial={{ height: 0 }} animate={{ height: 160 }} transition={{ delay: 1.2, duration: 1.4, ease: 'easeInOut' }} /></clipPath></defs>
            <rect x="392" y="60" width="100" height="160" rx="8" fill="none" stroke={C.dim} strokeWidth="1.5" strokeDasharray="5 5" />
            <g clipPath="url(#lit-reveal)"><rect x="392" y="60" width="100" height="160" rx="8" fill="url(#lit-cover)" /><circle cx="442" cy="150" r="30" fill="#0d1117" fillOpacity="0.45" /><rect x="408" y="74" width="68" height="8" rx="4" fill="#fff" fillOpacity="0.85" /></g>
          </g>
        )}
      </motion.g>
    </Svg>
  )
}

/* ---------------- RAG chatbot ---------------- */
const Cyl = ({ x, y, w = 90, h = 70, label, color = C.a }) => (
  <g>
    <rect x={x} y={y + 8} width={w} height={h - 16} fill={C.panel} stroke={color} strokeWidth="2" />
    <ellipse cx={x + w / 2} cy={y + 8} rx={w / 2} ry="8" fill={C.panel} stroke={color} strokeWidth="2" />
    <ellipse cx={x + w / 2} cy={y + h - 8} rx={w / 2} ry="8" fill={C.panel} stroke={color} strokeWidth="2" />
    <rect x={x + 2} y={y + 9} width={w - 4} height={h - 18} fill={C.panel} />
    <T x={x + w / 2} y={y + h / 2 + 4} size={11.5}>{label}</T>
  </g>
)

export function RagScene({ step }) {
  const k = step
  return (
    <Svg>
      <motion.g key={k}>
        {k === 0 && (
          <g>
            {[0, 1, 2].map((i) => (
              <In key={i} x={-90} y={0} delay={i * 0.3}><DocShape x={40 + i * 50} y={92 - i * 6} w={80} h={100} lines={5} /></In>
            ))}
            <Draw d="M240 140 H 330" delay={0.9} color={C.a} />
            <In delay={1.1}><Cyl x={340} y={104} w={110} h={72} label="Delta tables" /></In>
            <In delay={1.5}><T x={395} y={206} size={11} fill={C.mut} weight={500}>Unity Catalog governs access</T></In>
          </g>
        )}
        {k === 1 && (
          <g>
            <In><DocShape x={30} y={50} w={90} h={190} lines={9} /></In>
            {[0, 1, 2, 3].map((i) => (
              <motion.g key={i} initial={{ x: 0, opacity: 0 }} animate={{ x: 70, opacity: 1 }} transition={{ delay: 0.5 + i * 0.25, duration: 0.6 }}>
                <rect x={130} y={58 + i * 46} width="70" height="36" rx="7" fill={C.panel} stroke={C.o} strokeWidth="1.5" />
                {[0, 1].map((r) => <rect key={r} x={138} y={67 + i * 46 + r * 9} width={r ? 36 : 54} height="4" rx="2" fill={C.dim} />)}
              </motion.g>
            ))}
            {[0, 1, 2, 3].map((i) => (
              <In key={i} delay={1.7 + i * 0.2} x={-10} y={0}>
                <path d={`M270 ${76 + i * 46} H 296`} stroke={C.mut} strokeWidth="1.5" />
                {[0, 1, 2, 3, 4].map((d) => <circle key={d} cx={304 + d * 13} cy={76 + i * 46} r="4.5" fill={[C.a, C.g, C.p, C.o, C.a][(d + i) % 5]} />)}
              </In>
            ))}
            <In delay={2.4}><T x={344} y={34} size={11} fill={C.mut} weight={500}>chunk → embedding (vector)</T></In>
          </g>
        )}
        {k === 2 && (
          <g>
            <In x={-20} y={0}><rect x="24" y="108" width="130" height="52" rx="14" fill={C.panel} stroke={C.a} strokeWidth="2" /><T x={89} y={139} size={20} fill={C.a}>?</T></In>
            <Draw d="M158 134 H 214" delay={0.4} />
            <In delay={0.7} y={0}><path d="M262 84 L310 134 L262 184 L214 134 Z" fill={C.panel} stroke={C.p} strokeWidth="2.5" /><T x={262} y={131} size={11}>Question</T><T x={262} y={145} size={11}>classifier</T></In>
            <Draw d="M310 134 H 372" delay={1.3} color={C.g} />
            <In delay={1.6}><rect x="374" y="112" width="116" height="44" rx="10" fill={C.panel} stroke={C.g} strokeWidth="2" /><T x={432} y={139} size={12} fill={C.g}>relevant → go on</T></In>
            <Draw d="M262 184 V 232" delay={1.5} color={C.r} />
            <In delay={1.9}><T x={262} y={252} size={11} fill={C.r}>irrelevant → stop here</T></In>
          </g>
        )}
        {k === 3 && (
          <g>
            <In><rect x="24" y="30" width="120" height="34" rx="10" fill={C.panel} stroke={C.a} strokeWidth="2" /><T x={84} y={52} size={12} fill={C.a}>question</T></In>
            <Draw d="M146 47 H 200" delay={0.3} />
            {[0, 1, 2, 3, 4].map((i) => (
              <In key={i} delay={0.5 + i * 0.08} y={0}><rect x={204} y={28 + i * 26} width="110" height="20" rx="5" fill={C.panel} stroke={i < 2 ? C.o : C.dim} strokeWidth={i < 2 ? 2 : 1} /><T x={259} y={42 + i * 26} size={10} fill={i < 2 ? C.o : C.mut} weight={500}>{i < 2 ? 'best match' : 'chunk'}</T></In>
            ))}
            <Draw d="M316 54 C 340 54 346 120 372 146" delay={1.2} color={C.o} />
            <Draw d="M316 80 C 340 80 346 130 372 152" delay={1.3} color={C.o} />
            <In delay={1.7} y={0}>
              <rect x="374" y="104" width="116" height="108" rx="10" fill={C.panel} stroke={C.g} strokeWidth="2" />
              <T x={432} y={124} size={11} fill={C.g}>prompt</T>
              {[['question', C.a], ['retrieved chunks', C.o], ['chat history', C.p]].map(([l, c], i) => <g key={l}><rect x="386" y={134 + i * 24} width="92" height="18" rx="5" fill={c} fillOpacity="0.2" stroke={c} /><T x={432} y={147 + i * 24} size={9.5} fill={c} weight={500}>{l}</T></g>)}
            </In>
            <In delay={1}><T x={259} y={170} size={10.5} fill={C.mut} weight={500}>similarity search</T></In>
          </g>
        )}
        {k === 4 && (
          <g>
            <In x={-20} y={0}><rect x="30" y="100" width="130" height="80" rx="12" fill={C.panel} stroke={C.g} strokeWidth="2" />{['question', 'context', 'history'].map((l, i) => <rect key={l} x="44" y={114 + i * 20} width={96 - i * 14} height="8" rx="4" fill={C.g} fillOpacity="0.6" />)}<T x={95} y={92} size={11} fill={C.g}>prompt</T></In>
            <Draw d="M164 140 H 206" delay={0.4} color={C.g} />
            <In delay={0.7} y={0}>
              <rect x="208" y="86" width="104" height="108" rx="14" fill={C.panel} stroke={C.p} strokeWidth="2.5" />
              <T x={260} y={122} size={12}>LangChain</T><T x={260} y={138} size={12}>QnA chain</T>
              <T x={260} y={166} size={10} fill={C.p} weight={500}>foundation model</T><T x={260} y={180} size={10} fill={C.p} weight={500}>endpoint</T>
            </In>
            <Draw d="M316 140 H 360" delay={1.2} color={C.p} />
            <In delay={1.5} x={14} y={0}><rect x="362" y="104" width="128" height="72" rx="12" fill={C.panel} stroke={C.a} strokeWidth="2" /><rect x="376" y="122" width="100" height="7" rx="3.5" fill={C.a} /><rect x="376" y="138" width="76" height="7" rx="3.5" fill={C.dim} /><rect x="376" y="154" width="88" height="7" rx="3.5" fill={C.dim} /><T x={426} y={92} size={11} fill={C.a}>answer</T></In>
          </g>
        )}
        {k === 5 && (
          <g>
            <line x1="260" y1="30" x2="260" y2="262" stroke={C.dim} strokeDasharray="5 6" />
            <T x={140} y={30} size={11.5} fill={C.g}>Offline: LLM judge</T>
            {[0, 1, 2, 3].map((i) => (
              <In key={i} delay={0.3 + i * 0.35} x={-12} y={0}>
                <rect x="30" y={50 + i * 50} width="150" height="34" rx="8" fill={C.panel} stroke={C.dim} />
                <rect x="42" y={63 + i * 50} width={96 - i * 12} height="7" rx="3.5" fill={C.dim} />
                <circle cx="206" cy={67 + i * 50} r="12" fill={i === 2 ? C.o : C.g} fillOpacity="0.2" stroke={i === 2 ? C.o : C.g} strokeWidth="2" />
                <T x={206} y={72 + i * 50} size={13} fill={i === 2 ? C.o : C.g}>{i === 2 ? '!' : '✓'}</T>
              </In>
            ))}
            <T x={390} y={30} size={11.5} fill={C.a}>Online: monitoring</T>
            <rect x="290" y="50" width="200" height="190" rx="12" fill={C.panel} stroke={C.dim} />
            <motion.path d="M304 200 L336 172 L366 184 L400 128 L432 148 L474 86" fill="none" stroke={C.a} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 1.6, ease: 'easeInOut' }} />
            <In delay={2.4}><T x={390} y={226} size={10.5} fill={C.mut} weight={500}>quality over time</T></In>
          </g>
        )}
      </motion.g>
    </Svg>
  )
}

export const scenes = { anemos: AnemosScene, pricing: PricingScene, docai: DocScene, agents: AgentsScene, rag: RagScene, cicd: CicdScene, sat: SatScene, litart: LitartScene }
