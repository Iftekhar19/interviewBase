"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CompanyList } from "@/data/CompanyList";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const FilterDesk = ({ setLevel, setCompany: setCom, setForWhom: setFor }) => {
  const [difficulty, setDifficulty] = useState("");
  const [forWhom, setForWhom] = useState("");
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
      setForWhom(""),
    ]);
    router.push(`/dashboard?${params.toString()}`);
  };

  useEffect(() => {
    (async () => {
      await Promise.all([
        setCom(""),
        setLevel(""),
        setFor(""),
        setCompany(""),
        setDifficulty(""),
        setForWhom(""),
      ]);
    })();
  }, [searchParams.get("topic")]);

  return (
    <div className="flex flex-row items-center justify-end gap-4 bg-transparent">
      {/* Company Dropdown */}
      <div className="w-full sm:w-50">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          Company
        </label>
        <Select value={company} onValueChange={setCompany}>
          <SelectTrigger className="w-full cursor-pointer border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
            <SelectValue placeholder="Select Company" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
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

      {/* Difficulty Level Dropdown */}
      <div className="w-full sm:w-50">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          Difficulty
        </label>
        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger className="w-full cursor-pointer border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
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

      {/* For Dropdown */}
      <div className="w-full sm:w-50">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          For
        </label>
        <Select value={forWhom} onValueChange={setForWhom}>
          <SelectTrigger className="w-full cursor-pointer border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
            <SelectValue placeholder="Select For" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
            <SelectItem value="fresher">Fresher</SelectItem>
            <SelectItem value="1-3 years">1-3 Years</SelectItem>
            <SelectItem value="3+ years">3+ Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Buttons */}
      <Button
        className="cursor-pointer bg-indigo-600 text-white self-end"
        onClick={applyFilters}
      >
        Apply
      </Button>
      <Button
        className="cursor-pointer border self-end bg-red-700 text-white hover:bg-white hover:text-red-700 hover:border hover:border-red-700 dark:hover:bg-gray-900"
        onClick={resetFilter}
      >
        Reset
      </Button>
    </div>
  );
};

export default FilterDesk;
