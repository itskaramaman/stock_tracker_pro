"use client";

import { useMemo, useState } from "react";
import countryList from "react-select-country-list";
import { Label } from "../ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller } from "react-hook-form";

const CountrySelectField = ({
  name,
  label,
  control,
  error,
  required = false,
}: CountrySelectProps) => {
  const options: { value: string; label: string }[] = useMemo(
    () => countryList().getData(),
    []
  );

  const [open, setOpen] = useState(false);

  return (
    <>
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selected = options.find((opt) => opt.value === field.value);
          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger className="form-input">
                {selected ? `🌍 ${selected.label}` : `Select a country`}
              </PopoverTrigger>

              <PopoverContent>
                <Command>
                  <CommandInput
                    required={required}
                    placeholder="Search your country..."
                  />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      {options.map((option) => (
                        <CommandItem
                          key={option.label}
                          value={option.value}
                          className={
                            field.value === option.value ? "bg-accent" : ""
                          }
                          onSelect={() => {
                            field.onChange(option.value);
                            setOpen(false);
                          }}
                        >
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          );
        }}
      />

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </>
  );
};

export default CountrySelectField;
