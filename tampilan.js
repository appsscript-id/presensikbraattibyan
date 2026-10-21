// Tampilan v4.4: tombol Scan Wajah di kartu sapaan + pilihan 6 gaya di menu Pengaturan
(function(){
  var G = [["1","Langit","#2f7df6","#5b9dff"],["2","Permen","#ff7eb3","#ffb199"],["3","Hutan","#0f8a63","#3cc79b"],
           ["4","Samudra","#0b2f6b","#1e73d8"],["5","Minimalis","#eceeff","#4f46e5"],["6","Matahari","#f59e0b","#ffc94d"]];
  function simpanGaya(v){ try{ localStorage.setItem("gaya", v); }catch(e){} }
  function bacaGaya(){ try{ return localStorage.getItem("gaya") || "1"; }catch(e){ return "1"; } }
  function tandai(){
    var v = document.body.getAttribute("data-gaya");
    Array.prototype.forEach.call(document.querySelectorAll(".gyBtn"), function(b){ b.classList.toggle("on", b.getAttribute("data-g") === v); });
  }
  function setGaya(v){ document.body.setAttribute("data-gaya", v); simpanGaya(v); tandai(); }
  document.body.setAttribute("data-gaya", bacaGaya());

  function tombolScan(){
    var hd = document.querySelector("#vDash .head");
    if(!hd || hd.querySelector(".heroBtn")) return;
    var b = document.createElement("button");
    b.type = "button"; b.className = "heroBtn"; b.textContent = "📸 Scan Wajah";
    b.onclick = function(){ if(window.mulaiScan) mulaiScan(); };
    hd.appendChild(b);
  }
  function pilihanGaya(){
    ["vSet","vKSet","vWSet"].forEach(function(id){
      var v = document.getElementById(id); if(!v || v.querySelector(".gyBox")) return;
      var ref = null, hs = v.querySelectorAll("h4");
      for(var i = 0; i < hs.length; i++){ if(hs[i].textContent === "Warna tema"){ ref = hs[i]; break; } }
      var h = document.createElement("h4"); h.textContent = "Gaya tampilan";
      var box = document.createElement("div"); box.className = "gyBox";
      G.forEach(function(g){
        var b = document.createElement("button"); b.type = "button"; b.className = "gyBtn"; b.setAttribute("data-g", g[0]);
        b.innerHTML = '<span class="gyPrev" style="background:linear-gradient(135deg,' + g[2] + ',' + g[3] + ')"></span><b>' + g[1] + '</b>';
        box.appendChild(b);
      });
      v.insertBefore(h, ref); v.insertBefore(box, ref);
    });
    tandai();
  }
  document.addEventListener("click", function(e){
    var b = e.target.closest ? e.target.closest(".gyBtn") : null;
    if(b) setGaya(b.getAttribute("data-g"));
  });
  function mulai(){ try{ tombolScan(); pilihanGaya(); }catch(e){} }
  if(document.readyState === "complete") setTimeout(mulai, 0); else window.addEventListener("load", function(){ setTimeout(mulai, 0); });
})();
