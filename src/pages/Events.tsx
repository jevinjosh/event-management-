import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useEvent } from '../context/EventContext';
import { mockCategories } from '../data/mockData';
import { EventFilters } from '../types';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon as StarIconSolid,
  XMarkIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const Events: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { events, getEventWithAvailability } = useEvent();
  const [filters, setFilters] = useState<EventFilters>({
    category: searchParams.get('category') || undefined,
    search: searchParams.get('search') || undefined,
    minPrice: undefined,
    maxPrice: undefined,
    date: undefined,
    sortBy: 'date',
    sortOrder: 'asc'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get events with availability for display
  const eventsWithAvailability = events.map(event => ({
    ...event,
    availableSlots: getEventWithAvailability(event.id)?.availableSlots || 0
  }));

  useEffect(() => {
    const newParams = new URLSearchParams();
    if (filters.category) newParams.set('category', filters.category);
    if (filters.search) newParams.set('search', filters.search);
    if (filters.minPrice) newParams.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) newParams.set('maxPrice', filters.maxPrice.toString());
    if (filters.date) newParams.set('date', filters.date);
    setSearchParams(newParams);
  }, [filters, setSearchParams]);

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = eventsWithAvailability.filter(event => {
      if (filters.category && event.category !== filters.category) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.location.toLowerCase().includes(searchLower)
        );
      }
      if (filters.minPrice && event.price < filters.minPrice) return false;
      if (filters.maxPrice && event.price > filters.maxPrice) return false;
      if (filters.date && event.date !== filters.date) return false;
      return true;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
      }
      
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [eventsWithAvailability, filters]);

  const handleFilterChange = (newFilters: Partial<EventFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      category: undefined,
      search: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      date: undefined,
      sortBy: 'date',
      sortOrder: 'asc'
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== undefined && value !== 'date' && value !== 'asc'
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Events
          </h1>
          <p className="text-lg text-gray-600">
            Find and book the perfect event for any occasion
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by name, location, or description..."
                className="input-field pl-10"
                value={filters.search || ''}
                onChange={(e) => handleFilterChange({ search: e.target.value })}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors relative"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="border-t pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    className="input-field"
                    value={filters.category || ''}
                    onChange={(e) => handleFilterChange({ 
                      category: e.target.value || undefined 
                    })}
                  >
                    <option value="">All Categories</option>
                    {mockCategories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    placeholder="Min price"
                    className="input-field"
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange({ 
                      minPrice: e.target.value ? Number(e.target.value) : undefined 
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    placeholder="Max price"
                    className="input-field"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange({ 
                      maxPrice: e.target.value ? Number(e.target.value) : undefined 
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={filters.date || ''}
                    onChange={(e) => handleFilterChange({ 
                      date: e.target.value || undefined 
                    })}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex gap-4 flex-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <select
                      className="input-field"
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange({ 
                        sortBy: e.target.value as 'price' | 'date' | 'rating' 
                      })}
                    >
                      <option value="date">Date</option>
                      <option value="price">Price</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order
                    </label>
                    <select
                      className="input-field"
                      value={filters.sortOrder}
                      onChange={(e) => handleFilterChange({ 
                        sortOrder: e.target.value as 'asc' | 'desc' 
                      })}
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="flex items-center justify-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors self-end"
                >
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedEvents.length} of {events.length} events
          </p>
        </div>

        {/* Events Grid */}
        {filteredAndSortedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedEvents.map((event) => (
              <div key={event.id} className="card group cursor-pointer transform transition-all duration-300 hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="text-sm font-semibold text-primary-600">{event.category}</span>
                  </div>
                  {event.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full shadow-md">
                      <span className="text-xs font-bold">FEATURED</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(event.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{event.rating}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon className="h-4 w-4 mr-2 text-primary-600" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPinIcon className="h-4 w-4 mr-2 text-primary-600" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <UserGroupIcon className="h-4 w-4 mr-2 text-primary-600" />
                      {event.availableSlots} slots available
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                      ₹{event.price.toLocaleString()}
                    </span>
                    <Link
                      to={`/events/${event.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <MagnifyingGlassIcon className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
