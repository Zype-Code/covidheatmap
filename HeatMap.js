// This example requires the Visualization library. Include the libraries=visualization
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">
    let map, heatmap;
    const results = [];
    const coordinates = [];

    async function fetchData() {
        const response = await fetch('https://opendata.arcgis.com/datasets/4dabb4afab874804ba121536efaaacb4_0.geojson')
        const data = await response.json();
        return data;
    }

    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 3,
            center: { lat: 56.1304, lng: -106.3468 },
            mapTypeId: "roadmap",
        });
        fetchData().then((data) => {
                results.push(data.features.map((positiveCase) => positiveCase.properties));
                coordinates.push(results[0].map(({latitude, longitude}) => Object.assign({}, {latitude}, {longitude})));
                    
                heatmap = new google.maps.visualization.HeatmapLayer({
                    data: getPoints(),
                    map: map,
                });
            }
        )

        
    }
// do input compared if 
    function toggleHeatmap() {
        heatmap.setMap(heatmap.getMap() ? null : map);
    }

    function changeGradient() {
        const gradient = [
            "rgba(0, 255, 255, 0)",
            "rgba(0, 255, 255, 1)",
            "rgba(0, 191, 255, 1)",
            "rgba(0, 127, 255, 1)",
            "rgba(0, 63, 255, 1)",
            "rgba(0, 0, 255, 1)",
            "rgba(0, 0, 223, 1)",
            "rgba(0, 0, 191, 1)",
            "rgba(0, 0, 159, 1)",
            "rgba(0, 0, 127, 1)",
            "rgba(63, 0, 91, 1)",
            "rgba(127, 0, 63, 1)",
            "rgba(191, 0, 31, 1)",
            "rgba(255, 0, 0, 1)"
        ];
        heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
    }

    function changeRadius() {
        heatmap.set("radius", heatmap.get("radius") ? null : 40);
    }

    function changeOpacity() {
        heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
    }

    // Heatmap data: 500 Points
    function getPoints() {
        const points = coordinates[0].map(({latitude, longitude}) => {
            return new google.maps.LatLng(latitude, longitude);
        })
        return [
            new google.maps.LatLng(37.782551, -122.445368),
            {location: new google.maps.LatLng(37.782, 122.443), weight: 2},
            ...points
        ];
    }