import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Currency } from "../types/currency.type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import { Input } from "../components/ui/input";

const FormSchema = z.object({
  amount: z.number({
    message: "Please input amount in number.",
    required_error: "Please input amount.",
  }),
  from: z.string({
    required_error: "Please select currency.",
  }),
  to: z.string({
    required_error: "Please select currency.",
  }),
});

export function CurrencySwap() {
  const [listCurrency, setListCurrency] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: Currency, b: Currency) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        const filtered = sorted.filter(
          (item: Currency, index: number, self: Currency[]) => {
            return (
              index === self.findIndex((t) => t.currency === item.currency)
            );
          }
        );
        setListCurrency(filtered);
      });
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>From</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? listCurrency.find(
                              (item) => item.currency === field.value
                            )?.currency
                          : "Please select currency"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No result available</CommandEmpty>
                        <CommandGroup>
                          {listCurrency.map((item) => (
                            <CommandItem
                              value={item.currency}
                              key={item.currency}
                              onSelect={() => {
                                form.setValue("from", item.currency);
                              }}
                            >
                              {item.currency}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  item.currency === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>To</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? listCurrency.find(
                              (item) => item.currency === field.value
                            )?.currency
                          : "Please select currency"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No result available</CommandEmpty>
                        <CommandGroup>
                          {listCurrency.map((item) => (
                            <CommandItem
                              value={item.currency}
                              key={item.currency}
                              onSelect={() => {
                                form.setValue("to", item.currency);
                              }}
                            >
                              {item.currency}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  item.currency === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
