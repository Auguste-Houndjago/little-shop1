// "use client"

// import { useState } from "react"
// import Map, { Marker } from "react-map-gl"
// import { MapPin } from "lucide-react"

// interface MapLocationProps {
//   latitude: number
//   longitude: number
//   location: string
//   zoom?: number
// }

// export default function MapLocation({
//   latitude = 49.4431, // Rouen coordinates
//   longitude = 1.0993,
//   location = "Rouen, France",
//   zoom = 12,
// }: MapLocationProps) {
//   const [viewState, setViewState] = useState({
//     latitude,
//     longitude,
//     zoom,
//   })

//   return (
//     <div className="relative w-full h-[200px] rounded-xl overflow-hidden">
//       <Map
//         {...viewState}
//         onMove={(evt) => setViewState(evt.viewState)}
//         mapStyle="mapbox://styles/mapbox/streets-v12"
//         mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
//         attributionControl={false}
//       >
//         <Marker latitude={latitude} longitude={longitude} anchor="bottom">
//           <div className="text-primary">
//             <MapPin size={24} fill="currentColor" />
//           </div>
//         </Marker>
//       </Map>

//       {/* Location Label */}
//       <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
//         <span className="text-sm font-medium text-gray-900">{location}</span>
//       </div>
//     </div>
//   )
// }

