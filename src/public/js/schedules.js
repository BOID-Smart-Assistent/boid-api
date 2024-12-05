(()=>{var d=[];function a(e){return new URL(e).pathname.split("/").slice(-2).map(Number)}async function l(){try{d=await(await fetch("/user/api/schedule/1/1")).json();let o=document.getElementById("scheduleDropdown");d.forEach(n=>{let t=document.createElement("option");t.value=n.id,t.textContent=`Schedule ${n.id} - Created on ${n.created}`,o.appendChild(t)}),i()}catch(e){console.error("Error fetching schedules:",e)}}function i(){let e=document.getElementById("scheduleDropdown").value,o=d.find(t=>t.id===parseInt(e)),n=document.getElementById("timeslotTableBody");n.innerHTML="",o.schedule.schedule.forEach(t=>{t.timeslots.forEach(r=>{let c=document.createElement("tr");c.innerHTML=`
        <td class="border border-gray-300 px-4 py-2">${t.date}</td>
        <td class="border border-gray-300 px-4 py-2">${r.id}</td>
        <td class="border border-gray-300 px-4 py-2">
          ${r.presentations.map(s=>`<div><strong>${s.name}</strong> - ${s.topic}</div>`).join("")}
        </td>
      `,n.appendChild(c)})})}document.addEventListener("DOMContentLoaded",l);document.getElementById("generateSchedule").addEventListener("click",async()=>{try{let[e,o]=a(window.location.pathname);await fetch(`/user/schedule/${e}/${o}`,{method:"post"}),alert("Started generating schedule!")}catch(e){console.error("Something went wrong!",e)}});})();
//# sourceMappingURL=schedules.js.map
