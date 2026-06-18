"use client";

import { useEffect, useMemo, useState } from "react";
import { questions } from "@/lib/questions";
import { findDefinitions } from "@/lib/glossary";
import { examStrategy, guideSections } from "@/lib/studyGuide";
import type { AnswerRecord, Domain, MockResult, Question } from "@/lib/types";

type View = "home" | "quiz" | "result" | "stats" | "favorites" | "admin" | "guide";
type Mode = "practice" | "mock60" | "mock65";
const HISTORY_KEY = "ccp-trainer-history";
const FAVORITES_KEY = "ccp-trainer-favorites";
const RESULTS_KEY = "ccp-trainer-mock-results";
const DISABLED_KEY = "ccp-trainer-disabled";
const domains: Domain[] = ["クラウドの概念", "セキュリティとコンプライアンス", "クラウドテクノロジーとサービス", "請求、料金、サポート"];
const weights: Record<Domain, number> = {"クラウドの概念":.24,"セキュリティとコンプライアンス":.30,"クラウドテクノロジーとサービス":.34,"請求、料金、サポート":.12};

const correctIds = (q: Question) => q.correctChoiceIds || (q.correctChoiceId ? [q.correctChoiceId] : []);
const same = (a: string[], b: string[]) => a.length === b.length && [...a].sort().every((v,i)=>v===[...b].sort()[i]);
const shuffle = <T,>(items:T[]) => [...items].sort(()=>Math.random()-.5);

function buildMock(count:number, pool:Question[]) {
  const allocations: Record<Domain,number> = count===65
    ? {"クラウドの概念":16,"セキュリティとコンプライアンス":19,"クラウドテクノロジーとサービス":22,"請求、料金、サポート":8}
    : {"クラウドの概念":14,"セキュリティとコンプライアンス":18,"クラウドテクノロジーとサービス":21,"請求、料金、サポート":7};
  return shuffle(domains.flatMap(d=>shuffle(pool.filter(q=>q.domain===d)).slice(0,allocations[d])));
}

export default function Trainer(){
  const [view,setView]=useState<View>("home");
  const [mode,setMode]=useState<Mode>("practice");
  const [queue,setQueue]=useState<Question[]>([]);
  const [index,setIndex]=useState(0);
  const [selected,setSelected]=useState<string[]>([]);
  const [revealed,setRevealed]=useState(false);
  const [history,setHistory]=useState<AnswerRecord[]>([]);
  const [favorites,setFavorites]=useState<string[]>([]);
  const [mockResults,setMockResults]=useState<MockResult[]>([]);
  const [disabled,setDisabled]=useState<string[]>([]);
  const [sessionAnswers,setSessionAnswers]=useState<Record<string,string[]>>({});
  const [secondsLeft,setSecondsLeft]=useState(90*60);
  const [startedAt,setStartedAt]=useState(0);
  const [ready,setReady]=useState(false);

  useEffect(()=>{try{
    setHistory(JSON.parse(localStorage.getItem(HISTORY_KEY)||"[]"));
    setFavorites(JSON.parse(localStorage.getItem(FAVORITES_KEY)||"[]"));
    setMockResults(JSON.parse(localStorage.getItem(RESULTS_KEY)||"[]"));
    setDisabled(JSON.parse(localStorage.getItem(DISABLED_KEY)||"[]"));
  }finally{setReady(true)}},[]);

  useEffect(()=>{
    if(view!=="quiz" || mode==="practice") return;
    const timer=setInterval(()=>setSecondsLeft(s=>Math.max(0,s-1)),1000);
    return()=>clearInterval(timer);
  },[view,mode]);

  const enabled=useMemo(()=>questions.filter(q=>!disabled.includes(q.id)),[disabled]);
  const latest=useMemo(()=>{const m=new Map<string,AnswerRecord>();history.forEach(r=>m.set(r.questionId,r));return m},[history]);
  const incorrect=enabled.filter(q=>latest.get(q.id)?.correct===false);
  const favoriteQuestions=enabled.filter(q=>favorites.includes(q.id));

  const start=(items:Question[],nextMode:Mode="practice")=>{
    setQueue(items);setMode(nextMode);setIndex(0);setSelected([]);setRevealed(false);setSessionAnswers({});setSecondsLeft(90*60);setStartedAt(Date.now());setView("quiz");
  };
  const startMock=(count:60|65)=>start(buildMock(count,enabled),count===65?"mock65":"mock60");
  const toggleSelect=(id:string)=>{const max=correctIds(queue[index]).length;setSelected(s=>max>1?(s.includes(id)?s.filter(x=>x!==id):s.length<max?[...s,id]:s):[id])};
  const saveAnswer=(q:Question,ids:string[])=>{
    const record:AnswerRecord={questionId:q.id,selectedChoiceIds:ids,selectedChoiceId:ids[0],correct:same(ids,correctIds(q)),answeredAt:new Date().toISOString(),mode};
    const next=[...history,record];setHistory(next);localStorage.setItem(HISTORY_KEY,JSON.stringify(next));
  };
  const answer=()=>{if(!selected.length||revealed)return;saveAnswer(queue[index],selected);setRevealed(true)};
  const mockNext=()=>{if(!selected.length)return;const q=queue[index];setSessionAnswers(a=>({...a,[q.id]:selected}));if(index+1>=queue.length){finishMock({...sessionAnswers,[q.id]:selected});return}setIndex(i=>i+1);setSelected(sessionAnswers[queue[index+1]?.id]||[])};
  const finishMock=(answers=sessionAnswers)=>{
    const sessionId=String(Date.now());const now=new Date().toISOString();
    const records=queue.map(q=>({questionId:q.id,selectedChoiceIds:answers[q.id]||[],selectedChoiceId:(answers[q.id]||[])[0],correct:same(answers[q.id]||[],correctIds(q)),answeredAt:now,sessionId,mode} as AnswerRecord));
    const next=[...history,...records];setHistory(next);localStorage.setItem(HISTORY_KEY,JSON.stringify(next));
    const result:MockResult={id:sessionId,mode:mode as "mock60"|"mock65",total:queue.length,correct:records.filter(r=>r.correct).length,durationSeconds:Math.max(0,90*60-secondsLeft),completedAt:now};
    const results=[...mockResults,result];setMockResults(results);localStorage.setItem(RESULTS_KEY,JSON.stringify(results));setSessionAnswers(answers);setView("result");
  };
  useEffect(()=>{if(view==="quiz"&&mode!=="practice"&&secondsLeft===0)finishMock(sessionAnswers)},[secondsLeft]);
  const next=()=>{if(index+1>=queue.length){setView("result");return}setIndex(i=>i+1);setSelected([]);setRevealed(false)};
  const toggleFavorite=(id:string)=>{const n=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];setFavorites(n);localStorage.setItem(FAVORITES_KEY,JSON.stringify(n))};
  const toggleDisabled=(id:string)=>{const n=disabled.includes(id)?disabled.filter(x=>x!==id):[...disabled,id];setDisabled(n);localStorage.setItem(DISABLED_KEY,JSON.stringify(n))};

  if(!ready)return null;
  if(view==="home")return <Home history={history} results={mockResults} enabledCount={enabled.length} onPractice={()=>start(shuffle(enabled).slice(0,20))} onMock={startMock} onDomain={d=>start(shuffle(enabled.filter(q=>q.domain===d)))} onReview={()=>start(incorrect)} reviewCount={incorrect.length} onFavorites={()=>setView("favorites")} favoriteCount={favorites.length} onStats={()=>setView("stats")} onAdmin={()=>setView("admin")} onGuide={()=>setView("guide")}/>;
  if(view==="quiz")return <Quiz question={queue[index]} index={index} total={queue.length} selected={selected} revealed={revealed} favorite={favorites.includes(queue[index]?.id)} mode={mode} secondsLeft={secondsLeft} answeredCount={Object.keys(sessionAnswers).length} onSelect={toggleSelect} onAnswer={answer} onNext={mode==="practice"?next:mockNext} onFavorite={()=>toggleFavorite(queue[index].id)} onExit={()=>setView("home")}/>;
  if(view==="stats")return <Stats history={history} results={mockResults} onBack={()=>setView("home")}/>;
  if(view==="favorites")return <Collection title="お気に入り問題" items={favoriteQuestions} onStart={q=>start(q)} onBack={()=>setView("home")}/>;
  if(view==="admin")return <Admin disabled={disabled} onToggle={toggleDisabled} onBack={()=>setView("home")}/>;
  if(view==="guide")return <InputGuide onPractice={()=>start(shuffle(enabled).slice(0,20))} onBack={()=>setView("home")}/>;
  return <Result queue={queue} history={history} mode={mode} sessionAnswers={sessionAnswers} onRetry={()=>mode==="practice"?start(queue):startMock(mode==="mock65"?65:60)} onHome={()=>setView("home")}/>;
}

function Shell({children}:{children:React.ReactNode}){return <main className="shell"><div className="brand"><span className="brandMark">CCP</span><span>AWS CCP Trainer</span></div>{children}<footer>CLF-C02試験ガイドに沿ったオリジナル問題です。実際の試験問題・ダンプは使用していません。</footer></main>}

function Home({history,results,enabledCount,onPractice,onMock,onDomain,onReview,reviewCount,onFavorites,favoriteCount,onStats,onAdmin,onGuide}:{history:AnswerRecord[];results:MockResult[];enabledCount:number;onPractice:()=>void;onMock:(n:60|65)=>void;onDomain:(d:Domain)=>void;onReview:()=>void;reviewCount:number;onFavorites:()=>void;favoriteCount:number;onStats:()=>void;onAdmin:()=>void;onGuide:()=>void}){
  const correct=history.filter(r=>r.correct).length;const rate=history.length?Math.round(correct/history.length*100):0;const last=results.at(-1);
  return <Shell><section className="hero"><div><span className="eyebrow">AWS CERTIFIED CLOUD PRACTITIONER</span><h1>合格に近づく、<br/><em>毎日の一問。</em></h1><p>現行CLF-C02の出題比率に沿った問題バンクから、実戦形式で力を測れます。</p><div className="heroActions"><button className="primary heroButton" onClick={()=>onMock(65)}>65問模試を開始 <span>→</span></button><button className="secondary" onClick={()=>onMock(60)}>60問短縮模試</button></div><button className="textButton" onClick={onPractice}>20問の通常練習を始める</button></div><div className="scoreCard"><span>これまでの正答率</span><strong>{rate}<small>%</small></strong><div className="scoreLine"><i style={{width:`${rate}%`}}/></div><p>{history.length}回回答済み・問題バンク{enabledCount}問</p>{last&&<p>直近模試：{Math.round(last.correct/last.total*100)}%</p>}</div></section><button className="inputBanner" onClick={onGuide}><span className="inputBannerIcon">25<small>min</small></span><span><b>問題を解く前の、最短インプット</b><small>合格に必要な大枠だけを4章でつかむ</small></span><i>読む →</i></button><section className="section"><div className="sectionTitle"><span>学習メニュー</span><p>目的に合わせて選択</p></div><div className="menuGrid"><Menu icon="✦" tone="orange" title="分野別に練習" text="試験分野を選んで集中トレーニング" expandable>{domains.map(d=><button key={d} onClick={()=>onDomain(d)}>{d}<span>→</span></button>)}</Menu><Menu icon="↻" tone="red" title="間違えた問題を復習" text="苦手な問題を解き直す" count={reviewCount} onClick={onReview}/><Menu icon="★" tone="yellow" title="お気に入り問題" text="あとで見直す問題" count={favoriteCount} onClick={onFavorites}/><Menu icon="▥" tone="blue" title="学習成績・グラフ" text="分野別と模試推移を確認" onClick={onStats}/><Menu icon="⚙" tone="gray" title="問題管理" text="問題の状態・更新日を管理" onClick={onAdmin}/></div></section></Shell>
}

function Menu({icon,tone,title,text,count,onClick,children,expandable}:{icon:string;tone:string;title:string;text:string;count?:number;onClick?:()=>void;children?:React.ReactNode;expandable?:boolean}){return <div className={`menu ${tone}`}><button className="menuMain" onClick={onClick}><span className="menuIcon">{icon}</span><span><strong>{title}</strong><small>{text}</small></span>{count!==undefined&&<b>{count}</b>}{!expandable&&<i>›</i>}</button>{children&&<div className="domainList">{children}</div>}</div>}

function Quiz({question,index,total,selected,revealed,favorite,mode,secondsLeft,answeredCount,onSelect,onAnswer,onNext,onFavorite,onExit}:{question:Question;index:number;total:number;selected:string[];revealed:boolean;favorite:boolean;mode:Mode;secondsLeft:number;answeredCount:number;onSelect:(id:string)=>void;onAnswer:()=>void;onNext:()=>void;onFavorite:()=>void;onExit:()=>void}){
  if(!question)return <Shell><div className="empty"><h2>対象の問題がありません</h2><button className="primary" onClick={onExit}>トップへ戻る</button></div></Shell>;
  const answers=correctIds(question);const isMock=mode!=="practice";const time=`${String(Math.floor(secondsLeft/60)).padStart(2,"0")}:${String(secondsLeft%60).padStart(2,"0")}`;
  return <Shell><div className="quizTop"><button className="back" onClick={onExit}>← 終了</button><div className="progress"><span style={{width:`${((index+(revealed?1:0))/total)*100}%`}}/></div>{isMock&&<span className={`timer ${secondsLeft<600?"urgent":""}`}>◷ {time}</span>}<b>{index+1} / {total}</b></div><article className="questionCard"><div className="questionMeta"><span>問題 {String(index+1).padStart(2,"0")}</span><span className="domainTag">{question.domain}</span>{question.difficulty&&<span className="difficulty">{question.difficulty}</span>}<button aria-label="お気に入り" className={`star ${favorite?"active":""}`} onClick={onFavorite}>★</button></div>{answers.length>1&&<div className="multiNotice">複数選択：{answers.length}つ選んでください</div>}<h2>{question.prompt}</h2><div className="choices">{question.choices.map(c=>{const chosen=selected.includes(c.id);const state=revealed?(answers.includes(c.id)?"correct":chosen?"wrong":""):chosen?"selected":"";return <button key={c.id} disabled={revealed} className={state} onClick={()=>onSelect(c.id)}><b>{c.id}</b><span>{c.text}</span>{answers.length>1&&!revealed&&<i className="checkbox">{chosen?"✓":""}</i>}{revealed&&answers.includes(c.id)&&<i>✓</i>}{revealed&&chosen&&!answers.includes(c.id)&&<i>×</i>}</button>})}</div>{!revealed?<button className="primary answerButton" disabled={selected.length!==answers.length} onClick={isMock?onNext:onAnswer}>{isMock?(index+1===total?"模試を終了して採点":"回答を保存して次へ"):"回答する"}</button>:<Explanation question={question} selected={selected} onNext={onNext} last={index+1===total}/>} {isMock&&<p className="mockHint">模試中は正解を表示しません。回答済み {answeredCount} / {total}</p>}</article></Shell>
}

function Explanation({question,selected,onNext,last}:{question:Question;selected:string[];onNext:()=>void;last:boolean}){const answers=correctIds(question);const ok=same(selected,answers);return <div className="explanation"><div className={`verdict ${ok?"ok":"ng"}`}><strong>{ok?"正解です！":"もう一歩！"}</strong><span>正解：{answers.join("・")}　あなたの回答：{selected.join("・")}</span></div><h3>総合解説</h3><p>{question.explanation}</p><h3>各選択肢の解説</h3><div className="choiceExplainList">{question.choices.map(c=>{const definitions=findDefinitions(`${c.text} ${c.explanation}`);return <div className={`choiceExplainCard ${answers.includes(c.id)?"answer":""}`} key={c.id}><div className="choiceExplainHead"><b>{c.id}</b><strong>{c.text}</strong><span>{answers.includes(c.id)?"正解":"誤答"}</span></div><p>{c.explanation}</p>{definitions.map(d=><div className="termNote" key={d.term}><span>用語メモ</span><p><b>{d.term}</b>：{d.definition}</p></div>)}</div>})}</div><button className="primary answerButton" onClick={onNext}>{last?"結果を見る":"次の問題へ"} →</button></div>}

function Result({queue,history,mode,sessionAnswers,onRetry,onHome}:{queue:Question[];history:AnswerRecord[];mode:Mode;sessionAnswers:Record<string,string[]>;onRetry:()=>void;onHome:()=>void}){
  const recent=mode==="practice"?history.slice(-queue.length):queue.map(q=>({questionId:q.id,correct:same(sessionAnswers[q.id]||[],correctIds(q))}));const correct=recent.filter(r=>r.correct).length;const rate=recent.length?Math.round(correct/recent.length*100):0;
  const domainRates=domains.map(d=>{const qs=queue.filter(q=>q.domain===d);const c=qs.filter(q=>mode==="practice"?recent.some(r=>r.questionId===q.id&&r.correct):same(sessionAnswers[q.id]||[],correctIds(q))).length;return{d,total:qs.length,rate:qs.length?Math.round(c/qs.length*100):0}});
  return <Shell><div className="resultCard wide"><span className="eyebrow">{mode==="practice"?"SESSION COMPLETE":"MOCK EXAM COMPLETE"}</span><h1>{rate}<small>%</small></h1><h2>{correct} / {recent.length} 問正解</h2><p>{rate>=70?"合格圏を意識できる結果です。苦手分野も確認しましょう。":"分野別結果から復習ポイントを絞り込みましょう。"}</p><div className="miniChart">{domainRates.map(x=><div key={x.d}><span>{x.d}</span><div className="bar"><i style={{width:`${x.rate}%`}}/></div><b>{x.rate}%</b></div>)}</div><div className="resultActions"><button className="primary" onClick={onRetry}>別セットに挑戦</button><button className="secondary" onClick={onHome}>トップへ戻る</button></div></div></Shell>
}

function Collection({title,items,onStart,onBack}:{title:string;items:Question[];onStart:(q:Question[])=>void;onBack:()=>void}){return <Shell><div className="pageHead"><button className="back" onClick={onBack}>← トップへ</button><h1>{title}</h1><p>{items.length}問</p></div>{items.length?<div className="collection">{items.map(q=><div key={q.id}><span>{q.domain}</span><p>{q.prompt}</p></div>)}<button className="primary" onClick={()=>onStart(items)}>この問題で練習する</button></div>:<div className="empty"><p>対象の問題はまだありません。</p><button className="secondary" onClick={onBack}>トップへ戻る</button></div>}</Shell>}

function Stats({history,results,onBack}:{history:AnswerRecord[];results:MockResult[];onBack:()=>void}){
  const rows=domains.map(d=>{const ids=new Set(questions.filter(q=>q.domain===d).map(q=>q.id));const r=history.filter(x=>ids.has(x.questionId));return{d,count:r.length,rate:r.length?Math.round(r.filter(x=>x.correct).length/r.length*100):0}});const total=history.length;const overall=total?Math.round(history.filter(r=>r.correct).length/total*100):0;
  return <Shell><div className="pageHead"><button className="back" onClick={onBack}>← トップへ</button><h1>学習成績</h1><p>正答率と模試の推移から、次の復習分野を見つけます。</p></div><div className="statsSummary"><div><span>総回答数</span><strong>{total}</strong><small>回</small></div><div><span>総合正答率</span><strong>{overall}</strong><small>%</small></div><div><span>模試受験</span><strong>{results.length}</strong><small>回</small></div></div><section className="statsCard"><h2>分野別正答率</h2>{rows.map(r=><div className="statRow" key={r.d}><div><span>{r.d}</span><b>{r.rate}%</b></div><div className="bar"><i style={{width:`${r.rate}%`}}/></div><small>{r.count}回回答・公式比率 {Math.round(weights[r.d]*100)}%</small></div>)}</section><section className="statsCard chartCard"><h2>模試スコア推移</h2>{results.length?<div className="trendChart">{results.slice(-10).map((r,i)=>{const rate=Math.round(r.correct/r.total*100);return <div className="trendCol" key={r.id}><span>{rate}%</span><i style={{height:`${Math.max(rate,4)}%`}}/><small>{i+1}</small></div>})}</div>:<p className="muted">模試を完了すると、ここに推移グラフが表示されます。</p>}</section></Shell>
}

function Admin({disabled,onToggle,onBack}:{disabled:string[];onToggle:(id:string)=>void;onBack:()=>void}){const [filter,setFilter]=useState<Domain|"すべて">("すべて");const [search,setSearch]=useState("");const list=questions.filter(q=>(filter==="すべて"||q.domain===filter)&&q.prompt.includes(search));return <Shell><div className="pageHead adminHead"><button className="back" onClick={onBack}>← トップへ</button><h1>問題管理</h1><p>公開状態、難易度、根拠、最終確認日を管理します。</p></div><div className="adminSummary"><span>全{questions.length}問</span><span>公開{questions.length-disabled.length}問</span><span>停止{disabled.length}問</span><span>複数選択{questions.filter(q=>correctIds(q).length>1).length}問</span></div><div className="adminTools"><input aria-label="問題を検索" placeholder="問題文を検索" value={search} onChange={e=>setSearch(e.target.value)}/><select aria-label="分野で絞り込み" value={filter} onChange={e=>setFilter(e.target.value as Domain|"すべて")}><option>すべて</option>{domains.map(d=><option key={d}>{d}</option>)}</select></div><div className="adminTable"><div className="adminRow header"><span>状態</span><span>問題</span><span>属性</span><span>確認日</span></div>{list.map(q=><div className={`adminRow ${disabled.includes(q.id)?"disabledRow":""}`} key={q.id}><button className={`statusPill ${disabled.includes(q.id)?"off":"on"}`} onClick={()=>onToggle(q.id)}>{disabled.includes(q.id)?"停止":"公開"}</button><div><b>{q.id}</b><p>{q.prompt}</p><small>{q.source||"初期問題バンク"}</small></div><div><span className="domainTag">{q.domain}</span><small>{q.difficulty||"基礎"}・{correctIds(q).length>1?"複数選択":"択一"}</small></div><time>{q.reviewedAt||"2026-06-18"}</time></div>)}</div></Shell>}

function InputGuide({onPractice,onBack}:{onPractice:()=>void;onBack:()=>void}){return <Shell><div className="guideHero"><button className="back" onClick={onBack}>← トップへ</button><span className="eyebrow">25-MINUTE INPUT</span><h1>問題を解く前の、<br/><em>最短インプット。</em></h1><p>満点の知識を目指す教材ではありません。問題演習を始めるための「頭の地図」を25分で作ります。</p><div className="guideMeta"><span>全4章</span><span>約25分</span><span>CLF-C02準拠</span></div></div><nav className="guideNav">{guideSections.map(s=><a key={s.id} href={`#${s.id}`}><b>{s.number}</b><span>{s.title}<small>{s.minutes}分</small></span></a>)}</nav><div className="guideBody">{guideSections.map(s=><section id={s.id} className="guideSection" key={s.id}><header><span>{s.number}</span><div><small>CHAPTER {s.number} · {s.minutes} MIN</small><h2>{s.title}</h2><p>{s.summary}</p></div></header><div className="guidePoints">{s.points.map(p=><article key={p.heading}><h3>{p.heading}</h3><p>{p.body}</p></article>)}</div><div className="memoryBox"><b>ここだけは覚える</b>{s.memory.map(m=><span key={m}>✓ {m}</span>)}</div></section>)}</div><section className="strategyBox"><span className="eyebrow">HOW TO USE</span><h2>時間効率を落とさない使い方</h2><ol>{examStrategy.map(x=><li key={x}>{x}</li>)}</ol><button className="primary" onClick={onPractice}>20問練習へ進む →</button></section></Shell>}
