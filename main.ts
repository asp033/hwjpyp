import{readFileSync as f,writeFileSync as w,mkdirSync as m,readdirSync as d}from'node:fs'
let O=Buffer.alloc(1<<16),L,B='a+b;a-b;Math.imul(a,b);a/b;a%b;(a>>>0)/(b>>>0);(a>>>0)%(b>>>0);0;a&b;a|b;a^b;0;a<<b;a>>b;a>>>b;0;+(a==b);+(a<b);a>>>0<b>>>0?1:0'.split(';').map(s=>eval('(a,b)=>'+s))
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:J='/output'}=process.env
for(const z of d(I)){
let P=f(I+'/'+z+'/program.bin'),Q=f(I+'/'+z+'/input.bin'),p=J+'/'+z;L=0
let A=new Int32Array(576),s=0,e=0,g=0,t=0,i=0,x,y,k
const n=P.length
try{for(;;){
if(t==1e6)throw 10
if(g>>>0>=n)throw 9
let o=P[g++];t++
if(o>15&o<35&o%4!=3|o==19){
if(s<2)throw 2
if(o>18&o<23&!A[s-1])throw 4
y=A[s-1];x=A[s-2];s-=2;A[s++]=B[o-16](x,y)
}else if(o==23|o==27){if(!s)throw 2;A[s-1]=o==23?-A[s-1]:~A[s-1]}else switch(o){
case 0:throw 0
case 1:
if(g>=n)throw 9
if(s>>8)throw 3
A[s++]=P.readInt8(g++)
break
case 2:
if(g+3>=n)throw 9
if(s>>8)throw 3
A[s++]=P.readInt32LE(g);g+=4
break
case 3:
if(!s--)throw 2
break
case 4:
if(!s)throw 2
if(s>>8)throw 3
A[s]=A[s-1];s++
break
case 5:
if(s<2)throw 2;[A[s-1],A[s-2]]=[A[s-2],A[s-1]]
break
case 6:
if(s<2)throw 2
if(s>>8)throw 3
A[s]=A[s-2];s++
break
case 7:
if(s<3)throw 2;[A[s-3],A[s-2],A[s-1]]=[A[s-2],A[s-1],A[s-3]]
break
case 48:case 49:case 50:
if(g+1>=n)throw 9
y=P.readInt16LE(g);g+=2
k=1
if(o>48){if(!s)throw 2;x=A[--s];k=o==49==!x}
if(k)g+=y
break
case 51:
if(g+1>=n)throw 9
if(e>>6)throw 7
x=P[g]|P[g+1]<<8;g+=2;A[256+e++]=g;g=x
break
case 52:
if(!e)throw 8
g=A[256+--e]
break
case 64:
if(!s)throw 2
x=A[s-1];if(x>>8)throw 6;A[s-1]=A[320+x]
break
case 65:
if(s<2)throw 2
x=A[s-1];y=A[s-2];if(x>>8)throw 6;s-=2;A[320+x]=y
break
case 80:
if(!s)throw 2
x=''+A[s-1];if(L+x.length>1<<16)throw 11;s--;L+=O.write(x,L)
break
case 81:
if(!s)throw 2
if(L>>16)throw 11
O[L++]=A[--s]&255
break
case 82:
if(s>>8)throw 3
A[s++]=i<Q.length?Q[i++]:-1
break
case 83:
if(!s)throw 2
throw A[--s]&255
default:
throw 5
}}}catch(j){x=j}
m(p,{recursive:true});w(p+'/stdout.bin',O.subarray(0,L));w(p+'/exit.txt',x+'')
}
