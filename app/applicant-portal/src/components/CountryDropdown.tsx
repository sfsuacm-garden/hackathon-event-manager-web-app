"use client";
import React, { useCallback, useMemo, useState, forwardRef } from "react";

// shadcn
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";

// utils
import { cn } from "@/lib/shadcn/utils";

// assets
import { ChevronDown, Check as CheckIcon, Globe } from "lucide-react";
import { CircleFlag } from "react-circle-flags";

// data
import { countries } from "country-data-list";

export interface Country {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji?: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
}

type ValueKey = "alpha2" | "alpha3" | "name";

interface CountryDropdownProps {
  value?: string;
  onValueChange?: (value: string, country: Country) => void;
  valueKey?: ValueKey;
  options?: Country[];
  disabled?: boolean;
  placeholder?: string;
  slim?: boolean;
  className?: string;
}


const RAW_OPTIONS: Country[] = countries.all.filter(
  (c: Country) =>
    Boolean(c.emoji) &&
    c.status !== "deleted" &&
    Boolean(c.alpha2) &&
    c.alpha2.length === 2 &&
    Boolean(c.name)
);

function dedupeByAlpha2(list: Country[]) {
  const map = new Map<string, Country>();
  for (const c of list) {
    const k = c.alpha2.toUpperCase();
    if (!map.has(k)) map.set(k, c);
  }
  return Array.from(map.values());
}

const BASE_OPTIONS: Country[] = dedupeByAlpha2(RAW_OPTIONS);

const CountryDropdownComponent = (
  {
    value,
    onValueChange,
    valueKey = "alpha2",
    options = BASE_OPTIONS,
    disabled = false,
    placeholder = "Select a country",
    slim = false,
    className,
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false);

  
  const safeOptions = useMemo(() => {
    const cleaned = dedupeByAlpha2(
      (options || []).filter(
        (c) => Boolean(c) && Boolean(c.alpha2) && c.alpha2.length === 2 && Boolean(c.name)
      )
    );
    return cleaned.sort((a, b) => a.name.localeCompare(b.name));
  }, [options]);

  const selectedCountry = useMemo(() => {
    if (!value) return undefined;
    const target = String(value).toLowerCase();
    return safeOptions.find(
      (c) => String(c[valueKey] as string).toLowerCase() === target
    );
  }, [value, valueKey, safeOptions]);

  const handleSelect = useCallback(
    (country: Country) => {
      const nextValue = (country[valueKey] as string) ?? "";
      onValueChange?.(nextValue, country);
      setOpen(false);
    },
    [onValueChange, valueKey]
  );

  const triggerClasses = cn(
    "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    slim === true && "w-20",
    className
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={ref}
          type="button"
          className={triggerClasses}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          {selectedCountry ? (
            <div className="flex items-center flex-grow w-0 gap-2 overflow-hidden">
              <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
                <CircleFlag
                  countryCode={selectedCountry.alpha2.toLowerCase()}
                  height={20}
                />
              </div>
              {slim === false && (
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {selectedCountry.name}
                </span>
              )}
            </div>
          ) : (
            <span>{slim === false ? placeholder : <Globe size={20} />}</span>
          )}
          <ChevronDown size={16} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="min-w-[--radix-popper-anchor-width] p-0"
      >
        <Command className="w-full max-h-[200px] sm:max-h-[270px]">
          <div className="sticky top-0 z-10 bg-popover">
            <CommandInput placeholder="Search country..." />
          </div>
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {safeOptions.map((option) => {
                const isSelected =
                  selectedCountry &&
                  (option[valueKey] as string) ===
                    (selectedCountry[valueKey] as string);

                // I use alpha2 for the React key (unique & stable).
                // If alpha2 is somehow missing, I fall back to name (rare).
                const reactKey = option.alpha2 || option.name;

                return (
                  <CommandItem
                    key={reactKey}
                    className="flex items-center w-full gap-2"
                    onSelect={() => handleSelect(option)}
                  >
                    <div className="flex flex-grow w-0 space-x-2 overflow-hidden">
                      <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
                        <CircleFlag
                          countryCode={option.alpha2.toLowerCase()}
                          height={20}
                        />
                      </div>
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {option.name}
                      </span>
                    </div>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4 shrink-0",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

CountryDropdownComponent.displayName = "CountryDropdown";
export const CountryDropdown = forwardRef(CountryDropdownComponent);
