import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@rithik/chunitools/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@rithik/chunitools/components/ui/popover"
import { Button } from "@rithik/chunitools/components/ui/button"
import { useCallback, useState } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@rithik/chunitools/components/ui/command"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { cn } from "@rithik/chunitools/utils"
import { api } from "@rithik/chunitools/utils/api"
import CreateProfile from "@rithik/chunitools/components/CreateProfile"
import DeleteProfile from "@rithik/chunitools/components/DeleteProfile"

const AimeProfiles = () => {
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState("")
  const [search, setSearch] = useState("")
  const { data: profiles } = api.aime.getProfiles.useQuery()
  const { mutateAsync: setProfile, isLoading: isSettingProfile } =
    api.aime.setCurrentProfile.useMutation()

  const onSelect = useCallback(
    (name: string) => {
      const id = profiles!.find(
        (profile) => profile.name!.toLowerCase() === name.toLowerCase()
      )!.id
      setSelectedId(id)
      setOpen(false)
    },
    [profiles]
  )

  const setCurrentProfile = useCallback(async () => {
    await setProfile(selectedId)
  }, [setProfile, selectedId])

  const clearSearch = useCallback(() => {
    setSearch("")
  }, [])

  if (!profiles) return null

  return (
    <Card className="m-5">
      <CardHeader className="flex items-center">
        <CardTitle>Aime Profiles</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between"
            >
              {selectedId
                ? profiles.find((profile) => profile.id === selectedId)?.name
                : "Select profile..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex">
            <Command>
              <CommandInput
                placeholder="Search profiles..."
                value={search}
                onValueChange={setSearch}
              />
              <CommandEmpty className="flex flex-col items-center gap-5 p-2">
                No profile found.
              </CommandEmpty>
              <CommandGroup>
                {profiles.map((profile) => (
                  <CommandItem key={profile.id} onSelect={onSelect}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedId === profile.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {profile.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              {profiles.length > 0 && <CommandSeparator />}
              <CommandGroup>
                <CreateProfile clearSearch={clearSearch} />
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="grid grid-cols-5 gap-3">
          <Button
            disabled={!selectedId || isSettingProfile}
            onClick={setCurrentProfile}
            className="col-span-4"
          >
            {isSettingProfile && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Set
          </Button>
          <DeleteProfile
            disabled={!selectedId || isSettingProfile}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default AimeProfiles
