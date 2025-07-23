import { rpc, sc } from "https://esm.sh/@cityofzion/neon-js@5.7.0";
import { NeonParser } from "https://esm.sh/@cityofzion/neon-dappkit@0.6.0";

const form = document.getElementById('tx-form');
const output = document.getElementById('output');
const RPC_ENDPOINT = 'https://node.neodepot.org/';
const rpcClient = new rpc.RPCClient(RPC_ENDPOINT);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const txid = document.getElementById('txid').value.trim();
  output.textContent = 'Loading...';
  try {
    const data = await rpcClient.getRawTransaction(txid, true);
    if (!data || !data.script) throw new Error('No result');
    const hex = NeonParser.base64ToHex(data.script);
    const tokens = sc.OpToken.fromScript(hex);
    let total = 0;
    const lines = tokens.map(t => {
      const price = sc.OpCodePrices[t.code] || 0;
      total += price;
      const name = sc.OpCode[t.code];
      const params = t.params ? ' ' + t.params : '';
      return `${name}${params} -> ${price} GAS`;
    });
    lines.push(`Total GAS: ${total}`);
    output.textContent = lines.join('\n');
  } catch (err) {
    output.textContent = 'Error: ' + err.message;
  }
});
