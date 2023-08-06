import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@rithik/chunitools/components/ui/card"
import { Button } from "@rithik/chunitools/components/ui/button"
import { Coins, CreditCard, Hammer, Loader2, Trash } from "lucide-react"
import { api } from "@rithik/chunitools/utils/api"
import { useCallback, useState } from "react"
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

const GameIO = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const { mutateAsync: scanCardAsync, isLoading: isScanningCard } =
    api.io.scanCard.useMutation()
  const { mutateAsync: insertCoinAsync, isLoading: isInsertingCoin } =
    api.io.insertCoin.useMutation()
  const { mutateAsync: openServiceMenuAsync, isLoading: isOpeningServiceMenu } =
    api.io.openServiceMenu.useMutation()

  const scanCard = useCallback(async () => {
    await scanCardAsync()
  }, [scanCardAsync])

  const insertCoin = useCallback(async () => {
    await insertCoinAsync()
  }, [insertCoinAsync])

  const openServiceMenu = useCallback(async () => {
    await openServiceMenuAsync()
  }, [openServiceMenuAsync])

  const openDialog = useCallback(() => {
    setDialogIsOpen(true)
  }, [])

  return (
    <Card className="m-5">
      <CardHeader className="flex items-center">
        <CardTitle>Game IO</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button disabled={isScanningCard} onClick={scanCard} className="gap-2">
          {isScanningCard && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <CreditCard />
          Scan Card
        </Button>
        <Button
          disabled={isInsertingCoin}
          onClick={insertCoin}
          className="gap-2"
        >
          {isInsertingCoin && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Coins /> Insert Coin
        </Button>
        <AlertDialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
          <Button onClick={openDialog} className="gap-2">
            <Hammer />
            Open Service Menu
          </Button>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to open the service menu?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Gameplay in progress will immediately end.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isOpeningServiceMenu}>
                No
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={openServiceMenu}
                disabled={isOpeningServiceMenu}
              >
                {isOpeningServiceMenu && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}

export default GameIO
