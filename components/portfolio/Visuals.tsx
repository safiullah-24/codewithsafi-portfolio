"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, GitBranch, GitPullRequest, FileCode2, ScanLine, Radio } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SignalField({motion=true}:{motion?:boolean}) {
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const c=ref.current;if(!c)return;const ctx=c.getContext('2d');if(!ctx)return;
    let frame=0, visible=true, width=0, height=0, pointer=0;
    const signal=getComputedStyle(c).getPropertyValue("--signal-rgb").trim()||"98,220,238";
    const resize=()=>{const r=c.getBoundingClientRect();width=r.width;height=r.height;const ratio=Math.min(devicePixelRatio,1.5);c.width=width*ratio;c.height=height*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);};
    const move=(e:PointerEvent)=>{pointer=(e.clientX/window.innerWidth-.5)*.12;};
    const draw=(time:number)=>{
      ctx.clearRect(0,0,width,height); const t=motion?time*.00014:0;
      for(let row=0;row<25;row++){
        ctx.beginPath();
        for(let i=0;i<=100;i++){
          const u=i/100,x=u*width, depth=row/24;
          const envelope=Math.sin(u*Math.PI);
          const y=height*.57+(depth-.5)*height*.71+Math.sin(u*7.2+depth*2.7+t+pointer)*envelope*height*.14;
          if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
        }
        ctx.strokeStyle=`rgba(${signal},${row%6===0?.27:.09})`;ctx.lineWidth=row%6===0?1:.6;ctx.stroke();
        if(row%6===0){
          const u=motion?((time*.000035+row*.073)%1):.28+row*.018,depth=row/24;
          const x=u*width,y=height*.57+(depth-.5)*height*.71+Math.sin(u*7.2+depth*2.7+t+pointer)*Math.sin(u*Math.PI)*height*.14;
          ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.fillStyle=`rgba(${signal},.85)`;ctx.fill();
        }
      }
      if(motion&&visible&&!document.hidden)frame=requestAnimationFrame(draw);
    };
    const start=()=>{cancelAnimationFrame(frame);if(visible)frame=requestAnimationFrame(draw);};
    const obs=new ResizeObserver(()=>{resize();start();});obs.observe(c);
    const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;start();});io.observe(c);
    document.addEventListener('visibilitychange',start);if(motion)window.addEventListener('pointermove',move,{passive:true});
    resize();start();return()=>{cancelAnimationFrame(frame);obs.disconnect();io.disconnect();document.removeEventListener('visibilitychange',start);window.removeEventListener('pointermove',move);};
  },[motion]);
  return <canvas ref={ref} className="signal-field" aria-hidden="true"/>;
}

const factorial=(n:number):number=>n<=1?1:n*factorial(n-1);
const taylor=(x:number,n:number)=>{let y=0;for(let k=1;k<=n;k+=2)y+=Math.pow(-1,(k-1)/2)*Math.pow(x,k)/factorial(k);return y;};
const px=(x:number)=>50+(x+Math.PI)/(2*Math.PI)*620;
const py=(y:number)=>178-y*83;

export function TaylorPlot(){
  const [degree,setDegree]=useState(5);const [sample,setSample]=useState<number|null>(null);
  const paths=useMemo(()=>{
    let sine='',poly='',error=0;
    for(let i=0;i<=240;i++){const x=-Math.PI+i/240*Math.PI*2;const s=Math.sin(x),p=taylor(x,degree);sine+=`${i?'L':'M'}${px(x).toFixed(2)},${py(s).toFixed(2)} `;poly+=`${i?'L':'M'}${px(x).toFixed(2)},${py(p).toFixed(2)} `;error=Math.max(error,Math.abs(s-p));}
    return {sine,poly,error};
  },[degree]);
  const formula=['x',' − x³/3!',' + x⁵/5!',' − x⁷/7!',' + x⁹/9!'].slice(0,(degree+1)/2).join('');
  return <div className="taylor-widget">
    <div className="visual-topline mono"><span>FIG. 01 / APPROXIMATION ENGINE</span><span className="live-label"><i/> INTERACTIVE</span></div>
    <div className="math-expression"><span>sin(x)</span><span className="math-equals">≈</span><span>{formula}</span></div>
    <svg viewBox="0 0 720 350" className="taylor-svg" role="img" aria-label={`Sine wave and its degree ${degree} Taylor approximation around zero. Maximum error across minus pi to pi: ${paths.error.toFixed(4)}.`} onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();setSample(Math.max(-Math.PI,Math.min(Math.PI,((e.clientX-r.left)/r.width*720-50)/620*Math.PI*2-Math.PI)));}} onPointerLeave={()=>setSample(null)}>
      <defs><clipPath id="plot-clip"><rect x="42" y="20" width="636" height="300"/></clipPath></defs>
      <g className="plot-grid">{Array.from({length:9},(_,i)=><line key={'v'+i} x1={50+i*77.5} x2={50+i*77.5} y1="24" y2="316"/>)}{Array.from({length:7},(_,i)=><line key={'h'+i} x1="50" x2="670" y1={28+i*49} y2={28+i*49}/>)}</g>
      <g className="plot-axis"><line x1="50" x2="670" y1="178" y2="178"/><line x1="360" x2="360" y1="20" y2="316"/></g>
      <g className="plot-labels"><text x="50" y="341">−π</text><text x="352" y="341">0</text><text x="661" y="341">π</text><text x="20" y="100">1</text><text x="12" y="266">−1</text></g>
      <g clipPath="url(#plot-clip)"><path d={paths.sine} className="sine-curve"/><path d={paths.poly} className="taylor-curve"/>{sample!==null&&<g><line x1={px(sample)} x2={px(sample)} y1="24" y2="316" className="sample-line"/><circle cx={px(sample)} cy={py(Math.sin(sample))} r="5" fill="#eeeae2"/><circle cx={px(sample)} cy={py(taylor(sample,degree))} r="5" fill="var(--signal)"/></g>}</g>
    </svg>
    <div className="plot-legend mono"><span><i className="key-original"/> sin(x)</span><span><i className="key-approx"/> Taylor polynomial</span><span className="error-value">max error {paths.error.toFixed(4)}</span></div>
    <div className="degree-control"><div><label id="degree-label" className="mono">POLYNOMIAL DEGREE</label><span className="degree-value">0{degree}</span></div><Slider aria-labelledby="degree-label" min={1} max={9} step={2} value={[degree]} onValueChange={v=>setDegree(v[0])}/><p>Move the slider. Watch the approximation find its shape.</p></div>
  </div>;
}

const flowSteps=[
  {id:'inspect',title:'Inspect',Icon:ScanLine,headline:'Context comes first.',text:'Read the repository structure and the instruction before proposing a change.',lines:['repository /','  api / routes.py','  agent / planner.py','  tools / github_tool.py'],meta:'INPUT → REPOSITORY + INTENT'},
  {id:'plan',title:'Plan',Icon:GitBranch,headline:'Make the path explicit.',text:'Break the request into a sequence of scoped, inspectable edits.',lines:['01  Locate the affected function','02  Check the existing contract','03  Propose a minimal change','04  Identify validation steps'],meta:'CONTEXT → ORDERED STEPS'},
  {id:'patch',title:'Patch',Icon:FileCode2,headline:'Changes with a boundary.',text:'Keep generated changes visible as a diff, with enough context to inspect them.',lines:['  def list_files(repository):','−     return repository.files','+     return repository.files or []','  # Illustrative change'],meta:'PLAN → REVIEWABLE DIFF'},
  {id:'review',title:'Review',Icon:GitPullRequest,headline:'A person has the final say.',text:'A pull request is a review surface. Generated code still needs validation and engineering judgment.',lines:['Change summary','Files affected','Validation notes','Ready for human review'],meta:'DIFF → PULL REQUEST'},
];
export function RepoFlow(){
 return <Tabs defaultValue="inspect" className="repo-widget"><div className="visual-topline mono"><span>FIG. 02 / AGENT WORKFLOW</span><span>ILLUSTRATIVE</span></div><TabsList className="flow-tabs" aria-label="Agent workflow stages">{flowSteps.map((s,i)=><TabsTrigger value={s.id} key={s.id} className="flow-tab"><s.Icon size={20}/><span>{s.title}</span>{i<3&&<ArrowRight className="flow-arrow" size={13}/>}</TabsTrigger>)}</TabsList>{flowSteps.map(s=><TabsContent key={s.id} value={s.id} className="flow-content"><div className="flow-code">{s.lines.map((l,i)=><div key={l} className={l.startsWith('+')?'added':l.startsWith('−')?'removed':''}><span>{String(i+1).padStart(2,'0')}</span><code>{l}</code></div>)}</div><div className="flow-explainer"><span className="mono">{s.meta}</span><h4>{s.headline}</h4><p>{s.text}</p></div></TabsContent>)}</Tabs>;
}

export function MeetingDiagram(){
 const [connected,setConnected]=useState(false);
 return <div className={'meeting-diagram '+(connected?'connected':'')}><div className="visual-topline mono"><span>FIG. 03 / CONNECTION STUDY</span><span>SIMULATION</span></div><div className="peer-connection"><div className="peer"><span className="peer-initial">A</span><span>Browser A</span><small className="mono">REACT CLIENT</small></div><div className="connection-path"><svg viewBox="0 0 300 100" aria-hidden="true"><path d="M0 50 Q150 -30 300 50"/><path d="M0 50 Q150 130 300 50"/><path className="media-path" d="M0 50 H300"/></svg><span className="connection-caption mono">{connected?'PEER MEDIA':'SIGNALING'}</span></div><div className="peer"><span className="peer-initial">B</span><span>Browser B</span><small className="mono">REACT CLIENT</small></div></div><div className="signaling-server"><Radio size={17}/><span className="mono">SOCKET.IO / ROOM SIGNALING</span></div><button className="text-button simulate-button" onClick={()=>setConnected(v=>!v)} aria-pressed={connected}>{connected?'Reset connection':'Trace the connection'}<ArrowRight size={17}/></button><p className="simulation-state" aria-live="polite">{connected?'Offers and ICE candidates travel through the server. Media flows peer to peer.':'Two clients. A room. An exchange of connection information.'}</p></div>;
}

const compilerSteps=[
 {title:'Poly source',caption:'The proposed Poly format makes language boundaries explicit while grouping code and declaring the connections between blocks. Syntax is still under design.',code:'poly { python · javascript · cpp }',note:'ONE SOURCE / MULTIPLE LANGUAGE ENVIRONMENTS'},
 {title:'Language adapters',caption:'Language-specific adapters parse or delegate each block, discover functions, and expose a common interface. New languages can be added through the adapter boundary.',code:'parse(block) → export_symbols()',note:'PRESERVE EACH LANGUAGE / EXPOSE ITS CONTRACT'},
 {title:'Shared representation',caption:'A proposed intermediate layer records symbols, function signatures, type mappings, and dependencies. Static analysis checks whether linked calls satisfy their contracts.',code:'symbol → signature → type map → linkage',note:'COMMON CONTRACTS / EXPLICIT DEPENDENCIES'},
 {title:'Cross-language calls',caption:'The runtime design explores how arguments and results cross language boundaries. Marshalling, return types, and error propagation must remain explicit and testable.',code:'cpp::transform → py::normalize → js::render',note:'ILLUSTRATIVE CALL TRACE / UNDER DESIGN'},
 {title:'Coordinated execution',caption:'Coordinate the linked work, collect output, and enforce execution boundaries. Sandboxing, resource limits, correctness, and overhead will be evaluated in prototypes.',code:'invoke → isolate → collect output',note:'A COORDINATED RESULT / MEASURABLE CONSTRAINTS'},
];
export function CompilerDiagram(){
 const [active,setActive]=useState(0);
 return <div className="compiler-diagram poly-instrument" data-stage={active}>
   <div className="compiler-heading mono"><span>POLY / SYSTEM STUDY</span><span>PROPOSED ARCHITECTURE</span></div>
   <div className="poly-link-map" aria-hidden="true">
     <div className="language-inputs"><span>Python</span><span>JavaScript</span><span>C / C++</span></div>
     <svg viewBox="0 0 480 170" preserveAspectRatio="none"><path d="M70 0 V25 C70 67 240 35 240 88"/><path d="M240 0 V88"/><path d="M410 0 V25 C410 67 240 35 240 88"/><path className="poly-out" d="M240 118 V170"/><circle cx="240" cy="103" r="30"/><circle className="poly-link-dot" cx="70" cy="0" r="3"/><circle className="poly-link-dot" cx="410" cy="0" r="3"/></svg>
     <span className="poly-core mono">POLY</span><span className="poly-map-caption mono">{active<2?'LANGUAGE BOUNDARIES':'EXPLICIT CONNECTIONS'}</span>
   </div>
   <div className="compiler-stages">{compilerSteps.map((s,i)=><button key={s.title} className={active===i?'active':''} onClick={()=>setActive(i)} aria-pressed={active===i}><span className="mono">0{i+1}</span><span>{s.title}</span><ArrowRight size={18}/></button>)}</div>
   <div className="compiler-detail" key={active} aria-live="polite"><span className="mono">{compilerSteps[active].note}</span><code>{compilerSteps[active].code}</code><p>{compilerSteps[active].caption}</p></div>
   <div className="poly-instrument-foot mono"><span className="signal-square"/>ARCHITECTURE & PROTOTYPING / SYNTAX NOT FINAL</div>
 </div>;
}
