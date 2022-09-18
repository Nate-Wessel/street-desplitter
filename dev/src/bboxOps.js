export function bounds2bbox(bounds){
	const [ north, south ] = [ bounds.getNorth(), bounds.getSouth() ]
	const [ east, west ] = [ bounds.getEast(), bounds.getWest() ]
	return { north, east, south, west }
}

export function bbox2geojson({north,east,south,west}){
	return {
		type: 'Feature',
		geometry: {
			type: 'LineString',
			coordinates: [
				[east,north],[west,north],[west,south],[east,south],[east,north]
			]
		}
	}
}
