import {useState} from 'react';import {Link,useNavigate,useSearchParams} from 'react-router-dom';
import {login,register} from '../store';
export default function Auth(){const[p]=useSearchParams();const nav=useNavigate();
const[role,setRole]=useState(p.get('role')==='seller'?'seller':'buyer');const[mode,setMode]=useState(p.get('mode')==='register'?'register':'login');
const[f,setF]=useState({});const[err,setErr]=useState('');const ch=k=>e=>setF({...f,[k]:e.target.value});
const submit=e=>{e.preventDefault();setErr('');let r;
 if(mode==='login')r=login(f.email,f.password,role);
 else{if(f.password!==f.confirm)return setErr('Passwords do not match');if((f.password||'').length<6)return setErr('Password must be 6+ characters');r=register({...f,role})}
 if(r.error)return setErr(r.error);nav('/'+role)};
return <div className="authpage"><form className="card auth" onSubmit={submit}>
<Link to="/" className="logo">← CampusLoop</Link><h2>{mode==='login'?'Welcome back':'Create your account'}</h2>
<div className="seg">{['buyer','seller'].map(r=><button type="button" key={r} className={role===r?'on':''} onClick={()=>setRole(r)}>{r==='buyer'?'🛒 Buyer':'🏷️ Seller'}</button>)}</div>
{mode==='register'&&<><input required placeholder="Full name" onChange={ch('name')}/></>}
<input required type="email" placeholder="College email" onChange={ch('email')}/>
<input required type="password" placeholder="Password" onChange={ch('password')}/>
{mode==='register'&&<><input required type="password" placeholder="Confirm password" onChange={ch('confirm')}/><input placeholder="Department" onChange={ch('dept')}/><input placeholder="Year of study" onChange={ch('year')}/><input placeholder="Student ID (not verified yet)" onChange={ch('studentId')}/></>}
{err&&<div className="err">{err}</div>}
<button className="btn big">{mode==='login'?`Login as ${role}`:`Register as ${role}`}</button>
<small className="muted">⚠️ Prototype: accounts are stored in this browser only. College email / student ID verification is not active.</small>
<a className="muted" onClick={()=>setMode(mode==='login'?'register':'login')}>{mode==='login'?'New here? Register':'Have an account? Login'}</a></form></div>}
