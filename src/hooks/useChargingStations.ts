
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ChargingStation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: 'Active' | 'Inactive' | 'Maintenance';
  power_output: number;
  connector_type: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
}

export const useChargingStations = () => {
  const [stations, setStations] = useState<ChargingStation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchStations = async () => {
    try {
      const { data, error } = await supabase
        .from('charging_stations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStations(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch charging stations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createStation = async (station: Omit<ChargingStation, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('charging_stations')
        .insert([{
          ...station,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      setStations(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Charging station created successfully"
      });
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create charging station",
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const updateStation = async (id: string, updates: Partial<ChargingStation>) => {
    try {
      const { data, error } = await supabase
        .from('charging_stations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setStations(prev => prev.map(station => 
        station.id === id ? { ...station, ...data } : station
      ));
      toast({
        title: "Success",
        description: "Charging station updated successfully"
      });
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update charging station",
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const deleteStation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('charging_stations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setStations(prev => prev.filter(station => station.id !== id));
      toast({
        title: "Success",
        description: "Charging station deleted successfully"
      });
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete charging station",
        variant: "destructive"
      });
      return { error };
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return {
    stations,
    loading,
    createStation,
    updateStation,
    deleteStation,
    refetch: fetchStations
  };
};
