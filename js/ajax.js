var flag=0;
function ajaxFunction() //创建ajax对象
{
	var xmlHttp;
	try //fireFox ,opera 8.0+,safari,chrome 内核创建方式
	{
		xmlHttp = new XMLHttpRequest();
	}
	catch(e)
	{
		try //IE浏览器的方式
		{
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch(e)
		{
			try
			{
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e){ alert("本网页不支持你的浏览器的提交,请更换chrome或其他浏览器"); }
		}
	}
	return xmlHttp;
}

function requestEnd()
{
	if(xhr.readyState==4) //代表交互中状态,正在接受服务器数据
	{
		if(xhr.status==200 || xhr.status==304) //如果是200OK或者304cache
		{
			var data = xhr.responseText;
            getdata(flag,data);
		}
        flag=0;
	}
}

function requestStart(f,url,param="",post="POST",base=true)
{
    flag = f;
	xhr.open(post,(base?getBaseURL():"")+url,true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");//application/x-www-form-urlencoded
	param = param.length == 0?'ajax=true':(param+'&ajax=true');
    xhr.send(param);
}

var data = null;
var xhr = ajaxFunction(); //获得ajax异步传输对象
xhr.onreadystatechange = requestEnd;

function getBaseURL()
{
	return window.location.protocol+"//"+window.location.host;
}