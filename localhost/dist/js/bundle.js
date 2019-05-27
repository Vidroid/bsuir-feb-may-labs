/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/newsApi.js":
/*!***********************!*\
  !*** ./js/newsApi.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

  const defaultNewsCount = 5;
  const maxNewsCount = 40;
  const serverSuccessCode = 200;
  const clientErrorsCode = 400;
  const doneState = 4;

  var currentNewsCount = 5;
  var isLoadMore = false;
  var urlToLoadNews = "https://newsapi.org/v2/top-headlines?country=us&apiKey=7c82872d73d340bd8f4e51f5782171b9";

  document.addEventListener('DOMContentLoaded', function(){ 
    doRequest("topNews", "https://newsapi.org/v2/top-headlines?country=us&apiKey=7c82872d73d340bd8f4e51f5782171b9", currentNewsCount);

    document.getElementById("searchbtn").addEventListener('click', function(e){
      e.preventDefault();
      let query = document.getElementById("searchquery").value;
      let url = "https://newsapi.org/v2/top-headlines?q="+query+"&country=us&apiKey=7c82872d73d340bd8f4e51f5782171b9";
      doRequest(query, url, 0);
    });
    
    document.getElementById("bitcoinbtn").addEventListener('click', function(e){
      onclickTopNews(e, "https://newsapi.org/v2/everything?q=bitcoin&apiKey=7c82872d73d340bd8f4e51f5782171b9");
      doRequest("bit", "https://newsapi.org/v2/everything?q=bitcoin&apiKey=7c82872d73d340bd8f4e51f5782171b9", currentNewsCount);
    });

    document.getElementById("businessbtn").addEventListener('click', function(e){
      onclickTopNews(e, "https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=7c82872d73d340bd8f4e51f5782171b9");
      doRequest("bis", "https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=7c82872d73d340bd8f4e51f5782171b9", currentNewsCount);
    });

    document.getElementById("applebtn").addEventListener('click', function(e){
      onclickTopNews(e, "https://newsapi.org/v2/everything?q=apple&from=2019-04-24&to=2019-04-24&sortBy=popularity&apiKey=7c82872d73d340bd8f4e51f5782171b9");  
      doRequest("apple", "https://newsapi.org/v2/everything?q=apple&from=2019-04-24&to=2019-04-24&sortBy=popularity&apiKey=7c82872d73d340bd8f4e51f5782171b9", currentNewsCount);
    });

    document.getElementById("trumpbtn").addEventListener('click', function(e){
      onclickTopNews(e, "https://newsapi.org/v2/top-headlines?q=trump&apiKey=7c82872d73d340bd8f4e51f5782171b9");
      doRequest("trump", "https://newsapi.org/v2/top-headlines?q=trump&apiKey=7c82872d73d340bd8f4e51f5782171b9", currentNewsCount);
    });

    document.getElementById("wallstbtn").addEventListener('click', function(e){
      onclickTopNews(e, "https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey=7c82872d73d340bd8f4e51f5782171b9");
      doRequest("wall", "https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey=7c82872d73d340bd8f4e51f5782171b9", currentNewsCount);
    });

    document.getElementById("australiabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("au", "https://newsapi.org/v2/top-headlines?country=au&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("austriabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("at", "https://newsapi.org/v2/top-headlines?country=at&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("belgiumbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("be", "https://newsapi.org/v2/top-headlines?country=be&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("bulgarybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("bg", "https://newsapi.org/v2/top-headlines?country=bg&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("francebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("fr", "https://newsapi.org/v2/top-headlines?country=fr&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("germanybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("de", "https://newsapi.org/v2/top-headlines?country=de&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("hungarybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("hu", "https://newsapi.org/v2/top-headlines?country=hu&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("indiabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("in", "https://newsapi.org/v2/top-headlines?country=in&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("germanybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("de", "https://newsapi.org/v2/top-headlines?country=de&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("irelandbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("ie", "https://newsapi.org/v2/top-headlines?country=ie&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("italybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("it", "https://newsapi.org/v2/top-headlines?country=it&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("latviabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("lv", "https://newsapi.org/v2/top-headlines?country=lv&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("mexicobtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("mx", "https://newsapi.org/v2/top-headlines?country=mx&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("netherbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("nl", "https://newsapi.org/v2/top-headlines?country=nl&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("newzelbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("nz", "https://newsapi.org/v2/top-headlines?country=nz&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("norwaybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("no", "https://newsapi.org/v2/top-headlines?country=no&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("phillbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("ph", "https://newsapi.org/v2/top-headlines?country=ph&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("polandbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("pl", "https://newsapi.org/v2/top-headlines?country=pl&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("russiabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("ru", "https://newsapi.org/v2/top-headlines?country=ru&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("serbiabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("rs", "https://newsapi.org/v2/top-headlines?country=rs&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("slovakiabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("sk", "https://newsapi.org/v2/top-headlines?country=sk&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("swedenbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("se", "https://newsapi.org/v2/top-headlines?country=se&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("switzerlandbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("ch", "https://newsapi.org/v2/top-headlines?country=ch&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("turkeybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("tr", "https://newsapi.org/v2/top-headlines?country=tr&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("uaebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("ae", "https://newsapi.org/v2/top-headlines?country=ae&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("ukrainebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("ua", "https://newsapi.org/v2/top-headlines?country=ua&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("ukbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("gb", "https://newsapi.org/v2/top-headlines?country=gb&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("usbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("us", "https://newsapi.org/v2/top-headlines?country=us&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("venezuelabtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("ve", "https://newsapi.org/v2/top-headlines?country=ve&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("abcnewsbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("abc", "https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("asspbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("assp", "https://newsapi.org/v1/articles?source=associated-press&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("bbcbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("bbc", "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("bbcsportbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("sportbbc", "https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("insiderbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("insider", "https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("cnbcbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("cnbc", "https://newsapi.org/v1/articles?source=cnbc&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("cnnbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("cnn", "https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("financial-timesbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("financial", "https://newsapi.org/v1/articles?source=financial-times&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("fortunebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("fortune", "https://newsapi.org/v1/articles?source=fortune&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });
    
    document.getElementById("googlebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("google", "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("hackerbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("hack", "https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("Independentbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("independent", "https://newsapi.org/v1/articles?source=independent&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("mtvbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("mtv", "https://newsapi.org/v1/articles?source=mtv-news&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("natgeobtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("natgeo", "https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("Newsweekbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("week", "https://newsapi.org/v1/articles?source=newsweek&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });




    document.getElementById("nflbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("nfl", "https://newsapi.org/v1/articles?source=nfl-news&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("polygonbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("poly", "https://newsapi.org/v1/articles?source=polygon&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("Recodebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("recode", "https://newsapi.org/v1/articles?source=recode&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("Reutersbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("reuter", "https://newsapi.org/v1/articles?source=reuters&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("TalkSportbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("talksport", "https://newsapi.org/v1/articles?source=talksport&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("TechRadarbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("techradar", "https://newsapi.org/v1/articles?source=techradar&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("economistbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("econom", "https://newsapi.org/v1/articles?source=the-economist&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("hindubtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("hindu", "https://newsapi.org/v1/articles?source=the-hindu&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("biblebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("biblebtn", "https://newsapi.org/v1/articles?source=the-lad-bible&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("nytimesbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("nytimes", "https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("timebtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("times", "https://newsapi.org/v1/articles?source=time&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("washpostbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("washpost", "https://newsapi.org/v1/articles?source=the-washington-post&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("usatodaybtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("usatoday", "https://newsapi.org/v1/articles?source=usa-today&sortBy=top&apiKey=7c82872d73d340bd8f4e51f5782171b9", 0);
    });

    document.getElementById("loadbtn").addEventListener('click', function(e){
      e.preventDefault();
      doRequest("topNews", urlToLoadNews, currentNewsCount);
    });

  });

  function onclickTopNews(e, url)
  {
    e.preventDefault();
    if (isLoadMore === false)
    {
      currentNewsCount = defaultNewsCount; 
      isLoadMore == true;
    }
    urlToLoadNews = url; 
  }

  function searchTopNews(countNews, latestNews, output)
  {
    for(var i = 0; i < countNews; i++)
    {
      if (i === latestNews.length - 1 || i === maxNewsCount - 1)
      {
        document.getElementById("loadbtn").type = "hidden";
        isLoadMore = false;
        return output;
      }
      output +=
        `<div class="col s4 white" style="width: 100px; margin-left: 60px;">
            <h4><b>${latestNews[i].title}</b></h4>
            <img src="${latestNews[i].urlToImage}" class="responsive-img">
            <p>${latestNews[i].description}</p>
            <p>Published at: ${latestNews[i].publishedAt}</p>
            <a href="${latestNews[i].url}" target="_blank" style="width: 50%;" class="btn">Read more</a>
          </div>`;
    }
    document.getElementById("loadbtn").type = "submit";   
    return output;
  }

  function searchByQuery(latestNews, output)
  {
    for(var i in latestNews)
    {
      if (i >= maxNewsCount)
      {
        return output;
      }
      output +=
        `<div class="col s4 white" style="width: 100px; margin-left: 60px;">
            <h4><b>${latestNews[i].title}</b></h4>
            <img src="${latestNews[i].urlToImage}" class="responsive-img">
            <p>${latestNews[i].description}</p>
            <p>Published at: ${latestNews[i].publishedAt}</p>
            <a href="${latestNews[i].url}" target="_blank" style="width: 50%;" class="btn">Read more</a>
         </div>`;
    }
    document.getElementById("loadbtn").type = "hidden";
    return output;
  }

  function doRequest(query, url, countNews)
  {
      if (query !== "")
      {
        ajax({
          method: 'GET',
          url: url,
          success: function(news)
          {
            let output = "";
            let latestNews = news.articles;

            if (latestNews.length !== 0)
            {
              if (countNews === 0)
              {
                output = searchByQuery(latestNews, "");
              }
              else
              {
                output = searchTopNews(countNews, latestNews, output);
                currentNewsCount += defaultNewsCount;
              }
              document.getElementById("newsResults").innerHTML = output;
            }
            else
            {
                let noNews = `<div class="col s4" style="font-size:36px; margin-left:40px; width:100px; 
				margin-top:40px; color:white;">
                  <h4>There are no articles matching your request</h4>
                </div>`;
                document.getElementById("loadbtn").type = "hidden";
                document.getElementById("newsResults").innerHTML = noNews;
            }        
          }, 
          error: function()
          {
            let internetFailure = `
             <div style="font-size:34px; text-align:center; margin-top:40px; color: white;">Please check your internet connection and try again.
             <img src="img/internet.png" class="responsive-img">
             </div>`;
            document.getElementById("newsResults").innerHTML = internetFailure;
          }
        });
      }
  }


  function ajax(params)
  {
    var request = new XMLHttpRequest();
    request.open(params.method, params.url, true);
    request.onreadystatechange = function(){
      if (this.readyState === doneState)
      {
        if (this.status >= serverSuccessCode && this.status < clientErrorsCode)
        {
          if (params.success)
          {
            params.success(JSON.parse(this.response));
          }
        }
        else
        {
          if (params.error)
          {
            params.error();
          }
        }
      }
    };
    request.send();
  }

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./js/newsApi.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./js/newsApi.js */"./js/newsApi.js");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map