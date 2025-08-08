// Simple edit/save functionality using contentEditable + localStorage
const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const editableSections = document.querySelectorAll('main .card');

function setEditable(state){
  editableSections.forEach(sec=> sec.contentEditable = state);
  if(state){ editBtn.style.display='none'; saveBtn.style.display='inline-block'; }
  else { editBtn.style.display='inline-block'; saveBtn.style.display='none'; }
}

// Load saved content from localStorage
function loadSaved(){
  try{
    const data = JSON.parse(localStorage.getItem('portfolio_content') || '{}');
    if(Object.keys(data).length){
      for(const id in data){
        const el = document.getElementById(id);
        if(el) el.innerHTML = data[id];
      }
    }
  }catch(e){ console.warn(e) }
}

// Save content to localStorage
function saveContent(){
  const data = {};
  editableSections.forEach(sec=> {
    if(sec.id) data[sec.id] = sec.innerHTML;
  });
  localStorage.setItem('portfolio_content', JSON.stringify(data));
  setEditable(false);
  alert('Saved locally in your browser. Changes will persist on this device only.');
}

function resetContent(){
  if(confirm('Reset saved local changes?')){
    localStorage.removeItem('portfolio_content');
    location.reload();
  }
}

editBtn.addEventListener('click', ()=> setEditable(true));
saveBtn.addEventListener('click', saveContent);
resetBtn.addEventListener('click', resetContent);

loadSaved();