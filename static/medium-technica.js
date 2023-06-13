$(fnInit())

var Title;
var ListFiles = [];
var ListTitleFiles = [];
var Articles;
var Description;

function fnInit() {
 console.log("init");
 fnLoadInit();
 //fnLoadData();
}

function fnLoadInit() {
 fetch("static/init.json")
  .then(response => response.json())
  .then(data => {
   console.log(data["description"]);
   Title = data["title"];
   Description = data["description"];
   document.querySelector("title").innerHTML = Title;
   document.querySelector(".mdl-layout-title").innerHTML = Title + '<div class="title-description">' + Description + '</div>';
   document.querySelector("#menu-item-right").innerHTML = data["title-menu-right"];
   document.querySelector("#menu-item-left").innerHTML = data["title-menu-left"];
   document.querySelector("body").setAttribute("style", "font-family:" + data["body-style-font-family"])
   document.querySelector('meta[property="og:title"]').setAttribute("content", Title);
   document.querySelector('meta[property="og:description"]').setAttribute("content", Description);
   fnLoadData();
  });
}

function fnLoadData() {
 fetch("static/res/doc/text.json")
  .then(response => response.json())
  .then(data => {
   //console.log(data);
   Articles = data;
   indexArray = 0;
   $.each(data, function (key, value) {
    ListTitleFiles.push(key);
    $('#ListMenu').append(`<a href="#top" onclick="loadFile('` + key + `',` + indexArray + `)" class=" mdl-navigation__link ">` + key + `</a>`);
    indexArray++;
    ListFiles.push(value);
   })
   titleFileURL = decodeURIComponent(getURLParam('t')).replace(/_/g, " ");
   //console.log(titleFileURL, Articles[titleFileURL]);
   indexFile = Object.keys(Articles).indexOf(titleFileURL);
   console.log("index from Name:" + indexFile);
   if (indexFile >= 0 && ListFiles.length > 0) {
    //console.log(ListFiles[indexFile]);
    loadFile(ListTitleFiles[indexFile], indexFile);
    return
   }
   loadFile(ListTitleFiles[0], 0);
   Description = document.querySelector('meta[property="og:description"]').getAttribute("content");
  });
}

function loadPrev() {
 console.log("Prev");
 //titleFileURL = decodeURIComponent(getURLParam('t'));
 titleFileURL = decodeURIComponent(getURLParam('t')).replace(/_/g, " ");
 //console.log(Articles[titleFileURL]);
 indexFile = Object.keys(Articles).indexOf(titleFileURL);
 if (indexFile > 0)
  indexFile--;
 if (ListTitleFiles.length > 0) {
  //console.log(ListFiles[indexFile]);
  loadFile(ListTitleFiles[indexFile], indexFile);
 }
}

function loadNext() {
 console.log("Next");
 //titleFileURL = decodeURIComponent(getURLParam('t'));
 titleFileURL = decodeURIComponent(getURLParam('t')).replace(/_/g, " ");
 //console.log(Articles[titleFileURL]);
 indexFile = Object.keys(Articles).indexOf(titleFileURL);
 if (indexFile < ListFiles.length - 1)
  indexFile++;
 if (ListTitleFiles.length > 0) {
  //console.log(ListFiles[indexFile]);
  loadFile(ListTitleFiles[indexFile], indexFile);
 }
}

function getURLParam(strNameParam) {
 const urlSearchParams = new URLSearchParams(window.location.search);
 const params = Object.fromEntries(urlSearchParams.entries());
 return params[strNameParam];
}

function loadFile(titleFile, index, event) {
 if (event) {
  updateevent.preventDefault();
 }
 //console.log(titleFile, index, ListFiles.length);
 $('.mdl-layout__drawer').attr("class", "mdl-layout__drawer");
 $('.mdl-layout__obfuscator').attr("class", "mdl-layout__obfuscator");
 $('.page-title').html(titleFile);
 $('.page-content').html(`<i id='top'></i><br>` + Articles[titleFile] + `<br><br>`);
 document.querySelector('meta[property="og:title"]').setAttribute("content", titleFile);
 console.log(document.querySelector('meta[property="og:title"]').getAttribute("content"));
 history.pushState({}, null, window.location.pathname + "?t=" + encodeURIComponent(titleFile).replace(/%20/g, "_"));
 console.log(decodeURIComponent((window.location.href).replace(/%20/g, "_")));
 document.querySelector('meta[property="og:url"]').setAttribute("content", decodeURIComponent((window.location.href).replace(/%20/g, "_")));
 document.title = titleFile;
 if (index == 0) {
  $('.mdl-paging__prev').css("visibility", "hidden");
  document.querySelector('meta[property="og:description"]').setAttribute("content", Description);
 } else {
  document.querySelector('meta[property="og:description"]').setAttribute("content", (Articles[titleFile]).substring(0, 50) + " ...");
  $('.mdl-paging__prev').css("visibility", "visible");
 }
 if (index == ListFiles.length - 1) {
  $('.mdl-paging__next').css("visibility", "hidden");
 } else {
  $('.mdl-paging__next').css("visibility", "visible");
 }
}