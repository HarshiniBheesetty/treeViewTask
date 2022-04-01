
let listContainer = document.createElement("ul");
var nestItemsFunctionCallCount = 0;


function nestItems(Data, listContainer) {
  nestItemsFunctionCallCount++;
  for (var i = 0; i < Data.length; i++) {
    let item = Data[i];

    let ul = document.createElement("ul");
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.classList.add("caret");
    ul.classList.add("nested");

    if (nestItemsFunctionCallCount === 1) {
      ul.classList.toggle("active");
      span.classList.toggle("caretDown");
    }

    span.innerHTML = item.name;
    li.appendChild(span);

    span.addEventListener("click", function () {
      ul.classList.toggle("active");
      this.classList.toggle("caretDown");
    });

    let children = item.children;

    ul = nestItems(children, ul);
    li.appendChild(ul);
    listContainer.appendChild(li);
  }

  return listContainer;
}

fetch('data.json').then(response=>{
    return response.json()
}).then(function(data){
  console.log(data)
  listContainer = nestItems(data, listContainer);
})
.catch(function(error){
    console.log(error);
})



let navList = document.querySelector("#nav-list");
navList.appendChild(listContainer);
