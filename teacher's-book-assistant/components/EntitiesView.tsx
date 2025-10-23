
import React from 'react';
import { type Entity } from '../types';
import { UserIcon } from './icons/UserIcon';
import { MapPinIcon } from './icons/MapPinIcon';

interface EntitiesViewProps {
  items: Entity[];
}

const EntitiesView: React.FC<EntitiesViewProps> = ({ items }) => {
  const persons = items.filter(item => item.type === 'PERSON');
  const locations = items.filter(item => item.type === 'LOCATION');

  return (
    <div>
      <h3 className="text-xl font-bold text-slate-700 mb-6">Герои и места действия</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-600 mb-4 pb-2 border-b-2 border-slate-200">
            <UserIcon className="w-6 h-6 text-blue-600" />
            Персонажи
          </h4>
          <div className="space-y-4">
            {persons.map((person) => (
              <div key={person.name}>
                <p className="font-semibold text-slate-800">{person.name}</p>
                <p className="text-slate-500 text-sm">{person.description}</p>
              </div>
            ))}
             {persons.length === 0 && <p className="text-slate-500">Персонажи не найдены.</p>}
          </div>
        </div>
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-600 mb-4 pb-2 border-b-2 border-slate-200">
            <MapPinIcon className="w-6 h-6 text-green-600" />
            Места
          </h4>
          <div className="space-y-4">
            {locations.map((location) => (
              <div key={location.name}>
                <p className="font-semibold text-slate-800">{location.name}</p>
                <p className="text-slate-500 text-sm">{location.description}</p>
              </div>
            ))}
            {locations.length === 0 && <p className="text-slate-500">Места не найдены.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntitiesView;
