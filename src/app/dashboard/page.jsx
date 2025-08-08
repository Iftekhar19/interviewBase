"use client";

import FilterDesk from "@/components/FilterDesk";
import FilterMob from "@/components/FilterMob";
import FilterSkeleton from "@/components/FilterSkeleton";
import Loader from "@/components/Loader";
import NoData from "@/components/Nodata";
import TableSkeleton from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import QuestionViewModal from "@/components/ViewModal";
import axios from "axios";
import {
  Atom,
  BookOpen,
  Braces,
  BrainCircuit,
  Building2,
  DatabaseZap,
  Eye,
  GemIcon,
  ServerCog,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const levelColorObject = {
  easy: "text-green-500",
  medium: "text-orange-300",
  hard: "text-red-700",
};
const iconObject = {
  javascript: <Braces className="w-4 h-4 text-yellow-500" />, // JavaScript icon
  nodejs: <ServerCog className="w-4 h-4 text-green-600" />, // Node.js icon
  reactjs: <Atom className="w-4 h-4 text-sky-500" />, // React icon
  dsa: <BrainCircuit className="w-4 h-4 text-indigo-500" />, // DSA icon
  sql: <DatabaseZap className="w-4 h-4 text-pink-600" />, // SQL icon
};
const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [topic, setTopic] = useState(searchParams.get("topic"));
  const [level, setLevel] = useState("");
  const [company, setCompany] = useState("");
  const [forWhom, setForWhom] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [modalData, setModalData] = useState(null);
  const [totalPages, setTotalPages] = useState(Math.ceil(100 / rowsPerPage));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState({
    isFirst: true,
    load: true,
  });

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("level");
    params.delete("for");
    params.delete("company");
    router.replace(`/dashboard?${params.toString()}`);
  }, []);
  useEffect(() => {
    if (topic !== searchParams.get("topic")) {
      setTopic(searchParams.get("topic"));
    }
  }, [searchParams.get("topic")]);
  useEffect(() => {
    (async () => {
      try {
        setLoading((old) => {
          return {
            ...old,
            load: true,
            isFirst: old.isFirst ? true : false,
          };
        });
        const res = await axios.get(
          `/api/questions/getquestions?topic=${topic}&page=${currentPage}&pageSize=${rowsPerPage}&level=${
            level || ""
          }&for=${forWhom || ""}&company=${company || ""}`
        );
        console.log(res.data);
        const { totalPages: tP, questions, total } = res.data.message;
        setTotalPages(tP);
        setData(questions);
      } catch (error) {
        console.log(error);
        console.log(error?.response?.data || "Unexpected error from server");
      } finally {
        setLoading({
          isFirst: false,
          load: false,
        });
      }
    })();
  }, [topic, rowsPerPage, currentPage, level, company, forWhom]);
  return (
    <div className="w-full ">
      {loading.isFirst ? (
        <>
          <FilterSkeleton />
        </>
      ) :  (
        <div className="flex items-center justify-between bg-[#ffffffaf] p-2 shadow-sm rounded-sm ">
          <h1 className="text-md font-semibold  capitalize">{topic}</h1>
          <div className="md:hidden  block">
            <FilterMob
              setCompany={setCompany}
              setLevel={setLevel}
              setForWhom={setForWhom}
            />
          </div>
          {/* Filter bar */}
          <div className="hidden md:block">
            <FilterDesk
              setCompany={setCompany}
              setLevel={setLevel}
              setForWhom={setForWhom}
            />
          </div>
        </div>
      )}
      {loading.load ? (
        <>
          <TableSkeleton />
        </>
      ) : (
        <div className=" h-full pt-2">
           {
            (loading.load==false && data.length==0) ? <NoData/>:
         
          <Card className="overflow-x-auto rounded-lg shadow-sm bg-[#ffffff63]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Title</TableHead>
                  <TableHead className="min-w-[150px]">Company</TableHead>
                  <TableHead className="min-w-[120px]">Subject</TableHead>
                  <TableHead className="min-w-[100px]">Experience</TableHead>
                  <TableHead className="min-w-[80px]">Level</TableHead>
                  <TableHead className="min-w-[250px]">Description</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
             <TableBody>
                {data.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      {item.title.charAt(0).toUpperCase() +
                        item.title.slice(1, 50)}
                      {item.title.length > 50 && "..."}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="capitalize">{item.askedIn}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {iconObject[item.subject.toLowerCase()] || (
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className="capitalize">{item.subject}</span>
                      </div>
                    </TableCell>
                    <TableCell className={"capitalize"}>{item.for}</TableCell>
                    <TableCell
                      className={`${
                        levelColorObject[item?.level?.toLowerCase()]
                      } capitalize`}
                    >
                      {item.level}
                    </TableCell>
                    <TableCell>{item.description || "NA"}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(item)}
                        className={"cursor-pointer"}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant=""
                        className={"cursor-pointer "}
                        size="sm"
                      >
                        <GemIcon className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          }

       { (loading.load==false && data.length!=0) &&<> 
       <div className="flex flex-wrap justify-between items-center mt-3 gap-4 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Rows per page:</span>
              <Select
                value={rowsPerPage.toString()}
                onValueChange={(val) => {
                  setRowsPerPage(Number(val));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[100px] cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[20, 40, 60, 80, 100].map((val) => (
                    <SelectItem key={val} value={val.toString()}>
                      {val}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="ml-auto">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={handlePrevious}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={handleNext}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>

          <QuestionViewModal
            data={modalData}
            open={isModalOpen}
            onClose={closeModal}
          /></>}
        </div>
      )}
    </div>
  );
};

export default page;
