import { api } from "@rithik/chunitools/utils/api"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@rithik/chunitools/components/ui/alert-dialog"
import { Loader2, Trash } from "lucide-react"
import { useCallback, useState } from "react"
import { Button } from "@rithik/chunitools/components/ui/button"
import { useQueryClient } from "@tanstack/react-query"

interface Props {
  disabled: boolean
  selectedId: string
  setSelectedId: (id: string) => void
}

const DeleteProfile = (props: Props) => {
  const { disabled, selectedId, setSelectedId } = props
  const [isOpen, setIsOpen] = useState(false)
  const { mutateAsync: deleteProfile, isLoading } =
    api.aime.deleteProfile.useMutation()
  const queryClient = useQueryClient()
  const profilesQueryKey = api.aime.getProfiles.getQueryKey()

  const openDialog = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onSubmit = useCallback(async () => {
    await deleteProfile(selectedId)
    await queryClient.invalidateQueries(profilesQueryKey)
    setSelectedId("")
    setIsOpen(false)
  }, [deleteProfile, profilesQueryKey, queryClient, selectedId, setSelectedId])

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <Button disabled={disabled} variant="destructive" onClick={openDialog}>
        <Trash />
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            The AIME ID will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>No</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteProfile
