async function requestRegister(user, pass)
{
	try
	{
		const response = await fetch(`/api/players/`,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify({
					username: user,
					password: pass
				})
			});
		// We are not checking for errors (considering the GUI is only allowing correct choices)
		return await response.json();
	}
	catch (err)
	{
		// Treat 500 errors here
		console.log(err);
	}
}


async function requestLogin(user, pass)
{
	try
	{
		const response = await fetch(`/api/players/login`,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify({
					username: user,
					password: pass
				})
			});
		// We are not checking for errors (considering the GUI is only allowing correct choices)
		return await response.json();
	}
	catch (err)
	{
		// Treat 500 errors here
		console.log(err);
	}
}

async function requestPlayerMatches(pId)
{
	try
	{
		const response = await fetch(`/api/players/${pId}/playermatches`);
		return await response.json();
	}
	catch (err)
	{
		// Treat 500 errors here
		console.log(err);
	}
}

async function requestPlayersOfMatch(mId)
{
	try
	{
		const response = await fetch(`/api/players/playermatches/match${mId}`);
		return await response.json();
	}
	catch (err)
	{
		// Treat 500 errors here
		console.log(err);
	}
}


async function requestWaitingMatches()
{
	try
	{
		const response = await fetch(`/api/players/playermatches/waiting`);
		return await response.json();
	}
	catch (err)
	{
		// Treat 500 errors here
		console.log(err);
	}
}

async function requestJoinMatch(pId, mId)
{
	try
	{
		const response = await fetch(`/api/players/matches/${mId}`,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: "PUT",
				body: JSON.stringify({
					pId: pId,
				})
			});
		// We are not checking for errors (considering the GUI is only allowing correct choices)
		return await response.json();
	}
	catch (err)
	{
		// Treat 500 errors here
		console.log(err);
	}
}

async function requestCreateMatch(pId)
{
	try
	{
		const response = await fetch(`/api/players/${pId}/matches`,
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: "POST"
			});
		// We are not checking for errors (considering the GUI is only allowing correct choices)
		return await response.json();
	}
	catch (err)
	{
		// Treat 500 errors here
		console.log(err);
	}
}

