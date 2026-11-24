import{readFileSync as f,writeFileSync as w,mkdirSync as m,readdirSync as d}from'node:fs'
let O=Buffer.alloc(1<<16),L,B=[(a,b)=>a+b|0,(a,b)=>a-b|0,(a,b)=>Math.imul(a,b),(a,b)=>a/b|0,(a,b)=>a%b|0,(a,b)=>(a>>>0)/(b>>>0)|0,(a,b)=>(a>>>0)%(b>>>0)|0,,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,,(a,b)=>a<<b,(a,b)=>a>>b,(a,b)=>a>>>b|0,,(a,b)=>a==b?1:0,(a,b)=>a<b?1:0,(a,b)=>a>>>0<b>>>0?1:0]
const I=process.env.MAKEFUN_INPUT_DIR??'/input',J=process.env.MAKEFUN_OUTPUT_DIR??'/output'
for(const z of d(I).sort()){
let P=f(I+'/'+z+'/program.bin'),Q=f(I+'/'+z+'/input.bin');L=0
let A=new Int32Array(576),s=0,e=0,g=0,t=0,i=0,x,y,c
const n=P.length
try{for(;;){
if(t==1e6)throw 10
if(g<0|g>=n)throw 9
let o=P[g++];t++
if(o>15&o<35&o!=23&o!=27&o!=31){
if(s<2)throw 2
if(o>18&o<23&!A[s-1])throw 4
y=A[s-1];x=A[s-2];s-=2;A[s++]=B[o-16](x,y)
}else switch(o){
case 0:throw 0
case 1:
if(g>=n)throw 9
if(s>255)throw 3
A[s++]=(P[g++]<<24)>>24
break
case 2:
if(g+3>=n)throw 9
if(s>255)throw 3
A[s++]=P[g]|P[g+1]<<8|P[g+2]<<16|P[g+3]<<24;g+=4
break
case 3:
if(!s--)throw 2
break
case 4:
if(!s)throw 2
if(s>255)throw 3
A[s]=A[s-1];s++
break
case 5:
if(s<2)throw 2;[A[s-1],A[s-2]]=[A[s-2],A[s-1]]
break
case 6:
if(s<2)throw 2
if(s>255)throw 3
A[s]=A[s-2];s++
break
case 7:
if(s<3)throw 2;[A[s-3],A[s-2],A[s-1]]=[A[s-2],A[s-1],A[s-3]]
break
case 23:
if(!s)throw 2
A[s-1]=-A[s-1]|0
break
case 27:
if(!s)throw 2
A[s-1]=~A[s-1]
break
case 48:case 49:case 50:{
if(g+1>=n)throw 9
let v=(P[g]|P[g+1]<<8)<<16>>16;g+=2
let k=1
if(o>48){if(!s)throw 2;x=A[--s];k=o==49?x==0:x!=0}
if(k)g+=v
break}
case 51:
if(g+1>=n)throw 9
if(e==64)throw 7
x=P[g]|P[g+1]<<8;g+=2;A[256+e++]=g;g=x
break
case 52:
if(!e)throw 8
g=A[256+--e]
break
case 64:
if(!s)throw 2
x=A[s-1];if(x<0|x>255)throw 6;A[s-1]=A[320+x]
break
case 65:
if(s<2)throw 2
x=A[s-1];y=A[s-2];if(x<0|x>255)throw 6;s-=2;A[320+x]=y
break
case 80:
if(!s)throw 2
x=String(A[s-1]);if(L+x.length>65536)throw 11;s--;L+=O.write(x,L)
break
case 81:
if(!s)throw 2
if(L>65535)throw 11
O[L++]=A[--s]&255
break
case 82:
if(s>255)throw 3
A[s++]=i<Q.length?Q[i++]:-1
break
case 83:
if(!s)throw 2
throw A[--s]&255
default:
throw 5
}}}catch(j){c=j}
m(J+'/'+z,{recursive:true});w(J+'/'+z+'/stdout.bin',O.subarray(0,L));w(J+'/'+z+'/exit.txt',c+'')
}
