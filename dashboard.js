// dashboard.js

// Update jam realtime
function updateTime(){ document.getElementById("time").innerText = new Date().toLocaleString(); }
updateTime(); setInterval(updateTime,1000);

// Elemen DOM
const blockEl=document.getElementById("block");
const rewardEl=document.getElementById("reward");
const totalWalletsEl=document.getElementById("totalWallets");
const networkStatusEl=document.getElementById("networkStatus");
const logEl=document.getElementById("blockLog");
const topWalletsEl=document.getElementById("topWallets");

// Inisialisasi data
let reward=5500, block=1030;
let rewardData=[], rewardLabels=[], blockHistory=[];
let wallets=[];

// Top 20 wallet
for(let i=1;i<=20;i++){
  wallets.push({wallet:"0x"+Math.random().toString(16).substr(2,8), reward:Math.floor(Math.random()*1000)+" USD"});
}

function updateTopWallets(){
  let html="<tr><th>Wallet</th><th>Reward</th></tr>";
  wallets.forEach(w=>{ html+=`<tr><td>${w.wallet}</td><td>${w.reward}</td></tr>`; });
  topWalletsEl.innerHTML=html;
}

updateTopWallets();

// Chart.js
const ctx=document.getElementById("rewardChart").getContext("2d");
const rewardChart=new Chart(ctx,{
  type:'line',
  data:{ labels:rewardLabels, datasets:[{label:'Total Reward USD', data:rewardData, borderColor:'#58a6ff', backgroundColor:'rgba(88,166,255,0.2)', tension:0.4, fill:true}] },
  options:{ responsive:true, maintainAspectRatio:false, scales:{x:{display:false},y:{beginAtZero:true}}, plugins:{legend:{display:false}} }
});

// Simulate mining
function simulateMining(){
  reward += Math.floor(Math.random()*50+10);
  if(Math.random()<0.5) block++;

  // Update cards
  rewardEl.innerText = reward+" USD";
  blockEl.innerText = "#"+block;

  // Update chart (max 25 data)
  rewardData.push(reward);
  rewardLabels.push("#"+block);
  if(rewardData.length>25){ rewardData.shift(); rewardLabels.shift(); }
  rewardChart.update();

  // Update log (max 25 history)
  blockHistory.push(`#${block} - ${reward} USD - 1,000,000 wallets`);
  if(blockHistory.length>25) blockHistory.shift();
  logEl.innerHTML = blockHistory.join("<br>");

  // Update top wallets
  wallets.forEach(w=>{ w.reward=Math.floor(Math.random()*1000)+" USD"; });
  updateTopWallets();
}

// Jalankan otomatis tiap 5 detik
setInterval(simulateMining,5000);
