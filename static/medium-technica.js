$(fnInit())

var ListFiles = [];
var ListTitleFiles = [];
var Articles;

function fnInit() {
 console.log("init");
 loadFilesList();
}

function loadFilesList() {
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
   titleFileURL = decodeURIComponent(getURLParam('t'));
   //console.log("..." + decodeURIComponent(titleFileURL));
   indexFile = Object.keys(Articles).indexOf(titleFileURL);
   console.log("index from Name:" + indexFile);
   if (indexFile >= 0 && ListFiles.length > 0) {
    //console.log(ListFiles[indexFile]);
    loadFile(ListTitleFiles[indexFile], indexFile);
    return
   }
   loadFile(ListTitleFiles[0], 0);
  });
}

function loadPrev() {
 console.log("Prev");
 titleFileURL = decodeURIComponent(getURLParam('t'));
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
 titleFileURL = decodeURIComponent(getURLParam('t'));
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
 history.pushState({}, null, window.location.pathname + "?t=" + encodeURIComponent(titleFile));
 if (index == 0) {
  $('.mdl-paging__prev').css("visibility", "hidden");
 } else {
  $('.mdl-paging__prev').css("visibility", "visible");
 }
 if (index == ListFiles.length - 1) {
  $('.mdl-paging__next').css("visibility", "hidden");
 } else {
  $('.mdl-paging__next').css("visibility", "visible");
 }
}

//https://stackoverflow.com/a/18750001

function encodeStr(rawStr) {
 var encodedStr = rawStr.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
  return '&#' + i.charCodeAt(0) + ';'
 });
 return encodedStr;
}

/**
 * Convert a string to HTML entities
 */
function encodeStr2HTML(rawStr) {
 return rawStr.replace(/./gm, function (s) {
  // return "&#" + s.charCodeAt(0) + ";";
  return (s.match(/[a-z0-9\s]+/i)) ? s : "&#" + s.charCodeAt(0) + ";";
 });
};

/**
* Create string from HTML entities
*/
function decodeHTML2Str(HTMLencodedStr) {
 return (HTMLencodedStr + "").replace(/&#\d+;/gm, function (s) {
  return String.fromCharCode(s.match(/\d+/gm)[0]);
 });
};
