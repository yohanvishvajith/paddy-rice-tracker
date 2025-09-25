import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractAbi from './contractABI.json';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export default function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', data: '' });
  const [refreshToggle, setRefreshToggle] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const p = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(p);
    }
  }, []);

  useEffect(() => {
    if (provider && account) {
      const signer = provider.getSigner();
      const c = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi || contractAbi, signer);
      setContract(c);
    }
  }, [provider, account]);

  useEffect(() => {
    if (contract) fetchItems();
  }, [contract, refreshToggle]);

  async function connectWallet() {
    if (!window.ethereum) return alert('Please install MetaMask');
    const accs = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accs[0]);
  }

  async function fetchItems() {
    try {
      const idsBN = await contract.getAllIds();
      const ids = idsBN.map((b) => b.toNumber());
      const result = [];
      for (const id of ids) {
        const r = await contract.readItem(id);
        result.push({ id: r[0].toNumber(), name: r[1], data: r[2], exists: r[3] });
      }
      setItems(result.reverse());
    } catch (err) {
      console.error(err);
    }
  }

  async function createItem(e) {
    e.preventDefault();
    if (!contract) return;
    const tx = await contract.createItem(form.name, form.data);
    await tx.wait();
    setForm({ name: '', data: '' });
    setRefreshToggle((p) => !p);
  }

  async function updateItem(id, name, data) {
    const tx = await contract.updateItem(id, name, data);
    await tx.wait();
    setRefreshToggle((p) => !p);
  }

  async function deleteItem(id) {
    const tx = await contract.deleteItem(id);
    await tx.wait();
    setRefreshToggle((p) => !p);
  }

  return (
    <div className="p-4 mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold">Simple CRUD dApp (Sepolia)</h1>

      {!account ? (
        <button onClick={connectWallet}>Connect MetaMask</button>
      ) : (
        <div>Connected: {account}</div>
      )}

      <form onSubmit={createItem} className="mt-4">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
        <input value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} placeholder="Data" required />
        <button type="submit">Create</button>
      </form>

      <h2 className="mt-6 text-xl">Items</h2>
      <ul>
        {items.map((it) => (
          <li key={it.id} className="border p-2 my-2">
            <div><strong>#{it.id}</strong> {it.exists ? '' : '(deleted)'}</div>
            <div>Name: {it.name}</div>
            <div>Data: {it.data}</div>
            <div className="mt-2">
              <button onClick={() => {
                const newName = prompt('New name', it.name);
                const newData = prompt('New data', it.data);
                if (newName !== null && newData !== null) updateItem(it.id, newName, newData);
              }}>Edit</button>

              <button onClick={() => { if (confirm('Delete item?')) deleteItem(it.id); }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
