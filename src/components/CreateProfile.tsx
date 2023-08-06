import { Dialog, DialogContent } from "@rithik/chunitools/components/ui/dialog"
import { Button } from "@rithik/chunitools/components/ui/button"
import profile from "@rithik/chunitools/models/profile"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { api } from "@rithik/chunitools/utils/api"
import { useCallback, useState } from "react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@rithik/chunitools/components/ui/form"
import { Input } from "@rithik/chunitools/components/ui/input"
import { Loader2, UserPlus } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import { CommandItem } from "@rithik/chunitools/components/ui/command"
import { cn } from "@rithik/chunitools/utils"

interface Props {
  clearSearch: () => void
}

const CreateProfile = (props: Props) => {
  const { clearSearch } = props
  const [isOpen, setIsOpen] = useState(false)
  const { mutateAsync, isLoading } = api.aime.addNewProfile.useMutation()
  const queryClient = useQueryClient()
  const profilesQueryKey = api.aime.getProfiles.getQueryKey()
  const form = useForm<z.infer<typeof profile>>({
    resolver: zodResolver(profile),
  })

  const openDialog = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onSubmit = useCallback(
    async (values: z.infer<typeof profile>) => {
      await mutateAsync(values)
      await queryClient.invalidateQueries(profilesQueryKey)
      setIsOpen(false)
      clearSearch()
    },
    [clearSearch, mutateAsync, profilesQueryKey, queryClient]
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandItem onSelect={openDialog}>
        <UserPlus className={cn("mr-2 h-4 w-4")} />
        Create profile
      </CommandItem>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Joe Nithm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AIME ID</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="00000000000000000000"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The 20 digit AIME ID (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProfile
