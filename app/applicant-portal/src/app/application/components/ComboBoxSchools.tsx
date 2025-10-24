'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/shadcn/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/ui/popover';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/shadcn/utils';
import { trpc } from '@/utils/trpc';

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import * as React from 'react';
import { OTHER_OPTION } from '../schemas';

//TODO refer and use the type from the school endpoint.
interface School {
  id: string;
  name: string;
  countryCode: string;
  stateProvince?: string | null;
}

export function SchoolCombobox({
  defaultSelectedSchool,
  onValueChange,
  placeholder,
  isDefaultLoading
}: {
  defaultSelectedSchool?: string;
  onValueChange: (value: string, school: School) => void;
  placeholder?: string;
  isDefaultLoading: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [selectedSchoolId, setSelectedSchoolId] = React.useState(defaultSelectedSchool);

  // Fetch schools matching search
  const { data: searchResults = [], isLoading } = trpc.schools.getByQuery.useQuery(
    {
      where: {
        name: {
          contains: debouncedSearch,
          mode: 'insensitive'
        }
      },
      take: 20,
      orderBy: { name: 'asc' }
    },
    { enabled: debouncedSearch.length >= 2 }
  );

  // Fetch selected school info
  const { data: selectedSchool, isLoading: isSelectedSchoolLoading } =
    trpc.schools.getById.useQuery(
      { id: selectedSchoolId! },
      {
        enabled: Boolean(selectedSchoolId) && selectedSchoolId !== OTHER_OPTION
      }
    );

  // Fetch default school info
  const { data: defaultSchool, isLoading: isDefaultSchoolLoading } = trpc.schools.getById.useQuery(
    { id: defaultSelectedSchool! },
    {
      enabled: Boolean(defaultSelectedSchool) && defaultSelectedSchool !== OTHER_OPTION
    }
  );

  // Combine default school and selected school, ensure neither is loading
  const combinedSchool = React.useMemo(() => {
    if (
      !isDefaultSchoolLoading &&
      !isSelectedSchoolLoading &&
      defaultSchool &&
      selectedSchool &&
      selectedSchool.id !== defaultSchool.id
    ) {
      // If both exist and are different, prefer selectedSchool
      return selectedSchool;
    }
    if (!isDefaultSchoolLoading && defaultSchool) {
      return defaultSchool;
    }
    if (!isSelectedSchoolLoading && selectedSchool) {
      return selectedSchool;
    }
    return null;
  }, [defaultSchool, selectedSchool, isDefaultSchoolLoading, isSelectedSchoolLoading]);

  // Combine selected school with search results and add "Other" option
  const schools = React.useMemo(() => {
    const results = [...searchResults];

    // Add combined school if it's not already in the results
    if (combinedSchool && !results.some((s) => s.id === combinedSchool.id)) {
      results.unshift(combinedSchool);
    }

    return results;
  }, [searchResults, combinedSchool]);

  // Sync external value prop with local state
  React.useEffect(() => {
    if (defaultSelectedSchool !== undefined) {
      setSelectedSchoolId(defaultSelectedSchool);
    }
  }, [defaultSelectedSchool]);

  // Display name for the button
  const displayName = React.useMemo(() => {
    if (selectedSchoolId === 'Other') {
      return 'Other';
    }
    if (selectedSchoolId && combinedSchool) {
      return combinedSchool.name;
    }
    return placeholder || 'Select a school...';
  }, [selectedSchoolId, combinedSchool, placeholder]);

  const isAnyLoading = isDefaultLoading || isDefaultSchoolLoading || isSelectedSchoolLoading;

  return (
    <Popover open={open} onOpenChange={isAnyLoading ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={isAnyLoading}
        >
          {!isAnyLoading ? (
            displayName
          ) : (
            <span className="flex items-center justify-center w-full">
              <Spinner />
            </span>
          )}

          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search schools..."
            value={search}
            onValueChange={isAnyLoading ? undefined : setSearch}
            disabled={isAnyLoading}
          />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>
                <div className="flex justify-center items-center py-4">
                  <Spinner />
                </div>
              </CommandEmpty>
            ) : debouncedSearch.length < 2 ? (
              <CommandEmpty>Start searching</CommandEmpty>
            ) : (
              <CommandGroup>
                {schools
                  .filter((school: School) => selectedSchoolId !== school.id)
                  .map((school: School) => (
                    <CommandItem
                      key={school.id}
                      value={school.id}
                      onSelect={
                        isAnyLoading
                          ? undefined
                          : () => {
                              setSelectedSchoolId(school.id);
                              onValueChange(school.id, school);
                              setOpen(false);
                              setSearch('');
                            }
                      }
                      disabled={isAnyLoading}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedSchoolId === school.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{school.name}</span>
                        {school.stateProvince && (
                          <span className="text-xs text-muted-foreground">
                            {school.stateProvince}, {school.countryCode}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}

                {/* "Other" option at the bottom */}
                {selectedSchoolId !== OTHER_OPTION && (
                  <CommandItem
                    key="Other"
                    value={OTHER_OPTION}
                    onSelect={
                      isAnyLoading
                        ? undefined
                        : () => {
                            setSelectedSchoolId('Other');
                            onValueChange('Other', {
                              id: '',
                              name: 'Other',
                              countryCode: '',
                              stateProvince: null
                            });
                            setOpen(false);
                            setSearch('');
                          }
                    }
                    disabled={isAnyLoading}
                  >
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedSchoolId === 'Other' ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <span className="font-medium italic text-muted-foreground">Other</span>
                  </CommandItem>
                )}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
