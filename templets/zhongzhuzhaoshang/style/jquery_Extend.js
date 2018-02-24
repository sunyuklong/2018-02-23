
//fix clone
(function (original) {
    jQuery.fn.clone = function () {
        var result = original.apply(this, arguments),
            my_textareas = this.find('textarea').add(this.filter('textarea')),
            result_textareas = result.find('textarea').add(result.filter('textarea')),
            my_selects = this.find('select').add(this.filter('select')),
            result_selects = result.find('select').add(result.filter('select'));

        for (var i = 0, l = my_textareas.length; i < l; ++i) $(result_textareas[i]).val($(my_textareas[i]).val());
        for (var i = 0, l = my_selects.length; i < l; ++i) result_selects[i].selectedIndex = my_selects[i].selectedIndex;

        return result;
    };    
})(jQuery.fn.clone);
 
function pad(num,n){
	var len = num.toString().length;
	while(len<n){
		num = "0"+num;
		len++;
	}
	return num;
}

Array.prototype.unique = function(){var res = [];var json = {};for(var i = 0; i < this.length; i++){if(!json[this[i]]){res.push(this[i]);json[this[i]] = 1;}}return res;}
String.prototype.endWith=function(endStr){var d=this.length-endStr.length;return (d>=0&&this.lastIndexOf(endStr)==d)};

String.prototype.cutStr = function(length,postfix){if(this){if(this.length > length && length != 0)return this.substr(0,length) + (postfix || "...");}return this.toString();}

String.prototype.format= function () { if (arguments.length == 0) { return null;}var str = this.toString();for (var i = 0; i < arguments.length; i++) { var re = new RegExp("\\{" + (i) + "\\}", "gm"); str = str.replace(re, arguments[i]); } return str; }
//==================================== 以下为jquery 扩展
jQuery.param = function (a, traditional) {

    var buildParams = function (prefix, obj, traditional, add) {
        if (jQuery.isArray(obj)) {
            // Serialize array item.
            jQuery.each(obj, function (i, v) {
                if (traditional || /\[\]$/.test(prefix)) {
                    // Treat each array item as a scalar.
                    add(prefix, v);

                } else {
                    // If array item is non-scalar (array or object), encode its
                    // numeric index to resolve deserialization ambiguity issues.
                    // Note that rack (as of 1.0.0) can't currently deserialize
                    // nested arrays properly, and attempting to do so may cause
                    // a server error. Possible fixes are to modify rack's
                    // deserialization algorithm or to provide an option or flag
                    // to force array serialization to be shallow.
                    buildParams(prefix + "[" + i + "]", v, traditional, add);
                }
            });

        } else if (!traditional && obj != null && typeof obj === "object") {
            // Serialize object item.
            for (var name in obj) {
                buildParams(prefix + "." + name, obj[name], traditional, add);
            }

        } else {
            // Serialize scalar item.
            add(prefix, obj);
        }
    };


    var s = [], add = function (key, value) {
        // If value is a function, invoke it and return its value
        value = jQuery.isFunction(value) ? value() : value;
        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    };

    // Set traditional to true for jQuery <= 1.3.2 behavior.
    if (traditional === undefined) {
        traditional = jQuery.ajaxSettings.traditional;
    }

    // If an array was passed in, assume that it is an array of form elements.
    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
        // Serialize the form elements
        jQuery.each(a, function () {
            add(this.name, this.value);
        });

    } else {
        // If traditional, encode the "old" way (the way 1.3.2 or older
        // did it), otherwise encode params recursively.
        for (var prefix in a) {
            buildParams(prefix, a[prefix], traditional, add);
        }
    }

    // Return the resulting serialization
    return s.join("&").replace(/%20/g, "+");
};

jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


$.fn.GetDivJson = function (prifix,orgModel) {
    var $outerWrap = $("<div>");
    $outerWrap.append(this.clone(false));
    var $inputs = $outerWrap.find(":text[name^=" + prifix + "]");
    var $hiddens = $outerWrap.find(":hidden[name^=" + prifix + "]");
    var $pwds = $outerWrap.find(":password[name^=" + prifix + "]");
    var $radios = $outerWrap.find(":radio[name^=" + prifix + "]");
    var $checkBox = $outerWrap.find(":checkbox[name^=" + prifix + "]");
    var $textArea = $outerWrap.find("textarea[name^=" + prifix + "]");
    var $selects = $outerWrap.find("select[name^=" + prifix + "]");
    var json = {};
    $inputs.each(function (i, item) {
    
    	if(item.value ==$(item).attr("placeholder")) return true;  //用于IE下判断CJH
    	
        json[item.name.replace(prifix, "")] = $.trim(item.value);
    });
    $hiddens.each(function (i, item) {
    	
    	//alert($.trim(item.value));
    	//alert("placeholder:"+$(item).attr("placeholder"));
    	
    	if($.trim(item.value)==$(item).attr("placeholder")) return true; //用于IE下判断 CJH
    	
        json[item.name.replace(prifix, "")] = $.trim(item.value);
    });
    $pwds.each(function (i, item) {
        json[item.name.replace(prifix, "")] =  $.trim(item.value);
    });
    $textArea.each(function (i, item) {
        json[item.name.replace(prifix, "")] =  $.trim(item.value);
    });
    var radios = [];
    $radios.each(function (i, item) {
        var radioName = item.name.replace(prifix, "");
        if (radios.toString().indexOf(radioName) == -1) {
            radios.push(radioName);
            json[radioName] = $radios.filter("[name=" + prifix + radioName + "]:checked").val() || "";
        }
    });
    var checkbox = [];
    $checkBox.each(function (i, item) {
        var chkName = item.name.replace(prifix, "");
        if (checkbox.toString().indexOf(chkName) == -1) {
            checkbox.push(chkName);
            var $nameChk = $checkBox.filter("[name=" + prifix + chkName + "]:checked");
            if ($nameChk.length > 0) {
                var vals = [];
                $nameChk.each(function (j, subItem) {
                    vals.push(subItem.value);
                })
                json[chkName] = vals.join(",");
            }
            else
                json[chkName] = "";
        }
    });

    $selects.each(function (i, item) {
        json[item.name.replace(prifix, "")] = $(item).find("option:selected").val();
    });
    orgModel && (json.oplog = $.compareModel(json,orgModel));    
    return json;
}

$.compareModel = function(a,b){
	var record ="";
	$.each(a,function(k,v){
		if(b[k] != v)
			record+= (k +":" + b[k] +"->"+ v+"  ");
		});
	return record;
}

//JSON2.js
if (typeof JSON !== 'object') { JSON = {}; }
(function () {
    'use strict'; function f(n) { return n < 10 ? '0' + n : n; }
    if (typeof Date.prototype.toJSON !== 'function') { Date.prototype.toJSON = function (key) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null; }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) { return this.valueOf(); }; }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' }, rep;
    function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }) + '"' : '"' + string + '"'; }
    function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key); } if (typeof rep === 'function') { value = rep.call(holder, key, value); } switch (typeof value) { case 'string': return quote(value); case 'number': return isFinite(value) ? String(value) : 'null'; case 'boolean': case 'null': return String(value); case 'object': if (!value) { return 'null'; } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === '[object Array]') { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null'; } v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']'; gap = mind; return v; } if (rep && typeof rep === 'object') { length = rep.length; for (i = 0; i < length; i += 1) { if (typeof rep[i] === 'string') { k = rep[i]; v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } else { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}'; gap = mind; return v; } }
    if (typeof JSON.stringify !== 'function') { JSON.stringify = function (value, replacer, space) { var i; gap = ''; indent = ''; if (typeof space === 'number') { for (i = 0; i < space; i += 1) { indent += ' '; } } else if (typeof space === 'string') { indent = space; } rep = replacer; if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) { throw new Error('JSON.stringify'); } return str('', { '': value }); }; }
    if (typeof JSON.parse !== 'function') { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === 'object') { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; } } } } return reviver.call(holder, key, value); } text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }); } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { j = eval('(' + text + ')'); return typeof reviver === 'function' ? walk({ '': j }, '') : j; } throw new SyntaxError('JSON.parse'); }; }
}());

$.fn.myPager = function (option) {
    var defaultOption = {
        beforLoadCallback: null,
        loadCompleteCallback: null,
        loadDataCallback: null, //加载数据的CallBack
        IsShowTip: true,
        IsShowPageNum: true,
        IsShowFL: true, //Frist Prev Next Last
        IsShowPN:true,
        IsShowCommand: true,
        url: "",
        pageCount: 10, //每页条数
        pageNumGPCount: 7, //每组的页码个数
        relatePager: null, //相关联双分页容器ID
        notRequest: false, // 只在双分页条件下使用避免多次加载
        noDataCallback: null,
        IsAutoLoad:true,
        query:null,
        hasCacheKey:false //用查询条件做成缓存键值
    };
    var option = $.extend(defaultOption, option);
    if (!option.url)
        return;
    var container = this.first(); //分页的容器
    var toolfunc = {
        query:{},
        pages: 1,
        currentPage: 1,
        lastPage: 0,
        total: 0,
        doSearch: function (searchOption) {
            toolfunc.query = searchOption;
            this.currentPage = 1;
            this.lastPage = 0;            
            this.populate();
        },
        populate: function () {
            if (toolfunc.currentPage > toolfunc.pages)
                toolfunc.currentPage = toolfunc.pages;
            if (toolfunc.currentPage < 1)
                toolfunc.currentPage = 1;
            if (toolfunc.lastPage === toolfunc.currentPage)
                return;
            else {
                toolfunc.lastPage = toolfunc.currentPage;
                if (option.relatePager && $(option.relatePager).get(0).toolfunc) {//同步上次页标
                    $(option.relatePager).get(0).toolfunc.lastPage = toolfunc.currentPage;
                }
            }
            var queryParams = toolfunc.query || {};
            queryParams.page = toolfunc.currentPage;
            queryParams.rp = option.pageCount;
            if (option.notRequest) {
                option.notRequest = false;
                return;
            }
            
            if(option.hasCacheKey){
            	delete queryParams.redisKey;
            	queryParams.redisKey = "c"+ queryParams.cityID + $.map(queryParams,function(v,k){return k.substr(0,1)+v;}).join("");
            }
            else
            	queryParams.redisKey ="";
            
            $.ajax({
                type: "post",
                url: option.url,
                data: queryParams,
                dataType: "json",
                success: function (data) {
                    toolfunc.addData(data);
                }
            });
        },
        addData: function (data) {
        	if(typeof data.rows === "string")
        		data.rows = $.parseJSON(data.rows);
        	
        	data = $.extend({ rows: [], total: 0 }, data);
            
            if (!data.total)
                option.noDataCallback && Object.prototype.toString.call(option.noDataCallback) === "[object Function]" && option.noDataCallback(container);
            else{
            	option.loadDataCallback && Object.prototype.toString.call(option.loadDataCallback) === "[object Function]" && option.loadDataCallback(data.rows,data.total); //加载数据
            	container.css("display","");
            }
            	
            toolfunc.buildPager(data.total); //创建分页
            toolfunc.genTip();
            if (option.relatePager) {
                var relatePagerObj = $(option.relatePager).get(0);
                relatePagerObj.toolfunc.currentPage = toolfunc.currentPage;
                relatePagerObj.toolfunc.buildPager(data.total);
                relatePagerObj.toolfunc.genTip();
            }

            option.loadCompleteCallback && Object.prototype.toString.call(option.loadCompleteCallback) === "[object Function]" && option.loadCompleteCallback(data); //调用加载完成函数
        },
        genTip: function () {
            if (option.IsShowTip) {

                container.children("div.myPager").children("span.pagerTip").get(0).innerHTML = "共{2}条(页数{1}/{0})".format(toolfunc.pages, toolfunc.currentPage, toolfunc.total);
            
               // container.children("div.myPager").children("span.pagerTip").get(0).innerHTML = "当前{2}页,共{0}页,每页{1}条,共{3}条".format(toolfunc.pages, option.pageCount, toolfunc.currentPage, toolfunc.total);
            }
        },
        buildPager: function (count) {
            toolfunc.total = count;
            toolfunc.pages = Math.ceil(count / option.pageCount);
            container.empty();
            var pagerDiv = document.createElement("div");
            pagerDiv.className = "myPager";
            if (option.IsShowTip) {
                var tipSpan = document.createElement("span");
                tipSpan.className = "pagerTip";
                $(pagerDiv).append(tipSpan);
            }
            if (option.IsShowFL) {
                var firstA = document.createElement("a");
                firstA.href = "javascript:void(0)";
                firstA.innerHTML = "首页";
                firstA.onclick = function () {
                    toolfunc.currentPage = 1;
                    toolfunc.populate();
                }
      
                var lastA = document.createElement("a");
                lastA.href = "javascript:void(0)";
                lastA.innerHTML = "尾页";
                lastA.onclick = function () {
                    toolfunc.currentPage = toolfunc.pages;
                    toolfunc.populate();
                };
            }
                
            if (option.IsShowPN) {
                var prevA = document.createElement("a");
                prevA.href = "javascript:void(0)";
                prevA.innerHTML = "上一页";
                prevA.onclick = function () {
                    toolfunc.currentPage--;
                    toolfunc.populate();
                };

                var nextA = document.createElement("a");
                nextA.href = "javascript:void(0)";
                nextA.innerHTML = "下一页";
                nextA.onclick = function () {
                    toolfunc.currentPage++;
                    toolfunc.populate();
                };
            }
            var pageNumsSpan = document.createElement("span");
            pageNumsSpan.className = "PageNums";
            $(pagerDiv).append(firstA || null).append(prevA || null).append(pageNumsSpan || null).append(nextA || null).append(lastA || null);
            
            if (option.IsShowPageNum) {
                var groups = Math.ceil(toolfunc.pages / option.pageNumGPCount);
                var currentGps = Math.ceil(toolfunc.currentPage / option.pageNumGPCount);
                for (var i = (currentGps - 1) * option.pageNumGPCount; i < (currentGps * option.pageNumGPCount) ; i++) {
                    if (i < toolfunc.pages) {
                        if ((i + 1) === toolfunc.currentPage) {
                            var pageNumSpan = document.createElement("span");
                            pageNumSpan.className = "current";
                            pageNumSpan.innerHTML = i + 1;
                            $(pageNumsSpan).append(pageNumSpan);
                        }
                        else {
                            var pageNumA = document.createElement("a");
                            pageNumA.href = "javascript:void(0)";
                            pageNumA.innerHTML = i + 1;
                            pageNumA.onclick = (function (index) {
                                return function () {
                                    toolfunc.currentPage = index + 1;
                                    toolfunc.populate();
                                };
                            })(i);
                            $(pageNumsSpan).append(pageNumA);
                        }
                    }
                    else
                        break;
                }
                if (currentGps < groups) {
                    var nextDot = document.createElement("a");
                    nextDot.href = "javascript:void(0)";
                    nextDot.innerHTML = "...";
                    nextDot.onclick = function () {
                        toolfunc.currentPage = option.pageNumGPCount * currentGps + 1;
                        toolfunc.populate();
                    }
                    $(pageNumsSpan).append(nextDot);
                }
                if (currentGps > 1) {
                    var prevDot = document.createElement("a");
                    prevDot.href = "javascript:void(0)";
                    prevDot.innerHTML = "...";
                    prevDot.onclick = function () {
                        toolfunc.currentPage = option.pageNumGPCount * (currentGps - 1);
                        toolfunc.populate();
                    }
                    $(pageNumsSpan).prepend(prevDot);
                }
            }
            if (option.IsShowCommand) {
                var commandSpan = document.createElement("span");
                commandSpan.className = "command";
                var inputNum = document.createElement("input");
                inputNum.style.width = "20px";
                inputNum.type = "text";
                var inputGo = document.createElement("input");
                inputGo.type = "button";
                inputGo.value = "GO";
                inputGo.style.cursor = "pointer";
                inputGo.onclick = function () {
                    if ($.trim(inputNum.value) && !isNaN(inputNum.value) && parseInt(inputNum.value) > 0 && parseInt(inputNum.value) <= toolfunc.pages) {
                        toolfunc.currentPage = parseInt(inputNum.value);
                        toolfunc.populate();
                    }
                    else
                        inputNum.value = "";
                };
                $(commandSpan).append(inputNum).append(inputGo);
                $(pagerDiv).append(commandSpan);
            }
            $(container).append(pagerDiv);
        }
    };
    option.beforLoadCallback && Object.prototype.toString.call(option.beforLoadCallback) === "[object Function]" && option.beforLoadCallback.call(container);
    if(option.IsAutoLoad)
    toolfunc.doSearch(option.query);
    container.get(0).toolfunc = toolfunc;
}
$.fn.doPagerSearch = function(searchOption){
	if(this.get(0).toolfunc.doSearch)
		this.get(0).toolfunc.doSearch(searchOption);
};

Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} 


$.fn.myAutoSelect = function (option) {
    var defaultOption = {
        tipTxt:"请输入内容",
        isHorizon: false,
        url: "", //{total: 0, dicts:"{\"name\":\"haojun\",\"age\":\"12\"}"} 
        dataSource: null, //{key:value,key:value}
        prefix: "Card_",
        relationInputs: "", //id,id 当数据查询时需要关联查询的相关input的id
        clearInputs: "", //id,id当input数据改变需要清除的相关 input的id
        isMult: false, //只有在数据源是死数据的情况下
        hidValue: "", //val,val,val
        hidName: null,//hidden 的name值 默认就是input的name
        value: "",//默认input的值
        onloaded: null,//每次加载完触发
        onClick: null, //点击 li 触发
        selTop: 20,
        queryName:"QueryStr",
        height:200,//默认的高度
        width:150,
        kvPair:[], //[0] id [1] 要显示的列
        rePosition:false // 重新定位 
    };

    var toolFunc = {
	    loadDictData: function (data) {
	            $(ul).empty();
	            $.each(data, function (k, v) {
	                if ($.inArray(v.toString(), $hiddenInput.val().split(",")) != -1) {
	                    $(ul).append("<li class='current' value='" + v + "'>" + k + "</li>");
	                }
	                else
	                    $(ul).append("<li value='" + v + "'>" + k + "</li>");
	            });
	            
	            if (option.onloaded && Object.prototype.toString.call(option.onloaded) === "[object Function]")
	                option.onloaded.call($input);
	        },    
	        loadData: function (data) {
	            $(ul).empty();
	            $.each(data, function (i, item) {
	                if ($.inArray(item[option.kvPair[0]].toString(), $hiddenInput.val().split(",")) != -1) {
	                    $(ul).append("<li class='current'  datainfo='"+ JSON.stringify(item) +"' value='" + item[option.kvPair[0]] + "'>" + item[option.kvPair[1]] + "</li>");
	                }
	                else
	                    $(ul).append("<li datainfo='"+ JSON.stringify(item) +"' value='" + item[option.kvPair[0]] + "'>" +item[option.kvPair[1]]+ "</li>");
	            });
	           
	            if (option.onloaded && Object.prototype.toString.call(option.onloaded) === "[object Function]")
	                option.onloaded.call($input);
	        },
	        getData: function (url, queryStr, relatQueryObj) {
	      
	            isLoading = true;
	            var queryModel = {page:1,rp:option.selTop};
	            queryModel[option.queryName] = queryStr;            
	            $.post(url, $.extend(queryModel, relatQueryObj), function (data) {
	               if(!option.kvPair.length)
	            	   toolFunc.loadDictData(data.dicts);  
	               else
	            	   toolFunc.loadData(data.rows);
	                //$(container).css("display", data.total ? "" : "none");
	               $(container).css("display", "");
	                isLoading = false;
	            });
	        },
	        getRelateObj: function () {
	            if (option.relationInputs) {
	                return $(option.relationInputs).next().GetDivJson(option.prefix);
	            }
	            else
	                return null;
	        },
	        rePosition:function(container){
	    	  var pos = $input.position();
	    	  $(container).addClass("myauto_box").css({ display: "none",width:(option.width +"px"), position: "absolute", top: (pos.top + 3 + $input.outerHeight()), left: pos.left + 1, zIndex: 200 });        	   
	        }
	    };
    option = $.extend(defaultOption, option);
    var $input = $(this);
    $input.attr({"autocomplete":"off","placeholder":option.tipTxt}); //禁止自带的input 缓存
    option.value && $input.val(option.value);
 
    var $hiddenInput = $("<input id='"+ option.prefix + (option.hidName || this.get(0).getAttribute("name")) + "' type='hidden' placeholder='"+$input.attr("placeholder")+"' value='" + option.hidValue + "' name='" + option.prefix + (option.hidName || this.get(0).getAttribute("name")) + "'/>");    
    $input.after($hiddenInput);

    var container = document.createElement("div");
    toolFunc.rePosition(container);
    container.id = "myauto_" + this.get(0).id;

    var ul = document.createElement("ul");
    $(ul).addClass("clearfix list_r").css({height: (option.height + "px"),overflowY:"auto"});
    !option.isHorizon && $(ul).addClass("list_c");
    $(container).append(ul);

    var btnPanel = document.createElement("div");
    $(btnPanel).addClass("btn-box");
    
    var closeBtn = document.createElement("input");
    $(closeBtn).addClass("inp_red").attr({"value" :"关闭",type:"button"}).click(function(){$(container).css("display","none");});
    var clearBtn = document.createElement("input");
    $(clearBtn).addClass("inp_gray").attr({"value":"清除",type:"button"}).click(function(){ $(ul).find("li").removeClass("current");$input.attr("title","").val("").next().val(""); clearRelateInput(option.clearInputs);});
    $(btnPanel).append(clearBtn).append(closeBtn);
    
    $(container).append(btnPanel);

    if (option.url) {
        var isLoading = false;
        $input.keyup(function (event) {
            if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 13) {//38 up  40 down 37 left  39 right  13 enter
                var $lis = $(ul).children("li");
                if (!$lis.length)
                    return false;
                var $curLi = $lis.filter(".current");
                var $prev = $curLi.prev();
                var $next = $curLi.next();
                var $firstLi = $lis.first();
                var $lastLi = $lis.last();
                if (option.isHorizon) {
                    if (event.keyCode === 37) {
                        return false;
                    }
                    else if (event.keyCode == 39) {
                        return false;
                    }
                }
                else {
                    if (event.keyCode === 38) {
                        if ($curLi.length) {
                            if ($prev.length) {
                                $prev.addClass("current");
                            }
                            else {
                                $lastLi.addClass("current");
                            }
                            $curLi.removeClass("current");
                        }
                        else
                            $firstLi.addClass("current");
                        return false;
                    }
                    else if (event.keyCode == 40) {
                        if ($curLi.length) {
                            if ($next.length) {
                                $next.addClass("current");
                            }
                            else {
                                $firstLi.addClass("current");
                            }
                            $curLi.removeClass("current");
                        }
                        else
                            $firstLi.addClass("current");
                        return false;
                    }
                }
                if (event.keyCode === 13) {
                    var curLi = $lis.filter(".current").get(0);
                    curLi && curLi.click();
                    return false;
                }
            }
            
            var _str = "";
        	if(this.value!=$(this).attr("title")) _str = this.value; //值没改变不赛选条件
        	
            !isLoading && toolFunc.getData(option.url, _str , toolFunc.getRelateObj());
            event.stopPropagation();
        });
        $input.click(function (e) {  
        	//console.log(this.value);
        	//console.log($(this).attr("title"));
        	var _str = "";
        	if(this.value!=$(this).attr("title")) _str = this.value; //值没改变不赛选条件
        	
        	//setTipTxt();        	
        	if(option.rePosition)
        		toolFunc.rePosition(container);
            !isLoading && toolFunc.getData(option.url, _str, toolFunc.getRelateObj());
            e.stopPropagation();
            e.preventDefault();
        });
    }
    else {
        $input.prop("readonly", "readonly");
        $input.click(function (e) {
            //setTipTxt();
        	if(option.rePosition)
        		toolFunc.rePosition(container);
        	
            $(container).css("display", "");
            e.stopPropagation();
            e.preventDefault();
        });
        toolFunc.loadDictData(option.dataSource);
    }

    function clearRelateInput(ids) {
        $(ids).attr("title", "").val("").next().val("");
        $(ids).each(function (i, item) {
            $("#myauto_" + item.id + " ul:first").empty();
            $("#myauto_" + item.id ).css("display","none")
        });
    }
    function clearLiCss(elem) {
        $(elem).addClass("current").siblings().removeClass("current");
    }
/*    function setTipTxt() {
        if ($.trim($input.val()) === option.tipTxt)
        { $input.val(""); $hiddenInput.val(""); }
    }*/

    $(ul).click(function (event) {
    
        var elem = event.target || event.srcElement;
        if (elem.tagName != "LI")
            return false;
        if (!option.url) {//数据源写死 
            if (option.isMult) {
                if ($(elem).hasClass("current")) {
                    $(elem).removeClass("current")
                    var val = $.grep($input.val().split(","), function (v, i) { return v != elem.innerHTML }).join(",");
                    $input.val(val).attr("title", val).css("color","#000"); //CJH 加了个颜色
                    $hiddenInput.val($.grep($hiddenInput.val().split(","), function (v, i) { return v != elem.getAttribute("value") }).join(","));
                }
                else {
                    var inpValAry = $($input.val().split(",")).get();
                    var hidInpValAry = $($hiddenInput.val().split(",")).get();
                    !inpValAry[0] && inpValAry.pop();
                    !hidInpValAry[0] && hidInpValAry.pop();
                    inpValAry.push(elem.innerHTML);
                    $input.attr("title", inpValAry.join(",")).val(inpValAry.join(",")).css("color","#000"); //CJH 加了个颜色;
                    hidInpValAry.push(elem.getAttribute("value"));
                    $hiddenInput.val(hidInpValAry.join(","));
                    $(elem).addClass("current");
                }
            }
            else {
                $input.attr("title", elem.innerHTML).val(elem.innerHTML).css("color","#000"); //CJH 加了个颜色;
                $hiddenInput.val(elem.getAttribute("value"));
                clearLiCss(elem);
            }            
        }
        else {
            //有数据源状态下
            $input.attr("title", elem.innerHTML).val(elem.innerHTML).css("color","#000"); //CJH 加了个颜色;
            $hiddenInput.val(elem.getAttribute("value"));
            clearRelateInput(option.clearInputs);
            clearLiCss(elem);
            $(container).css("display", "none");
        }
        option.isMult || $(container).css("display", "none");
        if (option.onClick && Object.prototype.toString.call(option.onClick) === "[object Function]")
            option.onClick.call($input,elem);        
         event.stopPropagation();
    });
    $input.before(container);

    $input.get(0).innerFunc = toolFunc;
    
   if(!$.fn.myAutoSelect.bodyHasBindHideEvent){	   
	   $("body").bind("click",function(){
		   $("div.myauto_box").css("display","none");
	   });   
	   $.fn.myAutoSelect.bodyHasBindHideEvent = true;
   }
}

$.vankeAlert = function(option){
	
	var defaultOption= $.extend({
	title:"",
	content:"",
	tip:"",
	sureCallBack:null,
	closeCallBack:null,
	params :[],
	showTimer:false,
	},option);
	
	var container ="<div id='vankeAlertContainer' class='comm_block comm_window group_window' style='display: block;"+ ( !defaultOption.title ? "height:175px;width:550px;" : "") +"'>"+
    "<div class='ban'><a id='vankeAlertCloseBtn' href='javascript:void(0);' class='a_r icon_br icon_close window_close'>关闭</a><span class='title'><strong>" + defaultOption.tip + "</strong></span></div>"+
    "<div class='con'> "+( defaultOption.title ? ("<div class='h01'>" + defaultOption.title + "</div>") : "")+
	"<div class='h02'>"+ defaultOption.content +"</div>"+
	"<div class='h03'><a id='vankeAlertSureBtn' href='javascript:void(0)' class='auto_btn'>确定</a></div>"+
    "</div>"+
    "</div>";
	
	var $marsk = $("<div class='mask' style='opacity: 0.2; height: "+ document.body.clientHeight +"px; width: "+ document.body.clientWidth +"px; display: block;'></div>");
	
	var $container = $(container);
	var handleTimer = null;
	if(defaultOption.showTimer){
		var hour = 0,min =0,sec =0;
		var $a = $("<a style='float:left' id='timera'>00:00:00</a>");
		$container.children("div.ban").append($a);
		handleTimer = setInterval(function(){
			sec++;
			if(sec >= 60){
				min ++;
				sec = 0;
			}
			if(min >= 60){
				hour ++;
				min =0;
			}			
			$a.text(("00"+hour).slice("-2")+ ":" +("00"+min).slice("-2")+ ":" +("00"+sec).slice("-2"));
		},1000);
		
	}
	
	
	$container.find("#vankeAlertCloseBtn").click(function(e){ 
		if( defaultOption.closeCallBack)
		defaultOption.closeCallBack.call(e,defaultOption.params);	
		
		if(handleTimer)
			clearInterval(handleTimer);
		$container.remove();
		$marsk.remove();
		
	});
	
	$container.find("#vankeAlertSureBtn").click(function(e){ 
		if( defaultOption.sureCallBack)
		defaultOption.sureCallBack.call(e,defaultOption.params);	
		
		if(handleTimer)
			clearInterval(handleTimer);		
		$container.remove();
		$marsk.remove();
	});

	$("body").append($marsk).append($container);
	
}

$.wtAlert = function(){
	var defaultOption= $.extend({
		title:"",
		content:"",
		tip:"",
		sureCallBack:null,
		closeCallBack:null,
		params :[],
		showTimer:false,
		},option);
	
	var id ="wtAlert_" + (Math.random() *100000 % 10000).toFixed(0); //生成随机Id
	var container= "<div class='popBox' id='"+ id +"' style='position: fixed;'>" +
	"<div class='close fx'><img width='44' src='images/closevideo.png'></div>" +
	"<div class='part01-succorder tc'><img src='images/succ_icon.png'></div>" +
    "<div class='part02-succorder tc'>"+ defaultOption.title +"</div>" +
    "<div class='part03-succorder tc'>"+ defaultOption.content +"</div>" +
    "</div>";
}


$(function(){	
	$("[rightId]").each(function(i,item){
		if(top.userRights.indexOf(item.getAttribute("rightId")+",") > 0 ){
			}
			else{
				$(item).remove();
			}
	
	});
	//权限控制
/*	$("[rightId]").each(function () {//遍历所有的RIGHTID属性的页面控件
		var _rightstr = top.userRights;
		var rid = $(this).attr("rightId");
        if (rid == "") return;
        if (rid.indexOf(",") < 0) {
            if (_rightstr.indexOf("," + rid + ",") < 0) {
                $(this).attr("disabled", "disabled");
                //Chrome下disabled不起作用，So..
                //if ($(this).is("a")) $(this).attr("id", $(this).attr("id") + "_disabled").removeAttr("href").css("color", "#808080");
            }
        }
        else {
            var ids = rid.split(",");
            var enabled = false;
            for (var key in ids) {
                if ((',' + _rightstr + ',').indexOf("," + ids[key] + ",") > -1) enabled = true;
            }
            if (!enabled) {
                $(this).attr("disabled", "disabled");
//                if ($(this).is("a")) $(this).attr("id", $(this).attr("id") + "_disabled").removeAttr("href").css("color", "#808080");
            }
        }
    })*/

 
    //下拉权限控制
    $("[searchrightid]").each(function () {
        var rid = $(this).attr("searchrightid");
        if (rid == "") return;
        if (rid.indexOf(",") < 0) {
            if (!isHaveRight(rid)) {
                $(this).prop("disabled", "disabled").unbind();
                if ($(this).is("input")) $(this).removeAttr("url");
            }
        }
        else {
            var ids = rid.split(",");
            var enabled = false;
            for (var key in ids) {
                if (isHaveRight(ids[key])) enabled = true;
            }
           
            if (!enabled) {
                $(this).prop("disabled", "disabled").unbind();
                if ($(this).is("input")) $(this).removeAttr("url");
            }
            
        }
    });
	

});

function isHaveRight(key){
	var rights = ","+top.userRights+",";
	if(rights.indexOf(","+key+",")>-1){ return true;}
	return false;
};


