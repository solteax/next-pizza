import React, { useRef } from 'react';
import { useDebounce, useClickAway } from 'react-use';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { useLocale } from 'next-intl';

interface Props {
  onChange?: (address: string, coords: { lat: number; lng: number }) => void;
  value?: string;
}

export const AddressInput: React.FC<Props> = ({ onChange, value = '' }) => {
  const [inputValue, setInputValue] = React.useState(value);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  useClickAway(containerRef, () => {
    setIsDropdownOpen(false);
  });

  useDebounce(
    () => {
      if (inputValue.trim().length < 3) {
        setIsDropdownOpen(false);
      } else {
        setIsDropdownOpen(true);
      }
    },
    300,
    [inputValue]
  );

  const handleSelect = async (address: string) => {
    try {
      const results = await geocodeByAddress(address);
      const coords = await getLatLng(results[0]);
      setInputValue(address); // Set the input value to the selected address
      onChange?.(address, coords);
    } catch (error) {
      console.error('Error selecting address:', error);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <PlacesAutocomplete
        value={inputValue}
        onChange={setInputValue}
        onSelect={handleSelect}
        searchOptions={{
          types: ['address'],
          language: locale === 'ua' ? 'uk' : locale,
        } as any}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <>
            <input
              {...getInputProps({
                placeholder: 'Enter an address',
                className: 'flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 text-md',
                onFocus: () => {
                  if (suggestions.length > 0) setIsDropdownOpen(true);
                },
              })}
            />
            {isDropdownOpen && suggestions.length > 0 && (
              <ul
                className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto z-10 p-2"
              >
                {/* Disabling key issue since it's already handled by getSuggestionItemProps */}
                {/* eslint-disable react/jsx-key */}
                {suggestions.map((suggestion, index) => (
                  <li
                    {...getSuggestionItemProps(suggestion, {
                      key: suggestion.placeId || index,
                      className: 'px-3 py-2 text-sm cursor-pointer hover:bg-gray-100',
                    })}
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </PlacesAutocomplete>
    </div>
  );
};