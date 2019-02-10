"use strict"
// SPARQLクエリー
var query = `
	prefix ic: <http://imi.go.jp/ns/core/rdf#>
	prefix xsd: <http://www.w3.org/2001/XMLSchema#>
	select ?uri ?name ?lat ?lng {
		?uri ic:名称 [ ic:表記 ?name ].
		?uri ic:地理座標 [ ic:緯度 ?lat; ic:経度 ?lng; ].
		filter(contains(str(?name), '病院' ))
		filter(
			xsd:float(?lat) < $LAT_MAX && xsd:float(?lng) > $LNG_MIN &&
			xsd:float(?lat) > $LAT_MIN && xsd:float(?lng) < $LNG_MAX
		)
	} limit 100
`

var query2 = `
	prefix ic: <http://imi.go.jp/ns/core/rdf#>
	prefix xsd: <http://www.w3.org/2001/XMLSchema#>
	select ?uri ?name ?lat ?lng {
		?uri ic:名称 [ ic:表記 ?name ].
		?uri ic:地理座標 [ ic:緯度 ?lat; ic:経度 ?lng; ].
		filter(contains(str(?name), '図書館' ))
		filter(
			xsd:float(?lat) < $LAT_MAX && xsd:float(?lng) > $LNG_MIN &&
			xsd:float(?lat) > $LAT_MIN && xsd:float(?lng) < $LNG_MAX
		)
	} limit 100
`

var query3 = `
	prefix ic: <http://imi.go.jp/ns/core/rdf#>
	prefix xsd: <http://www.w3.org/2001/XMLSchema#>
	select ?uri ?name ?lat ?lng {
		?uri ic:名称 [ ic:表記 ?name ].
		?uri ic:地理座標 [ ic:緯度 ?lat; ic:経度 ?lng; ].
        filter(contains(str(?name), '駅' ))
        filter(!contains(str(?name), '駐車場'))
        filter(!contains(str(?name), '道の駅'))
		filter(
			xsd:float(?lat) < $LAT_MAX && xsd:float(?lng) > $LNG_MIN &&
			xsd:float(?lat) > $LAT_MIN && xsd:float(?lng) < $LNG_MAX
		)
	} limit 100
`

var query4 = `
	prefix ic: <http://imi.go.jp/ns/core/rdf#>
	prefix xsd: <http://www.w3.org/2001/XMLSchema#>
	select ?uri ?name ?lat ?lng {
		?uri ic:名称 [ ic:表記 ?name ].
		?uri ic:地理座標 [ ic:緯度 ?lat; ic:経度 ?lng; ].
        filter(contains(str(?name), '警察' ))
		filter(
			xsd:float(?lat) < $LAT_MAX && xsd:float(?lng) > $LNG_MIN &&
			xsd:float(?lat) > $LAT_MIN && xsd:float(?lng) < $LNG_MAX
		)
	} limit 100
`

var query5 = `
	prefix ic: <http://imi.go.jp/ns/core/rdf#>
	prefix xsd: <http://www.w3.org/2001/XMLSchema#>
	select ?uri ?name ?lat ?lng {
		?uri ic:名称 [ ic:表記 ?name ].
		?uri ic:地理座標 [ ic:緯度 ?lat; ic:経度 ?lng; ].
        filter(contains(str(?name), '学校' ))
		filter(
			xsd:float(?lat) < $LAT_MAX && xsd:float(?lng) > $LNG_MIN &&
			xsd:float(?lat) > $LAT_MIN && xsd:float(?lng) < $LNG_MAX
		)
	} limit 100
`

var arrayQuery = [
    [query5, 'icon-school.png'],
    [query4, 'icon-koban.png'],
    [query, 'icon-hospital.png'],
    [query2, 'icon-library.png'],
    [query3, 'icon-station.png'],
];

var replaceQuery = function( que, pos,  delta ) {
    let q = que
	q = q.replace("$LAT_MAX", pos.lat + delta)
	q = q.replace("$LAT_MIN", pos.lat - delta)
	q = q.replace("$LNG_MAX", pos.lng + delta)
    q = q.replace("$LNG_MIN", pos.lng - delta)
    return q
}

