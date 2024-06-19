const properties = [
  {img:"https://hurghadiansproperty.com/wp-content/uploads/2023/11/acasa_mia_04.png",name:"Attameya Heights",details:" The first of its kind in the region, it brings together the best of a luxury villa, duplex, and master community.",id:1},
  {img:"https://bluerock-eg.com/images/project/6/hyde-park-1667480155.webp",name:" Sheikh Zayed",details:" Specially designed 1, 1.5 and 2 bedroom apartments that offer you all-encompassing views of the city as you embark on an exquisite waterfront lifestyle.",id:2,bed:"5"},
  {img:"https://aaf1bc7189.clvaw-cdnwnd.com/3e7c67d4c9462567f23b0b727d853874/200010494-567eb567ed/IMG_7750-HDR%20%28Copy%29-6.jpg?ph=aaf1bc7189",name:"Fifth Settlement",details:"340 reasons to elevate your quality of life. A rich sense of community and superlative waterfront living in one of the city’s most sought-after locations.",id:3}
];



print();
  index=4;
  function backfromform(){
    document.getElementById("blured-space").style="opacity:1";
    document.getElementById("admin-prop-add").style="display:none";
    document.getElementById("adminvillasbackbtn").style="display:none;";
  }
  function add(){
      backfromform();
      var timg=document.forms["admin-prop-myform"]["admin-prop-img"].value;
      var tname=document.forms["admin-prop-myform"]["admin-prop-name"].value;
      var tdetails=document.forms["admin-prop-myform"]["admin-prop-details"].value;
      properties.push({img:timg,name:tname,details:tdetails,id:index});
      index++;
      print();
      document.getElementById("admin-prop-formimg").value="";
      document.getElementById("admin-prop-formname").value="";
      document.getElementById("admin-prop-formdetails").value="";
  }
  function del(value){
      for(let x in properties){
          if(properties[x].id==value){
              delete properties[x];
          }
      }
      print();
  }
  function edit(value) {
  const card = document.getElementById(`card-${value}`);
  const heading = card.querySelector("h2");
  const paragraph = card.querySelector("p");
  const editButton = card.querySelector(".edit-button");

  heading.contentEditable = true;
  paragraph.contentEditable = true;

  heading.classList.add("editable");
  paragraph.classList.add("editable");

  const saveButton = document.createElement("input");
  var e = document.getElementById("savebtn");
  if(e)
    console.log("already in edit");
  else
  {
  saveButton.id="savebtn";
  saveButton.type = "button";
  saveButton.value = "save";
  const div=document.getElementById(`del-${value}`);
  div.appendChild(saveButton);

  saveButton.addEventListener("click", function() {
    heading.contentEditable = false;
    paragraph.contentEditable = false;
    heading.classList.remove("editable");
    paragraph.classList.remove("editable");
    div.removeChild(saveButton);
  });
}
}
function print(){
let htmlCode = ``;
properties.forEach(function(x) {
htmlCode +=
`<div class="admin-prop-card" id="card-${x.id}"> 
      <img src="${x.img}" alt=""> 
      <div class="card-content"> 
          <h2>${x.name}</h2> 
          <p>${x.details}</p>
          <a href="AdminPage.html?btn=${x.id}" class="button"> Find out more <span class="material-symbols-outlined"> arrow_right_alt </span> </a>
          <div id="del">
          <div id="del-${x.id}" style="display:flex;justify-content: space-between;">
          <input type="button"  class="edit-button" value="edit" onclick="return edit(${x.id})">
          <input type="button"  value="delete" onclick="return del(${x.id})">
          </div>
          </div>
      </div>
  </div>
`;
});
const e = document.querySelector(".admin-prop-cards");
e.innerHTML = htmlCode;
}

function dis(){
  document.getElementById("admin-prop-add").style="display:grid;";
  document.getElementById("blured-space").style="opacity:0.1";
  document.getElementById("adminvillasbackbtn").style="display:grid;";
}







const properties2 = [
  {img:"https://exp-eg.com/wp-content/uploads/2021/03/Sky-ad-Residence-Eight-new-capital-view7.jpg",name:"Attameya Heights",details:" The first of its kind in the region, it brings together the best of a luxury villa, duplex, and master community.",id:1},
  {img:"https://exp-eg.com/wp-content/uploads/2021/03/Sky-ad-Residence-Eight-new-capital-view7.jpg",name:" Sheikh Zayed",details:" Specially designed 1, 1.5 and 2 bedroom apartments that offer you all-encompassing views of the city as you embark on an exquisite waterfront lifestyle.",id:2,bed:"5"},
  {img:"https://aaf1bc7189.clvaw-cdnwnd.com/3e7c67d4c9462567f23b0b727d853874/200010494-567eb567ed/IMG_7750-HDR%20%28Copy%29-6.jpg?ph=aaf1bc7189",name:"Fifth Settlement",details:"340 reasons to elevate your quality of life. A rich sense of community and superlative waterfront living in one of the city’s most sought-after locations.",id:3}
];
function print2(){
let htmlCode = ``;
properties2.forEach(function(x) {
htmlCode +=
`<div class="admin-prop-card" id="card-${x.id}"> 
      <img src="${x.img}" alt=""> 
      <div class="card-content"> 
          <h2>${x.name}</h2> 
          <p>${x.details}</p>
          <a href="AdminPage.html?btn=${x.id}" class="button"> Find out more <span class="material-symbols-outlined"> arrow_right_alt </span> </a>
          <div id="del">
          <div id="del-${x.id}" style="display:flex;justify-content: space-between;">
          <input type="button"  class="edit-button" value="edit" onclick="return edit(${x.id})">
          <input type="button"  value="delete" onclick="return del(${x.id})">
          </div>
          </div>
      </div>
  </div>
`;
});
const e2 = document.querySelector(".admin-prop-cards");
e2.innerHTML = htmlCode;
}

function validateForm() {
  var img = document.getElementById("admin-prop-formimg").value.trim();
  var name = document.getElementById("admin-prop-formname").value.trim();
  var details = document.getElementById("admin-prop-formdetails").value.trim();
  document.getElementById("img-err").innerHTML = "";
  document.getElementById("name-err").innerHTML = "";
  document.getElementById("details-err").innerHTML = "";

  var isValid = true;
  if (img === '') {
      document.getElementById("img-err").innerHTML = "Please select an image.";
      isValid = false;
  }
  if (name === '') {
      document.getElementById("name-err").innerHTML = "Please enter a name.";
      isValid = false;
  }
  if (details === '') {
      document.getElementById("details-err").innerHTML = "Please enter details.";
      isValid = false;
  }
  if (isValid) {
      add();
  }
}