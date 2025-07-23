import { OpToken, OpCodePrices, OpCode } from "@cityofzion/neon-core/lib/sc";

const form = document.getElementById('tx-form');
const output = document.getElementById('output');
const RPC_ENDPOINT = 'https://node.neodepot.org/';

function hexFromBase64(b64) {
  const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const txid = document.getElementById('txid').value.trim();
  output.textContent = 'Loading...';
  try {
    const body = {
      jsonrpc: '2.0',
      method: 'getrawtransaction',
      params: [txid, 1],
      id: 1
    };
    const resp = await fetch(RPC_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await resp.json();
    if (!data.result) throw new Error(data.error?.message || 'No result');
    const hex = hexFromBase64(data.result.script);
    const tokens = OpToken.fromScript(hex);
    let total = 0;
    const lines = tokens.map(t => {
      const price = OpCodePrices[t.code] || 0;
      total += price;
      const name = OpCode[t.code];
      const params = t.params ? ' ' + t.params : '';
      return `${name}${params} -> ${price} GAS`;
    });
    lines.push(`Total GAS: ${total}`);
    output.textContent = lines.join('\n');
  } catch (err) {
    output.textContent = 'Error: ' + err.message;
  }
});
