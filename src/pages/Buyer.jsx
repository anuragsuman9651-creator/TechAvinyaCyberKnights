import {useState} from 'react';import {Link,NavLink,Routes,Route,useParams,useSearchParams,useNavigate} from 'react-router-dom';
import {Heart,Search} from 'lucide-react';
import {CATS,CONDS,listings,priceOf,sellerName,me,logout,useData,wish,toggleWish,requests,addRequest,updRequest,ICON,users} from '../store';
const Card=({l,u})=>{const w=wish(u.id).includes(l.id);return <div className="card prod"><button className={'heart '+(w?'on':'')} onClick={()=>toggleWish(u.id,l.id)}><Heart size={18} fill={w?'currentColor':'none'}/></button>
<div className="em">{ICON[l.subCategory]||'📦'}</div><span className={'tag '+l.listingType}>{l.listingType}</span> <span className="tag">{l.condition}</span>
<b>{l.productName}</b><div className="muted">{l.subCategory}{l.brand&&' · '+l.brand}</div><div className="muted">👤 {sellerName(l.sellerId)} · 📍 {l.pickupLocation}</div><div className="price">{priceOf(l)}</div>
{l.status!=='available'?<span className="tag">Unavailable ({l.status})</span>:<Link className="btn sm" to={'/buyer/item/'+l.id}>View Details</Link>}</div>};
function Market({u}){useData();const[sp]=useSearchParams();
const[f,setF]=useState({q:'',main:'',sub:sp.get('sub')||'',type:'',cond:'',min:'',max:'',brand:'',sort:'new'});const set=k=>e=>setF({...f,[k]:e.target.value,...(k==='main'?{sub:''}:{})});
const all=listings().filter(l=>l.status==='available');
const subs=f.main?CATS[f.main]:[...CATS.Academic,...CATS['Non-Academic']];
const brands=[...new Set(all.filter(l=>!f.sub||l.subCategory===f.sub).map(l=>l.brand).filter(Boolean))];
let r=all.filter(l=>(!f.q||(l.productName+l.brand+l.subCategory+l.mainCategory).toLowerCase().includes(f.q.toLowerCase()))&&(!f.main||l.mainCategory===f.main)&&(!f.sub||l.subCategory===f.sub)&&(!f.type||l.listingType===f.type)&&(!f.cond||l.condition===f.cond)&&(!f.brand||l.brand===f.brand)&&(l.listingType==='donate'||((f.min===''||(l.price??l.rentAmount)>=+f.min)&&(f.max===''||(l.price??l.rentAmount)<=+f.max))));
const pv=l=>l.listingType==='donate'?0:l.price??l.rentAmount;
r=[...r].sort((a,b)=>f.sort==='lo'?pv(a)-pv(b):f.sort==='hi'?pv(b)-pv(a):f.sort==='upd'?(b.updatedAt||b.createdAt)-(a.updatedAt||a.createdAt):b.createdAt-a.createdAt);
const chips=Object.entries(f).filter(([k,v])=>v&&k!=='sort'&&k!=='q');
return <div><div className="welcome card"><h2>Find What You Need, Right Here on Campus.</h2><p className="muted">Buy, rent, or get useful products from fellow students within your campus.</p>
<div className="search"><Search size={18}/><input placeholder="Search for books, laptops, calculators, bicycles..." value={f.q} onChange={set('q')}/></div></div>
<div className="filters card"><select value={f.main} onChange={set('main')}><option value="">Academic / Non-Academic</option>{Object.keys(CATS).map(c=><option key={c}>{c}</option>)}</select>
<select value={f.sub} onChange={set('sub')}><option value="">All subcategories</option>{subs.map(c=><option key={c}>{c}</option>)}</select>
<select value={f.type} onChange={set('type')}><option value="">Buy / Rent / Donate</option><option value="sell">Buy</option><option value="rent">Rent</option><option value="donate">Donate / Free</option></select>
<select value={f.cond} onChange={set('cond')}><option value="">Any condition</option>{CONDS.map(c=><option key={c}>{c}</option>)}</select>
{brands.length>0&&<select value={f.brand} onChange={set('brand')}><option value="">Any brand</option>{brands.map(c=><option key={c}>{c}</option>)}</select>}
<input type="number" placeholder="Min ₹" value={f.min} onChange={set('min')}/><input type="number" placeholder="Max ₹" value={f.max} onChange={set('max')}/>
<select value={f.sort} onChange={set('sort')}><option value="new">Newest First</option><option value="lo">Price: Low to High</option><option value="hi">Price: High to Low</option><option value="upd">Recently Updated</option></select>
<button className="btn ghost sm" onClick={()=>setF({q:'',main:'',sub:'',type:'',cond:'',min:'',max:'',brand:'',sort:'new'})}>Clear All</button></div>
<div className="row gap wrapflex">{chips.map(([k,v])=><span className="tag" key={k}>{v}</span>)}<b>{r.length} matching products</b></div>
<div className="grid4">{r.map(l=><Card key={l.id} l={l} u={u}/>)}</div>{!r.length&&<p className="muted">No products match these filters.</p>}</div>}
function Detail({u}){useData();const{id}=useParams();const nav=useNavigate();const l=listings().find(x=>x.id===id);const[m,setM]=useState('');const[st,setSt]=useState('');const[en,setEn]=useState('');
if(!l)return <p>Listing not found. <Link to="/buyer">Back</Link></p>;
const done=requests().some(r=>r.listingId===l.id&&r.buyerId===u.id&&['pending','accepted'].includes(r.status));const ok=l.status==='available';
const label={sell:'Contact Seller',rent:'Request to Rent',donate:'Request Donation'}[l.listingType];
const send=e=>{e.preventDefault();addRequest({listingId:l.id,sellerId:l.sellerId,buyerId:u.id,buyerName:u.name,type:l.listingType,message:m,start:st,end:en});nav('/buyer/requests')};
const s=users().find(x=>x.id===l.sellerId);
return <div className="grid2"><div className="card"><div className="em big">{ICON[l.subCategory]||'📦'}</div><h2>{l.productName}</h2><span className={'tag '+l.listingType}>{l.listingType}</span> <span className="tag">{l.condition}</span>
<div className="price">{priceOf(l)}{l.listingType==='rent'&&l.securityDeposit?<small className="muted"> + ₹{l.securityDeposit} refundable deposit</small>:null}</div>
<p>{l.description}</p><p className="muted">{l.mainCategory} › {l.subCategory}{l.brand&&' · Brand: '+l.brand}<br/>📍 Pickup: {l.pickupLocation}</p>
<p className="muted">Seller: {s?.name} {s?.dept&&'· '+s.dept} {s?.year&&'· Year '+s.year}</p></div>
<form className="card" onSubmit={send}><h3>{label}</h3>{l.listingType==='rent'&&<><label>Start date<input required type="date" value={st} onChange={e=>setSt(e.target.value)}/></label><label>End date<input required type="date" value={en} onChange={e=>setEn(e.target.value)}/></label></>}
<textarea required placeholder="Message to the seller" value={m} onChange={e=>setM(e.target.value)}/>
<button className="btn" disabled={!ok||done}>{!ok?'No longer available':done?'Request already sent':label}</button></form></div>}
function Wish({u}){useData();const ids=wish(u.id);const r=listings().filter(l=>ids.includes(l.id));return <div><h2>My Wishlist</h2><div className="grid4">{r.map(l=><Card key={l.id} l={l} u={u}/>)}</div>{!r.length&&<p className="muted">No saved products yet.</p>}</div>}
function Reqs({u}){useData();const r=requests().filter(x=>x.buyerId===u.id);
return <div><h2>My Requests</h2>{['pending','accepted','rejected','completed','cancelled'].map(s=>{const rs=r.filter(x=>x.status===s);return rs.length>0&&<div key={s}><h3 style={{textTransform:'capitalize'}}>{s}</h3>{rs.map(x=>{const l=listings().find(y=>y.id===x.listingId);return <div className="card row between" key={x.id}><div><b>{l?.productName}</b> <span className={'tag '+x.type}>{x.type}</span><div className="muted">{x.message}{x.start&&` · ${x.start} → ${x.end}`}</div></div>{s==='pending'&&<button className="btn ghost sm" onClick={()=>updRequest(x.id,{status:'cancelled'})}>Cancel</button>}</div>})}</div>})}{!r.length&&<p className="muted">No requests yet.</p>}</div>}
export default function Buyer(){useData();const u=me();return <div><nav className="nav"><div className="wrap row between"><Link to="/" className="logo">CampusLoop</Link>
<div className="links"><NavLink end to="/buyer">Explore Products</NavLink><NavLink to="/buyer/wishlist">My Wishlist</NavLink><NavLink to="/buyer/requests">My Requests</NavLink></div><div className="row gap"><small>{u.name}</small><button className="btn ghost sm" onClick={logout}>Logout</button></div></div></nav>
<main className="wrap sec"><Routes><Route index element={<Market u={u}/>}/><Route path="item/:id" element={<Detail u={u}/>}/><Route path="wishlist" element={<Wish u={u}/>}/><Route path="requests" element={<Reqs u={u}/>}/></Routes></main></div>}
