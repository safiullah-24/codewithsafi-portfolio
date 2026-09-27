"use client";

import { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { capabilityGroups, projects, type Project } from '@/data/portfolio';

export default function CapabilitySystem({onOpen}:{onOpen:(project:Project)=>void}) {
  const [active,setActive]=useState('React');
  const [groupId,setGroupId]=useState('frontend');
  const group=capabilityGroups.find(g=>g.id===groupId)!;
  const skill=group.skills.find(s=>s.name===active)!;
  const evidence=skill.projects.map(id=>projects.find(p=>p.id===id)!).filter(Boolean);
  const detail=<>
    <div className="capability-detail-top mono"><span>TRACE / {group.label.toUpperCase()}</span><span className="capability-status">{skill.status}</span></div>
    <h3>{skill.name}</h3>
    <p>{skill.description}</p>
    <div className="capability-route" aria-hidden="true"><span/>{[0,1,2,3].map(i=><i key={i} style={{animationDelay:`${i*.35}s`}}/>)}<ArrowRight size={15}/></div>
    <span className="mono capability-evidence-label">{evidence.length?'CONNECTED WORK':'CONTEXT'}</span>
    {evidence.length?<div className="capability-evidence">{evidence.map(p=><button key={p.id} onClick={()=>onOpen(p)}><span>{p.name}<small>{p.category}</small></span><ArrowUpRight size={17}/></button>)}</div>:<p className="capability-context">{skill.context}</p>}
    {group.id==='exploring'&&<a className="text-button" href="#building">Where the next questions lead <ArrowUpRight size={15}/></a>}
  </>;
  return <div className="capability-system reveal">
    <div className="capability-caption mono"><span>ENGINEERING STACK / SELECT A TECHNOLOGY</span><span>FOUNDATIONS · APPLIED · EXPLORING</span></div>
    <div className="capability-layout">
      <div className="capability-register">
        {capabilityGroups.map((g,i)=><div className={'capability-group '+(group.id===g.id?'selected-group':'')} key={g.id}>
          <div className="capability-group-label"><span className="mono">0{i+1}</span><h3>{g.label}</h3></div>
          <div className="capability-skills">{g.skills.map(s=><button key={s.name} onClick={()=>{setGroupId(g.id);setActive(s.name);}} aria-pressed={active===s.name&&groupId===g.id}>{s.name}<span aria-hidden="true"/></button>)}</div>
          {group.id===g.id&&<div className="capability-mobile-detail" aria-live="polite">{detail}</div>}
        </div>)}
      </div>
      <div className="capability-detail" aria-live="polite" aria-atomic="true">{detail}</div>
    </div>
  </div>;
}
