import { z } from "zod"

const profile = z.object({
  name: z.string().nonempty({
    message: "Please enter a name",
  }),
  id: z
    .string()
    .regex(/^[0-9]{20}$|^$/, { message: "AIME ID must be 20 digits long" })
    .optional(),
})

export default profile
