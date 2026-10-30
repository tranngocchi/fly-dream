const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=__dirname,output=path.join(root,'dist');
const config=JSON.parse(fs.readFileSync(path.join(root,'vercel.json'),'utf8').replace(/^\uFEFF/,''));
assert.equal(config.outputDirectory,'dist');
const html=fs.readFileSync(path.join(output,'index.html'),'utf8');
const refs=[...html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"]+)"/g)].map(x=>x[1]).filter(x=>!/^https?:/.test(x));
for(const ref of refs){const file=ref.split('?')[0];assert.ok(fs.existsSync(path.join(output,file)),'Missing deployed asset: '+file);assert.deepEqual(fs.readFileSync(path.join(output,file)),fs.readFileSync(path.join(root,file)),'Outdated deployed asset: '+file)}
assert.ok(refs.some(x=>x.startsWith('prayer.js')));assert.ok(refs.some(x=>x.startsWith('lake.bundle.js')));
for(const file of ['node_modules','package.json','verify.cjs','lake-scene.mjs'])assert.ok(!fs.existsSync(path.join(output,file)),'Only public assets belong in dist');
console.log('PASS: Vercel output, complete HTML asset references, current bundles, public files only');
