"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { CompanyList } from "@/data/CompanyList";

const FilterMob = ({ setLevel, setCompany: setCom, setForWhom: setFor }) => {
  const [difficulty, setDifficulty] = useState("");
  const [forWhom, setforWhom] = useState("");
  const [company, setCompany] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (difficulty) {
      params.set("level", difficulty);
      setLevel(difficulty);
    } else {
      params.delete("level");
      setLevel("");
    }

    if (forWhom) {
      params.set("for", forWhom);
      setFor(forWhom);
    } else {
      params.delete("for");
      setFor("");
    }

    if (company) {
      params.set("company", company);
      setCom(company);
    } else {
      params.delete("company");
      setCom("");
    }

    router.replace(`/dashboard?${params.toString()}`);
  };

  const resetFilter = async () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("level");
    params.delete("for");
    params.delete("company");
    await Promise.all([
      setCom(""),
      setLevel(""),
      setFor(""),
      setCompany(""),
      setDifficulty(""),
      setforWhom(""),
    ]);
    router.replace(`/dashboard?${params.toString()}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700"
        >
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700">
        <div className="flex flex-col gap-4 w-full">
          {/* Company Dropdown */}
          <div className="w-full sm:w-50">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Company
            </label>
            <Select value={company} onValueChange={setCompany}>
              <SelectTrigger className="w-full cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                {CompanyList.map(({ name }, idx) => (
                  <SelectItem
                    key={name + idx}
                    value={name.toLowerCase()}
                    className="capitalize"
                  >
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty */}
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Difficulty
            </label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                <SelectItem value="easy" className="text-green-600 dark:text-green-400">
                  Easy
                </SelectItem>
                <SelectItem value="medium" className="text-orange-500 dark:text-orange-400">
                  Medium
                </SelectItem>
                <SelectItem value="hard" className="text-red-600 dark:text-red-400">
                  Hard
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* For */}
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              For
            </label>
            <Select value={forWhom} onValueChange={setforWhom}>
              <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                <SelectValue placeholder="Select For" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                <SelectItem value="fresher">Fresher</SelectItem>
                <SelectItem value="1-3 years">1-3 Years</SelectItem>
                <SelectItem value="3+ years">3+ Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <Button
              className="cursor-pointer text-white"
              variant="destructive"
              onClick={resetFilter}
            >
              Reset
            </Button>
            <Button
              className="cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
              onClick={applyFilters}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterMob;
