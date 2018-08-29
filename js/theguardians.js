let getJSON = function(url, callback) {
 
    return new Promise((resolve, reject) => {
        
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      const status = xhr.status;
      if (status === 200) {
        resolve(xhr.response);
      } else {
        const err = new Error(xhr.response.message)
        err.description = xhr.response.documentation_url;
        err.number = status;
        reject(err);
      }
    };
    xhr.send();
        
    })
};

async function tagtool_latest()
{
  try {
    
    const json = await getJSON('https://api.github.com/repos/TheGuardians-CI/TagTool/releases/latest');
    
    const name = "TagTool";
    const version = json.name.replace('tagtool-', '');
    const download_url = json.assets[0].browser_download_url;
    
    const result = { name, version, download_url };
    
    window.localStorage.last_tagtool = JSON.stringify(result);
    
    return result;
    
  } catch (err)
  {
    if(window.localStorage.last_tagtool)
    {
      console.log(err);
      return JSON.parse(window.localStorage.last_tagtool)
    }
    else console.error(err);
  }
}

async function reclaimed_latest()
{
  try {
    const json = await getJSON('https://api.github.com/repos/TheGuardians-CI/Reclaimed/releases/latest');
    
    const name = "Reclaimed";
    const version = json.name.replace('reclaimed-', '');
    const download_url = json.assets[0].browser_download_url;
    
    const result = { name, version, download_url };
    
    window.localStorage.last_reclaimed = JSON.stringify(result);
    
    return result;
    
  } catch (err)
  {
    if(window.localStorage.last_reclaimed)
    {
      console.log(err);
      return JSON.parse(window.localStorage.last_reclaimed)
    }
    else console.error(err);
  }
}

async function setup_download_buttons()
{
	var tagtool_info = await tagtool_latest();
	var tagtool_btn = document.getElementById("tagtool-btn");
	var tagtool_text = `Download ${tagtool_info.name} ${tagtool_info.version}`;
	
	tagtool_btn.innerHTML = tagtool_text;
	tagtool_btn.href = tagtool_info.download_url;
  
	var reclaimed_info = await reclaimed_latest();
	var reclaimed_btn = document.getElementById("reclaimed-btn");
	var reclaimed_text = `Download ${reclaimed_info.name} ${reclaimed_info.version}`;
	
	reclaimed_btn.innerHTML = reclaimed_text;
	reclaimed_btn.href = reclaimed_info.download_url;
}



setup_download_buttons().then(console.log).catch(console.error)