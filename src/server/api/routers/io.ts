import {
  createTRPCRouter,
  publicProcedure,
} from "@rithik/chunitools/server/api/trpc"
import robot from "robotjs"
import sleep from "@rithik/chunitools/utils/sleep"

const ioRouter = createTRPCRouter({
  scanCard: publicProcedure.mutation(async () => {
    robot.keyToggle("enter", "down")
    await sleep(1000)
    robot.keyToggle("enter", "up")
  }),
  openServiceMenu: publicProcedure.mutation(() => {
    robot.keyTap("1")
  }),
  insertCoin: publicProcedure.mutation(() => {
    robot.keyTap("2")
  }),
})

export default ioRouter
