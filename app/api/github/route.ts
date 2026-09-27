import { githubSnapshot } from '@/data/portfolio';
export async function GET() {
  try {
    const options={headers:{'Accept':'application/vnd.github+json','User-Agent':'Safi-Portfolio'},signal:AbortSignal.timeout(4500)};
    const [userRes,eventsRes]=await Promise.all([fetch('https://api.github.com/users/safiullah-24',options),fetch('https://api.github.com/users/safiullah-24/events/public?per_page=30',options)]);
    if(!userRes.ok||!eventsRes.ok)throw new Error('GitHub unavailable');
    const user=await userRes.json() as {public_repos:number};
    const events=await eventsRes.json() as {type:string;repo:{name:string};created_at:string}[];
    if(!Number.isFinite(user.public_repos)||!Array.isArray(events))throw new Error('Invalid GitHub response');
    const seen=new Set<string>();
    const labels:Record<string,string>={PushEvent:'Code pushed',PullRequestEvent:'Pull-request activity',PullRequestReviewEvent:'Pull-request review',CreateEvent:'Repository or branch created',IssuesEvent:'Issue activity'};
    const activity=events.filter(e=>labels[e.type]).filter(e=>{const key=e.repo.name+e.created_at.slice(0,10);if(seen.has(key))return false;seen.add(key);return true;}).slice(0,3).map(e=>({repo:e.repo.name.split('/')[1],type:labels[e.type],date:e.created_at,url:'https://github.com/'+e.repo.name}));
    return Response.json({source:'live',updatedAt:new Date().toISOString(),publicRepos:user.public_repos,events:activity},{headers:{'Cache-Control':'public, max-age=900, stale-while-revalidate=3600'}});
  } catch {
    return Response.json(githubSnapshot,{headers:{'Cache-Control':'public, max-age=60'}});
  }
}
