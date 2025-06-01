
import { ChargingStation } from '@/hooks/useChargingStations';

export const sampleStations: Omit<ChargingStation, 'id' | 'created_at' | 'updated_at' | 'user_id'>[] = [
  {
    name: "Downtown Fast Charger",
    latitude: 37.7749,
    longitude: -122.4194,
    status: "Active",
    power_output: 150,
    connector_type: "CCS"
  },
  {
    name: "Mall Charging Hub",
    latitude: 37.7849,
    longitude: -122.4094,
    status: "Active",
    power_output: 50,
    connector_type: "Type 2"
  },
  {
    name: "Airport Supercharger",
    latitude: 37.7649,
    longitude: -122.4294,
    status: "Maintenance",
    power_output: 250,
    connector_type: "Tesla Supercharger"
  },
  {
    name: "Highway Rest Stop",
    latitude: 37.7549,
    longitude: -122.4394,
    status: "Active",
    power_output: 75,
    connector_type: "CHAdeMO"
  },
  {
    name: "Hotel Parking",
    latitude: 37.7949,
    longitude: -122.3994,
    status: "Inactive",
    power_output: 22,
    connector_type: "Type 2"
  },
  {
    name: "Business District Charger",
    latitude: 37.7889,
    longitude: -122.4154,
    status: "Active",
    power_output: 100,
    connector_type: "CCS"
  }
];
