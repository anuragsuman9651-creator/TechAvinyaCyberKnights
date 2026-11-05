import {Link} from 'react-router-dom';
import {Search,MessageCircle,Handshake,Tag,Clock,Gift,Leaf,Wallet,Users,MapPin,Repeat} from 'lucide-react';
import {listings,priceOf,sellerName,me,useData,logout} from '../store';
const go=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
const CATS=[['Academic Books','Engineering Books','📘'],['Notes & Study Material','Handwritten Notes','📝'],['Calculators','Scientific Calculators','🧮'],['Electronics','Electronics and Accessories','💻'],['Mobile Accessories','Mobile Accessories','📱'],['Headphones & Speakers','Headphones and Speakers','🎧'],['Bicycles','Bicycles','🚲'],['Hostel Essentials','Hostel Essentials','🛏️'],['Sports Equipment','Sports Equipment','🏏'],['Drawing & Stationery','Drawing Instruments','📐'],['Musical Instruments','Musical Instruments','🎸'],['Furniture','Furniture','🪑']];
export default function Home(){useData();const u=me();const feat=listings().filter(l=>l.status==='available').slice(0,5);
return <div>
<nav className="nav"><div className="wrap row between">
 <b className="logo"><Repeat size={20}/> CampusLoop</b>
 <div className="links"><a onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Home</a><Link to="/buyer">Explore Marketplace</Link><a onClick={()=>go('how')}>How It Works</a><a onClick={()=>go('cats')}>Categories</a><a onClick={()=>go('why')}>About Us</a></div>
 <div className="row gap">{u?<><Link className="btn" to={'/'+u.role}>My {u.role} dashboard</Link><button className="btn ghost" onClick={logout}>Logout</button></>:<><Link className="btn ghost" to="/auth">Login</Link><Link className="btn ghost" to="/auth?mode=register">Register</Link><Link className="btn" to="/auth?mode=register">Get Started</Link></>}</div></div></nav>

<header className="hero wrap"><div><span className="tag">🎓 College-exclusive marketplace</span>
 <h1>Your Campus. <span className="grad">Your Marketplace.</span></h1>
 <p className="lead">Buy, Sell, Rent &amp; Donate — Everything You Need, Right Within Your Campus.</p>
 <p className="muted">CampusLoop connects students to exchange useful products, save money, and build a more connected campus community.</p>
 <div className="row gap"><Link className="btn big" to="/auth?role=buyer">Explore Marketplace</Link><Link className="btn big ghost" to="/auth?role=seller">Start Selling</Link></div></div>
 <div className="collage">{['📘 Maths Book|₹150','💻 Laptop|₹300/day','🚲 Bicycle|₹1,500','📐 Drawing Kit|FREE'].map((x,i)=>{const[a,b]=x.split('|');return <div key={i} className={'float f'+i}><div className="em">{a.split(' ')[0]}</div><b>{a.slice(3)}</b><span className="tag">{b}</span></div>})}</div></header>

<section className="wrap grid2 sec"><div className="card role b"><h2>I'm a Buyer</h2><h3>Find What You Need.</h3><p className="muted">Explore products listed by fellow students. Buy, rent, or request free donations within your campus.</p><div className="em big">🛒</div><div className="row gap"><Link className="btn" to="/auth?role=buyer">Explore Products</Link><Link className="btn ghost" to="/auth?role=buyer">Login as Buyer</Link></div></div>
<div className="card role s"><h2>I'm a Seller</h2><h3>Turn Unused Items Into Value.</h3><p className="muted">List your unused products and connect with students who need them. Sell, rent, or donate with ease.</p><div className="em big">🏷️</div><div className="row gap"><Link className="btn" to="/auth?role=seller&mode=register">Start Selling</Link><Link className="btn ghost" to="/auth?role=seller">Login as Seller</Link></div></div></section>

<section id="how" className="wrap sec"><h2 className="c">How CampusLoop Works</h2><div className="grid2">
{[['For Buyers',[[Search,'Explore','Browse products and apply filters.'],[MessageCircle,'Connect','Contact the student who listed it.'],[Handshake,'Exchange','Arrange pickup within campus.']]],['For Sellers',[[Tag,'List','Add product details and photos.'],[MessageCircle,'Connect','Receive enquiries and requests.'],[Handshake,'Complete','Sell, rent or donate and update status.']]]].map(([t,st])=><div className="card" key={t}><h3>{t}</h3>{st.map(([I,a,b],i)=><div className="row gap step" key={a}><span className="ico"><I size={18}/></span><div><b>{i+1}. {a}</b><div className="muted">{b}</div></div></div>)}</div>)}</div></section>

<section id="cats" className="wrap sec"><h2 className="c">Explore What Your Campus Has to Offer.</h2><div className="grid4">{CATS.map(([n,sub,e])=><Link key={n} to={'/buyer?sub='+encodeURIComponent(sub)} className="card cat"><div className="em">{e}</div><b>{n}</b><span className="muted">Explore →</span></Link>)}</div></section>

<section className="wrap sec"><h2 className="c">Three Ways to Exchange</h2><div className="grid3">
{[[Tag,'SELL','Give your unused products a second life and earn money.','sell'],[Clock,'RENT','Let other students use your products temporarily and earn rental income.','rent'],[Gift,'DONATE','Help fellow students by giving away useful products for free.','donate']].map(([I,t,d,c])=><div key={t} className={'card way '+c}><I size={28}/><h3>{t}</h3><p>{d}</p></div>)}</div></section>

<section className="wrap sec"><h2 className="c">Popular Around Your Campus.</h2><div className="grid5">{feat.map(l=><div className="card prod" key={l.id}><div className="em">{l.listingType==='donate'?'🎁':'📦'}</div><span className={'tag '+l.listingType}>{l.listingType}</span>{l.sample&&<small className="muted"> Sample</small>}<b>{l.productName}</b><div className="muted">{l.condition} · {sellerName(l.sellerId)}</div><div className="price">{priceOf(l)}</div><Link className="btn sm" to="/buyer">View Details</Link></div>)}</div></section>

<section id="why" className="wrap sec"><h2 className="c">Why CampusLoop?</h2><div className="grid3">
{[[MapPin,'Campus-focused','Built only for your college.'],[Wallet,'Affordable','Save money on student essentials.'],[Users,'Direct connections','Student-to-student, no middlemen.'],[Repeat,'Buy, Rent, Donate','All in one platform.'],[Handshake,'Campus pickup','Meet on campus, no delivery.'],[Leaf,'Reuse & reduce waste','Give products a second life.']].map(([I,t,d])=><div className="card" key={t}><span className="ico"><I size={18}/></span><b> {t}</b><div className="muted">{d}</div></div>)}</div></section>

<section className="wrap sec"><div className="cta"><h2>Your Next Great Find Is Already on Campus.</h2><p>Join your campus marketplace and start exchanging smarter.</p><div className="row gap c"><Link className="btn white" to="/auth?role=buyer&mode=register">Explore as Buyer</Link><Link className="btn outline" to="/auth?role=seller&mode=register">Start Selling</Link></div></div></section>

<footer className="foot"><div className="wrap row between wrapflex"><div><b>CampusLoop</b><div>Connecting students through a smarter campus marketplace.</div><small>Contact: your-email@example.com (placeholder)</small></div><div className="row gap wrapflex"><a onClick={()=>window.scrollTo({top:0})}>Home</a><Link to="/buyer">Explore</Link><a onClick={()=>go('how')}>How It Works</a><a>Privacy Policy</a><a>Terms</a></div></div><div className="wrap"><small>© {new Date().getFullYear()} CampusLoop. Prototype — not an official college service.</small></div></footer></div>}
