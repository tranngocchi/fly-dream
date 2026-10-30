export const LAKE_DURATION=13;
export function clamp01(value){return Math.max(0,Math.min(1,value))}
export function smoothstep(a,b,x){const t=clamp01((x-a)/(b-a));return t*t*(3-2*t)}
export function driftAt(seconds,impulse=0){const p=clamp01(seconds/LAKE_DURATION);const distance=(1-Math.exp(-2.1*Math.pow(p,1.35)))/(1-Math.exp(-2.1));return {progress:p,x:Math.sin(p*4.5)*.45+Math.sin(p*8)*.12+impulse*Math.sin(p*Math.PI)*1.2,z:.25-21*distance,glow:smoothstep(7.5,10.5,seconds),ascent:smoothstep(8.5,11.8,seconds)}}
export function surfaceAt(x,z,time,gentle=false){const amplitude=gentle?.009:.022;return Math.sin(x*1.1+time*.8)*amplitude+Math.cos(z*.83-time*.65)*amplitude*.65}
