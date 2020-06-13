let token = '';
let tuid  = '';

const twitch = window.Twitch.ext;

twitch.onAuthorized((auth) =>
{
	token = auth.token;
	userId = auth.userId;
	
	try
	{
		var obj = JSON.parse(twitch.configuration.broadcaster.content);
		if (!("ID" in obj))
			throw "No ID";
		document.getElementById('MOEimg').src = "https://herhor.net/wot/moe/permanent/P-" + obj.ID + ".webp";
	}
	catch (err)
	{
		document.getElementById('MOEimg').src = "https://herhor.net/wot/moe/twitch/default.webp";
	}
});

