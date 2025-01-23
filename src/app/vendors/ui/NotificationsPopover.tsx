"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: string
  message: string
  type: string
  createdAt: Date
  read: boolean
}

export default function NotificationsPopover({
  notifications
}: {
  notifications: Notification[]
}) {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center"
            >
              {unreadCount}
            </motion.span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
        </div>
        <ScrollArea className="h-[300px]">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-4 border-b last:border-0 ${
                  notification.read ? 'opacity-60' : ''
                }`}
              >
                <p className="text-sm">{notification.message}</p>
                <span className="text-xs text-muted-foreground">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
} 