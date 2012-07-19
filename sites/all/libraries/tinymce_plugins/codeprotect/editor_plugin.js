(function(){tinymce.PluginManager.requireLangPack("codeprotect");tinymce.create("tinymce.plugins.codeprotectPlugin",{init:function(b,c){var d=this;d.editor=b;d.url=c;function a(e){return/\bmceCodeProtect\b/.test(e.className)}d.codeRegex=b.getParam("codeprotect_regex",/((?:<(?:jsp|asp):[^>]* \/>)|(?:<\?(?:\?(?!>)|[^\?])*\?>)|(?:<%(?:%(?!>)|[^%])*%>))/gm);b.addCommand("mcecodeprotect",function(){b.windowManager.open({file:c+"/codeprotect.htm",width:320+b.getLang("codeprotect.delta_width",0),height:120+b.getLang("codeprotect.delta_height",0),inline:1},{plugin_url:c})});b.addButton("codeprotect",{title:"codeprotect.desc",cmd:"mcecodeprotect",image:c+"/img/codeprotect.png"});b.onBeforeSetContent.add(function(e,f){f.content=f.content.replace(d.codeRegex,function(h,g){var i='<img width="11" height="11" src="'+c+'/img/codeprotect_symbol.gif" alt="'+d._protectCode(g)+'" title="Protected Server Side Code" class="mceCodeProtect mceItem" />';return i})});b.onPostProcess.add(function(e,i){if(i.get){var g=-1;while((g=i.content.indexOf("<img",g+1))!=-1){var f=i.content.indexOf("/>",g);var h=d._parseAttributes(i.content.substring(g+4,f));f+=2;if(!h.src||!h.alt||-1===h.src.indexOf("codeprotect_symbol.gif")){g+=3;continue}chunkBefore=i.content.substring(0,g);chunkAfter=i.content.substring(f);i.content=chunkBefore+h.alt+chunkAfter}}});b.onNodeChange.add(function(f,e,g){e.setActive("codeprotect",g.nodeName=="IMG"&&a(g))})},createControl:function(b,a){return null},getInfo:function(){return{longname:"CodeProtect Ex plugin for TinyMCE v3.x",author:"Vorapoap Lohwongwatana",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/codeprotect",version:"0.9.3"}},_protectCode:function(b){var c=document.createElement("div");var a=document.createTextNode(b.replace(/--/g,"__OX_DOUBLE_DASH_OX__").replace(/\n/g,"__OX_NEW_LINE_OX__"));c.appendChild(a);return c.innerHTML.replace(/"/g,"&quot;")},_unprotectCode:function(a){var b=document.createElement("div");b.innerHTML=this._stripTags(a).replace(/__OX_DOUBLE_DASH_OX__/g,"--").replace(/__OX_NEW_LINE_OX__/g,"\n\n").replace(/&gt;/,">");return b.childNodes[0]?b.childNodes[0].nodeValue:""},_stripTags:function(a){return a},_parseAttributes:function(j){var g="";var b="";var a;var f;var d=new Array();var k=/^[ \n\r\t]+/g;if(j==null||j.length<2){return null}j=j.replace(/'/g,"&#39;");a=f=false;for(var e=0;e<j.length;e++){var c=j.charAt(e);if(c=='"'&&!f){f=true}else{if(c=='"'&&f){f=false;var h=g.lastIndexOf(" ");if(h!=-1){g=g.substring(h+1)}if(g.toLowerCase()=="alt"){b=this._unprotectCode(b).replace(/&#39;/g,"'")}d[g.toLowerCase()]=b.substring(1);g="";b=""}else{if(!k.test(c)&&!a&&!f){a=true}}}if(c=="="&&a){a=false}if(a){g+=c}if(f){b+=c}}return d}});tinymce.PluginManager.add("codeprotect",tinymce.plugins.codeprotectPlugin)})();