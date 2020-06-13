let token, userId;

const version = '1.1.5';

const twitch = window.Twitch.ext;

twitch.onContext(function (context)
{
	if (context.theme == 'light')
	{
		document.querySelector('body').classList.remove('dark');
		document.querySelector('body').classList.add('light');
	}
	else
	{
		document.querySelector('body').classList.remove('light');
		document.querySelector('body').classList.add('dark');
	}
});

twitch.onAuthorized((auth) =>
{
	token  = auth.token;
	userId = auth.userId;
	try
	{
		var obj = JSON.parse(twitch.configuration.broadcaster.content);
		if (!("ID" in obj))
			throw "No ID"; 
	}
	catch (err)
	{
		var obj = {ID: ''};
		twitch.configuration.set('broadcaster', version, JSON.stringify(obj));
	}
	document.getElementById('MOEID').value = obj.ID;
	
	document.getElementById('MOEform').onsubmit = function()
	{
		twitch.configuration.set('broadcaster', version, JSON.stringify({ ID: document.getElementById('MOEID').value.replace(/[^a-zA-Z0-9]/g, '') }));
		document.getElementById('MOElog').innerHTML = 'ID updated!';
		event.preventDefault();
	}
	
	document.getElementById('MOEID').oninput = function()
	{
		this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
	}
});