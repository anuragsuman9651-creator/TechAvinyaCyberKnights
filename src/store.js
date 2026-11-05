// Shared data layer (localStorage prototype). Swap these functions for Supabase/Firebase later.
import {useEffect,useState} from 'react';
const g=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const s=(k,v)=>{localStorage.setItem(k,JSON.stringify(v));dispatchEvent(new Event('cl'))};
export const useData=()=>{const[,f]=useState(0);useEffect(()=>{const h=()=>f(x=>x+1);addEventListener('cl',h);return()=>removeEventListener('cl',h)},[])};
export const CATS={'Academic':['Engineering Books','Reference Books','Handwritten Notes','Previous Year Question Papers','Scientific Calculators','Drawing Instruments','Lab Equipment','Lab Coats','Other Academic Materials'],
'Non-Academic':['Electronics and Accessories','Headphones and Speakers','Mobile Accessories','Bicycles','Clothes and Shoes','Hostel Essentials','Sports Equipment','Musical Instruments','Furniture','Other Daily-use Products']};
export const CONDS=['New','Like New','Good','Fair'];
const SELLER={id:'S0',name:'Sample Seller',role:'seller',email:'sample@campus.edu',password:'-',dept:'Mechanical',year:'3'};
const L=(id,productName,mainCategory,subCategory,listingType,condition,o)=>({id,sellerId:'S0',productName,mainCategory,subCategory,listingType,condition,description:'Sample listing for demo.',brand:'',pickupLocation:'Main Library',status:'available',sample:true,createdAt:Date.now()-id.slice(1)*3600e3,...o});
const seed=[L('P1','Engineering Mathematics Book','Academic','Engineering Books','sell','Good',{price:150}),
L('P2','Scientific Calculator','Academic','Scientific Calculators','sell','Like New',{price:500,brand:'Casio'}),
L('P3','HP Laptop (8GB / 512GB SSD)','Non-Academic','Electronics and Accessories','rent','Like New',{rentAmount:300,rentPeriod:'day',securityDeposit:2000,brand:'HP',pickupLocation:'Hostel Block A'}),
L('P4','Engineering Drawing Instruments','Academic','Drawing Instruments','donate','Good',{}),
L('P5','Bicycle','Non-Academic','Bicycles','sell','Good',{price:1500,brand:'Hero'}),
L('P6','Bluetooth Headphones','Non-Academic','Headphones and Speakers','sell','Good',{price:500,brand:'Boat'}),
L('P7','Physics Notes','Academic','Handwritten Notes','donate','Good',{}),
L('P8','Study Lamp','Non-Academic','Hostel Essentials','donate','Like New',{pickupLocation:'Hostel Block B'})];
if(!localStorage.getItem('cl_l')){localStorage.setItem('cl_l',JSON.stringify(seed));localStorage.setItem('cl_u',JSON.stringify([SELLER]))}
export const users=()=>g('cl_u',[]);
export const me=()=>users().find(u=>u.id===g('cl_s',null))||null;
export const register=f=>{if(!f.email||!f.name||!f.password)return{error:'Fill all required fields'};
 if(users().some(u=>u.email.toLowerCase()===f.email.toLowerCase()))return{error:'Email already registered'};
 const u={id:'U'+Date.now(),name:f.name,email:f.email,password:f.password,role:f.role,dept:f.dept||'',year:f.year||'',studentId:f.studentId||'',verified:false};
 s('cl_u',[...users(),u]);s('cl_s',u.id);return{ok:1}};
export const login=(email,pw,role)=>{const u=users().find(x=>x.email.toLowerCase()===(email||'').toLowerCase()&&x.password===pw);
 if(!u)return{error:'Wrong email or password'};if(u.role!==role)return{error:`This account is a ${u.role} account. Switch the role above.`};
 s('cl_s',u.id);return{ok:1}};
export const logout=()=>s('cl_s',null);
export const listings=()=>g('cl_l',[]);
export const addListing=l=>s('cl_l',[{...l,id:'P'+Date.now(),createdAt:Date.now()},...listings()]);
export const updListing=(id,p)=>s('cl_l',listings().map(l=>l.id===id?{...l,...p,updatedAt:Date.now()}:l));
export const delListing=id=>s('cl_l',listings().filter(l=>l.id!==id));
export const requests=()=>g('cl_r',[]);
export const addRequest=r=>s('cl_r',[{...r,id:'R'+Date.now(),status:'pending',createdAt:Date.now()},...requests()]);
export const updRequest=(id,p)=>s('cl_r',requests().map(r=>r.id===id?{...r,...p}:r));
export const wish=uid=>g('cl_w_'+uid,[]);
export const toggleWish=(uid,id)=>{const w=wish(uid);s('cl_w_'+uid,w.includes(id)?w.filter(x=>x!==id):[...w,id])};
export const priceOf=l=>l.listingType==='donate'?'FREE':l.listingType==='rent'?`₹${l.rentAmount}/${l.rentPeriod}`:`₹${l.price}`;
export const sellerName=id=>users().find(u=>u.id===id)?.name||'Student';
export const ICON={'Engineering Books':'📘','Reference Books':'📚','Handwritten Notes':'📝','Previous Year Question Papers':'📄','Scientific Calculators':'🧮','Drawing Instruments':'📐','Lab Equipment':'🔬','Lab Coats':'🥼','Electronics and Accessories':'💻','Headphones and Speakers':'🎧','Mobile Accessories':'📱','Bicycles':'🚲','Clothes and Shoes':'👟','Hostel Essentials':'🛏️','Sports Equipment':'🏏','Musical Instruments':'🎸','Furniture':'🪑'};
