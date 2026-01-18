"use client";

import { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format, parse } from "date-fns";

interface SimpleDateTimePickerProps {
  label?: string;            // <-- optional label
  defaultValue?: Date;
  onChange: (value: Date) => void;
}

export function DateTimePicker({ label, defaultValue, onChange }: SimpleDateTimePickerProps) {
  const [date, setDate] = useState<Date>(defaultValue ?? new Date());
  const [time, setTime] = useState(format(date, "HH:mm"));
  const [inputValue, setInputValue] = useState(format(date, "yyyy-MM-dd HH:mm"));

  useEffect(() => {
    setInputValue(format(date, "yyyy-MM-dd HH:mm"));
  }, [date]);

  const handleInputChange = (val: string) => {
    setInputValue(val);
    const parsed = parse(val, "yyyy-MM-dd HH:mm", new Date());
    if (!isNaN(parsed.getTime())) {
      setDate(parsed);
      setTime(format(parsed, "HH:mm"));
      onChange(parsed);
    }
  };

  const handleCalendarSelect = (d: Date | undefined) => {
    if (!d) return; // ignore undefined
    const [h, m] = time.split(":").map(Number);
    d.setHours(h);
    d.setMinutes(m);
    setDate(d);
    setInputValue(format(d, "yyyy-MM-dd HH:mm"));
    onChange(d);
  };

  const handleTimeChange = (t: string) => {
    setTime(t);
    const [h, m] = t.split(":").map(Number);
    const updated = new Date(date);
    updated.setHours(h);
    updated.setMinutes(m);
    setDate(updated);
    setInputValue(format(updated, "yyyy-MM-dd HH:mm"));
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <Label>{label}</Label>}

      <Popover>
        <PopoverTrigger asChild>
          <Input
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="yyyy-MM-dd HH:mm"
          />
        </PopoverTrigger>

        <PopoverContent className="p-4 space-y-3 w-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleCalendarSelect}
            required={false}
          />
          <Input
            type="time"
            value={time}
            onChange={(e) => handleTimeChange(e.target.value)}
          />
          <Button onClick={() => setInputValue(format(date, "yyyy-MM-dd HH:mm"))}>
            Set
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
