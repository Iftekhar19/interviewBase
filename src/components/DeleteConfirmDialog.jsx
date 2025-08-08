import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

const DeleteConfirmDialog = ({setConfirmDeleteIdx,confirmDeleteIdx,handleDeleteConfirm,deleteLoading}) => {
  return (
     <Dialog
        open={confirmDeleteIdx !== null}
        onOpenChange={() => setConfirmDeleteIdx(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this question? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className={"cursor-pointer"}
              onClick={() => setConfirmDeleteIdx(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className={"cursor-pointer"}
              onClick={handleDeleteConfirm}
              disabled={deleteLoading}
            >
            {deleteLoading?<><Loader2 className='h-8 w-8 animate-spin text-white'/>Deleting</>:"Delete"}  
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default DeleteConfirmDialog