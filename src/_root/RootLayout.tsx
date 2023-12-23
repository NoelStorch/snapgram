import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

const RootLaout = () => {
  const handleClick = () => {
    toast({
      title: 'Clickeando'
    })
  }
  return (
    <div>
      RootLaout
      <Button  onClick={handleClick}>Button</Button>
    </div>
  )
}

export default RootLaout