"use client";

import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
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
  Pencil,
  ServerCog,
  Trash2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

const dummyData = Array.from({ length: 120 }, (_, i) => ({
  title: `Question Title ${i + 1}`,
  askedIn: "Google",
  subject: "javascript",
  for: "1-3 years",
  level: "Medium",
  description:
    i % 3 === 0 ? null : `This is a description for question ${i + 1}`,
}));

export default function TopicQuestionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic") || "All Topics";

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [modalData, setModalData] = useState(null);
  const [totalPages,setTotalPages]=useState(Math.ceil(100 / rowsPerPage))
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState(dummyData);
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState(null);
  const [deleteLoading,setDeleteLoading]=useState(false)
  const [data, setData] = useState([]);
  const [deleteToggle,setDeleteToggle]=useState(false);
  const [loading,setLoading]=useState(true)

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

  const handleDeleteConfirm = async() => {
    if (confirmDeleteIdx !== null) {
      setDeleteLoading(true)
      try {
      const res=  await axios.delete(`/api/questions/deletequestion?subject=${topic}&id=${confirmDeleteIdx}`)
        console.log(res.data)
        setDeleteToggle(!deleteToggle)
      } catch (error) {
        console.log(error?.response?.data?.message)
      }
      finally{
         setDeleteLoading(false)
        setConfirmDeleteIdx(null);
      }
    }
  };

  useEffect(() => {
  (  async () => {
      try {
        setLoading(true)
        const res = await axios.get(
          `/api/questions/getquestionsbyuser?topic=${topic}&page=${currentPage}&pageSize=${rowsPerPage}`
        );
        const {totalPages:tP,questions,total}=res.data.message
        setTotalPages(tP)
        setData(questions)
      } catch (error) {
       console.log(error?.response?.data||"Unexpected error from server") 
      }
      finally{
        setLoading(false)
      }
    })()
  }, [topic, rowsPerPage, currentPage,deleteToggle]);

  return (
    <div className="h-full w-full  p-2 sm:p-4">
      <h1 className="text-xl font-bold capitalize text-black mb-4">
        {topic} Questions
      </h1>

   { loading?<><TableSkeleton/></>: !loading && data.length>0?<> 
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
                <TableCell className={''}>{item.title}</TableCell>
                <TableCell className="capitalize">
                  <div className="flex items-center gap-2 capitalize">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span style={{textTransform:"capitalize"}}>{item.askedIn}</span>
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
                <TableCell>{item.for}</TableCell>
                <TableCell
                  className={`${levelColorObject[item?.level?.toLowerCase()]} capitalize`}
                >
                  {item.level}
                </TableCell>
                <TableCell className={'capitalize'}>{item.description || "NA"}</TableCell>
                <TableCell className="flex justify-end gap-2 ">
                  <Button
                    variant="outline"
                    className={"cursor-pointer"}
                    size="sm"
                    onClick={() => router.push(`/user/editquestion/${item._id}`)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
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
                    className={"cursor-pointer bg-red-700"}
                    size="sm"
                    onClick={() => {setConfirmDeleteIdx(item._id)}}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

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
      />

    
      <DeleteConfirmDialog
        confirmDeleteIdx={confirmDeleteIdx}
        handleDeleteConfirm={handleDeleteConfirm}
        setConfirmDeleteIdx={setConfirmDeleteIdx}
        deleteLoading={deleteLoading}
      /></>:<NoData/>}
    </div>
  );
}
