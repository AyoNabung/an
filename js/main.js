/*<![CDATA[*/ 
for(var imageslazy=document.querySelectorAll(".pS .separator img, .pS .tr-caption-container img, .pS .psImg >img, .pS .btImg >img"),i=0;i<imageslazy.length;i++)imageslazy[i].setAttribute("onclick","return false");

function wrap(i,a,t){
  for(var r=document.querySelectorAll(a),m=0;m<r.length;m++){
    var e=i+r[m].outerHTML+t;
    r[m].outerHTML=e
  }
}

wrap('<div class="zmImg">',".pS .separator >a","</div>");
wrap('<div class="zmImg">',".pS .tr-caption-container td >a","</div>");
wrap('<div class="zmImg">',".pS .separator >img","</div>");
wrap('<div class="zmImg">',".pS .tr-caption-container td >img","</div>");
wrap('<div class="zmImg">',".pS .psImg >img","</div>");
wrap('<div class="zmImg">',".pS .btImg >img","</div>");

var containerimg=document.getElementsByClassName("zmImg");
for(i=0;i<containerimg.length;i++){
  containerimg[i].onclick=function(){
    this.classList.toggle("s")
  }
}

Defer.dom(".lazy",100,"loaded",null,{rootMargin:"1px"});
if (typeof infinite_scroll !== "undefined") {
  infinite_scroll.on("load",function(){
    Defer.dom(".lazy",100,"loaded",null,{rootMargin:"1px"});
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  const e=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],
        t=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
        n=new Date,
        a=`${e[n.getDay()]}, ${n.getDate()} ${t[n.getMonth()]} ${n.getFullYear()}`,
        d=document.getElementById("dateWidgets");
  if(d){ d.textContent=a; }
});

document.getElementById("subscribe-form").addEventListener("submit",function(e){
  e.preventDefault();
  var n=this.nama.value,
      e=this.email.value,
      o=new FormData();
  o.append("nama",n);
  o.append("email",e);
  fetch("https://script.google.com/macros/s/AKfycbxTJYPFuo_nj5DI3epnCll1p9Mod467gAt21AjpQsyD5YthdWQp51lsOCIan8fpXsvq/exec",{
    method:"POST",
    body:o
  })
  .then(e=>e.text())
  .then(e=>{
    alert("Terima kasih, "+n+"! Kamu sudah berlangganan.");
    document.getElementById("subscribe-form").reset();
  })
  .catch(n=>alert("Gagal mengirim: "+n))
});

const blogURL='https://test-ayonabung.blogspot.com/', maxPosts=5;
fetch(blogURL+'/feeds/posts/summary?alt=json&max-results='+maxPosts)
.then(e=>e.json())
.then(e=>{
  const t=document.getElementById('newestWids'),n=e.feed.entry;
  n.forEach(e=>{
    const n=e.title.$t,
          a=e.link.find(e=>'alternate'===e.rel).href,
          r=e.category ? e.category[0].term : 'Tanpa Label',
          o=e.media$thumbnail ? e.media$thumbnail.url.replace('/s72-c/','/s70/') : 'https://via.placeholder.com/70';
    t.innerHTML+=`
      <div class="newestItem">
        <img class="newestThumb" src="${o}" width="70" height="70" alt="Thumb" loading="lazy"/>
        <div class="newestInfo">
          <span class="newestLabel">${r}</span>
          <p class="newestTitle"><a href="${a}" title="${n}">${n}</a></p>
        </div>
      </div>`;
  });
});

document.addEventListener("DOMContentLoaded",function(){
  const e=document.getElementById("bookmark-count"),
        t=document.getElementById("navBookmark");

  function u(){
    if(e){
      const t=JSON.parse(localStorage.getItem("bookmarkedPosts"))||[];
      e.textContent=t.length;
      e.style.display=t.length>0?"inline-block":"none";
    }
  }

  u();
  if(!t) return;

  const o=document.querySelector("meta[property='og:title']")?.content || document.title,
        c=window.location.href,
        a=document.querySelector("meta[property='og:image']")?.content || "",
        r=new Date,
        d=r.toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"})+" • "+r.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}),
        i=btoa(c);

  let s=JSON.parse(localStorage.getItem("bookmarkedPosts"))||[];

  if(s.some(e=>e.id===i)){ t.classList.add("active"); }

  t.addEventListener("click",function(n){
    n.preventDefault();
    const l=s.findIndex(e=>e.id===i);
    if(l===-1){
      s.push({id:i,title:o,url:c,img:a,date:d});
      t.classList.add("active");
    } else {
      s.splice(l,1);
      t.classList.remove("active");
    }
    localStorage.setItem("bookmarkedPosts",JSON.stringify(s));
    u();
  });

  window.addEventListener("storage",function(){
    s=JSON.parse(localStorage.getItem("bookmarkedPosts"))||[];
    const n=s.some(e=>e.id===i);
    t.classList.toggle("active",n);
    u();
  });
});
/*]]>*/
