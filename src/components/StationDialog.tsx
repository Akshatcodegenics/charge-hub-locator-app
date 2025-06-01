
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChargingStation } from '@/hooks/useChargingStations';

interface StationDialogProps {
  trigger: React.ReactNode;
  station?: ChargingStation;
  onSave: (data: Omit<ChargingStation, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => Promise<void>;
}

const StationDialog: React.FC<StationDialogProps> = ({ trigger, station, onSave }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    latitude: 0,
    longitude: 0,
    status: 'Active' as 'Active' | 'Inactive' | 'Maintenance',
    power_output: 0,
    connector_type: ''
  });

  useEffect(() => {
    if (station) {
      setFormData({
        name: station.name,
        latitude: station.latitude,
        longitude: station.longitude,
        status: station.status,
        power_output: station.power_output,
        connector_type: station.connector_type
      });
    } else {
      setFormData({
        name: '',
        latitude: 0,
        longitude: 0,
        status: 'Active',
        power_output: 0,
        connector_type: ''
      });
    }
  }, [station, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{station ? 'Edit' : 'Add'} Charging Station</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData(prev => ({ ...prev, latitude: parseFloat(e.target.value) }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData(prev => ({ ...prev, longitude: parseFloat(e.target.value) }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: 'Active' | 'Inactive' | 'Maintenance') => 
              setFormData(prev => ({ ...prev, status: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="power_output">Power Output (kW)</Label>
            <Input
              id="power_output"
              type="number"
              value={formData.power_output}
              onChange={(e) => setFormData(prev => ({ ...prev, power_output: parseInt(e.target.value) }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="connector_type">Connector Type</Label>
            <Select value={formData.connector_type} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, connector_type: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select connector type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tesla Supercharger">Tesla Supercharger</SelectItem>
                <SelectItem value="CCS">CCS</SelectItem>
                <SelectItem value="CHAdeMO">CHAdeMO</SelectItem>
                <SelectItem value="Type 2">Type 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {station ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StationDialog;
