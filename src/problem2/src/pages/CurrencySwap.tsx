import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { ArrowRightLeft, Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import { Input } from "../components/ui/input";
import { formatNumber } from "../utils/formatNumber";
import Icon from "../components/Icon";

const FormSchema = z.object({
  amount: z.coerce.number({ message: "Please enter valid number." }).min(0.01, {
    message: "Please enter number greater than 0.01",
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
  const [isSubmited, setIsSubmited] = useState(false);
  const [result, setResult] = useState<number>(0);

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
    const from = listCurrency.find((item) => item.currency === data.from);
    const to = listCurrency.find((item) => item.currency === data.to);
    const amount = data.amount;
    if (!from || !to) return;

    console.log("from", from);
    console.log("to", to);
    const result = (amount * from.price) / to.price;

    setResult(result);
    setIsSubmited(true);
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:flex sm:flex md:flex-row sm:flex-col"
        >
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="mr-16 mb-8  md:w-[100%] sm:w-[100%]">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    className="h-[35px]"
                    placeholder="Please enter amount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="flex flex-col mr-2">
                <FormLabel className="mb-[9px]">From</FormLabel>
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
                        <Icon name={field.value} />
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
          <ArrowRightLeft
            className="mx-8 my-4 cursor-pointer md:w-[56px] md:h-[56px] sm:w-[24px] sm:h-[24px]"
            onClick={() => {
              const from = form.getValues("from");
              const to = form.getValues("to");
              form.setValue("from", to);
              form.setValue("to", from);
            }}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="flex flex-col mr-8">
                <FormLabel className="mb-[9px]">To</FormLabel>
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
                        <Icon name={field.value} />
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
          <Button className="mt-[32px] h-[35px]" type="submit">
            Convert
          </Button>
        </form>
      </Form>
      {isSubmited && (
        <div className="mt-4">
          <div>
            {formatNumber(form.getValues("amount"))} {form.getValues("from")} =
          </div>
          <div className="text-2xl font-bold">
            {result >= 1000 ? formatNumber(result) : result}{" "}
            {form.getValues("to")}
          </div>
        </div>
      )}
    </div>
  );
}
