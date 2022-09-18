export async function getOsmData(bbox){
	return fetch(
		'https://overpass-api.de/api/interpreter',
		{
			method:'POST',
			headers: { 
				'Content-Type': 'application/json', 
				'Accept': 'application/json' 
			},
			body: overpassStreetsQuery(bbox)
		}
	).then( resp => resp.json() )
}

function overpassStreetsQuery(bbox){
	return `
		[out:json];
		way[highway][highway!~'footway|service'](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
		(._;>;);
		out body qt;`
}
